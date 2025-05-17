import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bike, Shield, Wrench } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Bike className="h-6 w-6 text-emerald-600" />
            <span>ScooterShare</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Rent a Scooter Anytime, Anywhere</h1>
              <p className="text-lg md:text-xl mb-8">
                Our electric scooters are available 24/7. Book, unlock, and ride with just a few taps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/scooters">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Available Scooters
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Register & Top Up</h3>
                <p className="text-gray-600">Create an account and add funds to your wallet to get started.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Find & Book</h3>
                <p className="text-gray-600">Locate available scooters near you and book one in advance.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Unlock & Ride</h3>
                <p className="text-gray-600">Use your credentials to unlock the scooter and enjoy your ride.</p>
              </div>
            </div>
          </div>
        </section>

        {/* User Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">For All Users</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Bike className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customers</h3>
                <p className="text-gray-600 mb-4">
                  Book scooters, manage your account, and enjoy hassle-free rides around the city.
                </p>
                <Link href="/login?type=customer">
                  <Button variant="outline" className="w-full">
                    Customer Login
                  </Button>
                </Link>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Shield className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Administrators</h3>
                <p className="text-gray-600 mb-4">
                  Manage the platform, users, and scooter fleet from a centralized dashboard.
                </p>
                <Link href="/login?type=admin">
                  <Button variant="outline" className="w-full">
                    Admin Login
                  </Button>
                </Link>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Wrench className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Engineers</h3>
                <p className="text-gray-600 mb-4">
                  View maintenance requests and manage the technical aspects of the scooter fleet.
                </p>
                <Link href="/login?type=engineer">
                  <Button variant="outline" className="w-full">
                    Engineer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ScooterShare</h3>
              <p className="text-gray-400">The most convenient way to get around the city.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-gray-400 hover:text-white">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ScooterShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
