import { siteConfig } from "@/data/portfolio";

const footerLinks = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
];

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-border py-8 text-center">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-3.5 flex justify-center gap-7">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-[13px] font-medium text-muted transition-colors hover:text-accent"
            >
              {link.label}
              <span className="absolute -bottom-[3px] left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-secondary transition-[width] duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <p className="text-[13px] text-muted">
          © {new Date().getFullYear()} {siteConfig.name} — Crafted with code &
          caffeine
        </p>
      </div>
    </footer>
  );
}
