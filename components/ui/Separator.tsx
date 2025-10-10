
import React from "react";
import { cn } from "@/lib/utils/cn";

type Orientation = "horizontal" | "vertical";
type Variant = "default" | "muted" | "accent" | "transparent";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: Orientation;
  thickness?: number | string; // number => px
  variant?: Variant;
  color?: string; // inline CSS color overrides variant
  decorative?: boolean;
  className?: string;
}

/**
 * Separator: simple, accessible line used to separate UI regions.
 * - Horizontal uses <hr> (semantic)
 * - Vertical uses <div role="separator" aria-orientation="vertical">
 */
export const Separator = React.forwardRef<
  HTMLHRElement | HTMLDivElement,
  SeparatorProps
>(function Separator(
  {
    orientation = "horizontal",
    thickness = 1,
    variant = "muted",
    color,
    decorative = false,
    className,
    style,
    ...rest
  },
  ref
) {
  // Tailwind-friendly default classes for variants (works with dark mode)
  const variantClass: Record<Variant, string> = {
    default: "bg-gray-200 dark:bg-gray-700",
    muted: "bg-gray-100 dark:bg-gray-800",
    accent: "bg-indigo-500",
    transparent: "bg-transparent",
  };

  const sizeValue = typeof thickness === "number" ? `${thickness}px` : thickness;
  const useVariantClass = !color; // only apply variant class when color prop isn't used

  if (orientation === "vertical") {
    // Vertical: caller should normally set a height (e.g. h-6 or h-full)
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        aria-hidden={decorative ? true : undefined}
        style={{
          width: sizeValue,
          minWidth: sizeValue,
          background: color ?? undefined,
          ...style,
        }}
        className={cn(
          "inline-block align-stretch flex-shrink-0",
          useVariantClass && variantClass[variant],
          className
        )}
        {...rest}
      />
    );
  }

  // Horizontal: use semantic <hr>
  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      role={decorative ? undefined : "separator"}
      aria-orientation="horizontal"
      aria-hidden={decorative ? true : undefined}
      style={{
        height: sizeValue,
        border: "none",
        background: color ?? undefined,
        margin: 0,
        ...style,
      }}
      className={cn(
        "w-full",
        useVariantClass && variantClass[variant],
        className
      )}
      {...rest}
    />
  );
});

export default Separator;

