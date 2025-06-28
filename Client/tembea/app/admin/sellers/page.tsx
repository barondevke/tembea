"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

// Mock data
const mockSellers = [
  {
    id: 1,
    subaccountCode: "SA001",
    name: "Safari Adventures Ltd",
    enabled: true,
    totalProducts: 12,
    totalBookings: 45,
    revenue: 85455,
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    subaccountCode: "SA002",
    name: "Beach Paradise Tours",
    enabled: true,
    totalProducts: 8,
    totalBookings: 32,
    revenue: 49362,
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    subaccountCode: "SA003",
    name: "Cultural Journeys Co",
    enabled: false,
    totalProducts: 6,
    totalBookings: 18,
    revenue: 28740,
    joinDate: "2023-03-10",
  },
]

export default function SellersPage() {
  const [sellers, setSellers] = useState(mockSellers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSeller, setNewSeller] = useState({
    subaccountCode: "",
    name: "",
    enabled: true,
  })
  const { toast } = useToast()

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.subaccountCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddSeller = () => {
    if (!newSeller.subaccountCode || !newSeller.name) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const seller = {
      id: sellers.length + 1,
      subaccountCode: newSeller.subaccountCode,
      name: newSeller.name,
      enabled: newSeller.enabled,
      totalProducts: 0,
      totalBookings: 0,
      revenue: 0,
      joinDate: new Date().toISOString().split("T")[0],
    }

    setSellers([...sellers, seller])
    setNewSeller({ subaccountCode: "", name: "", enabled: true })
    setIsAddDialogOpen(false)

    toast({
      title: "Seller Added",
      description: "New seller has been successfully added.",
    })
  }

  const handleDeleteSeller = (id: number) => {
    setSellers(sellers.filter((s) => s.id !== id))
    toast({
      title: "Seller Deleted",
      description: "Seller has been successfully deleted.",
    })
  }

  const toggleSellerStatus = (id: number) => {
    setSellers(sellers.map((seller) => (seller.id === id ? { ...seller, enabled: !seller.enabled } : seller)))
    toast({
      title: "Status Updated",
      description: "Seller status has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sellers</h1>
          <p className="text-muted-foreground">Manage seller accounts and subaccounts</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Seller
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Seller</DialogTitle>
              <DialogDescription>Create a new seller account with subaccount code.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subaccountCode">Subaccount Code *</Label>
                <Input
                  id="subaccountCode"
                  value={newSeller.subaccountCode}
                  onChange={(e) => setNewSeller({ ...newSeller, subaccountCode: e.target.value })}
                  placeholder="e.g., SA004"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Seller Name *</Label>
                <Input
                  id="name"
                  value={newSeller.name}
                  onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                  placeholder="Company or seller name"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={newSeller.enabled}
                  onCheckedChange={(checked) => setNewSeller({ ...newSeller, enabled: checked })}
                />
                <Label htmlFor="enabled">Enable seller account</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddSeller}>
                Add Seller
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.length}</div>
            <p className="text-xs text-muted-foreground">Registered sellers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.filter((s) => s.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Currently enabled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellers.reduce((sum, seller) => sum + seller.totalProducts, 0)}</div>
            <p className="text-xs text-muted-foreground">From all sellers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${sellers.reduce((sum, seller) => sum + seller.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">From all sellers</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search sellers by name or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Sellers</CardTitle>
          <CardDescription>Manage seller accounts and their subaccount information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subaccount Code</TableHead>
                <TableHead>Seller Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.subaccountCode}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={seller.enabled ? "default" : "secondary"}>
                        {seller.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Switch
                        checked={seller.enabled}
                        onCheckedChange={() => toggleSellerStatus(seller.id)}
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{seller.totalProducts}</TableCell>
                  <TableCell>{seller.totalBookings}</TableCell>
                  <TableCell>${seller.revenue.toLocaleString()}</TableCell>
                  <TableCell>{seller.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSeller(seller.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredSellers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sellers found matching your search.</p>
        </div>
      )}
    </div>
  )
}
