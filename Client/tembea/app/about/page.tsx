import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About Tembezi</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the story behind the tourism advisor platform that's changing how people explore the world.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/about-2.jpg?height=400&width=600"
            alt="Travelers exploring a destination"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            At Tembezi, our mission is to connect travelers with authentic, unforgettable experiences around the world.
            We believe that travel has the power to transform lives, broaden perspectives, and create lasting memories.
          </p>
          <p className="text-lg text-muted-foreground">
            We're dedicated to making travel planning simple, transparent, and enjoyable. By curating high-quality tour
            packages and providing detailed information, we help travelers make informed decisions and embark on
            journeys that match their interests, preferences, and budgets.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            Tembezi was founded in 2025 by a group of passionate travelers who were frustrated with the complexity and
            lack of transparency in the travel industry. The name "Tembezi" comes from the Swahili word Tembea, meaning "to walk" or "to
            travel," reflecting our focus on journey and exploration.
          </p>
          <p className="text-lg text-muted-foreground">
            What started as a small project has grown into a comprehensive platform that helps thousands of travelers
            discover and book amazing experiences worldwide. Our team combines expertise in travel, technology, and
            customer service to create a platform that truly serves the needs of modern travelers.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="/about-3.jpg?height=400&width=600"
            alt="Tembezi founding team"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            These core principles guide everything we do at Tembezi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                className="text-purple-600"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
            <p className="text-muted-foreground">
              We believe in authentic travel experiences that respect local cultures and environments. We carefully
              select partners who share this commitment to responsible tourism.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                className="text-purple-600"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
            <p className="text-muted-foreground">
              We provide clear, honest information about all our tour packages, including what's included, what's not,
              and any potential challenges. No hidden fees or surprises.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
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
                className="text-purple-600"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
            <p className="text-muted-foreground">
              Our travelers are at the heart of everything we do. We continuously improve our platform based on feedback
              and strive to provide exceptional customer service at every step.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
     {/* <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            The passionate individuals behind Tembezi who make your travel dreams come true.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Travel enthusiast with 15+ years in the tourism industry.",
            },
            {
              name: "Michael Chen",
              role: "Chief Technology Officer",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Tech innovator passionate about creating seamless digital experiences.",
            },
            {
              name: "Priya Sharma",
              role: "Head of Partnerships",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Relationship builder with extensive connections in global tourism.",
            },
            {
              name: "David Okafor",
              role: "Customer Experience Lead",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Dedicated to ensuring every traveler has an exceptional journey.",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="aspect-square relative mb-4">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-purple-600 mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
          */}
      {/* CTA Section */}
      <section className="bg-purple-50 rounded-xl p-8 md:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of travelers who have discovered amazing destinations with Tembezi. Sign up today and start
          planning your next adventure.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/sign-up">Sign Up Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/tours">Explore Tours</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

