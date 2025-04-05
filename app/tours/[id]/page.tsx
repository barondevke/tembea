"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ChevronRight, Star, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
// Fix the import path - remove the .tsx extension
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

// This would typically come from a database
const getTour = (id: string) => {
  return {
    id: Number.parseInt(id),
    title: "Serengeti Safari Adventure",
    location: "Tanzania",
    duration: "7 days",
    price: 1899,
    discountPrice: 1614,
    discount: 15,
    rating: 4.8,
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        date: "August 15, 2023",
        rating: 5,
        comment:
          "This safari exceeded all our expectations! Our guide was incredibly knowledgeable and we saw all of the Big Five. The lodges were comfortable and the food was excellent.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 2,
        name: "Michael Chen",
        date: "July 3, 2023",
        rating: 5,
        comment:
          "An incredible experience from start to finish. The wildlife sightings were amazing - we saw lions hunting, elephants bathing, and even a leopard in a tree. Highly recommend!",
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 3,
        name: "Emma Williams",
        date: "June 18, 2023",
        rating: 4,
        comment:
          "Great trip overall. The accommodations were excellent and our guide was fantastic. Would have liked a bit more time in the Serengeti, but otherwise perfect.",
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    images: [
      "/serengeti-1.jpg",
      "/serengeti-2.jpg",
      "/serengeti-3.jpg",
      "/serengeti-4.jpg",
    ],
    description:
      "Experience the wonder of the Serengeti on this unforgettable 7-day safari adventure. Witness the incredible wildlife in their natural habitat, including the Big Five and the Great Migration. Our expert guides will ensure you have the best possible wildlife viewing experiences while staying in comfortable safari lodges.",
    highlights: [
      "Witness the Great Migration, one of nature's most spectacular events",
      "Spot the Big Five: lion, leopard, elephant, buffalo, and rhino",
      "Experience sunrise game drives in custom safari vehicles",
      "Stay in luxury safari lodges with spectacular views",
      "Visit local Maasai villages and learn about their culture",
      "Enjoy sundowners while watching the African sunset",
    ],
    included: [
      "All accommodations (6 nights in safari lodges)",
      "All meals (breakfast, lunch, and dinner)",
      "Airport transfers and all transportation",
      "Professional English-speaking guide",
      "Game drives and park entrance fees",
      "Bottled water throughout the trip",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Arusha",
        description:
          "Arrive at Kilimanjaro International Airport, where you'll be met by your guide and transferred to your hotel in Arusha. Enjoy a welcome dinner and briefing about your upcoming safari adventure.",
      },
      {
        day: 2,
        title: "Arusha to Serengeti National Park",
        description:
          "After breakfast, fly to the Serengeti. Enjoy lunch at your lodge, followed by an afternoon game drive to begin your wildlife viewing experience.",
      },
      {
        day: 3,
        title: "Serengeti National Park",
        description:
          "Full day of game drives in the Serengeti, with opportunities to see lions, elephants, giraffes, and other wildlife. Enjoy meals at the lodge and evening relaxation time.",
      },
      {
        day: 4,
        title: "Serengeti National Park",
        description:
          "Another full day exploring different regions of the Serengeti, following wildlife movements and experiencing the vast landscapes.",
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro Conservation Area",
        description:
          "Morning game drive in the Serengeti, then transfer to Ngorongoro Conservation Area. Stay at a lodge on the crater rim with spectacular views.",
      },
      {
        day: 6,
        title: "Ngorongoro Crater",
        description:
          "Full-day exploration of Ngorongoro Crater, a UNESCO World Heritage site with one of the highest concentrations of wildlife in Africa.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "After breakfast, transfer to the airport for your departure flight, marking the end of your safari adventure.",
      },
    ],
  }
}

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const tour = getTour(params.id)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [selectedTravelers, setSelectedTravelers] = useState(2)
  const [selectedDate, setSelectedDate] = useState<string>("")

  const handleBookNow = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book this tour",
        variant: "destructive",
      })
      router.push("/sign-in")
      return
    }

    if (!selectedDate) {
      toast({
        title: "Date required",
        description: "Please select a departure date",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the booking data to the server
    // For demo purposes, we'll just navigate to a success page
    router.push(`/booking/success?tourId=${tour.id}&date=${selectedDate}&travelers=${selectedTravelers}`)
  }

  const handleAddToWishlist = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add this tour to your wishlist",
        variant: "destructive",
      })
      router.push("/sign-in")
      return
    }

    setIsAddingToWishlist(true)

    // Simulate API call
    setTimeout(() => {
      setIsInWishlist(!isInWishlist)
      setIsAddingToWishlist(false)

      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: isInWishlist
          ? "This tour has been removed from your wishlist"
          : "This tour has been added to your wishlist",
      })
    }, 1000)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to submit a review",
        variant: "destructive",
      })
      router.push("/sign-in")
      return
    }

    if (!reviewComment.trim()) {
      toast({
        title: "Review required",
        description: "Please enter your review comment",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingReview(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmittingReview(false)
      setReviewComment("")

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })
    }, 1500)
  }

  return (
    <div className="container py-10">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-purple-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/tours" className="hover:text-purple-600">
          Tours
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{tour.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-purple-600 mr-1" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-purple-600 mr-1" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span>
                {tour.rating} ({tour.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <img
              src={tour.images[0] || "/placeholder.svg"}
              alt={tour.title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              {tour.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`Tour image ${index + 1}`}
                  className="w-full h-[120px] object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="included">What's Included</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-6">
              <p className="mb-6">{tour.description}</p>

              <h3 className="text-xl font-semibold mb-4">Highlights</h3>
              <ul className="space-y-2 mb-6">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
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
                      className="h-5 w-5 text-purple-600 mr-2 mt-0.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {highlight}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="itinerary" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {tour.itinerary.map((day, index) => (
                  <AccordionItem key={index} value={`day-${day.day}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <span className="font-semibold">Day {day.day}:</span> {day.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>{day.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="included" className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start">
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
                          className="h-5 w-5 text-green-600 mr-2 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">What's Not Included</h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start">
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
                          className="h-5 w-5 text-red-600 mr-2 mt-0.5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <label className="mr-4 font-medium">Your Rating:</label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Textarea
                        placeholder="Share your experience with this tour..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="w-full"
                      />
                    </div>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isSubmittingReview}>
                      {isSubmittingReview ? "Submitting..." : "Submit Review"}
                    </Button>
                  </form>
                </div>

                {tour.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} mr-1`}
                            />
                          ))}
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 border rounded-lg p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                {tour.discount ? (
                  <>
                    <span className="text-3xl font-bold">${tour.discountPrice}</span>
                    <span className="ml-2 line-through text-muted-foreground">${tour.price}</span>
                    <Badge className="ml-2 bg-red-500">{tour.discount}% OFF</Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold">${tour.price}</span>
                )}
                <span className="text-muted-foreground"> / person</span>
              </div>
            </div>

            <div className="space-y-6 mb-6">
              <div>
                <label className="font-medium mb-2 block">Select Date</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Select a departure date</option>
                  <option value="2023-09-15">September 15, 2023</option>
                  <option value="2023-10-05">October 5, 2023</option>
                  <option value="2023-10-20">October 20, 2023</option>
                  <option value="2023-11-10">November 10, 2023</option>
                  <option value="2023-12-01">December 1, 2023</option>
                </select>
              </div>

              <div>
                <label className="font-medium mb-2 block">Number of Travelers</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedTravelers}
                  onChange={(e) => setSelectedTravelers(Number(e.target.value))}
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4 Travelers</option>
                  <option value="5">5 Travelers</option>
                  <option value="6">6+ Travelers (Group)</option>
                </select>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium">Duration</div>
                  <div className="text-sm text-muted-foreground">{tour.duration}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium">Group Size</div>
                  <div className="text-sm text-muted-foreground">Max 12 people</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleBookNow}>
                Book Now
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}
              >
                <Heart className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                {isAddingToWishlist ? "Processing..." : isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            <div className="mt-6 text-sm text-center text-muted-foreground">
              <p>Need help booking? Call us at</p>
              <p className="font-medium text-foreground">+1 (234) 567-8900</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

