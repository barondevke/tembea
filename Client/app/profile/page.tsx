"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Fix the import path - remove the .tsx extension
import { useAuth } from "@/lib/auth"
import { RootState } from "@/redux/store"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import axios from "axios"
// Sample booking data
const bookings = [
  {
    id: "B12345",
    tourName: "Serengeti Safari Adventure",
    location: "Tanzania",
    startDate: "Sep 15, 2023",
    endDate: "Sep 22, 2023",
    status: "Completed",
    price: 1899,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "B12346",
    tourName: "Bali Beach Retreat",
    location: "Indonesia",
    startDate: "Nov 10, 2023",
    endDate: "Nov 20, 2023",
    status: "Upcoming",
    price: 1299,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "B12347",
    tourName: "Kyoto Cultural Journey",
    location: "Japan",
    startDate: "Mar 5, 2024",
    endDate: "Mar 17, 2024",
    status: "Pending",
    price: 2499,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Sample wishlist data


export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user)
   const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(user)
  const router = useRouter()

  useEffect(() => {
    if (!user?.name) {
      router.replace("/")
    }
  }, [])

  if (!user?.name) {
    return null // Prevent render during redirect
  }

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return; // Make sure user is logged in
  
      try {
        const response = await axios.get(`http://localhost:4000/api/wishlist/user/${user.id}`);
        const productIds = response.data.wishlist.map((item: any) => item.product_id);
  
        // OPTIONAL: Fetch full product details if you only have product IDs
        const productDetails = await Promise.all(
          productIds.map(async (productId: number) => {
            // Example: get details from your product API
            const productResponse = await axios.get(`http://localhost:4000/api/tours/${productId}`);
            return productResponse.data;
          })
        );
  
        setWishlist(productDetails);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchWishlist();
  }, [user]);
  
  if (loading) {
    return <div>Loading wishlist...</div>;
  }
  

      return (
        <div className="container py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={"/profile.jpg"} alt={user.name || "User"} />
                      <AvatarFallback className="text-2xl">{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">Member Since</div>
                      <div className="text-sm text-muted-foreground">April 2023</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Membership Status</div>
                      <div className="text-sm text-purple-600">Silver Member</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Loyalty Points</div>
                      <div className="text-sm text-muted-foreground">2,450 points</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
    
              <div className="mt-6 space-y-4">
                <Button variant="ghost" className="w-full justify-start">
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
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m8 17 4 4 4-4" />
                  </svg>
                  Download Travel Documents
                </Button>
                <Button variant="ghost" className="w-full justify-start">
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
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
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
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Logout
                </Button>
              </div>
            </div>
    
            <div className="md:col-span-2">
              <Tabs defaultValue="bookings">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                </TabsList>
    
                <TabsContent value="bookings" className="pt-6">
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <img
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.tourName}
                              className="w-full md:w-40 h-32 rounded-md object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                <h3 className="text-lg font-semibold">{booking.tourName}</h3>
                                <div>
                                  <Badge
                                    className={`
                                    ${booking.status === "Completed" ? "bg-green-500" : ""}
                                    ${booking.status === "Upcoming" ? "bg-purple-600" : ""}
                                    ${booking.status === "Pending" ? "bg-yellow-500" : ""}
                                  `}
                                  >
                                    {booking.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                                <div>
                                  <div className="text-sm font-medium">Booking ID</div>
                                  <div className="text-sm text-muted-foreground">{booking.id}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Location</div>
                                  <div className="text-sm text-muted-foreground">{booking.location}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Travel Date</div>
                                  <div className="text-sm text-muted-foreground">
                                    {booking.startDate} - {booking.endDate}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">Price</div>
                                  <div className="text-sm text-muted-foreground">${booking.price}</div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                {booking.status === "Completed" && (
                                  <Button variant="outline" size="sm">
                                    Write Review
                                  </Button>
                                )}
                                {booking.status !== "Completed" && (
                                  <Button variant="outline" size="sm">
                                    Modify Booking
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
    
                <TabsContent value="wishlist" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                      <Card key={item.id}>
                        <CardHeader className="p-0">
                          <img
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-t-lg"
                          />
                        </CardHeader>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <div className="flex items-center text-muted-foreground text-sm mb-2">
                            <span>{item.location}</span>
                            <span className="mx-2">•</span>
                            <span>{item.duration}</span>
                          </div>
                          <div className="mb-4">
                            <span className="text-lg font-bold">${item.price}</span>
                            <span className="text-muted-foreground"> / person</span>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                              <a href={`/tours/${item.id}`}>View Details</a>
                            </Button>
                            <Button variant="outline" size="icon">
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
                                className="h-4 w-4"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              </svg>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )
  }

  


