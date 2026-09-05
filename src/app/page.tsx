"use client";

import { useState, useEffect, useRef } from "react";

function useTypingEffect(texts: string[], speed = 90, delSpeed = 45, pause = 2400) {
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
function useInView(th = 0.12) {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return { ref, visible: v };
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

const CERTIFICATIONS = [
  { name: "AWS Solutions Architect (Planned)", status: "upcoming" as const },
  { name: "MS Data Science, FAST NUCES (2026)", status: "active" as const },
  { name: "BS Computer Science, MAJU (2022, CGPA 3.22)", status: "done" as const },
];

const CONTACTS = [
  { icon: "📧", label: "i.syedsalmanali@gmail.com", href: "mailto:i.syedsalmanali@gmail.com" },
  { icon: "📍", label: "Karachi, Pakistan", href: undefined },
  { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/isyedsalmanali" },
  { icon: "🐙", label: "GitHub", href: "https://github.com/iSyedSalmanAli" },
];

const NAV_IDS = ["hero", "about", "projects", "skills", "contact"];
const NAV_LABELS = ["Home", "About", "Projects", "Skills", "Contact"];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const typed = useTypingEffect(TYPED);

  useEffect(() => { const ck = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024); }; ck(); window.addEventListener("resize", ck); return () => window.removeEventListener("resize", ck); }, []);
  useEffect(() => { const root = rootRef.current; if (!root) return; const onScroll = () => { for (const id of NAV_IDS) { const el = document.getElementById(id); if (el) { const r = el.getBoundingClientRect(); if (r.top <= 140 && r.bottom > 140) { setActiveNav(id); break; } } } }; root.addEventListener("scroll", onScroll, { passive: true }); return () => root.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { if (!menuOpen) return; const close = () => setMenuOpen(false); document.addEventListener("click", close); return () => document.removeEventListener("click", close); }, [menuOpen]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const aboutView = useInView(0.1); const projView = useInView(0.06); const skillView = useInView(0.1); const expView = useInView(0.1); const contactView = useInView(0.1);
  const reveal = (vis: boolean, delay = 0): React.CSSProperties => ({ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s` });
  const pad = isMobile ? "0 20px" : isTablet ? "0 32px" : "0 40px";
  const maxW = 720;

  const c = dark ? {
    bg: "#0a0c10", text: "#c8ced8", heading: "#e8ecf2", muted: "#5a6478", accent: "#6baaff",
    accent2: "#4eda9e", border: "#1a1e28", card: "#12151c", nav: "rgba(10,12,16,0.9)",
    input: "#14171f", inputB: "#252a36", tag: "rgba(107,170,255,0.06)", tagBorder: "rgba(107,170,255,0.1)",
    menuBg: "rgba(10,12,16,0.96)",
  } : {
    bg: "#fafbfc", text: "#4a5264", heading: "#171c26", muted: "#8a92a2", accent: "#2d6bd4",
    accent2: "#0e8c5e", border: "#eaedf2", card: "#ffffff", nav: "rgba(250,251,252,0.92)",
    input: "#f2f4f8", inputB: "#dde1e8", tag: "rgba(45,107,212,0.04)", tagBorder: "rgba(45,107,212,0.08)",
    menuBg: "rgba(250,251,252,0.96)",
  };

  const css = `
    *{margin:0;padding:0;box-sizing:border-box}
    .blink{animation:blink 1s step-end infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
    a{color:inherit;text-decoration:none}
    ::selection{background:${c.accent};color:#fff}
    .hb{display:flex;flex-direction:column;gap:5px;padding:8px;cursor:pointer;border:none;background:none}.hb span{display:block;width:18px;height:1.5px;background:${c.heading};border-radius:1px;transition:all 0.3s}.hb.op span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}.hb.op span:nth-child(2){opacity:0}.hb.op span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
    .mm{position:fixed;top:52px;left:0;right:0;background:${c.menuBg};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid ${c.border};z-index:149;animation:slideDown 0.2s ease;padding:4px 0}.mm button{display:block;width:100%;text-align:left;padding:14px 24px;background:none;border:none;color:${c.muted};font-size:15px;font-weight:500;font-family:inherit;cursor:pointer}.mm button.ac{color:${c.accent}}.mm button:active{background:${c.tag}}
    .proj{position:relative;padding:${isMobile ? "20px 20px 20px 22px" : "28px 32px 28px 34px"};border:1px solid ${c.border};border-radius:12px;transition:all 0.3s;background:transparent}
    .proj::before{content:'';position:absolute;top:0;left:0;width:2.5px;height:0;background:${c.accent};transition:height 0.35s;border-radius:0 0 2px 0}
    .proj:hover{border-color:${dark ? "rgba(107,170,255,0.15)" : "rgba(45,107,212,0.12)"};background:${c.card}}
    .proj:hover::before{height:100%}
    .tag{display:inline-block;padding:3px 10px;border-radius:4px;font-size:12px;font-family:var(--font-jetbrains),monospace;color:${c.accent};background:${c.tag};border:1px solid ${c.tagBorder};font-weight:500}
    .exp-row{padding:${isMobile ? "16px 0" : "20px 0"};border-bottom:1px solid ${c.border};transition:all 0.25s}
    .exp-row:last-child{border-bottom:none}
    .exp-row:hover{padding-left:8px}
    .ci-link{display:flex;align-items:center;gap:10px;padding:8px 0;color:${c.text};transition:color 0.2s;font-size:14px}
    .ci-link:hover{color:${c.accent}}
    input:focus,textarea:focus{border-color:${c.accent} !important;box-shadow:0 0 0 2px ${c.tag} !important}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${c.border};border-radius:2px}
  `;

  const SectionLabel = ({ text }: { text: string }) => (
    <p className="font-mono" style={{ fontSize: 11, fontWeight: 500, color: c.muted, textTransform: "uppercase" as const, letterSpacing: 4, marginBottom: 16 }}>{text}</p>
  );

  return (
    <div ref={rootRef} className="font-sans" style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", background: c.bg, color: c.text, transition: "background 0.35s, color 0.35s", fontSize: 15, lineHeight: 1.8 }}>
      <style>{css}</style>

      {isMobile || isTablet ? (
        <><nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, borderBottom: `1px solid ${c.border}`, padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: c.accent, letterSpacing: 1 }}>SSA</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button style={{ background: "transparent", border: "none", color: c.heading, width: 34, height: 34, borderRadius: 6, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
            <button className={`hb ${menuOpen ? "op" : ""}`} onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }} aria-label="Menu"><span /><span /><span /></button>
          </div></nav>
        {menuOpen && <div className="mm" onClick={e => e.stopPropagation()}>{NAV_LABELS.map((n, i) => <button key={n} className={activeNav === NAV_IDS[i] ? "ac" : ""} onClick={() => scrollTo(NAV_IDS[i])}>{n}</button>)}</div>}</>
      ) : (
        <nav style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 150, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: c.nav, border: `1px solid ${c.border}`, borderRadius: 10, padding: "3px 4px", display: "flex", gap: 1, alignItems: "center" }}>
          {NAV_LABELS.map((n, i) => <button key={n} style={{ background: activeNav === NAV_IDS[i] ? c.accent : "none", color: activeNav === NAV_IDS[i] ? "#fff" : c.muted, border: "none", fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 7, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }} onClick={() => scrollTo(NAV_IDS[i])} onMouseEnter={e => { if (activeNav !== NAV_IDS[i]) (e.target as HTMLElement).style.color = c.heading; }} onMouseLeave={e => { if (activeNav !== NAV_IDS[i]) (e.target as HTMLElement).style.color = c.muted; }}>{n}</button>)}
          <div style={{ width: 1, height: 18, background: c.border, margin: "0 3px" }} />
          <button style={{ background: "transparent", border: "none", color: c.heading, width: 32, height: 32, borderRadius: 7, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
        </nav>
      )}

      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", paddingTop: 80 }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <p className="font-mono" style={{ fontSize: 12, color: c.muted, letterSpacing: 3, marginBottom: 28, animation: "fadeUp 0.5s ease both" }}>CLOUD TEAM LEAD AT AKSIQ</p>
          <h1 style={{ fontSize: isMobile ? 36 : isTablet ? 48 : 56, fontWeight: 600, lineHeight: 1.1, letterSpacing: -1.5, color: c.heading, marginBottom: 20, animation: "fadeUp 0.5s ease 0.1s both" }}>Syed Salman Ali</h1>
          <div className="font-mono" style={{ fontSize: isMobile ? 15 : 18, color: c.accent, marginBottom: 28, minHeight: 28, animation: "fadeUp 0.5s ease 0.2s both" }}>
            {typed}<span className="blink" style={{ display: "inline-block", width: 2, height: "1em", background: c.accent, marginLeft: 2, verticalAlign: "text-bottom", opacity: 0.5 }} />
          </div>
          <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.8, maxWidth: 520, margin: "0 auto 36px", animation: "fadeUp 0.5s ease 0.3s both" }}>
            I architect multi-region AWS infrastructure for a license-based enterprise platform serving 22+ clients across SaaS, on-premises, and Linux deployments. Currently pursuing MS Data Science at FAST NUCES.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.5s ease 0.4s both" }}>
            <button style={{ background: c.accent, color: "#fff", border: "none", padding: "11px 26px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 42 }} onClick={() => scrollTo("projects")}>View Work</button>
            <button style={{ background: "transparent", color: c.heading, border: `1px solid ${c.border}`, padding: "11px 26px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 42, transition: "border-color 0.2s" }} onClick={() => scrollTo("contact")} onMouseEnter={e => (e.target as HTMLElement).style.borderColor = c.accent} onMouseLeave={e => (e.target as HTMLElement).style.borderColor = c.border}>Contact</button>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 26px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.muted, transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = c.accent} onMouseLeave={e => (e.target as HTMLElement).style.color = c.muted}>Resume ↓</a>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutView.ref} style={{ padding: isMobile ? "100px 0" : "140px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <div style={reveal(aboutView.visible)}>
            <SectionLabel text="About" />
            <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.85, marginBottom: 20 }}>
              Cloud Team Lead at <strong style={{ color: c.heading, fontWeight: 600 }}>AKSIQ</strong> with 3+ years of experience. I manage the full cloud stack including EC2, ECS, RDS, OpenSearch, ElastiCache, and S3 across <strong style={{ color: c.heading, fontWeight: 600 }}>3 AWS regions</strong>, serving <strong style={{ color: c.heading, fontWeight: 600 }}>22+ licensed clients</strong> in the financial sector.
            </p>
            <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.85, marginBottom: 20 }}>
              My infrastructure spans SaaS, on-premises, and Linux-based deployments with <strong style={{ color: c.heading, fontWeight: 600 }}>7 CI/CD pipelines</strong> maintaining 100% success rate. I also lead GPU-powered ML infrastructure (NVIDIA L40S, A100) and AI/ML pipeline automation with SageMaker.
            </p>
          </div>
          <div style={{ ...reveal(aboutView.visible, 0.15), marginTop: 36 }}>
            <div style={{ background: dark ? "#0e1118" : "#171c26", borderRadius: 10, overflow: "hidden", border: `1px solid ${dark ? "#1a1e28" : "#2a3040"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 14px", borderBottom: `1px solid ${dark ? "#1a1e28" : "#2a3040"}` }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
              </div>
              <div className="font-mono" style={{ padding: "14px 18px", fontSize: 12.5, lineHeight: 1.8, color: "#9aacca", overflowX: "auto" }}>
                <span style={{ color: "#505a70" }}>{"// salman.config.ts"}</span><br />
                <span style={{ color: "#7a82d4" }}>const</span> <span style={{ color: "#6baaff" }}>cloud</span> = {"{"}<br />
                {"  "}lead: <span style={{ color: "#6cc8a0" }}>&quot;Syed Salman Ali&quot;</span>,<br />
                {"  "}clients: <span style={{ color: "#dba050" }}>22</span>,<br />
                {"  "}regions: [<span style={{ color: "#6cc8a0" }}>&quot;Virginia&quot;, &quot;Ohio&quot;, &quot;Singapore&quot;</span>],<br />
                {"  "}deploy: [<span style={{ color: "#6cc8a0" }}>&quot;SaaS&quot;, &quot;On-Prem&quot;, &quot;Linux&quot;</span>],<br />
                {"  "}pipelines: <span style={{ color: "#dba050" }}>7</span>,<br />
                {"}"}<br />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={expView.ref} style={{ padding: isMobile ? "0 0 100px" : "0 0 140px" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <div style={reveal(expView.visible)}><SectionLabel text="Experience" /></div>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="exp-row" style={reveal(expView.visible, i * 0.06)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: c.heading }}>{exp.role}</h3>
                <span className="font-mono" style={{ fontSize: 12, color: c.muted, flexShrink: 0 }}>{exp.period}</span>
              </div>
              <p className="font-mono" style={{ fontSize: 12, color: c.accent, marginBottom: 6 }}>AKSIQ</p>
              <p style={{ fontSize: 14, color: c.muted, lineHeight: 1.7 }}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" ref={projView.ref} style={{ padding: isMobile ? "100px 0" : "140px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <div style={reveal(projView.visible)}><SectionLabel text="Work" /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className="proj" style={reveal(projView.visible, i * 0.06)}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                  <span className="font-mono" style={{ fontSize: 11, color: c.muted, fontWeight: 500 }}>{p.num}</span>
                  <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 600, color: c.heading }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" ref={skillView.ref} style={{ padding: isMobile ? "100px 0" : "140px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <div style={reveal(skillView.visible)}><SectionLabel text="Skills" /></div>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 28 : 36 }}>
            {Object.entries(SKILLS).map(([cat, items], ci) => (
              <div key={cat} style={reveal(skillView.visible, ci * 0.06)}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: c.heading, marginBottom: 12 }}>{cat}</h3>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {items.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "100px 0" : "140px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <SectionLabel text="Education & Certifications" />
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: i < CERTIFICATIONS.length - 1 ? `1px solid ${c.border}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, color: c.heading, fontWeight: 500 }}>{cert.name}</span>
              <span className="font-mono" style={{ fontSize: 11, color: cert.status === "active" ? c.accent2 : cert.status === "upcoming" ? c.accent : c.muted }}>
                {cert.status === "active" ? "In progress" : cert.status === "upcoming" ? "Planned" : "Completed"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* NOTES (commented out for future use)
      <section style={{ padding: isMobile ? "100px 0" : "140px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <SectionLabel text="Notes" />
          <p style={{ color: c.muted, fontSize: 14, marginBottom: 20 }}>Writing about cloud architecture, DevOps, and infrastructure at scale.</p>
          {[
            { title: "Multi-region AWS architecture patterns", date: "Coming soon" },
            { title: "CI/CD pipeline design for ECS deployments", date: "Coming soon" },
            { title: "Cloud cost optimization strategies", date: "Coming soon" },
          ].map((note, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: 15, color: c.heading, fontWeight: 500 }}>{note.title}</span>
              <span className="font-mono" style={{ fontSize: 11, color: c.muted, flexShrink: 0, marginLeft: 12 }}>{note.date}</span>
            </div>
          ))}
        </div>
      </section>
      */}

      <section id="contact" ref={contactView.ref} style={{ padding: isMobile ? "100px 0 60px" : "140px 0 80px" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad }}>
          <div style={reveal(contactView.visible)}>
            <SectionLabel text="Contact" />
            <p style={{ fontSize: isMobile ? 15 : 16, lineHeight: 1.8, marginBottom: 32 }}>Whether you have a role that might be a fit, a project to collaborate on, or just want to connect.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 48 }}>
            <div style={reveal(contactView.visible, 0.08)}>
              {CONTACTS.map(ci => (
                <a key={ci.label} href={ci.href || "#"} target={ci.href ? "_blank" : undefined} rel="noopener noreferrer" className="ci-link">
                  <span style={{ fontSize: 16 }}>{ci.icon}</span><span>{ci.label}</span>
                </a>
              ))}
            </div>
            <div style={reveal(contactView.visible, 0.14)}>
              {sent ? (
                <div style={{ padding: 32, textAlign: "center" }}><p style={{ fontSize: 15, color: c.heading, fontWeight: 500 }}>Message sent. I&apos;ll reply within 24 hours.</p></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: `1px solid ${c.inputB}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 42 }} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: `1px solid ${c.inputB}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 42 }} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  <textarea style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: `1px solid ${c.inputB}`, background: c.input, color: c.heading, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 100, resize: "vertical" }} placeholder="Message" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
                  <button style={{ background: c.accent, color: "#fff", border: "none", padding: "11px 24px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "100%", minHeight: 42 }} onClick={() => setSent(true)}>Send</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "28px 0" }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: pad, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {[{ l: "GitHub", h: "https://github.com/iSyedSalmanAli" }, { l: "LinkedIn", h: "https://www.linkedin.com/in/isyedsalmanali" }].map(lk => <a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer" style={{ color: c.muted, fontSize: 12.5, fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => (e.target as HTMLElement).style.color = c.accent} onMouseLeave={e => (e.target as HTMLElement).style.color = c.muted}>{lk.l}</a>)}
          </div>
          <span style={{ fontSize: 11.5, color: c.muted, opacity: 0.5 }}>© 2026 Syed Salman Ali</span>
        </div>
      </footer>
    </div>
  );
}
