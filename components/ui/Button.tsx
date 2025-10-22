
'use client';

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", size = "md", asChild = false, children, ...props },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses =
      variant === "default"
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : variant === "secondary"
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : variant === "ghost"
            ? "bg-transparent hover:bg-accent hover:text-accent-foreground"
            : variant === "destructive"
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : "";

    const sizeClasses =
      size === "sm"
        ? "px-3 py-1 text-sm"
        : size === "lg"
          ? "px-6 py-3 text-lg"
          : "px-4 py-2 text-base";

    const combinedClasses = cn(baseClasses, variantClasses, sizeClasses, className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        className: cn(children.props.className, combinedClasses),
        ref,
        ...props,
      });
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

