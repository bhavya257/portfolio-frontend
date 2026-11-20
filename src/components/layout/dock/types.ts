import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * Priority layers for dock signals.
 * Higher priority signals override lower priority signals until cleared.
 */
export const DOCK_PRIORITY = {
  BASE: 0,
  PAGE: 10,
  MENU: 20,
  MODAL: 30,
} as const;

export type DockHapticType = "tick" | "snap" | false;

export interface DockButtonControl {
  type?: "button";
  id: string;
  label: string;
  icon?: LucideIcon | ReactNode;
  variant?: "solid" | "outline" | "ghost" | "plain";
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  href?: string;
  haptic?: DockHapticType;
  payload?: unknown;
}

export interface DockStatusControl {
  type: "status";
  id: string;
  label: string;
  className?: string;
}

export interface DockCustomControl {
  type: "custom";
  id: string;
  render: () => ReactNode;
}

export type DockItem =
  | DockButtonControl
  | DockStatusControl
  | DockCustomControl;

export interface DockOptions {
  hidden?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface DockSignal {
  mode: string;
  items: DockItem[];
  options?: DockOptions;
  onAction?: (actionId: string, payload?: unknown) => void;
}

export interface DockProps {
  className?: string;
}
