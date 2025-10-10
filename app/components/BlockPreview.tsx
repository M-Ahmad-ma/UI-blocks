"use client";
import React from "react";
import {
  Prism,
  motion,
  CodeBlock
} from "@/lib/utils/imports";
import { cn } from "@/lib/utils/cn"
import {Button} from "@/components/ui/Button"

interface PreviewBlockProps {
  title?: string;
  preview: React.ReactNode;
  code: string;
  className?: string;
}

export function BlockPreview({
  title,
  preview,
  code,
  className,
}: PreviewBlockProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const codeRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (tab === "code" && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, tab]);

  return (
    <div className={cn("rounded-lg bg-transparent", className)}>
      <div className="flex items-center justify-between py-1">
        <div className="flex space-x-2 text-sm">
          <Button
            onClick={() => setTab("preview")}
            variant="ghost"
            className="hover:bg-transparent"
          >
            Preview
          </Button>
          <Button
            onClick={() => setTab("code")}
            variant='ghost'
            className="hover:bg-transparent"
          >
            Code
          </Button>
        </div>
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="border-2 border-code h-[450px] overflow-y-scroll rounded-xl flex items-center justify-center no-scrollbar"
      >
        {tab === "preview" ? (
          <div className="w-[50%] flex justify-center items-center">
            {preview}
          </div>
        ) : (
         <CodeBlock code={code} /> 
        )}
      </motion.div>
    </div>
  );
}

