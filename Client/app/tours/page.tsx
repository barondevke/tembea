"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Search, X } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

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
    category: "Adventure",
    continent: "Africa",
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
    category: "Beach",
    continent: "Asia",
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
    category: "Adventure",
    continent: "South America",
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
    category: "Cultural",
    continent: "Asia",
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
    category: "Beach",
    continent: "Europe",
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
    category: "Adventure",
    continent: "South America",
  },
  {
    id: 7,
    title: "Paris City Break",
    location: "France",
    duration: "5 days",
    price: 1199,
    rating: 4.5,
    reviews: 178,
    image: "/paris.jpg",
    category: "City",
    continent: "Europe",
  },
  {
    id: 8,
    title: "Maldives Luxury Getaway",
    location: "Maldives",
    duration: "7 days",
    price: 3299,
    rating: 4.9,
    reviews: 89,
    image: "/maldives.jpg",
    featured: true,
    category: "Luxury",
    continent: "Asia",
  },
  {
    id: 9,
    title: "Iceland Northern Lights Tour",
    location: "Iceland",
    duration: "6 days",
    price: 1899,
    rating: 4.6,
    reviews: 132,
    image: "/iceland.jpg",
    category: "Nature",
    continent: "Europe",
  },
  {
    id: 10,
    title: "Egyptian Pyramids Explorer",
    location: "Egypt",
    duration: "8 days",
    price: 1699,
    rating: 4.7,
    reviews: 145,
    image: "/eygpt.jpg",
    category: "Cultural",
    continent: "Africa",
  },
  {
    id: 11,
    title: "New Zealand Adventure",
    location: "New Zealand",
    duration: "14 days",
    price: 3499,
    rating: 4.9,
    reviews: 87,
    image: "/new-zealand.jpg",
    category: "Adventure",
    continent: "Oceania",
  },
  {
    id: 12,
    title: "Canadian Rockies Expedition",
    location: "Canada",
    duration: "10 days",
    price: 2299,
    rating: 4.8,
    reviews: 104,
    image: "/rockies.jpg",
    category: "Nature",
    continent: "North America",
  },
]

// Sample locations for search
const locations = [
  { value: "tanzania", label: "Tanzania" },
  { value: "indonesia", label: "Indonesia" },
  { value: "brazil", label: "Brazil" },
  { value: "japan", label: "Japan" },
  { value: "greece", label: "Greece" },
  { value: "peru", label: "Peru" },
  { value: "france", label: "France" },
  { value: "maldives", label: "Maldives" },
  { value: "iceland", label: "Iceland" },
  { value: "egypt", label: "Egypt" },
  { value: "new-zealand", label: "New Zealand" },
  { value: "canada", label: "Canada" },
]

