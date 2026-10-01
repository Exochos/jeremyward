import { Tag } from "./Tag";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

export function Navbar() {
  return (
    <Tag
      as="header"
      corner="bottom-right"
      label="nav"
      className="sticky top-4 z-20 flex items-center justify-between bg-card/90 px-5 py-4 backdrop-blur"
    >
      <a href="#top" className="font-mono text-sm text-foreground hover:text-primary" data-track="nav:home">
        jeremy<span className="text-accent">.</span>ward
      </a>
      <nav className="mr-16 flex items-center gap-6 text-sm">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden text-muted-foreground hover:text-primary sm:inline"
            data-track={`nav:${link.label.toLowerCase()}`}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="rounded-md bg-primary px-5 py-1.5 font-medium text-primary-foreground hover:bg-primary/85"
          data-track="nav:contact"
        >
          Contact
        </a>
      </nav>
    </Tag>
  );
}
