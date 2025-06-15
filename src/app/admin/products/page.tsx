"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react"

interface Product {
    id: number
    name: string
    description: string
    price: number
    category: string
    stock: number
    image: string
    status: "active" | "inactive"
}

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "Professional Laptop",
            description: "High-performance laptop for business use",
            price: 1299.99,
            category: "Electronics",
            stock: 15,
            image: "/placeholder.svg?height=100&width=100",
            status: "active",
        },
        {
            id: 2,
            name: "Office Chair",
            description: "Ergonomic office chair with lumbar support",
            price: 299.99,
            category: "Furniture",
            stock: 25,
            image: "/placeholder.svg?height=100&width=100",
            status: "active",
        },
        {
            id: 3,
            name: "Wireless Mouse",
            description: "Precision wireless mouse with long battery life",
            price: 49.99,
            category: "Electronics",
            stock: 50,
            image: "/placeholder.svg?height=100&width=100",
            status: "active",
        },
        {
            id: 4,
            name: "Standing Desk",
            description: "Adjustable height standing desk",
            price: 599.99,
            category: "Furniture",
            stock: 8,
            image: "/placeholder.svg?height=100&width=100",
            status: "inactive",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        status: "active" as "active" | "inactive",
    })

    const categories = ["Electronics", "Furniture", "Office Supplies", "Software", "Hardware"]

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.price && newProduct.category) {
            const product: Product = {
                id: Math.max(...products.map((p) => p.id)) + 1,
                name: newProduct.name,
                description: newProduct.description,
                price: Number.parseFloat(newProduct.price),
                category: newProduct.category,
                stock: Number.parseInt(newProduct.stock) || 0,
                image: "/placeholder.svg?height=100&width=100",
                status: newProduct.status,
            }
            setProducts([...products, product])
            setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                status: "active",
            })
            setIsAddDialogOpen(false)
        }
    }

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product)
        setNewProduct({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            stock: product.stock.toString(),
            status: product.status,
        })
    }

    const handleUpdateProduct = () => {
        if (editingProduct && newProduct.name && newProduct.price && newProduct.category) {
            const updatedProducts = products.map((p) =>
                p.id === editingProduct.id
                    ? {
                        ...p,
                        name: newProduct.name,
                        description: newProduct.description,
                        price: Number.parseFloat(newProduct.price),
                        category: newProduct.category,
                        stock: Number.parseInt(newProduct.stock) || 0,
                        status: newProduct.status,
                    }
                    : p,
            )
            setProducts(updatedProducts)
            setEditingProduct(null)
            setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                status: "active",
            })
        }
    }

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter((p) => p.id !== id))
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
                        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>Create a new product for your catalog.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="Enter product name"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        placeholder="Enter product description"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={newProduct.category}
                                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={newProduct.status}
                                        onValueChange={(value: "active" | "inactive") => setNewProduct({ ...newProduct, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddProduct}>
                                    Add Product
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
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 max-w-md"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Products ({filteredProducts.length})</CardTitle>
                        <CardDescription>Manage your product catalog</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={product.image || "/placeholder.svg"}
                                                    alt={product.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">{product.name}</p>
                                                    <p className="text-sm text-gray-500 truncate max-w-[200px]">{product.description}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.category}</Badge>
                                        </TableCell>
                                        <TableCell>${product.price.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center gap-2 justify-end">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Product</DialogTitle>
                                                            <DialogDescription>Update product information.</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-name">Product Name</Label>
                                                                <Input
                                                                    id="edit-name"
                                                                    value={newProduct.name}
                                                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-description">Description</Label>
                                                                <Textarea
                                                                    id="edit-description"
                                                                    value={newProduct.description}
                                                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="grid gap-2">
                                                                    <Label htmlFor="edit-price">Price</Label>
                                                                    <Input
                                                                        id="edit-price"
                                                                        type="number"
                                                                        step="0.01"
                                                                        value={newProduct.price}
                                                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="grid gap-2">
                                                                    <Label htmlFor="edit-stock">Stock</Label>
                                                                    <Input
                                                                        id="edit-stock"
                                                                        type="number"
                                                                        value={newProduct.stock}
                                                                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-category">Category</Label>
                                                                <Select
                                                                    value={newProduct.category}
                                                                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {categories.map((category) => (
                                                                            <SelectItem key={category} value={category}>
                                                                                {category}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="edit-status">Status</Label>
                                                                <Select
                                                                    value={newProduct.status}
                                                                    onValueChange={(value: "active" | "inactive") =>
                                                                        setNewProduct({ ...newProduct, status: value })
                                                                    }
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="active">Active</SelectItem>
                                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit" onClick={handleUpdateProduct}>
                                                                Update Product
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDeleteProduct(product.id)}
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
                        {filteredProducts.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No products found matching your search.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
