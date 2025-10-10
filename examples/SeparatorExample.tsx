
"use client";

import React from "react";
import Separator from "@/components/ui/Separator";

export default function SeparatorExample() {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold">Section A</h3>
        <p className="text-sm text-gray-600">Some content above the separator.</p>
      </div>

      {/* Default horizontal separator (thin, muted) */}
      <Separator />

      <div>
        <h3 className="text-lg font-semibold">Section B</h3>
        <p className="text-sm text-gray-600">Content below the default separator.</p>
      </div>

      {/* Thicker accent separator */}
      <div className="pt-4">
        <p>Before an accent separator</p>
        <Separator
          thickness={2}
          variant="accent"
          className="my-4 rounded"
          style={{ maxWidth: "75%" }}
        />
        <p>After the accent separator</p>
      </div>

      {/* Vertical separator inside a horizontal list */}
      <div className="flex items-center gap-4 border p-4">
        <div>Left item</div>
        {/* Note: give the separator a height (h-8) to be visible */}
        <Separator orientation="vertical" thickness={2} className="mx-2 h-8" />
        <div>Right item</div>
      </div>

      {/* Transparent as spacing (no visible line but occupies thickness) */}
      <div>
        <p>Top</p>
        {/* Transparent is useful when you want to preserve spacing but not draw a line */}
        <Separator variant="transparent" thickness={8} className="my-2" />
        <p>Bottom</p>
      </div>

      {/* Decorative (hidden from screen readers) */}
      <div>
        <p>Visual-only rule (decorative)</p>
        <Separator decorative className="my-3" />
        <p>Still accessible content after</p>
      </div>
    </div>
  );
}

