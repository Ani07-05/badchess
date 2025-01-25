import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export async function createDb () {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres( process.env.DATABASE_URL, { prepare: false } );
    return drizzle( { client } );
}
