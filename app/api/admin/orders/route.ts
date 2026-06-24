import { NextResponse } from 'next/server';
import { getOrders, createOrder, getProducts, saveProducts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getOrders());
}

export async function POST(req: Request) {
  const body = await req.json();
  const order = createOrder(body);

  // Decrement stock for each ordered item
  try {
    const products = getProducts();
    let changed = false;
    for (const item of order.items) {
      const idx = products.findIndex((p) => p.id === item.productId);
      if (idx !== -1 && products[idx].stock > 0) {
        products[idx] = {
          ...products[idx],
          stock: Math.max(0, products[idx].stock - item.quantity),
        };
        changed = true;
      }
    }
    if (changed) saveProducts(products);
  } catch {
    // Non-fatal — order is still saved
  }

  return NextResponse.json(order, { status: 201 });
}
