"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Clock, User, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Game {
  white: { username: string; result: string }
  black: { username: string; result: string }
  time_class: string
  end_time: number
}

interface GameHistoryProps {
  username: string
}

export function GameHistory({ username }: GameHistoryProps) {
  const [games, setGames] = useState<Game[]>([])
  const [streakInfo, setStreakInfo] = useState({
    currentStreak: 0,
    maxStreak: 0,
    hasThreeGameStreak: false,
    hasFiveGameStreak: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`/api/chess-games?username=${username}`)
        if (!response.ok) throw new Error("Failed to fetch games")
        const data = await response.json()
        setGames(data.games)
        setStreakInfo({
          currentStreak: data.currentStreak,
          maxStreak: data.maxStreak,
          hasThreeGameStreak: data.hasThreeGameStreak,
          hasFiveGameStreak: data.hasFiveGameStreak,
        })
        setLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setLoading(false)
      }
    }

    fetchGames()
  }, [username])

  if (loading) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-24 w-full rounded-lg" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
            Recent Games
            {streakInfo.currentStreak > 0 && (
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-400/20">
                {streakInfo.currentStreak} streak
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {streakInfo.hasThreeGameStreak && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-yellow-400"
                title="3 Game Streak Achievement"
              >
                <Trophy className="h-5 w-5" />
              </motion.div>
            )}
            {streakInfo.hasFiveGameStreak && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-purple-400"
                title="5 Game Streak Achievement"
              >
                <Star className="h-5 w-5" />
              </motion.div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-full">
              <Trophy className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Current Streak</div>
              <div className="text-2xl font-bold text-white">{streakInfo.currentStreak}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Award className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Best Streak</div>
              <div className="text-2xl font-bold text-white">{streakInfo.maxStreak}</div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-2">
          {games.map((game, index) => {
            const isWinner =
              (game.white.username === username && game.white.result === "win") ||
              (game.black.username === username && game.black.result === "win")
            const isDraw = game.white.result === "draw"
            const isLoser =
              (game.white.username === username && game.white.result === "lost") ||
              (game.black.username === username && game.black.result === "lost")

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex justify-between items-center p-4 rounded-lg 
                  ${isWinner ? "bg-green-500/10 hover:bg-green-500/20" : ""}
                  ${isDraw ? "bg-yellow-500/10 hover:bg-yellow-500/20" : ""}
                  ${isLoser ? "bg-red-500/10 hover:bg-red-500/20" : ""}
                  transition-colors group
                `}
              >
                <div className="flex items-center gap-4">
                  <User
                    className={`h-4 w-4 ${isWinner ? "text-green-400" : isDraw ? "text-yellow-400" : "text-red-400"}`}
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-white">{game.white.username}</span>
                      <span className="text-gray-400">vs</span>
                      <span className="font-medium text-white">{game.black.username}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400 capitalize">{game.time_class}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`
                      ${isWinner ? "text-green-400 border-green-400/20" : ""}
                      ${isDraw ? "text-yellow-400 border-yellow-400/20" : ""}
                      ${isLoser ? "text-red-400 border-red-400/20" : ""}
                    `}
                  >
                    {isWinner ? "Won" : isDraw ? "Draw" : "Lost"}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

