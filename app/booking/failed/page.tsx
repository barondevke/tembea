"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BookingFailedPage() {
  const searchParams = useSearchParams()
  const [errorDetails, setErrorDetails] = useState({
    tourId: "",
    errorCode: "",
    errorMessage: "",
  })

  useEffect(() => {
    const tourId = searchParams.get("tourId") || ""
    const errorCode = searchParams.get("errorCode") || "PAYMENT_FAILED"

    let errorMessage = "We were unable to process your booking. Please try again."

    switch (errorCode) {
      case "PAYMENT_FAILED":
        errorMessage = "Your payment could not be processed. Please check your payment details and try again."
        break
      case "AVAILABILITY":
        errorMessage = "We're sorry, but this tour is no longer available for the selected dates."
        break
      case "SESSION_EXPIRED":
        errorMessage = "Your booking session has expired. Please start the booking process again."
        break
      case "TECHNICAL_ERROR":
        errorMessage = "A technical error occurred while processing your booking. Our team has been notified."
        break
    }

    setErrorDetails({
      tourId,
      errorCode,
      errorMessage,
    })
  }, [searchParams])

  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Failed</h1>
          <p className="text-xl text-muted-foreground">We encountered an issue while processing your booking.</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="border-b pb-4">
            <h2 className="text-xl font-semibold">What Happened?</h2>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">{errorDetails.errorMessage}</p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-amber-800 mb-2">Error Details</h3>
              <p className="text-amber-700">Error Code: {errorDetails.errorCode}</p>
              {errorDetails.tourId && <p className="text-amber-700">Tour ID: {errorDetails.tourId}</p>}
            </div>

            <h3 className="font-semibold mb-2">What You Can Do:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Try booking again with a different payment method</li>
              <li>Check your internet connection and refresh the page</li>
              <li>Select different travel dates if availability was the issue</li>
              <li>Contact our customer support team for assistance</li>
            </ul>
          </CardContent>
        </Card>

        <div className="bg-purple-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="mb-4">
            Our customer support team is available to assist you with your booking. Please contact us at
            <a href="mailto:support@tembea.com" className="text-purple-600 hover:text-purple-800">
              {" "}
              support@tembea.com
            </a>{" "}
            or call us at <span className="font-medium">+1 (234) 567-8900</span>.
          </p>
          <p>
            When contacting us, please reference the error code shown above to help us resolve your issue more quickly.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href={errorDetails.tourId ? `/tours/${errorDetails.tourId}` : "/tours"}>Try Again</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tours">Browse Other Tours</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

