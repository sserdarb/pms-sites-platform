'use client';

import type { Locale, TenantConfig } from '@pms/tenant-config';
import { useBooking } from '@pms/booking-widget';

export function ResortMobileBookingBar({
  config,
  locale,
}: {
  config: TenantConfig;
  locale: Locale;
}) {
  const b = useBooking({ engine: config.bookingEngine, locale });

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/15 backdrop-blur-md"
      style={{
        background: 'linear-gradient(135deg, var(--pms-primary) 0%, color-mix(in srgb, var(--pms-primary) 80%, black) 100%)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      data-pms-section="mobile-booking"
    >
      <div className="flex items-center gap-1.5 px-2 py-2">
        <label className="flex-1 min-w-0 flex items-center gap-1 px-2 py-1 rounded-md bg-white/95 border border-white/40">
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-bold tracking-[0.1em] uppercase text-stone-600 leading-none">
              {b.i18n.checkIn}
            </div>
            <input
              type="date"
              value={b.checkIn}
              min={b.minCheckIn}
              onChange={(e) => b.setCheckIn(e.target.value)}
              className="w-full bg-transparent text-[11px] text-stone-900 focus:outline-none mt-0.5"
            />
          </div>
        </label>
        <label className="flex-1 min-w-0 flex items-center gap-1 px-2 py-1 rounded-md bg-white/95 border border-white/40">
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-bold tracking-[0.1em] uppercase text-stone-600 leading-none">
              {b.i18n.checkOut}
            </div>
            <input
              type="date"
              value={b.checkOut}
              min={b.minCheckOut}
              onChange={(e) => b.setCheckOut(e.target.value)}
              className="w-full bg-transparent text-[11px] text-stone-900 focus:outline-none mt-0.5"
            />
          </div>
        </label>
        <button
          type="button"
          onClick={b.submit}
          className="px-3 py-2 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-md text-stone-900"
          style={{ background: 'var(--pms-accent)' }}
        >
          {b.i18n.search}
        </button>
      </div>
    </div>
  );
}
