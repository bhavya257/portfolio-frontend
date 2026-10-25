"use client";

import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { getDockItems } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { triggerSnap, triggerTick } from "@/lib/haptics";
import { cn } from "@/lib/cn";

export interface DockProps {
  isMenuOpen?: boolean;
  onToggleMenu?: () => void;
  className?: string;
}

export function Dock({ isMenuOpen = false, onToggleMenu, className }: DockProps) {
  const pathname = usePathname();
  const dockItems = getDockItems(pathname);

  const handleToggle = () => {
    if (isMenuOpen) {
      triggerSnap();
    } else {
      triggerTick();
    }
    onToggleMenu?.();
  };

  return (
    <motion.nav
      layout
      aria-label="Mobile Navigation Dock"
      className={cn(
        "fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-50 md:hidden",
        "flex items-center gap-2 p-1.5",
        "bg-black/40 backdrop-blur-xs rounded-2xl border border-white shadow-2xl overflow-hidden",
        className
      )}
      transition={{ layout: { duration: 0.18, ease: [0.2, 0, 0, 1] } }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {!isMenuOpen && (
          <motion.div
            key="dock-shortcuts"
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
            className="flex items-center gap-2"
          >
            {dockItems.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                size="icon"
                variant="solid"
                className={item.tileClass}
                aria-label={item.title}
                iconStart={item.icon}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        layout
        onClick={handleToggle}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92, filter: "brightness(0.75)" }}
        transition={{ duration: 0.09, ease: [0.2, 0, 0, 1] }}
        className="h-11 w-11 p-0 rounded-xl flex items-center justify-center text-white hover:text-white/80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isMenuOpen ? (
            <motion.span
              key="close-icon"
              initial={{ rotate: -22.5, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -22.5, scale: 0, opacity: 0 }}
              transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }}
              className="flex items-center justify-center"
            >
              <X size={24} strokeWidth={2.5} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="menu-icon"
              initial={{ rotate: 22.5, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 22.5, scale: 0, opacity: 0 }}
              transition={{ duration: 0.14, ease: [0.2, 0, 0, 1] }}
              className="flex items-center justify-center"
            >
              <Menu size={24} strokeWidth={2.5} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.nav>
  );
}
