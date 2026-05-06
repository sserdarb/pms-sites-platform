import { env } from '../env.js';

async function coolify<T>(path: string, init?: RequestInit): Promise<T> {
  if (!env.coolify.apiToken) {
    throw new Error('COOLIFY_API_TOKEN env required for application provisioning');
  }
  const res = await fetch(`${env.coolify.apiUrl}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      authorization: `Bearer ${env.coolify.apiToken}`,
      'content-type': 'application/json',
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Coolify API ${res.status}: ${txt.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

export async function createApplication(input: {
  name: string;
  gitRepository: string;
  gitBranch: string;
  fqdn: string;
  envVars?: Record<string, string>;
}): Promise<{ uuid: string }> {
  const body = {
    project_uuid: env.coolify.projectUuid,
    server_uuid: env.coolify.serverUuid,
    name: input.name,
    git_repository: input.gitRepository,
    git_branch: input.gitBranch,
    build_pack: 'dockerfile',
    ports_exposes: '4000',
    domains: input.fqdn,
    instant_deploy: false,
  };
  const res = await coolify<{ uuid: string }>('/applications/private-deploy-key', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (input.envVars) {
    for (const [k, v] of Object.entries(input.envVars)) {
      await coolify(`/applications/${res.uuid}/envs`, {
        method: 'POST',
        body: JSON.stringify({ key: k, value: v, is_preview: false, is_build_time: true }),
      });
    }
  }
  return res;
}

export async function deployApplication(uuid: string): Promise<{ deployment_uuid: string }> {
  return coolify<{ deployment_uuid: string }>(`/deploy?uuid=${uuid}`, { method: 'POST' });
}
