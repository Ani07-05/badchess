"use client"

import { motion } from "framer-motion"

export function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.5, scale: 0.8 }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-32 h-32 relative"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-purple-500/20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 20v60M40 25h20M35 45h30M30 55h40M25 85h50M30 75h40M35 65h30M45 30l5-5 5 5" />
          <circle cx="50" cy="22" r="2" />
        </svg>
        <div className="absolute inset-0 blur-xl bg-purple-500/20 animate-pulse" />
      </motion.div>
    </div>
  )
}

