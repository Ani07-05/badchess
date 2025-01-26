"use client"

import { useState, useEffect } from "react"
import { Welcome } from "@/components/welcome"
import { GlowingPieChart } from "@/components/glowing-pie-chart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Trophy, Youtube } from "lucide-react"
import { GameHistory } from "@/components/game-history"
import { TracedChessKing } from "@/components/traced-king"

export default function Home() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("chess-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const loadStats = async () => {
      if (user?.username) {
        try {
          const response = await fetch(`/api/player-stats?username=${user.username}`)
          if (response.ok) {
            const data = await response.json()
            setStats(data)
          }
        } catch (error) {
          console.error("Error loading stats:", error)
        }
      }
    }
    loadStats()
  }, [user?.username])

  if (loading) {
    return <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <Welcome onComplete={(username, email) => setUser({ username, email })} />
  }

  // return (
  //   <div className="min-h-screen bg-[#0A0A0B] text-white p-8 pt-20 relative overflow-hidden">
  //     {/* Dotted Background Pattern */}
  //     <div
  //       className="absolute inset-0 opacity-5"
  //       style={{
  //         backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
  //         backgroundSize: "30px 30px",
  //       }}
  //     />

  //     <div className="max-w-7xl mx-auto space-y-8">
  //       <div className="flex items-center justify-between">
  //         <div>
  //           <h1 className="text-4xl font-bold">Welcome back, {user.username}!</h1>
  //           <p className="text-gray-400 mt-2">Track your progress and improve your game</p>
  //         </div>
  //         <div className="flex gap-4">
  //           <Link href="/tournaments">
  //             <Button variant="outline" className="text-white">
  //               <Trophy className="mr-2 h-5 w-5" />
  //               Tournaments
  //             </Button>
  //           </Link>
  //           <Link href="/puzzles">
  //             <Button className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600">
  //               <Trophy className="mr-2 h-5 w-5" />
  //               Solve Puzzles
  //             </Button>
  //           </Link>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //         {stats && (
  //           <>
  //             <GlowingPieChart
  //               data={{
  //                 wins: stats.chess_bullet?.record.win || 0,
  //                 losses: stats.chess_bullet?.record.loss || 0,
  //                 draws: stats.chess_bullet?.record.draw || 0,
  //               }}
  //               rating={stats.chess_bullet?.last.rating || 0}
  //               title="Bullet"
  //             />
  //             <GlowingPieChart
  //               data={{
  //                 wins: stats.chess_blitz?.record.win || 0,
  //                 losses: stats.chess_blitz?.record.loss || 0,
  //                 draws: stats.chess_blitz?.record.draw || 0,
  //               }}
  //               rating={stats.chess_blitz?.last.rating || 0}
  //               title="Blitz"
  //             />
  //             <GlowingPieChart
  //               data={{
  //                 wins: stats.chess_rapid?.record.win || 0,
  //                 losses: stats.chess_rapid?.record.loss || 0,
  //                 draws: stats.chess_rapid?.record.draw || 0,
  //               }}
  //               rating={stats.chess_rapid?.last.rating || 0}
  //               title="Rapid"
  //             />
  //           </>
  //         )}
  //       </div>

  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //         <div className="lg:col-span-2">
  //           <Card className="bg-black/40 backdrop-blur-sm border-white/10 overflow-hidden">
  //             <div className="aspect-video">
  //               <iframe
  //                 src="https://www.youtube.com/embed/9FUcqzplof4"
  //                 className="w-full h-full"
  //                 title="Featured Chess Video"
  //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //                 allowFullScreen
  //               />
  //             </div>
  //           </Card>
  //         </div>
  //         <div className="space-y-6">{user && <GameHistory username={user.username} />}</div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

