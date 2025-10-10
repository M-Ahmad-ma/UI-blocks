import { FaFolderOpen } from "react-icons/fa6";
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"

export default function EmptyExample() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FaFolderOpen />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#" className="inline-flex gap-2">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}
