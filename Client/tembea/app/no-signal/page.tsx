"use client"

import { useState } from "react"
import {
  Calendar,
  MapPin,
  Share2,
  Phone,
  Instagram,
  Tent,
  Music,
  Utensils,
  Zap,
  Users,
  Star,
  Shield,
  WifiOff,
  TreePine,
  ChevronDown,
  Quote,
  Wine,
  LucideIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Placeholder SVG for cartoon-style illustrations

type CartoonIllustrationProps = {
  icon: LucideIcon
}

const CartoonIllustration = ({ icon: Icon }: CartoonIllustrationProps) => (
  <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
    <Icon className="h-12 w-12 text-orange-400" />
  </div>
)
export default function NoSignalLanding() {
  const [isLiked, setIsLiked] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "NO SIGNAL Camping Experience",
          text: "Disconnect to Reconnect - The Ultimate Digital Detox Adventure",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleBooking = () => {
    const phone = "0718212970"
    const message =
      "Hi! I'm interested in booking tickets for the No Signal Camping Experience on October 11-12, 2025. Can you please provide more details?"
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const testimonials = [
    {
      name: "Sarah M.",
      experience: "Solo Camper 2024",
      quote:
        "Best decision I made this year! Finally disconnected from social media and connected with amazing people. The bonfire sessions were magical.",
      rating: 5,
      image: "/placeholder.svg?height=200&width=300&text=Sarah+at+Bonfire",
    },
    {
      name: "David & Lisa K.",
      experience: "Couple Package 2024",
      quote:
        "Our relationship needed this digital detox. We talked more in 2 days than we had in months. The sunset views were breathtaking!",
      rating: 5,
      image: "/placeholder.svg?height=200&width=300&text=Couple+at+Sunset",
    },
    {
      name: "Mike T.",
      experience: "VIP Experience 2024",
      quote:
        "The adrenaline activities were insane! Ziplining through the forest canopy was unforgettable. Already booked for next year.",
      rating: 5,
      image: "/placeholder.svg?height=200&width=300&text=Ziplining+Adventure",
    },
  ]

  const faqs = [
    {
      question: "What should I bring to the camping experience?",
      answer:
        "We provide tents, bedding, and all meals. Just bring personal items, comfortable clothes, hiking shoes, and a positive attitude! A detailed packing list will be sent after booking.",
    },
    {
      question: "Is there really no phone signal?",
      answer:
        "PEC Nature Park has limited cellular coverage, which is perfect for our digital detox concept. Emergency communication is available through our staff.",
    },
    {
      question: "What if it rains?",
      answer:
        "We have covered areas and backup indoor activities. Our tents are waterproof, and we provide rain gear if needed. The experience continues rain or shine!",
    },
    {
      question: "Are the adrenaline activities safe?",
      answer:
        "All activities are conducted by certified instructors with professional safety equipment. Activities are optional and suitable for various fitness levels.",
    },
    {
      question: "Can I come alone?",
      answer:
        "Yes! Many of our best friendships have started at No Signal. Our community is welcoming, and we have activities designed to help solo travelers connect.",
    },
    {
      question: "What's included in the ticket price?",
      answer:
        "Everything! Accommodation, all meals, drinks, activities, entertainment, and memories that last a lifetime. No hidden costs.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          {/* Animated Stars */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Animated Landscape Silhouettes */}
          <div className="absolute bottom-0 left-0 right-0">
            <div
              className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-orange-800 to-orange-600 opacity-80 animate-pulse"
              style={{
                clipPath: "polygon(0 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)",
                animationDuration: "4s",
              }}
            />
            <div
              className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-red-800 to-red-600 opacity-90 animate-pulse"
              style={{
                clipPath: "polygon(0 100%, 15% 70%, 35% 50%, 55% 80%, 75% 40%, 90% 60%, 100% 100%)",
                animationDelay: "1s",
                animationDuration: "3s",
              }}
            />
            <div
              className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-blue-900 to-blue-700 animate-pulse"
              style={{
                clipPath: "polygon(0 100%, 25% 40%, 50% 70%, 75% 30%, 100% 60%, 100% 100%)",
                animationDelay: "2s",
                animationDuration: "5s",
              }}
            />
          </div>

          {/* Animated Tree Silhouettes */}
          <div
            className="absolute bottom-16 left-10 w-12 h-24 bg-blue-900 opacity-80 animate-pulse"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              animationDelay: "0.5s",
              animationDuration: "3s",
            }}
          />
          <div
            className="absolute bottom-20 right-20 w-8 h-16 bg-blue-900 opacity-80 animate-pulse"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              animationDelay: "1.5s",
              animationDuration: "4s",
            }}
          />
          <div
            className="absolute bottom-12 left-1/3 w-16 h-32 bg-blue-900 opacity-80 animate-pulse"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              animationDelay: "2.5s",
              animationDuration: "3.5s",
            }}
          />
        </div>

        <div className="relative z-10 container">
          {/* Purple Giraffe Logo */}
          <div className="absolute top-8 left-8">
            <div className="w-16 h-20 text-purple-400 animate-pulse">
              <svg viewBox="0 0 24 32" fill="currentColor">
                <path d="M12 2c-2 0-3 1-3 3v8c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v5c0 3 2 5 5 5h1v8c0 2 1 3 3 3s3-1 3-3v-8h1c3 0 5-2 5-5V8c0-1-1-2-2-2s-2 1-2 2v5c0 1-1 2-2 2s-2-1-2-2V5c0-2-1-3-3-3z" />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center">
            {/* Main Title - Animated */}
            <h1
              className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text mb-6 tracking-tighter leading-none animate-pulse"
              style={{
                backgroundImage: "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)",
                textShadow: "4px 4px 8px rgba(0,0,0,0.8), 2px 2px 4px rgba(255,107,53,0.3)",
                fontFamily: "Arial Black, Helvetica, sans-serif",
                fontWeight: "900",
                letterSpacing: "-0.05em",
                WebkitTextStroke: "2px rgba(255,107,53,0.5)",
                animationDuration: "2s",
              }}
            >
              NO SIGNAL
            </h1>

            <h2
              className="text-4xl md:text-5xl text-white font-light italic mb-8 animate-fade-in"
              style={{ fontFamily: "cursive", animationDelay: "0.5s" }}
            >
              Camping Experience
            </h2>

            {/* Tagline */}
            <div className="mb-8 animate-fade-in" style={{ animationDelay: "1s" }}>
              <p className="text-2xl md:text-3xl text-orange-300 font-light mb-4">Disconnect to Reconnect</p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Escape the digital noise and rediscover what truly matters. Join us for an unforgettable weekend of
                authentic connections, nature, and pure adventure.
              </p>
            </div>

            {/* Event Details */}
            <div
              className="flex flex-col md:flex-row justify-center items-center gap-8 text-white text-xl mb-8 animate-fade-in"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-orange-400" />
                <span className="font-bold">11th - 12th October, 2025</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-orange-400" />
                <span className="font-bold">PEC Nature Park</span>
              </div>
            </div>

            {/* Limited Tickets Banner */}
            {/* Limited Tickets Banner */}
