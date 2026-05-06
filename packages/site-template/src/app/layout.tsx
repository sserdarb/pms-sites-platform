import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { getTenantConfig } from '@/lib/load-tenant';

export function generateMetadata(): Metadata {
  const cfg = getTenantConfig();
  return {
    title: {
      default: cfg.seo.defaultTitle,
      template: cfg.seo.titleTemplate.replace('%name%', cfg.property.name),
    },
    description: cfg.seo.description,
    openGraph: {
      title: cfg.seo.defaultTitle,
      description: cfg.seo.description,
      images: [cfg.seo.ogImage],
      siteName: cfg.property.name,
      locale: cfg.i18n.default,
    },
    twitter: cfg.seo.twitterHandle
      ? { card: 'summary_large_image', site: cfg.seo.twitterHandle }
      : undefined,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const cfg = getTenantConfig();
  return (
    <html lang={cfg.i18n.default} dir={cfg.i18n.default === 'ar' ? 'rtl' : 'ltr'}>
      <body>{children}</body>
    </html>
  );
}
