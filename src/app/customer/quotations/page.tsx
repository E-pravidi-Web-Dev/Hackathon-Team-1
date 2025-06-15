'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

interface Quotation {
    _id: string;
    items: Array<{
        product: {
            name: string;
            price: number;
        };
        quantity: number;
        additionalDiscount: number;
    }>;
    status: string;
    total: number;
    createdAt: string;
    validUntil: string;
    notes: string;
    termsAndConditions: string;
}

export default function CustomerQuotationsPage() {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(
        null
    );
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        try {
            const response = await fetch('/api/customer/quotations');
            const data = await response.json();
            setQuotations(data);
        } catch (error) {
            console.error('Error fetching quotations:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-800',
            sent: 'bg-blue-100 text-blue-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            expired: 'bg-yellow-100 text-yellow-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const handleViewQuotation = (quotation: Quotation) => {
        setSelectedQuotation(quotation);
        setShowDialog(true);
    };

    const handleRespond = async (status: 'accepted' | 'rejected') => {
        if (!selectedQuotation) return;

        try {
            const response = await fetch('/api/customer/quotations', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quotationId: selectedQuotation._id,
                    status,
                }),
            });

            if (response.ok) {
                setShowDialog(false);
                fetchQuotations();
            } else {
                throw new Error('Failed to update quotation status');
            }
        } catch (error) {
            console.error('Error updating quotation:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">My Quotations</h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Valid Until</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quotations.map((quotation) => (
                        <TableRow key={quotation._id}>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                                        quotation.status
                                    )}`}
                                >
                                    {quotation.status}
                                </span>
                            </TableCell>
                            <TableCell>${quotation.total.toFixed(2)}</TableCell>
                            <TableCell>
                                {format(new Date(quotation.createdAt), 'MMM d, yyyy')}
                            </TableCell>
                            <TableCell>
                                {format(new Date(quotation.validUntil), 'MMM d, yyyy')}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    onClick={() => handleViewQuotation(quotation)}
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Quotation Details</DialogTitle>
                    </DialogHeader>

                    {selectedQuotation && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">Items</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Discount</TableHead>
                                            <TableHead>Subtotal</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedQuotation.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>${item.product.price.toFixed(2)}</TableCell>
                                                <TableCell>{item.additionalDiscount}%</TableCell>
                                                <TableCell>
                                                    $
                                                    {(
                                                        item.quantity *
                                                        item.product.price *
                                                        (1 - item.additionalDiscount / 100)
                                                    ).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {selectedQuotation.notes && (
                                <div>
                                    <h3 className="font-medium mb-2">Notes</h3>
                                    <p className="text-gray-600">{selectedQuotation.notes}</p>
                                </div>
                            )}

                            {selectedQuotation.termsAndConditions && (
                                <div>
                                    <h3 className="font-medium mb-2">Terms and Conditions</h3>
                                    <p className="text-gray-600">
                                        {selectedQuotation.termsAndConditions}
                                    </p>
                                </div>
                            )}

                            <div className="text-right">
                                <p className="text-lg font-medium">
                                    Total: ${selectedQuotation.total.toFixed(2)}
                                </p>
                            </div>

                            {selectedQuotation.status === 'sent' && (
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleRespond('rejected')}
                                    >
                                        Decline
                                    </Button>
                                    <Button onClick={() => handleRespond('accepted')}>
                                        Accept
                                    </Button>
                                </DialogFooter>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
} 