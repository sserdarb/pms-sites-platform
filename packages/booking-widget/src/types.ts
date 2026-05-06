import type { Locale } from '@pms/tenant-config';

export interface SearchPayload {
  checkIn: string;
  checkOut: string;
  rooms: RoomGuests[];
  locale?: Locale;
}

export interface RoomGuests {
  adults: number;
  children: number;
  childAges?: number[];
}

export interface BookingEngine {
  readonly kind: string;
  buildSearchUrl(payload: SearchPayload): string;
}

export interface BookingI18n {
  search: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  adults: string;
  children: string;
  rooms: string;
  addRoom: string;
  removeRoom: string;
}