export default function ToursPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedContinents, setSelectedContinents] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(0)
  const [sortOption, setSortOption] = useState("recommended")
  const [openLocationPopover, setOpenLocationPopover] = useState(false)

  // Filtered tours
  const [filteredTours, setFilteredTours] = useState(tours)

  // Initialize filters from URL params
  useEffect(() => {
    const destination = searchParams.get("destination")
    if (destination) {
      setSearchQuery(destination)
      const matchedLocation = locations.find((loc) => loc.label.toLowerCase() === destination.toLowerCase())
      if (matchedLocation) {
        setSelectedLocation(matchedLocation.value)
      }
    }

    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice && maxPrice) {
      setPriceRange([Number(minPrice), Number(maxPrice)])
    }

    const categories = searchParams.get("categories")
    if (categories) {
      setSelectedCategories(categories.split(","))
    }

    const durations = searchParams.get("durations")
    if (durations) {
      setSelectedDurations(durations.split(","))
    }

    const continents = searchParams.get("continents")
    if (continents) {
      setSelectedContinents(continents.split(","))
    }

    const rating = searchParams.get("rating")
    if (rating) {
      setMinRating(Number(rating))
    }

    const sort = searchParams.get("sort")
    if (sort) {
      setSortOption(sort)
    }
  }, [searchParams])

  // Apply filters
  useEffect(() => {
    let filtered = [...tours]

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Location filter
    if (selectedLocation) {
      const locationLabel = locations.find((loc) => loc.value === selectedLocation)?.label
      if (locationLabel) {
        filtered = filtered.filter((tour) => tour.location.toLowerCase() === locationLabel.toLowerCase())
      }
    }

    // Price range filter
    filtered = filtered.filter((tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1])

    // Duration filter
    if (selectedDurations.length > 0) {
      filtered = filtered.filter((tour) => {
        const days = Number.parseInt(tour.duration.split(" ")[0])

        return (
          (selectedDurations.includes("1-3") && days >= 1 && days <= 3) ||
          (selectedDurations.includes("4-7") && days >= 4 && days <= 7) ||
          (selectedDurations.includes("8-14") && days >= 8 && days <= 14) ||
          (selectedDurations.includes("15+") && days >= 15)
        )
      })
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((tour) => selectedCategories.includes(tour.category.toLowerCase()))
    }

    // Continent filter
    if (selectedContinents.length > 0) {
      filtered = filtered.filter((tour) => selectedContinents.includes(tour.continent.toLowerCase()))
    }

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((tour) => tour.rating >= minRating)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "duration-short":
        filtered.sort((a, b) => {
          const aDays = Number.parseInt(a.duration.split(" ")[0])
          const bDays = Number.parseInt(b.duration.split(" ")[0])
          return aDays - bDays
        })
        break
      case "duration-long":
        filtered.sort((a, b) => {
          const aDays = Number.parseInt(a.duration.split(" ")[0])
          const bDays = Number.parseInt(b.duration.split(" ")[0])
          return bDays - aDays
        })
        break
      default: // recommended
        filtered.sort((a, b) => {
          // Featured tours first, then by rating
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
    }

    setFilteredTours(filtered)
  }, [
    searchQuery,
    selectedLocation,
    priceRange,
    selectedDurations,
    selectedCategories,
    selectedContinents,
    minRating,
    sortOption,
  ])

  // Update URL with filters
  const applyFilters = () => {
    const params = new URLSearchParams()

    if (searchQuery) params.set("destination", searchQuery)
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 4000) params.set("maxPrice", priceRange[1].toString())
    if (selectedDurations.length > 0) params.set("durations", selectedDurations.join(","))
    if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","))
    if (selectedContinents.length > 0) params.set("continents", selectedContinents.join(","))
    if (minRating > 0) params.set("rating", minRating.toString())
    if (sortOption !== "recommended") params.set("sort", sortOption)

    router.push(`/tours?${params.toString()}`)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedLocation(null)
    setPriceRange([0, 4000])
    setSelectedDurations([])
    setSelectedCategories([])
    setSelectedContinents([])
    setMinRating(0)
    setSortOption("recommended")
    router.push("/tours")
  }

  // Toggle duration selection
  const toggleDuration = (value: string) => {
    setSelectedDurations((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  // Toggle category selection
  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  // Toggle continent selection
  const toggleContinent = (value: string) => {
    setSelectedContinents((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <div className="container py-10">
      {/* Search bar */}
      <div className="mb-8 bg-purple-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Popover open={openLocationPopover} onOpenChange={setOpenLocationPopover}>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedLocation(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start" side="bottom" sideOffset={5}>
                <Command>
                  <CommandInput placeholder="Search locations..." />
                  <CommandList>
                    <CommandEmpty>No locations found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location.value}
                          value={location.value}
                          onSelect={(value) => {
                            setSelectedLocation(value === selectedLocation ? null : value)
                            setSearchQuery(location.label)
                            setOpenLocationPopover(false)
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          {location.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="md:w-[180px]">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="duration-short">Duration: Shortest</SelectItem>
                  <SelectItem value="duration-long">Duration: Longest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={applyFilters}>
            Search
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-72 space-y-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Filters</h3>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset All
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 4000]}
                    min={0}
                    max={4000}
                    step={100}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Duration</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="duration-1-3"
                      checked={selectedDurations.includes("1-3")}
                      onCheckedChange={() => toggleDuration("1-3")}
                    />
                    <label htmlFor="duration-1-3" className="text-sm">
                      1-3 days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="duration-4-7"
                      checked={selectedDurations.includes("4-7")}
                      onCheckedChange={() => toggleDuration("4-7")}
                    />
                    <label htmlFor="duration-4-7" className="text-sm">
                      4-7 days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="duration-8-14"
                      checked={selectedDurations.includes("8-14")}
                      onCheckedChange={() => toggleDuration("8-14")}
                    />
                    <label htmlFor="duration-8-14" className="text-sm">
                      8-14 days
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="duration-15+"
                      checked={selectedDurations.includes("15+")}
                      onCheckedChange={() => toggleDuration("15+")}
                    />
                    <label htmlFor="duration-15+" className="text-sm">
                      15+ days
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {["adventure", "beach", "city", "cultural", "luxury", "nature"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Continents</h4>
                <div className="space-y-2">
                  {["africa", "asia", "europe", "north america", "south america", "oceania"].map((continent) => (
                    <div key={continent} className="flex items-center space-x-2">
                      <Checkbox
                        id={`continent-${continent}`}
                        checked={selectedContinents.includes(continent)}
                        onCheckedChange={() => toggleContinent(continent)}
                      />
                      <label htmlFor={`continent-${continent}`} className="text-sm capitalize">
                        {continent}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any rating</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Tour Packages</h1>
            <p className="text-muted-foreground mt-2 md:mt-0">
              Showing {filteredTours.length} of {tours.length} tours
            </p>
          </div>

          {filteredTours.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No tours found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((tour) => (
                <Card key={tour.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-full h-56 object-cover"
                      />
                      {tour.featured && <Badge className="absolute top-4 left-4 bg-purple-600">Featured</Badge>}
                      {tour.discount && (
                        <Badge className="absolute top-4 right-4 bg-red-500">{tour.discount}% OFF</Badge>
                      )}
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
          )}
        </div>
      </div>
    </div>
  )
}

