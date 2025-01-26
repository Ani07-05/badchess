"use client"

import { motion } from "framer-motion"

interface ThinPieChartProps {
  data: {
    wins: number
    losses: number
    draws: number
  }
  rating: number
  title: string
}

export function ThinPieChart({ data, rating, title }: ThinPieChartProps) {
  const total = data.wins + data.losses + data.draws
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const winsOffset = (data.wins / total) * circumference
  const lossesOffset = (data.losses / total) * circumference
  const drawsOffset = (data.draws / total) * circumference

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              className="text-gray-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Wins segment */}
            <circle
              className="text-red-500"
              strokeWidth="4"
              strokeDasharray={`${winsOffset} ${circumference}`}
              strokeDashoffset="0"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Losses segment */}
            <circle
              className="text-purple-500"
              strokeWidth="4"
              strokeDasharray={`${lossesOffset} ${circumference}`}
              strokeDashoffset={-winsOffset}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Draws segment */}
            <circle
              className="text-yellow-500"
              strokeWidth="4"
              strokeDasharray={`${drawsOffset} ${circumference}`}
              strokeDashoffset={-(winsOffset + lossesOffset)}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <text x="50" y="50" className="text-2xl font-bold" textAnchor="middle" dy=".3em" fill="currentColor">
              {rating}
            </text>
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div>
            <div className="text-red-500 font-medium">Wins</div>
            <div className="text-sm text-gray-400">{data.wins}</div>
          </div>
          <div>
            <div className="text-purple-500 font-medium">Losses</div>
            <div className="text-sm text-gray-400">{data.losses}</div>
          </div>
          <div>
            <div className="text-yellow-500 font-medium">Draws</div>
            <div className="text-sm text-gray-400">{data.draws}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

