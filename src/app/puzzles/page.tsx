"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Lightbulb, Trophy } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { TracedKing } from "@/components/traced-king"

const puzzles = [
  {
    fen: "r3k2r/ppq1bppp/2n1pn2/2b5/2BP4/2N2N2/PP2QPPP/R1B2RK1 w kq - 0 1",
    solution: ["Qxe7"],
    difficulty: 1200,
  },
  {
    fen: "8/8/8/4R3/8/1p6/1P3K2/1k6 w - - 0 1",
    solution: ["Re1"],
    difficulty: 1000,
  },
  {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    solution: ["d4"],
    difficulty: 1400,
  },
  {
    fen: "r3k2r/ppp2ppp/2n1bn2/2b1p1B1/4P3/2N2N2/PPPP1PPP/R2QK2R w KQkq - 0 7",
    solution: ["Bxf6"],
    difficulty: 1600,
  },
  {
    fen: "r1bqk2r/ppp2ppp/2n5/3np3/2B5/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 7",
    solution: ["Bxf7+"],
    difficulty: 1800,
  },
]

export default function PuzzlesPage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [puzzlesSolved, setPuzzlesSolved] = useState(0)
  const [streak, setStreak] = useState(0)

  const handleMove = (move: { from: string; to: string }) => {
    const moveString = `${move.from}${move.to}`
    if (puzzles[currentPuzzle].solution.includes(moveString)) {
      setCompleted(true)
      setScore(score + puzzles[currentPuzzle].difficulty)
      setPuzzlesSolved(puzzlesSolved + 1)
      setStreak(streak + 1)
    } else {
      setStreak(0)
    }
  }

  const handleNextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1)
    } else {
      setCurrentPuzzle(0)
    }
    setCompleted(false)
    setShowHint(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8 pt-20 relative overflow-hidden">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-black/40 backdrop-blur-sm border-white/10 p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Puzzle Stats</h2>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>

                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-800"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-red-500"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="50"
                      cy="50"
                      style={{
                        strokeDasharray: `${(puzzlesSolved / puzzles.length) * 264}, 264`,
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                      }}
                    />
                    <text
                      x="50"
                      y="50"
                      className="text-2xl font-bold"
                      textAnchor="middle"
                      dy=".3em"
                      fill="currentColor"
                      transform="rotate(90 50 50)"
                    >
                      {score}
                    </text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Puzzles Solved</span>
                    <span className="font-bold">{puzzlesSolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Streak</span>
                    <span className="font-bold">{streak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Puzzle Rating</span>
                    <span className="font-bold">{puzzles[currentPuzzle].difficulty}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Link href="/dashboard">
              <Button variant="outline" className="w-full text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Chess Board Section */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 backdrop-blur-sm border-white/10">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">
                    Puzzle {currentPuzzle + 1} / {puzzles.length}
                  </h1>
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400">
                    Rating: {puzzles[currentPuzzle].difficulty}
                  </Badge>
                </div>

                <div className="aspect-square max-w-2xl mx-auto mb-6">
                  <TracedKing/>
                </div>

                <div className="flex justify-between items-center">
                  <Button onClick={() => setShowHint(!showHint)} variant="outline" className="text-white">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>

                  <Button
                    onClick={handleNextPuzzle}
                    disabled={!completed}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Next Puzzle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-yellow-500/20 rounded-lg"
                  >
                    <p className="text-yellow-300">Look for a forcing move that creates a tactical advantage...</p>
                  </motion.div>
                )}

                {completed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-500/20 rounded-lg"
                  >
                    <p className="text-green-300">
                      Well done! You found the correct move. Try the next puzzle to continue your streak!
                    </p>
                  </motion.div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

