import { createDb } from '@/db';
import { levelsTable } from '@/db/schema';
import { fetchPlayerStats, fetchGameResults } from '@/features/solo-leveling/api';
import { getAllLevels } from '@/features/solo-leveling/db';
import { levelCheck } from '@/features/solo-leveling/lib/completion-statistics/level-calculation';
import { nGamesInRow } from '@/features/solo-leveling/lib/completion-statistics/n-games-in-row';
import { fetchBackendUser } from '@/lib/user';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { Suspense } from 'react';


export default async function Home () {
  const user = await currentUser();
  if ( !user?.primaryEmailAddress || !user.id || !user.username ) {
    return <SignInButton />;
  }
  const games = await fetchGameResults( user.username );
  const stats = await fetchPlayerStats( user.username );
  const player = await fetchBackendUser( user.id );


  if ( !stats || !games || 'message' in stats || player === null ) {
    return <div>Failed to fetch data</div>;
  }
  const level = await fetchNextLevel( player.level );
  if ( level === null ) {
    return <div>Failed to fetch level</div>;
  }

  const shouldLevelUp = await levelCheck(
    user.username,
    user.id,
    player.initRating,
    stats.chess_rapid.last.rating,
    level[0].lowerBoundRating,
    level[0].upperBoundRating,
    games,
    3
  );
  console.log(shouldLevelUp);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserButton />
    </Suspense>
  );
}
export async function fetchNextLevel ( level: number ) {
  const db = await createDb()
  return db.select().from(levelsTable).where(eq(levelsTable.level, level + 1));
}

