"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Dock } from "@/components/layout/Dock";
import { MenuDialog } from "@/components/layout/MenuDialog";
import { Footer } from "@/components/layout/Footer";
export interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </main>
      <Dock
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />
      <MenuDialog isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
