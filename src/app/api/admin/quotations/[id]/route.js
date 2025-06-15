import connectDB from '@/lib/db';
import Quotation from '@/models/Quotation';
import { NextResponse } from 'next/server';

function getIdFromRequest(request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    return id;
}

export async function GET(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Quotation ID is required' }, { status: 400 });
    }
    const quotation = await Quotation.findById(id)
        .populate('customer', '-__v')
        .populate('items.product', '-__v');
    if (!quotation) {
        return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: quotation }, { status: 200 });
}

export async function PUT(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Quotation ID is required' }, { status: 400 });
    }
    let quotation = await Quotation.findById(id)
        .populate('customer', '-__v')
        .populate('items.product', '-__v');
    if (!quotation) {
        return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
    }
    const body = await request.json();
    Object.assign(quotation, body);
    await quotation.save();
    quotation = await quotation.populate([
        { path: 'customer', select: '-__v' },
        { path: 'items.product', select: '-__v' }
    ]);
    return NextResponse.json({ success: true, data: quotation }, { status: 200 });
}

export async function DELETE(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Quotation ID is required' }, { status: 400 });
    }
    const quotation = await Quotation.findById(id);
    if (!quotation) {
        return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
    }
    await quotation.deleteOne();
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
} 