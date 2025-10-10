import React from "react"
import CommandDialog from "@/components/ui/CommandDialog"

export default function CommandExample() {
  const commands = [
    {
      group: "File",
      items: [
        { label: "New File", shortcut: "⌘N" },
        { label: "Open File", shortcut: "⌘O" },
        { label: "Save File", shortcut: "⌘S" },
      ],
    },
    {
      group: "Edit",
      items: [
        { label: "Undo", shortcut: "⌘Z" },
        { label: "Redo", shortcut: "⌘⇧Z" },
        { label: "Copy", shortcut: "⌘C" },
        { label: "Paste", shortcut: "⌘V" },
      ],
    },
  ]

  return (
    <div className=" flex items-center justify-center">
      <p>Press Ctrl+J to open the Command Palette</p>
      <CommandDialog commands={commands} />
    </div>
  )
}
