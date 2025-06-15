import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Settings, Users, Package } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QuoteBuilder Pro</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional quotation management system for businesses and customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Customer Portal</CardTitle>
              <CardDescription>Browse products, create quotes, and manage your orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Link href="/customer/login">
                  <Button className="w-full" size="lg">
                    Customer Login
                  </Button>
                </Link>
                <Link href="/customer/signup">
                  <Button variant="outline" className="w-full" size="lg">
                    Customer Signup
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Browse product catalog</p>
                <p>• Add items to cart</p>
                <p>• Generate quotations</p>
                <p>• Track order history</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Manage products, customers, and quotations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/login">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Admin Login
                </Button>
              </Link>
              <div className="text-sm text-gray-500 space-y-1 mt-4">
                <p>• Manage products</p>
                <p>• Customer management</p>
                <p>• Order processing</p>
                <p>• Analytics dashboard</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <Package className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Product Management</h3>
              <p className="text-sm text-gray-600">Comprehensive product catalog with categories and pricing</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Customer Relations</h3>
              <p className="text-sm text-gray-600">Manage customer accounts and order history</p>
            </div>
            <div className="flex flex-col items-center">
              <ShoppingCart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Smart Quotations</h3>
              <p className="text-sm text-gray-600">Generate professional quotes with ease</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
