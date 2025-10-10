
"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  
  size?: "sm" | "md" | "lg" | "full";
  
  panelClassName?: string;
  
  overlayClassName?: string;
 
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
  id?: string;
}

export function Drawer({
  open,
  onOpenChange,
  size = "md",
  panelClassName,
  overlayClassName,
  closeOnOverlayClick = true,
  children,
  id,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        panelRef.current?.focus();
      }, 50);
    } else {
      lastActiveRef.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const portalRoot =
    typeof window !== "undefined" ? document.getElementById("__next") ?? document.body : null;
  if (!portalRoot) return null;

  const sizeClasses: Record<NonNullable<DrawerProps["size"]>, string> = {
    sm: "h-48",
    md: "h-80",
    lg: "h-[32rem]",
    full: "h-full",
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <motion.div
            className={cn("absolute inset-0 bg-black/50", overlayClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => closeOnOverlayClick && onOpenChange(false)}
            style={{ pointerEvents: "auto" }}
          />

          <motion.div
            ref={panelRef}
            id={id}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className={cn(
              "absolute bottom-0 left-0 w-full bg-primary-foreground dark:bg-primary-foreground rounded-t-xl shadow-lg outline-none flex flex-col",
              sizeClasses[size],
              panelClassName
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ pointerEvents: "auto" }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
              <button
                aria-label="Close drawer"
                onClick={() => onOpenChange(false)}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
}

export default Drawer;
