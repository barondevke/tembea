"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, Users, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

// This would typically come from a database

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState({
    tourId: "",
    date: "",
    travelers: 0,
    bookingId: "",
    tour: null as any,
  })

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (!bookingId) return;
  
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/bookings/${bookingId}`);
        const data = await response.json();
  
        setBookingDetails({
          tourId: data.product_id,
          date: data.start_date,
          travelers: data.travelers,
          bookingId: data.id,
          tour: data.tour // OR fetch real tour data
        });
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      }
    };
  
    fetchBookingDetails();
  }, [searchParams]);
  if (!bookingDetails.tour) {
    return <div className="container py-20 text-center">Loading booking details...</div>
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateTotal = () => {
    const basePrice =parseInt(bookingDetails.tour.discount_price) ?? parseInt(bookingDetails.tour.price);
  
    console.log(basePrice);
    return basePrice * bookingDetails.travelers;
  };
  

  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground">Thank you for booking with Tembea. Your adventure awaits!</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="border-b pb-4">
            <h2 className="text-xl font-semibold">Booking Details</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Booking Reference</h3>
                <p className="text-lg font-semibold">{bookingDetails.bookingId}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Booking Date</h3>
                <p className="text-lg">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Departure Date</h3>
                <p className="text-lg">{formatDate(bookingDetails.date)}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground mb-2">Number of Travelers</h3>
                <p className="text-lg">
                  {bookingDetails.travelers} {bookingDetails.travelers === 1 ? "person" : "people"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="border-b pb-4">
            <h2 className="text-xl font-semibold">Tour Information</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
            <img
  src={bookingDetails.tour.images[0]}
  alt={bookingDetails.tour.title}
  className="w-full md:w-1/3 h-48 object-cover rounded-lg"
/>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{bookingDetails.tour.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-purple-600 mr-2" />
                    <span>{bookingDetails.tour.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                    <span>{bookingDetails.tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-purple-600 mr-2" />
                    <span>
                      {bookingDetails.travelers} {bookingDetails.travelers === 1 ? "Traveler" : "Travelers"}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per person:</span>
                    <span>
                      ${parseInt(bookingDetails.tour.discount) ? parseInt(bookingDetails.tour.discount_price) : parseInt(bookingDetails.tour.price)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Number of travelers:</span>
                    <span>{bookingDetails.travelers}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <p className="mb-4">
            We've sent a confirmation email to your registered email address with all the details of your booking. Our
            team will contact you shortly to discuss any specific requirements and provide additional information about
            your tour.
          </p>
          <p>
            If you have any questions or need to make changes to your booking, please contact our customer support team
            at
            <a href="mailto:support@tembea.com" className="text-purple-600 hover:text-purple-800">
              {" "}
              support@tembea.com
            </a>{" "}
            or call us at <span className="font-medium">+1 (234) 567-8900</span>.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/profile">View My Bookings</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tours">Browse More Tours</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

