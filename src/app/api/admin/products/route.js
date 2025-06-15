import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { withAdmin } from '@/middleware/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const product = await Product.create(body);
        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    await connectDB();
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
} 