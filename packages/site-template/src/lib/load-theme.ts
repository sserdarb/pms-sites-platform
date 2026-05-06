import type { ThemePackage } from '@pms/theme-kit';

const registry = {
  '@pms/theme-boutique': () => import('@pms/theme-boutique'),
  '@pms/theme-resort': () => import('@pms/theme-resort'),
} as const;

export type ThemePackageId = keyof typeof registry;

export async function loadTheme(pkg: string): Promise<ThemePackage> {
  if (!(pkg in registry)) {
    throw new Error(
      `Unknown theme package "${pkg}". Available: ${Object.keys(registry).join(', ')}`,
    );
  }
  const mod = await registry[pkg as ThemePackageId]();
  return mod.default;
}
