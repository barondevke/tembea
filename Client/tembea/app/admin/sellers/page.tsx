"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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

type Seller = {
  id: number
  name: string
  subaccount_code: string
  enabled: boolean
  totalProducts: number
}

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSeller, setNewSeller] = useState({
    subaccount_code: "",
    name: "",
    enabled: true,
  })
  const { toast } = useToast()

  // Fetch sellers from API
  useEffect(() => {
    axios
      .get("https://tembea.onrender.com/api/sellers")
      .then((res) => setSellers(res.data))
      .catch((err) => {
        toast({
          title: "Error loading sellers",
          description: err.message,
          variant: "destructive",
        })
      })
  }, [])

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.subaccount_code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddSeller = async () => {
    if (!newSeller.subaccount_code || !newSeller.name) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      const res = await axios.post("https://tembea.onrender.com/api/sellers", newSeller)
      const newEntry: Seller = {
        id: res.data.sellerId,
        name: newSeller.name,
        subaccount_code: newSeller.subaccount_code,
        enabled: newSeller.enabled,
        totalProducts: 0,
      }

      setSellers((prev) => [newEntry, ...prev])
      setNewSeller({ subaccount_code: "", name: "", enabled: true })
      setIsAddDialogOpen(false)

      toast({
        title: "Seller Added",
        description: "New seller has been successfully added.",
      })
    } catch (err: any) {
      toast({
        title: "Failed to add seller",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      })
    }
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
                  value={newSeller.subaccount_code}
                  onChange={(e) => setNewSeller({ ...newSeller, subaccount_code: e.target.value })}
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.subaccount_code}</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>
                    <Badge variant={seller.enabled ? "default" : "secondary"}>
                      {seller.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>{seller.totalProducts}</TableCell>
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
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
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
