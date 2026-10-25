"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { triggerTick } from "@/lib/haptics";

export const buttonVariants = cva(
  "group relative overflow-hidden inline-flex items-center justify-center select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-black)] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        outline: "border border-white/40 bg-transparent text-white",
        plain: "border border-transparent bg-transparent text-white",
        solid: "border border-white bg-white text-black",
        ghost: "border border-transparent bg-transparent text-white hover:bg-white/10",
      },
      size: {
        sm: "h-9 px-2.5 gap-1.5 rounded-lg",
        md: "h-11 px-3.5 gap-2 rounded-xl",
        lg: "h-13 px-5 gap-2.5 rounded-2xl",
        iconSm: "h-9 w-9 p-0 rounded-lg",
        icon: "h-11 w-11 p-0 rounded-xl",
        iconLg: "h-13 w-13 p-0 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  haptic?: boolean;
  isActive?: boolean;
  sweep?: boolean;
  sweepClassName?: string;
  iconStart?: LucideIcon;
  iconEnd?: LucideIcon;
  children?: React.ReactNode;
}

export function Button({
  className,
  variant = "outline",
  size = "md",
  asChild = false,
  haptic = true,
  isActive = false,
  sweep,
  sweepClassName,
  iconStart: IconStart,
  iconEnd: IconEnd,
  onClick,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (haptic) {
      triggerTick();
    }
    onClick?.(e);
  };

  const isIconOnly = size === "icon" || size === "iconSm" || size === "iconLg";
  const iconSize =
    size === "iconSm" || size === "sm"
      ? 18
      : size === "iconLg" || size === "lg"
        ? 26
        : 22;

  const shouldSweep = sweep ?? (variant === "outline" || variant === "plain" || variant === "solid");
  const defaultSweepColor = variant === "solid" ? "bg-black" : "bg-white";
  const defaultHoverText = variant === "solid" ? "group-hover:text-white" : "group-hover:text-black";

  if (asChild) {
    return (
      <Slot
        className={cn(
          buttonVariants({ variant, size, className }),
          isActive && "ring-2 ring-white ring-offset-2 ring-offset-[var(--color-black)] scale-105 brightness-110"
        )}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        {...(props as unknown as React.ComponentPropsWithoutRef<typeof Slot>)}
      >
        {children}
      </Slot>
    );
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      whileHover={!disabled ? { scale: 1.04 } : undefined}
      whileTap={!disabled ? { scale: 0.92, filter: "brightness(0.75)" } : undefined}
      transition={{ duration: 0.09, ease: [0.2, 0, 0, 1] }}
      className={cn(
        buttonVariants({ variant, size, className }),
        isActive && "ring-2 ring-white ring-offset-2 ring-offset-[var(--color-black)] scale-105 brightness-110"
      )}
      {...props}
    >
      {/* Wipe fill from left to right on hover for sweep variants */}
      {shouldSweep && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-200 ease-[var(--ease-out-quick)] group-hover:scale-x-100",
            sweepClassName || defaultSweepColor
          )}
        />
      )}

      {/* Button content inverting on hover */}
      <span
        className={cn(
          "relative z-10 inline-flex items-center justify-center gap-inherit transition-colors duration-150",
          shouldSweep && defaultHoverText,
          isIconOnly ? "" : "gap-2"
        )}
      >
        {IconStart && (
          <IconStart
            size={iconSize}
            strokeWidth={2.5}
            aria-hidden="true"
            className="shrink-0"
          />
        )}
        {children && <u>{children}</u>}
        {IconEnd && (
          <IconEnd
            size={iconSize}
            strokeWidth={2.5}
            aria-hidden="true"
            className="shrink-0"
          />
        )}
      </span>
    </motion.button>
  );
}
