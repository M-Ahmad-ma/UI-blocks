
import Link from "next/link"
import { Breadcrumb, BreadcrumbLink, BreadcrumbEllipsis } from "@/components/ui/Breadcrumb"

export default function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <BreadcrumbLink asChild>
        <Link href="/">Home</Link>
      </BreadcrumbLink>
      <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
      <BreadcrumbEllipsis />
      <BreadcrumbLink href="/projects/123">Project 123</BreadcrumbLink>
      <BreadcrumbLink isCurrent>Settings</BreadcrumbLink>
    </Breadcrumb>
  )
}
