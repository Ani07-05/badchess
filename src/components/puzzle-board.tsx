"use client"

import { useState } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, RotateCcw, ChevronRight } from "lucide-react"

interface PuzzleBoardProps {
  fen: string
  onMove?: (move: { from: string; to: string }) => void
}

export function PuzzleBoard({ fen, onMove }: PuzzleBoardProps) {
  const [game, setGame] = useState(new Chess(fen))
  const [showHint, setShowHint] = useState(false)

  function makeMove(move: { from: string; to: string }) {
    try {
      const gameCopy = new Chess(game.fen())
      const result = gameCopy.move(move)
      if (result) {
        setGame(gameCopy)
        onMove?.(move)
        return true
      }
    } catch (error) {
      console.error("Invalid move:", error)
    }
    return false
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
      <Card className="relative bg-black/40 backdrop-blur-sm border-white/10">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Daily Puzzle Challenge</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHint(!showHint)}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Lightbulb className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGame(new Chess(fen))}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="aspect-square max-w-2xl mx-auto">
            <Chessboard
              position={game.fen()}
              onPieceDrop={(source, target) => makeMove({ from: source, to: target })}
              customBoardStyle={{
                borderRadius: "0.75rem",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)",
              }}
            />
          </div>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 p-4 rounded-lg"
            >
              <p className="text-yellow-400">Look for a tactical shot involving the bishop...</p>
            </motion.div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-white">
              <div className="text-sm font-medium">Your Progress</div>
              <div className="text-2xl font-bold">3/5</div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Next Puzzle
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

