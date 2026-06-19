import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { Product } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request: Request) {
  const product: Product = await request.json();
  const products = getProducts();

  if (products.find((p) => p.id === product.id || p.slug === product.slug)) {
    return NextResponse.json({ error: 'Product with this ID or slug already exists' }, { status: 400 });
  }

  products.push(product);
  saveProducts(products);
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath(`/products/${product.slug}`);
  revalidatePath(`/category/${product.categorySlug}`);
  return NextResponse.json(product, { status: 201 });
}
