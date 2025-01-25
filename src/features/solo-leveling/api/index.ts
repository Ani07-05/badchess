import { Game } from '../utils/chess-games.types';
import { PlayerStatistics } from '../utils/chess-stats.types';

// TODO Test this function for fetching player stats
export async function fetchGameResults ( username: string ): Promise<Game[]> {
    const response = await fetch( `https://api.chess.com/pub/player/${username}/games/2024/12` );
    const data = await response.json();
    return data.games as Game[];
}

export async function fetchPlayerStats ( username: string ): Promise<PlayerStatistics | Error> {
    const response = await fetch( `https://api.chess.com/pub/player/${username}/stats` );
    const data = await response.json();
    return data as PlayerStatistics;
}
