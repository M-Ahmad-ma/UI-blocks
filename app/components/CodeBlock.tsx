
"use client";
import {
  useEffect,
  useRef,
  Prism
} from "@/lib/utils/imports";
export default function CodeBlock({ code }: { code: string }) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="rounded-2xl !bg-accent/30 !bg-accent overflow-y-scroll no-scrollbar h-full w-full">
      <pre className="language-tsx">
        <code ref={codeRef} className="language-tsx">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
}

