"use client"

import { motion } from "framer-motion"

interface GlowingPieChartProps {
  data: {
    wins: number
    losses: number
    draws: number
  }
  rating: number
  title: string
}

export function GlowingPieChart({ data, rating, title }: GlowingPieChartProps) {
  const total = data.wins + data.losses + data.draws
  const radius = 42
  const circumference = 2 * Math.PI * radius

  const segments = [
    { value: data.wins, color: "#FF0000", glow: "#FF000066" },
    { value: data.losses, color: "#8B00FF", glow: "#8B00FF66" },
    { value: data.draws, color: "#FFD700", glow: "#FFD70066" },
  ]

  let currentOffset = 0
  const renderedSegments = segments.map((segment, index) => {
    const segmentLength = (segment.value / total) * circumference
    const segmentOffset = currentOffset
    currentOffset += segmentLength

    return (
      <g key={index}>
        <circle
          className="transition-all duration-300"
          strokeWidth="4"
          strokeDasharray={`${segmentLength} ${circumference}`}
          strokeDashoffset={-segmentOffset}
          stroke={segment.color}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{
            filter: `drop-shadow(0 0 10px ${segment.glow})`,
          }}
        />
      </g>
    )
  })

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-gray-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {renderedSegments}
            <text
              x="50"
              y="50"
              className="text-2xl font-bold"
              textAnchor="middle"
              dy=".3em"
              fill="currentColor"
              transform="rotate(90 50 50)"
            >
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
    </motion.div>
  )
}

