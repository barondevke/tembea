"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Calendar, Users, Store, CreditCard, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Total Products",
    value: "156",
    change: "+12%",
    changeType: "increase",
    icon: Package,
  },
  {
    name: "Active Bookings",
    value: "89",
    change: "+8%",
    changeType: "increase",
    icon: Calendar,
  },
  {
    name: "Registered Users",
    value: "2,847",
    change: "+23%",
    changeType: "increase",
    icon: Users,
  },
  {
    name: "Active Sellers",
    value: "34",
    change: "+2%",
    changeType: "increase",
    icon: Store,
  },
  {
    name: "Total Revenue",
    value: "$127,450",
    change: "+15%",
    changeType: "increase",
    icon: CreditCard,
  },
  {
    name: "Growth Rate",
    value: "18.2%",
    change: "+3.1%",
    changeType: "increase",
    icon: TrendingUp,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Tembea admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest tour bookings from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "B12345", tour: "Serengeti Safari", customer: "John Doe", amount: "$1,899" },
                { id: "B12346", tour: "Bali Beach Retreat", customer: "Jane Smith", amount: "$1,299" },
                { id: "B12347", tour: "Kyoto Cultural Journey", customer: "Mike Johnson", amount: "$2,499" },
              ].map((booking) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{booking.tour}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.customer} • {booking.id}
                    </p>
                  </div>
                  <div className="font-medium">{booking.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Most popular tour packages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Serengeti Safari Adventure", bookings: 45, revenue: "$85,455" },
                { name: "Bali Beach Retreat", bookings: 38, revenue: "$49,362" },
                { name: "Kyoto Cultural Journey", bookings: 32, revenue: "$79,968" },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.bookings} bookings</p>
                  </div>
                  <div className="font-medium">{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
