'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import type { TenantConfig, TenantConfigInput } from '@pms/tenant-config';
import { TenantConfigSchema } from '@pms/tenant-config';
import type { ThemeAppProps, ThemeContent, ThemePackage } from '@pms/theme-kit';
import { loadTheme } from '@/lib/themes';
import { sampleConfig, sampleContent } from '@/lib/sample-data';
import { deepMerge } from '@/lib/decode-config';

type PreviewMessage =
  | { type: 'pms:setConfig'; patch: Partial<TenantConfigInput> }
  | { type: 'pms:setContent'; content: ThemeContent }
  | { type: 'pms:setTheme'; package: string };

export function PreviewFrame({
  initialConfig,
  initialContent,
}: {
  initialConfig: TenantConfigInput;
  initialContent: ThemeContent;
}) {
  const [rawConfig, setRawConfig] = useState<TenantConfigInput>(initialConfig);
  const [content, setContent] = useState<ThemeContent>(initialContent);
  const [ThemeApp, setThemeApp] = useState<ComponentType<ThemeAppProps> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTheme(rawConfig.theme.package)
      .then((pkg: ThemePackage) => {
        if (!cancelled) setThemeApp(() => pkg.ThemeApp);
      })
      .catch((e: Error) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [rawConfig.theme.package]);

  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      const data = ev.data as PreviewMessage | undefined;
      if (!data || typeof data !== 'object' || !('type' in data)) return;
      if (data.type === 'pms:setConfig') {
        setRawConfig((prev) => deepMerge(prev, data.patch));
      } else if (data.type === 'pms:setContent') {
        setContent(data.content);
      } else if (data.type === 'pms:setTheme') {
        setRawConfig((prev) => ({ ...prev, theme: { ...prev.theme, package: data.package } }));
      }
    }
    window.addEventListener('message', onMessage);
    window.parent?.postMessage({ type: 'pms:previewReady' }, '*');
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const validated = useMemo<TenantConfig | null>(() => {
    const parsed = TenantConfigSchema.safeParse(rawConfig);
    if (!parsed.success) {
      setError(
        parsed.error.issues
          .map((i) => `${i.path.join('.')}: ${i.message}`)
          .join('\n'),
      );
      return null;
    }
    setError(null);
    return parsed.data;
  }, [rawConfig]);

  if (error) {
    return (
      <pre className="p-6 text-red-600 bg-red-50 text-xs whitespace-pre-wrap">{error}</pre>
    );
  }
  if (!ThemeApp || !validated) {
    return <div className="p-6 text-stone-500">Yükleniyor…</div>;
  }
  return <ThemeApp config={validated} content={content} locale={validated.i18n.default} />;
}
