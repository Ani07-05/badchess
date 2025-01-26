"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("chess-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (username: string, email: string) => {
    const userData = { username, email }
    localStorage.setItem("chess-user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("chess-user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

