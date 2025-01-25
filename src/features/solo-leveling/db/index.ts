import { createDb } from '@/db';
import { levelsTable } from '@/db/schema';

export async function getAllLevels() {
    const db = await createDb();
    try {
        return await db.select().from(levelsTable);
    } catch (error) {
        console.error(error);
    }
}
