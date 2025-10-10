"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  arrowClassName?: string;
  toolClassName?: string;
  onClick?: () => void;
};

export default function Tooltip({
  children,
  content,
  position = "top",
  delay = 150,
  className,
  arrowClassName,
  toolClassName,
  onClick,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      switch (position) {
        case "top":
          setCoords({ x: rect.left + rect.width / 2, y: rect.top - 8 });
          break;
        case "bottom":
          setCoords({ x: rect.left + rect.width / 2, y: rect.bottom + 8 });
          break;
        case "left":
          setCoords({ x: rect.left - 8, y: rect.top + rect.height / 2 });
          break;
        case "right":
          setCoords({ x: rect.right + 8, y: rect.top + rect.height / 2 });
          break;
        default:
          setCoords({ x: rect.left + rect.width / 2, y: rect.top - 8 });
      }
    }
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const posClasses: Record<string, string> = {
    top: "translate-x-[-50%] -translate-y-full mb-2",
    bottom: "translate-x-[-50%] mt-2",
    left: "-translate-x-full -translate-y-1/2 mr-2",
    right: "translate-y-[-50%] ml-2",
  };

  return (
    <div
      ref={ref}
      className={cn("inline-flex", toolClassName)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={onClick}
    >
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {visible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "fixed",
                  top: coords.y,
                  left: coords.x,
                }}
                className={cn(
                  "z-50 px-2 py-1 rounded-md text-sm shadow-md bg-primary text-muted",
                  posClasses[position],
                  className
                )}
              >
                {content}
                <div
                  className={cn(
                    "absolute w-2 h-2 bg-primary rotate-45 text-muted",
                    position === "top" && "left-1/2 bottom-[-4px] -translate-x-1/2",
                    position === "bottom" && "left-1/2 top-[-4px] -translate-x-1/2",
                    position === "left" && "right-[-4px] top-1/2 -translate-y-1/2",
                    position === "right" && "left-[-4px] top-1/2 -translate-y-1/2",
                    arrowClassName
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

