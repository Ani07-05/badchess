"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, email: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("chess-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (username: string, email: string) => {
    const userData = { username, email }
    setUser(userData)
    localStorage.setItem("chess-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("chess-user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

