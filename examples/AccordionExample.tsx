
import { Accordion } from "@/components/ui/Accordion";

export default function AccordionExample() {
  const items = [
    {
      id: "item-1",
      title: "What is this project?",
      content: `Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.
Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.`,
    },
    {
      id: "item-2",
      title: "Is it customizable?",
      content: `Yes, all components use Tailwind and a cn helper, so you can theme easily.`,
    },
    {
      id: "item-3",
      title: "Can I use it in production?",
      content: `Definitely. Components are small, composable, and based on React + Tailwind.`,
    },
  ];

  return (
    <div className="w-full ">
      <Accordion items={items} defaultOpenId="item-1" />
    </div>
  );
}

