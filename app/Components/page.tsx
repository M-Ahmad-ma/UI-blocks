"use client";

import { useEffect, useState, Suspense } from "react";
import { 
  Button, 
  Separator,
  BlockPreview,
  Terminal,
  Clipboard,
  useComponentContext,
  useToast,
  Tooltip,
  componentExamples,
  toPascalCase,
  useCopy,
  useToggle,
  Prism,
  ErrorBoundary,
} from "@/lib/utils/imports";
import { categories } from "@/lib/utils/categories";

interface Block {
  id: string;
  title: string;
  description: string;
  usage: string[];
  dependencies: string[];
}

function ComponentsContent() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { selected, setSelected } = useComponentContext();
  const [CompCode, setCompCode] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [usage, setUsage] = useState<string[]>([]);
  const [cli, setCli] = useState<boolean>(true);
  const [dependency, setDependency] = useState<string>("");
  const { state: expanded, toggle: toggleExpand } = useToggle(false);
  const { toast: localToast } = useToast();
  const { copyToClipboard } = useCopy();

  useEffect(() => {
    if (!selected) return;

    const fetchBlockCode = async () => {
      const fileName = `${toPascalCase(selected)}.tsx`;
      const url = `https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main/templates/${fileName}?t=${Date.now()}`;

      try {
        const res = await fetch(url);    
        if (!res.ok) throw new Error("Code not found");
        const componentCode = await res.text();
        setCompCode(componentCode);
      } catch {
        setCompCode("// No code found for this component.");
      }
    };
    fetchBlockCode();
  }, [selected]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main/blocks.json",
        { cache: "no-store" },
      );
      const data = await res.json();

      const cleanedBlocks: Block[] = data.blocks.map((b: Block) => ({
        id: b.id,
        title: b.title, 
        description: b.description,   
        usage: Array.isArray(b.usage)   
          ? b.usage.map((u: string) => u.replace(/\\n/g, "\n"))
          : [b.usage || ""],
        dependencies: b.dependencies || [],
      }));
   
      setBlocks(cleanedBlocks);

      if (cleanedBlocks.length > 0 && !selected) {
        setSelected(cleanedBlocks[0].id);
        setDetails(cleanedBlocks[0].description);
        setUsage(cleanedBlocks[0].usage);
        setDependency(cleanedBlocks[0].dependencies.join(" "));
      }
    };
    fetchBlocks();
  }, [setSelected, selected]);

  useEffect(() => {
    if (!selected || blocks.length === 0) return;    
    const currentBlock = blocks.find((block) => block.id === selected);
    if (!currentBlock) return;   
    setDetails(currentBlock.description);
    setUsage(currentBlock.usage);
    setDependency(currentBlock.dependencies.join(" "));
  }, [selected, blocks]);

  useEffect(() => {
    if (!selected) return;
    const fetchExampleCode = async () => {   
      const fileName = `${toPascalCase(selected)}Example.tsx`;   
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main/Examples/${fileName}?t=${Date.now()}`,
        );
        if (!res.ok) throw new Error("Code not found");
        const text = await res.text();
        setCode(text);
      } catch {
        setCode("// No code available for this component.");
      }
    };
    fetchExampleCode();
  }, [selected]);

  useEffect(() => {   
    Prism.highlightAll();
  }, [code, CompCode, usage, cli]);

  const selectedLower = selected?.toLowerCase() as string;

  const Example =
    selectedLower && selectedLower in componentExamples
      ? componentExamples[selectedLower as keyof typeof componentExamples]
      : null;

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 overflow-y-auto no-scrollbar hidden md:block">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">Components</h2>
          
          {categories.map((category) => (
            <div key={category.name} className="mb-6">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {category.name}
              </h3>
              <ul className="space-y-1">
                {category.components.map((compId) => {
                  const block = blocks.find(b => b.id === compId);
                  if (!block) return null;
                  return (
                    <li key={compId}>
                      <button
                        onClick={() => setSelected(block.id)}   
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                          selected === block.id 
                            ? "bg-primary-foreground text-primary font-medium" 
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {block.title}
                      </button>  
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-2xl  mx-auto py-8 px-4">
          {selected ? (
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-lg font-semibold mb-2 capitalize">{selected}</h1>
                <p className="text-muted-foreground">{details}</p>
              </div>

              {/* Preview */}
              {Example ? (
                <BlockPreview
                  title={selected}
                  preview={
                    <ErrorBoundary
                      errorComponent={() => (
                        <p className="text-red-500 p-4">
                          Example failed to render.
                        </p>
                      )}
                    >
                      <Example />
                    </ErrorBoundary>
                  }
                  code={code}
                />
              ) : (
                <div className="p-8 border border-border rounded-lg bg-card">
                  <p className="text-muted-foreground">No preview available.</p>
                </div>
              )}

              {/* Installation */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Installation</h2>
                
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={cli ? "default" : "ghost"}
                    onClick={() => setCli(true)}
                    size="sm"
                  >
                    CLI
                  </Button>
                  <Button
                    variant={!cli ? "default" : "ghost"}
                    onClick={() => setCli(false)}
                    size="sm"
                  >
                    Manual
                  </Button>
                </div>

                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4" />
                      <span className="text-sm">Terminal</span>
                    </div>
                    <Tooltip
                      onClick={() => {
                        const cmd = cli 
                          ? `npx @zenblockz/ui-blocks add ${selected}`
                          : `npm install ${dependency}`;
                        copyToClipboard(cmd);
                        localToast({ title: "Copied", variant: "success", duration: 2000 });
                      }}
                      content="Copy to clipboard"
                    >
                      <Clipboard className="h-4 w-4 cursor-pointer hover:text-foreground" />
                    </Tooltip>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm">
                      {cli 
                        ? `npx @zenblockz/ui-blocks add ${selected}`
                        : dependency 
                          ? `npm install ${dependency}`
                          : "# No additional dependencies"
                      }
                    </code>
                  </pre>
                </div>
              </section>

              {/* Code */}
              {!cli && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Code</h2>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={toggleExpand}>
                        {expanded ? "Collapse" : "Expand"}
                      </Button>
                      <Tooltip
                        onClick={() => {
                          copyToClipboard(CompCode);
                          localToast({ title: "Copied", variant: "success", duration: 2000 });
                        }}
                        content="Copy to clipboard"
                      >
                        <Button variant="ghost" size="sm">
                          <Clipboard className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  <div 
                    className="rounded-lg border border-border bg-card overflow-hidden relative"
                    style={{ maxHeight: expanded ? "none" : "400px" }}
                  >
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm language-ts">{CompCode}</code>
                    </pre>
                    {!expanded && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-card to-transparent">
                        <Button variant="ghost" size="sm" onClick={toggleExpand} className="w-full">
                          Show more
                        </Button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Usage */}
              {usage.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Usage</h2>
                  <div className="space-y-3">
                    {usage.map((item, index) => (
                      <div key={index} className="rounded-lg border border-border bg-card ">
                        <div className="flex justify-end mb-2">
                          <Tooltip
                            onClick={() => {
                              copyToClipboard(item);
                              localToast({ title: "Copied", variant: "success", duration: 2000 });
                            }}
                            content="Copy to clipboard"
                          >
                            <Button variant="ghost" size="sm">
                              <Clipboard className="h-4 w-4 mt-2" />
                            </Button>
                          </Tooltip>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code className="language-tsx">{item}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-muted-foreground">Select a component from the sidebar</p>
            </div>
          )}
        </div>
      </main>

          </div>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
      <ComponentsContent />
    </Suspense>
  );
}
