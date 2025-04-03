"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      })
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help you plan your perfect journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="booking">Booking Question</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-muted-foreground mb-8">
              Our team is available Monday through Friday, 9:00 AM to 6:00 PM (GMT+0). We strive to respond to all
              inquiries within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Our Office</h3>
                  <address className="not-italic text-muted-foreground">
                    1234 Tourism Road
                    <br />
                    Travel City, TC 56789
                    <br />
                    United States
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+12345678900" className="hover:text-purple-600">
                      +1 (234) 567-8900
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">Monday-Friday, 9:00 AM - 6:00 PM GMT+0</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@tembea.com" className="hover:text-purple-600">
                      contact@tembea.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">For general inquiries and support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors">
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
                  className="h-5 w-5 text-purple-600"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors">
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
                  className="h-5 w-5 text-purple-600"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors">
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
                  className="h-5 w-5 text-purple-600"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors">
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
                  className="h-5 w-5 text-purple-600"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 rounded-lg overflow-hidden h-80 bg-gray-200">
            {/* This would be a map in a real implementation */}
            <div className="w-full h-full flex items-center justify-center bg-purple-50">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <p className="font-medium">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

