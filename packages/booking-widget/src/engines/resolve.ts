import type { BookingEngineConfig } from '@pms/tenant-config';
import type { BookingEngine } from '../types.js';
import { hotelrunnerEngine } from './hotelrunner.js';
import { elektraEngine } from './elektra.js';
import { nativeEngine } from './native.js';

export function resolveEngine(config: BookingEngineConfig): BookingEngine {
  switch (config.kind) {
    case 'hotelrunner':
      return hotelrunnerEngine(config);
    case 'elektra':
      return elektraEngine(config);
    case 'native':
      return nativeEngine(config);
    default: {
      const _exhaustive: never = config;
      throw new Error(`Unknown booking engine: ${JSON.stringify(_exhaustive)}`);
    }
  }
}
