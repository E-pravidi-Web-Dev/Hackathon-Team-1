import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const inStock = searchParams.get('inStock');
  const query = {};
  if (category) query.category = category;
  if (inStock !== null) query.inStock = inStock === 'true';
  const products = await Product.find(query).sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: products }, { status: 200 });
}
