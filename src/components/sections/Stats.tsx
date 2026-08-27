"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { stats } from "@/data/portfolio";
import type { Stat } from "@/types";

function StatCard({ stat, index, isVisible }: { stat: Stat; index: number; isVisible: boolean }) {
  const count = useAnimatedCounter({ end: stat.value, enabled: isVisible });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 text-center transition-all duration-400 hover:-translate-y-1"
    >
      {/* Gradient border on hover */}
      <span className="absolute inset-[-1px] z-0 rounded-2xl bg-gradient-to-r from-accent to-accent-secondary opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="relative z-[1] rounded-[14px] bg-card p-1 transition-all">
        <p className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text font-mono text-[40px] font-extrabold tracking-[-2px] text-transparent">
          {count}
          {stat.suffix}
        </p>
        <p className="mt-1 text-[13px] font-medium text-muted">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export function Stats() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section id="stats" ref={ref} className="relative z-[2]">
      <div className="mx-auto max-w-[1100px] px-6 pt-[60px]">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
