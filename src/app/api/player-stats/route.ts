import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`)
    if (!response.ok) {
      throw new Error("Failed to fetch chess.com stats")
    }
    const stats = await response.json()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching player stats:", error)
    return NextResponse.json({ error: "Failed to fetch chess.com stats" }, { status: 500 })
  }
}

