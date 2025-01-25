import { hasWon } from '../../utils/chess-games';
import { Game } from '../../utils/chess-games.types';

export function nGamesInRow ( Games: Game[], username: string, n: number ): boolean {
    for ( let i = 0; i < Games.length - n; i++ ) {
        let count = 0;
        if ( hasWon( Games[i], username ) ) {
            count++;
            for ( let j = 1; j < n; j++ ) {
                if ( hasWon( Games[i + j], username ) ) {
                    count++;
                    if ( count === n ) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
