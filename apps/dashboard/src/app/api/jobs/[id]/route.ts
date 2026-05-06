import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const PROVISIONER_URL = process.env.PMS_PROVISIONER_URL ?? 'http://localhost:4200';
const PROVISIONER_TOKEN = process.env.PMS_PROVISIONER_TOKEN ?? '';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const res = await fetch(`${PROVISIONER_URL}/jobs/${id}`, {
    headers: { authorization: `Bearer ${PROVISIONER_TOKEN}` },
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { 'content-type': 'application/json' },
  });
}
