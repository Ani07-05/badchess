export interface Game {
    url: string;
    pgn: string;
    time_control: string;
    end_time: number;
    rated: boolean;
    accuracies?: Accuracies;
    fen: string;
    time_class: string;
    rules: string;
    white: White;
    black: Black;
}

export interface Accuracies {
    white: number;
    black: number;
}

export interface White {
    rating: number;
    result: string;
    "@id": string;
    username: string;
    uuid: string;
}

export interface Black {
    rating: number;
    result: string;
    "@id": string;
    username: string;
    uuid: string;
}

export type result = 'agreed'|'checkmated'|'insufficient'|'repetition'|'resigned'|'stalemate'|'timeout'|'timevsinsufficient'|'win' ;
