import { NextResponse } from "next/server"
import { fetchNextLevel } from "../../../lib/db.sever"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const level = searchParams.get("level")

  if (!level) {
    return NextResponse.json({ error: "Level is required" }, { status: 400 })
  }

  try {
    const nextLevel = await fetchNextLevel(Number.parseInt(level, 10))
    return NextResponse.json(nextLevel[0] || null)
  } catch (error) {
    console.error("Error fetching next level:", error)
    return NextResponse.json({ error: "Failed to fetch next level" }, { status: 500 })
  }
}

