"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Users, FileText, TrendingUp, LogOut, Settings, Plus } from "lucide-react"

export default function AdminDashboard() {
    const [stats] = useState({
        totalProducts: 156,
        totalCustomers: 89,
        pendingQuotes: 12,
        monthlyRevenue: 45750,
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
                    <p className="text-gray-600">Manage your business operations from here</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                            <p className="text-xs text-muted-foreground">+12 from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                            <p className="text-xs text-muted-foreground">+8 from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
                            <p className="text-xs text-muted-foreground">Requires attention</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+15% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Link href="/admin/products">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                <Package className="w-8 h-8 text-blue-600" />
                                <div className="ml-4">
                                    <CardTitle className="text-lg">Manage Products</CardTitle>
                                    <CardDescription>Add, edit, or remove products</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Manage Products
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/admin/customers">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                <Users className="w-8 h-8 text-green-600" />
                                <div className="ml-4">
                                    <CardTitle className="text-lg">Manage Customers</CardTitle>
                                    <CardDescription>View and manage customer accounts</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    View Customers
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <FileText className="w-8 h-8 text-purple-600" />
                            <div className="ml-4">
                                <CardTitle className="text-lg">Quotations</CardTitle>
                                <CardDescription>Review and process quotes</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full">
                                View Quotations
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Quotations</CardTitle>
                            <CardDescription>Latest quotation requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Quote #QT-001</p>
                                        <p className="text-sm text-gray-600">John Doe - $1,250.00</p>
                                    </div>
                                    <Badge variant="secondary">Pending</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Quote #QT-002</p>
                                        <p className="text-sm text-gray-600">Jane Smith - $3,450.00</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Quote #QT-003</p>
                                        <p className="text-sm text-gray-600">Bob Johnson - $2,100.00</p>
                                    </div>
                                    <Badge variant="outline">Draft</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Customers</CardTitle>
                            <CardDescription>Newly registered customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Alice Cooper</p>
                                        <p className="text-sm text-gray-600">alice@example.com</p>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-800">New</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">David Wilson</p>
                                        <p className="text-sm text-gray-600">david@example.com</p>
                                    </div>
                                    <Badge variant="outline">Active</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Sarah Brown</p>
                                        <p className="text-sm text-gray-600">sarah@example.com</p>
                                    </div>
                                    <Badge variant="outline">Active</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
