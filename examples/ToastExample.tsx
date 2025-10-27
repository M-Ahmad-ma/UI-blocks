"use client";
import React from "react";
import { ToastProviderBinder, useToast, toast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

function ToastExampleInner() {
  const { toast: localToast, dismiss } = useToast();

  return (
    <div className="p-6 space-y-4">
      <Button
        onClick={() =>
          localToast({
            title: "Saved",
            description: "Your changes have been saved.",
            variant: "success",
            duration: 4000,
          })
        }
      >
        Local toast (hook)
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          localToast({
            title: "Error",
            description: "Something went wrong.",
            variant: "error",
            duration: 5000,
            action: {
              label: "Retry",
              onClick: (id) => {
                /* do something */ dismiss(id);
              },
            },
          })
        }
      >
        Error with action
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Global toast",
            description: "Triggered via global helper",
            variant: "info",
          })
        }
      >
        Global toast()
      </Button>
    </div>
  );
}

export default function ToastExample() {
  return (
    <ToastProviderBinder>
      <ToastExampleInner />
    </ToastProviderBinder>
  );
}
