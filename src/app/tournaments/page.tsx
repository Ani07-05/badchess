"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TournamentCard } from "@/components/ui/tournament-card"
import { Loading } from "@/components/loading"
import { useRouter } from "next/navigation"
import { Welcome } from "@/components/welcome"
import { useAuth } from "@/providers/auth-provider"

interface Tournament {
  name: string
  url: string
  status: string
  settings?: {
    type: string
    time_class: string
  }
}

interface TournamentData {
  finished: Tournament[]
  in_progress: Tournament[]
  registered: Tournament[]
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<TournamentData | null>(null)
  const [loading, setLoading] = useState(true)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchTournaments = async () => {
      if (user?.username) {
        try {
          const response = await fetch(`/api/tournaments?username=${user.username}`)
          if (!response.ok) throw new Error("Failed to fetch tournaments")
          const data = await response.json()
          setTournaments(data)
        } catch (error) {
          console.error("Error fetching tournaments:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    if (user) {
      fetchTournaments()
    } else {
      setLoading(false)
    }
  }, [user])

  if (isLoading || loading) {
    return <Loading />
  }

  if (!user) {
    return <Welcome />
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8 pt-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Tournaments</h1>
            <p className="text-gray-400 mt-2">View your tournament history and upcoming events</p>
          </div>
        </div>

        {tournaments?.registered && tournaments.registered.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Registered Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.registered.map((tournament) => (
                <TournamentCard
                  key={tournament.url}
                  name={tournament.name || "Tournament"}
                  status="registered"
                  type={(tournament.settings?.time_class as "bullet" | "blitz" | "rapid") || "rapid"}
                />
              ))}
            </div>
          </motion.div>
        )}

        {tournaments?.in_progress && tournaments.in_progress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">In Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.in_progress.map((tournament) => (
                <TournamentCard
                  key={tournament.url}
                  name={tournament.name || "Tournament"}
                  status="in_progress"
                  type={(tournament.settings?.time_class as "bullet" | "blitz" | "rapid") || "rapid"}
                />
              ))}
            </div>
          </motion.div>
        )}

        {tournaments?.finished && tournaments.finished.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">Completed Tournaments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.finished.map((tournament) => (
                <TournamentCard
                  key={tournament.url}
                  name={tournament.name || "Tournament"}
                  status="finished"
                  type={(tournament.settings?.time_class as "bullet" | "blitz" | "rapid") || "rapid"}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

