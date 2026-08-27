"use client";

import { useEffect, useRef, useState } from "react";

interface UseTypingEffectOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypingEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypingEffectOptions): string {
  const [displayText, setDisplayText] = useState("");
  const textIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    if (texts.length === 0) return;

    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentText = texts[textIdx.current];

      if (!isDeleting.current) {
        charIdx.current++;
        setDisplayText(currentText.substring(0, charIdx.current));

        if (charIdx.current === currentText.length) {
          isDeleting.current = true;
          timeoutId = setTimeout(tick, pauseDuration);
          return;
        }
      } else {
        charIdx.current--;
        setDisplayText(currentText.substring(0, charIdx.current));

        if (charIdx.current === 0) {
          isDeleting.current = false;
          textIdx.current = (textIdx.current + 1) % texts.length;
        }
      }

      timeoutId = setTimeout(
        tick,
        isDeleting.current ? deletingSpeed : typingSpeed
      );
    };

    timeoutId = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutId);
  }, [texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}
