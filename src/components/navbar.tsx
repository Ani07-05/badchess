"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Navigation() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("chess-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("chess-user")
    setUser(null)
    router.push("/")
  }

  if (!user) return null

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex justify-between items-center">
            <Link href="/dashboard" className="text-xl font-bold text-white">
              ChessY
            </Link>

            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-white/80 text-white">
                Dashboard
              </Link>
              <Link href="/puzzles" className="text-sm font-medium transition-colors hover:text-white/80 text-white/60">
                Puzzles
              </Link>
              <Link
                href="/tournaments"
                className="text-sm font-medium transition-colors hover:text-white/80 text-white/60"
              >
                Tournaments
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-sm">Signed in as {user.username}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

