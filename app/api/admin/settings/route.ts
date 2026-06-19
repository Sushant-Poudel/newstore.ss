import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import type { SiteSettings } from '@/lib/db';

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function PUT(request: Request) {
  const settings: SiteSettings = await request.json();
  saveSettings(settings);
  revalidatePath('/');
  return NextResponse.json(settings);
}
