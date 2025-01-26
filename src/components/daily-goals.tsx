"use client"

import { motion } from "framer-motion"
import { CheckCircle, Target, Zap } from "lucide-react"

const goals = [
  { icon: <Target className="w-6 h-6" />, title: "Solve 5 puzzles", progress: 3 },
  { icon: <Zap className="w-6 h-6" />, title: "Play 3 rapid games", progress: 1 },
  { icon: <CheckCircle className="w-6 h-6" />, title: "Analyze 1 game", progress: 0 },
]

export function DailyGoals() {
  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Daily Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/10 rounded-lg p-4 flex items-center space-x-4"
          >
            <div className="text-blue-400">{goal.icon}</div>
            <div>
              <p className="font-medium">{goal.title}</p>
              <div className="mt-2 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(goal.progress / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

