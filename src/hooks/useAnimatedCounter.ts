"use client";

import { useEffect, useState } from "react";
import { easeOutCubic } from "@/lib/utils";

interface UseAnimatedCounterOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useAnimatedCounter({
  end,
  duration = 1800,
  enabled = false,
}: UseAnimatedCounterOptions): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      setCount(Math.round(end * easeOutCubic(elapsed)));
      if (elapsed < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, duration, enabled]);

  return count;
}
