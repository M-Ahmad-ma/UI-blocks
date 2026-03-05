"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { cn } from "../../lib/utils/cn"
import { Button } from "./Button"

type DropdownContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const DropdownContext = React.createContext<DropdownContextProps | null>(null)

function useDropdown() {
  const ctx = React.useContext(DropdownContext)
  if (!ctx) throw new Error("Dropdown components must be inside <Dropdown>")
  return ctx
}

export const Dropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  ) 
}

export const DropdownTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {varient?: "default" | "secondary" | "ghost" | "destructive" | "link" | "outline"}>  = ({ children, varient, ...props }) => {
  const { open, setOpen } = useDropdown()
  return (  
    <Button
      {...props}   
      variant={varient}   
      onClick={() => setOpen(!open)}
      className={cn(props.className)}
    >
      {children}
    </Button>
  )
}

export const DropdownContent: React.FC<
  React.HTMLProps<HTMLDivElement> & { align?: "left" | "right" | "center" | "end" | "start" }
> = ({ children, align = "left", className, ...props }) => {
  const { open } = useDropdown();
  if (!open) return null;

  return (
    <div
      {...props} // don't spread `align` here
      className={cn(
        "absolute z-[999px] mt-1 w-56 rounded-md border dark:border-input bg-popover text-popover-foreground shadow-lg p-1",
        align === "center" && "left-1/2 transform -translate-x-1/2",
        align === "start" && "left-0",
        align === "end" && "right-0",
        className
      )}
    >
      {children}  
    </div>
  );
};


export const DropdownGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-1">{children}</div>
)

export const DropdownLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold text-popover-foreground", className)}>{children}</div>
)

export const DropdownSeparator: React.FC = () => <div className="my-1 h-px bg-gray-200" />

export const DropdownItem: React.FC<
  React.HTMLProps<HTMLDivElement> & { inset?: boolean; variant?: "default" | "destructive"; onSelect?: () => void }
> = ({ children, inset, variant = "default", onSelect, className, ...props }) => {
  return (
    <div
      {...props}
      onClick={onSelect}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground hover:bg-accent flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded",
        inset && "pl-8",
        className
      )}
    >
      {children}
    </div>
  )
}     

export const DropdownCheckboxItem: React.FC<
  React.HTMLProps<HTMLDivElement> & { 
    checked: boolean
    onCheckedChange: (checked: boolean) => void
  }
> = ({ checked, onCheckedChange, children, className, ...props }) => {
  return (
    <DropdownItem
      {...props}
      onSelect={() => onCheckedChange(!checked)}
      className={cn("flex items-center gap-2", className)}
    >
      {checked && <CheckIcon className="w-4 h-4" />}
      {children}
    </DropdownItem>
  )
}

export const DropdownRadioGroup: React.FC<{ value: string; onChange: (val: string) => void; children: React.ReactNode }> = ({
  value,
  onChange,
  children,
}) => {
  return <div className="flex flex-col">{React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<{ selectedValue?: string; onSelect?: (val: string) => void }>, { selectedValue: value, onSelect: onChange });
    }
    return child;
  })}</div>;
}

export const DropdownRadioItem: React.FC<
  React.HTMLProps<HTMLDivElement> & { value: string; selectedValue?: string; onSelect?: (val: string) => void }
> = ({ value, selectedValue, onSelect, children, className, ...props }) => {
  const selected = value === selectedValue
  return (
    <DropdownItem
      {...props}
      onSelect={() => onSelect?.(value)}
      className={cn("flex items-center gap-2", className)}
    >
      {selected && <CircleIcon className="w-3 h-3 fill-current" />}
      {children}
    </DropdownItem>
  )
}

export const DropdownSub: React.FC<{ children: React.ReactElement<DropdownContextProps>[] }> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="relative group">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { open, setOpen }) : child
      )}
    </div>
  )
}

export const DropdownSubTrigger: React.FC<
  React.HTMLProps<HTMLDivElement> & { children: React.ReactNode; open?: boolean; setOpen?: (open: boolean) => void }
> = ({ children, open, setOpen, className, ...props }) => { 
  return (
    <div
      {...props}
      className={cn("flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent cursor-pointer", className)}
      onMouseEnter={() => setOpen?.(true)} 
      onClick={() => setOpen?.(false)} 
    >
      {children} <ChevronRightIcon className="w-4 h-4 ml-2" />
    </div>
  )
}

export const DropdownSubContent: React.FC<React.HTMLProps<HTMLDivElement> & { open?: boolean }> = ({ children, open, className, ...props }) => {
  if (!open) return null
  return (
    <div
      {...props}
      className={cn("absolute top-0 left-full mt-0 ml-1 w-48 rounded-md border bg-popover dark:border-input shadow-lg p-1", className)}
    >
      {children}
    </div>
  )
}
