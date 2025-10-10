"use client";
import React from "react";
import Drawer from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button"

export default function DrawerExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-8">
      <Button
        variant='default'
        onClick={() => setOpen(true)}
      >
        Open Drawer
      </Button>

      <Drawer open={open} onOpenChange={setOpen} size='lg'>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Drawer Content</h2>
          <p className="text-sm text-gray-600">
            This drawer slides up from the bottom. Add any content here.
          </p>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Input inside drawer"
          />
          <Button variant='default'>
            Save
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
