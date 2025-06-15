"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Minus, Trash2, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface CartItem {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    image: string
}

export default function ShoppingCart() {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 2,
            name: "Office Chair",
            description: "Ergonomic office chair with lumbar support",
            price: 299.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: 3,
            name: "Wireless Mouse",
            description: "Precision wireless mouse with long battery life",
            price: 49.99,
            quantity: 2,
            image: "/placeholder.svg?height=80&width=80",
        },
        {
            id: 5,
            name: 'Monitor 27"',
            description: "4K Ultra HD monitor with USB-C connectivity",
            price: 399.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
        },
    ])

    const [customerNotes, setCustomerNotes] = useState("")
    const [deliveryDate, setDeliveryDate] = useState("")

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeItem(id)
            return
        }
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const taxRate = 0.1
    const taxAmount = subtotal * taxRate
    const total = subtotal + taxAmount

    const handleGenerateQuote = () => {
        // Navigate to quote generation page with cart data
        router.push("/customer/quote/generate")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/customer/products">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Continue Shopping
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {cartItems.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="text-gray-500 mb-4">
                                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                                <p>Add some products to get started with your quotation</p>
                            </div>
                            <Link href="/customer/products">
                                <Button>Browse Products</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                                    <CardDescription>Review your selected products</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                            <Image
                                                src={item.image || "/placeholder.svg"}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                className="rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                                <p className="text-lg font-semibold text-blue-600">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    <Minus className="w-4 h-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                                    className="w-16 text-center"
                                                    min="1"
                                                />
                                                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-600 hover:text-red-700 mt-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Additional Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Information</CardTitle>
                                    <CardDescription>Add notes or special requirements</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="delivery-date">Preferred Delivery Date</Label>
                                        <Input
                                            id="delivery-date"
                                            type="date"
                                            value={deliveryDate}
                                            onChange={(e) => setDeliveryDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="notes">Special Notes or Requirements</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Any special requirements, delivery instructions, or questions..."
                                            value={customerNotes}
                                            onChange={(e) => setCustomerNotes(e.target.value)}
                                            rows={4}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
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
                                        <span>Tax (10%):</span>
                                        <span>${taxAmount.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Next Steps</CardTitle>
                                    <CardDescription>Generate a quotation for approval</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Button onClick={handleGenerateQuote} className="w-full" size="lg">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Generate Quotation
                                    </Button>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>• Review will be completed within 24 hours</p>
                                        <p>• You'll receive email confirmation</p>
                                        <p>• No payment required until approval</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Need Help?</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm space-y-2">
                                        <p>Contact our sales team:</p>
                                        <p className="font-medium">📧 sales@company.com</p>
                                        <p className="font-medium">📞 (555) 123-4567</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
