"use client";

import react, {
  createcontext,
  usecallback,
  usecontext,
  useeffect,
  usememo,
  useref,
  usestate,
} from "react";
import { animatepresence, motion } from "framer-motion";
import { checkcircle, alerttriangle, info, x } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type toastvariant = "default" | "success" | "error" | "info";
export type toastposition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type toastoptions = {
  id?: string | number;
  title?: react.reactnode;
  description?: react.reactnode;
  duration?: number;
  variant?: toastvariant;
  action?: {
    label: string;
    onclick: (id: string | number) => void;
  } | null;
  classname?: string;
};

type toastitem = required<
  pick<
    toastoptions,
    | "id"
    | "title"
    | "description"
    | "duration"
    | "variant"
    | "action"
    | "classname"
  >
>;

type toastcontextvalue = {
  toast: (
    message: react.reactnode | toastoptions,
    opts?: toastoptions,
  ) => string | number;
  dismiss: (id: string | number) => void;
  clear: () => void;
};

const toastcontext = createcontext<toastcontextvalue | undefined>(undefined);

let idcounter = 0;

function genid(prefix = "toast") {
  idcounter += 1;
  return `${prefix}-${date.now().tostring(36)}-${idcounter}`;
}

export function toastprovider({
  children,
  position = "top-right",
  containerclassname,
}: {
  children: react.reactnode;
  position?: toastposition;
  containerclassname?: string;
}) {
  const [toasts, settoasts] = usestate<toastitem[]>([]);
  const timers = useref<map<string | number, returntype<typeof settimeout>>>(
    new map(),
  );

  const push = usecallback((payload: toastoptions): string | number => {
    const id = payload.id ?? genid();
    const item: toastitem = {
      id,
      title: payload.title ?? null,
      description: payload.description ?? null,
      duration: payload.duration ?? 4000,
      variant: payload.variant ?? "default",
      action: payload.action ?? null,
      classname: payload.classname ?? "",
    };
    settoasts((s) => [item, ...s]);
    if (item.duration > 0) {
      const t = settimeout(() => {
        settoasts((s) => s.filter((x) => x.id !== id));
        timers.current.delete(id);
      }, item.duration);
      timers.current.set(id, t);
    }
    return id;
  }, []);

  const remove = usecallback((id: string | number) => {
    settoasts((s) => s.filter((t) => t.id !== id));
    const t = timers.current.get(id);
    if (t) {
      cleartimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const clear = usecallback(() => {
    settoasts([]);
    timers.current.foreach((t) => cleartimeout(t));
    timers.current.clear();
  }, []);

  useeffect(() => {
    return () => {
      timers.current.foreach((t) => cleartimeout(t));
      timers.current.clear();
    };
  }, []);

  const value = usememo(
    () => ({
      toast: (m: react.reactnode | toastoptions, o?: toastoptions) => {
        if (
          m &&
          typeof m === "object" &&
          ("title" in m || "description" in m)
        ) {
          return push(m as toastoptions);
        }
        const opts = o ?? {};
        return push({ ...opts, title: m as react.reactnode });
      },
      dismiss: remove,
      clear,
    }),
    [push, remove, clear],
  );

  return (
    <toastcontext.provider value={value}>
      {children}
      <toaster
        toasts={toasts}
        ondismiss={remove}
        position={position}
        containerclassname={containerclassname}
      />
    </toastcontext.provider>
  );
}

export function usetoast() {
  const ctx = usecontext(toastcontext);
  if (!ctx) throw new error("usetoast must be used within a toastprovider");
  return ctx;
}

// global helper api
const _globalref: { current: toastcontextvalue | null } = { current: null };

export function bindtoast(ctx: toastcontextvalue | null) {
  _globalref.current = ctx;
}

export function toast(
  message: react.reactnode | toastoptions,
  opts?: toastoptions,
) {
  if (!_globalref.current) {
    console.warn(
      "toast() called before toastprovider mounted. wrap app with <toastprovider/>.",
    );
    return null;
  }
  return _globalref.current.toast(message, opts);
}

export function dismiss(id: string | number) {
  _globalref.current?.dismiss(id);
}

export function cleartoasts() {
  _globalref.current?.clear();
}

function toaster({
  toasts,
  ondismiss,
  position,
  containerclassname,
}: {
  toasts: toastitem[];
  ondismiss: (id: string | number) => void;
  position: toastposition;
  containerclassname?: string;
}) {
  const posclasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  } as const;

  return (
    <div
      classname={cn(
        "fixed z-50 pointer-events-none",
        posclasses[position],
        containerclassname,
      )}
    >
      <div classname="flex flex-col gap-3">
        <animatepresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              classname="pointer-events-auto"
            >
              <toastcard toast={t} ondismiss={() => ondismiss(t.id)} />
            </motion.div>
          ))}
        </animatepresence>
      </div>
    </div>
  );
}

function toastcard({
  toast,
  ondismiss,
}: {
  toast: toastitem;
  ondismiss: () => void;
}) {
  const { id, title, description, variant, action, classname } = toast;

  const variantstyles: record<
    toastvariant,
    { base: string; icon: react.reactnode }
  > = {
    default: {
      base: "bg-white border shadow-sm text-gray-900",
      icon: <info classname="w-5 h-5 text-gray-700" />,
    },
    success: {
      base: "bg-white border shadow-sm text-green-900",
      icon: <checkcircle classname="w-5 h-5 text-green-600" />,
    },
    error: {
      base: "bg-white border shadow-sm text-rose-900",
      icon: <alerttriangle classname="w-5 h-5 text-rose-600" />,
    },
    info: {
      base: "bg-white border shadow-sm text-sky-900",
      icon: <info classname="w-5 h-5 text-sky-600" />,
    },
  };

  const vs = variantstyles[variant] ?? variantstyles.default;

  return (
    <div
      classname={cn(
        "max-w-md w-full rounded-lg overflow-hidden",
        vs.base,
        classname,
      )}
    >
      <div classname="p-3 flex items-start gap-3">
        <div classname="mt-0.5">{vs.icon}</div>
        <div classname="flex-1">
          {title ? <div classname="font-medium text-sm">{title}</div> : null}
          {description ? (
            <div classname="text-sm text-muted-foreground mt-1">
              {description}
            </div>
          ) : null}
          {action ? (
            <div classname="mt-3">
              <button
                onclick={() => action.onclick(id)}
                classname="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
              >
                {action.label}
              </button>
            </div>
          ) : null}
        </div>

        <button
          onclick={ondismiss}
          aria-label="close"
          classname="ml-2 -mr-1 p-1 rounded inline-flex hover:bg-gray-100"
        >
          <x classname="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function toastproviderbinder({
  children,
  position,
  containerclassname,
}: {
  children: react.reactnode;
  position?: toastposition;
  containerclassname?: string;
}) {
  return (
    <toastprovider position={position} containerclassname={containerclassname}>
      <binderinner>{children}</binderinner>
    </toastprovider>
  );
}

function binderinner({ children }: { children: react.reactnode }) {
  const ctx = usetoast();
  useeffect(() => {
    bindtoast(ctx);
    return () => bindtoast(null);
  }, [ctx]);
  return <>{children}</>;
}
