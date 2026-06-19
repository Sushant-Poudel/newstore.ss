import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { Product } from '@/lib/types';

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const product = getProducts().find((p) => p.id === params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: Params) {
  const updated: Product = await request.json();
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const oldSlug = products[idx].slug;
  products[idx] = updated;
  saveProducts(products);
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath(`/products/${oldSlug}`);
  revalidatePath(`/products/${updated.slug}`);
  revalidatePath(`/category/${updated.categorySlug}`);
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const products = getProducts();
  const product = products.find((p) => p.id === params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  saveProducts(products.filter((p) => p.id !== params.id));
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath(`/products/${product.slug}`);
  revalidatePath(`/category/${product.categorySlug}`);
  return NextResponse.json({ ok: true });
}
