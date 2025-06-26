"use client"

import { useState } from "react"
import {
  Users,
  Package,
  Calendar,
  DollarSign,
  Store,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  MoreHorizontal,
  Settings,
  LogOut,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Sample data
const sampleProducts = [
  {
    id: 1,
    title: "Serengeti Safari Adventure",
    location: "Tanzania",
    price: 1899,
    duration: "7 days",
    category: "Adventure",
    status: "active",
    bookings: 24,
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Bali Beach Retreat",
    location: "Indonesia",
    price: 1299,
    duration: "10 days",
    category: "Beach",
    status: "active",
    bookings: 18,
    createdAt: "2024-01-20",
  },
]

const sampleBookings = [
  {
    id: "BK001",
    userId: "USR001",
    userName: "John Doe",
    userEmail: "john@example.com",
    productId: 1,
    productTitle: "Serengeti Safari Adventure",
    amount: 1899,
    status: "confirmed",
    bookingDate: "2024-01-25",
    travelDate: "2024-03-15",
  },
  {
    id: "BK002",
    userId: "USR002",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    productId: 2,
    productTitle: "Bali Beach Retreat",
    amount: 1299,
    status: "pending",
    bookingDate: "2024-01-26",
    travelDate: "2024-04-10",
  },
]

const sampleUsers = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john@example.com",
    role: "customer",
    status: "active",
    joinDate: "2024-01-10",
    totalBookings: 3,
    totalSpent: 4500,
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    status: "active",
    joinDate: "2024-01-12",
    totalBookings: 1,
    totalSpent: 1299,
  },
]

const sampleSellers = [
  {
    id: "SEL001",
    name: "Adventure Tours Co.",
    subaccountCode: "ADV001",
    email: "contact@adventuretours.com",
    enabled: true,
    commission: 15,
    totalSales: 25000,
    createdAt: "2024-01-01",
  },
  {
    id: "SEL002",
    name: "Beach Paradise Ltd.",
    subaccountCode: "BCH002",
    email: "info@beachparadise.com",
    enabled: true,
    commission: 12,
    totalSales: 18000,
    createdAt: "2024-01-05",
  },
]

const sampleTransactions = [
  {
    id: "TXN001",
    bookingId: "BK001",
    userId: "USR001",
    userName: "John Doe",
    amount: 1899,
    type: "payment",
    status: "completed",
    method: "credit_card",
    date: "2024-01-25",
    sellerId: "SEL001",
  },
  {
    id: "TXN002",
    bookingId: "BK002",
    userId: "USR002",
    userName: "Jane Smith",
    amount: 1299,
    type: "payment",
    status: "pending",
    method: "bank_transfer",
    date: "2024-01-26",
    sellerId: "SEL002",
  },
]

interface Product {
  id: number
  title: string
  location: string
  price: number
  duration: string
  category: string
  status: string
  bookings: number
  createdAt: string
}

interface Booking {
  id: string
  userId: string
  userName: string
  userEmail: string
  productId: number
  productTitle: string
  amount: number
  status: string
  bookingDate: string
  travelDate: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  joinDate: string
  totalBookings: number
  totalSpent: number
}

interface Seller {
  id: string
  name: string
  subaccountCode: string
  email: string
  enabled: boolean
  commission: number
  totalSales: number
  createdAt: string
}

