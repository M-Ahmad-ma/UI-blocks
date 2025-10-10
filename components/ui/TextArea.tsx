"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: string
  helperText?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, success, helperText, disabled, id, ...props }, ref) => {
    const textAreaId = id || React.useId()

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textAreaId}
            className="text-sm font-medium text-primary-foreground"
          >
            {label}
          </label>
        )}

        <textarea
          id={textAreaId}
          ref={ref}
          disabled={disabled}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border bg-input px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",

            error &&
              "border-destructive focus-visible:ring-destructive text-destructive",
            success &&
              "border-green-500 focus-visible:ring-green-500 text-foreground",
            !error &&
              !success &&
              "border-input focus-visible:ring-ring text-foreground",

            className
          )}
          {...props}
        />

        {(error || success || helperText) && (
          <p
            className={cn(
              "text-xs",
              error && "text-destructive",
              success && "text-green-600",
              !error && !success && "text-muted-foreground"
            )}
          >
            {error || success || helperText}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = "TextArea"

export { TextArea }

