"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
}

type AuthContextType = {
  user: User | null
  signIn: () => void
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("tembea-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async () => {
    // In a real implementation, this would use the Google OAuth flow
    // For this demo, we'll simulate a signed-in user
    const mockUser: User = {
      id: "user_123",
      name: "John Doe",
      email: "john.doe@example.com",
      image: "/placeholder.svg?height=100&width=100",
    }

    setUser(mockUser)
    localStorage.setItem("tembea-user", JSON.stringify(mockUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("tembea-user")
  }

  return <AuthContext.Provider value={{ user, signIn, signOut, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

