"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/userSlicer"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
}

type AuthContextType = {
  user: User | null
  signIn: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    // Check if user is stored in localStorage
    try {
      const storedUser = localStorage.getItem("Tembezi-user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
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
    try {
      localStorage.setItem("Tembezi-user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  }



  return <AuthContext.Provider value={{ user, signIn, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

