"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Welcome } from "@/components/welcome"
import { GlowingPieChart } from "@/components/glowing-pie-chart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import type { PlayerStatistics } from "@/features/solo-leveling/utils/chess-stats.types"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/auth-provider"
import { GameHistory } from "@/components/game-history"
import { Loading } from "@/components/loading"

export default function Dashboard() {
  const [stats, setStats] = useState<PlayerStatistics | null>(null)
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    const loadStats = async () => {
      if (user?.username) {
        try {
          const response = await fetch(`/api/player-stats?username=${user.username}`)
          if (response.ok) {
            const data = await response.json()
            setStats(data)
          }
        } catch (error) {
          console.error("Error loading stats:", error)
        }
      }
    }
    loadStats()
  }, [user?.username])

  if (isLoading) {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {user.username}!</h1>
            <p className="text-gray-400 mt-2">Track your progress and improve your game</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="text-white flex items-center gap-2"
              onClick={() => router.push("/tournaments")}
            >
              <Trophy className="h-5 w-5" />
              Tournaments
            </Button>
            <Button
              onClick={() => router.push("/puzzles")}
              className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 flex items-center gap-2"
            >
              <Trophy className="h-5 w-5" />
              Solve Puzzles
            </Button>
          </div>
        </motion.div>

        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <GlowingPieChart
              data={{
                wins: stats.chess_bullet?.record.win || 0,
                losses: stats.chess_bullet?.record.loss || 0,
                draws: stats.chess_bullet?.record.draw || 0,
              }}
              rating={stats.chess_bullet?.last.rating || 0}
              title="Bullet"
            />
            <GlowingPieChart
              data={{
                wins: stats.chess_blitz?.record.win || 0,
                losses: stats.chess_blitz?.record.loss || 0,
                draws: stats.chess_blitz?.record.draw || 0,
              }}
              rating={stats.chess_blitz?.last.rating || 0}
              title="Blitz"
            />
            <GlowingPieChart
              data={{
                wins: stats.chess_rapid?.record.win || 0,
                losses: stats.chess_rapid?.record.loss || 0,
                draws: stats.chess_rapid?.record.draw || 0,
              }}
              rating={stats.chess_rapid?.last.rating || 0}
              title="Rapid"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/9FUcqzplof4"
                  className="w-full h-full"
                  title="Featured Chess Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
          <div className="space-y-6">{user && <GameHistory username={user.username} />}</div>
        </div>
      </div>
    </div>
  )
}

