import { z } from 'zod';

export const LocaleSchema = z.enum(['tr', 'en', 'de', 'ru', 'ar', 'fr', 'el']);
export type Locale = z.infer<typeof LocaleSchema>;
