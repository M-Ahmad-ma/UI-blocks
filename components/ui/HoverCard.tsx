"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface HoverCardCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const HoverCardContext = createContext<HoverCardCtx | null>(null);

function useHoverCard() {
  const ctx = useContext(HoverCardContext);
  if (!ctx) throw new Error("HoverCard.* must be used inside <HoverCard>");
  return ctx;
}

interface HoverCardProps {
  children: React.ReactNode;
}

export function HoverCard({ children }: HoverCardProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <HoverCardContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </HoverCardContext.Provider>
  );
}

interface TriggerProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
}

function Trigger({
  children,
  openDelay = 150,
  closeDelay = 150,
}: TriggerProps) {
  const { setOpen, triggerRef } = useHoverCard();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), openDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </div>
  );
}

interface ContentProps {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

function Content({
  children,
  className,
  side = "bottom",
  align = "center",
}: ContentProps) {
  const { open, triggerRef } = useHoverCard();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    let top = 0;
    let left = 0;

    if (side === "top") top = rect.top - 8;
    if (side === "bottom") top = rect.bottom + 8;
    if (side === "left") top = rect.top + rect.height / 2;
    if (side === "right") top = rect.top + rect.height / 2;

    if (side === "top" || side === "bottom") {
      if (align === "start") left = rect.left;
      if (align === "center") left = rect.left + rect.width / 2;
      if (align === "end") left = rect.right;
    }

    if (side === "left") left = rect.left - 8;
    if (side === "right") left = rect.right + 8;

    setPosition({ top, left });
  }, [open, side, align, triggerRef]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed z-50 rounded-lg border-border bg-primary-foreground shadow-md p-4 text-sm",
            className,
          )}
          style={{
            top: position.top,
            left: position.left,
            transform:
              side === "top" || side === "bottom"
                ? "translateX(-50%)"
                : "translateY(-50%)",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

HoverCard.Trigger = Trigger;
HoverCard.Content = Content;

export default HoverCard;
