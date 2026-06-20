import { NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getOrders());
}

export async function POST(req: Request) {
  const body = await req.json();
  const order = createOrder(body);
  return NextResponse.json(order, { status: 201 });
}
