"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="font-mono text-xs font-semibold uppercase tracking-[4px] text-accent mb-2.5">
        {label}
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[42px] mb-4">
        {title}
      </h2>
      <div className="h-[3px] w-[60px] rounded-full bg-gradient-to-r from-accent to-accent-secondary mb-12" />
    </motion.div>
  );
}
