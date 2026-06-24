import { NextResponse } from 'next/server';
import { getReviewsByProduct, createReview } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: { productId: string } }) {
  const reviews = getReviewsByProduct(params.productId);
  return NextResponse.json(reviews);
}

export async function POST(req: Request, { params }: { params: { productId: string } }) {
  const body = await req.json();

  if (!body.author?.trim() || !body.rating || !body.body?.trim()) {
    return NextResponse.json({ error: 'author, rating, and body are required' }, { status: 400 });
  }

  if (body.rating < 1 || body.rating > 5) {
    return NextResponse.json({ error: 'rating must be 1–5' }, { status: 400 });
  }

  const review = createReview({
    productId: params.productId,
    productSlug: body.productSlug ?? '',
    author: body.author.trim(),
    rating: Number(body.rating),
    title: body.title?.trim() ?? '',
    body: body.body.trim(),
    verified: false,
  });

  return NextResponse.json(review, { status: 201 });
}
