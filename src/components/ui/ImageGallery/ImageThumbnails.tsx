"use client";

import { SanityImage } from "@/components/ui/SanityImage";
import { triggerTick } from "@/lib/haptics";
import type { SanityImageSource, GalleryItem, GalleryImage } from "@/sanity";
import { cn } from "@/lib/cn";

export interface ImageThumbnailsProps {
  images: GalleryItem[];
  onSelect: (index: number) => void;
  altPrefix?: string;
  className?: string;
}

export function ImageThumbnails({
  images,
  onSelect,
  altPrefix = "Gallery image",
  className,
}: ImageThumbnailsProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {images.map((img, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => {
            triggerTick();
            onSelect(idx);
          }}
          className="group relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border border-white/10 hover:border-orange transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange hover:scale-105"
          aria-label={`View enlarged ${altPrefix} ${idx + 1} of ${images.length}`}
        >
          <SanityImage
            image={img as SanityImageSource}
            lqip={(img as GalleryImage)?.asset?.metadata?.lqip}
            alt={(img as GalleryImage)?.alt || `${altPrefix} ${idx + 1}`}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </button>
      ))}
    </div>
  );
}
