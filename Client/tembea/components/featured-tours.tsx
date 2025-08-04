"use client"
import Link from "next/link"
import { MapPin, Loader2 } from "lucide-react"
import { useEffect,useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRouter, usePathname } from "next/navigation"



interface Tour {
  id: number
  title: string
  location: string
  duration: string
  price: number
  rating: number
  reviews: number
  image: string
  featured?: boolean
  discount?: number
  currency:string
}

export default function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("https://tembezi.co.ke/api/tours/summary")
        if (!res.ok) {
          throw new Error("Failed to fetch tours")
        }
        const data = await res.json()
        setTours(data)
      } catch (error) {
        console.error("Error fetching featured tours:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const handleClick = (page: string, id: number) => {
    setLoadingId(id)
    router.push(page)
  }


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
                <span className="text-2xl font-bold">
  {tour.currency === "KES" ? "Ksh" : tour.currency === "USD" ? "$" : ""}
  {tour.price}
</span>
                  <span className="text-muted-foreground"> / person</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
            <Button
                onClick={() => handleClick(`/tours/${tour.id}`, tour.id)}
                disabled={loadingId === tour.id}
                className="flex items-center gap-2"
              >
                {loadingId === tour.id && <Loader2 className="h-4 w-4 animate-spin" />}
                {loadingId === tour.id ? "Loading..." : "View Details"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

