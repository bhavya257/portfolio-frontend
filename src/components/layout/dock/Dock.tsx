"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useActiveDockSignal } from "./dockStore";
import { DockControl } from "./DockControls";
import type { DockProps } from "./types";

/**
 * Mobile Dock: acts as a standalone IO/peripheral device at the bottom of the screen.
 * Listens for signals from active components (navigation, menu overlay, image gallery, pages)
 * and renders their configured controls while routing interactions back via onAction.
 */
export function Dock({ className }: DockProps) {
  const activeSignal = useActiveDockSignal();

  const resolvedMode = activeSignal?.mode ?? "default";
  const resolvedItems = activeSignal?.items ?? [];
  const resolvedOptions = activeSignal?.options;
  const resolvedOnAction = activeSignal?.onAction;

  if (resolvedOptions?.hidden || resolvedItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={resolvedOptions?.ariaLabel ?? "Mobile Dock"}
      className={cn(
        "fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 md:hidden",
        "flex items-center gap-2 p-1.5",
        "bg-black/60 backdrop-blur-md rounded-2xl border border-white shadow-2xl overflow-hidden",
        className,
        resolvedOptions?.className
      )}
    >
      <motion.div
        key={resolvedMode}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }}
        className="flex items-center gap-2"
      >
        {resolvedItems.map((item) => (
          <DockControl
            key={item.id}
            item={item}
            onAction={resolvedOnAction}
          />
        ))}
      </motion.div>
    </nav>
  );
}
