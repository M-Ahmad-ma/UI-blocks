"use client";
import { useEffect, useRef, Prism } from "@/lib/utils/imports";

export default function CodeBlock({ code }: { code: string }) {
  const codeRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numRef.current) return;

    numRef.current.innerHTML = "";

    const lines = code.split("\n").length;

    for (let i = 0; i < lines; i++) {
      const lineNumber = document.createElement("div");
      lineNumber.className =
        "h-6 flex items-center justify-end pr-3 text-xs select-none text-muted-foreground";
      lineNumber.textContent = String(i + 1);

      numRef.current.appendChild(lineNumber);
    }

    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-accent/30">
      <div className="flex h-full overflow-y-auto no-scrollbar font-mono text-sm">
        <div
          ref={numRef}
          className="sticky left-0 flex-shrink-0 w-10 border-r border-border bg-background/40 py-2"
        />

        <pre className="flex-1 overflow-x-auto py-2 pl-4 pr-6">
          <code ref={codeRef} className="language-tsx block leading-6">
            {code.trim()}
          </code>
        </pre>

      </div>
    </div>
  );
}
