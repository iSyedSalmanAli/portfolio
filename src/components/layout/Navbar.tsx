"use client";

import { useTheme } from "next-themes";
import { cn, scrollToSection } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navItems } from "@/data/portfolio";
import { useMemo } from "react";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav
      className="fixed left-1/2 top-4 z-[150] -translate-x-1/2 rounded-2xl border border-border bg-[var(--nav-bg)] p-1.5 shadow-xl backdrop-blur-2xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "relative overflow-hidden rounded-[10px] px-4 py-2 text-[13px] font-medium transition-all duration-300",
              activeSection === item.id
                ? "text-white"
                : "text-muted hover:text-foreground"
            )}
            aria-current={activeSection === item.id ? "true" : undefined}
          >
            {activeSection === item.id && (
              <span className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-accent to-accent-secondary shadow-[0_4px_16px_var(--glow-strong)]" />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          className="ml-1 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border bg-card text-base transition-all duration-400 hover:rotate-180 hover:border-accent"
          aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        >
          {resolvedTheme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
