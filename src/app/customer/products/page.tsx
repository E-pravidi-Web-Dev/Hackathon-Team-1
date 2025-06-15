"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Filter, ArrowLeft, Plus, Minus } from "lucide-react"

interface Product {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    stock: number
    inCart?: number
}

export default function ProductCatalog() {
    const [products] = useState<Product[]>([
        {
            id: 1,
            name: "Professional Laptop",
            description: "High-performance laptop for business use",
            price: 1299.99,
            category: "Electronics",
            image: "/placeholder.svg?height=200&width=200",
            stock: 15,
            inCart: 0,
        },
        {
            id: 2,
            name: "Office Chair",
            description: "Ergonomic office chair with lumbar support",
            price: 299.99,
            category: "Furniture",
            image: "/placeholder.svg?height=200&width=200",
            stock: 25,
            inCart: 1,
        },
        {
            id: 3,
            name: "Wireless Mouse",
            description: "Precision wireless mouse with long battery life",
            price: 49.99,
            category: "Electronics",
            image: "/placeholder.svg?height=200&width=200",
            stock: 50,
            inCart: 2,
        },
        {
            id: 4,
            name: "Standing Desk",
            description: "Adjustable height standing desk",
            price: 599.99,
            category: "Furniture",
            image: "/placeholder.svg?height=200&width=200",
            stock: 8,
            inCart: 0,
        },
        {
            id: 5,
            name: 'Monitor 27"',
            description: "4K Ultra HD monitor with USB-C connectivity",
            price: 399.99,
            category: "Electronics",
            image: "/placeholder.svg?height=200&width=200",
            stock: 20,
            inCart: 0,
        },
        {
            id: 6,
            name: "Desk Organizer",
            description: "Bamboo desk organizer with multiple compartments",
            price: 29.99,
            category: "Office Supplies",
            image: "/placeholder.svg?height=200&width=200",
            stock: 35,
            inCart: 0,
        },
    ])

    const [cartItems, setCartItems] = useState<{ [key: number]: number }>({
        2: 1,
        3: 2,
    })
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const categories = ["all", "Electronics", "Furniture", "Office Supplies"]

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const addToCart = (productId: number) => {
        setCartItems((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }))
    }

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => {
            const newCart = { ...prev }
            if (newCart[productId] > 1) {
                newCart[productId]--
            } else {
                delete newCart[productId]
            }
            return newCart
        })
    }

    const getTotalItems = () => {
        return Object.values(cartItems).reduce((sum, count) => sum + count, 0)
    }

    const getTotalPrice = () => {
        return Object.entries(cartItems).reduce((total, [productId, count]) => {
            const product = products.find((p) => p.id === Number.parseInt(productId))
            return total + (product ? product.price * count : 0)
        }, 0)
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
                        <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/customer/cart">
                            <Button className="relative">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Cart ({getTotalItems()})
                                {getTotalItems() > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                        {getTotalItems()}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full md:w-48">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category === "all" ? "All Categories" : category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Cart Summary */}
                {getTotalItems() > 0 && (
                    <Card className="mb-8 bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Cart Summary</p>
                                    <p className="text-sm text-gray-600">
                                        {getTotalItems()} items • ${getTotalPrice().toFixed(2)}
                                    </p>
                                </div>
                                <Button>Generate Quote</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="p-4">
                                <div className="aspect-square relative mb-4">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                        <CardDescription className="mt-1">{product.description}</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                        {product.category}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                                        <p className="text-sm text-gray-500">{product.stock} in stock</p>
                                    </div>
                                </div>

                                {cartItems[product.id] ? (
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => removeFromCart(product.id)}>
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">{cartItems[product.id]}</span>
                                        <Button variant="outline" size="sm" onClick={() => addToCart(product.id)}>
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                        <span className="ml-2 text-sm text-gray-600">
                                            ${(product.price * cartItems[product.id]).toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <Button onClick={() => addToCart(product.id)} className="w-full" disabled={product.stock === 0}>
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
