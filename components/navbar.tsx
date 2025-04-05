"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Fix the import path - remove the .tsx extension
import { useAuth } from "@/lib/auth"

export default function Navbar() {
  const { user, signIn, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/tours"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tours
                </Link>
                <Link
                  href="/about"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
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
              className="h-6 w-6 text-purple-600 mr-2"
            >
              <path d="M12 4V2" />
              <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
              <path d="M12 4C8 4 7 8 7 10" />
              <path d="M12 4c4 0 5 4 5 6" />
            </svg>
            <span className="font-bold text-xl">Tembea</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-purple-600">
            Home
          </Link>
          <Link href="/tours" className="text-sm font-medium hover:text-purple-600">
            Tours
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-purple-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-purple-600">
            Contact
          </Link>
          <Link href="/faq" className="text-sm font-medium hover:text-purple-600">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

