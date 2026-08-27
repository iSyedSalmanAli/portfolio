"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/data/portfolio";

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
};

export function About() {
  return (
    <section id="about" className="relative z-[2] py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader label="About Me" title="Developer & Creator" />

        <div className="grid items-center gap-[60px] lg:grid-cols-2">
          {/* Text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-base leading-[1.85] text-muted"
          >
            <p className="mb-4">
              I&apos;m a{" "}
              <strong className="font-semibold text-foreground">
                Software Engineer &amp; Cloud Team Lead
              </strong>{" "}
              at AKSIQ with 3+ years of experience architecting{" "}
              <strong className="font-semibold text-foreground">
                AWS-based infrastructure
              </strong>{" "}
              and scalable backend systems.
            </p>
            <p className="mb-4">
              I specialize in{" "}
              <strong className="font-semibold text-foreground">
                Python
              </strong>{" "}
              (Django, Flask, FastAPI),{" "}
              <strong className="font-semibold text-foreground">CI/CD pipeline integration</strong>,
              cloud security, and performance optimization. I also work with{" "}
              <strong className="font-semibold text-foreground">data engineering</strong>{" "}
              tools like Apache Airflow and Dagster.
            </p>
            <p>
              Currently pursuing my{" "}
              <strong className="font-semibold text-foreground">
                Master&apos;s in Data Science
              </strong>{" "}
              at FAST NUCES while leading a cross-functional engineering team
              and mentoring junior developers.
            </p>
          </motion.div>

          {/* Terminal */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)] shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] bg-[var(--terminal-header)] px-[18px] py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="flex-1 text-center font-mono text-xs text-[#64748b]">
                  salman.config.ts
                </span>
              </div>
              {/* Code body */}
              <div className="p-6 font-mono text-[13px] leading-[2] text-[#c9d1d9]">
                <span className="text-[#546178] italic">
                  {"// who is salman?"}
                </span>
                <br />
                <span className="text-[#c084fc]">const</span>{" "}
                <span className="text-[#79c0ff]">engineer</span>{" "}
                <span className="text-[#ff7b72]">=</span>{" "}
                <span className="text-[#8b949e]">{"{"}</span>
                <br />
                {"  "}name<span className="text-[#ff7b72]">:</span>{" "}
                <span className="text-[#56d364]">&quot;Syed Salman Ali&quot;</span>,
                <br />
                {"  "}role<span className="text-[#ff7b72]">:</span>{" "}
                <span className="text-[#56d364]">&quot;Cloud Team Lead&quot;</span>,
                <br />
                {"  "}company<span className="text-[#ff7b72]">:</span>{" "}
                <span className="text-[#56d364]">&quot;AKSIQ&quot;</span>,
                <br />
                {"  "}stack<span className="text-[#ff7b72]">:</span> [
                <span className="text-[#56d364]">&quot;Python&quot;, &quot;AWS&quot;, &quot;Docker&quot;</span>],
                <br />
                {"  "}education<span className="text-[#ff7b72]">:</span>{" "}
                <span className="text-[#56d364]">&quot;MS Data Science&quot;</span>,
                <br />
                {"  "}location<span className="text-[#ff7b72]">:</span>{" "}
                <span className="text-[#56d364]">&quot;Karachi, PK&quot;</span>,
                <br />
                <span className="text-[#8b949e]">{"}"}</span>;
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
