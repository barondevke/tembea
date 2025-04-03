import Link from "next/link"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import FeaturedTours from "@/components/featured-tours"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <section className="container py-12 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Discover Amazing Destinations</h2>
          <p className="text-muted-foreground">Explore handpicked tour packages for your next adventure</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
            <MapPin className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-medium mb-2">Explore Destinations</h3>
            <p className="text-center text-muted-foreground">
              Discover the perfect destinations for your next journey.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-purple-600 mb-4"
            >
              <path d="M5.2 6A7 7 0 0 1 14 3.1a2 2 0 0 0 2 1.9h4v4a2 2 0 0 0 1.9 2 7 7 0 0 1-1 7" />
              <path d="M9 17H5a2 2 0 0 0-2 2v1h7" />
              <path d="M13 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
            </svg>
            <h3 className="text-xl font-medium mb-2">Best Pricing</h3>
            <p className="text-center text-muted-foreground">Get the best deals on tour packages and accommodations.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-purple-600 mb-4"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" />
              <path d="M8 9v7" />
              <path d="M16 9v7" />
              <path d="M12 12V9" />
              <path d="M12 12v7" />
            </svg>
            <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
            <p className="text-center text-muted-foreground">
              Our travel experts are available around the clock to assist you.
            </p>
          </div>
        </div>
      </section>

      <FeaturedTours />

      <section className="bg-purple-50 py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Ready for your next adventure?</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Sign up today and get exclusive access to special deals and personalized recommendations.
              </p>
              <div className="space-x-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/tours">Browse Tours</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-purple-600 text-purple-600">
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Travel illustration"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="container py-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Tembea?</h2>
          <p className="text-muted-foreground">
            At Tembea, we're passionate about creating unforgettable travel experiences. Our team of travel experts
            carefully curates each tour package to ensure quality, authenticity, and value for money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="p-6 border rounded-lg bg-white">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                <path d="m7.5 4.27 9 5.15" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" x2="12" y1="22" y2="12" />
                <circle cx="18.5" cy="15.5" r="2.5" />
                <path d="M20.27 17.27 22 19" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Curated Experiences</h3>
            <p className="text-muted-foreground">Hand-picked destinations and carefully crafted itineraries.</p>
          </div>

          <div className="p-6 border rounded-lg bg-white">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M16 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M7 14v.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Authentic Local Experiences</h3>
            <p className="text-muted-foreground">Connect with local cultures and communities on your journey.</p>
          </div>

          <div className="p-6 border rounded-lg bg-white">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Hassle-Free Cancellations</h3>
            <p className="text-muted-foreground">Flexible booking policies for peace of mind.</p>
          </div>

          <div className="p-6 border rounded-lg bg-white">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-600"
              >
                <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0z" />
                <path d="M5 14h2" />
                <path d="M17 14h2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Best Price Guarantee</h3>
            <p className="text-muted-foreground">We match any lower price you find within 24 hours of booking.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

