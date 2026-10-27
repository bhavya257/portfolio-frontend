import { Suspense } from "react";
import { AboutCard, AboutCardSkeleton } from "@/components/cards/about";

export default function Home() {
  return (
    <div className="w-full max-w-xl mx-auto p-0 sm:py-8 sm:px-4 flex flex-col items-start">
      <Suspense fallback={<AboutCardSkeleton />}>
        <AboutCard />
      </Suspense>
    </div>
  );
}
