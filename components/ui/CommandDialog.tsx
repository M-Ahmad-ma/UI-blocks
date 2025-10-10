"use client"

import * as React from "react"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./Command"

interface CommandDialogProps {
  commands: {
    group: string
    items: { label: string; shortcut?: string }[]
  }[]
}

export default function CommandDialog({ commands }: CommandDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "j") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredCommands = commands.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  }))
  const hasResults = filteredCommands.some((g) => g.items.length > 0)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-muted rounded-lg shadow-lg w-[32rem] h-96">
        <Command>
          <CommandInput
            autoFocus
            placeholder="Type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CommandList>
            {hasResults ? (
              filteredCommands.map((group) =>
                group.items.length > 0 ? (
                  <CommandGroup key={group.group}>
                    <div data-slot="command-group-heading">{group.group}</div>
                    {group.items.map((item) => (
                      <CommandItem key={item.label}>{item.label}
                        {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null
              )
            ) : (
              <CommandEmpty>No commands found</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  )
}
