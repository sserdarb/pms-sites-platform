import type { TenantConfigInput } from '@pms/tenant-config';
import type { ThemeContent } from '@pms/theme-kit';

export interface PreviewPayload {
  config: TenantConfigInput;
  content: ThemeContent;
}

export function decodePayload(b64?: string | null): PreviewPayload | null {
  if (!b64) return null;
  try {
    const json = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as PreviewPayload;
  } catch {
    return null;
  }
}

export function deepMerge<T>(base: T, patch: unknown): T {
  if (!patch || typeof patch !== 'object') return base;
  if (Array.isArray(patch)) return patch as unknown as T;
  if (typeof base !== 'object' || base === null) return patch as T;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
    out[k] = deepMerge((base as Record<string, unknown>)[k] as unknown, v);
  }
  return out as T;
}
