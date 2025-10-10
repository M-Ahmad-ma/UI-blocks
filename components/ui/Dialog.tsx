"use client"

import React, { createContext, useContext, useState } from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface DialogContextValue {
  open: boolean
  setOpen: (v: boolean) => void
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error("Dialog components must be used within <Dialog>")
  return ctx
}

export function Dialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export function DialogTrigger({
  asChild,
  children,
}: {
  asChild?: boolean
  children: React.ReactNode
}) {
  const { setOpen } = useDialogContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: any) => {
        children.props?.onClick?.(e)
        setOpen(true)
      },
    })
  }

  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  )
}

export function DialogOverlay({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/50 animate-in fade-in-0",
        className
      )}
    />
  )
}

export function DialogContent({
  children,
  className,
  showCloseButton = true,
}: {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
}) {
  const { open, setOpen } = useDialogContext()
  if (!open) return null

  return (
    <>
      <DialogOverlay />
      <div
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border-border bg-card p-6 shadow-lg",
          className
        )}
      >
        {children}
        {showCloseButton && (
          <DialogClose className="absolute top-4 right-4" asChild={false}>
            <XIcon className="h-4 w-4" />
          </DialogClose>
        )}
      </div>
    </>
  )
}

export function DialogClose({
  asChild,
  children,
  className,
  ...props
}: {
  asChild?: boolean
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialogContext()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...props,
      onClick: (e: any) => {
        children.props?.onClick?.(e)
        setOpen(false)
      },
    })
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      className={cn(
        "rounded-md p-1 opacity-70 hover:opacity-100 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
  )
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none", className)} {...props} />
  )
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}
