export interface PlayerStatistics {
    chess960_daily: GameFormat;
    chess_blitz: GameFormat;
    chess_bullet: GameFormat;
    chess_daily: GameFormat;
    chess_rapid: GameFormat;
    fide: number;
    puzzle_rush: PuzzleRush;
    tactics: Tactics;
}

export interface GameFormat {
    best: Best;
    last: Last;
    record: Record;
}

interface Best {
    date: number;
    game: string;
    rating: number;
}

interface Last {
    date: number;
    rating: number;
    rd: number;
}

export interface Record {
    draw: number;
    loss: number;
    time_per_move: number;
    timeout_percent: number;
    win: number;
}

interface PuzzleRush {
    best: BestPuzzle;
    daily: Daily;
}

interface BestPuzzle {
    score: number;
    total_attempts: number;
}

interface Daily {
    score: number;
    total_attempts: number;
}

interface Tactics {
    highest: Highest;
    lowest: Lowest;
}

interface Highest {
    date: number;
    rating: number;
}

interface Lowest {
    date: number;
    rating: number;
}

