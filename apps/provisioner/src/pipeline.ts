import type { TenantConfigInput } from '@pms/tenant-config';
import { TenantConfigSchema } from '@pms/tenant-config';
import { commitTenantConfig, createTenantRepo } from './adapters/github.js';
import { createSubdomainARecord } from './adapters/cloudflare.js';
import { createApplication, deployApplication } from './adapters/coolify.js';
import { createJob, failJob, finishJob, setStep, startJob, type Job } from './jobs.js';
import { env } from './env.js';

export interface ProvisionInput {
  slug: string;
  config: TenantConfigInput;
  content: unknown;
}

const STEPS = [
  'validate',
  'github:repo',
  'github:commit',
  'cloudflare:dns',
  'coolify:create',
  'coolify:deploy',
];

export function provisionAsync(input: ProvisionInput): Job {
  const job = createJob(input.slug, STEPS);

  void (async () => {
    startJob(job.id);
    let currentStep = STEPS[0]!;
    const setCurrent = (name: string) => {
      currentStep = name;
    };
    try {
      // 1. Validate
      setCurrent('validate');
      setStep(job.id, 'validate', { status: 'running', startedAt: Date.now() });
      const parsed = TenantConfigSchema.safeParse(input.config);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `${i.path.join('.')}: ${i.message}`)
          .join('; ');
        setStep(job.id, 'validate', { status: 'failed', error: issues, finishedAt: Date.now() });
        failJob(job.id, `Invalid tenant config: ${issues}`);
        return;
      }
      setStep(job.id, 'validate', { status: 'succeeded', finishedAt: Date.now() });

      // 2. GitHub: repo from template
      setCurrent('github:repo');
      setStep(job.id, 'github:repo', { status: 'running', startedAt: Date.now() });
      const repo = await createTenantRepo(
        input.slug,
        `Per-tenant site for ${parsed.data.property.name}`,
      );
      setStep(job.id, 'github:repo', {
        status: 'succeeded',
        finishedAt: Date.now(),
        detail: repo.url,
      });

      // 3. GitHub: commit tenant config + content
      setCurrent('github:commit');
      setStep(job.id, 'github:commit', { status: 'running', startedAt: Date.now() });
      const tenantTs = renderTenantConfigTs(parsed.data);
      await commitTenantConfig(
        input.slug,
        {
          'tenant/tenant.config.ts': tenantTs,
          'tenant/content.json': JSON.stringify(input.content, null, 2),
        },
        `chore: initial tenant config for ${input.slug}`,
      );
      setStep(job.id, 'github:commit', { status: 'succeeded', finishedAt: Date.now() });

      // 4. Cloudflare: DNS
      setCurrent('cloudflare:dns');
      setStep(job.id, 'cloudflare:dns', { status: 'running', startedAt: Date.now() });
      const dns = await createSubdomainARecord(input.slug);
      setStep(job.id, 'cloudflare:dns', {
        status: 'succeeded',
        finishedAt: Date.now(),
        detail: dns.name,
      });

      // 5. Coolify: create application
      setCurrent('coolify:create');
      setStep(job.id, 'coolify:create', { status: 'running', startedAt: Date.now() });
      if (!env.coolify.destinationUuid) {
        throw new Error('COOLIFY_DESTINATION_UUID env required');
      }
      const app = await createApplication({
        name: `tenant-${input.slug}`,
        gitRepository: repo.url, // public https URL (createUsingTemplate sets private:false)
        gitBranch: 'main',
        fqdn: `https://${dns.name}`,
        destinationUuid: env.coolify.destinationUuid,
        envVars: {
          PMS_NEXT_STANDALONE: '1',
          PMS_TENANT_ID: parsed.data.property.id,
        },
      });
      setStep(job.id, 'coolify:create', {
        status: 'succeeded',
        finishedAt: Date.now(),
        detail: app.uuid,
      });

      // 6. Coolify: deploy
      setCurrent('coolify:deploy');
      setStep(job.id, 'coolify:deploy', { status: 'running', startedAt: Date.now() });
      const deploy = await deployApplication(app.uuid);
      setStep(job.id, 'coolify:deploy', {
        status: 'succeeded',
        finishedAt: Date.now(),
        detail: deploy.deployment_uuid,
      });

      finishJob(job.id, {
        repoUrl: repo.url,
        fqdn: dns.name,
        coolifyAppUuid: app.uuid,
        deploymentUuid: deploy.deployment_uuid,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStep(job.id, currentStep, { status: 'failed', error: msg, finishedAt: Date.now() });
      failJob(job.id, msg);
      console.error(`[provisioner] job ${job.id} step=${currentStep} failed:`, err);
    }
  })();

  return job;
}

function renderTenantConfigTs(config: TenantConfigInput): string {
  return `import { defineTenant } from '@pms/tenant-config';

export default defineTenant(${JSON.stringify(config, null, 2)});
`;
}

export function logEnvSummary(): void {
  console.log('[provisioner] env summary:');
  console.log(`  port: ${env.port}`);
  console.log(`  github org: ${env.github.org} (token set: ${!!env.github.token})`);
  console.log(
    `  cloudflare zone: ${env.cloudflare.zoneId || '(unset)'} root: ${env.cloudflare.rootDomain}`,
  );
  console.log(`  coolify api: ${env.coolify.apiUrl} (token set: ${!!env.coolify.apiToken})`);
}
