"use client"
import { useState, useEffect } from "react"
import { Moon, Sun, Github, Menu, X, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet } from "@/components/ui/Sheet"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Separator } from "@/components/ui/Separator"
import { categories } from "@/lib/utils/categories"

const navItems = [
  { name: "Components", href: "/Components" },
  { name: "CLI", href: "/cli" },
]

export default function Header() {
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(true)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"
      } border-border`}
    >
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="flex items-center gap-6">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Sheet open={open} onOpenChange={setOpen} position="left" size="sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-purple-500" />
                    <span className="font-semibold">UI-blocks</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full h-10 pl-9 pr-4 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between p-2 rounded-md hover:bg-accent ${
                        pathname === item.href ? "bg-accent font-medium" : ""
                      }`}
                    >
                      {item.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                  {categories.map((category) => (
                    <div key={category.name}>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">
                        {category.name}
                      </h4>
                      <ul className="space-y-1">
                        {category.components.slice(0, 3).map((comp) => (
                          <li key={comp}>
                            <Link
                              href={`/Components?selected=${comp}`}
                              onClick={() => setOpen(false)}
                              className="block p-2 text-sm rounded-md hover:bg-accent capitalize"
                            >
                              {comp}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-purple-500" />
            <span className="font-semibold hidden sm:inline-block">UI-blocks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  pathname === item.href 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Search className="h-4 w-4" />
              <span className="text-xs">Search</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-accent transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
