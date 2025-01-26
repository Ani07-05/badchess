"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Target, Zap, CheckCircle } from "lucide-react"

interface Goal {
  icon: React.ReactNode
  title: string
  value: number
  change: number
  color: string
}

export function GoalsTracker() {
  const goals: Goal[] = [
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Blunder free games",
      value: 67,
      change: 2,
      color: "from-red-500/10 to-orange-500/10",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Blunders under 10s",
      value: 12,
      change: 4,
      color: "from-yellow-500/10 to-amber-500/10",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Positions on 1st try",
      value: 23,
      change: 1,
      color: "from-green-500/10 to-emerald-500/10",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Accuracy in games",
      value: 43,
      change: 6,
      color: "from-blue-500/10 to-cyan-500/10",
    },
  ]

  return (
    <div className="w-full p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Your Chess Goals!</h2>
        <p className="text-gray-400">Track your progress daily and keep getting better!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${goal.color} rounded-xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50`}
            />
            <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                {goal.icon}
                <h3 className="text-sm font-medium text-white">{goal.title}</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold text-white">{goal.value}</div>
                <div className={`text-sm ${goal.change > 0 ? "text-green-400" : "text-red-400"}`}>
                  {goal.change > 0 ? "+" : ""}
                  {goal.change}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

