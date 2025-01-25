import { createDb } from '@/db';
import { usersTable } from '@/db/schema';
import { SelectUser } from '@/db/types';
import { eq } from 'drizzle-orm';

export async function fetchBackendUser ( userId: string ) {
    const db = await createDb();
    const user = await db.select().from( usersTable ).where( eq( usersTable.id, userId ) );
    if ( user.length === 0 ) {
        return null;
    }
    return user[0] as SelectUser;
}
export async function userExists ( userId: string ): Promise<boolean> {
    return await fetchBackendUser( userId ).then( user => !!user );
}

export async function createUser ( userId: string, email: string, level: number, initRating?: number, puzzleRating?: number ) {
    const db = await createDb();
    try {
        await db.insert( usersTable ).values( {
            id: userId,
            email,
            level,
            initRating: initRating ?? 1000,
            puzzleRating: puzzleRating ?? 1000,
        } ).returning( { id: usersTable.id } );
        return userId;
    } catch ( error ) {
        if (error instanceof Error) {
            if (error.message.includes('duplicate key value violates unique constraint')) {
                console.log('User already exists');
                return userId;
            }
        }
        return null;
    }
}
