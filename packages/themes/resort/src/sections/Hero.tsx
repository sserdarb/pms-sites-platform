'use client';

import type { Locale, TenantConfig } from '@pms/tenant-config';
import { useBooking } from '@pms/booking-widget';

export function ResortHero({ config, locale }: { config: TenantConfig; locale: Locale }) {
  const hero = config.pages.hero;
  const b = useBooking({ engine: config.bookingEngine, locale });

  return (
    <header className="relative h-screen min-h-[700px] w-full overflow-hidden" data-pms-section="hero">
      <img
        src={hero.image}
        alt={hero.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <h1
          className="text-white text-5xl md:text-7xl lg:text-8xl font-[var(--pms-font-heading)] tracking-tight"
          style={{ fontFamily: 'var(--pms-font-heading)' }}
        >
          {hero.title}
        </h1>
        {hero.subtitle && (
          <p className="text-white/90 text-lg md:text-xl mt-6 max-w-2xl font-light">
            {hero.subtitle}
          </p>
        )}

        <form
          id="book"
          onSubmit={(e) => {
            e.preventDefault();
            b.submit();
          }}
          className="mt-12 hidden md:grid grid-cols-[1fr_1fr_1fr_auto] gap-2 bg-white/95 backdrop-blur p-3 rounded-md shadow-2xl w-full max-w-4xl"
        >
          <ResortField label={b.i18n.checkIn}>
            <input
              type="date"
              value={b.checkIn}
              min={b.minCheckIn}
              onChange={(e) => b.setCheckIn(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm font-bold text-stone-900"
            />
          </ResortField>
          <ResortField label={b.i18n.checkOut}>
            <input
              type="date"
              value={b.checkOut}
              min={b.minCheckOut}
              onChange={(e) => b.setCheckOut(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm font-bold text-stone-900"
            />
          </ResortField>
          <ResortField label={b.i18n.adults}>
            <select
              value={b.rooms[0]?.adults ?? 2}
              onChange={(e) => b.setRoom(0, { adults: Number(e.target.value) })}
              className="w-full bg-transparent border-none outline-none text-sm font-bold text-stone-900"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {b.i18n.adults}
                </option>
              ))}
            </select>
          </ResortField>
          <button
            type="submit"
            className="px-8 py-3 text-xs uppercase tracking-[0.2em] text-stone-900 font-bold rounded-sm shadow-md hover:opacity-90"
            style={{ background: 'var(--pms-accent)' }}
          >
            {hero.ctaLabel ?? b.i18n.search}
          </button>
        </form>
      </div>
    </header>
  );
}

function ResortField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block bg-stone-50 px-3 py-2 rounded-sm text-left">
      <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
