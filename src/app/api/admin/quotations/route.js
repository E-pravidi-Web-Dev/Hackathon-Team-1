import connectDB from '@/lib/db';
import Quotation from '@/models/Quotation';
import Product from '@/models/Product';
import Customer from '@/models/Customer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate customer exists
        const customer = await Customer.findById(body.customer);
        if (!customer) {
            return NextResponse.json(
                { success: false, error: 'Customer not found' },
                { status: 400 }
            );
        }

        // Validate that all products exist
        const productIds = body.items.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== productIds.length) {
            return NextResponse.json(
                { success: false, error: 'One or more products not found' },
                { status: 400 }
            );
        }

        const quotation = await Quotation.create(body);
        await quotation.populate([
            { path: 'customer', select: '-__v' },
            { path: 'items.product', select: '-__v' }
        ]);

        return NextResponse.json({ success: true, data: quotation }, { status: 201 });
    } catch (error) {
        console.error('Error creating quotation:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function GET(request) {
    try {
        await connectDB();
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
        console.error('Error fetching quotations:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
} 