import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { 
  Copy, 
  Accessibility, 
  Palette, 
  Code2,
  Sparkles,
  Github,
  Figma
} from "lucide-react";

const featuredComponents = [
  { name: "Button", description: "Interactive button component" },
  { name: "Input", description: "Text input field" },
  { name: "Card", description: "Content container" },
  { name: "Dialog", description: "Modal dialog overlay" },
  { name: "Dropdown", description: "Dropdown menu" },
  { name: "Tabs", description: "Tabbed navigation" },
  { name: "Accordion", description: "Collapsible sections" },
  { name: "Toast", description: "Notification messages" },
];

const features = [
  {
    icon: Copy,
    title: "Copy & Paste",
    description: "Simply copy the component code and paste it into your project. No dependencies to install."
  },
  {
    icon: Accessibility,
    title: "Fully Accessible",
    description: "Built with accessibility in mind. All components follow WAI-ARIA guidelines."
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Easily customize colors, spacing, and styling using Tailwind CSS variables."
  },
  {
    icon: Github,
    title: "Open Source",
    description: "Free to use in your projects. Contribute and help us improve."
  },
  {
    icon: Code2,
    title: "TypeScript",
    description: "Built with TypeScript for type safety and better developer experience."
  },
  {
    icon: Sparkles,
    title: "Modern Stack",
    description: "Built with React 19, Tailwind CSS 4, and Framer Motion."
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm mb-6 bg-muted/50">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span className="text-muted-foreground">v1.0 is now available</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Beautiful UI components
            <br />
            <span className="text-primary">built for your projects</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A collection of reusable components built with Tailwind CSS, 
            React, and TypeScript. Copy and paste into your apps.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/Components">View Components</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/cli">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="w-full max-w-4xl" />

      {/* Features Section */}
      <section className="w-full py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Why use UI-blocks?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Everything you need to build beautiful user interfaces
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <feature.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Preview Section */}
      <section className="w-full py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Components
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Explore our collection of 30+ production-ready components
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredComponents.map((comp) => (
              <Link 
                key={comp.name}
                href={`/Components?selected=${comp.name.toLowerCase()}`}
                className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group"
              >
                <Badge variant="secondary" className="mb-2 group-hover:bg-primary/10">
                  {comp.name}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {comp.description}
                </p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="ghost" asChild>
              <Link href="/Components">
                View all components →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="w-full py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Quick Installation
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Get started with UI-blocks in your project
          </p>
          
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Terminal</span>
              <Badge variant="outline">npm</Badge>
            </div>
            <pre className="text-sm overflow-x-auto">
              <code className="text-primary">
# Initialize your project<br/>
npx @zenblockz/ui-blocks init<br/><br/>
# Add components<br/>
npx @zenblockz/ui-blocks add button
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm bg-gradient-to-tr from-primary to-accent" />
            <span className="text-sm font-medium">UI-blocks</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Open source component library for React
          </p>
        </div>
      </footer>
    </main>
  );
}
