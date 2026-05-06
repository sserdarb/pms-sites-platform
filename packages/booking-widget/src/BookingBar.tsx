'use client';

import type { CSSProperties, ReactNode } from 'react';
import type { BookingEngineConfig, Locale } from '@pms/tenant-config';
import { useBooking } from './headless.js';

export interface BookingBarProps {
  engine: BookingEngineConfig;
  locale?: Locale;
  className?: string;
  style?: CSSProperties;
  showGuests?: boolean;
  renderSubmit?: (props: { onClick: () => void; label: string }) => ReactNode;
}

export function BookingBar(props: BookingBarProps) {
  const {
    engine,
    locale = 'tr',
    className,
    style,
    showGuests = true,
    renderSubmit,
  } = props;

  const b = useBooking({ engine, locale });
  const totalGuests = b.rooms.reduce((s, r) => s + r.adults + r.children, 0);

  return (
    <form
      className={className}
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        b.submit();
      }}
      data-pms-booking-bar
    >
      <label data-pms-field="checkIn">
        <span>{b.i18n.checkIn}</span>
        <input
          type="date"
          value={b.checkIn}
          min={b.minCheckIn}
          onChange={(e) => b.setCheckIn(e.target.value)}
        />
      </label>

      <label data-pms-field="checkOut">
        <span>{b.i18n.checkOut}</span>
        <input
          type="date"
          value={b.checkOut}
          min={b.minCheckOut}
          onChange={(e) => b.setCheckOut(e.target.value)}
        />
      </label>

      {showGuests && (
        <label data-pms-field="guests">
          <span>{b.i18n.guests}</span>
          <select
            value={b.rooms[0]?.adults ?? 2}
            onChange={(e) => b.setRoom(0, { adults: Number(e.target.value) })}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {b.i18n.adults}
              </option>
            ))}
          </select>
          <small data-pms-meta="totalGuests">{totalGuests}</small>
        </label>
      )}

      {renderSubmit ? (
        renderSubmit({ onClick: b.submit, label: b.i18n.search })
      ) : (
        <button type="submit" data-pms-action="submit">
          {b.i18n.search}
        </button>
      )}
    </form>
  );
}
