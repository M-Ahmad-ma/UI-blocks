import { useState } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";

export default function RadioGroupExample() {
  const [value, setValue] = useState<string>("option1");

  const options = [
    { value: "option1", label: "Option 1", description: "This is the first option." },
    { value: "option2", label: "Option 2", description: "This is the second option." },
    { value: "option3", label: "Option 3", description: "This is the third option." },
  ];

  return (
    <div className="p-6 max-w-md">
      <RadioGroup options={options} value={value} onChange={setValue} />
    </div>
  );
}
