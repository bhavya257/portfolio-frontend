"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/Button";
import {
  useDockSignal,
  DOCK_PRIORITY,
  type DockSignal,
  type DockItem,
} from "@/components/layout/dock";
import type { SanityImageSource, GalleryItem, GalleryImage } from "@/sanity";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Collects visible, focusable elements inside the dialog and the mobile Dock,
 * since the Dock hosts the gallery controls on small screens.
 */
function getFocusableElements(dialog: HTMLElement): HTMLElement[] {
  const dock = document.querySelector<HTMLElement>("[data-dock]");
  const containers = dock ? [dialog, dock] : [dialog];

  return containers
    .flatMap((container) =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    )
    .filter((el) => el.getClientRects().length > 0);
}

export interface ImageGalleryModalProps {
  isOpen: boolean;
  activeIndex: number | null;
  images: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  altPrefix?: string;
}

export function ImageGalleryModal({
  isOpen,
  activeIndex,
  images,
  onClose,
  onPrev,
  onNext,
  altPrefix = "Gallery image",
}: ImageGalleryModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const total = images.length;
  const hasMultiple = total > 1;
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  // Signal the mobile Dock IO device to switch mode and render gallery controls
  const galleryDockSignal = useMemo<DockSignal | null>(() => {
    if (!isOpen || activeIndex === null) return null;

    const items: DockItem[] = [
      {
        id: "gallery-prev",
        label: "Previous image",
        icon: ChevronLeft,
        haptic: false,
        disabled: !hasMultiple,
        className: "bg-white/10 text-white border-white/20 hover:bg-white/20",
      },
      {
        type: "status",
        id: "gallery-counter",
        label: `${activeIndex + 1} / ${total}`,
      },
      {
        id: "gallery-next",
        label: "Next image",
        icon: ChevronRight,
        haptic: false,
        disabled: !hasMultiple,
        className: "bg-white/10 text-white border-white/20 hover:bg-white/20",
      },
      {
        id: "gallery-close",
        label: "Close image preview",
        icon: X,
        haptic: false,
        className: "bg-white text-black hover:bg-white/90 border-transparent",
      },
    ];

    return {
      mode: "gallery",
      items,
      onAction: (actionId: string) => {
        if (actionId === "gallery-prev") onPrev();
        else if (actionId === "gallery-next") onNext();
        else if (actionId === "gallery-close") onClose();
      },
    };
  }, [isOpen, activeIndex, total, hasMultiple, onPrev, onNext, onClose]);

  useDockSignal(galleryDockSignal, DOCK_PRIORITY.MODAL);

  // Move focus into the dialog on open and return it to the trigger on close
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    return () => {
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [isOpen]);

  // Handle keyboard events, trap Tab focus, and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasMultiple) onPrev();
      if (e.key === "ArrowRight" && hasMultiple) onNext();

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = getFocusableElements(dialogRef.current);
        if (focusable.length === 0) {
          e.preventDefault();
          dialogRef.current.focus();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement as HTMLElement | null;
        const isInside = current ? focusable.includes(current) : false;

        if (e.shiftKey && (current === first || !isInside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (current === last || !isInside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, hasMultiple, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && activeImage && activeIndex !== null && (
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery zoom view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md select-none focus:outline-none"
        >
          {/* Desktop Top Bar Controls */}
          <div
            className="hidden md:flex absolute top-6 right-6 items-center gap-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-medium tracking-wide text-white/60">
              {activeIndex + 1} / {total}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close image preview"
              iconStart={X}
              className="text-white hover:bg-white/10"
            />
          </div>

          {/* Main Zoomed Image Container */}
          <div
            className="relative max-w-4xl max-h-[70vh] sm:max-h-[75vh] w-full h-full flex items-center justify-center p-2 mb-20 md:mb-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[65vh] sm:max-h-[70vh] flex items-center justify-center">
              <SanityImage
                image={activeImage as SanityImageSource}
                lqip={(activeImage as GalleryImage)?.asset?.metadata?.lqip}
                alt={(activeImage as GalleryImage)?.alt || `${altPrefix} enlarged view`}
                fill
                sizes="(max-width: 1024px) 90vw, 1024px"
                className="object-contain rounded-xl drop-shadow-2xl"
              />
            </div>

            {/* Desktop Prev Button */}
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasMultiple}
              className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-orange text-white hover:text-black border border-white/20 hover:border-orange items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange shadow-lg disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={2.5} aria-hidden="true" />
            </button>

            {/* Desktop Next Button */}
            <button
              type="button"
              onClick={onNext}
              disabled={!hasMultiple}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-orange text-white hover:text-black border border-white/20 hover:border-orange items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange shadow-lg disabled:opacity-40 disabled:pointer-events-none"
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
