"use client";

// Contact form: set NEXT_PUBLIC_FORMSPREE_ID in .env.local (the id from your
// Formspree endpoint, e.g. "xyzabcd"). Without it the form falls back to
// opening the visitor's mail client instead of pretending to send.

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type FormEvent,
} from "react";

function useTypingEffect(texts: string[], speed = 85, delSpeed = 42, pause = 2400) {
  const [display, setDisplay] = useState("");
  const idx = useRef(0); const ch = useRef(0); const del = useRef(false);
  useEffect(() => {
    if (!texts.length) return; let t: NodeJS.Timeout;
    const tick = () => {
      const cur = texts[idx.current];
      if (!del.current) { ch.current++; setDisplay(cur.substring(0, ch.current)); if (ch.current === cur.length) { del.current = true; t = setTimeout(tick, pause); return; } }
      else { ch.current--; setDisplay(cur.substring(0, ch.current)); if (ch.current === 0) { del.current = false; idx.current = (idx.current + 1) % texts.length; } }
      t = setTimeout(tick, del.current ? delSpeed : speed);
    };
    t = setTimeout(tick, 800); return () => clearTimeout(t);
  }, [texts, speed, delSpeed, pause]); return display;
}

/* ---------------------------------------------------------------- icons */

const ICON = { width: 16, height: 16, viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" } as const;
const LINE = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const MailIcon = () => (
  <svg {...ICON} {...LINE}><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="m3.2 7 8.2 5.5a2 2 0 0 0 2.2 0L21.8 7" /></svg>
);
const PinIcon = () => (
  <svg {...ICON} {...LINE}><path d="M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10.5" r="2.8" /></svg>
);
const LinkedInIcon = () => (
  <svg {...ICON} fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
);
const GitHubIcon = () => (
  <svg {...ICON} fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58l-.01-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.36.81 1.1.81 2.22l-.01 3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3Z" /></svg>
);
const SunIcon = () => (
  <svg {...ICON} width={17} height={17} {...LINE}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.6v2M12 19.4v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.6 12h2M19.4 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
);
const MoonIcon = () => (
  <svg {...ICON} width={17} height={17} {...LINE}><path d="M20.8 13.2A8.6 8.6 0 1 1 10.8 3.2a6.9 6.9 0 0 0 10 10Z" /></svg>
);

/* ----------------------------------------------------------------- data */

const TYPED = ["Cloud Team Lead", "AWS Infrastructure", "Backend Engineering", "DevOps & CI/CD"];
const EMAIL = "i.syedsalmanali@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/isyedsalmanali";
const GITHUB = "https://github.com/iSyedSalmanAli";

const PROJECTS = [
  { num: "01", title: "Multi-Region AWS Infrastructure", desc: "Designed and managed production infrastructure across 3 AWS regions (Virginia, Ohio, Singapore) for a license-based enterprise platform serving 22+ clients. Provisioned 20+ EC2 instances, 7 ECS clusters, and 9 RDS databases with per-client isolation across SaaS, on-premises, and Linux deployments.", tags: ["AWS", "EC2", "ECS", "RDS", "Multi-Region"] },
  { num: "02", title: "CI/CD & DevOps Automation", desc: "Architected 7 production CI/CD pipelines using AWS CodePipeline, CodeCommit, and CodeBuild with containerized deployments via ECS. Achieved and maintained 100% pipeline success rate across all microservices including APIs, data bots, forex, commodities, and search.", tags: ["CodePipeline", "CodeCommit", "Docker", "ECS"] },
  { num: "03", title: "GPU & AI/ML Infrastructure", desc: "Provisioned and managed GPU compute instances (NVIDIA L40S, A100) for ML model training and inference workloads. Integrated SageMaker for model lifecycle management and built automated training pipelines with EDA, model selection, and canary fallback strategies.", tags: ["GPU", "SageMaker", "L40S", "A100"] },
  { num: "04", title: "Data, Caching & Search Layer", desc: "Managed 9 RDS database instances (PostgreSQL and SQL Server) across multiple regions. Deployed OpenSearch clusters handling 2+ TiB of searchable data, ElastiCache (Valkey) for production caching, and 22+ S3 buckets for backups, Terraform state, and CloudTrail audit logs.", tags: ["PostgreSQL", "OpenSearch", "ElastiCache", "Terraform"] },
];

const SKILLS: Record<string, string[]> = {
  "Cloud & AWS": ["EC2", "ECS", "Fargate", "RDS", "S3", "CloudWatch", "CloudTrail", "OpenSearch", "ElastiCache", "IAM", "VPC", "Security Groups", "Load Balancing"],
  "DevOps & CI/CD": ["CodePipeline", "CodeBuild", "CodeCommit", "Docker", "Terraform", "Linux", "Git", "Infrastructure as Code"],
  "Backend & APIs": ["Python", "Django", "Flask", "FastAPI", "PostgreSQL", "SQL Server", "REST APIs", "API Design", "Unit Testing"],
  "Automation & Scraping": ["Playwright", "Selenium", "Web Scraping", "AI Automation", "Bot Development", "Scheduled Jobs"],
  "AI & LLM Integration": ["OpenRouter", "OpenAI API", "Anthropic API", "Prompt Engineering", "Embeddings", "RAG", "LLM Cost Optimization"],
  "ML & Data": ["TensorFlow", "PyTorch", "SageMaker", "Hugging Face", "Airflow", "Dagster", "Pandas", "Data Visualization"],
};

const EXPERIENCE = [
  { role: "Cloud Team Lead", period: "Jul 2025 – Present", desc: "Leading cross-functional team in designing and deploying AWS infrastructure. Overseeing cloud security, performance optimization, and cost management across 3 regions." },
  { role: "Senior Cloud Engineer", period: "Mid 2024 – Jun 2025", desc: "Architected multi-region deployments, GPU infrastructure for ML workloads, and managed 7 CI/CD pipelines with 100% success rate." },
  { role: "Associate Software Engineer", period: "Oct 2022 – Mid 2024", desc: "Developed scalable APIs using Django, Flask, and FastAPI. Built automated web scraping bots and optimized backend performance." },
  { role: "Junior Software Engineer", period: "Jul 2022 – Sep 2022", desc: "Assisted in backend development using Python frameworks. Gained foundational experience with Flask, Django, and RESTful services." },
];

type Cert = { name: string; issuer: string; meta: string; state: "active" | "planned" | "done"; href?: string };
const CERT_GROUPS: { group: string; items: Cert[] }[] = [
  {
    group: "Cloud & Infrastructure",
    items: [
      // Add `href` with your credential/verification URL to make the title a link.
      { name: "AWS Certified Solutions Architect – Associate (SAA-C03)", issuer: "Amazon Web Services", meta: "Targeting Dec 2026", state: "active" },
      { name: "AWS Certified Cloud Practitioner (CLF-C02)", issuer: "Amazon Web Services", meta: "2026", state: "done" },
    ],
  },
  {
    group: "AI & Agentic Systems",
    items: [
      { name: "Claude Certification Program", issuer: "Anthropic and Pearson, 4 tracks", meta: "Starts Oct 2026", state: "planned" },
      { name: "Developer Track", issuer: "Anthropic Academy", meta: "50% complete", state: "active" },
      { name: "Developing AI Systems with the OpenAI API", issuer: "DataCamp", meta: "2025", state: "done" },
      { name: "Introduction to Embeddings with the OpenAI API", issuer: "DataCamp", meta: "2025", state: "done" },
      { name: "ChatGPT Prompt Engineering for Developers", issuer: "DataCamp", meta: "2024", state: "done" },
      { name: "Working with the OpenAI API", issuer: "DataCamp", meta: "2024", state: "done" },
    ],
  },
  {
    group: "Software & Data",
    items: [
      { name: "The Complete Guide to Becoming a Software Architect", issuer: "Udemy", meta: "2026", state: "done" },
      { name: "Industrial Data Science Certification", issuer: "NED University of Engineering and Technology", meta: "2021", state: "done" },
      { name: "Python A to Z: Python For Data Science", issuer: "Udemy", meta: "2020", state: "done" },
    ],
  },
];

const EDUCATION = [
  { degree: "MS Data Science", school: "FAST NUCES", detail: "CGPA 3.22", meta: "Final semester", state: "active" as const },
  { degree: "BS Computer Science", school: "Mohammad Ali Jinnah University (MAJU)", detail: "CGPA 3.27", meta: "2022", state: "done" as const },
];

const PERSONAL_PROJECTS: { name: string; desc: string; stack: string; meta?: string; href?: string }[] = [
  { name: "Autonomic Disease Diagnostics System for Chest Radiographs", desc: "A CNN based deep learning system that classifies chest x rays into COVID 19, pneumonia, and tuberculosis. Built the full pipeline covering data acquisition, augmentation, cleaning, and model training, then wrapped it in a web application where users upload an x ray and get a prediction back.", stack: "Python, TensorFlow, CNN, Flask, React, MySQL", meta: "Final year project, 2022" },
  { name: "Prodigy Chain", desc: "Automated large scale web scraping with structured data pipelines for real time data monitoring across multiple sources.", stack: "Python, Web Scraping, ETL Pipelines" },
  { name: "OppoZone", desc: "Backend for a social content sharing platform with dynamic comment threads and reaction systems.", stack: "Django, PostgreSQL, REST APIs" },
  { name: "Google Profile App Analytics", desc: "A data driven dashboard that evaluates app trends and user engagement patterns across demographics.", stack: "Python, Pandas, Data Visualization" },
  { name: "Major Earnings Visualizer", desc: "Analysis and visualization of employment rates and median salary distribution across academic majors.", stack: "Python, Pandas, Matplotlib" },
];

const RESEARCH = {
  title: "A Blockchain Integrated Multi Agent Framework for Real Time Cyber Threat Detection and Autonomous Response in Manufacturing Supply Chains",
  status: "Under review",
  problem: "Manufacturing supply chains are distributed and multi stakeholder by nature, which exposes them to business email compromise, invoice fraud, data tampering, and network intrusion. Traditional centralized detection is slow and introduces a single point of failure.",
  approach: "Four coordinated AI agents working together. A Detection agent built on CNN LSTM, a Reasoning agent using Llama 3 8B with RAG and a novel Guard and RTS hallucination bound, a Response agent running Hyperledger Fabric smart contracts, and a Trust agent using blockchain with CRYSTALS Dilithium post quantum signatures. The system is trained with Byzantine robust federated learning.",
  results: [
    { metric: "92.3%", label: "Federated accuracy" },
    { metric: "97.8%", label: "Accuracy under 30% adversarial attack" },
    { metric: "Zero", label: "LLM hallucinations above trust threshold" },
    { metric: "193 TPS", label: "Quantum safe blockchain at 5.16 ms" },
  ],
  stack: ["Python", "PyTorch", "Llama 3 8B", "RAG", "ChromaDB", "Hyperledger Fabric", "CRYSTALS Dilithium", "MITRE ATT&CK"],
};

/* Single source of truth for sections, nav and scroll spy.
   `navFor` maps a section that has no pill of its own onto the pill that
   should light up while it is on screen. */
type Section = { id: string; label: string; inNav: boolean; navFor?: string };
const SECTIONS: Section[] = [
  { id: "hero", label: "Home", inNav: true },
  { id: "about", label: "About", inNav: true },
  { id: "experience", label: "Experience", inNav: true },
  { id: "work", label: "Work", inNav: true },
  { id: "research", label: "Research", inNav: true },
  { id: "projects", label: "Projects", inNav: true },
  { id: "skills", label: "Skills", inNav: true },
  { id: "certifications", label: "Certifications", inNav: true },
  { id: "education", label: "Education", inNav: true },
  { id: "contact", label: "Contact", inNav: true },
];
const NAV = SECTIONS.filter(s => s.inNav);
const SECTION_IDS = SECTIONS.map(s => s.id);
const NAV_FOR: Record<string, string> = Object.fromEntries(SECTIONS.map(s => [s.id, s.navFor ?? s.id]));

// Next replaces the literal process.env.NEXT_PUBLIC_FORMSPREE_ID at build
// time. The typeof guard keeps the file from throwing if it is ever loaded
// outside a bundler (a preview sandbox has no `process`).
const FORMSPREE_ID =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_FORMSPREE_ID : undefined;

function Row({ callout, children, id }: { callout: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="content-row" aria-labelledby={id ? `${id}-h` : undefined}>
      <p className="row-callout">{callout}</p>
      <div>{children}</div>
    </section>
  );
}

type SendStatus = "idle" | "sending" | "sent" | "error" | "mailto";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [width, setWidth] = useState(1280);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [bot, setBot] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errMsg, setErrMsg] = useState("");
  const typed = useTypingEffect(TYPED);

  /* theme: restore the visitor's choice, else follow the OS */
  useEffect(() => {
    let initial = true;
    try {
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") initial = stored === "dark";
      else initial = !window.matchMedia("(prefers-color-scheme: light)").matches;
    } catch { /* storage blocked - fall back to dark */ }
    setDark(initial);
    setMounted(true);
    // The page renders a placeholder until this runs, so the document is short
    // at restore time and the browser would restore to a meaningless offset.
    // Land at the top (or at the requested hash, handled below) instead.
    try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch { /* ignore */ }
  }, []);

  const toggleTheme = useCallback(() => {
    setDark(prev => {
      const next = !prev;
      try { window.localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* ignore */ }
      if (typeof document !== "undefined") document.documentElement.dataset.theme = next ? "dark" : "light";
      return next;
    });
  }, []);

  /* viewport size, throttled to one update per frame */
  useEffect(() => {
    let raf = 0;
    const apply = () => { raf = 0; setWidth(window.innerWidth); };
    const onResize = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, []);

  /* scroll spy over every section, not just the ones with a nav pill */
  useEffect(() => {
    if (!mounted) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
        setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
        return;
      }
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  /* keep the page background (and native form/scrollbar colours) in sync */
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.dataset.theme = dark ? "dark" : "light";
    root.style.background = dark ? "#060a11" : "#f8f9fb";
    root.style.colorScheme = dark ? "dark" : "light";
  }, [dark, mounted]);

  useEffect(() => { if (!menuOpen) return; const close = () => setMenuOpen(false); document.addEventListener("click", close); return () => document.removeEventListener("click", close); }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setMenuOpen(false);
  }, []);

  /* deep link support: /#research etc. */
  useEffect(() => {
    if (!mounted) return;
    const id = window.location.hash.replace("#", "");
    if (id && SECTION_IDS.includes(id)) {
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "auto" }), 60);
      return () => clearTimeout(t);
    }
  }, [mounted]);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bot) return; // honeypot tripped, silently drop
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
      const body = encodeURIComponent(`${form.msg}\n\n— ${form.name}\n${form.email}`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.msg, _subject: `Portfolio enquiry from ${form.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm({ name: "", email: "", msg: "" });
    } catch {
      setStatus("error");
      setErrMsg(`That didn't go through. Please email me directly at ${EMAIL}.`);
    }
  }, [bot, form]);

  const c = dark ? {
    bg: "#060a11", card: "#0e1528", border: "#162040",
    text: "#94a3be", heading: "#e2eaf5", muted: "#6b82a6",
    accent: "#5b9ef5", accent2: "#3dd9a0", danger: "#f87171",
    nav: "rgba(6,10,17,0.88)", menuBg: "rgba(6,10,17,0.96)",
    input: "#0f1a2e", inputBorder: "#1c3358",
    tag: "rgba(91,158,245,0.06)", tagBorder: "rgba(91,158,245,0.10)", tagText: "#6a9ee0",
    focus: "rgba(91,158,245,0.2)", bgRgb: "6,10,17",
  } : {
    bg: "#f8f9fb", card: "#ffffff", border: "#e2e7ef",
    text: "#5c6a7e", heading: "#131a28", muted: "#666f83",
    accent: "#3068d0", accent2: "#0e9060", danger: "#c02626",
    nav: "rgba(248,249,251,0.9)", menuBg: "rgba(248,249,251,0.96)",
    input: "#eff2f7", inputBorder: "#cdd4e0",
    tag: "rgba(48,104,208,0.04)", tagBorder: "rgba(48,104,208,0.08)", tagText: "#4072b8",
    focus: "rgba(48,104,208,0.15)", bgRgb: "248,249,251",
  };

  // Transparent so the boot background painted in layout.tsx shows through:
  // no dark flash for visitors on the light theme.
  if (!mounted) return <div style={{ height: "100vh", background: "transparent" }} />;

  const mono = "var(--font-geist-mono), ui-monospace, monospace";
  const sans = "var(--font-geist-sans), system-ui, sans-serif";
  const maxW = 880;
  const isMobile = width < 640;
  const twoCol = width >= 1024;
  const compactNav = width < 1024; // 8 pills do not fit below this
  const pad = isMobile ? "0 20px" : "0 32px";
  const sGap = isMobile ? 72 : 104;

  const css = `
    *{margin:0;padding:0;box-sizing:border-box}
    ::selection{background:${c.accent};color:#fff}
    a{position:relative;color:${c.accent};text-decoration:none;transition:color 0.18s ease}
    *:focus-visible{outline:2px solid ${c.accent};outline-offset:3px;border-radius:4px}
    .blink{animation:blink 1s step-end infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes sld{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
    h1,h2,h3{text-wrap:balance}

    /* The document itself scrolls. A height:100vh + overflow-y:auto wrapper
       breaks the browser's scroll restoration (a refresh mid-page landed the
       window past the end of the body and showed a blank screen) and fights
       the mobile URL bar. */
    .shell{min-height:100vh;min-height:100dvh;overflow-x:hidden}

    /* The floating nav only blurs what sits inside its own pill, so text
       scrolling past it above and to either side stayed sharp. This strip
       spans the full width behind the pill and fades out downwards, so
       content dissolves as it reaches the top instead of being cut off. */
    .top-fade{position:fixed;top:0;left:0;right:0;height:104px;z-index:149;pointer-events:none;
      backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);
      background:linear-gradient(to bottom,rgba(${c.bgRgb},0.86) 34%,rgba(${c.bgRgb},0) 100%);
      -webkit-mask-image:linear-gradient(to bottom,#000 58%,transparent 100%);
      mask-image:linear-gradient(to bottom,#000 58%,transparent 100%)}
    .vh{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
    .skip{position:fixed;top:-120px;left:16px;z-index:200;padding:10px 16px;border-radius:10px;background:${c.accent};color:#fff;font-size:13px;font-weight:600;transition:top 0.18s ease}
    .skip:focus{top:12px}

    .content-row{padding-bottom:${sGap}px;scroll-margin-top:88px;display:${twoCol ? "grid" : "block"};grid-template-columns:140px minmax(0,1fr);gap:40px;align-items:start}
    .row-callout{font-family:${mono};font-size:13px;font-weight:400;color:${c.muted};margin-bottom:${twoCol ? 0 : 20}px;position:${twoCol ? "sticky" : "static"};top:88px}

    .hb{display:flex;flex-direction:column;gap:5px;padding:12px;cursor:pointer;border:none;background:transparent;border-radius:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;transition:background-color 0.18s ease}
    .hb span{display:block;width:18px;height:1.5px;background:${c.heading};border-radius:1px;transition:transform 0.2s ease,opacity 0.2s ease}
    .hb.op span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
    .hb.op span:nth-child(2){opacity:0}
    .hb.op span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
    .mm{position:fixed;top:56px;left:0;right:0;background:${c.menuBg};backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};z-index:149;animation:sld 0.15s ease;padding:4px 0;max-height:calc(100vh - 56px);overflow-y:auto}
    .mm button{display:block;width:100%;text-align:left;padding:14px 24px;background:transparent;border:none;color:${c.muted};font-size:15px;font-weight:450;font-family:${sans};cursor:pointer;min-height:44px;transition:background-color 0.18s ease,color 0.18s ease}
    .mm button.ac{color:${c.accent}}

    .proj{position:relative;display:flex;flex-direction:column;padding:${isMobile ? "18px 18px 18px 20px" : "22px 26px 22px 28px"};border:1px solid ${c.border};border-radius:14px;background:transparent;transition:border-color 0.18s ease,background-color 0.18s ease,box-shadow 0.18s ease}
    .proj::before{content:'';position:absolute;top:14px;bottom:14px;left:0;width:3px;background:${c.accent};border-radius:0 2px 2px 0;opacity:0;transform:scaleY(0);transform-origin:center;pointer-events:none;transition:opacity 0.18s ease,transform 0.2s ease}
    .proj h3,.exp-row h3{color:${c.heading};transition:color 0.18s ease}

    .tag{display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-family:${mono};color:${c.tagText};background:${c.tag};border:1px solid ${c.tagBorder};font-weight:500;letter-spacing:0.01em;transition:border-color 0.18s ease,color 0.18s ease,background-color 0.18s ease}

    .exp-row{position:relative;padding:${isMobile ? "16px 0" : "18px 0"};border-bottom:1px solid ${c.border};transition:background-color 0.18s ease}
    .exp-row::before{content:'';position:absolute;left:-10px;top:${isMobile ? "16px" : "18px"};bottom:${isMobile ? "16px" : "18px"};width:2px;background:${c.accent};opacity:0;transform:scaleY(0.4);transform-origin:center;border-radius:1px;pointer-events:none;transition:opacity 0.18s ease,transform 0.2s ease}
    .exp-row:last-child{border-bottom:none}
    /* Mobile only: two rows that scroll sideways, so a long list costs two
       card-heights of page instead of ten. Bleeds to the screen edges and
       keeps a sliver of the next card visible so the swipe is discoverable. */
    .hscroll{display:grid;grid-auto-flow:column;grid-template-rows:repeat(2,1fr);grid-auto-columns:82vw;gap:10px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;margin:0 -20px;padding:2px 20px 12px;scrollbar-width:none}
    .hscroll::-webkit-scrollbar{display:none}
    .hscroll > *{scroll-snap-align:start;min-width:0}
    .hscroll.one-row{grid-template-rows:1fr}
    .swipe-hint{display:flex;align-items:center;gap:6px;font-family:${mono};font-size:11px;color:${c.muted};margin-bottom:10px}
    .swipe-hint::after{content:'';flex:1;height:1px;background:linear-gradient(to right,${c.border},transparent)}

    .cert-card{display:flex;flex-direction:column;justify-content:center;gap:3px;padding:12px 14px;border:1px solid ${c.border};border-radius:12px;background:transparent;transition:border-color 0.18s ease}
    .clamp{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}
    .clamp-2{-webkit-line-clamp:2}
    .clamp-3{-webkit-line-clamp:3}
    .more-btn{background:transparent;border:none;padding:0;margin-top:2px;font:inherit;font-size:13px;font-weight:500;color:${c.accent};cursor:pointer;font-family:${sans}}

    .edu-row{position:relative;padding:13px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;transition:background-color 0.18s ease}
    .row-title{color:${c.heading};font-size:14px;font-weight:450;display:block;transition:color 0.18s ease}
    .row-sub{font-family:${mono};font-size:11px;color:${c.muted};display:block;margin-top:2px}
    .row-meta{font-family:${mono};font-size:11px;flex-shrink:0;padding-top:1px}

    .ci{display:flex;align-items:center;gap:14px;padding:10px 12px;margin:0 -12px;border-radius:10px;color:${c.text};text-decoration:none;min-height:44px;transition:background-color 0.18s ease,color 0.18s ease}
    .ci svg{flex-shrink:0;color:${c.muted};transition:color 0.18s ease}
    .btn-primary{transition:opacity 0.18s ease,transform 0.12s ease}
    .btn-primary[disabled]{opacity:0.6;cursor:progress}
    .nav-pill{background:transparent;color:${c.muted};transition:background-color 0.18s ease,color 0.18s ease,transform 0.12s ease}
    .nav-pill.active{background:${c.accent};color:#fff}
    .theme-btn{background:transparent;transition:background-color 0.18s ease,transform 0.12s ease}
    .footer-link{color:${c.muted};transition:color 0.18s ease}
    .btn-secondary{transition:border-color 0.18s ease,color 0.18s ease,transform 0.12s ease}

    a:not(.ci):not(.nav-pill):not(.btn-primary):not(.btn-secondary):not(.skip)::after{content:'';position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;pointer-events:none;transition:transform 0.18s ease}

    @media (hover:hover) and (pointer:fine){
      a:hover{color:${c.heading}}
      .proj:hover{border-color:${dark ? "rgba(91,158,245,0.42)" : "rgba(48,104,208,0.34)"};background:${c.card};box-shadow:0 6px 20px ${dark ? "rgba(0,0,0,0.16)" : "rgba(19,26,40,0.05)"}}
      .proj:hover::before{opacity:1;transform:scaleY(1)}
      .proj:hover h3,.exp-row:hover h3,.edu-row:hover .row-title{color:${c.accent}}
      .tag:hover{border-color:${dark ? "rgba(91,158,245,0.28)" : "rgba(48,104,208,0.24)"};color:${c.accent};background:${dark ? "rgba(91,158,245,0.10)" : "rgba(48,104,208,0.07)"}}
      .exp-row:hover,.edu-row:hover{background:${c.tag}}
      .exp-row:hover::before{opacity:1;transform:scaleY(1)}
      .ci:hover{background:${c.tag};color:${c.heading}}
      .ci:hover svg{color:${c.accent}}
      .btn-primary:not([disabled]):hover{opacity:0.88}
      .nav-pill:not(.active):hover{color:${c.heading};background:${c.tag}}
      .theme-btn:hover,.hb:hover,.mm button:hover{background:${c.tag}}
      .mm button:not(.ac):hover{color:${c.heading}}
      .footer-link:hover{color:${c.accent}}
      .btn-secondary:hover{border-color:${c.accent};color:${c.accent}}
      a:not(.ci):not(.nav-pill):not(.btn-primary):not(.btn-secondary):not(.skip):hover::after{transform:scaleX(1)}
    }

    .ci:focus-visible{background:${c.tag};color:${c.heading}}
    .theme-btn:focus-visible,.hb:focus-visible,.mm button:focus-visible,.mm button:active{background:${c.tag}}
    .nav-pill:not(.active):focus-visible{background:${c.tag};color:${c.heading}}
    .footer-link:focus-visible{color:${c.accent}}
    a:not(.ci):not(.nav-pill):not(.btn-primary):not(.btn-secondary):not(.skip):focus-visible::after{transform:scaleX(1)}
    .btn-primary:active,.btn-secondary:active{transform:scale(0.98)}
    .nav-pill:active,.theme-btn:active{transform:scale(0.96)}
    input,textarea{transition:border-color 0.18s ease,box-shadow 0.18s ease}
    input:focus,textarea:focus{border-color:${c.accent} !important;box-shadow:0 0 0 3px ${c.focus} !important;outline:none}
    input::placeholder,textarea::placeholder{color:${c.muted}}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${c.border};border-radius:2px}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}.btn-primary:active,.btn-secondary:active,.nav-pill:active,.theme-btn:active{transform:none}}
  `;

  const activeNav = NAV_FOR[activeSection] ?? activeSection;
  const h2 = { fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em" } as const;
  const field = { width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${c.inputBorder}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", minHeight: 44 } as const;

  const CONTACT_ITEMS = [
    { icon: <MailIcon />, label: EMAIL, href: `mailto:${EMAIL}`, external: false },
    { icon: <PinIcon />, label: "Karachi, Pakistan" },
    { icon: <LinkedInIcon />, label: "LinkedIn", href: LINKEDIN, external: true },
    { icon: <GitHubIcon />, label: "GitHub", href: GITHUB, external: true },
  ];

  return (
    <div className="shell" style={{ background: c.bg, color: c.text, fontFamily: sans, fontSize: 15, lineHeight: 1.7, transition: "background 0.3s, color 0.3s", WebkitFontSmoothing: "antialiased" }}>
      <style>{css}</style>

      <a href="#main" className="skip" onClick={e => { e.preventDefault(); scrollTo("hero"); }}>Skip to content</a>

      {!compactNav && <div className="top-fade" aria-hidden="true" />}

      {compactNav ? (
        <>
          <nav aria-label="Main" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, borderBottom: `1px solid ${c.border}`, padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: c.accent, letterSpacing: "0.04em" }}>SSA</span>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button type="button" className="theme-btn" style={{ border: "none", color: c.heading, width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }} onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button type="button" className={`hb ${menuOpen ? "op" : ""}`} onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }} aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-menu">
                <span /><span /><span />
              </button>
            </div>
          </nav>
          {menuOpen && (
            <div id="mobile-menu" className="mm" onClick={e => e.stopPropagation()}>
              {SECTIONS.map(s => (
                <button type="button" key={s.id} className={activeSection === s.id ? "ac" : ""} onClick={() => scrollTo(s.id)} aria-current={activeSection === s.id ? "true" : undefined}>{s.label}</button>
              ))}
            </div>
          )}
        </>
      ) : (
        <nav aria-label="Main" style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, border: `1px solid ${c.border}`, borderRadius: 12, padding: "4px 5px", display: "flex", gap: 2, alignItems: "center", maxWidth: "calc(100vw - 32px)" }}>
          {NAV.map(s => (
            <button type="button" key={s.id} className={activeNav === s.id ? "nav-pill active" : "nav-pill"} style={{ border: "none", fontSize: 13, fontWeight: 500, padding: "7px 13px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", minHeight: 34, whiteSpace: "nowrap" }} onClick={() => scrollTo(s.id)} aria-current={activeNav === s.id ? "page" : undefined}>{s.label}</button>
          ))}
          <div style={{ width: 1, height: 18, background: c.border, margin: "0 4px" }} />
          <button type="button" className="theme-btn" style={{ border: "none", color: c.heading, width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      )}

      <main id="main" style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>

        <section id="hero" style={{ paddingTop: compactNav ? 100 : 140, paddingBottom: sGap, scrollMarginTop: 88, display: twoCol ? "grid" : "block", gridTemplateColumns: twoCol ? "140px minmax(0,1fr)" : undefined, gap: twoCol ? 40 : undefined, alignItems: "start" }}>
          <p style={{ fontFamily: mono, fontSize: 13, color: c.muted, marginBottom: twoCol ? 0 : 20 }}>/intro</p>
          <div>
            <h1 style={{ fontSize: isMobile ? 27 : width < 1024 ? 32 : 36, fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.025em", color: c.heading, marginBottom: 12 }}>
              Cloud Team Lead building AWS infrastructure at scale.
            </h1>
            <p style={{ fontFamily: mono, fontSize: isMobile ? 14 : 15, color: c.accent, marginBottom: 24, minHeight: 24 }}>
              <span aria-live="off">{typed}</span>
              <span className="blink" aria-hidden="true" style={{ display: "inline-block", width: 2, height: "1em", background: c.accent, marginLeft: 2, verticalAlign: "text-bottom", opacity: 0.4 }} />
            </p>
            <p style={{ marginBottom: 16 }}>
              I&apos;m <strong style={{ color: c.heading, fontWeight: 550 }}>Syed Salman Ali</strong>, a Cloud Team Lead at <strong style={{ color: c.heading, fontWeight: 550 }}>AKSIQ</strong> architecting multi-region AWS infrastructure for a license-based enterprise platform serving <em style={{ color: c.heading, fontStyle: "italic" }}>22+ clients</em> across SaaS, on-premises, and Linux deployments.
            </p>
            <p style={{ marginBottom: 16 }}>
              I manage <em style={{ color: c.heading, fontStyle: "italic" }}>20+ production instances</em>, <em style={{ color: c.heading, fontStyle: "italic" }}>7 ECS clusters</em>, and <em style={{ color: c.heading, fontStyle: "italic" }}>9 databases</em> across 3 AWS regions with 7 CI/CD pipelines at 100% success rate. Currently pursuing my MS in Data Science at FAST NUCES.
            </p>
            <p>
              You can reach me on <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={`mailto:${EMAIL}`}>Email</a> · <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
        </section>

        <Row callout="/about" id="about">
          <h2 id="about-h" style={{ ...h2, marginBottom: 18 }}>What I care about</h2>
          <p style={{ marginBottom: 16 }}>Infrastructure should be <strong style={{ color: c.heading, fontWeight: 550 }}>invisible</strong>. When it works well, nobody notices. When it fails, everyone does. I focus on building systems that are reliable, secure, and cost efficient so teams can ship without thinking about the cloud underneath.</p>
          <p>I believe in <strong style={{ color: c.heading, fontWeight: 550 }}>automation over manual work</strong>, <strong style={{ color: c.heading, fontWeight: 550 }}>monitoring over guessing</strong>, and <strong style={{ color: c.heading, fontWeight: 550 }}>documentation over tribal knowledge</strong>. Every pipeline I build, every instance I provision, and every database I manage is designed to run without me having to touch it again.</p>
        </Row>

        <Row callout="/experience" id="experience">
          <h2 id="experience-h" style={{ ...h2, marginBottom: 6 }}>Career at AKSIQ</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>4 roles across 3+ years, from junior engineer to leading the cloud team</p>
          {EXPERIENCE.map(exp => (
            <div key={exp.role} className="exp-row">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                <h3 style={{ fontSize: isMobile ? 15 : 15.5, fontWeight: 550 }}>{exp.role}</h3>
                <span style={{ fontFamily: mono, fontSize: 12, color: c.muted }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: 14, marginTop: 6, lineHeight: 1.65, color: c.text }}>{exp.desc}</p>
            </div>
          ))}
        </Row>

        <Row callout="/work" id="work">
          <h2 id="work-h" style={{ ...h2, marginBottom: 6 }}>What I build and manage at AKSIQ</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>Infrastructure projects at enterprise scale</p>
          {/* This is the work that matters most to a reader, so it stays a
              plain vertical list. On mobile the description is clamped to
              three lines with a toggle rather than hidden in a carousel. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PROJECTS.map(p => {
              const open = expanded.has(p.num);
              return (
                <div key={p.num} className="proj">
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: mono, fontSize: 11, color: c.muted, fontWeight: 500 }}>{p.num}</span>
                    <h3 style={{ fontSize: isMobile ? 15 : 15.5, fontWeight: 550 }}>{p.title}</h3>
                  </div>
                  <p
                    id={`work-desc-${p.num}`}
                    className={isMobile && !open ? "clamp clamp-3" : undefined}
                    style={{ fontSize: 14, lineHeight: 1.7, marginBottom: isMobile ? 6 : 14 }}
                  >
                    {p.desc}
                  </p>
                  {isMobile && (
                    <button
                      type="button"
                      className="more-btn"
                      aria-expanded={open}
                      aria-controls={`work-desc-${p.num}`}
                      onClick={() => setExpanded(prev => {
                        const next = new Set(prev);
                        if (next.has(p.num)) next.delete(p.num); else next.add(p.num);
                        return next;
                      })}
                      style={{ marginBottom: 12 }}
                    >
                      {open ? "Show less" : "Read more"}
                    </button>
                  )}
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                </div>
              );
            })}
          </div>
        </Row>

        <Row callout="/research" id="research">
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
            <h2 id="research-h" style={h2}>MS thesis</h2>
            <span style={{ fontFamily: mono, fontSize: 11, color: c.accent2 }}>{RESEARCH.status}</span>
          </div>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 22 }}>FAST NUCES, Data Science</p>

          <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 550, color: c.heading, lineHeight: 1.45, marginBottom: 20 }}>{RESEARCH.title}</h3>

          <p style={{ fontFamily: mono, fontSize: 11, color: c.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Problem</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 22 }}>{RESEARCH.problem}</p>

          <p style={{ fontFamily: mono, fontSize: 11, color: c.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Approach</p>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 22 }}>{RESEARCH.approach}</p>

          <p style={{ fontFamily: mono, fontSize: 11, color: c.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Results</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 22 }}>
            {RESEARCH.results.map(r => (
              <div key={r.label} style={{ border: `1px solid ${c.border}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontFamily: mono, fontSize: 17, fontWeight: 600, color: c.accent, letterSpacing: "-0.01em" }}>{r.metric}</div>
                <div style={{ fontSize: 12.5, color: c.muted, marginTop: 3, lineHeight: 1.45 }}>{r.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{RESEARCH.stack.map(t => <span key={t} className="tag">{t}</span>)}</div>
        </Row>

        <Row callout="/projects" id="projects">
          <h2 id="projects-h" style={{ ...h2, marginBottom: 6 }}>Earlier projects</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>Academic and personal work from before AKSIQ</p>
          {isMobile && <p className="swipe-hint">swipe →</p>}
          <div
            className={isMobile ? "hscroll" : undefined}
            style={isMobile ? undefined : { display: "flex", flexDirection: "column", gap: 12 }}
            {...(isMobile ? { role: "region", "aria-label": "Earlier projects, scroll sideways", tabIndex: 0 } : {})}
          >
            {PERSONAL_PROJECTS.map(p => (
              <div key={p.name} className="proj">
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  <h3 style={{ fontSize: isMobile ? 15 : 15.5, fontWeight: 550 }}>
                    {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{p.name}</a> : p.name}
                  </h3>
                  {p.meta && <span style={{ fontFamily: mono, fontSize: 11, color: c.muted }}>{p.meta}</span>}
                </div>
                <p className={isMobile ? "clamp clamp-3" : undefined} style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 10 }}>{p.desc}</p>
                <span className={isMobile ? "clamp clamp-2" : undefined} style={{ fontFamily: mono, fontSize: 11, color: c.muted, marginTop: "auto" }}>{p.stack}</span>
              </div>
            ))}
          </div>
        </Row>

        <Row callout="/skills" id="skills">
          <h2 id="skills-h" style={{ ...h2, marginBottom: 22 }}>Technical expertise</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 24 : 28 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: c.heading, marginBottom: 11, letterSpacing: "-0.01em" }}>{cat}</h3>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{items.map(s => <span key={s} className="tag">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </Row>

        <Row callout="/certifications" id="certifications">
          <h2 id="certifications-h" style={{ ...h2, marginBottom: 6 }}>Certifications</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: isMobile ? 14 : 24 }}>Continued learning across cloud, AI, and software architecture</p>
          {isMobile && <p className="swipe-hint">swipe →</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 26 : 32 }}>
            {CERT_GROUPS.map(g => (
              <div key={g.group}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: c.heading, marginBottom: isMobile ? 10 : 6, letterSpacing: "-0.01em" }}>{g.group}</h3>

                {isMobile ? (
                  <div
                    className={`hscroll${g.items.length < 3 ? " one-row" : ""}`}
                    role="region"
                    aria-label={`${g.group} certifications, scroll sideways`}
                    tabIndex={0}
                  >
                    {g.items.map(cert => (
                      <div key={cert.name} className="cert-card">
                        <span className="row-title clamp clamp-2" style={{ lineHeight: 1.35 }}>
                          {cert.href
                            ? <a href={cert.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{cert.name}</a>
                            : cert.name}
                        </span>
                        <span className="row-sub clamp clamp-2" style={{ marginTop: 0 }}>{cert.issuer}</span>
                        <span className="row-meta" style={{ marginTop: 4, color: cert.state === "active" ? c.accent2 : cert.state === "planned" ? c.accent : c.muted }}>{cert.meta}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  g.items.map((cert, i) => (
                    <div key={cert.name} className="edu-row" style={{ borderBottom: i < g.items.length - 1 ? `1px solid ${c.border}` : "none" }}>
                      <div style={{ minWidth: 0 }}>
                        <span className="row-title">
                          {cert.href
                            ? <a href={cert.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{cert.name}</a>
                            : cert.name}
                        </span>
                        <span className="row-sub">{cert.issuer}</span>
                      </div>
                      <span className="row-meta" style={{ color: cert.state === "active" ? c.accent2 : cert.state === "planned" ? c.accent : c.muted }}>{cert.meta}</span>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </Row>

        <Row callout="/education" id="education">
          <h2 id="education-h" style={{ ...h2, marginBottom: 6 }}>Education</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>Computer science foundation, now specialising in data science</p>
          {EDUCATION.map((edu, i) => (
            <div key={edu.degree} className="edu-row" style={{ borderBottom: i < EDUCATION.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ minWidth: 0 }}>
                <span className="row-title">{edu.degree}</span>
                <span className="row-sub">{edu.school} · {edu.detail}</span>
              </div>
              <span className="row-meta" style={{ color: edu.state === "active" ? c.accent2 : c.muted }}>{edu.meta}</span>
            </div>
          ))}
        </Row>

        <Row callout="/contact" id="contact">
          <h2 id="contact-h" style={{ ...h2, marginBottom: 14 }}>Start a conversation</h2>
          <p style={{ marginBottom: 26 }}>I like working with teams who care about reliability and craft. If you have a role that might be a fit, a project to collaborate on, or just want to connect, I&apos;d love to hear from you.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 32 }}>
            <div>
              {CONTACT_ITEMS.map(item => (
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="ci"
                    style={{ fontSize: 14 }}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <div key={item.label} className="ci" style={{ fontSize: 14 }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                )
              ))}
            </div>

            <div>
              {status === "sent" ? (
                <div style={{ padding: 22, background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, textAlign: "center" }} role="status">
                  <p style={{ fontSize: 15, color: c.heading, fontWeight: 500 }}>Message sent.</p>
                  <p style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>I&apos;ll get back to you as soon as I can.</p>
                  <button type="button" className="btn-secondary" onClick={() => setStatus("idle")} style={{ marginTop: 14, background: "transparent", border: `1px solid ${c.border}`, color: c.text, padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Send another</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <label className="vh" htmlFor="cf-name">Your name</label>
                  <input id="cf-name" name="name" required autoComplete="name" style={field} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

                  <label className="vh" htmlFor="cf-email">Your email address</label>
                  <input id="cf-email" name="email" type="email" required autoComplete="email" inputMode="email" style={field} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />

                  <label className="vh" htmlFor="cf-msg">Your message</label>
                  <textarea id="cf-msg" name="message" required minLength={10} style={{ ...field, minHeight: 96, resize: "vertical" }} placeholder="Message" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />

                  {/* honeypot: real people never fill this in */}
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} value={bot} onChange={e => setBot(e.target.value)} />

                  <button type="submit" className="btn-primary" disabled={status === "sending"} style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "100%", minHeight: 46, marginTop: 2 }}>
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>

                  {status === "error" && <p role="alert" style={{ fontSize: 13, color: c.danger, marginTop: 2 }}>{errMsg}</p>}
                  {status === "mailto" && <p role="status" style={{ fontSize: 13, color: c.muted, marginTop: 2 }}>Your email app should have opened with this message ready to send. If it didn&apos;t, write to {EMAIL} directly.</p>}
                </form>
              )}
            </div>
          </div>
        </Row>
      </main>

      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "24px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 18 }}>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13 }}>GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13 }}>LinkedIn</a>
            <a href={`mailto:${EMAIL}`} className="footer-link" style={{ fontSize: 13 }}>Email</a>
          </div>
          <span style={{ fontFamily: mono, fontSize: 11, color: c.muted }}>© {new Date().getFullYear()} Syed Salman Ali</span>
        </div>
      </footer>
    </div>
  );
}
