import type { ElektraEngineConfig } from '@pms/tenant-config';
import type { BookingEngine, SearchPayload } from '../types.js';

export function elektraEngine(config: ElektraEngineConfig): BookingEngine {
  return {
    kind: 'elektra',
    buildSearchUrl(payload: SearchPayload): string {
      const adults = payload.rooms.reduce((s, r) => s + r.adults, 0);
      const children = payload.rooms.reduce((s, r) => s + r.children, 0);

      const params = new URLSearchParams();
      params.set(config.paramMap.checkIn, payload.checkIn);
      params.set(config.paramMap.checkOut, payload.checkOut);
      params.set(config.paramMap.adults, String(adults));
      if (children > 0) params.set(config.paramMap.children, String(children));

      const sep = config.reservationUrl.includes('?') ? '&' : '?';
      return `${config.reservationUrl}${sep}${params.toString()}`;
    },
  };
}
