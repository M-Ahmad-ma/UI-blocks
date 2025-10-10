
"use client";

import React, { useState } from "react";
import Slider from "@/components/ui/Slider";

export default function SliderExample() {
  const [val, setVal] = useState(40);

  return (
    <div className="p-6 space-y-4 max-w-md">
      <Slider min={0} max={100} value={val} className="w-96" onValueChange={setVal} />
      <p className="text-sm text-gray-400">Value: {val}</p>
    </div>
  );
}

