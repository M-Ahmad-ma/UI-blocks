"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface AccordionItemProps {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItemProps[]
  defaultOpenId?: string
  className?: string
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(defaultOpenId ?? null)

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className={cn("w-full divide-y divide-gray-200 rounded-lg", className)}>
      {items.map(item => {
        const isOpen = item.id === openId
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:underline">
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden px-4"
                >
                  <div className="py-2 text-sm text-muted-foreground">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}


