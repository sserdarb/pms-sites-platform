import { promises as fs } from 'node:fs';
import { join } from 'node:path';

/**
 * Vendor strategy: provisioner Docker image bundles `packages/` source + built
 * dist/. At commit time we walk this tree and emit `vendor/<short-name>/...`
 * paths to be committed into the tenant repo, plus a tenant-level
 * pnpm-workspace.yaml that lists vendor/* as workspace packages.
 *
 * This avoids npm publish + private registry for MVP. Tenant's `pnpm install`
 * resolves @pms/* via the local vendor/* workspace.
 */

const VENDOR_ROOT = process.env.PMS_VENDOR_ROOT ?? '/app/packages';

const VENDOR_PACKAGES: Array<{ srcRel: string; shortName: string }> = [
  { srcRel: 'tenant-config', shortName: 'tenant-config' },
  { srcRel: 'theme-kit', shortName: 'theme-kit' },
  { srcRel: 'booking-widget', shortName: 'booking-widget' },
  { srcRel: 'themes/boutique', shortName: 'theme-boutique' },
  { srcRel: 'themes/resort', shortName: 'theme-resort' },
];

const SKIP_DIRS = new Set(['node_modules', '.next', '.turbo', 'src']);
const ALLOWED_FILES = new Set([
  'package.json',
  'tsconfig.json',
  'README.md',
]);

interface DirentLike {
  name: string;
  isDirectory(): boolean;
  isFile(): boolean;
}

async function walkPackage(absSrc: string): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  async function recurse(current: string, rel: string) {
    let entries: DirentLike[];
    try {
      entries = (await fs.readdir(current, { withFileTypes: true })) as unknown as DirentLike[];
    } catch {
      return;
    }
    for (const e of entries) {
      const name: string = e.name;
      const full = join(current, name);
      const nextRel = rel ? `${rel}/${name}` : name;
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(name)) continue;
        if (rel === '' && name !== 'dist') continue;
        await recurse(full, nextRel);
      } else if (e.isFile()) {
        if (rel === '' && !ALLOWED_FILES.has(name)) continue;
        try {
          const content = await fs.readFile(full, 'utf-8');
          out.set(nextRel, content);
        } catch {
          // skip
        }
      }
    }
  }
  await recurse(absSrc, '');
  return out;
}

export async function collectVendoredFiles(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  for (const { srcRel, shortName } of VENDOR_PACKAGES) {
    const abs = join(VENDOR_ROOT, srcRel);
    const files = await walkPackage(abs);
    if (files.size === 0) {
      console.warn(`[vendor] empty or missing package source: ${abs}`);
    }
    for (const [rel, content] of files) {
      result[`vendor/${shortName}/${rel}`] = content;
    }
  }
  return result;
}

export const PNPM_WORKSPACE_YAML = `packages:
  - '.'
  - 'vendor/*'
`;
