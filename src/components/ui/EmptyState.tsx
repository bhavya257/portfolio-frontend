import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps extends React.ComponentProps<"div"> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4 gap-3 select-none",
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          size={36}
          strokeWidth={2}
          aria-hidden="true"
          className="opacity-40 mb-1"
        />
      )}
      <h3>{title}</h3>
      {description && (
        <p className="max-w-sm opacity-60">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
