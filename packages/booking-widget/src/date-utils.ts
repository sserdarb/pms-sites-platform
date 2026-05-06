export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function todayIso(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return isoDate(d);
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return isoDate(d);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(`${checkIn}T00:00:00Z`).getTime();
  const b = new Date(`${checkOut}T00:00:00Z`).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 1;
  return Math.max(Math.round((b - a) / 86_400_000), 1);
}

export function clampCheckOut(checkIn: string, checkOut: string): string {
  const min = addDaysIso(checkIn, 1);
  return checkOut < min ? min : checkOut;
}
