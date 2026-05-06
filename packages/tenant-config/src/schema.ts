import { z } from 'zod';
import { BookingEngineSchema } from './booking-engine.js';
import { LocaleSchema } from './locale.js';

const HexColor = z
  .string()
  .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, 'Hex color expected (#rrggbb)');

const Brand = z.object({
  primary: HexColor,
  secondary: HexColor.optional(),
  accent: HexColor.optional(),
  font: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
  }),
  logo: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    darkSrc: z.string().min(1).optional(),
  }),
});

const Property = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  countryCode: z.string().length(2),
  city: z.string().min(1),
  timezone: z.string().min(1),
  currency: z.string().length(3),
  contact: z.object({
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
  }),
  social: z
    .object({
      instagram: z.string().url().optional(),
      facebook: z.string().url().optional(),
      youtube: z.string().url().optional(),
      tiktok: z.string().url().optional(),
    })
    .default({}),
});

const Seo = z.object({
  defaultTitle: z.string().min(1),
  titleTemplate: z.string().default('%s | %name%'),
  description: z.string().min(1),
  ogImage: z.string().min(1),
  twitterHandle: z.string().optional(),
});

const HeroPage = z.object({
  image: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  ctaLabel: z.string().optional(),
});

const Pages = z
  .object({
    hero: HeroPage,
  })
  .passthrough();

export const TenantConfigSchema = z.object({
  $schemaVersion: z.literal(1),
  theme: z.object({
    package: z.string().min(1),
    version: z.string().min(1),
  }),
  brand: Brand,
  property: Property,
  i18n: z.object({
    default: LocaleSchema,
    supported: z.array(LocaleSchema).min(1),
  }),
  bookingEngine: BookingEngineSchema,
  seo: Seo,
  pages: Pages,
  features: z
    .object({
      icsExport: z.boolean().default(false),
      reviews: z.boolean().default(false),
      aiAssistant: z.boolean().default(false),
    })
    .default({}),
});

export type TenantConfig = z.infer<typeof TenantConfigSchema>;
export type TenantConfigInput = z.input<typeof TenantConfigSchema>;

export function defineTenant(config: TenantConfigInput): TenantConfig {
  const parsed = TenantConfigSchema.safeParse(config);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid tenant config:\n${issues}`);
  }
  return parsed.data;
}
