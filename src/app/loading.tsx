import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-xl w-full mx-auto px-6 py-12 flex flex-col items-center sm:items-start gap-6">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="h-10 w-44 rounded-lg" />
      <div className="flex flex-col gap-3 w-full">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
      </div>
      <div className="flex flex-col gap-4 w-full mt-4">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    </div>
  );
}