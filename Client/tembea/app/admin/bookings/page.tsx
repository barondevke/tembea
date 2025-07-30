"use client"

import { useState,useEffect } from "react"
import { Search, Eye, Calendar, User } from "lucide-react"
import axios from 'axios'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data
const mockBookings = [
  {
    id: "B12345",
    tourName: "Serengeti Safari Adventure",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    startDate: "2023-09-15",
    endDate: "2023-09-22",
    travelers: 2,
    totalAmount: 3798,
    status: "confirmed",
    bookingDate: "2023-08-10",
  },
  {
    id: "B12346",
    tourName: "Bali Beach Retreat",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    startDate: "2023-11-10",
    endDate: "2023-11-20",
    travelers: 1,
    totalAmount: 1299,
    status: "pending",
    bookingDate: "2023-08-12",
  },
  {
    id: "B12347",
    tourName: "Kyoto Cultural Journey",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@example.com",
    startDate: "2024-03-05",
    endDate: "2024-03-17",
    travelers: 3,
    totalAmount: 7497,
    status: "confirmed",
    bookingDate: "2023-08-15",
  },
]

type Booking = {
  bookingId: string;
  tourName: string;
  customerName: string;
  customerEmail: string;
  startDate: string;      // ISO date format
  endDate: string;
  travelers: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled'; // if these are your possible values
  bookingDate: string;
};


export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings", err))
  }, [])
  
  const filteredBookings = bookings.filter(
    (booking: any) =>
      String(booking.bookingId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage customer bookings and reservations</p>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bookings by ID, customer, or tour..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>A list of all customer bookings and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead>Travelers</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell className="font-medium">{booking.bookingId}</TableCell>

                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.tourName}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p>{formatDateTime(booking.startDate)}</p>

                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      {booking.travelers}
                    </div>
                  </TableCell>
                  <TableCell>${booking.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                          <DialogDescription>Complete information for booking {selectedBooking?.bookingId}</DialogDescription>
                        </DialogHeader>
                        {selectedBooking && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Booking ID</p>
                                <p className="text-sm text-muted-foreground">{selectedBooking.bookingId}</p>

                               </div>
                              <div>
                                <p className="text-sm font-medium">Status</p>
                                <Badge className={getStatusColor(selectedBooking.status)}>
                                  {selectedBooking.status}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Customer</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.customerName}</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.customerEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Tour</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.tourName}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Start Date</p>
                                <p className="text-sm text-muted-foreground">{selectedBooking.startDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">End Date</p>
                                <p className="text-sm text-muted-foreground">{selectedBooking.endDate}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Travelers</p>
                                <p className="text-sm text-muted-foreground">{selectedBooking.travelers}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Total Amount</p>
                                <p className="text-sm text-muted-foreground">
                                  ${selectedBooking.totalAmount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Booking Date</p>
                              <p className="text-sm text-muted-foreground">{selectedBooking.bookingDate}</p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bookings found matching your search.</p>
        </div>
      )}
    </div>
  )
}
