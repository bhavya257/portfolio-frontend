import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function AboutCardSkeleton() {
  return (
    <Card className="w-full min-h-[calc(100dvh-var(--spacing-dock,5rem)-2rem)] sm:min-h-0 border-2 border-purple/40 rounded-[2rem] p-6 sm:p-8 flex flex-col items-start gap-6">
      <Skeleton className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl shrink-0 mx-auto" />
      <Skeleton className="h-10 w-44 rounded-lg mx-auto" />
      <div className="flex flex-col gap-3 w-full">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
    </Card>
  );
}
