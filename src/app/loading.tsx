import { AboutCardSkeleton } from "@/components/cards/AboutCard";

export default function Loading() {
  return (
    <div className="w-full max-w-xl mx-auto p-0 sm:py-8 sm:px-4 flex flex-col items-start">
      <AboutCardSkeleton />
    </div>
  );
}