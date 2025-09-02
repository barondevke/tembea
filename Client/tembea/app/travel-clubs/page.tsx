"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Users, MapPin, Calendar, ArrowRight, Mail, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_CLUBS } from "@/lib/mock-clubs"

export default function TravelClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortOption, setSortOption] = useState("members")

  // Get unique categories
  const categories = Array.from(new Set(MOCK_CLUBS.map((club) => club.category)))

  // Filter clubs
  const filteredClubs = MOCK_CLUBS.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sort clubs
  const sortedClubs = [...filteredClubs].sort((a, b) => {
    switch (sortOption) {
      case "members":
        return b.memberCount - a.memberCount
      case "name":
        return a.name.localeCompare(b.name)
      case "newest":
        return new Date(b.founded).getTime() - new Date(a.founded).getTime()
      default:
        return 0
    }
  })

  const handleCreateClubClick = () => {
    const subject = "Create New Travel Club - Application"
    const body = `Hi Travel Platform Team,

I'm interested in creating my own travel club on your platform. Here are some initial details:

Club Name: [Your club name here]
Category: [e.g., Adventure, Cultural, Budget Travel, etc.]
Location Focus: [e.g., Global, Europe, Asia, etc.]
Brief Description: [Tell us about your club concept]

WhatsApp Group: [If you already have one, paste the link here]

Please let me know the next steps to get my travel club listed on the platform.

Best regards,
[Your name]
[Your contact information]`

    const mailtoLink = `mailto:clubs@travelplatform.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Travel Clubs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with like-minded travelers, join exciting group trips, and build lasting friendships through our
          diverse travel communities.
        </p>
      </div>

      {/* Create Club Banner */}
      <div className="mb-8">
        <div
          onClick={handleCreateClubClick}
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 p-8 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-white">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <Plus className="h-8 w-8 mr-3 bg-white/20 p-1.5 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-bold">Start Your Own Travel Club</h2>
              </div>
              <p className="text-lg opacity-90 mb-4 max-w-md">
                Have a unique travel passion? Create your own community and lead amazing adventures with fellow
                travelers.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Free to Create
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Build Community
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Lead Adventures
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-center">
  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-4">
    <Mail className="h-12 w-12 text-white" />
  </div>
  <p className="text-sm text-white font-medium">admin@tembezi.co.ke</p>
  <p className="text-xs opacity-75 mt-1">Reach us anytime</p>
</div>

          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-purple-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search travel clubs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:w-[200px]">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:w-[180px]">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="members">Most Members</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {sortedClubs.length} of {MOCK_CLUBS.length} travel clubs
        </p>
      </div>

      {/* Clubs Grid */}
      {sortedClubs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No clubs found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedClubs.map((club) => (
            <Card key={club.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <img src={club.image || "/placeholder.svg"} alt={club.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 left-4 bg-purple-600">{club.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{club.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{club.memberCount.toLocaleString()} members</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{club.location}</span>
                  </div>

                  {club.nextTrip && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Next trip: {club.nextTrip.destination}</span>
                    </div>
                  )}
                </div>

                {club.nextTrip && (
                  <div className="bg-purple-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-purple-800">Upcoming: {club.nextTrip.destination}</p>
                    <p className="text-xs text-purple-600">
                      {new Date(club.nextTrip.date).toLocaleDateString()} • From ${club.nextTrip.price}
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href={`/travel-clubs/${club.id}`} className="flex items-center justify-center gap-2">
                    View Club
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Additional Info Section */}
      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Create Your Own Travel Club?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of club leaders who have built thriving travel communities around their passions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Build Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with travelers who share your specific interests and travel style
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Lead Adventures</h3>
            <p className="text-sm text-muted-foreground">
              Organize and lead trips to destinations you're passionate about
            </p>
          </div>

          <div className="text-center">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="font-semibold mb-2">Free Platform</h3>
            <p className="text-sm text-muted-foreground">
              No fees to create your club - just bring your passion for travel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
