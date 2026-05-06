'use client';

import type { Locale, TenantConfig } from '@pms/tenant-config';
import { useBooking } from '@pms/booking-widget';

export function Hero({ config, locale }: { config: TenantConfig; locale: Locale }) {
  const hero = config.pages.hero;
  const b = useBooking({ engine: config.bookingEngine, locale });

  return (
    <header
      className="relative h-[88vh] min-h-[640px] w-full overflow-hidden"
      data-pms-section="hero"
    >
      <img
        src={hero.image}
        alt={hero.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24">
        <h1
          className="text-white text-5xl md:text-7xl font-[var(--pms-font-heading)] tracking-tight max-w-3xl"
          style={{ fontFamily: 'var(--pms-font-heading)' }}
        >
          {hero.title}
        </h1>
        {hero.subtitle && (
          <p className="text-white/90 text-lg md:text-xl mt-6 max-w-xl font-light">
            {hero.subtitle}
          </p>
        )}

        <form
          id="book"
          onSubmit={(e) => {
            e.preventDefault();
            b.submit();
          }}
          className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-3 bg-white/95 backdrop-blur p-4 rounded-sm shadow-xl max-w-4xl"
        >
          <Field label={b.i18n.checkIn}>
            <input
              type="date"
              value={b.checkIn}
              min={b.minCheckIn}
              onChange={(e) => b.setCheckIn(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm font-semibold text-stone-900"
            />
          </Field>
          <Field label={b.i18n.checkOut}>
            <input
              type="date"
              value={b.checkOut}
              min={b.minCheckOut}
              onChange={(e) => b.setCheckOut(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm font-semibold text-stone-900"
            />
          </Field>
          <Field label={b.i18n.adults}>
            <select
              value={b.rooms[0]?.adults ?? 2}
              onChange={(e) => b.setRoom(0, { adults: Number(e.target.value) })}
              className="w-full bg-transparent border-none outline-none text-sm font-semibold text-stone-900"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {b.i18n.adults}
                </option>
              ))}
            </select>
          </Field>
          <button
            type="submit"
            className="px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--pms-primary)' }}
          >
            {hero.ctaLabel ?? b.i18n.search}
          </button>
        </form>
      </div>
    </header>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block bg-stone-50 px-3 py-2 rounded-sm border border-stone-200">
      <span className="block text-[10px] font-semibold uppercase tracking-widest text-stone-500">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
