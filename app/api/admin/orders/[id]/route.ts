import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  orders[idx] = { ...orders[idx], status };
  saveOrders(orders);
  return NextResponse.json(orders[idx]);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const orders = getOrders();
  saveOrders(orders.filter((o) => o.id !== params.id));
  return NextResponse.json({ ok: true });
}
