import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import Quotation from '@/models/Quotation';
import { generateQuotationPDF, bufferToStream } from '@/lib/pdfGenerator';

interface ProductRequestBody {
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    customerName: string;
    companyName?: string;
}

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    
    try {
        let quotationData;
        
        // Check if it's a quotation ID request
        if ('quotationId' in body) {
            const quotation = await Quotation.findById(body.quotationId)
                .populate('customer', 'name company email')
                .populate('items.product');

            if (!quotation) {
                return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
            }

            quotationData = {
                products: quotation.items.map((item:any) => ({
                    ...item.product.toObject(),
                    quantity: item.quantity
                })),
                customerName: quotation.customer.name,
                companyName: quotation.customer.company,
                quotationNumber: quotation._id.toString(),
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                createdAt: quotation.createdAt
            };
        }
        // Handle product list request
        else {
            const { items, customerName, companyName }: ProductRequestBody = body;

            if (!items || !Array.isArray(items) || items.length === 0) {
                return NextResponse.json({ success: false, error: 'Items array is required' }, { status: 400 });
            }

            if (!customerName) {
                return NextResponse.json({ success: false, error: 'Customer name is required' }, { status: 400 });
            }

            // Fetch products from database
            const productIds = items.map(item => item.productId);
            const products = await Product.find({ _id: { $in: productIds } });

            if (products.length !== productIds.length) {
                return NextResponse.json({ success: false, error: 'One or more products not found' }, { status: 400 });
            }

            quotationData = {
                products: items.map(item => {
                    const product = products.find(p => p._id.toString() === item.productId);
                    return {
                        ...product.toObject(),
                        quantity: item.quantity
                    };
                }),
                customerName,
                companyName,
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
            };
        }

        // Generate PDF
        const pdfBuffer = await generateQuotationPDF(quotationData);

        // Create response with PDF
        const headersList = headers();
        const response = new NextResponse(bufferToStream(pdfBuffer));
        
        response.headers.set('Content-Type', 'application/pdf');
        response.headers.set('Content-Disposition', 'attachment; filename="quotation.pdf"');
        
        return response;

    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
