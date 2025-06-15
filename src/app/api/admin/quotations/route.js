import connectDB from '@/lib/db';
import Quotation from '@/models/Quotation';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const quotation = await Quotation.create(body);
        await quotation.populate([
            { path: 'customer', select: '-__v' },
            { path: 'items.product', select: '-__v' }
        ]);
        return NextResponse.json({ success: true, data: quotation }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    await connectDB();
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const customerId = searchParams.get('customerId');
        let query = {};
        if (status) query.status = status;
        if (customerId) query.customer = customerId;
        const quotations = await Quotation.find(query)
            .populate('customer', '-__v')
            .populate('items.product', '-__v')
            .sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: quotations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
} 