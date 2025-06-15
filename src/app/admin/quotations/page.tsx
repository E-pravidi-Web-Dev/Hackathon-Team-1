'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Quotation {
    _id: string;
    customer: {
        name: string;
        email: string;
    };
    status: string;
    total: number;
    createdAt: string;
    validUntil: string;
}

export default function AdminQuotationsPage() {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchQuotations = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token from localStorage:', token ? 'Present' : 'Missing');

            if (!token) {
                toast.error('Please log in to access this page');
                router.push('/admin/login');
                return;
            }

            console.log('Fetching quotations with token');
            const response = await fetch('/api/admin/quotations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { success, data, error } = await response.json();
            console.log('Quotations response:', { success, error });

            if (!success) {
                throw new Error(error || 'Failed to fetch quotations');
            }

            setQuotations(data);
        } catch (error: unknown) {
            console.error('Error fetching quotations:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotations';
            toast.error(errorMessage);
            if (errorMessage.includes('unauthorized') || errorMessage.includes('Invalid token')) {
                router.push('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchQuotations();
    }, [fetchQuotations]);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Quotations</h1>
                <Button onClick={() => router.push('/admin/quotations/new')}>
                    Create New Quotation
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
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
                                <div>
                                    <div className="font-medium">{quotation.customer.name}</div>
                                    <div className="text-sm text-gray-500">
                                        {quotation.customer.email}
                                    </div>
                                </div>
                            </TableCell>
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
                                    onClick={() =>
                                        router.push(`/admin/quotations/${quotation._id}`)
                                    }
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 