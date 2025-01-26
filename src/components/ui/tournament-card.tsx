"use client"

import { motion } from "framer-motion"
import { Trophy, Users, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TournamentCardProps {
  name: string
  status: string
  totalPlayers?: number
  wins?: number
  losses?: number
  draws?: number
  placement?: number
  startTime?: string
  type?: "bullet" | "blitz" | "rapid"
  onClick?: () => void
}

export function TournamentCard({
  name,
  status,
  totalPlayers,
  wins,
  losses,
  draws,
  placement,
  startTime,
  type,
  onClick,
}: TournamentCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "winner":
        return "from-yellow-500 to-amber-500"
      case "eliminated":
        return "from-red-500 to-pink-500"
      case "registered":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-purple-500 to-blue-500"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative group">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${getStatusColor()} rounded-xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50`}
      />
      <Card className="relative bg-black/40 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="text-lg font-bold">{name}</span>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {totalPlayers && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{totalPlayers} Players</span>
                </div>
              )}
              {type && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="capitalize">{type}</span>
                </div>
              )}
            </div>
            {(wins !== undefined || placement !== undefined) && (
              <div className="space-y-2">
                {placement && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Placement</span>
                    <span className="font-bold">{placement}</span>
                  </div>
                )}
                {wins !== undefined && (
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-green-400 font-medium">{wins}</div>
                      <div className="text-xs text-gray-400">Wins</div>
                    </div>
                    <div>
                      <div className="text-red-400 font-medium">{losses}</div>
                      <div className="text-xs text-gray-400">Losses</div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-medium">{draws}</div>
                      <div className="text-xs text-gray-400">Draws</div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <Button
              onClick={onClick}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {status === "registered" ? "View Details" : "See Results"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

