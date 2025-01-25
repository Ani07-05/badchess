import { sql } from 'drizzle-orm';
import { integer, pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable( "users", {
    id: text('user_id').primaryKey(),
    initRating: integer('init_rating').notNull().default( 1000 ),
    puzzleRating: integer('puzzle_rating').notNull().default( 1000 ),
    puzzlesSolved: text( 'puzzles_solved' ).array().notNull().default( sql`'{}'::text[]` ),
    email: text().notNull(),
    level: integer().references( () => levelsTable.level ).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    leveledUpAt: timestamp( 'leveled_up_at' ).notNull().defaultNow(),
    lastPuzzleAt: timestamp( 'last_puzzle_at' ).notNull().defaultNow(),
    lastBrilliantMoveAt: timestamp( 'last_brilliant_move_at' ).notNull().defaultNow(),
} );

export const levelsTable = pgTable( "levels", {
    level: serial().primaryKey(),
    name: text().notNull().default( "" ),
    description: text().notNull().default( "" ),
    lowerBoundRating: integer( 'lower_bound_chess_rating' ).notNull(),
    upperBoundRating: integer( 'upper_bound_chess_rating' ).notNull(),
    lowerBoundPuzzleRating: integer( 'lower_bound_puzzle_rating' ).notNull(),
    upperBoundPuzzleRating: integer( 'upper_bound_puzzle_rating' ).notNull(),
    numberOfPuzzles: integer( 'number_of_puzzles' ).notNull(),
    numberOfBrilliantMoves: integer( 'number_of_brilliant_moves' ).notNull(),
    numberOfGoodMoves: integer( 'number_of_good_moves' ).notNull(),
} );

export const tacticsTable = pgTable( "tactics", {
    tactic: text().primaryKey(),
} );

export const puzzleTable = pgTable( "puzzles", {
    id: serial().primaryKey(),
    name: text().notNull().default( "" ),
    fen: text().notNull().default( "" ),
    playerMoves: text('player_moves').array().notNull().default( sql`'{}'::text[]` ),
    computerMoves: text('computer_moves').array().notNull().default( sql`'{}'::text[]` ),
    puzzleRating: integer( 'puzzle_rating' ).notNull(),
    tactic: text().references( () => tacticsTable.tactic ).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
} );

export const brilliantMovesTable = pgTable( "brilliant_moves", {
    id: serial().primaryKey(),
    userId: text().references( () => usersTable.id ).notNull(),
    fen: text().notNull().default( "" ),
    move: text().notNull().default( "" ),
    createdAt: timestamp('created_at').notNull().defaultNow()
} );
