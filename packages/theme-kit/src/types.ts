import type { ComponentType } from 'react';
import type { Locale, TenantConfig } from '@pms/tenant-config';

export interface ThemeMeta {
  id: string;
  name: string;
  category: 'boutique' | 'resort' | 'villa' | 'classic' | 'minimal';
  description: string;
  screenshot: string;
  version: string;
  supportedLocales: Locale[];
}

export interface RoomCard {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  capacity: { adults: number; children: number };
  sizeSqm?: number;
  fromPrice?: { amount: number; currency: string };
  features?: string[];
}

export interface AmenityCard {
  id: string;
  icon: string;
  title: string;
  description?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  category?: string;
}

export interface Testimonial {
  author: string;
  source?: 'google' | 'tripadvisor' | 'booking' | 'direct';
  rating?: number;
  text: string;
  date?: string;
}

export interface ThemeContent {
  rooms: RoomCard[];
  amenities: AmenityCard[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  about: { title: string; body: string; image?: string };
}

export interface ThemeAppProps {
  config: TenantConfig;
  content: ThemeContent;
  locale: Locale;
}

export type ThemeSchemaField =
  | { type: 'text'; required?: boolean; default?: string; placeholder?: string }
  | { type: 'longtext'; required?: boolean; default?: string }
  | { type: 'image'; required?: boolean; recommendedRatio?: string }
  | { type: 'color'; default?: string }
  | { type: 'list'; itemType: 'text' | 'image'; min?: number; max?: number };

export interface ThemePackage {
  meta: ThemeMeta;
  schema: Record<string, ThemeSchemaField>;
  ThemeApp: ComponentType<ThemeAppProps>;
}
