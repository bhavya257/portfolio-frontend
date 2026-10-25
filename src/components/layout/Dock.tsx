"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { getDockItems } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface DockProps {
  onOpenMenu?: () => void;
  className?: string;
}

export function Dock({ onOpenMenu, className }: DockProps) {
  const pathname = usePathname();
  const dockItems = getDockItems(pathname);

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className={cn(
        "fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-40 md:hidden",
        "flex items-center gap-2 p-1.5",
        "bg-black/40 backdrop-blur-xs rounded-2xl border border-white shadow-2xl",
        className
      )}
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
      <Button
        size="icon"
        variant="plain"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        iconStart={Menu}
        className="text-white hover:text-white/80"
      />
    </nav>
  );
}
