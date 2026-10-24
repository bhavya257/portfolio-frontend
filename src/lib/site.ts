import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FileText,
  FolderGit2,
  Home,
  Mail,
  Sparkles,
} from "lucide-react";

export type TileColor = "lime" | "purple" | "orange";

export interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly accentColor: TileColor;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    accentColor: "orange",
  },
  {
    title: "Experience",
    href: "/experience",
    icon: Briefcase,
    accentColor: "purple",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderGit2,
    accentColor: "lime",
  },
  {
    title: "Skills",
    href: "/skills",
    icon: Sparkles,
    accentColor: "lime",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    accentColor: "orange",
  },
  {
    title: "Resume",
    href: "/resume",
    icon: FileText,
    accentColor: "purple",
  },
] as const;

export const siteConfig = {
  name: "Bhavya Jain",
  title: "Bhavya Jain | Software Engineer",
  description:
    "Portfolio of Bhavya Jain — Software Engineer driven by curiosity and first principles, solving complex problems across diverse domains.",
  navItems: NAV_ITEMS,
} as const;

/**
 * Returns exactly 3 contextual shortcut items for the mobile bottom dock
 * based on the active route, prioritizing the most relevant destination pages.
 */
export function getDockItems(pathname: string): readonly NavItem[] {
  const home = NAV_ITEMS[0];
  const experience = NAV_ITEMS[1];
  const projects = NAV_ITEMS[2];
  const contact = NAV_ITEMS[4];
  const resume = NAV_ITEMS[5];

  if (pathname === "/") {
    return [projects, experience, contact];
  }

  if (pathname.startsWith("/projects")) {
    return [home, experience, contact];
  }

  if (pathname.startsWith("/experience")) {
    return [home, projects, contact];
  }

  if (pathname.startsWith("/skills")) {
    return [home, projects, contact];
  }

  if (pathname.startsWith("/contact")) {
    return [home, projects, resume];
  }

  if (pathname.startsWith("/resume")) {
    return [home, projects, contact];
  }

  return [home, projects, contact];
}

/**
 * Helper to determine whether a nav link is currently active.
 */
export function isActiveRoute(currentPath: string, targetHref: string): boolean {
  if (targetHref === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(targetHref);
}
