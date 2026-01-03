"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/Select";

export default function SelectExample() {
  const [role, setRole] = React.useState<string | undefined>();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">User Role</h2>

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground">
          Selected role:{" "}
          <span className="font-medium text-foreground">
            {role ?? "None"}
          </span>
        </p>
      </div>
    </div>
  );
}
