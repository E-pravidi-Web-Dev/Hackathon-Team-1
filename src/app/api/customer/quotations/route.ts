import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Quotation from '@/models/Quotation';
import { withAuth } from '@/middleware/auth';

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
        role: string;
    };
}

export const GET = withAuth(async (request: AuthenticatedRequest) => {
    try {
        await connectDB();
        const quotations = await Quotation.find({ customer: request.user.id })
            .populate('items.product', 'name price')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: quotations });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
});

export const PATCH = withAuth(async (request: AuthenticatedRequest) => {
    try {
        const { quotationId, status } = await request.json();
        await connectDB();

        const quotation = await Quotation.findOne({
            _id: quotationId,
            customer: request.user.id
        });

        if (!quotation) {
            return NextResponse.json({ success: false, error: 'Quotation not found' }, { status: 404 });
        }

        if (quotation.status !== 'sent') {
            return NextResponse.json(
                { success: false, error: 'Can only respond to sent quotations' },
                { status: 400 }
            );
        }

        quotation.status = status;
        await quotation.save();

        return NextResponse.json({ success: true, data: quotation });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}); 