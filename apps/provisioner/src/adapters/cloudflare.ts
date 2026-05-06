import { env } from '../env.js';

interface CFResponse<T> {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  result: T;
}

async function cf<T>(path: string, init?: RequestInit): Promise<T> {
  if (!env.cloudflare.apiToken) {
    throw new Error('CLOUDFLARE_API_TOKEN env required for DNS provisioning');
  }
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      authorization: `Bearer ${env.cloudflare.apiToken}`,
      'content-type': 'application/json',
    },
  });
  const json = (await res.json()) as CFResponse<T>;
  if (!json.success) {
    throw new Error(`Cloudflare API error: ${json.errors.map((e) => e.message).join('; ')}`);
  }
  return json.result;
}

export async function createSubdomainARecord(
  subdomain: string,
): Promise<{ name: string; id: string }> {
  const fqdn = `${subdomain}.${env.cloudflare.rootDomain}`;
  const result = await cf<{ id: string; name: string }>(
    `/zones/${env.cloudflare.zoneId}/dns_records`,
    {
      method: 'POST',
      body: JSON.stringify({
        type: 'A',
        name: fqdn,
        content: env.cloudflare.proxyTarget,
        ttl: 1,
        proxied: true,
        comment: 'managed by pms-provisioner',
      }),
    },
  );
  return { name: result.name, id: result.id };
}
