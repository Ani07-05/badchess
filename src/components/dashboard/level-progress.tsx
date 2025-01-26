"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Award } from "lucide-react"

interface LevelProgressProps {
  currentStreak: number
  maxStreak: number
  hasThreeGameStreak: boolean
  hasFiveGameStreak: boolean
}

export function LevelProgress({ currentStreak, maxStreak, hasThreeGameStreak, hasFiveGameStreak }: LevelProgressProps) {
  // Calculate level based on max streak
  const level = Math.floor(maxStreak / 3)
  const progress = ((maxStreak % 3) / 3) * 100

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Level {level}</h3>
              <p className="text-sm text-gray-400">Keep your streak going!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {hasThreeGameStreak && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 rounded-full bg-yellow-500/20">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </motion.div>
            )}
            {hasFiveGameStreak && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-2 rounded-full bg-purple-500/20">
                <Star className="w-5 h-5 text-purple-400" />
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progress to Level {level + 1}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400">Current Streak</div>
            <div className="text-2xl font-bold text-white">{currentStreak}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400">Best Streak</div>
            <div className="text-2xl font-bold text-white">{maxStreak}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

