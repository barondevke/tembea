"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type AdminUser = {
  id: string
  name: string
  email: string
  role: "admin" | "super_admin"
}

type AdminAuthContextType = {
  admin: AdminUser | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  loading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  admin: null,
  signIn: async () => false,
  signOut: () => {},
  loading: true,
})

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if admin is stored in localStorage
    try {
      const storedAdmin = localStorage.getItem("tembea-admin")
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // In a real implementation, this would validate against your backend
    // For demo purposes, we'll use hardcoded credentials
    if (email === "admin@tembea.com" && password === "admin123") {
      const mockAdmin: AdminUser = {
        id: "admin_1",
        name: "Admin User",
        email: "admin@tembea.com",
        role: "admin",
      }

      setAdmin(mockAdmin)
      try {
        localStorage.setItem("tembea-admin", JSON.stringify(mockAdmin))
      } catch (error) {
        console.error("Error setting localStorage:", error)
      }
      return true
    }
    return false
  }

  const signOut = () => {
    setAdmin(null)
    try {
      localStorage.removeItem("tembea-admin")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  return <AdminAuthContext.Provider value={{ admin, signIn, signOut, loading }}>{children}</AdminAuthContext.Provider>
}

export const useAdminAuth = () => useContext(AdminAuthContext)
