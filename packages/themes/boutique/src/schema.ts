import type { ThemeSchemaField } from '@pms/theme-kit';

export const schema: Record<string, ThemeSchemaField> = {
  'pages.hero.image': {
    type: 'image',
    required: true,
    recommendedRatio: '21:9',
  },
  'pages.hero.title': { type: 'text', required: true },
  'pages.hero.subtitle': { type: 'text' },
  'pages.hero.ctaLabel': { type: 'text', default: 'Müsaitlik Ara' },
  'brand.primary': { type: 'color', default: '#1a3a5c' },
  'brand.font.heading': { type: 'text', default: 'Cormorant Garamond' },
  'brand.font.body': { type: 'text', default: 'Inter' },
};
