
"use client";

import {
  useEffect,
  useState,
  Button,
  Separator,
  Badge,
  BlockPreview,
  Terminal,
  Clipboard,
  SiTypescript,
  useComponentContext,
  useToast,
  Tooltip,
  Prism,
  componentExamples,
  toPascalCase,
  useCopy,
  useToggle,
} from "@/lib/utils/imports";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

interface Block {
  id: string;
  title: string;
  description: string;
  usage: string[];
  dependencies: string[];
}

export default function ComponentsPage() {
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
        { cache: "no-store" }
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

      if (cleanedBlocks.length > 0) {
        setSelected(cleanedBlocks[0].id);
        setDetails(cleanedBlocks[0].description);
        setUsage(cleanedBlocks[0].usage);
        setDependency(cleanedBlocks[0].dependencies.join(" "));
      }
    };
    fetchBlocks();
  }, [setSelected]);

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
          `https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main/Examples/${fileName}?t=${Date.now()}`
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

  // ✅ Strongly type-safe fix (no `any`)
  type ExampleName = keyof typeof componentExamples;
  const selectedLower = selected?.toLowerCase();

  const Example =
    selectedLower && (Object.keys(componentExamples) as string[]).includes(selectedLower)
      ? componentExamples[selectedLower as ExampleName]
      : null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="lg:block md:hidden hidden overflow-y-scroll no-scrollbar w-64 bg-transparent p-4">
        <h2 className="text-xl font-bold mb-4">Components</h2>
        <ul className="space-y-1 mb-10">
          {blocks.map((block) => (
            <li key={block.id}>
              <button
                onClick={() => setSelected(block.id)}
                className={`w-fit text-left px-3 py-2 rounded-md transition ${selected === block.id ? "bg-code text-white" : "hover:bg-code"
                  }`}
              >
                {block.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 mx-auto overflow-y-auto no-scrollbar mb-10">
        {selected ? (
          <div className="flex flex-col items-center justify-center rounded-lg p-6 shadow">
            <div className="flex flex-col items-start justify-start lg:w-2/3 md:w-full w-full mb-6">
              <h1 className="text-4xl font-bold capitalize mb-2">{selected}</h1>
              <p className="text-muted-foreground">{details}</p>
            </div>

            {Example ? (
              <div className="w-full lg:w-2/3 space-y-6">
                <BlockPreview
                  className="bg-transparent w-full"
                  title={selected}
                  preview={
                    <ErrorBoundary errorComponent={() => <p className="text-red-500">Example failed to render.</p>}>
                      <Example />
                    </ErrorBoundary>
                  }
                  code={code}
                />

                {/* Installation / CLI toggle */}
                <Badge variant="ghost" id="installation" className="text-2xl text-primary mb-1">
                  Installation
                </Badge>

                <div className="mb-0">
                  <Button
                    variant="ghost"
                    onClick={() => setCli(true)}
                    className={`hover:bg-transparent ${cli ? "underline font-semibold" : ""}`}
                  >
                    CLI
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setCli(false)}
                    className={`hover:bg-transparent ${!cli ? "underline font-semibold" : ""}`}
                  >
                    Manual
                  </Button>
                </div>

                {/* CLI / Manual block */}
                <div className="dark:bg-accent/30 bg-accent rounded-lg">
                  <div className="flex relative items-center gap-3 p-1">
                    <Tooltip
                      onClick={() => {
                        copyToClipboard(`npm install ${selected}`);
                        localToast({
                          title: "Copied",
                          variant: "success",
                          duration: 4000,
                        });
                      }}
                      content="Copy to clipboard"
                      toolClassName="absolute right-3"
                      className="text-muted"
                    >
                      <Clipboard className="w-5 h-6 cursor-pointer text-muted-foreground" />
                    </Tooltip>
                    <Terminal className="w-5 h-5 p-1 ml-5 bg-primary text-muted" />
                    <Badge variant="ghost">npm</Badge>
                  </div>
                  <Separator className="w-full h-3 text-primary" />

                  {cli ? (
                    <pre className="rounded-lg p-2 overflow-x-auto">
                      <code className="language-bash">{`npx @zenblockz/ui-blocks add ${selected}`}</code>
                    </pre>
                  ) : dependency.length > 0 ? (
                    <pre className="rounded-lg p-2 overflow-x-auto">
                      <code className="language-bash">{`npm install ${dependency}`}</code>
                    </pre>
                  ) : null}
                </div>

                {/* Component source code */}
                {!cli && (
                  <div
                    className={`dark:bg-accent/30 bg-accent relative overflow-hidden rounded-lg transition-all duration-300`}
                    style={{ height: expanded ? "100%" : "300px" }}
                  >
                    <div className="w-full flex items-center justify-between p-3">
                      <div className="flex items-center gap-2">
                        <SiTypescript />
                        <span className="text-muted-foreground">components/ui/{selected}.tsx</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="ghost" onClick={toggleExpand}>
                          {expanded ? "Collapse" : "Expand"}
                        </Badge>
                        <Separator variant="default" orientation="vertical" className="w-2 h-5" />
                        <Tooltip content="Copy to clipboard" className="text-muted">
                          <Clipboard
                            onClick={() => {
                              copyToClipboard(CompCode);
                              localToast({
                                title: "Copied",
                                description: "Code is copied",
                                variant: "success",
                                duration: 4000,
                              });
                            }}
                            className="text-muted-foreground w-5 h-5 cursor-pointer"
                          />
                        </Tooltip>
                      </div>
                    </div>
                    <Separator />
                    <pre className="rounded-lg p-2 no-scrollbar overflow-x-auto">
                      <code className="language-ts">{CompCode}</code>
                    </pre>

                    {!expanded && (
                      <div className="absolute bottom-0 w-full p-2 flex items-center justify-center bg-white/60 dark:bg-gray-900/40 backdrop-blur-md">
                        <Button onClick={toggleExpand} className="bg-transparent hover:bg-transparent text-primary">
                          Expand
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Usage */}
                {usage.length > 0 && (
                  <>
                    <Badge variant="ghost" className="text-2xl mb-3" id="usage">
                      Usage
                    </Badge>
                    {usage.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 relative no-scrollbar rounded-lg bg-accent dark:bg-accent/30 text-code-foreground"
                      >
                        <Tooltip content="Copy to clipboard" toolClassName="absolute right-3" className="text-muted">
                          <Clipboard
                            onClick={() => {
                              copyToClipboard(item);
                              localToast({
                                title: "Copied",
                                description: "Copied to clipboard",
                                variant: "success",
                                duration: 4000,
                              });
                            }}
                            className="text-muted-foreground w-5 h-5 cursor-pointer"
                          />
                        </Tooltip>
                        <pre className="whitespace-pre-wrap no-scrollbar bg-transparent text-sm mb-2">
                          <code className="language-tsx">{item}</code>
                        </pre>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : (
              <p>No preview available.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Select a component from the sidebar.</p>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block flex-shrink-0 w-64 p-5 bg-background text-muted-foreground">
        <h4 className="text-lg font-semibold">On this page</h4>
        <div className="mt-3 space-y-2">
          <a href="#installation" className="hover:underline">
            Installation
          </a>
          <br />
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </div>
      </div>
    </div>
  );
}

