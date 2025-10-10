"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  shimmer?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, circle = false, shimmer = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-accent ",
          shimmer && "animate-pulse",
          circle && "rounded-full",
          !circle && "rounded-md",
          className
        )}
        style={{
          width,
          height,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
