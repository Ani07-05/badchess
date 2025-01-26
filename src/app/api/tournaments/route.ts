import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // First fetch the tournaments list
    const response = await fetch(`https://api.chess.com/pub/player/${username}/tournaments`)
    if (!response.ok) {
      throw new Error("Failed to fetch tournaments")
    }
    const tournamentsData = await response.json()

    // Process and organize tournaments
    const tournaments = {
      finished: tournamentsData.finished || [],
      in_progress: tournamentsData.in_progress || [],
      registered: tournamentsData.registered || [],
    }

    return NextResponse.json(tournaments)
  } catch (error) {
    console.error("Error fetching tournaments:", error)
    return NextResponse.json({ error: "Failed to fetch tournaments" }, { status: 500 })
  }
}

