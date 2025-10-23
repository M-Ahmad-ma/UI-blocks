
"use client";

import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type BreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  separator?: React.ReactNode;
};

export function Breadcrumb({
  separator = <ChevronRight className="h-4 w-4" />,
  className,
  children,
  ...props
}: BreadcrumbProps) {
  const items = React.Children.toArray(children);
  const lastIndex = items.length - 1;

  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
        {items.map((child, i) => (
          <React.Fragment key={i}>
            <li className="inline-flex items-center gap-1.5">{child}</li>
            {i < lastIndex && (
              <li
                role="presentation"
                aria-hidden="true"
                className="flex items-center [&>svg]:h-4 [&>svg]:w-4"
              >
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

type BreadcrumbLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isCurrent?: boolean;
  asChild?: boolean;
};

export function BreadcrumbLink({
  isCurrent,
  asChild,
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  if (isCurrent) {
    return (
      <span
        aria-current="page"
        className={cn("text-foreground font-medium", className)}
      >
        {children}
      </span>
    );
  }

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    return React.cloneElement(childElement, {
      className: cn(
        "hover:text-foreground transition-colors text-muted-foreground",
        childElement.props.className,
        className
      ),
      ...props,
    });
  }

  return (
    <a
      className={cn(
        "hover:text-foreground transition-colors text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-6 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

