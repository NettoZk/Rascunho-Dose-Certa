"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  name: string
  email: string
  type: "citizen" | "professional"
  phone?: string
  address?: string
  notifications?: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: "citizen" | "professional") => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  userType: "citizen" | "professional"
  phone?: string
  address?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database - TODO: Replace with real API integration
const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "cidadao@teste.com",
    type: "citizen",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP",
    notifications: { email: true, sms: false, push: true },
  },
  {
    id: "2",
    name: "Dra. Maria Santos",
    email: "profissional@teste.com",
    type: "professional",
    phone: "(11) 88888-8888",
    address: "Posto de Saúde Central - São Paulo, SP",
    notifications: { email: true, sms: true, push: true },
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("dose-certa-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("dose-certa-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "citizen" | "professional") => {
    setIsLoading(true)

    // TODO: Replace with real API authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    const foundUser = mockUsers.find((u) => u.email === email && u.type === userType)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("dose-certa-user", JSON.stringify(foundUser))
    } else {
      throw new Error("Credenciais inválidas")
    }

    setIsLoading(false)
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)

    // TODO: Replace with real API registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration logic
    const existingUser = mockUsers.find((u) => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      throw new Error("Email já cadastrado")
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      type: userData.userType,
      phone: userData.phone,
      address: userData.address,
      notifications: { email: true, sms: false, push: true },
    }

    // TODO: Replace with real API call to save user
    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("dose-certa-user", JSON.stringify(newUser))

    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dose-certa-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
