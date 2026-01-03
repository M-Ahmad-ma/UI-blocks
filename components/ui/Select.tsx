"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ──────────────────────────────────────────────
   Context
────────────────────────────────────────────── */

type SelectContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  value?: string;
  setValue: (v: string) => void;
};

const SelectContext = React.createContext<SelectContextType | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) {
    throw new Error("Select components must be used inside <Select />");
  }
  return ctx;
}

/* ──────────────────────────────────────────────
   Select (Root)
────────────────────────────────────────────── */

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value);

  const setValue = (v: string) => {
    setInternalValue(v);   
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value: internalValue,
        setValue,
      }}
    >
      <div className="relative w-fit">{children}</div>
    </SelectContext.Provider>
  );
}

/* ──────────────────────────────────────────────
   SelectTrigger
────────────────────────────────────────────── */

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SelectTrigger({
  className,
  children,
  ...props
}: SelectTriggerProps) {
  const { open, setOpen } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <svg
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
          open && "rotate-180"
        )}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.352a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

/* ──────────────────────────────────────────────
   SelectValue
────────────────────────────────────────────── */

interface SelectValueProps {
  placeholder?: string;
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = useSelect();

  return (
    <span
      className={cn(
        "line-clamp-1",
        !value && "text-muted-foreground"
      )}
    >
      {value ?? placeholder}
    </span>
  );
}

/* ──────────────────────────────────────────────
   SelectContent
────────────────────────────────────────────── */

interface SelectContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function SelectContent({
  className,
  children,
  ...props
}: SelectContentProps) {
  const { open, setOpen } = useSelect();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 min-w-full rounded-md border border-input bg-popover p-1 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   SelectItem
────────────────────────────────────────────── */

interface SelectItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function SelectItem({
  value,
  className,
  children,
  ...props
}: SelectItemProps) {
  const { setValue, value: selectedValue } = useSelect();
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => setValue(value)}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm",
        "transition-colors hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {isSelected && <span className="ml-2 text-xs">✓</span>}
    </div>
  );
}