interface Transaction {
  id: string
  bookingId: string
  userId: string
  userName: string
  amount: number
  type: string
  status: string
  method: string
  date: string
  sellerId: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings)
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [sellers, setSellers] = useState<Seller[]>(sampleSellers)
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions)

  // Form states
  const [newProduct, setNewProduct] = useState({
    title: "",
    location: "",
    price: "",
    duration: "",
    category: "",
    description: "",
  })

  const [newSeller, setNewSeller] = useState({
    name: "",
    subaccountCode: "",
    email: "",
    enabled: true,
    commission: "",
  })

  // Search states
  const [productSearch, setProductSearch] = useState("")
  const [bookingSearch, setBookingSearch] = useState("")
  const [userSearch, setUserSearch] = useState("")
  const [transactionSearch, setTransactionSearch] = useState("")

  // Dialog states
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isSellerDialogOpen, setIsSellerDialogOpen] = useState(false)

  // Sidebar menu items
  const menuItems = [
    { title: "Overview", icon: Shield, id: "overview" },
    { title: "Products", icon: Package, id: "products" },
    { title: "Bookings", icon: Calendar, id: "bookings" },
    { title: "Users", icon: Users, id: "users" },
    { title: "Sellers", icon: Store, id: "sellers" },
    { title: "Transactions", icon: DollarSign, id: "transactions" },
  ]

  // Product functions
  const addProduct = () => {
    if (!newProduct.title || !newProduct.location || !newProduct.price) return

    const product: Product = {
      id: products.length + 1,
      title: newProduct.title,
      location: newProduct.location,
      price: Number(newProduct.price),
      duration: newProduct.duration,
      category: newProduct.category,
      status: "active",
      bookings: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setProducts([...products, product])
    setNewProduct({ title: "", location: "", price: "", duration: "", category: "", description: "" })
    setIsProductDialogOpen(false)
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  // Seller functions
  const addSeller = () => {
    if (!newSeller.name || !newSeller.subaccountCode || !newSeller.email) return

    const seller: Seller = {
      id: `SEL${String(sellers.length + 1).padStart(3, "0")}`,
      name: newSeller.name,
      subaccountCode: newSeller.subaccountCode,
      email: newSeller.email,
      enabled: newSeller.enabled,
      commission: Number(newSeller.commission) || 10,
      totalSales: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setSellers([...sellers, seller])
    setNewSeller({ name: "", subaccountCode: "", email: "", enabled: true, commission: "" })
    setIsSellerDialogOpen(false)
  }

  // Filter functions
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.location.toLowerCase().includes(productSearch.toLowerCase()),
  )

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.userName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      booking.productTitle.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      booking.id.toLowerCase().includes(bookingSearch.toLowerCase()),
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()),
  )

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.userName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
      transaction.id.toLowerCase().includes(transactionSearch.toLowerCase()),
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-6 w-6 text-purple-600" />
              <span className="font-semibold text-lg">Admin Panel</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton onClick={() => setActiveTab(item.id)} isActive={activeTab === item.id}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
            </div>
          </header>

          <main className="flex-1 p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{products.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{bookings.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{users.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{booking.userName}</p>
                              <p className="text-sm text-muted-foreground">{booking.productTitle}</p>
                            </div>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                          <div key={product.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-muted-foreground">{product.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${product.price}</p>
                              <p className="text-sm text-muted-foreground">{product.bookings} bookings</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search products..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="pl-8 w-[300px]"
                      />
                    </div>
                  </div>

                  <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Create a new tour product</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={newProduct.location}
                            onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              type="number"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                              id="duration"
                              value={newProduct.duration}
                              onChange={(e) => setNewProduct({ ...newProduct, duration: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newProduct.category}
                            onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="adventure">Adventure</SelectItem>
                              <SelectItem value="beach">Beach</SelectItem>
                              <SelectItem value="cultural">Cultural</SelectItem>
                              <SelectItem value="nature">Nature</SelectItem>
                              <SelectItem value="luxury">Luxury</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsProductDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addProduct} className="bg-purple-600 hover:bg-purple-700">
                          Add Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.title}</TableCell>
                          <TableCell>{product.location}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>{product.duration}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={product.status === "active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.bookings}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this product? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteProduct(product.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Booking Date</TableHead>
                        <TableHead>Travel Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.userName}</p>
                              <p className="text-sm text-muted-foreground">{booking.userEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>{booking.productTitle}</TableCell>
                          <TableCell>${booking.amount}</TableCell>
                          <TableCell>
                            <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{booking.bookingDate}</TableCell>
                          <TableCell>{booking.travelDate}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Users
                  </Button>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Total Bookings</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>{user.totalBookings}</TableCell>
                          <TableCell>${user.totalSpent}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Sellers Tab */}
            {activeTab === "sellers" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Sellers Management</h2>

                  <Dialog open={isSellerDialogOpen} onOpenChange={setIsSellerDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Seller
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Seller</DialogTitle>
                        <DialogDescription>Create a new seller account</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="seller-name">Name</Label>
                          <Input
                            id="seller-name"
                            value={newSeller.name}
                            onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="subaccount-code">Subaccount Code</Label>
                          <Input
                            id="subaccount-code"
                            value={newSeller.subaccountCode}
                            onChange={(e) => setNewSeller({ ...newSeller, subaccountCode: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="seller-email">Email</Label>
                          <Input
                            id="seller-email"
                            type="email"
                            value={newSeller.email}
                            onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="commission">Commission (%)</Label>
                          <Input
                            id="commission"
                            type="number"
                            value={newSeller.commission}
                            onChange={(e) => setNewSeller({ ...newSeller, commission: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="enabled"
                            checked={newSeller.enabled}
                            onCheckedChange={(checked: any) => setNewSeller({ ...newSeller, enabled: checked })}
                          />
                          <Label htmlFor="enabled">Enabled</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSellerDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addSeller} className="bg-purple-600 hover:bg-purple-700">
                          Add Seller
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Seller</TableHead>
                        <TableHead>Subaccount Code</TableHead>
                        <TableHead>Commission</TableHead>
                        <TableHead>Total Sales</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellers.map((seller) => (
                        <TableRow key={seller.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{seller.name}</p>
                              <p className="text-sm text-muted-foreground">{seller.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{seller.subaccountCode}</TableCell>
                          <TableCell>{seller.commission}%</TableCell>
                          <TableCell>${seller.totalSales.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={seller.enabled ? "default" : "secondary"}>
                              {seller.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </TableCell>
                          <TableCell>{seller.createdAt}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>{seller.enabled ? "Disable" : "Enable"}</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === "transactions" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={transactionSearch}
                      onChange={(e) => setTransactionSearch(e.target.value)}
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.userName}</TableCell>
                          <TableCell>{transaction.bookingId}</TableCell>
                          <TableCell>${transaction.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.method.replace("_", " ")}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
