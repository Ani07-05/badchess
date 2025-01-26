"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import { toast } from "@/components/ui/use-toast"

export function UsernameForm() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter your chess.com username",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/player-stats?username=${username}`)
      if (!response.ok) {
        throw new Error("Failed to fetch stats")
      }
      router.refresh()
      toast({
        title: "Success!",
        description: "Your chess.com stats have been loaded",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load chess.com stats. Please check your username and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto mb-8">
      <Input
        type="text"
        placeholder="Enter your chess.com username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-black/40 border-white/10 text-white placeholder:text-gray-400"
      />
      <Button type="submit" disabled={loading} className="bg-white/10 hover:bg-white/20 text-white">
        {loading ? "Loading..." : "Load Stats"}
      </Button>
    </form>
  )
}

