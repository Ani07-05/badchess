import { LevelUp } from '@/lib/levels';
import { Game } from '../../utils/chess-games.types';
import { ratingLowerCheck, ratingUpperCheck } from './chess-rating';
import { nGamesInRow } from './n-games-in-row';

export async function levelCheck (
    username: string,
    userId: string,
    initialUserRating: number,
    currentUserRating: number,
    chessLowerBound: number,
    chessUpperBound: number,
    games: Game[],
    nGames: number
): Promise<boolean> {
    if ( ratingUpperCheck( currentUserRating, chessUpperBound ) ) {
        return true;
    } else if (
        ratingLowerCheck( initialUserRating, currentUserRating, chessLowerBound ) &&
        nGamesInRow( games, username, nGames )
    ) { return true; }
    else { return false; }
}
