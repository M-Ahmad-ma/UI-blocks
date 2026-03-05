"use client";

import Link from "next/link";
import CodeBlock from "../components/CodeBlock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";

const cliCommands = [
  {
    name: "init",
    description: "Initialize UI-blocks in your project",
    usage: "npx @zenblockz/ui-blocks init",
    options: [
      { name: "-y, --yes", description: "Skip confirmation prompts" },
      { name: "-f, --force", description: "Force overwrite existing files" },
      { name: "--src-dir", description: "Use src directory for components" },
      { name: "--skip-install", description: "Skip dependency installation" },
    ],
  },
  {
    name: "add",
    description: "Add components to your project",
    usage: "npx @zenblockz/ui-blocks add <component>",
    options: [
      { name: "<component>", description: "Component name(s) to add" },
      { name: "-f, --force", description: "Force overwrite existing files" },
      { name: "--all", description: "Add all available components" },
    ],
    example: "npx @zenblockz/ui-blocks add button dialog",
  },
  {
    name: "list",
    description: "List all available components",
    usage: "npx @zenblockz/ui-blocks list",
    options: [
      { name: "--search <query>", description: "Search components by name" },
      { name: "--json", description: "Output as JSON" },
    ],
  },
  {
    name: "remove",
    description: "Remove components from your project",
    usage: "npx @zenblockz/ui-blocks remove <component>",
    options: [
      { name: "<component>", description: "Component name(s) to remove" },
      { name: "-f, --force", description: "Skip confirmation prompts" },
    ],
  },
  {
    name: "diff",
    description: "Check for component updates",
    usage: "npx @zenblockz/ui-blocks diff",
    options: [
      { name: "<component>", description: "Check specific component" },
      { name: "-u, --update", description: "Apply updates automatically" },
    ],
  },
];

export default function CLIPage() {
  return (
    <main className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">CLI Reference</h1>
        <p className="text-muted-foreground text-lg">
          Command-line interface for managing UI-blocks in your projects
        </p>
      </div>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span className="text-sm">Terminal</span>
            </div>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm">
              npm install -g @zenblockz/ui-blocks
            </code>
          </pre>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Or use directly with npx without installation
        </p>
      </section>

      {/* Commands */}
      <section className="space-y-8">
        {cliCommands.map((cmd) => (
          <div key={cmd.name} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="font-mono">
                {cmd.name}
              </Badge>
              <span className="text-muted-foreground">{cmd.description}</span>
            </div>

            <div className="rounded-md bg-muted/50 p-3 mb-4 overflow-x-auto">
              <code className="text-sm font-mono">{cmd.usage}</code>
            </div>

            {cmd.example && (
              <div className="rounded-md bg-muted/50 p-3 mb-4 overflow-x-auto">
                <code className="text-sm text-muted-foreground">Example: {cmd.example}</code>
              </div>
            )}

            {cmd.options.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Options</h4>
                <ul className="space-y-1">
                  {cmd.options.map((opt) => (
                    <li key={opt.name} className="text-sm">
                      <code className="text-primary font-mono text-xs">{opt.name}</code>
                      <span className="text-muted-foreground ml-2">— {opt.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Next Steps */}
      <section className="mt-12 p-6 rounded-lg border border-border bg-muted/30">
        <h3 className="font-semibold mb-2">Next Steps</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ready to get started? Initialize your project and add components.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/Components">View Components</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
