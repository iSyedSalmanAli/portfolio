import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-[14px] px-9 py-[15px] text-[15px] font-semibold transition-all duration-300",
        "hover:-translate-y-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "primary" &&
          "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-[0_4px_24px_var(--glow-strong)] hover:shadow-[0_12px_40px_var(--glow-strong)]",
        variant === "ghost" &&
          "border-[1.5px] border-border text-foreground hover:border-accent hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
