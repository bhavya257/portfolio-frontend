"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { getDockItems } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { MenuDialog } from "@/components/layout/MenuDialog";
import { Footer } from "@/components/layout/Footer";
import {
  Dock,
  useDockSignal,
  DOCK_PRIORITY,
  type DockSignal,
} from "@/components/layout/dock";

export interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navDockSignal = useMemo<DockSignal>(() => {
    const shortcuts = getDockItems(pathname);

    return {
      mode: "nav",
      items: [
        ...shortcuts.map((item) => ({
          id: `nav:${item.href}`,
          href: item.href,
          label: item.title,
          icon: item.icon,
          className: item.tileClass,
          payload: { href: item.href },
        })),
        {
          id: "open-menu",
          label: "Open navigation menu",
          icon: Menu,
          variant: "ghost",
          className: "text-white hover:text-white/80",
        },
      ],
      onAction: (actionId: string) => {
        if (actionId === "open-menu") {
          setIsMenuOpen(true);
        }
      },
    };
  }, [pathname]);

  useDockSignal(navDockSignal, DOCK_PRIORITY.BASE);

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
      >
        <small>Skip to content</small>
      </a>
      <Navbar />
      <main id="content" className="flex-1 pb-24 md:pb-0 flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
      <MenuDialog isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Dock />
    </>
  );
}
