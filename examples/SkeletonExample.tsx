import { Skeleton } from "@/components/ui/Skeleton";

export default function SkeletonExample() {
  return (
    <div className="p-6 space-y-4 w-full">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />

        <div className="flex flex-col space-y-2">
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-48 h-4" />
        </div>
      </div>
    </div>
  );
}

