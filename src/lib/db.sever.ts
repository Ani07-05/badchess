import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { levelsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

let db: ReturnType<typeof drizzle>

if (process.env.NODE_ENV === 'production') {
  // Use connection pooling in production
  db = drizzle(postgres(process.env.DATABASE_URL!))
} else {
  // Use a new connection for every request in development
  if (!(global as { db?: ReturnType<typeof drizzle> }).db) {
    (global as { db?: ReturnType<typeof drizzle> }).db = drizzle(postgres(process.env.DATABASE_URL!))
  }
  db = (global as { db?: ReturnType<typeof drizzle> }).db!
}

export async function fetchNextLevel(level: number) {
  return db.select().from(levelsTable).where(eq(levelsTable.level, level + 1))
}

export { db }
