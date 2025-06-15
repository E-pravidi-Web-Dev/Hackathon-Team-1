"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, Save } from "lucide-react"

export default function GenerateQuote() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Mock cart data (in real app, this would come from state/context)
    const cartItems = [
        { id: 2, name: "Office Chair", price: 299.99, quantity: 1 },
        { id: 3, name: "Wireless Mouse", price: 49.99, quantity: 2 },
        { id: 5, name: 'Monitor 27"', price: 399.99, quantity: 1 },
    ]

    const [quoteData, setQuoteData] = useState({
        customerName: "John Doe",
        customerEmail: "john@example.com",
        company: "Acme Corp",
        phone: "+1 (555) 123-4567",
        address: "123 Business St, Suite 100\nNew York, NY 10001",
        projectName: "",
        deliveryDate: "",
        notes: "",
        urgency: "standard",
    })

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const taxAmount = subtotal * 0.1
    const total = subtotal + taxAmount

    const handleSubmitQuote = async () => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Navigate to success page
        router.push("/customer/quote/success")
    }

    const handleSaveDraft = () => {
        // Save as draft functionality
        alert("Quote saved as draft!")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/customer/cart">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Cart
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Generate Quotation</h1>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quote Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                                <CardDescription>Verify your contact details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="customerName">Full Name</Label>
                                        <Input
                                            id="customerName"
                                            value={quoteData.customerName}
                                            onChange={(e) => setQuoteData({ ...quoteData, customerName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="customerEmail">Email</Label>
                                        <Input
                                            id="customerEmail"
                                            type="email"
                                            value={quoteData.customerEmail}
                                            onChange={(e) => setQuoteData({ ...quoteData, customerEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            value={quoteData.company}
                                            onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={quoteData.phone}
                                            onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={quoteData.address}
                                        onChange={(e) => setQuoteData({ ...quoteData, address: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                                <CardDescription>Provide additional information about your requirements</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="projectName">Project Name</Label>
                                    <Input
                                        id="projectName"
                                        placeholder="e.g., Office Setup 2024"
                                        value={quoteData.projectName}
                                        onChange={(e) => setQuoteData({ ...quoteData, projectName: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="deliveryDate">Required Delivery Date</Label>
                                        <Input
                                            id="deliveryDate"
                                            type="date"
                                            value={quoteData.deliveryDate}
                                            onChange={(e) => setQuoteData({ ...quoteData, deliveryDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="urgency">Urgency Level</Label>
                                        <select
                                            id="urgency"
                                            value={quoteData.urgency}
                                            onChange={(e) => setQuoteData({ ...quoteData, urgency: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="standard">Standard (5-7 days)</option>
                                            <option value="urgent">Urgent (2-3 days)</option>
                                            <option value="rush">Rush (24 hours)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Any special requirements, installation needs, or questions..."
                                        value={quoteData.notes}
                                        onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Items Review */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Items to Quote</CardTitle>
                                <CardDescription>Review the products for your quotation</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Quote Summary */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quote Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span>
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Tax:</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Estimated Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    *Final pricing may vary based on specifications and delivery requirements
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Submit Quote Request</CardTitle>
                                <CardDescription>Send your quotation request for review</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button onClick={handleSubmitQuote} className="w-full" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Quote Request
                                        </>
                                    )}
                                </Button>
                                <Button onClick={handleSaveDraft} variant="outline" className="w-full" disabled={isSubmitting}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save as Draft
                                </Button>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>• Quote will be reviewed within 24 hours</p>
                                    <p>• You'll receive email confirmation</p>
                                    <p>• No commitment until you approve</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>What Happens Next?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-medium">Review & Processing</p>
                                            <p className="text-gray-600">Our team reviews your requirements</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-medium">Quote Preparation</p>
                                            <p className="text-gray-600">Detailed quote with final pricing</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-medium">Your Approval</p>
                                            <p className="text-gray-600">Review and approve the final quote</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
