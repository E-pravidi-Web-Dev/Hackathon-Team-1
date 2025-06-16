import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Users, Zap, Star, Building2, UserCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FODOO</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Products
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    Trusted by 10,000+ businesses
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Business with{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                      FODOO
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Streamline operations, enhance customer experience, and drive growth with our comprehensive business
                    management platform.
                  </p>
                </div>

                {/* Access Options */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Card className="flex-1 border-2 hover:border-orange-200 transition-colors cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-orange-600" />
                        <CardTitle className="text-lg">Customer Access</CardTitle>
                      </div>
                      <CardDescription>Join thousands of satisfied customers</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col space-y-2">
                        <Button
                          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                          asChild
                        >
                          <Link href="/customer/signup">
                            Sign Up as Customer
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/customer/login">Customer Login</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="flex-1 border-2 hover:border-gray-300 transition-colors cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-gray-700" />
                        <CardTitle className="text-lg">Admin Access</CardTitle>
                      </div>
                      <CardDescription>Manage your business operations</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col space-y-2">
                        <Button variant="secondary" className="w-full" asChild>
                          <Link href="/admin/signup">
                            Register as Admin
                            <Building2 className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/admin/login">Admin Login</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="FODOO Dashboard Preview"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything you need to succeed</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive platform provides all the tools and features your business needs to thrive in
                  today's competitive market.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Zap className="h-10 w-10 text-orange-600" />
                  <CardTitle>Lightning Fast</CardTitle>
                  <CardDescription>
                    Experience blazing-fast performance with our optimized infrastructure and cutting-edge technology.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Shield className="h-10 w-10 text-orange-600" />
                  <CardTitle>Enterprise Security</CardTitle>
                  <CardDescription>
                    Bank-level security with end-to-end encryption, compliance certifications, and advanced threat
                    protection.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Users className="h-10 w-10 text-orange-600" />
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Seamless collaboration tools that keep your team connected and productive, wherever they are.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="text-4xl font-bold text-orange-600">10,000+</div>
                <div className="text-xl font-semibold">Active Users</div>
                <p className="text-gray-600">Businesses trust FODOO worldwide</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="text-4xl font-bold text-orange-600">99.9%</div>
                <div className="text-xl font-semibold">Uptime</div>
                <p className="text-gray-600">Reliable service you can count on</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="text-4xl font-bold text-orange-600">24/7</div>
                <div className="text-xl font-semibold">Support</div>
                <p className="text-gray-600">Expert help whenever you need it</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What our customers say</h2>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    "FODOO has completely transformed how we manage our business. The interface is intuitive and the
                    features are exactly what we needed."
                  </CardDescription>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-gray-600">CEO, TechStart Inc.</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    "The customer support is outstanding and the platform scales perfectly with our growing business
                    needs."
                  </CardDescription>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Michael Chen</div>
                      <div className="text-sm text-gray-600">Founder, GrowthCo</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-red-600">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to get started?</h2>
                <p className="max-w-[600px] text-orange-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses already using FODOO to streamline their operations and drive growth.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
                  <Link href="/customer/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                  asChild
                >
                  <Link href="#contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-sm text-gray-600">© 2024 FODOO. All rights reserved.</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/support" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
              Support
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
