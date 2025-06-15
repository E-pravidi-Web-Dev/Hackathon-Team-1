'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
    _id: string;
    name: string;
    price: number;
}

interface Customer {
    _id: string;
    name: string;
    email: string;
}

interface QuotationItem {
    product: string;
    quantity: number;
    additionalDiscount: number;
}

export default function NewQuotationPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [items, setItems] = useState<QuotationItem[]>([]);
    const [notes, setNotes] = useState('');
    const [terms, setTerms] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { success, data, error } = await response.json();

            if (!success) {
                throw new Error(error || 'Failed to fetch products');
            }

            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [router]);

    const fetchCustomers = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/admin/customers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { success, data, error } = await response.json();

            if (!success) {
                throw new Error(error || 'Failed to fetch customers');
            }

            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }, [router]);

    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, [fetchProducts, fetchCustomers]);

    const addItem = () => {
        setItems([
            ...items,
            { product: '', quantity: 1, additionalDiscount: 0 },
        ]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (
        index: number,
        field: keyof QuotationItem,
        value: string | number
    ) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value,
        };
        setItems(newItems);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch('/api/admin/quotations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    customer: selectedCustomer,
                    items,
                    notes,
                    termsAndConditions: terms,
                }),
            });

            const { success, error } = await response.json();

            if (!success) {
                throw new Error(error || 'Failed to create quotation');
            }

            router.push('/admin/quotations');
        } catch (error) {
            console.error('Error creating quotation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Quotation</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Customer
                            </label>
                            <Select
                                value={selectedCustomer}
                                onValueChange={setSelectedCustomer}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer._id} value={customer._id}>
                                            {customer.name} ({customer.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Items</h3>
                                <Button type="button" onClick={addItem}>
                                    Add Item
                                </Button>
                            </div>

                            {items.map((item, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4 mb-4">
                                    <Select
                                        value={item.product}
                                        onValueChange={(value) =>
                                            updateItem(index, 'product', value)
                                        }
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map((product) => (
                                                <SelectItem key={product._id} value={product._id}>
                                                    {product.name} (${product.price})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateItem(index, 'quantity', parseInt(e.target.value))
                                        }
                                        placeholder="Quantity"
                                        required
                                    />

                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={item.additionalDiscount}
                                        onChange={(e) =>
                                            updateItem(
                                                index,
                                                'additionalDiscount',
                                                parseInt(e.target.value)
                                            )
                                        }
                                        placeholder="Additional Discount %"
                                    />

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeItem(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Notes</label>
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any notes for the customer"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Terms and Conditions
                            </label>
                            <Textarea
                                value={terms}
                                onChange={(e) => setTerms(e.target.value)}
                                placeholder="Add terms and conditions"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Quotation'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 