"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, FileText, User, LogOut, Plus } from "lucide-react"

export default function CustomerDashboard() {
    const [cartItems] = useState(3) // Mock cart items count

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/customer/products">
                            <Button variant="outline" className="relative">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Cart
                                {cartItems > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                        {cartItems}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </Button>
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
                    <p className="text-gray-600">Manage your quotations and browse our product catalog</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/customer/products">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                <Package className="w-8 h-8 text-blue-600" />
                                <div className="ml-4">
                                    <CardTitle className="text-lg">Browse Products</CardTitle>
                                    <CardDescription>Explore our product catalog</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    View Products
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <FileText className="w-8 h-8 text-green-600" />
                            <div className="ml-4">
                                <CardTitle className="text-lg">My Quotations</CardTitle>
                                <CardDescription>View and manage quotes</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Link href="/customer/quotes">
                                <Button variant="outline" className="w-full">
                                    View Quotations
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Link href="/customer/cart">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                <ShoppingCart className="w-8 h-8 text-purple-600" />
                                <div className="ml-4">
                                    <CardTitle className="text-lg">Shopping Cart</CardTitle>
                                    <CardDescription>{cartItems} items in cart</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    View Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Quotations</CardTitle>
                            <CardDescription>Your latest quotation requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Quote #QT-001</p>
                                        <p className="text-sm text-gray-600">Office Supplies - $1,250.00</p>
                                    </div>
                                    <Badge variant="secondary">Pending</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Quote #QT-002</p>
                                        <p className="text-sm text-gray-600">Electronics - $3,450.00</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Quote #QT-003</p>
                                        <p className="text-sm text-gray-600">Furniture - $2,100.00</p>
                                    </div>
                                    <Badge variant="outline">Draft</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Summary</CardTitle>
                            <CardDescription>Your account information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Quotations</span>
                                    <span className="font-medium">12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Approved Quotes</span>
                                    <span className="font-medium">8</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pending Quotes</span>
                                    <span className="font-medium">3</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Value</span>
                                    <span className="font-medium">$15,750.00</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <Button variant="outline" className="w-full">
                                        View Full History
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
