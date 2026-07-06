"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { useToast } from "@/components/ui/use-toast"

// Mock data
const mockProducts = [
  {
    id: 1,
    title: "Serengeti Safari Adventure",
    location: "Tanzania",
    duration: "7 days",
    price: 1899,
    status: "active",
    bookings: 45,
    description: "Experience the wonder of the Serengeti on this unforgettable 7-day safari adventure.",
  },
  {
    id: 2,
    title: "Bali Beach Retreat",
    location: "Indonesia",
    duration: "10 days",
    price: 1299,
    status: "active",
    bookings: 38,
    description: "Relax and unwind on the beautiful beaches of Bali.",
  },
  {
    id: 3,
    title: "Kyoto Cultural Journey",
    location: "Japan",
    duration: "12 days",
    price: 2499,
    status: "inactive",
    bookings: 32,
    description: "Immerse yourself in the rich culture and history of Kyoto.",
  },
]

type TourProduct = {
  status: string
  id?: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  discount_price: string;
  discount: string;
  rating: string;
  description: string;
  featured: boolean;
  continent: string;
  category: string;
  images: string[]; // image URLs
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];
  seller_id: number | null;
};

type Seller = {
  id:number;
  name:string;


}

type TourProductKey = keyof TourProduct;

type InputField = {
  id: TourProductKey;
  label: string;
  placeholder?: string;
  type?: string;
};
type FieldId = keyof TourProduct;


export default function ProductsPage() {
  const [products, setProducts] = useState<TourProduct[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sellers, setSellers] = useState<Seller[]>([]) // list of all sellers

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const fields: { id: FieldId; label: string; placeholder?: string; type?: string }[] = [
    { id: "title", label: "Title *", placeholder: "Tour package title" },
    { id: "location", label: "Location *", placeholder: "Destination" },
    { id: "duration", label: "Duration", placeholder: "e.g. 7 days" },
    { id: "price", label: "Price *", placeholder: "USD", type: "number" },
    { id: "discount_price", label: "Discount Price", type: "number" },
    { id: "discount", label: "Discount (%)", type: "number" },
    { id: "rating", label: "Rating", type: "number", placeholder: "e.g. 4.5" },
    { id: "continent", label: "Continent", placeholder: "e.g. Africa" },
    { id: "category", label: "Category", placeholder: "e.g. Adventure" },
  ];
  
  const [newProduct, setNewProduct] = useState<TourProduct>({
    title: "",
    location: "",
    duration: "",
    price: "",
    discount_price: "",
    discount: "",
    rating: "",
    description: "",
    featured: false,
    continent: "",
    category: "",          // [{ name, date, rating, comment, avatar }]
    images: [],           // ["https://..."]
    highlights: [],       // ["highlight 1", "highlight 2"]
    included: [],         // ["Flight", "Hotel"]
    notIncluded: [],      // ["Visa", "Tips"]
    itinerary: [
      {
        day: "",
        title: "",
        description: ""
  }],
    seller_id:null,
    status:""        // [{ day: 1, title: "Arrival", description: "Land and transfer" }]
  });

  const [imageInput, setImageInput] = useState("");
const [dynamicInputs, setDynamicInputs] = useState({
  highlights: "",
  included: "",
  notIncluded: "",
});
const [itineraryInput, setItineraryInput] = useState({ day: "", title: "", description: "" });
const [reviewInput, setReviewInput] = useState({ name: "", date: "", rating: "", comment: "", avatar: "" });
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
const [imagePreviews, setImagePreviews] = useState<string[]>([]);

const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  const newFiles = [...selectedFiles, ...files];
  const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

  setSelectedFiles(newFiles);
  setImagePreviews(newPreviews);
};

