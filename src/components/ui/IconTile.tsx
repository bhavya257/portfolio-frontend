"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { triggerTick } from "@/lib/haptics";
import type { TileColor } from "@/lib/site";

export interface IconTileProps {
  icon: LucideIcon;
  color?: TileColor;
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

const COLOR_VARIANTS: Record<TileColor, string> = {
  purple: "bg-purple text-black",
  orange: "bg-orange text-black",
  green: "bg-green text-black",
  blue: "bg-blue text-black",
  yellow: "bg-yellow text-black",
  lime: "bg-lime text-black",
};

const SIZE_VARIANTS = {
  sm: {
    container: "w-9 h-9 rounded-lg",
    iconSize: 20,
    strokeWidth: 2.5,
  },
  md: {
    container: "w-11 h-11 rounded-xl",
    iconSize: 24,
    strokeWidth: 2.75,
  },
  lg: {
    container: "w-[54px] h-[54px] rounded-2xl",
    iconSize: 30,
    strokeWidth: 3,
  },
} as const;

export function IconTile({
  icon: IconComponent,
  color = "lime",
  size = "md",
  isActive = false,
  interactive = false,
  onClick,
  className,
  "aria-hidden": ariaHidden = true,
}: IconTileProps) {
  const isClickable = interactive || Boolean(onClick);
  const sizeConfig = SIZE_VARIANTS[size];

  const handleClick = onClick
    ? () => {
        triggerTick();
        onClick();
      }
    : undefined;

  return (
    <motion.div
      aria-hidden={ariaHidden}
      onClick={handleClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      whileHover={isClickable ? { scale: 1.06, filter: "brightness(1.12)" } : undefined}
      whileTap={isClickable ? { scale: 0.92, filter: "brightness(0.9)" } : undefined}
      transition={{ duration: 0.09, ease: [0.2, 0, 0, 1] }}
      onKeyDown={
        isClickable && onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                triggerTick();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "inline-flex items-center justify-center shrink-0 select-none",
        sizeConfig.container,
        COLOR_VARIANTS[color],
        isClickable &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-black)]",
        isActive &&
          "ring-2 ring-white ring-offset-2 ring-offset-[var(--color-black)] scale-105 brightness-110",
        className
      )}
    >
      <IconComponent
        size={sizeConfig.iconSize}
        strokeWidth={sizeConfig.strokeWidth}
      />
    </motion.div>
  );
}
