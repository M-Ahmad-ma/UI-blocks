import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Skiper-style UI Blocks</h1>
      <p className="text-zinc-400">
        Live previews + copyable code. No iframes.
      </p>
      <Link
        href="/blocks" 
        className="inline-flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 px-4 py-2"
      >
        Browse Blocks →
      </Link>
    </main>
  );
}
