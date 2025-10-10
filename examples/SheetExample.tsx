"use client";
import React from "react";
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Sheet, { SheetHeader, SheetFooter } from "@/components/ui/Sheet";

export default function SheetExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-8">
      <Button
        variant='default'
        onClick={() => setOpen(true)}
      >
        Open Sheet
      </Button>

      <Sheet open={open} onOpenChange={setOpen} position="right" size="md">
        <SheetHeader>
          <div>
            <h3 className="text-lg font-semibold">Panel title</h3>
            <p className="text-sm text-muted-foreground">Short description</p>
          </div>
        </SheetHeader>

        <div className="space-y-4">
          <p>
            This is the sheet content. Add forms, settings, or any controls here.
          </p>
          <Input  placeholder="Input inside sheet" />
          <Button variant="default">Primary action</Button>
        </div>

        <SheetFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="default">Save</Button>
          </div>
        </SheetFooter>
      </Sheet>
    </div>
  );
}
