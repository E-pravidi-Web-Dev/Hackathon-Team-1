"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Eye, Download, MessageSquare, Plus } from "lucide-react"
import QuotationTable from "@/components/ui/QuotationsTable"

interface Quote {
    id: string
    number: string
    date: string
    items: string[]
    total: number
    status: "pending" | "approved" | "rejected" | "draft"
    validUntil: string
    notes?: string
}

export default function CustomerQuotes() {
    const [quotes] = useState<Quote[]>([
        {
            id: "1",
            number: "QT-2024-001",
            date: "2024-01-15",
            items: ["Office Chair", "Wireless Mouse x2"],
            total: 399.97,
            status: "pending",
            validUntil: "2024-02-15",
            notes: "Urgent delivery required",
        },
        {
            id: "2",
            number: "QT-2024-002",
            date: "2024-01-10",
            items: ["Professional Laptop", 'Monitor 27"'],
            total: 1699.98,
            status: "approved",
            validUntil: "2024-02-10",
        },
        {
            id: "3",
            number: "QT-2024-003",
            date: "2024-01-08",
            items: ["Standing Desk", "Desk Organizer"],
            total: 629.98,
            status: "rejected",
            validUntil: "2024-02-08",
            notes: "Budget constraints",
        },
        {
            id: "4",
            number: "QT-2024-004",
            date: "2024-01-05",
            items: ["Office Chair x3", "Wireless Mouse x3"],
            total: 1049.94,
            status: "draft",
            validUntil: "2024-02-05",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")

    const filteredQuotes = quotes.filter(
        (quote) =>
            quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.items.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    const getStatusColor = (status: Quote["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "approved":
                return "bg-green-100 text-green-800"
            case "rejected":
                return "bg-red-100 text-red-800"
            case "draft":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusText = (status: Quote["status"]) => {
        switch (status) {
            case "pending":
                return "Under Review"
            case "approved":
                return "Approved"
            case "rejected":
                return "Rejected"
            case "draft":
                return "Draft"
            default:
                return status
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/customer/dashboard">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">My Quotations</h1>
                    </div>
                    <Link href="/customer/products">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New Quote
                        </Button>
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{quotes.length}</div>
                            <p className="text-sm text-gray-600">Total Quotes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{quotes.filter((q) => q.status === "pending").length}</div>
                            <p className="text-sm text-gray-600">Pending Review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{quotes.filter((q) => q.status === "approved").length}</div>
                            <p className="text-sm text-gray-600">Approved</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">
                                $
                                {quotes
                                    .filter((q) => q.status === "approved")
                                    .reduce((sum, q) => sum + q.total, 0)
                                    .toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-600">Approved Value</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search quotes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Quotes Table */}

                <QuotationTable/>

                {/* <Card>
                    <CardHeader>
                        <CardTitle>Quotation History</CardTitle>
                        <CardDescription>Track the status of your quotation requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Quote Number</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Valid Until</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredQuotes.map((quote) => (
                                    <TableRow key={quote.id}>
                                        <TableCell className="font-medium">{quote.number}</TableCell>
                                        <TableCell>{new Date(quote.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px]">
                                                <p className="text-sm truncate">{quote.items.join(", ")}</p>
                                                <p className="text-xs text-gray-500">{quote.items.length} items</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>${quote.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(quote.status)}>{getStatusText(quote.status)}</Badge>
                                        </TableCell>
                                        <TableCell>{new Date(quote.validUntil).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                {quote.status === "approved" && (
                                                    <Button variant="ghost" size="sm">
                                                        <Download className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm">
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredQuotes.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No quotes found matching your search.</p>
                            </div>
                        )}
                    </CardContent>
                </Card> */}
            </div>
        </div>
    )
}
