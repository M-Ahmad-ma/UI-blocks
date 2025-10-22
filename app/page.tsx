import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="text-center space-y-6 mt-16">
        <h1 className="text-3xl font-bold">The Foundation for you design System</h1>
        <p className="text-primary text-2xl
          max-w-3xl text-center lg:ml-20">
          A set of beautifully designed and customizable component that you can extend and build on.
        </p>
        <div className="flex items-center justify-center  gap-6">
          <Button variant="secondary" asChild>
            <Link
              href="/blocks"
            >
              Components
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link
              href="/Cli"
            >
              CLI
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
