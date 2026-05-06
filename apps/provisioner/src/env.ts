function required(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === '') {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function optional(name: string, fallback = ''): string {
  return process.env[name] ?? fallback;
}

export const env = {
  port: Number(optional('PORT', '4200')),
  apiToken: required('PMS_PROVISIONER_TOKEN'),
  github: {
    token: optional('GITHUB_TOKEN'),
    org: optional('GITHUB_ORG', 'pms-sites'),
    templateOwner: optional('GITHUB_TEMPLATE_OWNER', 'pms-sites'),
    templateRepo: optional('GITHUB_TEMPLATE_REPO', 'site-template'),
  },
  cloudflare: {
    apiToken: optional('CLOUDFLARE_API_TOKEN'),
    zoneId: optional('CLOUDFLARE_ZONE_ID'),
    rootDomain: optional('CLOUDFLARE_ROOT_DOMAIN', 'innovmar.cloud'),
    proxyTarget: optional('CLOUDFLARE_PROXY_TARGET', '76.13.0.113'),
  },
  coolify: {
    apiUrl: optional('COOLIFY_API_URL', 'https://coolify.innovmar.cloud/api/v1'),
    apiToken: optional('COOLIFY_API_TOKEN'),
    serverUuid: optional('COOLIFY_SERVER_UUID'),
    projectUuid: optional('COOLIFY_PROJECT_UUID'),
    destinationUuid: optional('COOLIFY_DESTINATION_UUID'),
  },
} as const;
