"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";

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

const TYPED = ["Cloud Team Lead", "AWS Infrastructure", "Backend Engineering", "DevOps & CI/CD"];
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
  "ML & Data": ["TensorFlow", "PyTorch", "SageMaker", "Hugging Face", "Airflow", "Dagster", "Pandas", "Data Visualization"],
};
const EXPERIENCE = [
  { role: "Cloud Team Lead", period: "Jul 2025 – Present", desc: "Leading cross-functional team in designing and deploying AWS infrastructure. Overseeing cloud security, performance optimization, and cost management across 3 regions." },
  { role: "Senior Cloud Engineer", period: "Mid 2024 – Jun 2025", desc: "Architected multi-region deployments, GPU infrastructure for ML workloads, and managed 7 CI/CD pipelines with 100% success rate." },
  { role: "Associate Software Engineer", period: "Oct 2022 – Mid 2024", desc: "Developed scalable APIs using Django, Flask, and FastAPI. Built automated web scraping bots and optimized backend performance." },
  { role: "Junior Software Engineer", period: "Jul 2022 – Sep 2022", desc: "Assisted in backend development using Python frameworks. Gained foundational experience with Flask, Django, and RESTful services." },
];
const EDUCATION = [
  { name: "AWS Solutions Architect (Planned)", status: "upcoming" },
  { name: "MS Data Science, FAST NUCES (2026)", status: "active" },
  { name: "BS Computer Science, MAJU (2022, CGPA 3.22)", status: "done" },
];
const NAV_IDS = ["hero", "about", "work", "skills", "contact"];
const NAV_LABELS = ["Home", "About", "Work", "Skills", "Contact"];

