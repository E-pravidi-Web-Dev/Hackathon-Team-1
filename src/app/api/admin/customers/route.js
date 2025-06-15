import connectDB from '@/lib/db';
import Customer from '@/models/Customer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const customer = await Customer.create(body);
        return NextResponse.json({ success: true, data: customer }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET(request) {
    await connectDB();
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const sort = searchParams.get('sort') || 'createdAt';
        const order = searchParams.get('order') === 'asc' ? 1 : -1;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { company: { $regex: search, $options: 'i' } },
                    { contactNo: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const customers = await Customer.find(query).sort({ [sort]: order });
        return NextResponse.json({ success: true, data: customers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
} 