"use client"
import { useState, useEffect } from "react"
import { Moon, Sun, Github, X, Menu } from "lucide-react"
import Link from "next/link"
import { Sheet } from "@/components/ui/Sheet"
import { Button } from "@/components/ui/Button"
import { useComponentContext } from "@/Context/ComponentContext";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true)
  const [open, setOpen] = useState(false)
  const { setSelected } = useComponentContext();
  const [blocks, setBlocks] = useState<any[]>([])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    async function fetchBlocks() {
      const res = await fetch("https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main/blocks.json")
      const data = await res.json()
      setBlocks(data.blocks || [])
    }
    fetchBlocks()
  }, [])

  return (
    <header className="w-full border-b border-border bg-background text-primary">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 h-12">
        <div className="flex items-center space-x-6">

          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setOpen(true)}>
              <Menu />
            </Button>
            <Sheet open={open} onOpenChange={setOpen} position="left" size="sm">
              <div>
                <h2 className="text-lg text-muted-foreground font-semibold mb-4">Navigation</h2>

                <nav className="space-y-2 mb-6">
                  {["docs", "components", "blocks", "charts", "themes", "colors"].map((link) => (
                    <Link
                      key={link}
                      href={`/${link}`}
                    >
                      <span className="block text-xl text-foreground hover:text-primary">
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                      </span>
                    </Link>
                  ))}
                </nav>

                <h2 className="text-md text-muted-foreground font-semibold mb-2">Components</h2>
                <ul className="space-y-1 max-h-[600px] no-scrollbar overflow-y-auto pr-1">
                  {blocks.map((block) => (
                    <li key={block.id}>
                        <Button variant="ghost"  onClick={() =>  setSelected(block.id)}  className="block text-foreground  px-2 py-1 rounded hover:bg-transparent border-none text-xl">
                        {block.title}
                        </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </Sheet>
          </div>

          <Link href="/" className="md:flex hidden items-center space-x-2">
            <div className="w-5 h-5 rounded-sm bg-gradient-to-tr from-primary to-accent" />
            <span className="text-sm font-medium text-primary">UI-blocks</span>
            <span className="ml-1 text-[10px] text-destructive border border-destructive rounded px-1">
              Beta
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-5">
            {["docs", "components", "blocks", "charts", "themes", "colors"].map((link) => (
              <Link key={link} href={`/${link}`}>
                <span className="text-primary capitalize">{link}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-muted border border-border rounded-md px-3 py-1 text-sm">
            <input
              type="text"
              placeholder="Search documentation..."
              className="bg-transparent outline-none text-foreground placeholder-muted-foreground w-40"
            />
            <span className="ml-2 text-xs text-muted-foreground border border-border px-1 rounded">
              Ctrl K
            </span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Github size={16} />
          </a>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:text-primary"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  )
}

