"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users, MapPin, Calendar, ExternalLink, Share2, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MOCK_CLUBS } from "@/lib/mock-clubs"

interface TravelClubDetailProps {
  clubId: number
}

function TravelClubDetail({ clubId }: TravelClubDetailProps) {
  const [isLiked, setIsLiked] = useState(false)

  // ✅ Now both `clubId` and `c.id` are numbers
  console.log("Looking for clubId:", clubId, "Available IDs:", MOCK_CLUBS.map(c => c.id))

  const club = MOCK_CLUBS.find((c) => c.id === clubId)

  if (!club) {
    return (
      <div className="container py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Club Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The travel club you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/travel-clubs">Back to Travel Clubs</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleJoinWhatsApp = () => {
    window.open(club.whatsappLink, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: club.name,
          text: club.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="container py-10">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/travel-clubs" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Travel Clubs
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section */}
          <div className="relative">
            <img
              src={club.image || "/placeholder.svg"}
              alt={club.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-purple-600 text-white">{club.category}</Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className="bg-white/90 hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleShare} className="bg-white/90 hover:bg-white">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Club Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{club.name}</h1>

            <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{club.memberCount.toLocaleString()} members</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{club.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Founded in {club.founded}</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6">{club.description}</p>
          </div>

          {/* Bio Section */}
          <Card>
            <CardHeader>
              <CardTitle>About {club.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{club.bio}</p>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card>
            <CardHeader>
              <CardTitle>What We Do</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {club.activities.map((activity, index) => (
                  <Badge key={index} variant="outline">
                    {activity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join WhatsApp Card */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800">Join Our Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-purple-700">
                Connect with {club.memberCount.toLocaleString()} fellow travelers and stay updated on upcoming trips and
                events.
              </p>
              <Button onClick={handleJoinWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join WhatsApp Group
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By joining, you agree to our community guidelines
              </p>
            </CardContent>
          </Card>

          {/* Next Trip Card */}
          {club.nextTrip && (
            <Card>
              <CardHeader>
                <CardTitle>Next Group Trip</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{club.nextTrip.destination}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(club.nextTrip.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <span className="text-xl font-bold text-purple-600">${club.nextTrip.price}</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Club Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Club Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-semibold">{club.memberCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Founded</span>
                <span className="font-semibold">{club.founded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="outline">{club.category}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Similar Clubs */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Clubs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_CLUBS.filter((c) => c.id !== club.id && c.category === club.category)
                  .slice(0, 3)
                  .map((similarClub) => (
                    <Link
                      key={similarClub.id}
                      href={`/travel-clubs/${similarClub.id}`}
                      className="block p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <h5 className="font-medium text-sm">{similarClub.name}</h5>
                      <p className="text-xs text-muted-foreground">{similarClub.memberCount} members</p>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- Rest of your UI here (unchanged) --- */}
    </div>
  )
}

// ✅ Important: params are always strings in Next.js
export default function Page({ params }: { params: { id: string } }) {
  const clubId = Number(params.id) // convert string → number
  return <TravelClubDetail clubId={clubId} />
}
