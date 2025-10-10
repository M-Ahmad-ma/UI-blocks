"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils/cn"

// ------------------ Root Command ------------------
interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}
const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="command"
      className={cn(
        "bg-muted text-primary flex h-full w-full flex-col overflow-hidden rounded-md shadow",
        className
      )}
      {...props}
    />
  )
)
Command.displayName = "Command"   

// ------------------ Command Input ------------------
interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}
const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div data-slot="command-input-wrapper" className="flex h-10 items-center gap-2 border-b px-3">
      <SearchIcon className="h-5 w-5 opacity-50" />
      <input
        ref={ref}
        data-slot="command-input"
        className={cn(
          "flex-1 bg-transparent text-sm placeholder-gray-500 outline-none py-2",
          className
        )}
        {...props}
      />
    </div>
  )
)
CommandInput.displayName = "CommandInput"

// ------------------ Command List ------------------
interface CommandListProps extends React.HTMLAttributes<HTMLUListElement> {}
const CommandList = React.forwardRef<HTMLUListElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="command-list"
      className={cn("h-full overflow-y-auto scroll-py-1", className)}
      {...props}
    />
  )
)
CommandList.displayName = "CommandList"

// ------------------ Command Empty ------------------
const CommandEmpty: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div data-slot="command-empty" className="py-6 text-center text-sm text-gray-500" {...props} />
)

// ------------------ Command Group ------------------
interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-gray-500",
        className
      )}
      {...props}
    />
  )
)
CommandGroup.displayName = "CommandGroup"

// ------------------ Command Item ------------------
interface CommandItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  selected?: boolean
}
const CommandItem = React.forwardRef<HTMLLIElement, CommandItemProps>(
  ({ className, selected, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="command-item"
      className={cn(
        "flex cursor-default items-center gap-2 px-2 py-1.5 text-sm rounded-sm select-none",
        selected ? "bg-blue-500 text-white" : "hover:bg-muted-foreground",
        className
      )}
      {...props}
    />
  )
)
CommandItem.displayName = "CommandItem"

// ------------------ Command Shortcut ------------------
const CommandShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) => (
  <span data-slot="command-shortcut" className={cn("ml-auto text-xs text-gray-400", className)} {...props} />
)

// ------------------ Command Separator ------------------
const CommandSeparator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => (
  <hr data-slot="command-separator" className={cn("bg-gray-200 -mx-1 h-px", className)} {...props} />
)

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
