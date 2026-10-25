"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActiveRoute } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "hidden md:flex sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--color-black)]/80 border-b border-white/5",
        className
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-5xl w-full mx-auto px-6 h-16 flex items-center justify-center"
      >
        <div className="flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Button
                key={item.href}
                href={item.href}
                variant="plain"
                size="sm"
                sweepClassName={item.sweepClass}
                className={cn(
                  active ? item.textClass : "text-white"
                )}
              >
                {item.title}
              </Button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
