// app/blocks/[id]/page.tsx
import { notFound } from "next/navigation"
import { blocks } from "@/app/data/Blocks"
import BlockPreview from "@/app/components/BlockPreview"

export default function BlockPage({ params }: { params: { id: string } }) {
  const block = blocks.find((b) => b.id === params.id)

  if (!block) return notFound()

  return (
    <div className="p-6 space-y-6">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{block.title}</h1>
        <p className="text-white/60">{block.description}</p>
      </div>

      {/* Dependencies */}
      {block.dependencies && block.dependencies.length > 0 && (
        <div className="bg-black/30 border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">Dependencies</h2>
          <pre className="text-sm text-green-400">
            npm install {block.dependencies.join(" ")}
          </pre>
        </div>
      )}

      {/* Preview (always rendered in Option 2) */}
      <div className="border rounded-2xl p-6 bg-black/30">
        <BlockPreview block={block} />
      </div>

      {/* Usage */}
      {block.usage && (
        <div className="bg-black/30 border rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2">Usage</h2>
          <pre className="text-sm">
            <code>{block.usage}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
