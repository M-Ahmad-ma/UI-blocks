"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center font-medium leading-none select-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground border border-transparent",
        outline:
          "bg-transparent text-foreground border border-border",
        ghost:
          "bg-transparent text-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-0.5 text-sm gap-1.5",
        lg: "px-3 py-1 text-sm gap-2",
      },
      rounded: {
        md: "rounded-md",
        full: "rounded-full",
      },
      dot: {
        true: "gap-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
      dot: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, rounded, dot, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? "span" : "span"

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded, dot }), className)}
        {...props}
      >
        {dot && (
          <span
            className="h-2 w-2 rounded-full shrink-0 bg-current"
            aria-hidden
          />
        )}
        {children}
      </Comp>
    )
  }
)

Badge.displayName = "Badge"

export { badgeVariants }

