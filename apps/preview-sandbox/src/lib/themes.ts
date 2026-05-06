import type { ThemePackage } from '@pms/theme-kit';

const registry = {
  '@pms/theme-boutique': () => import('@pms/theme-boutique'),
  '@pms/theme-resort': () => import('@pms/theme-resort'),
} as const;

export type ThemePackageId = keyof typeof registry;

export const themeIds = Object.keys(registry) as ThemePackageId[];

export async function loadTheme(pkg: string): Promise<ThemePackage> {
  if (!(pkg in registry)) {
    throw new Error(`Unknown theme: ${pkg}`);
  }
  const mod = await registry[pkg as ThemePackageId]();
  return mod.default;
}
