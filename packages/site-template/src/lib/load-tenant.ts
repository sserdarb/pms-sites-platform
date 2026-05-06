import type { TenantConfig } from '@pms/tenant-config';
import { TenantConfigSchema } from '@pms/tenant-config';
import tenantConfig from '../../tenant/tenant.config';
import contentJson from '../../tenant/content.json';
import type { ThemeContent } from '@pms/theme-kit';

export function getTenantConfig(): TenantConfig {
  const parsed = TenantConfigSchema.safeParse(tenantConfig);
  if (!parsed.success) {
    throw new Error(
      `tenant.config.ts is invalid:\n${parsed.error.issues
        .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n')}`,
    );
  }
  return parsed.data;
}

export function getTenantContent(): ThemeContent {
  return contentJson as ThemeContent;
}
