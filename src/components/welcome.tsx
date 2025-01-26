"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { TracedChessKing } from "./traced-king"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"




export function Welcome() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    login(username, email)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="w-full max-w-6xl flex items-center justify-between relative z-10">
        <motion.div
          className="w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <TracedChessKing className="w-96 h-96" />
        </motion.div>

        <div className="w-1/2">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                ChessY
              </h1>
              <p className="text-xl text-gray-400 mb-12">Your personal chess companion</p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

                <div className="relative bg-black/90 p-8 rounded-2xl backdrop-blur-xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                        Chess.com Username
                      </label>
                      <Input
                        id="username"
                        placeholder="Enter your chess.com username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      Start Your Journey
                    </Button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

