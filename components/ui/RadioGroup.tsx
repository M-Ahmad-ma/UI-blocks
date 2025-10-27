"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={cn(
                "w-full flex items-start gap-3 rounded-lg border p-4 text-left transition",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50",
              )}
            >
              <span
                className={cn(
                  "mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border",
                  selected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground",
                )}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-background" />
                )}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-sm text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
