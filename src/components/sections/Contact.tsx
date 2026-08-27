"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data/portfolio";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    // If no Formspree ID, simulate success for demo
    if (!formspreeId) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="relative z-[2] py-[120px] pb-20">
      <div className="mx-auto max-w-[1100px] px-6">
        <SectionHeader label="Contact" title="Let's Connect" />

        <div className="grid gap-[60px] lg:grid-cols-2">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="mb-4 text-2xl font-bold">
              Open to opportunities
            </h3>
            <p className="mb-8 leading-[1.75] text-muted">
              Whether you have a role, a project, or just want to
              connect — I&apos;d love to hear from you.
            </p>

            <div className="flex flex-col gap-2">
              {contactInfo.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                      target: "_blank" as const,
                      rel: "noopener noreferrer",
                    }
                  : {};

                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className="group flex cursor-pointer items-center gap-3.5 rounded-xl p-3 px-4 text-sm text-muted transition-all hover:bg-[var(--glow)] hover:text-foreground"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-[var(--glow)] text-lg transition-all group-hover:border-accent group-hover:shadow-[0_0_16px_var(--glow)]">
                      {item.icon}
                    </span>
                    {item.label}
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {status === "sent" ? (
              <div className="rounded-[20px] border border-border bg-card p-12 text-center">
                <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent-secondary/10 text-3xl text-accent-secondary shadow-[0_0_32px_var(--glow)]">
                  ✓
                </div>
                <h3 className="mb-2 text-xl font-bold">Message Sent!</h3>
                <p className="text-muted">
                  Thank you — I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-[14px] border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] px-5 py-[15px] text-[15px] text-foreground outline-none transition-all placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_4px_var(--glow),0_0_24px_var(--glow)]"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-[14px] border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] px-5 py-[15px] text-[15px] text-foreground outline-none transition-all placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_4px_var(--glow),0_0_24px_var(--glow)]"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="min-h-[140px] w-full resize-y rounded-[14px] border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] px-5 py-[15px] text-[15px] text-foreground outline-none transition-all placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_4px_var(--glow),0_0_24px_var(--glow)]"
                />
                <Button type="submit" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </Button>
                {status === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
