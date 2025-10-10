"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "text-xs gap-1",
  md: "text-sm gap-2",
  lg: "text-base gap-3",
}

function Label({
  className,
  disabled = false,
  size = "md",
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "flex items-center font-medium leading-none select-none",
        sizeClasses[size],
        disabled &&
          "cursor-not-allowed opacity-50 pointer-events-none",
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </label>
  )
}

export { Label }
