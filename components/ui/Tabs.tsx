"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { cn } from "../../lib/utils/cn"

type TabsContextType = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextType | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error("Tabs.* must be used inside <Tabs>")
  return ctx
}


export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (v: string) => void
  className?: string
  children: ReactNode
}) {
  const [internal, setInternal] = useState(defaultValue || "")

  const value = controlledValue ?? internal
  const setValue = (v: string) => {
    if (!controlledValue) setInternal(v)
    onValueChange?.(v)
  }

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("flex flex-col gap-2", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

// --------------------------------------------------------------
// Tabs List
// --------------------------------------------------------------
export function TabsList({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
    >
      {children}
    </div>
  )
}

// --------------------------------------------------------------
// Tabs Trigger
// --------------------------------------------------------------
export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: ReactNode
}) {
  const { value: active, setValue } = useTabs()

  const isActive = active === value

  return (
    <button
      onClick={() => setValue(value)}
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        isActive &&
          "bg-background dark:text-foreground shadow-sm dark:bg-input/30 dark:border-input",
        className
      )}
    >
      {children}
    </button>
  )
}

// --------------------------------------------------------------
// Tabs Content
// --------------------------------------------------------------
export function TabsContent({
  value,
  className,
  children,
}: {
  value: string
  className?: string    
  children: ReactNode
}) {
  const { value: active } = useTabs()

  if (active !== value) return null

  return (
    <div className={cn("flex-1 outline-none dark:bg-input/30 dark:border-input border-transparent border", className)}>{children}</div>
  )
}
