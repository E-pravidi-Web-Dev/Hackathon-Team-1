import connectDB from '@/lib/db';
import Customer from '@/models/Customer';
import { withAdmin } from '@/middleware/auth';
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
        return NextResponse.json({ success: false, error: 'Customer ID is required' }, { status: 400 });
    }
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: customer }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Customer ID is required' }, { status: 400 });
    }
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
        }
        const body = await request.json();
        Object.assign(customer, body);
        await customer.save();
        return NextResponse.json({ success: true, data: customer }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request) {
    await connectDB();
    const id = getIdFromRequest(request);
    if (!id) {
        return NextResponse.json({ success: false, error: 'Customer ID is required' }, { status: 400 });
    }
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
        }
        await customer.deleteOne();
        return NextResponse.json({ success: true, data: {} }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
} 