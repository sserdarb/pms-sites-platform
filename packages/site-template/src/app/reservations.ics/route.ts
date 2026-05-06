import { NextResponse } from 'next/server';
import { getTenantConfig } from '@/lib/load-tenant';

/**
 * Per-tenant ICS feed — RFC 5545.
 * MVP: Boş takvim üretir; PMS API entegrasyonu ileride eklenecek.
 * Token-based auth: ?token=... query parametresi env ile karşılaştırılır.
 */
export async function GET(req: Request) {
  const cfg = getTenantConfig();
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const expected = process.env.PMS_ICS_TOKEN;

  if (!expected || token !== expected) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//pms//${cfg.property.id}//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${cfg.property.name} Rezervasyonları`,
    `X-WR-TIMEZONE:${cfg.property.timezone}`,
    // TODO: PMS API'den rezervasyonları çek, her biri için VEVENT üret
    'BEGIN:VEVENT',
    `UID:placeholder-${cfg.property.id}@pms`,
    `DTSTAMP:${now}`,
    `SUMMARY:Rezervasyon takvimi henüz boş`,
    'DTSTART;VALUE=DATE:19700101',
    'DTEND;VALUE=DATE:19700102',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return new NextResponse(ics, {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'cache-control': 'private, max-age=300',
    },
  });
}
