import React from "react";
import Checkbox from "@/components/ui/Checkbox";

export default function CheckboxExample() {
  const [checked, setChecked] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);

  return (
    <div className="p-6 space-y-4">
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Accept terms"
        checkSize="md"
        variant="default"
        containerClassName="gap-2"
        boxClassName="shadow-sm"
        iconClassName="text-indigo-600"
      />

      <Checkbox
        indeterminate={true}
        label="Partially selected"
        variant="ghost"
      />

      <Checkbox
        checked={checked2}
        onChange={(e) => setChecked2(e.target.checked)}
        checkSize="lg"
        variant="accent"
        label="Enable notifications"
      />
    </div>
  );
}