function Row({ callout, children, id }: { callout: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="content-row">
      <p className="row-callout">{callout}</p>
      <div>{children}</div>
    </section>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const typed = useTypingEffect(TYPED);

  useEffect(() => { setMounted(true); const ck = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024); }; ck(); window.addEventListener("resize", ck); return () => window.removeEventListener("resize", ck); }, []);
  useEffect(() => { const root = rootRef.current; if (!root) return; const onScroll = () => { for (const id of NAV_IDS) { const el = document.getElementById(id); if (el) { const r = el.getBoundingClientRect(); if (r.top <= 100 && r.bottom > 100) { setActiveNav(id); break; } } } }; root.addEventListener("scroll", onScroll, { passive: true }); return () => root.removeEventListener("scroll", onScroll); }, [mounted]);
  useEffect(() => { if (!menuOpen) return; const c = () => setMenuOpen(false); document.addEventListener("click", c); return () => document.removeEventListener("click", c); }, [menuOpen]);
  const scrollTo = useCallback((id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }, []);

  const c = dark ? {
    bg: "#060a11", card: "#0e1528", border: "#162040",
    text: "#94a3be", heading: "#e2eaf5", muted: "#4d6282",
    accent: "#5b9ef5", accent2: "#3dd9a0",
    nav: "rgba(6,10,17,0.88)", menuBg: "rgba(6,10,17,0.96)",
    input: "#0f1a2e", inputBorder: "#1c3358",
    tag: "rgba(91,158,245,0.06)", tagBorder: "rgba(91,158,245,0.10)", tagText: "#6a9ee0",
    focus: "rgba(91,158,245,0.2)",
  } : {
    bg: "#f8f9fb", card: "#ffffff", border: "#e2e7ef",
    text: "#5c6a7e", heading: "#131a28", muted: "#8c95a6",
    accent: "#3068d0", accent2: "#0e9060",
    nav: "rgba(248,249,251,0.9)", menuBg: "rgba(248,249,251,0.96)",
    input: "#eff2f7", inputBorder: "#cdd4e0",
    tag: "rgba(48,104,208,0.04)", tagBorder: "rgba(48,104,208,0.08)", tagText: "#4072b8",
    focus: "rgba(48,104,208,0.15)",
  };

  if (!mounted) return <div style={{ height: "100vh", background: "#060a11" }} />;

  const mono = "var(--font-geist-mono), ui-monospace, monospace";
  const sans = "var(--font-geist-sans), system-ui, sans-serif";
  const maxW = 880;
  const pad = isMobile ? "0 20px" : "0 32px";
  const sGap = isMobile ? 72 : 104;
  const twoCol = !isMobile && !isTablet;

  const css = `
    *{margin:0;padding:0;box-sizing:border-box}
    ::selection{background:${c.accent};color:#fff}
    a{position:relative;color:${c.accent};text-decoration:none;transition:color 0.18s ease}
    *:focus-visible{outline:2px solid ${c.accent};outline-offset:3px;border-radius:4px}
    .blink{animation:blink 1s step-end infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes sld{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
    h1,h2,h3{text-wrap:balance}

    .content-row{padding-bottom:${sGap}px;scroll-margin-top:80px;display:${twoCol ? "grid" : "block"};grid-template-columns:140px minmax(0,1fr);gap:40px;align-items:start}
    .row-callout{font-family:${mono};font-size:13px;font-weight:400;color:${c.muted};margin-bottom:${twoCol ? 0 : 20}px;position:${twoCol ? "sticky" : "static"};top:80px}

    .hb{display:flex;flex-direction:column;gap:5px;padding:12px;cursor:pointer;border:none;background:transparent;border-radius:8px;min-width:44px;min-height:44px;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;transition:background-color 0.18s ease}
    .hb span{display:block;width:18px;height:1.5px;background:${c.heading};border-radius:1px;transition:transform 0.2s ease,opacity 0.2s ease}
    .hb.op span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
    .hb.op span:nth-child(2){opacity:0}
    .hb.op span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
    .mm{position:fixed;top:56px;left:0;right:0;background:${c.menuBg};backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid ${c.border};z-index:149;animation:sld 0.15s ease;padding:4px 0}
    .mm button{display:block;width:100%;text-align:left;padding:14px 24px;background:transparent;border:none;color:${c.muted};font-size:15px;font-weight:450;font-family:${sans};cursor:pointer;min-height:44px;transition:background-color 0.18s ease,color 0.18s ease}
    .mm button.ac{color:${c.accent}}

    .proj{position:relative;padding:${isMobile ? "20px 20px 20px 22px" : "22px 26px 22px 28px"};border:1px solid ${c.border};border-radius:14px;background:transparent;transition:border-color 0.18s ease,background-color 0.18s ease,box-shadow 0.18s ease}
    .proj::before{content:'';position:absolute;top:14px;bottom:14px;left:0;width:3px;background:${c.accent};border-radius:0 2px 2px 0;opacity:0;transform:scaleY(0);transform-origin:center;pointer-events:none;transition:opacity 0.18s ease,transform 0.2s ease}
    .proj h3,.exp-row h3{color:${c.heading};transition:color 0.18s ease}

    .tag{display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-family:${mono};color:${c.tagText};background:${c.tag};border:1px solid ${c.tagBorder};font-weight:500;letter-spacing:0.01em;transition:border-color 0.18s ease,color 0.18s ease,background-color 0.18s ease}

    .exp-row{position:relative;padding:${isMobile ? "16px 0" : "18px 0"};border-bottom:1px solid ${c.border};transition:background-color 0.18s ease}
    .exp-row::before{content:'';position:absolute;left:-10px;top:${isMobile ? "16px" : "18px"};bottom:${isMobile ? "16px" : "18px"};width:2px;background:${c.accent};opacity:0;transform:scaleY(0.4);transform-origin:center;border-radius:1px;pointer-events:none;transition:opacity 0.18s ease,transform 0.2s ease}
    .exp-row:last-child{border-bottom:none}
    .edu-row{position:relative;padding:13px 0;display:flex;align-items:center;justify-content:space-between;gap:16px;transition:background-color 0.18s ease}
    .edu-row>span:first-child{color:${c.heading};transition:color 0.18s ease}

    .ci{display:flex;align-items:center;gap:14px;padding:10px 12px;margin:0 -12px;border-radius:10px;color:${c.text};text-decoration:none;min-height:44px;transition:background-color 0.18s ease,color 0.18s ease}
    .btn-primary{transition:opacity 0.18s ease,transform 0.12s ease}
    .nav-pill{background:transparent;color:${c.muted};transition:background-color 0.18s ease,color 0.18s ease,transform 0.12s ease}
    .nav-pill.active{background:${c.accent};color:#fff}
    .theme-btn{background:transparent;transition:background-color 0.18s ease,transform 0.12s ease}
    .footer-link{color:${c.muted};transition:color 0.18s ease}
    .btn-secondary{transition:border-color 0.18s ease,color 0.18s ease,transform 0.12s ease}

    a:not(.ci):not(.nav-pill):not(.btn-primary):not(.btn-secondary)::after{content:'';position:absolute;left:0;bottom:-1px;width:100%;height:1px;background:currentColor;transform:scaleX(0);transform-origin:left;pointer-events:none;transition:transform 0.18s ease}

    @media (hover:hover) and (pointer:fine){
      a:hover{color:${c.heading}}
      .proj:hover{border-color:${dark ? "rgba(91,158,245,0.42)" : "rgba(48,104,208,0.34)"};background:${c.card};box-shadow:0 6px 20px ${dark ? "rgba(0,0,0,0.16)" : "rgba(19,26,40,0.05)"}}
      .proj:hover::before{opacity:1;transform:scaleY(1)}
      .proj:hover h3,.exp-row:hover h3,.edu-row:hover>span:first-child{color:${c.accent}}
      .tag:hover{border-color:${dark ? "rgba(91,158,245,0.28)" : "rgba(48,104,208,0.24)"};color:${c.accent};background:${dark ? "rgba(91,158,245,0.10)" : "rgba(48,104,208,0.07)"}}
      .exp-row:hover,.edu-row:hover{background:${c.tag}}
      .exp-row:hover::before{opacity:1;transform:scaleY(1)}
      .ci:hover{background:${c.tag};color:${c.heading}}
      .btn-primary:hover{opacity:0.88}
      .nav-pill:not(.active):hover{color:${c.heading};background:${c.tag}}
      .theme-btn:hover,.hb:hover,.mm button:hover{background:${c.tag}}
      .mm button:not(.ac):hover{color:${c.heading}}
      .footer-link:hover{color:${c.accent}}
      .btn-secondary:hover{border-color:${c.accent};color:${c.accent}}
      a:not(.ci):not(.nav-pill):not(.btn-primary):not(.btn-secondary):hover::after{transform:scaleX(1)}
    }

    .ci:focus-visible{background:${c.tag};color:${c.heading}}
    .theme-btn:focus-visible,.hb:focus-visible,.mm button:focus-visible,.mm button:active{background:${c.tag}}
    .nav-pill:not(.active):focus-visible{background:${c.tag};color:${c.heading}}
    .footer-link:focus-visible{color:${c.accent}}
    a:not(.ci):not(.nav-pill):not(.btn-primary):not(.btn-secondary):focus-visible::after{transform:scaleX(1)}
    .btn-primary:active,.btn-secondary:active{transform:scale(0.98)}
    .nav-pill:active,.theme-btn:active{transform:scale(0.96)}
    input,textarea{transition:border-color 0.18s ease,box-shadow 0.18s ease}
    input:focus,textarea:focus{border-color:${c.accent} !important;box-shadow:0 0 0 3px ${c.focus} !important;outline:none}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${c.border};border-radius:2px}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important;scroll-behavior:auto !important}.btn-primary:active,.btn-secondary:active,.nav-pill:active,.theme-btn:active{transform:none}}
  `;

  return (
    <div ref={rootRef} style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", background: c.bg, color: c.text, fontFamily: sans, fontSize: 15, lineHeight: 1.7, transition: "background 0.3s, color 0.3s", WebkitFontSmoothing: "antialiased" }}>
      <style>{css}</style>

      {isMobile ? (
        <><nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, borderBottom: `1px solid ${c.border}`, padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: c.accent, letterSpacing: "0.04em" }}>SSA</span>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button className="theme-btn" style={{ border: "none", color: c.heading, width: 44, height: 44, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }} onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? "☀️" : "🌙"}</button>
            <button className={`hb ${menuOpen ? "op" : ""}`} onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }} aria-label="Menu"><span /><span /><span /></button>
          </div></nav>
        {menuOpen && <div className="mm" onClick={e => e.stopPropagation()}>{NAV_LABELS.map((n, i) => <button key={n} className={activeNav === NAV_IDS[i] ? "ac" : ""} onClick={() => scrollTo(NAV_IDS[i])}>{n}</button>)}</div>}</>
      ) : (
        <nav style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, border: `1px solid ${c.border}`, borderRadius: 12, padding: "4px 5px", display: "flex", gap: 2, alignItems: "center" }}>
          {NAV_LABELS.map((n, i) => (
            <button key={n} className={activeNav === NAV_IDS[i] ? "nav-pill active" : "nav-pill"} style={{ border: "none", fontSize: 13, fontWeight: 500, padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", minHeight: 34 }} onClick={() => scrollTo(NAV_IDS[i])} aria-current={activeNav === NAV_IDS[i] ? "page" : undefined}>{n}</button>
          ))}
          <div style={{ width: 1, height: 18, background: c.border, margin: "0 4px" }} />
          <button className="theme-btn" style={{ border: "none", color: c.heading, width: 34, height: 34, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? "☀️" : "🌙"}</button>
        </nav>
      )}

      <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>

        <section id="hero" style={{ paddingTop: isMobile ? 100 : 140, paddingBottom: sGap, display: twoCol ? "grid" : "block", gridTemplateColumns: twoCol ? "140px minmax(0,1fr)" : undefined, gap: twoCol ? 40 : undefined, alignItems: "start" }}>
          <p style={{ fontFamily: mono, fontSize: 13, color: c.muted, marginBottom: twoCol ? 0 : 20 }}>/intro</p>
          <div>
            <h1 style={{ fontSize: isMobile ? 27 : isTablet ? 32 : 36, fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.025em", color: c.heading, marginBottom: 12 }}>
              Cloud Team Lead building AWS infrastructure at scale.
            </h1>
            <p style={{ fontFamily: mono, fontSize: isMobile ? 14 : 15, color: c.accent, marginBottom: 24, minHeight: 24 }}>
              {typed}<span className="blink" style={{ display: "inline-block", width: 2, height: "1em", background: c.accent, marginLeft: 2, verticalAlign: "text-bottom", opacity: 0.4 }} />
            </p>
            <p style={{ marginBottom: 16 }}>
              I&apos;m <strong style={{ color: c.heading, fontWeight: 550 }}>Syed Salman Ali</strong>, a Cloud Team Lead at <strong style={{ color: c.heading, fontWeight: 550 }}>AKSIQ</strong> architecting multi-region AWS infrastructure for a license-based enterprise platform serving <em style={{ color: c.heading, fontStyle: "italic" }}>22+ clients</em> across SaaS, on-premises, and Linux deployments.
            </p>
            <p style={{ marginBottom: 16 }}>
              I manage <em style={{ color: c.heading, fontStyle: "italic" }}>20+ production instances</em>, <em style={{ color: c.heading, fontStyle: "italic" }}>7 ECS clusters</em>, and <em style={{ color: c.heading, fontStyle: "italic" }}>9 databases</em> across 3 AWS regions with 7 CI/CD pipelines at 100% success rate. Currently pursuing my MS in Data Science at FAST NUCES.
            </p>
            <p>
              You can reach me on <a href="https://www.linkedin.com/in/isyedsalmanali" target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href="mailto:i.syedsalmanali@gmail.com">Email</a> · <a href="https://github.com/iSyedSalmanAli" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
        </section>

        <Row callout="/about" id="about">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 18 }}>What I care about</h2>
          <p style={{ marginBottom: 16 }}>Infrastructure should be <strong style={{ color: c.heading, fontWeight: 550 }}>invisible</strong>. When it works well, nobody notices. When it fails, everyone does. I focus on building systems that are reliable, secure, and cost efficient so teams can ship without thinking about the cloud underneath.</p>
          <p>I believe in <strong style={{ color: c.heading, fontWeight: 550 }}>automation over manual work</strong>, <strong style={{ color: c.heading, fontWeight: 550 }}>monitoring over guessing</strong>, and <strong style={{ color: c.heading, fontWeight: 550 }}>documentation over tribal knowledge</strong>. Every pipeline I build, every instance I provision, and every database I manage is designed to run without me having to touch it again.</p>
        </Row>

        <Row callout="/experience">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 6 }}>Career at AKSIQ</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>4 roles across 3+ years, from junior engineer to leading the cloud team</p>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="exp-row">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                <h3 style={{ fontSize: isMobile ? 15 : 15.5, fontWeight: 550 }}>{exp.role}</h3>
                <span style={{ fontFamily: mono, fontSize: 12, color: c.muted }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: 14, marginTop: 6, lineHeight: 1.65, color: c.text }}>{exp.desc}</p>
            </div>
          ))}
        </Row>

        <Row callout="/work" id="work">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 6 }}>What I build and manage</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>Infrastructure projects at enterprise scale</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {PROJECTS.map(p => (
              <div key={p.num} className="proj">
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: c.muted, fontWeight: 500 }}>{p.num}</span>
                  <h3 style={{ fontSize: isMobile ? 15 : 15.5, fontWeight: 550 }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </Row>

        <Row callout="/skills" id="skills">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 22 }}>Technical expertise</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 24 : 28 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: c.heading, marginBottom: 11, letterSpacing: "-0.01em" }}>{cat}</h3>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{items.map(s => <span key={s} className="tag">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </Row>

        <Row callout="/education">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 18 }}>Degrees and certifications</h2>
          {EDUCATION.map((cert, i) => (
            <div key={i} className="edu-row" style={{ borderBottom: i < EDUCATION.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <span style={{ fontSize: 14, fontWeight: 450 }}>{cert.name}</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: cert.status === "active" ? c.accent2 : cert.status === "upcoming" ? c.accent : c.muted, flexShrink: 0 }}>
                {cert.status === "active" ? "In progress" : cert.status === "upcoming" ? "Planned" : "Completed"}
              </span>
            </div>
          ))}
        </Row>

        {/* NOTES (commented out)
        <Row callout="/notes">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 6 }}>Writing</h2>
          <p style={{ fontSize: 13, color: c.muted, marginBottom: 20 }}>Thoughts on cloud architecture, DevOps, and building at scale</p>
          {[
            { title: "Multi-region AWS architecture patterns", tag: "Infrastructure" },
            { title: "CI/CD pipeline design for ECS deployments", tag: "DevOps" },
            { title: "Cloud cost optimization strategies", tag: "Cloud" },
          ].map((note, i) => (
            <div key={i} className="edu-row" style={{ borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 14, fontWeight: 450 }}>{note.title}</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: c.muted }}>{note.tag}</span>
            </div>
          ))}
        </Row>
        */}

        <Row callout="/contact" id="contact">
          <h2 style={{ fontSize: isMobile ? 19 : 21, fontWeight: 600, color: c.heading, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 14 }}>Start a conversation</h2>
          <p style={{ marginBottom: 26 }}>I like working with teams who care about reliability and craft. If you have a role that might be a fit, a project to collaborate on, or just want to connect, I&apos;d love to hear from you.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 32 }}>
            <div>
              {[
                { icon: "📧", label: "i.syedsalmanali@gmail.com", href: "mailto:i.syedsalmanali@gmail.com" },
                { icon: "📍", label: "Karachi, Pakistan" },
                { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/isyedsalmanali" },
                { icon: "🐙", label: "GitHub", href: "https://github.com/iSyedSalmanAli" },
              ].map(ci => (
                <a key={ci.label} href={ci.href || "#"} target={ci.href ? "_blank" : undefined} rel="noopener noreferrer" className="ci" style={{ fontSize: 14 }}>
                  <span style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }}>{ci.icon}</span>
                  <span>{ci.label}</span>
                </a>
              ))}
            </div>
            <div>
              {sent ? (
                <div style={{ padding: 22, background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, textAlign: "center" }}>
                  <p style={{ fontSize: 15, color: c.heading, fontWeight: 500 }}>Message sent.</p>
                  <p style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>I&apos;ll reply within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <input style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${c.inputBorder}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", minHeight: 44 }} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${c.inputBorder}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", minHeight: 44 }} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  <textarea style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${c.inputBorder}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", minHeight: 96, resize: "vertical" }} placeholder="Message" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
                  <button className="btn-primary" style={{ background: c.accent, color: "#fff", border: "none", padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "fit-content", minHeight: 44 }} onClick={() => setSent(true)}>Send message</button>
                </div>
              )}
            </div>
          </div>
        </Row>
      </div>

      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "24px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 18 }}>
            {[{ l: "GitHub", h: "https://github.com/iSyedSalmanAli" }, { l: "LinkedIn", h: "https://www.linkedin.com/in/isyedsalmanali" }].map(lk => (
              <a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: 13 }}>{lk.l}</a>
            ))}
          </div>
          <span style={{ fontFamily: mono, fontSize: 11, color: c.muted, opacity: 0.4 }}>© 2026 Syed Salman Ali</span>
        </div>
      </footer>
    </div>
  );
}
