"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "destructive" | "link" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "",
      size = "md",
      asChild = false,
      children,
      ...props
    },
    ref, 
  ) => {
    const baseClasses =
       "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

    const variantClasses =
      variant === "default"
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : variant === "secondary"
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : variant === "ghost"
            ? "bg-transparent hover:bg-accent hover:text-accent-foreground"
            : variant === "destructive"
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : variant === "link"
                ? "text-primary underline-offset-4 hover:underline"
                : variant === "outline"
                  ? "border bg-accent/30 shadow-xs dark:border-input dark:border-input/30 dark:hover:bg-input/50 hover:text-accent-foreground"
                  : "";

    const sizeClasses =
      size === "sm"
        ? "px-3 py-1 text-sm"
        : size === "lg"
          ? "px-6 py-3 text-lg"
          : "px-4 py-2 text-base";

    const combinedClasses = cn(
      baseClasses,
      variantClasses,
      sizeClasses,
      className,
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;

      return React.cloneElement(child, {
        ...props,
        className: cn(child.props.className, combinedClasses),
      });
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
