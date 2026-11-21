import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function ExperienceCardSkeleton() {
  return (
    <Card className="w-full min-h-[calc(100dvh-var(--spacing-dock,5rem)-2rem)] sm:min-h-0 border-2 border-orange/40 rounded-[2rem] p-6 sm:p-8 flex flex-col items-start gap-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-8 w-full">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-3 pb-6 border-b border-white/5 last:border-b-0"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-6 w-56 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
              <Skeleton className="h-4 w-28 rounded shrink-0" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