<div className="mb-8 animate-bounce" style={{ animationDelay: "2s" }}>
  <div className="inline-block bg-gradient-to-r from-orange-600 to-yellow-500 text-black px-8 py-4 rounded-lg transform -rotate-2 shadow-lg">
    <span className="font-black text-xl">LIMITED SPOTS AVAILABLE</span>
  </div>
</div>

{/* Main CTA */}
<div className="space-y-4 animate-fade-in" style={{ animationDelay: "2.5s" }}>
  <a
    href="https://bashplus.bolexgroup.com/event/no-signal-camping-experience/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      size="lg"
      className="bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
    >
      Join the Adventure
    </Button>
  </a>
  </div>

{/* Social Actions */}
<div className="flex justify-center gap-4 mt-8 animate-fade-in mb-2" style={{ animationDelay: "3s" }}>
  <a
    href="https://instagram.com/tembezillc"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
  >
    <Instagram className="h-5 w-5" />
  </a>
</div>

          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="container py-20 space-y-20">
        {/* About Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-orange-400 mb-8">Why No Signal?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
  <Card className="bg-black/80 border-orange-500/30 text-white">
    <CardContent>
      <WifiOff className="h-12 w-12 text-orange-400 mx-auto mb-4" />
      <CardTitle className="text-orange-400">Digital Detox</CardTitle>
      <p className="text-gray-300">
        Break free from the constant buzz of notifications and social media. Rediscover the joy of real
        conversations and genuine connections.
      </p>
    </CardContent>
  </Card>

  <Card className="bg-black/80 border-orange-500/30 text-white">
    <CardContent>
      <TreePine className="h-12 w-12 text-orange-400 mx-auto mb-4" />
      <CardTitle className="text-orange-400">Nature Immersion</CardTitle>
      <p className="text-gray-300">
        Reconnect with the natural world in the stunning PEC Nature Park. Experience the healing power of
        fresh air, starlit skies, and pristine wilderness.
      </p>
    </CardContent>
  </Card>

  <Card className="bg-black/80 border-orange-500/30 text-white">
    <CardContent>
      <Users className="h-12 w-12 text-orange-400 mx-auto mb-4" />
      <CardTitle className="text-orange-400">Authentic Community</CardTitle>
      <p className="text-gray-300">
        Join a tribe of like-minded adventurers. Form lasting friendships around the campfire and create
        memories that will last a lifetime.
      </p>
    </CardContent>
  </Card>
</div>

        </section>

        {/* Experience Highlights */}
        <section>
          <h2 className="text-4xl font-bold text-orange-400 text-center mb-12">Your Adventure Awaits</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/tents.jpg"
                alt="Adventure Experience"
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">What Makes No Signal Special?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CartoonIllustration icon={Tent} />
                  <div>
                    <h4 className="text-lg font-semibold text-orange-300">Premium Camping Setup</h4>
                    <p className="text-gray-300">
                      Comfortable tents with proper bedding. No need to rough it - we've got your comfort covered.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CartoonIllustration icon={Utensils} />
                  <div>
                    <h4 className="text-lg font-semibold text-orange-300">Gourmet Outdoor Dining</h4>
                    <p className="text-gray-300">
                      Delicious meals prepared by local chefs, plus Muratina.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CartoonIllustration icon={Wine} />
                  <div>
                    <h4 className="text-lg font-semibold text-orange-300">Bottomless Cocktails</h4>
                    <p className="text-gray-300">
                      Unlimited premium cocktails and drinks throughout your entire stay. Cheers to disconnecting!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CartoonIllustration icon={Music} />
                  <div>
                    <h4 className="text-lg font-semibold text-orange-300">Live Entertainment</h4>
                    <p className="text-gray-300">
                      Professional DJs spinning the perfect soundtrack for your adventure, from sunset to starlight.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CartoonIllustration icon={Zap} />
                  <div>
                    <h4 className="text-lg font-semibold text-orange-300">Adrenaline Rush</h4>
                    <p className="text-gray-300">
                      Optional ziplining and high ropes activities for thrill-seekers looking to push their limits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-orange-600/20 to-purple-600/20 rounded-lg p-8 border border-orange-500/30">
            <h3 className="text-xl font-bold text-orange-300 mb-4 text-center">Complete Experience Includes:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  All accommodation & meals
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Bottomless cocktails & drinks
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Live DJ & entertainment
                </li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Bonfire & stargazing
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Group activities & games
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  Traditional Muratina 
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
       

        {/* Pricing */}
        <section className="text-center">
  <h2 className="text-4xl font-bold text-orange-400 mb-8">Choose Your Adventure</h2>

  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <Card className="bg-black/80 border-orange-500/30 text-white">
      <CardHeader>
        <CardTitle className="text-orange-400">Solo Tent</CardTitle>
        <div className="text-3xl font-bold text-white">KSH 4,500</div>
        <p className="text-gray-400">Single tent accommodation</p>
      </CardHeader>
      <CardContent className="mt-4">
        <a
          href="https://bashplus.bolexgroup.com/event/no-signal-camping-experience/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Buy Now
        </a>
      </CardContent>
    </Card>

    <Card className="bg-black/80 border-orange-500/30 text-white border-2 border-orange-400">
      <CardHeader>
        <CardTitle className="text-orange-400">Double Tent</CardTitle>
        <div className="text-3xl font-bold text-white">KSH 8,000</div>
        <p className="text-gray-400">Tent for two people</p>
      </CardHeader>
      <CardContent className="mt-4">
        <a
          href="https://bashplus.bolexgroup.com/event/no-signal-camping-experience/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Buy Now
        </a>
      </CardContent>
    </Card>
  </div>
