import type { NativePmsEngineConfig } from '@pms/tenant-config';
import type { BookingEngine, SearchPayload } from '../types.js';

export function nativeEngine(config: NativePmsEngineConfig): BookingEngine {
  return {
    kind: 'native',
    buildSearchUrl(payload: SearchPayload): string {
      const url = new URL(config.bookingPath, config.pmsApiUrl);
      url.searchParams.set('tenant', config.tenantId);
      url.searchParams.set('checkIn', payload.checkIn);
      url.searchParams.set('checkOut', payload.checkOut);
      url.searchParams.set('rooms', JSON.stringify(payload.rooms));
      if (payload.locale) url.searchParams.set('locale', payload.locale);
      return url.toString();
    },
  };
}
