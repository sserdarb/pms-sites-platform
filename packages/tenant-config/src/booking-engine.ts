import { z } from 'zod';

const HotelRunnerEngine = z.object({
  kind: z.literal('hotelrunner'),
  bv3Url: z.string().url(),
  defaultAdults: z.number().int().min(1).max(8).default(2),
});

const ElektraEngine = z.object({
  kind: z.literal('elektra'),
  reservationUrl: z.string().url(),
  paramMap: z
    .object({
      checkIn: z.string().default('arrival'),
      checkOut: z.string().default('departure'),
      adults: z.string().default('adults'),
      children: z.string().default('children'),
    })
    .default({}),
});

const NativePmsEngine = z.object({
  kind: z.literal('native'),
  pmsApiUrl: z.string().url(),
  tenantId: z.string().min(1),
  bookingPath: z.string().default('/booking/new'),
});

export const BookingEngineSchema = z.discriminatedUnion('kind', [
  HotelRunnerEngine,
  ElektraEngine,
  NativePmsEngine,
]);

export type BookingEngineConfig = z.infer<typeof BookingEngineSchema>;
export type HotelRunnerEngineConfig = z.infer<typeof HotelRunnerEngine>;
export type ElektraEngineConfig = z.infer<typeof ElektraEngine>;
export type NativePmsEngineConfig = z.infer<typeof NativePmsEngine>;
