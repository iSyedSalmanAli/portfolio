"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return active;
}
