import { Game } from './chess-games.types';

export function extractUniqueResults ( data: Game[] ): string[] {
    const results = new Set<string>();
    data.forEach( game => {
        if ( game.white.result ) results.add( game.white.result );
        if ( game.black.result ) results.add( game.black.result );
    } );
    return Array.from( results ).sort();
}



export function hasWon ( Game: Game, username: string ): boolean {
    const playerColor = Game.white.username === username ? 'white' : 'black';
    if ( playerColor === 'white' ) {
        return Game.white.result === 'win';
    } else {
        return Game.black.result === 'win';
    }
}
