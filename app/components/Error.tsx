"use client";
import React from "react";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body className="h-screen flex items-center justify-center bg-background text-foreground">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 max-w-md text-center">
          <h1 className="text-xl font-bold text-red-600">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
