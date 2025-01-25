import { levelsTable, usersTable, tacticsTable, puzzleTable, brilliantMovesTable } from './schema';
export type InsertUser = typeof usersTable.$inferInsert

export type SelectUser = typeof usersTable.$inferSelect
export type SelectLevel = typeof levelsTable.$inferSelect
export type tacticsSelect = typeof tacticsTable.$inferSelect
export type puzzleSelect = typeof puzzleTable.$inferSelect
export type brilliantMovesSelect = typeof brilliantMovesTable.$inferSelect

