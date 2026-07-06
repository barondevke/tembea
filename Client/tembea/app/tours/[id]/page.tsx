"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ChevronRight, Star, Heart } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { RootState } from "@/redux/store"
import { useSelector, useDispatch } from "react-redux"
import { Loader2 } from "lucide-react";

// Fix the import path - remove the .tsx extension
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import {Tour} from "@/app/tours/[id]/lib"
import axios from "axios"



export default function TourDetailPage({ params }: { params: { id: number } }) {
  const tourDefault : Tour = {
    id: null,
    title: null,
    description: null,
    price: null,
    location: null,
    duration: null,
    images: [],
    reviews: [],
    highlights: [],
    included: [],
    rating:null,
    discount:null,
    discount_price:null,
    notIncluded: [],
    itinerary: [],
    subaccount_code:null,
    currency:null
  };
  const [tour, setTour] = useState<Tour>(tourDefault);



  const getTour = async (id: number ): Promise<void> => {
    try {
      const res = await fetch(`https://tembea.onrender.com/api/tours/${id}`)
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error || "Failed to fetch tour data")
      }

      const data: Tour = await res.json()
      setTour(data)
    } catch (error: any) {
      console.error("getTour error:", error.message)
    }
  }

  useEffect(() => {
    const idAsNumber = params.id
    if (!isNaN(idAsNumber)) {
      getTour(idAsNumber)
    } else {
      console.error("Invalid tour ID:", params.id)
    }
  }, [params.id])
  
  const user = useSelector((state: RootState) => state.user)
  
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);


  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [selectedTravelers, setSelectedTravelers] = useState(2)
  const [selectedDate, setSelectedDate] = useState<string>("")

  function calculateEndDate(startDateStr: string, durationStr: string): string {
    const startDate = new Date(startDateStr); // Convert string to Date object
    
    // Extract the number of days from the duration string (e.g., "7 days" → 7)
    const daysMatch = durationStr.match(/\d+/);
    if (!daysMatch) {
      throw new Error("Invalid duration format");
    }
    const numberOfDays = parseInt(daysMatch[0], 10);
  
    // Add the number of days to the start date
    startDate.setDate(startDate.getDate() + numberOfDays);
  
    // Format the new end date as "YYYY-MM-DD" for database or API use
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(startDate.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }

  function calculateTotalPrice(tourPrice: number | undefined | null, travelers: number): number {
    if (!tourPrice) return 0;
    return tourPrice * travelers;
  }
  
  
  const handleBookNow = async () => {
    if (loading) return;
    setLoading(true);

    if (!user.name) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book this tour",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }
  
    if (!selectedDate) {
      toast({
        title: "Date required",
        description: "Please select a departure date",
        variant: "destructive",
      });
      return;
    }
  
    try {
      
      const bookingResponse = await axios.post("https://tembea.onrender.com/api/bookings/create", {
        user_id: user.id,
        product_id: tour.id,
        start_date: selectedDate,
        end_date: calculateEndDate(selectedDate, tour.duration || "0 days"),
        travelers: selectedTravelers,
        price: calculateTotalPrice(tour.price, selectedTravelers),
      });
      
      const bookingId = bookingResponse.data.booking_id;
  
      // 2. Create Stripe checkout session
      const paymentResponse = await axios.post("https://tembea.onrender.com/api/initiate-payment", {
      email: user.email,
      amount: calculateTotalPrice(tour.price, selectedTravelers), // in USD or base units
      subaccount: tour.subaccount_code,
      currency:tour.currency, // 🛑 Make sure this exists in your tour object
      user_id: user.id,
      booking_id: bookingId,
    });
    console.log(paymentResponse)

    const { authorization_url } = paymentResponse.data;

    // 3. Redirect user to Paystack checkout
    if (authorization_url) {
      window.location.href = authorization_url;
    } else {
      throw new Error("Failed to get Paystack authorization URL");
    }
  
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  
  
  const handleAddToWishlist = async () => {
    if (!user.name) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add this tour to your wishlist",
        variant: "destructive",
      });
      router.push("/sign-in");
      return;
    }
  
    setIsAddingToWishlist(true);
  
    try {
      const response = await axios.post("https://tembea.onrender.com/api/wishlist/add", {
        user_id: user.id,         // Make sure 'user.id' is correct
        product_id: tour.id,       // Assuming 'tour.id' is the current tour
      });
  
      toast({
        title: "Added to wishlist",
        description: "This tour has been added to your wishlist",
      });
      setIsInWishlist(true);
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast({
          title: "Already in wishlist",
          description: "This tour is already in your wishlist",
        });
        setIsInWishlist(true);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong while adding to wishlist",
          variant: "destructive",
        });
      }
    } finally {
      setIsAddingToWishlist(false);
    }
  };

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

  const handleBuyNow = async () => {
    ;
    try {
      const response = await fetch("https://tembezi.co.ke/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        console.error("Checkout session failed");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
    setLoading(false);
  };

  

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
              alt={tour.title || "main-image"}
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
          <TabsList className="flex flex-wrap sm:grid sm:grid-cols-4 gap-2 sm:gap-0 w-full mb-4">
          <TabsTrigger
  value="overview"
  className="flex-1 sm:flex-none text-sm sm:text-base data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors rounded-md"
>
    Overview
  </TabsTrigger>
  <TabsTrigger
  value="itinerary"
  className="flex-1 sm:flex-none text-sm sm:text-base data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors rounded-md"
>
  Itinerary
</TabsTrigger>

<TabsTrigger
  value="included"
  className="flex-1 sm:flex-none text-sm sm:text-base data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors rounded-md"
>
  What's Included
</TabsTrigger>

<TabsTrigger
  value="reviews"
  className="flex-1 sm:flex-none text-sm sm:text-base data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors rounded-md"
>
  Reviews
</TabsTrigger>
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

                {tour.reviews.map((review,index) => (
                  <div key={review.id || index} className="border-b pb-6 last:border-0">
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
      <span className="text-3xl font-bold">
        {tour.currency === "KES" ? "Ksh" : "$"}
        {tour.discount_price}
      </span>
      <span className="text-muted-foreground"> / person</span>
     
      <br/>
      <span className="text-xl font-bold ml-2 line-through text-muted-foreground">
        {tour.currency === "KES" ? "Ksh" : "$"}
        {tour.price}
      </span>
      <Badge className="ml-2 bg-red-500">{tour.discount}% OFF</Badge>
      
     
    </>
  ) : (
    <span className="text-3xl font-bold">
      {tour.currency === "KES" ? "Ksh" : "$"}
      {tour.price}
    </span>
  )}
  
</div>

            </div>

            <div className="space-y-6 mb-6">

            <div className="md">
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className=" w-full justify-start text-left font-big bg-white/20 border-white/10 text-black"
      >
        <Calendar className="mr-2 h-4 w-4" />
        {selectedDate
          ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : "Select date"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 mt-2" align="start">
    <CalendarComponent
  mode="single"
  selected={selectedDate ? new Date(selectedDate) : undefined}
  onSelect={(date) => {
    if (date) {
      // Fix timezone issue by setting time to midnight in local time
      const localDate = new Date(date);
      localDate.setHours(12, 0, 0, 0); // Ensures it stays on the correct day
      setSelectedDate(localDate.toISOString().split('T')[0]); // Keep YYYY-MM-DD format
    }
  }}
  initialFocus
  disabled={(date) => date < new Date()} // Disable past dates
/>

    </PopoverContent>
  </Popover>
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
            <Button
  className="w-full bg-purple-600 hover:bg-purple-700"
  onClick={handleBookNow}
  disabled={loading}
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="animate-spin w-4 h-4" />
      Booking...
    </div>
  ) : (
    "Book Now"
  )}
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

