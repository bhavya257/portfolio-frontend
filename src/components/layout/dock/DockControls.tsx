"use client";

import { Button } from "@/components/ui/Button";
import { triggerSnap, triggerTick } from "@/lib/haptics";
import { cn } from "@/lib/cn";
import type {
  DockItem,
  DockButtonControl,
  DockStatusControl,
} from "./types";

export interface DockButtonProps {
  item: DockButtonControl;
  onAction?: (actionId: string, payload?: unknown) => void;
}

export function DockButton({ item, onAction }: DockButtonProps) {
  const handleClick = () => {
    if (item.disabled) return;

    const haptic = item.haptic ?? "tick";
    if (haptic === "snap") {
      triggerSnap();
    } else if (haptic === "tick") {
      triggerTick();
    }

    onAction?.(item.id, item.payload);
  };

  return (
    <Button
      size="icon"
      variant={item.variant ?? "solid"}
      disabled={item.disabled}
      isActive={item.isActive}
      haptic={false}
      onClick={handleClick}
      aria-label={item.label}
      iconStart={item.icon}
      className={cn("h-11 w-11 shrink-0", item.className)}
      href={item.href}
    />
  );
}

export interface DockStatusProps {
  item: DockStatusControl;
}

export function DockStatus({ item }: DockStatusProps) {
  return (
    <span
      className={cn(
        "text-xs font-semibold text-white/80 px-2 select-none shrink-0",
        item.className
      )}
    >
      {item.label}
    </span>
  );
}

export interface DockControlProps {
  item: DockItem;
  onAction?: (actionId: string, payload?: unknown) => void;
}

export function DockControl({ item, onAction }: DockControlProps) {
  if (item.type === "status") {
    return <DockStatus item={item} />;
  }

  if (item.type === "custom") {
    return <>{item.render()}</>;
  }

  return <DockButton item={item} onAction={onAction} />;
}

