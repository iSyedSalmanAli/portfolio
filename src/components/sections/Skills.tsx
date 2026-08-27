"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { skillCategories } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section id="skills" ref={ref} className="relative z-[2] py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader label="Skills" title="Tech Stack" />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-9 inline-flex gap-1.5 rounded-[14px] border border-border bg-card p-1.5"
        >
          {skillCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(i)}
              className={cn(
                "rounded-[10px] px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                activeTab === i
                  ? "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-[0_4px_16px_var(--glow-strong)]"
                  : "text-muted hover:text-foreground"
              )}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Skills list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {skillCategories[activeTab].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-[14px] border border-border bg-card p-5 px-6 transition-all duration-300 hover:border-accent hover:shadow-[0_4px_24px_var(--glow)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[15px] font-semibold">
                    {skill.name}
                  </span>
                  <span className="font-mono text-sm font-bold text-accent">
                    {skill.level}%
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded bg-[var(--skill-bg)]">
                  <div
                    className="relative h-full rounded bg-gradient-to-r from-accent to-accent-secondary transition-[width] duration-[1.4s] ease-[cubic-bezier(.22,.61,.36,1)]"
                    style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                  >
                    <span className="absolute bottom-0 right-0 top-0 w-6 rounded bg-gradient-to-r from-transparent to-white/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
