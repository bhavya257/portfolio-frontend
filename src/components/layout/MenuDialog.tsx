"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS, isActiveRoute } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { triggerSnap, triggerTick } from "@/lib/haptics";
import { cn } from "@/lib/cn";

export interface MenuDialogProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MenuDialog({ isOpen, onClose, className }: MenuDialogProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = useCallback(() => {
    triggerSnap();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
          onClick={handleClose}
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center justify-end px-6 pt-10 pb-28",
            "bg-black/60 backdrop-blur-xs select-none",
            className
          )}
        >
          <nav
            aria-label="Full Menu"
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-3 w-full max-w-xs mx-auto"
          >
            {NAV_ITEMS.map((item, index) => {
              const active = isActiveRoute(pathname, item.href);
              const reversedIndex = NAV_ITEMS.length - 1 - index;

              return (
                <motion.div
                  key={item.href}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{
                    duration: 0.16,
                    delay: reversedIndex * 0.02,
                    ease: [0.2, 0, 0, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      triggerTick();
                      onClose();
                    }}
                    onPointerEnter={() => {
                      router.prefetch(item.href);
                    }}
                    className="group flex items-center gap-3 w-full p-1 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer select-none"
                  >
                    <Button
                      size="icon"
                      variant="solid"
                      className={cn(item.tileClass, "pointer-events-none shrink-0")}
                      isActive={active}
                      iconStart={item.icon}
                      aria-hidden="true"
                    />

                    <Button
                      variant="plain"
                      size="md"
                      underline
                      sweepClassName={item.sweepClass}
                      className={cn(
                        "pointer-events-none",
                        active ? item.textClass : "text-white"
                      )}
                      tabIndex={-1}
                    >
                      {item.title}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
