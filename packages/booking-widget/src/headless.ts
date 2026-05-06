'use client';

import { useCallback, useMemo, useState } from 'react';
import type { BookingEngineConfig, Locale } from '@pms/tenant-config';
import { resolveEngine } from './engines/resolve.js';
import { addDaysIso, clampCheckOut, todayIso } from './date-utils.js';
import { getBookingI18n } from './i18n.js';
import type { BookingI18n, RoomGuests, SearchPayload } from './types.js';

export interface UseBookingOptions {
  engine: BookingEngineConfig;
  locale?: Locale;
  defaultAdults?: number;
  defaultNights?: number;
  initialOffset?: number;
  openTarget?: '_self' | '_blank';
}

export interface UseBookingResult {
  checkIn: string;
  checkOut: string;
  rooms: RoomGuests[];
  minCheckIn: string;
  minCheckOut: string;
  i18n: BookingI18n;
  setCheckIn: (iso: string) => void;
  setCheckOut: (iso: string) => void;
  setRoom: (index: number, room: Partial<RoomGuests>) => void;
  addRoom: () => void;
  removeRoom: (index: number) => void;
  buildUrl: () => string;
  submit: () => void;
}

const DEFAULT_ROOM: RoomGuests = { adults: 2, children: 0, childAges: [] };

export function useBooking(opts: UseBookingOptions): UseBookingResult {
  const {
    engine,
    locale = 'tr',
    defaultAdults = 2,
    defaultNights = 3,
    initialOffset = 1,
    openTarget = '_blank',
  } = opts;

  const minCheckIn = todayIso();
  const [checkIn, setCheckInState] = useState(() => todayIso(initialOffset));
  const [checkOut, setCheckOutState] = useState(() =>
    todayIso(initialOffset + defaultNights),
  );
  const [rooms, setRooms] = useState<RoomGuests[]>(() => [
    { ...DEFAULT_ROOM, adults: defaultAdults },
  ]);

  const minCheckOut = useMemo(() => addDaysIso(checkIn, 1), [checkIn]);
  const i18n = useMemo(() => getBookingI18n(locale), [locale]);

  const setCheckIn = useCallback((iso: string) => {
    setCheckInState(iso);
    setCheckOutState((prev) => clampCheckOut(iso, prev));
  }, []);

  const setCheckOut = useCallback(
    (iso: string) => setCheckOutState(clampCheckOut(checkIn, iso)),
    [checkIn],
  );

  const setRoom = useCallback((index: number, partial: Partial<RoomGuests>) => {
    setRooms((prev) =>
      prev.map((r, i) => (i === index ? { ...r, ...partial } : r)),
    );
  }, []);

  const addRoom = useCallback(
    () => setRooms((prev) => [...prev, { ...DEFAULT_ROOM }]),
    [],
  );
  const removeRoom = useCallback((index: number) => {
    setRooms((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  }, []);

  const buildUrl = useCallback((): string => {
    const adapter = resolveEngine(engine);
    const payload: SearchPayload = {
      checkIn,
      checkOut: clampCheckOut(checkIn, checkOut),
      rooms,
      locale,
    };
    return adapter.buildSearchUrl(payload);
  }, [engine, checkIn, checkOut, rooms, locale]);

  const submit = useCallback(() => {
    const url = buildUrl();
    if (typeof window === 'undefined') return;
    if (openTarget === '_blank') window.open(url, '_blank', 'noopener');
    else window.location.href = url;
  }, [buildUrl, openTarget]);

  return {
    checkIn,
    checkOut,
    rooms,
    minCheckIn,
    minCheckOut,
    i18n,
    setCheckIn,
    setCheckOut,
    setRoom,
    addRoom,
    removeRoom,
    buildUrl,
    submit,
  };
}
