import type { ComponentPropsWithoutRef, ElementType } from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const cornerClasses: Record<Corner, string> = {
  "top-left": "top-0 left-0 border-r border-b",
  "top-right": "top-0 right-0 border-l border-b",
  "bottom-left": "bottom-0 left-0 border-r border-t",
  "bottom-right": "bottom-0 right-0 border-l border-t",
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
      className={`group/tag relative border border-line/70 transition-colors hover:border-line ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute z-10 select-none border-line/70 bg-panel px-3 py-1 font-mono text-xs text-muted transition-colors group-hover/tag:border-line group-hover/tag:text-accent-bright ${cornerClasses[corner]}`}
      >
        {text}
      </span>
      {children}
    </Component>
  );
}
