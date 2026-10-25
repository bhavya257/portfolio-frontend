import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Code2,
  FileText,
  Home,
  Mail,
  Wrench,
} from "lucide-react";

export type TileColor =
  | "purple"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "lime";

export interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly icon: LucideIcon;
  readonly accentColor: TileColor;
  readonly textClass: string;
  readonly tileClass: string;
  readonly sweepClass: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    accentColor: "purple",
    textClass: "text-purple",
    tileClass: "bg-purple text-black border-transparent",
    sweepClass: "bg-purple",
  },
  {
    title: "Experience",
    href: "/experience",
    icon: Briefcase,
    accentColor: "orange",
    textClass: "text-orange",
    tileClass: "bg-orange text-black border-transparent",
    sweepClass: "bg-orange",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Code2,
    accentColor: "green",
    textClass: "text-green",
    tileClass: "bg-green text-black border-transparent",
    sweepClass: "bg-green",
  },
  {
    title: "Skills",
    href: "/skills",
    icon: Wrench,
    accentColor: "blue",
    textClass: "text-blue",
    tileClass: "bg-blue text-black border-transparent",
    sweepClass: "bg-blue",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    accentColor: "yellow",
    textClass: "text-yellow",
    tileClass: "bg-yellow text-black border-transparent",
    sweepClass: "bg-yellow",
  },
  {
    title: "Resume",
    href: "/resume",
    icon: FileText,
    accentColor: "lime",
    textClass: "text-lime",
    tileClass: "bg-lime text-black border-transparent",
    sweepClass: "bg-lime",
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
  const skills = NAV_ITEMS[3];
  const contact = NAV_ITEMS[4];
  const resume = NAV_ITEMS[5];

  if (pathname === "/") {
    return [experience, projects, contact];
  }

  if (pathname.startsWith("/experience")) {
    return [home, projects, contact];
  }

  if (pathname.startsWith("/projects")) {
    return [home, skills, contact];
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

  return [experience, projects, contact];
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
