"use client";

import Tooltip from "@/components/ui/Tooltip";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/Button"

export default function TooltipExample() {
  return (
    <div className="flex gap-6 p-10">
      <Tooltip content="This is a top tooltip" className="w-fit">
        <Button>
          Hover me
        </Button>
      </Tooltip>

      <Tooltip content="Right side" position="left">
        <Info className="w-6 h-6" />
      </Tooltip>

      <Tooltip
        content="Custom style"
        position="bottom"
        className="bg-pink-600  w-28 font-semibold"
        arrowClassName="bg-pink-600"
      >
        <span className="cursor-pointer underline">Styled Tooltip</span>
      </Tooltip>
    </div>
  );
}
