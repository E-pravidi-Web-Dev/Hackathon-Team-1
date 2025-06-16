import { NextResponse } from 'next/server';
import { sendQuotationEmail } from '@/lib/emailUtils';
import { withAuth } from '@/middleware/auth';
import connectDB from '@/lib/db';
import Quotation from '@/models/Quotation';

export async function POST(request) {
    try {
        // Check if user is admin
        if (request.user?.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized access' },
                { status: 403 }
            );
        }

        await connectDB();

        const { quotationId } = await request.json();

        if (!quotationId) {
            return NextResponse.json(
                { success: false, error: 'Quotation ID is required' },
                { status: 400 }
            );
        }

        // Fetch quotation with populated customer and product details
        const quotation = await Quotation.findById(quotationId)
            .populate('customer', 'name email company')
            .populate('items.product', 'name price');

        if (!quotation) {
            return NextResponse.json(
                { success: false, error: 'Quotation not found' },
                { status: 404 }
            );
        }

        // Transform the data for email
        const emailData = {
            products: quotation.items.map(item => ({
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            })),
            customerName: quotation.customer.name,
            companyName: quotation.customer.company,
            quotationNumber: quotation._id.toString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days validity
        };

        const result = await sendQuotationEmail(
            quotation.customer.email,
            'Your Quotation Details',
            emailData
        );

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error || 'Failed to send email' },
                { status: 500 }
            );
        }

        // Update quotation status to 'sent'
        quotation.status = 'sent';
        quotation.sentAt = new Date();
        await quotation.save();

        return NextResponse.json({
            success: true,
            message: 'Quotation email sent successfully',
            data: quotation
        });
    } catch (error) {
        console.error('Error sending quotation:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}