</section>



        {/* FAQ */}
        <section>
          <h2 className="text-4xl font-bold text-orange-400 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-black/80 border border-orange-500/30 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-orange-400 hover:text-orange-300">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-orange-600/20 to-purple-600/20 rounded-2xl p-12 border border-orange-500/30">
        
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Disconnect?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable weekend where the only notifications you'll get are from nature itself.
          </p>
          <Button
            onClick={handleBooking}
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4"
          >
            Book Your Spot Now
          </Button>
          <div className="flex justify-center items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-orange-400" />
              <span>0718212970</span>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-orange-400" />
              <span>@nosignal_17</span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-8 border-t border-orange-500/30">
        <div className="container text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-10 text-purple-400">
              <svg viewBox="0 0 24 32" fill="currentColor">
                <path d="M12 2c-2 0-3 1-3 3v8c0 1-1 2-2 2s-2-1-2-2V8c0-1-1-2-2-2s-2 1-2 2v5c0 3 2 5 5 5h1v8c0 2 1 3 3 3s3-1 3-3v-8h1c3 0 5-2 5-5V8c0-1-1-2-2-2s-2 1-2 2v5c0 1-1 2-2 2s-2-1-2-2V5c0-2-1-3-3-3z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-orange-400">NO SIGNAL</span>
          </div>
          <p className="text-gray-400 mb-4">Disconnect to Reconnect</p>
          <p className="text-gray-500 text-sm">© 2025 No Signal Camping Experience. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
