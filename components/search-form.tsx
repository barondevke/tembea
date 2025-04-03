"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchForm() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState<Date>()
  const [travelers, setTravelers] = useState("2")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Create search parameters
    const params = new URLSearchParams()
    if (destination) params.set("destination", destination)
    if (date) params.set("date", date.toISOString().split("T")[0])
    if (travelers) params.set("travelers", travelers)

    // Navigate to search results
    router.push(`/tours?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Where do you want to go?"
          className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-white/70"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="md:w-[180px]">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white/20 border-white/20 text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:w-[150px]">
        <Select value={travelers} onValueChange={setTravelers}>
          <SelectTrigger className="bg-white/20 border-white/20 text-white">
            <Users className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Travelers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Traveler</SelectItem>
            <SelectItem value="2">2 Travelers</SelectItem>
            <SelectItem value="3">3 Travelers</SelectItem>
            <SelectItem value="4">4 Travelers</SelectItem>
            <SelectItem value="5+">5+ Travelers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="bg-purple-600 hover:bg-purple-700 md:w-[120px]">
        Search
      </Button>
    </form>
  )
}

