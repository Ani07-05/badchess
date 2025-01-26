import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Get the current month's games
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0")

    const response = await fetch(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`)

    if (!response.ok) {
      throw new Error("Failed to fetch chess.com games")
    }

    const data = await response.json()
    const games = data.games || []

    // Calculate streaks
    let currentStreak = 0
    let maxStreak = 0
    let hasThreeGameStreak = false
    let hasFiveGameStreak = false

    games.reverse().forEach((game: any) => {
      const isWin =
        (game.white.username === username && game.white.result === "win") ||
        (game.black.username === username && game.black.result === "win")

      if (isWin) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
        if (currentStreak >= 3) hasThreeGameStreak = true
        if (currentStreak >= 5) hasFiveGameStreak = true
      } else {
        currentStreak = 0
      }
    })

    return NextResponse.json({
      games: games.slice(0, 5), // Return only the 5 most recent games
      currentStreak,
      maxStreak,
      hasThreeGameStreak,
      hasFiveGameStreak,
    })
  } catch (error) {
    console.error("Error fetching games:", error)
    return NextResponse.json({ error: "Failed to fetch chess.com games" }, { status: 500 })
  }
}

