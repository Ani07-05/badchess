import { Skeleton } from './ui/skeleton';

export function Loading() {
  return (
    <div className={`h-screen grid grid-rows-2 gap-5 p-5`}>
      <div className={`flex flex-row items-center`}>
        <Skeleton className={`h-full w-full`} />
      </div>
      <div className={`h-full flex flex-row gap-5`}>
        <Skeleton className={`h-full aspect-video`} />
        <div className={`h-full w-full grid grid-cols-1 gap-5`}>
          <Skeleton className={`h-full w-full`} />
          <Skeleton className={`h-full w-full`} />
          <Skeleton className={`h-full w-full`} />
        </div>
      </div>
    </div>
  );
}
