import Link from "next/link"
import { MapPin } from "lucide-react"
import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Sample tour data

const tours = [
  {
    id: 1,
    title: "Serengeti Safari Adventure",
    location: "Tanzania",
    duration: "7 days",
    price: 1899,
    rating: 4.8,
    reviews: 124,
    image: "/serengeti.jpg",
    featured: true,
    discount: 15,
  },
  {
    id: 2,
    title: "Bali Beach Retreat",
    location: "Indonesia",
    duration: "10 days",
    price: 1299,
    rating: 4.7,
    reviews: 98,
    image: "/bali.jpg",
  },
  {
    id: 3,
    title: "Amazon Rainforest Expedition",
    location: "Brazil",
    duration: "8 days",
    price: 1599,
    rating: 4.6,
    reviews: 86,
    image: "/amazon.jpg",
  },
  {
    id: 4,
    title: "Kyoto Cultural Journey",
    location: "Japan",
    duration: "12 days",
    price: 2499,
    rating: 4.9,
    reviews: 156,
    image: "/kyoto.jpg",
    featured: true,
  },
  {
    id: 5,
    title: "Santorini Island Escape",
    location: "Greece",
    duration: "8 days",
    price: 1799,
    rating: 4.7,
    reviews: 112,
    image: "/santorini.jpg",
  },
  {
    id: 6,
    title: "Machu Picchu Trek",
    location: "Peru",
    duration: "9 days",
    price: 1999,
    rating: 4.8,
    reviews: 204,
    image: "/machu-picchu-trek.jpg",
  },
]

export default function FeaturedTours() {
  return (
    <section className="container py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Tour Packages</h2>
          <p className="text-muted-foreground mt-2">Explore our handpicked selection of top destinations</p>
        </div>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link href="/tours">View All Tours</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-56 object-cover" />
                {tour.featured && <Badge className="absolute top-4 left-4 bg-purple-600">Featured</Badge>}
                {tour.discount && <Badge className="absolute top-4 right-4 bg-red-500">{tour.discount}% OFF</Badge>}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center text-purple-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{tour.location}</span>
                <span className="mx-2">•</span>
                <span className="text-sm">{tour.duration}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
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
                    className="h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="ml-1 font-medium">{tour.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">({tour.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">${tour.price}</span>
                  <span className="text-muted-foreground"> / person</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href={`/tours/${tour.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

