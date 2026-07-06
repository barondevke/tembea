"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function UserDetailPage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    axios.get(`https://tembea.onrender.com/api/user/admin/users/${id}`).then(res => {
      setUser(res.data)
    })
  }, [id])

  if (!user) return <p>Loading user data...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> <Badge>{user.status}</Badge></p>
          <p><strong>Join Date:</strong> {new Date(user.date_created).toLocaleString()}</p>
          <p><strong>Last Login:</strong> {user.last_login ? new Date(user.last_login).toLocaleString() : "Never"}</p>
          <p><strong>Total Spent:</strong> ${user.total_spent.toLocaleString()}</p>
          <p><strong>Total Bookings:</strong> {user.total_bookings}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {user.transactions.length === 0 ? (
            <p className="text-muted-foreground">No transactions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.transactions.map((tx: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>${tx.amount.toLocaleString()}</TableCell>
                    <TableCell><Badge>{tx.status}</Badge></TableCell>
                    <TableCell>{new Date(tx.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {user.bookings.length === 0 ? (
            <p className="text-muted-foreground">No bookings found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Travelers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.bookings.map((booking: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{booking.tour_title}</TableCell>
                    <TableCell>{booking.travelers}</TableCell>
                    <TableCell><Badge>{booking.status}</Badge></TableCell>
                    <TableCell>${booking.price.toLocaleString()}</TableCell>
                    <TableCell>{new Date(booking.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(booking.end_date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
