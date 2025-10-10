"use client";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children: React.ReactNode;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-[rgb(0.269 0 0)] relative w-full", className)}
        style={{ paddingTop: `${100 / ratio}%` }}
        {...props}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
