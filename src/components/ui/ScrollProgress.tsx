"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[200] h-[3px] bg-gradient-to-r from-accent to-accent-secondary shadow-[0_0_12px_var(--accent)] transition-[width] duration-100"
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
