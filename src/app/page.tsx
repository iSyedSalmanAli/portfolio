"use client";

import { useCallback } from "react";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
    document.documentElement.style.setProperty("--my", `${e.clientY}px`);
  }, []);

  return (
    <main onMouseMove={handleMouseMove}>
      <ScrollProgress />
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
