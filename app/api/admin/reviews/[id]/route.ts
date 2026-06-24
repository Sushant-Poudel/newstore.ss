import { NextResponse } from 'next/server';
import { getReviews, saveReviews } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const reviews = getReviews();
  const filtered = reviews.filter((r) => r.id !== params.id);
  if (filtered.length === reviews.length) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  saveReviews(filtered);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const reviews = getReviews();
  const idx = reviews.findIndex((r) => r.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  reviews[idx] = { ...reviews[idx], ...body };
  saveReviews(reviews);
  return NextResponse.json(reviews[idx]);
}
