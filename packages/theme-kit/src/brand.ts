import type { TenantConfig } from '@pms/tenant-config';

export interface BrandCssVars {
  '--pms-primary': string;
  '--pms-secondary': string;
  '--pms-accent': string;
  '--pms-font-heading': string;
  '--pms-font-body': string;
}

export function brandToCssVars(brand: TenantConfig['brand']): BrandCssVars {
  return {
    '--pms-primary': brand.primary,
    '--pms-secondary': brand.secondary ?? brand.primary,
    '--pms-accent': brand.accent ?? brand.primary,
    '--pms-font-heading': brand.font.heading,
    '--pms-font-body': brand.font.body,
  };
}
