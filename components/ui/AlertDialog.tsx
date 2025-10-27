"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

interface AlertDialogCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const AlertDialogContext = React.createContext<AlertDialogCtx | null>(null);

function useAlertDialog() {
  const ctx = React.useContext(AlertDialogContext);
  if (!ctx)
    throw new Error("AlertDialog components must be used inside <AlertDialog>");
  return ctx;
}

export function AlertDialog({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(controlledOpen ?? false);
  const isControlled = controlledOpen !== undefined;
  const actualOpen = isControlled ? controlledOpen : open;

  const setDialogOpen = (value: boolean) => {
    if (!isControlled) setOpen(value);
    onOpenChange?.(value);
  };

  return (
    <AlertDialogContext.Provider
      value={{ open: actualOpen, setOpen: setDialogOpen }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  const { setOpen } = useAlertDialog();

  if (asChild && React.isValidElement(children)) {
    // ✅ Strongly typed handling for child element
    type ChildElement = React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
    }>;

    const child = children as ChildElement;
    const existingOnClick = child.props.onClick;

    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        existingOnClick?.(e);
        setOpen(true);
      },
    });
  }

  return <Button onClick={() => setOpen(true)}>{children}</Button>;
}

export function AlertDialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useAlertDialog();
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === overlayRef.current) setOpen(false);
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl p-6 w-full max-w-md bg-primary-foreground text-primary",
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl text-primary font-semibold">{children}</h2>;
}

export function AlertDialogDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex justify-end space-x-2">{children}</div>;
}

export function AlertDialogAction({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      {...props}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </Button>
  );
}

export function AlertDialogCancel({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { setOpen } = useAlertDialog();
  return (
    <Button {...props} onClick={() => setOpen(false)}>
      {children}
    </Button>
  );
}
