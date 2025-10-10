
"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      value ?? Number(props.defaultValue) ?? 50
    );

    const currentValue = value ?? internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = Number(e.target.value);
      if (value === undefined) setInternalValue(newVal);
      onValueChange?.(newVal);
    };

    return (
      <input
        type="range"
        ref={ref}
        value={currentValue}
        onChange={handleChange}
        className={cn(
          "w-full appearance-none bg-transparent cursor-pointer",
          "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full",
          "[&::-webkit-slider-runnable-track]:bg-gray-800",
          "[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-gray-800",
          "[&::-moz-range-progress]:h-2 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-gray-300",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-100",
          "[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400",
          "[&::-webkit-slider-thumb]:-mt-1 [&::-webkit-slider-thumb]:shadow",
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-gray-100 [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-400",
          "[&::-moz-range-thumb]:shadow",
          className
        )}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export default Slider;

