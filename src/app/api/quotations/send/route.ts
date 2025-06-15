import { NextResponse } from 'next/server';
import { sendQuotationEmail } from '@/lib/emailUtils';
import withErrorHandler from '@/middleware/withErrorHandler';
import connectDB from '@/lib/db';
import Product from '@/models/Product';

interface RequestBody {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    customerName: string;
    customerEmail: string;
    companyName?: string;
}

export const POST = withErrorHandler(async (request: Request) => {
    await connectDB();
    const body: RequestBody = await request.json();
    const { items, customerName, customerEmail, companyName } = body;

    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ success: false, error: 'Items array is required' }, { status: 400 });
    }

    // Fetch all products from database
    const productIds = items.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Validate all products exist
    if (products.length !== productIds.length) {
        return NextResponse.json({ success: false, error: 'One or more products not found' }, { status: 400 });
    }

    // Create products array with quantities for email
    const productsWithQuantities = items.map(item => {
        const product = products.find(p => p._id.toString() === item.productId);
        return {
            name: product.name,
            price: product.price,
            quantity: item.quantity
        };
    });

    if (!customerEmail) {
        return NextResponse.json({ success: false, error: 'Customer email is required' }, { status: 400 });
    }

    if (!customerName) {
        return NextResponse.json({ success: false, error: 'Customer name is required' }, { status: 400 });
    }    const quotationData = {
        products: productsWithQuantities,
        customerName,
        companyName,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days validity
    };

    const result = await sendQuotationEmail(
        customerEmail,
        'Your Requested Quotation',
        quotationData
    );

    if (!result.success) {
        return NextResponse.json(
            { success: false, error: result.error || 'Failed to send email' },
            { status: 500 }
        );
    }

    return NextResponse.json({ success: true, message: 'Quotation email sent successfully' });
});
