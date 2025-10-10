import * as React from "react"
import { Badge } from "@/components/ui/Badge"
import { Check } from "lucide-react"

export default function BadgeExample() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-x-3">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>

      <div className="space-x-3">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>

      <div className="space-x-3">
        <Badge rounded="full">Pill</Badge>
        <Badge rounded="md">Rounded</Badge>
        <Badge dot>Dot</Badge>
        <Badge dot variant="destructive">Alert</Badge>
      </div>

      <div className="space-x-6">
        <Badge className=" gap-2">
          <Check className="h-4 w-4" />
          Verified
        </Badge>

        <Badge variant="secondary" className="gap-2">
          <Check className="h-4 w-4" />
          OK
        </Badge>
      </div>
    </div>
  )
}
