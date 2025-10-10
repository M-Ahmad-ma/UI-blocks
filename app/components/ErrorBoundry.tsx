"use client";
import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  errorComponent?: React.ComponentType<{ error: Error }>;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, errorComponent: Fallback } = this.props;

    if (hasError) {
      if (Fallback) {
        return <Fallback error={error!} />;
      }

      // Default fallback UI
      return (
        <div className="rounded-2xl bg-red-500/10 ring-1 ring-red-500/30 p-4">
          <div className="font-semibold">Preview crashed</div>
          <div className="text-sm opacity-80">{error?.message}</div>
        </div>
      );
    }

    return children;
  }
}
