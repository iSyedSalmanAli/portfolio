"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { scrollToSection } from "@/lib/utils";
import { siteConfig, typedTitles } from "@/data/portfolio";

export function Hero() {
  const typedText = useTypingEffect({ texts: typedTitles });

  return (
    <section
      id="hero"
      className="relative z-[2] flex min-h-screen items-center justify-center pt-20 text-center"
    >
      <div className="mx-auto max-w-[760px] px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent-secondary/20 bg-accent-secondary/[0.08] px-5 py-2 font-mono text-[13px] font-medium text-accent-secondary"
        >
          <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse-glow" />
          Currently at AKSIQ
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(36px,7vw,72px)] font-black leading-[1.08] tracking-[-3px]"
        >
          <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </motion.h1>

        {/* Typed text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-6 min-h-[36px] font-mono text-[clamp(16px,2.5vw,24px)] font-medium text-accent"
        >
          {">"} {typedText}
          <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-blink bg-accent align-text-bottom" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mb-10 max-w-[560px] text-[17px] leading-[1.8] text-muted"
        >
          Software Engineer &amp; Cloud Team Lead building scalable backend
          systems and AWS infrastructure. MS Data Science candidate at FAST NUCES.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-3.5"
        >
          <Button onClick={() => scrollToSection("projects")}>
            Explore Work ↗
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("contact")}>
            Say Hello
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted">
        <div className="relative h-12 w-px overflow-hidden bg-border">
          <span className="absolute left-0 top-[-50%] h-1/2 w-full animate-scroll-line bg-gradient-to-b from-accent to-accent-secondary" />
        </div>
        <span className="text-[11px] uppercase tracking-[2px]">Scroll</span>
      </div>
    </section>
  );
}
