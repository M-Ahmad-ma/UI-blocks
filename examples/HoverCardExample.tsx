"use client";

import { HoverCard } from "@/components/ui/HoverCard";

export default function HoverCardExample() {
  return (
    <div className="p-20 flex justify-center">
      <HoverCard>
        <HoverCard.Trigger>
          <span className="cursor-pointer underline">Hover me</span>
        </HoverCard.Trigger>
        <HoverCard.Content side="bottom" align="center">
          <div className="flex items-center space-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium !text-primary dark:text-primary-foreground">
                Example User
              </p>
              <p className="text-gray-500 text-xs">@example</p>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard>
    </div>
  );
}
