'use client';

import { useCallback, useState } from 'react';
import type { TenantConfigInput } from '@pms/tenant-config';

export type WizardStep = 0 | 1 | 2 | 3 | 4;

export const STEP_LABELS = ['Tema', 'Marka', 'İçerik', 'Domain', 'Yayınla'];

export function defaultWizardConfig(): TenantConfigInput {
  return {
    $schemaVersion: 1,
    theme: { package: '@pms/theme-boutique', version: '0.1.0' },
    brand: {
      primary: '#1a3a5c',
      secondary: '#a07d4f',
      accent: '#c9a35e',
      font: { heading: 'Cormorant Garamond', body: 'Inter' },
      logo: { src: 'https://placehold.co/120x40/1a3a5c/fff?text=LOGO', alt: 'Logo' },
    },
    property: {
      id: '',
      name: '',
      countryCode: 'TR',
      city: '',
      timezone: 'Europe/Istanbul',
      currency: 'TRY',
      contact: {},
      social: {},
    },
    i18n: { default: 'tr', supported: ['tr', 'en'] },
    bookingEngine: {
      kind: 'hotelrunner',
      bv3Url: 'https://example.hotelrunner.com/bv3',
      defaultAdults: 2,
    },
    seo: {
      defaultTitle: '',
      titleTemplate: '%s | %name%',
      description: '',
      ogImage: 'https://placehold.co/1200x630',
    },
    pages: {
      hero: {
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920',
        title: '',
        ctaLabel: 'Müsaitlik Ara',
      },
    },
    features: { icsExport: true, reviews: false, aiAssistant: false },
  };
}

export function useWizard() {
  const [step, setStep] = useState<WizardStep>(0);
  const [config, setConfig] = useState<TenantConfigInput>(defaultWizardConfig);
  const [slug, setSlug] = useState('');

  const patchConfig = useCallback((patch: (c: TenantConfigInput) => TenantConfigInput) => {
    setConfig((prev) => patch(structuredClone(prev)));
  }, []);

  const next = useCallback(() => setStep((s) => (s < 4 ? ((s + 1) as WizardStep) : s)), []);
  const back = useCallback(() => setStep((s) => (s > 0 ? ((s - 1) as WizardStep) : s)), []);

  return { step, setStep, config, patchConfig, slug, setSlug, next, back };
}
