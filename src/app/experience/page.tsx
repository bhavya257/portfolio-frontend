import { Suspense } from "react";
import { ExperienceCard, ExperienceCardSkeleton } from "@/components/cards/experience";

export const metadata = {
  title: "Experience | Bhavya Jain",
  description: "Career history, internships, and engineering experience of Bhavya Jain.",
};

export default function ExperiencePage() {
  return (
    <div className="w-full max-w-xl mx-auto p-0 sm:py-8 sm:px-4 flex flex-col items-start">
      <Suspense fallback={<ExperienceCardSkeleton />}>
        <ExperienceCard />
      </Suspense>
    </div>
  );
}
