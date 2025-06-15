import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { withAdmin } from '@/middleware/auth';
import { NextResponse } from 'next/server';

function getIdFromRequest(request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    return id;
}

export async function PUT(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        const body = await request.json();
        Object.assign(product, body);
        await product.save();
        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        await product.deleteOne();
        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
} 