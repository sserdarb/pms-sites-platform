import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const PROVISIONER_URL = process.env.PMS_PROVISIONER_URL ?? 'http://localhost:4200';
const PROVISIONER_TOKEN = process.env.PMS_PROVISIONER_TOKEN ?? '';

export async function POST(req: Request) {
  if (!PROVISIONER_TOKEN) {
    return NextResponse.json(
      { error: 'PMS_PROVISIONER_TOKEN not configured on dashboard' },
      { status: 500 },
    );
  }
  const body = await req.text();
  const res = await fetch(`${PROVISIONER_URL}/provision`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${PROVISIONER_TOKEN}`,
    },
    body,
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { 'content-type': 'application/json' },
  });
}
