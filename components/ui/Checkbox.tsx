"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "ghost" | "accent";

export interface CustomCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  checkSize?: Size;
  variant?: Variant;
  indeterminate?: boolean;
  containerClassName?: string;
  boxClassName?: string;
  iconClassName?: string;
}
const sizeMap: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const variantMap: Record<Variant, string> = {
  default:
    "bg-white border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
  ghost:
    "bg-transparent border-gray-400 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400",
  accent:
    "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
};

const Checkbox = forwardRef<HTMLInputElement, CustomCheckboxProps>(
  (
    {
      label,
      className = "",
      containerClassName = "",
      boxClassName = "",
      iconClassName = "",
      checkSize = "md",
      variant = "default",
      indeterminate = false,
      disabled = false,
      children,
      ...rest
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement | null>(null);

    // ✅ Sync forwarded ref
    useEffect(() => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(internalRef.current);
      } else {
        ref.current = internalRef.current;
      }
    }, [ref]);

    // ✅ Set indeterminate state on mount/update
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const sizeCls = sizeMap[checkSize];
    const variantCls = variantMap[variant];

    return (
      <label
        className={`flex items-center gap-2 select-none ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        } ${containerClassName} ${className}`}
      >
        <span
          className={`relative inline-flex items-center justify-center rounded-md border ${sizeCls} ${
            variant === "accent" ? "text-white" : "text-gray-900"
          } ${variantCls} transition-colors duration-150 ${boxClassName}`}
          aria-hidden
        >
          <input
            ref={internalRef}
            type="checkbox"
            className="absolute inset-0 opacity-0 m-0 w-full h-full peer"
            disabled={disabled}
            {...rest}
          />

          {indeterminate ? (
            <Minus className={`w-3/4 h-3/4 stroke-[3] ${iconClassName}`} />
          ) : (
            <Check
              className={`w-3/4 h-3/4 stroke-[3] hidden peer-checked:block ${iconClassName}`}
            />
          )}
        </span>

        {label ? (
          <span className="text-sm leading-none">{label}</span>
        ) : (
          (children ?? null)
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
