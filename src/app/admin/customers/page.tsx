"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Edit, Trash2, Search, Mail, Phone } from "lucide-react"

interface Customer {
    id: number
    name: string
    email: string
    company: string
    phone: string
    totalOrders: number
    totalSpent: number
    status: "active" | "inactive"
    joinDate: string
}

export default function AdminCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            company: "Acme Corp",
            phone: "+1 (555) 123-4567",
            totalOrders: 5,
            totalSpent: 2450.0,
            status: "active",
            joinDate: "2024-01-15",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@techcorp.com",
            company: "TechCorp Inc",
            phone: "+1 (555) 987-6543",
            totalOrders: 12,
            totalSpent: 8750.0,
            status: "active",
            joinDate: "2023-11-20",
        },
        {
            id: 3,
            name: "Bob Johnson",
            email: "bob@startup.io",
            company: "Startup Solutions",
            phone: "+1 (555) 456-7890",
            totalOrders: 3,
            totalSpent: 1200.0,
            status: "inactive",
            joinDate: "2024-02-10",
        },
        {
            id: 4,
            name: "Alice Cooper",
            email: "alice@design.co",
            company: "Design Studio",
            phone: "+1 (555) 321-0987",
            totalOrders: 8,
            totalSpent: 4320.0,
            status: "active",
            joinDate: "2023-12-05",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        status: "active" as "active" | "inactive",
    })

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAddCustomer = () => {
        if (newCustomer.name && newCustomer.email) {
            const customer: Customer = {
                id: Math.max(...customers.map((c) => c.id)) + 1,
                name: newCustomer.name,
                email: newCustomer.email,
                company: newCustomer.company,
                phone: newCustomer.phone,
                totalOrders: 0,
                totalSpent: 0,
                status: newCustomer.status,
                joinDate: new Date().toISOString().split("T")[0],
            }
            setCustomers([...customers, customer])
            setNewCustomer({
                name: "",
                email: "",
                company: "",
                phone: "",
                status: "active",
            })
            setIsAddDialogOpen(false)
        }
    }

    const handleEditCustomer = (customer: Customer) => {
        setEditingCustomer(customer)
        setNewCustomer({
            name: customer.name,
            email: customer.email,
            company: customer.company,
            phone: customer.phone,
            status: customer.status,
        })
    }

    const handleUpdateCustomer = () => {
        if (editingCustomer && newCustomer.name && newCustomer.email) {
            const updatedCustomers = customers.map((c) =>
                c.id === editingCustomer.id
                    ? {
                        ...c,
                        name: newCustomer.name,
                        email: newCustomer.email,
                        company: newCustomer.company,
                        phone: newCustomer.phone,
                        status: newCustomer.status,
                    }
                    : c,
            )
            setCustomers(updatedCustomers)
            setEditingCustomer(null)
            setNewCustomer({
                name: "",
                email: "",
                company: "",
                phone: "",
                status: "active",
            })
        }
    }

    const handleDeleteCustomer = (id: number) => {
        setCustomers(customers.filter((c) => c.id !== id))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Customer
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Customer</DialogTitle>
                                <DialogDescription>Create a new customer account.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={newCustomer.name}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                        placeholder="Enter customer name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newCustomer.email}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                        placeholder="Enter email address"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        value={newCustomer.company}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                                        placeholder="Enter company name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={newCustomer.phone}
                                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddCustomer}>
                                    Add Customer
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 max-w-md"
                        />
                    </div>
                </div>

                {/* Customer Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{customers.length}</div>
                            <p className="text-sm text-gray-600">Total Customers</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</div>
                            <p className="text-sm text-gray-600">Active Customers</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">
                                ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-600">Total Revenue</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold">
                                {Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
                            </div>
                            <p className="text-sm text-gray-600">Avg. Customer Value</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Customers Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
                        <CardDescription>Manage your customer accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{customer.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    Joined {new Date(customer.joinDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>{customer.company}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Mail className="w-3 h-3" />
                                                    {customer.email}
                                                </div>
                                                {customer.phone && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Phone className="w-3 h-3" />
                                                        {customer.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{customer.totalOrders}</TableCell>
                                        <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Customer</DialogTitle>
                                                            <DialogDescription>Update customer information.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-name">Full Name</Label>
                                                                <Input
                                                                    id="edit-name"
                                                                    value={newCustomer.name}
                                                                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-email">Email</Label>
                                                                <Input
                                                                    id="edit-email"
                                                                    type="email"
                                                                    value={newCustomer.email}
                                                                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-company">Company</Label>
                                                                <Input
                                                                    id="edit-company"
                                                                    value={newCustomer.company}
                                                                    onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-phone">Phone</Label>
                                                                <Input
                                                                    id="edit-phone"
                                                                    value={newCustomer.phone}
                                                                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit" onClick={handleUpdateCustomer}>
                                                                Update Customer
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDeleteCustomer(customer.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredCustomers.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No customers found matching your search.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
