import type { ComponentPropsWithoutRef, ElementType } from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const cornerClasses: Record<Corner, string> = {
  "top-left": "top-0 left-0 rounded-tl-md rounded-br-md border-r border-b",
  "top-right": "top-0 right-0 rounded-tr-md rounded-bl-md border-l border-b",
  "bottom-left": "bottom-0 left-0 rounded-bl-md rounded-tr-md border-r border-t",
  "bottom-right": "bottom-0 right-0 rounded-br-md rounded-tl-md border-l border-t",
};

type TagProps<T extends ElementType> = {
  /** The HTML element (or component) to render. Defaults to "div". */
  as?: T;
  /** Text shown in the chip. Defaults to the element's tag name. */
  label?: string;
  /** Which corner the chip sits in. */
  corner?: Corner;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

/**
 * Renders an element with a blueprint-style outline and a chip naming its HTML tag,
 * e.g. <Tag as="h1">Hello</Tag> shows a box labelled "h1".
 */
export function Tag<T extends ElementType = "div">({
  as,
  label,
  corner = "top-left",
  className = "",
  children,
  ...rest
}: TagProps<T>) {
  const Component: ElementType = as ?? "div";
  const text = label ?? (typeof Component === "string" ? Component : "component");

  return (
    <Component
      className={`group/tag relative rounded-md border border-border transition-colors hover:border-primary/60 ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute z-10 select-none border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover/tag:border-primary/60 group-hover/tag:text-primary ${cornerClasses[corner]}`}
      >
        {text}
      </span>
      {children}
    </Component>
  );
}
