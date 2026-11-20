"use client";

import { useState, useCallback } from "react";
import { triggerSnap, triggerTick } from "@/lib/haptics";
import type { GalleryItem } from "@/sanity";
import { ImageThumbnails } from "./ImageThumbnails";
import { ImageGalleryModal } from "./ImageGalleryModal";

export interface ImageGalleryProps {
  images: GalleryItem[];
  altPrefix?: string;
  className?: string;
}

export function ImageGallery({
  images,
  altPrefix = "Gallery image",
  className,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const total = images ? images.length : 0;
  const isOpen = activeIndex !== null;

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const handleClose = useCallback(() => {
    triggerSnap();
    setActiveIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    triggerTick();
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + total) % total : null));
  }, [total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    triggerTick();
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % total : null));
  }, [total]);

  if (!images || total === 0) return null;

  return (
    <>
      <ImageThumbnails
        images={images}
        onSelect={handleSelect}
        altPrefix={altPrefix}
        className={className}
      />

      <ImageGalleryModal
        isOpen={isOpen}
        activeIndex={activeIndex}
        images={images}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        altPrefix={altPrefix}
      />
    </>
  );
}
