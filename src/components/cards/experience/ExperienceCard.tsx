import { PortableText } from "@portabletext/react";
import { Briefcase, ArrowRight } from "lucide-react";
import { getJobs, getJobsPreview, type Job } from "@/sanity";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { siteConfig } from "@/lib/site";
import { formatDateRange } from "@/lib/date";

export interface ExperienceCardProps {
  preview?: boolean;
}

export async function ExperienceCard({ preview = false }: ExperienceCardProps) {
  const jobs: Job[] = preview ? await getJobsPreview() : await getJobs();
  const sectionTitle = siteConfig.sections.experience.title;
  const fallback = siteConfig.fallbacks.experience;

  return (
    <Card className="w-full min-h-[calc(100dvh-var(--spacing-dock,5rem)-2rem)] sm:min-h-0 border-2 border-orange rounded-[2rem] p-6 sm:p-8 flex flex-col items-start gap-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 w-full text-center">
        <div
          className="w-14 h-14 rounded-2xl bg-orange text-black flex items-center justify-center shadow-lg"
          aria-hidden="true"
        >
          <Briefcase size={28} strokeWidth={2.2} />
        </div>
        <h1 className="text-orange">{sectionTitle}</h1>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={fallback.emptyTitle}
          description={fallback.emptyDescription}
          className="w-full py-8"
        />
      ) : (
        /* Timeline */
        <div className="flex flex-col gap-8 w-full">
          {jobs.map((job) => {
            const dateRange = formatDateRange(
              job.startDate,
              job.endDate,
              job.customEndDate
            );

            return (
              <article
                key={job._id}
                className="flex flex-col gap-3 pb-8 border-b border-white/10 last:border-b-0 last:pb-0"
              >
                {/* Header: Title & Company grouped, Date separate */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {job.title}
                    </h2>
                    {job.company && (
                      <Button
                        href={job.website?.url || undefined}
                        target={job.website?.url ? "_blank" : undefined}
                        rel={job.website?.url ? "noopener noreferrer" : undefined}
                        variant="plain"
                        size="sm"
                        sweepClassName="bg-orange"
                        disabled={!job.website?.url}
                        className={!job.website?.url ? "pointer-events-none" : undefined}
                      >
                        @{job.company}
                      </Button>
                    )}
                  </div>

                  {dateRange && (
                    <time
                      dateTime={job.startDate || undefined}
                      className="text-xs sm:text-sm font-medium tracking-wide text-white/50 shrink-0 sm:pt-1"
                    >
                      {dateRange}
                    </time>
                  )}
                </div>

                {/* Content */}
                {job.description && (
                  <div className="flex flex-col gap-2 text-base text-white/80 leading-relaxed mt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:marker:text-orange [&_li]:mt-1.5">
                    <PortableText value={job.description} />
                  </div>
                )}

                {/* Gallery */}
                {job.images && job.images.length > 0 && (
                  <div className="mt-2">
                    <ImageGallery
                      images={job.images}
                      altPrefix={`${job.company || "Job"} media`}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* CTA */}
      {preview && (
        <div className="w-full pt-4 border-t border-white/10 flex justify-center">
          <Button
            href="/experience"
            variant="outline"
            size="sm"
            sweepClassName="bg-orange"
            className="border-orange text-orange"
            iconEnd={ArrowRight}
          >
            View Full Experience
          </Button>
        </div>
      )}
    </Card>
  );
}
