"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ToastVariant = "default" | "success" | "error" | "info";
export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ToastOptions = {
  id?: string | number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: (id: string | number) => void;
  };
  className?: string;
};

type ToastItem = Required<
  Pick<
    ToastOptions,
    "id" | "title" | "description" | "duration" | "variant" | "className"
  >
> & {
  action?: {
    label: string;
    onClick: (id: string | number) => void;
  } | null;
};

type ToastContextValue = {
  toast: (
    message: React.ReactNode | ToastOptions,
    opts?: ToastOptions,
  ) => string | number;
  dismiss: (id: string | number) => void;
  clear: () => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let idCounter = 0;

function genId(prefix = "toast") {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter}`;
}

/* ---------------- Toast Provider ---------------- */

export function ToastProvider({
  children,
  position = "top-right",
  containerClassName,
}: {
  children: React.ReactNode;
  position?: ToastPosition;
  containerClassName?: string;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string | number, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const push = useCallback((payload: ToastOptions): string | number => {
    const id = payload.id ?? genId();
    const item: ToastItem = {
      id,
      title: payload.title ?? null,
      description: payload.description ?? null,
      duration: payload.duration ?? 4000,
      variant: payload.variant ?? "default",
      action: payload.action ?? null,
      className: payload.className ?? "",
    };

    setToasts((s) => [item, ...s]);

    if (item.duration > 0) {
      const t = setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== id));
        timers.current.delete(id);
      }, item.duration);
      timers.current.set(id, t);
    }

    return id;
  }, []);

  const remove = useCallback((id: string | number) => {
    setToasts((s) => s.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
    timers.current.forEach((t) => clearTimeout(t));
    timers.current.clear();
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      toast: (m: React.ReactNode | ToastOptions, o?: ToastOptions) => {
        if (typeof m === "object" && ("title" in m || "description" in m)) {
          return push(m as ToastOptions);
        }
        const opts = o ?? {};
        return push({ ...opts, title: m as React.ReactNode });
      },
      dismiss: remove,
      clear,
    }),
    [push, remove, clear],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        toasts={toasts}
        onDismiss={remove}
        position={position}
        containerClassName={containerClassName}
      />
    </ToastContext.Provider>
  );
}

/* ---------------- Hook ---------------- */

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

/* ---------------- Global Binding ---------------- */

const _globalRef: { current: ToastContextValue | null } = { current: null };

export function bindToast(ctx: ToastContextValue | null) {
  _globalRef.current = ctx;
}

export function toast(
  message: React.ReactNode | ToastOptions,
  opts?: ToastOptions,
) {
  if (!_globalRef.current) {
    console.warn(
      "toast() called before ToastProvider mounted. Wrap app with <ToastProvider/>.",
    );
    return null;
  }
  return _globalRef.current.toast(message, opts);
}

export function dismiss(id: string | number) {
  _globalRef.current?.dismiss(id);
}

export function clearToasts() {
  _globalRef.current?.clear();
}

/* ---------------- Toaster Component ---------------- */

function Toaster({
  toasts,
  onDismiss,
  position,
  containerClassName,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string | number) => void;
  position: ToastPosition;
  containerClassName?: string;
}) {
  const posClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  } as const;

  return (
    <div
      className={cn(
        "fixed z-50 pointer-events-none",
        posClasses[position],
        containerClassName,
      )}
    >
      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-auto"
            >
              <ToastCard toast={t} onDismiss={() => onDismiss(t.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- ToastCard ---------------- */

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const { id, title, description, variant, action, className } = toast;

  const variantStyles: Record<
    ToastVariant,
    { base: string; icon: React.ReactNode }
  > = {
    default: {
      base: "bg-white border shadow-sm text-gray-900",
      icon: <Info className="w-5 h-5 text-gray-700" />,
    },
    success: {
      base: "bg-white border shadow-sm text-green-900",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    error: {
      base: "bg-white border shadow-sm text-rose-900",
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
    },
    info: {
      base: "bg-white border shadow-sm text-sky-900",
      icon: <Info className="w-5 h-5 text-sky-600" />,
    },
  };

  const vs = variantStyles[variant] ?? variantStyles.default;

  return (
    <div
      className={cn(
        "max-w-md w-full rounded-lg overflow-hidden",
        vs.base,
        className,
      )}
    >
      <div className="p-3 flex items-start gap-3">
        <div className="mt-0.5">{vs.icon}</div>
        <div className="flex-1">
          {title ? <div className="font-medium text-sm">{title}</div> : null}
          {description ? (
            <div className="text-sm text-muted-foreground mt-1">
              {description}
            </div>
          ) : null}
          {action ? (
            <div className="mt-3">
              <button
                onClick={() => action.onClick(id)}
                className="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
              >
                {action.label}
              </button>
            </div>
          ) : null}
        </div>

        <button
          onClick={onDismiss}
          aria-label="Close"
          className="ml-2 -mr-1 p-1 rounded inline-flex hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Provider Binder ---------------- */

export function ToastProviderBinder({
  children,
  position,
  containerClassName,
}: {
  children: React.ReactNode;
  position?: ToastPosition;
  containerClassName?: string;
}) {
  return (
    <ToastProvider position={position} containerClassName={containerClassName}>
      <BinderInner>{children}</BinderInner>
    </ToastProvider>
  );
}

function BinderInner({ children }: { children: React.ReactNode }) {
  const ctx = useToast();
  useEffect(() => {
    bindToast(ctx);
    return () => bindToast(null);
  }, [ctx]);
  return <>{children}</>;
}
