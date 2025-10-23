
import dynamic, {
  type DynamicOptions,
  type Loader,
  type LoadableComponent,
} from "next/dynamic";
import type { FC } from "react";

type ExampleComponent = FC<Record<string, unknown>>;

function dynamicExample<T extends ExampleComponent>(
  loader: Loader<T>
): LoadableComponent<T> {
  return dynamic<T>(loader, {});
}

export const componentExamples = {
  button: dynamicExample(() => import("@/examples/ButtonExample")),
  input: dynamicExample(() => import("@/examples/InputExample")),
  alert: dynamicExample(() => import("@/examples/AlertExample")),
  accordion: dynamicExample(() => import("@/examples/AccordionExample")),
  alertdialog: dynamicExample(() => import("@/examples/AlertDialogExample")),
  badge: dynamicExample(() => import("@/examples/BadgeExample")),
  hovercard: dynamicExample(() => import("@/examples/HoverCardExample")),
  aspectratio: dynamicExample(() => import("@/examples/AspectRatioExample")),
  textarea: dynamicExample(() => import("@/examples/TextAreaExample")),
  select: dynamicExample(() => import("@/examples/SelectExample")),
  radiogroup: dynamicExample(() => import("@/examples/RadioGroupExample")),
  skeleton: dynamicExample(() => import("@/examples/SkeletonExample")),
  checkbox: dynamicExample(() => import("@/examples/CheckboxExample")),
  tooltip: dynamicExample(() => import("@/examples/TooltipExample")),
  toast: dynamicExample(() => import("@/examples/ToastExample")),
  separator: dynamicExample(() => import("@/examples/SeparatorExample")),
  slider: dynamicExample(() => import("@/examples/SliderExample")),
  sheet: dynamicExample(() => import("@/examples/SheetExample")),
  drawer: dynamicExample(() => import("@/examples/DrawerExample")),
  card: dynamicExample(() => import("@/examples/CardExample")),
  command: dynamicExample(() => import("@/examples/CommandExample")),
  label: dynamicExample(() => import("@/examples/LabelExample")),
  dialog: dynamicExample(() => import("@/examples/DialogExample")),
  breadcrumb: dynamicExample(() => import("@/examples/BreadcrumbExample")),
  empty: dynamicExample(() => import("@/examples/EmptyExample")),
  spinner: dynamicExample(() => import("@/examples/SpinnerExample")),
  item: dynamicExample(() => import("@/examples/ItemExample")),
} as const;

