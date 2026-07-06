"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Trash2, Plus } from "lucide-react"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    axios.get(`https://tembea.onrender.com/api/tours/${id}`).then(res => {
      setProduct(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const updateList = (key: string, index: number, value: string) => {
    const updated = [...product[key]]
    updated[index] = value
    setProduct({ ...product, [key]: updated })
  }

  const addToList = (key: string, newItem: any) => {
    setProduct({ ...product, [key]: [...product[key], newItem] })
  }

  const removeFromList = (key: string, index: number) => {
    const updated = product[key].filter((_: any, i: number) => i !== index)
    setProduct({ ...product, [key]: updated })
  }

  const updateItinerary = (index: number, field: string, value: string) => {
    const updated = [...product.itinerary]
    updated[index][field] = value
    setProduct({ ...product, itinerary: updated })
  }

  const handleSave = async () => {
    setSaving(true)
    await axios.put(`https://tembea.onrender.com/api/tours/${id}`, product)
    setSaving(false)
    router.push("/admin/products")
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`https://tembea.onrender.com/api/tours/${id}`);
  
      // Update local state
     
  
      alert("Product Deleted:\nProduct has been successfully deleted.");

      router.push("/admin/products")
    } catch (err: any) {
      alert(
        "Deletion Failed:\n" + (err.response?.data?.error || "Something went wrong while deleting the product.")
      );
      
    }
  };
  

  if (loading) return <div>Loading product...</div>
  if (!product) return <div>Product not found.</div>

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">Product Details</h1>

      {/* Editable Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input name="title" value={product.title} onChange={handleChange} />
        </div>
        <div>
          <Label>Location</Label>
          <Input name="location" value={product.location} onChange={handleChange} />
        </div>
        <div>
          <Label>Duration</Label>
          <Input name="duration" value={product.duration} onChange={handleChange} />
        </div>
        <div>
          <Label>Price</Label>
          <Input name="price" type="number" value={product.price} onChange={handleChange} />
        </div>
        <div>
  <Label>Status</Label>
  <div className="flex gap-4 mt-2">
    <label className="flex items-center gap-1">
      <input
        type="radio"
        name="status"
        value="active"
        checked={product.status === "active"}
        onChange={handleChange}
      />
      Active
    </label>
    <label className="flex items-center gap-1">
      <input
        type="radio"
        name="status"
        value="inactive"
        checked={product.status === "inactive"}
        onChange={handleChange}
      />
      Inactive
    </label>
  </div>
</div>

        <div>
  <Label>Seller</Label>
  <Input value={product.seller_name || "Unknown"} disabled />
</div>

        <div className="col-span-2">
          <Label>Description</Label>
          <Textarea name="description" value={product.description} onChange={handleChange} />
        </div>
      </div>

      {/* Images */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Images</h2>
        {product.images?.map((img: string, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <Input value={img} onChange={e => updateList("images", i, e.target.value)} />
            <Button variant="ghost" onClick={() => removeFromList("images", i)}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToList("images", "")}><Plus className="mr-2" />Add Image</Button>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Highlights</h2>
        {product.highlights?.map((h: string, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <Input value={h} onChange={e => updateList("highlights", i, e.target.value)} />
            <Button variant="ghost" onClick={() => removeFromList("highlights", i)}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToList("highlights", "")}><Plus className="mr-2" />Add Highlight</Button>
      </div>

      {/* Included */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Included</h2>
        {product.included?.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <Input value={item} onChange={e => updateList("included", i, e.target.value)} />
            <Button variant="ghost" onClick={() => removeFromList("included", i)}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToList("included", "")}><Plus className="mr-2" />Add Included</Button>
      </div>

      {/* Not Included */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Not Included</h2>
        {product.notIncluded?.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <Input value={item} onChange={e => updateList("notIncluded", i, e.target.value)} />
            <Button variant="ghost" onClick={() => removeFromList("notIncluded", i)}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToList("notIncluded", "")}><Plus className="mr-2" />Add Not Included</Button>
      </div>

      {/* Itinerary */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
        {product.itinerary?.map((item: any, i: number) => (
          <div key={i} className="border p-3 rounded space-y-2 mb-2">
            <div className="flex gap-2">
              <Input
                placeholder="Day"
                type="number"
                value={item.day}
                onChange={e => updateItinerary(i, "day", e.target.value)}
              />
              <Input
                placeholder="Title"
                value={item.title}
                onChange={e => updateItinerary(i, "title", e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Description"
              value={item.description}
              onChange={e => updateItinerary(i, "description", e.target.value)}
            />
            <Button variant="ghost" onClick={() => removeFromList("itinerary", i)}><Trash2 /> Remove</Button>
          </div>
        ))}
        <Button variant="outline" onClick={() => addToList("itinerary", { day: "", title: "", description: "" })}>
          <Plus className="mr-2" /> Add Itinerary Item
        </Button>
      </div>

      {/* Reviews (read-only) */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <div className="space-y-4">
          {product.reviews?.map((r: any, i: number) => (
            <div key={i} className="border p-3 rounded">
              <p><strong>{r.name}</strong> ({r.rating}★)</p>
              <p className="text-sm text-muted-foreground">{r.date}</p>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete Product
        </Button>
      </div>
    </div>
  )
}
