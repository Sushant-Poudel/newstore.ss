import { NextResponse } from 'next/server';
import { getCategories, saveCategories } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { Category } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getCategories());
}

export async function PUT(request: Request) {
  const categories: Category[] = await request.json();
  saveCategories(categories);
  revalidatePath('/');
  revalidatePath('/products');
  categories.forEach((c) => revalidatePath(`/category/${c.slug}`));
  return NextResponse.json(categories);
}
