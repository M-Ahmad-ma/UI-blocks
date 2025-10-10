import { useState } from "react";

export function toPascalCase(id: string) {
    return id
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

 export function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState((prev) => !prev);
  return { state, toggle, setState };
}

 export function useCopy() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    return { copied, copyToClipboard };
  }