"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      if (shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--glow) 0%, transparent 60%)`;
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    }
    if (shineRef.current) {
      shineRef.current.style.background = "transparent";
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-border bg-card p-8 transition-shadow duration-400 hover:shadow-[0_20px_50px_var(--glow)]"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.4s ease, box-shadow 0.4s" }}
      >
        {/* Shine overlay */}
        <div
          ref={shineRef}
          className="pointer-events-none absolute inset-0 rounded-[20px] transition-[background] duration-300"
          aria-hidden="true"
        />

        {/* Arrow */}
        <span className="absolute right-7 top-7 text-xl text-border transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
          ↗
        </span>

        <div className="relative z-[1]">
          <div className="mb-4 text-[40px] drop-shadow-lg">{project.icon}</div>
          <h3 className="mb-2.5 text-xl font-bold">{project.title}</h3>
          <p className="mb-4 text-sm leading-[1.7] text-muted">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-accent/10 bg-[var(--glow)] px-3.5 py-1 font-mono text-xs font-semibold text-accent transition-all hover:-translate-y-0.5 hover:bg-[var(--glow-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-[2] py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader label="Projects" title="Featured Work" />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
