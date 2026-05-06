import type { ThemeSchemaField } from '@pms/theme-kit';

export const schema: Record<string, ThemeSchemaField> = {
  'pages.hero.image': { type: 'image', required: true, recommendedRatio: '16:9' },
  'pages.hero.title': { type: 'text', required: true },
  'pages.hero.subtitle': { type: 'text' },
  'pages.hero.ctaLabel': { type: 'text', default: 'Müsaitlik Ara' },
  'brand.primary': { type: 'color', default: '#0e8a9c' },
  'brand.accent': { type: 'color', default: '#f4c542' },
  'brand.font.heading': { type: 'text', default: 'Playfair Display' },
  'brand.font.body': { type: 'text', default: 'Manrope' },
};
