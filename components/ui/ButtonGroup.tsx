"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils/cn";
import { Separator } from "../ui/Separator";


const buttonGroupVariants = cva(
  "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

export function ButtonGroup({
  className,
  orientation,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"   
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}   
    >
      {children}
    </div>
  );
}

interface ButtonGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export function ButtonGroupText({
  className,
  asChild = false,
  children,
  ...props
}: ButtonGroupTextProps) {
  const Comp = asChild ? React.Fragment : "div"; // can render as child if needed

  return (
    <Comp {...props} className={cn(
      "bg-muted flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
      className
    )}>
      {children}
    </Comp>
  );
}

interface ButtonGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <div
      data-slot="button-group-separator"
      className={cn(
        "bg-input relative !m-0 self-stretch",
        orientation === "vertical" ? "h-auto w-px" : "h-px w-auto",
        className
      )}
      {...props}
    />
  );
}
