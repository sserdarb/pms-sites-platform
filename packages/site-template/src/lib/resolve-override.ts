import type { ComponentType } from 'react';

/**
 * Tema component'lerini ezme mekanizması.
 *
 * Tenant repo'sunda `overrides/components/<Name>.tsx` varsa, build-time'da
 * bu component tema paketinden gelene tercih edilir. Override mekanizmasını
 * ileride codegen ile çözmeyi planlıyoruz; şimdilik manuel kayıt.
 */
const overrides: Record<string, ComponentType<unknown>> = {};

export function withOverride<T extends ComponentType<unknown>>(name: string, fallback: T): T {
  return (overrides[name] ?? fallback) as T;
}

export function registerOverride(name: string, component: ComponentType<unknown>): void {
  overrides[name] = component;
}
