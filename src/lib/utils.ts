import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Smoothly scroll to a section by ID
 */
export function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Easing function for animated counters (ease-out cubic)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
