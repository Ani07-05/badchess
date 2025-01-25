import { createDb } from '@/db';
import { levelsTable, usersTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function LevelUp(userId : string){
    const db = await createDb();
    return await db.update(usersTable).set({level: sql`level + 1`}).where(eq(usersTable.id, userId)).returning({ level: usersTable.level });
}
