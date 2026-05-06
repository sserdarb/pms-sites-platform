import type { HotelRunnerEngineConfig } from '@pms/tenant-config';
import type { BookingEngine, SearchPayload } from '../types.js';
import { nightsBetween } from '../date-utils.js';

export function hotelrunnerEngine(config: HotelRunnerEngineConfig): BookingEngine {
  return {
    kind: 'hotelrunner',
    buildSearchUrl(payload: SearchPayload): string {
      const baseUrl = config.bv3Url.replace(/\/+$/, '');
      const day_count = nightsBetween(payload.checkIn, payload.checkOut);

      const rooms = payload.rooms.map((r) => ({
        adult_count: r.adults,
        guest_count: r.adults + r.children,
        child_count: r.children,
        child_ages: r.childAges ?? [],
      }));

      const total_adult = rooms.reduce((s, r) => s + r.adult_count, 0);
      const total_child = rooms.reduce((s, r) => s + r.child_count, 0);

      const search = {
        checkin_date: payload.checkIn,
        checkout_date: payload.checkOut,
        day_count,
        room_count: rooms.length,
        total_adult,
        total_child,
        rooms,
        guest_rooms: Object.fromEntries(rooms.map((r, i) => [i, r])),
      };

      return `${baseUrl}/search?search=${encodeURIComponent(JSON.stringify(search))}`;
    },
  };
}
