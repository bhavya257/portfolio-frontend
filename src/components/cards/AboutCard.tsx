import { PortableText } from "@portabletext/react";
import { getAbout } from "@/sanity";
import { SanityImage } from "@/components/ui/SanityImage";
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

export async function AboutCard() {
  const about = await getAbout();

  return (
    <Card className="w-full min-h-[calc(100dvh-var(--spacing-dock,5rem)-2rem)] sm:min-h-0 border-2 border-purple rounded-[2rem] p-6 sm:p-8 flex flex-col items-start gap-6">
      {about?.image && (
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-2 ring-purple shadow-xl shrink-0 mx-auto">
          <SanityImage
            image={about.image}
            lqip={about.image.asset?.metadata?.lqip}
            alt={about.image.alt || "Bhavya Jain"}
            fill
            square
            sizes="(max-width: 640px) 112px, 128px"
            className="object-cover"
            fetchPriority="high"
          />
        </div>
      )}

      <h1 className="text-purple text-center w-full">About Me</h1>

      <div className="flex flex-col gap-4 text-left w-full">
        {about?.description ? (
          <PortableText value={about.description} />
        ) : (
          <p>
            {about?.plainText ||
              "Software engineer driven by curiosity and first principles, solving complex problems across diverse domains."}
          </p>
        )}
      </div>
    </Card>
  );
}