const handleRemoveImage = (index: number) => {
  const updatedFiles = [...selectedFiles];
  const updatedPreviews = [...imagePreviews];
  updatedFiles.splice(index, 1);
  updatedPreviews.splice(index, 1);
  setSelectedFiles(updatedFiles);
  setImagePreviews(updatedPreviews);
};

  
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://tembea.onrender.com/api/tours"); // assuming /api/tours is your endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isAddDialogOpen) {
      axios.get("https://tembea.onrender.com/api/sellers") // adjust endpoint if different
        .then((res) => setSellers(res.data))
        .catch((err) => console.error("Error fetching sellers:", err));
    }
  }, [isAddDialogOpen]);
  

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )


  const handleAddProduct = async () => {
    if (!newProduct.title || !newProduct.location || !newProduct.price || !newProduct.seller_id) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Upload images first
      const uploadedUrls: string[] = [];
  
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);
  
        const res = await fetch("https://tembea.onrender.com/api/upload-image", {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }
  
      // Add image URLs to newProduct and submit
      const finalProduct = {
        ...newProduct,
        images: uploadedUrls,
      };
  
      await axios.post("https://tembea.onrender.com/api/tours", finalProduct);
  
      toast({
        title: "Product Added",
        description: "The product was successfully created.",
      });
      window.console.log("✅ Product successfully added:", finalProduct.title);

      // ✅ Reset form and close dialog
      setNewProduct({
        title: "",
        location: "",
        duration: "",
        price: "",
        discount_price: "",
        discount: "",
        rating: "",
        description: "",
        featured: false,
        continent: "",
        category: "",
        images: [],
        highlights: [],
        included: [],
        notIncluded: [],
        itinerary: [],
        seller_id:null,
        status:""
      });
      setSelectedFiles([]);
      setImagePreviews([]);
      setDynamicInputs({ highlights: "", included: "", notIncluded: "" });
      setItineraryInput({ day: "", title: "", description: "" });
      setIsAddDialogOpen(false);
  
      router.push("/admin/products");
      setIsAddDialogOpen(false);
  
      router.push("/admin/products");
    } catch (err: any) {
      toast({
        title: "Error Adding Product",
        description: err.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
    }
  };
  
 
  


  

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your tour packages and destinations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogTrigger asChild>
    <Button className="bg-purple-600 hover:bg-purple-700">
      <Plus className="mr-2 h-4 w-4" />
      Add Product
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[90vh]">
    <DialogHeader>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogDescription>Create a new tour package for your customers.</DialogDescription>
    </DialogHeader>

    <div className="grid gap-4 py-4">
      {/* Basic Fields */}
      <div className="grid gap-2">
  <Label htmlFor="seller_id">Select Seller *</Label>
  <select
    id="seller_id"
    value={newProduct.seller_id || ""}
    onChange={(e) => setNewProduct({ ...newProduct,seller_id: e.target.value ? parseInt(e.target.value) : null})}
    className="border rounded px-3 py-2"
  >
    <option value="">-- Select Seller --</option>
    {sellers.map((seller) => (
      <option key={seller.id} value={seller.id}>
        {seller.name}
      </option>
    ))}
  </select>
</div>

{fields.map((field) => (
  <Input
  id={field.id}
  type={field.type || "text"}
  value={String(newProduct[field.id] ?? "")}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      [field.id]: field.type === "number" ? Number(e.target.value) : e.target.value,
    })
  }
  placeholder={field.placeholder}
/>
))}


      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Product description"
        />
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={newProduct.featured}
          onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
        />
        <Label htmlFor="featured">Featured Tour</Label>
      </div>

      {/* Upload Image URL */}
      <div className="grid gap-2">
  <Label htmlFor="imageUpload">Upload Images</Label>
  <Input
    id="imageUpload"
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageSelect}
  />
  {imagePreviews.length > 0 && (
    <div className="grid grid-cols-3 gap-3 mt-3">
      {imagePreviews.map((src, i) => (
        <div key={i} className="relative group">
          <img
            src={src}
            alt={`Preview ${i}`}
            className="w-full h-32 object-cover rounded-md border"
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(i)}
            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>



      {/* Highlights, Included, Not Included, Itinerary, Reviews */}
      {[
        { key: "highlights", label: "Highlights" },
        { key: "included", label: "Included Items" },
        { key: "notIncluded", label: "Not Included Items" },
      ].map((section) => (
        <div className="grid gap-2" key={section.key}>
          <Label>{section.label}</Label>
          <div className="flex gap-2">
            <Input
              placeholder={`Enter ${section.label.toLowerCase()}`}
              value={dynamicInputs[section.key as keyof typeof dynamicInputs]}
              onChange={(e) => setDynamicInputs({ ...dynamicInputs, [section.key]: e.target.value })}
            />
            <Button
              onClick={() => {
                if (dynamicInputs[section.key as keyof typeof dynamicInputs]) {
                  setNewProduct({
                    ...newProduct,
                    [section.key]: [...newProduct[section.key as keyof typeof dynamicInputs], dynamicInputs[section.key as keyof typeof dynamicInputs]],
                  });
                  setDynamicInputs({ ...dynamicInputs, [section.key]: "" });
                }
              }}
            >
              Add
            </Button>
          </div>
          <ul className="text-sm text-muted-foreground list-disc ml-5">
            {newProduct[section.key as keyof typeof dynamicInputs].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Itinerary Days */}
      <div className="grid gap-2">
        <Label>Itinerary</Label>
        <div className="flex flex-col gap-2 border rounded p-3">
          <Input
            placeholder="Day Number"
            type="number"
            value={itineraryInput.day}
            onChange={(e) => setItineraryInput({ ...itineraryInput, day: e.target.value })}
          />
          <Input
            placeholder="Itinerary Title"
            value={itineraryInput.title}
            onChange={(e) => setItineraryInput({ ...itineraryInput, title: e.target.value })}
          />
          <Textarea
            placeholder="Itinerary Description"
            value={itineraryInput.description}
            onChange={(e) => setItineraryInput({ ...itineraryInput, description: e.target.value })}
          />
          <Button
            onClick={() => {
              if (itineraryInput.day && itineraryInput.title) {
                setNewProduct({
                  ...newProduct,
                  itinerary: [...newProduct.itinerary, itineraryInput],
                });
                setItineraryInput({ day: "", title: "", description: "" });
              }
            }}
          >
            Add Day
          </Button>
        </div>
        <ul className="text-sm text-muted-foreground list-disc ml-5">
          {newProduct.itinerary.map((item, i) => (
            <li key={i}>
              Day {item.day}: <strong>{item.title}</strong> — {item.description}
            </li>
          ))}
        </ul>
      </div>

      
    </div>

    <DialogFooter>
      <Button type="submit" onClick={handleAddProduct}>
        Add Product
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <CardDescription>
                    {product.location} • {product.duration}
                  </CardDescription>
                </div>
                <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">${product.price}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                 
                  <Button
  variant="outline"
  size="sm"
  onClick={() => router.push(`products/${product.id}`)}
>
  <Edit className="mr-2 h-4 w-4" />
  Edit
</Button>
                 
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your search.</p>
        </div>
      )}
    </div>
  )
}
