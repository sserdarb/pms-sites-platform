'use client';

import { useEffect, useRef, useState } from 'react';
import type { TenantConfigInput } from '@pms/tenant-config';
import { themes } from '@/lib/themes';
import { STEP_LABELS, useWizard } from '@/lib/wizard-state';

const PREVIEW_URL = process.env.NEXT_PUBLIC_PREVIEW_URL ?? 'http://localhost:4100/preview';

export function Wizard() {
  const w = useWizard();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [previewReady, setPreviewReady] = useState(false);

  useEffect(() => {
    function onMsg(ev: MessageEvent) {
      if (ev.data?.type === 'pms:previewReady') setPreviewReady(true);
    }
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  useEffect(() => {
    if (!previewReady || !iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      { type: 'pms:setConfig', patch: w.config },
      '*',
    );
  }, [w.config, previewReady]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] min-h-screen">
      <aside className="bg-white border-r border-stone-200 flex flex-col">
        <header className="px-6 py-5 border-b border-stone-200">
          <h1 className="text-xl font-bold">Yeni otel sitesi</h1>
          <ol className="mt-3 flex items-center gap-2 text-xs">
            {STEP_LABELS.map((l, i) => (
              <li key={l} className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-bold ${
                    i === w.step
                      ? 'bg-blue-600 text-white'
                      : i < w.step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {i + 1}
                </span>
                <span className={i === w.step ? 'font-semibold' : 'text-stone-500'}>{l}</span>
                {i < STEP_LABELS.length - 1 && <span className="text-stone-300">→</span>}
              </li>
            ))}
          </ol>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {w.step === 0 && <ThemeStep config={w.config} onChange={w.patchConfig} />}
          {w.step === 1 && <BrandStep config={w.config} onChange={w.patchConfig} />}
          {w.step === 2 && <ContentStep config={w.config} onChange={w.patchConfig} />}
          {w.step === 3 && (
            <DomainStep slug={w.slug} setSlug={w.setSlug} config={w.config} onChange={w.patchConfig} />
          )}
          {w.step === 4 && <PublishStep slug={w.slug} config={w.config} />}
        </div>

        <footer className="px-6 py-4 border-t border-stone-200 flex justify-between">
          <button
            onClick={w.back}
            disabled={w.step === 0}
            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 disabled:opacity-30"
          >
            ← Geri
          </button>
          {w.step < 4 && (
            <button
              onClick={w.next}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
            >
              İleri →
            </button>
          )}
        </footer>
      </aside>

      <main className="bg-stone-100 relative overflow-hidden">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-white rounded-full text-[10px] font-semibold uppercase tracking-wider shadow text-stone-600">
          Canlı Önizleme {previewReady ? '✓' : '…'}
        </div>
        <iframe
          ref={iframeRef}
          src={`${PREVIEW_URL}?theme=${encodeURIComponent(w.config.theme.package)}`}
          className="w-full h-full border-0"
          title="Önizleme"
        />
      </main>
    </div>
  );
}

function ThemeStep({
  config,
  onChange,
}: {
  config: TenantConfigInput;
  onChange: (fn: (c: TenantConfigInput) => TenantConfigInput) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Bir tema seçin</h2>
      <p className="text-sm text-stone-600">
        Tema sonradan değiştirilebilir, ama içeriklerin yeniden eşlenmesi gerekebilir.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {themes.map((t) => {
          const selected = config.theme.package === t.package;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                onChange((c) => {
                  c.theme = { ...c.theme, package: t.package };
                  return c;
                })
              }
              className={`text-left border-2 rounded-lg overflow-hidden transition-all ${
                selected
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-stone-200 hover:border-stone-400'
              }`}
            >
              <img src={t.preview} alt={t.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{t.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500">
                    {t.category}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">{t.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BrandStep({
  config,
  onChange,
}: {
  config: TenantConfigInput;
  onChange: (fn: (c: TenantConfigInput) => TenantConfigInput) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Marka kimliği</h2>
      <Field label="Otel adı">
        <input
          type="text"
          value={config.property.name}
          onChange={(e) =>
            onChange((c) => {
              c.property.name = e.target.value;
              c.seo.defaultTitle = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
          placeholder="Demo Boutique Hotel"
        />
      </Field>
      <Field label="Logo URL">
        <input
          type="url"
          value={config.brand.logo.src}
          onChange={(e) =>
            onChange((c) => {
              c.brand.logo = { ...c.brand.logo, src: e.target.value, alt: c.property.name || 'Logo' };
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        <Field label="Birincil">
          <input
            type="color"
            value={config.brand.primary}
            onChange={(e) =>
              onChange((c) => {
                c.brand.primary = e.target.value;
                return c;
              })
            }
            className="w-full h-10 rounded border border-stone-300"
          />
        </Field>
        <Field label="İkincil">
          <input
            type="color"
            value={config.brand.secondary ?? config.brand.primary}
            onChange={(e) =>
              onChange((c) => {
                c.brand.secondary = e.target.value;
                return c;
              })
            }
            className="w-full h-10 rounded border border-stone-300"
          />
        </Field>
        <Field label="Vurgu">
          <input
            type="color"
            value={config.brand.accent ?? config.brand.primary}
            onChange={(e) =>
              onChange((c) => {
                c.brand.accent = e.target.value;
                return c;
              })
            }
            className="w-full h-10 rounded border border-stone-300"
          />
        </Field>
      </div>
      <Field label="Başlık fontu">
        <input
          type="text"
          value={config.brand.font.heading}
          onChange={(e) =>
            onChange((c) => {
              c.brand.font.heading = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
    </div>
  );
}

function ContentStep({
  config,
  onChange,
}: {
  config: TenantConfigInput;
  onChange: (fn: (c: TenantConfigInput) => TenantConfigInput) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Hero ve SEO</h2>
      <Field label="Hero başlık">
        <input
          type="text"
          value={config.pages.hero.title}
          onChange={(e) =>
            onChange((c) => {
              c.pages.hero.title = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
      <Field label="Hero alt başlık">
        <input
          type="text"
          value={config.pages.hero.subtitle ?? ''}
          onChange={(e) =>
            onChange((c) => {
              c.pages.hero.subtitle = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
      <Field label="Hero görsel URL">
        <input
          type="url"
          value={config.pages.hero.image}
          onChange={(e) =>
            onChange((c) => {
              c.pages.hero.image = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
      <Field label="SEO açıklama">
        <textarea
          value={config.seo.description}
          onChange={(e) =>
            onChange((c) => {
              c.seo.description = e.target.value;
              return c;
            })
          }
          rows={3}
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
      <Field label="Booking engine türü">
        <select
          value={config.bookingEngine.kind}
          onChange={(e) => {
            const kind = e.target.value as 'hotelrunner' | 'elektra' | 'native';
            onChange((c) => {
              if (kind === 'hotelrunner') {
                c.bookingEngine = { kind, bv3Url: 'https://example.hotelrunner.com/bv3', defaultAdults: 2 };
              } else if (kind === 'elektra') {
                c.bookingEngine = { kind, reservationUrl: 'https://example.rezervasyonal.com/' } as never;
              } else {
                c.bookingEngine = {
                  kind,
                  pmsApiUrl: 'https://api.pms.example',
                  tenantId: c.property.id || 'tenant-id',
                } as never;
              }
              return c;
            });
          }}
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        >
          <option value="hotelrunner">HotelRunner BV3</option>
          <option value="elektra">Elektra / Rezervasyonal</option>
          <option value="native">Kendi PMS'imiz</option>
        </select>
      </Field>
    </div>
  );
}

function DomainStep({
  slug,
  setSlug,
  config,
  onChange,
}: {
  slug: string;
  setSlug: (s: string) => void;
  config: TenantConfigInput;
  onChange: (fn: (c: TenantConfigInput) => TenantConfigInput) => void;
}) {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'innovmar.cloud';
  const fqdn = slug ? `${slug}.${rootDomain}` : '—';
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Domain ve property</h2>
      <Field label="Property ID (kalıcı)">
        <input
          type="text"
          value={config.property.id}
          onChange={(e) =>
            onChange((c) => {
              c.property.id = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
          placeholder="atrium-001"
        />
      </Field>
      <Field label="Subdomain slug">
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
          placeholder="atrium-suites"
        />
        <p className="text-xs text-stone-500 mt-1">
          Site adresi: <strong>{fqdn}</strong>
        </p>
      </Field>
      <Field label="Şehir">
        <input
          type="text"
          value={config.property.city}
          onChange={(e) =>
            onChange((c) => {
              c.property.city = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
      <Field label="İletişim e-posta">
        <input
          type="email"
          value={config.property.contact.email ?? ''}
          onChange={(e) =>
            onChange((c) => {
              c.property.contact.email = e.target.value;
              return c;
            })
          }
          className="w-full px-3 py-2 border border-stone-300 rounded text-sm"
        />
      </Field>
    </div>
  );
}

function PublishStep({ slug, config }: { slug: string; config: TenantConfigInput }) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ jobId?: string; error?: string } | null>(null);

  async function submit() {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/provision', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, config, content: {} }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setResult({ jobId: json.jobId });
    } catch (e: unknown) {
      setResult({ error: e instanceof Error ? e.message : String(e) });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Yayınla</h2>
      <p className="text-sm text-stone-600">
        Aşağıdaki yapılandırma <code className="bg-stone-200 px-1">{slug || '—'}</code> slug'ı için
        provisioner'a gönderilecek: GitHub repo + Cloudflare DNS + Coolify deploy (~5-8 dk).
      </p>
      <pre className="bg-stone-900 text-stone-100 text-[11px] p-3 rounded max-h-80 overflow-auto">
        {JSON.stringify({ slug, theme: config.theme.package, property: config.property.name }, null, 2)}
      </pre>
      <button
        type="button"
        onClick={submit}
        disabled={!slug || !config.property.name || submitting}
        className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded"
      >
        {submitting ? 'Gönderiliyor…' : '🚀 Yayınla'}
      </button>
      {result?.jobId && (
        <p className="text-sm text-emerald-700">
          ✓ İş kuyruğa alındı: <code>{result.jobId}</code>. İlerlemeyi /api/jobs/{result.jobId} ile
          izleyebilirsiniz.
        </p>
      )}
      {result?.error && <p className="text-sm text-red-600">⚠ {result.error}</p>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}
