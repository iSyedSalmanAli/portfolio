"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function useTypingEffect(texts: string[], speed = 80, delSpeed = 40, pause = 2200) {
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
    t = setTimeout(tick, 1000); return () => clearTimeout(t);
  }, [texts, speed, delSpeed, pause]); return display;
}
function useInView(th = 0.15) {
  const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: th }); o.observe(el); return () => o.disconnect(); }, [th]);
  return { ref, visible: v };
}

const TYPED = ["Cloud Team Lead", "AWS Solutions Architect", "Backend Engineer", "DevOps & CI/CD", "Data Engineering"];
const STATS = [{ val: 22, suf: "+", label: "Clients Served" }, { val: 7, suf: "", label: "CI/CD Pipelines" }, { val: 3, suf: "", label: "AWS Regions" }, { val: 20, suf: "+", label: "Prod Instances" }];
const PROJECTS = [
  { title: "Multi-Region AWS Infrastructure", desc: "Designed and managed production infrastructure across 3 AWS regions (Virginia, Ohio, Singapore) for a license-based enterprise platform serving 22+ clients. Provisioned 20+ EC2 instances, 7 ECS clusters, and 9 RDS databases with per-client isolation across SaaS, on-premises, and Linux deployments.", tags: ["AWS", "EC2", "ECS", "RDS", "Multi-Region"], num: "01", metrics: "22+ clients · 3 regions" },
  { title: "CI/CD & DevOps Automation", desc: "Architected 7 production CI/CD pipelines using AWS CodePipeline, CodeCommit, and CodeBuild with containerized deployments via ECS. Achieved and maintained 100% pipeline success rate across all microservices including APIs, data bots, forex, commodities, and search.", tags: ["CodePipeline", "CodeCommit", "Docker", "ECS"], num: "02", metrics: "7 pipelines · 100% success" },
  { title: "GPU & AI/ML Infrastructure", desc: "Provisioned and managed GPU compute instances (NVIDIA L40S, A100) for ML model training and inference workloads. Integrated SageMaker for model lifecycle management and built automated training pipelines with EDA, model selection, and canary fallback strategies.", tags: ["GPU", "SageMaker", "L40S", "A100", "ML"], num: "03", metrics: "L40S + A100 GPU compute" },
  { title: "Data, Caching & Search Layer", desc: "Managed 9 RDS database instances (PostgreSQL and SQL Server) across multiple regions. Deployed OpenSearch clusters handling 2+ TiB of searchable data, ElastiCache (Valkey) for production caching, and maintained 22+ S3 buckets for backups, Terraform state, and audit logs.", tags: ["PostgreSQL", "OpenSearch", "ElastiCache", "Terraform"], num: "04", metrics: "2+ TiB data · 9 databases" },
];
const SKILL_CATS = [
  { name: "Cloud & AWS", skills: [{ n: "EC2 / ECS / Fargate", l: 92 }, { n: "RDS (PostgreSQL + SQL Server)", l: 88 }, { n: "S3 / CloudTrail / CloudWatch", l: 90 }, { n: "OpenSearch / ElastiCache", l: 82 }, { n: "IAM / VPC / Security Groups", l: 85 }] },
  { name: "DevOps", skills: [{ n: "CodePipeline / CodeBuild", l: 90 }, { n: "Docker & Containers", l: 85 }, { n: "Terraform (IaC)", l: 80 }, { n: "Git / CodeCommit", l: 92 }, { n: "Linux Administration", l: 82 }] },
  { name: "Backend", skills: [{ n: "Python (Django / Flask / FastAPI)", l: 90 }, { n: "API Design & Integration", l: 88 }, { n: "PostgreSQL / SQL Server", l: 85 }, { n: "Unit Testing & Code Reviews", l: 80 }] },
  { name: "ML & Data", skills: [{ n: "GPU Infra (L40S / A100)", l: 78 }, { n: "TensorFlow / PyTorch", l: 76 }, { n: "ETL (Airflow / Dagster)", l: 80 }, { n: "Pandas / Data Viz", l: 82 }] },
];
const CONTACTS = [
  { icon: "📧", label: "i.syedsalmanali@gmail.com", href: "mailto:i.syedsalmanali@gmail.com" },
  { icon: "📍", label: "Karachi, Pakistan", href: undefined },
  { icon: "💼", label: "linkedin.com/in/isyedsalmanali", href: "https://www.linkedin.com/in/isyedsalmanali" },
  { icon: "🐙", label: "github.com/iSyedSalmanAli", href: "https://github.com/iSyedSalmanAli" },
];
const NAV_IDS = ["hero", "about", "projects", "skills", "contact"];
const NAV_LABELS = ["Home", "About", "Projects", "Skills", "Contact"];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("hero");
  const [scrollProg, setScrollProg] = useState(0);
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [countersGo, setCountersGo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const typed = useTypingEffect(TYPED);

  useEffect(() => { const ck = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024); }; ck(); window.addEventListener("resize", ck); return () => window.removeEventListener("resize", ck); }, []);

  const c = dark ? {
    bg: "#060a12", card: "#0e1629", border: "#172244", text: "#dce4f2", muted: "#5d7599",
    accent: "#5ba0f5", accent2: "#3dd9a0", accentDim: "rgba(91,160,245,0.07)", accentBorder: "rgba(91,160,245,0.12)",
    nav: "rgba(6,10,18,0.88)", input: "#111d32", inputB: "#1f3560", skillBg: "#0b1320",
    termBg: "#080f1c", termHead: "#0d1628", termBdr: "#172244",
    menuBg: "rgba(6,10,18,0.95)", tagBg: "rgba(91,160,245,0.06)", tagBorder: "rgba(91,160,245,0.1)",
  } : {
    bg: "#f6f8fc", card: "#ffffff", border: "#e0e6f0", text: "#111828", muted: "#5c6b82",
    accent: "#2e6ed8", accent2: "#0a9b6a", accentDim: "rgba(46,110,216,0.04)", accentBorder: "rgba(46,110,216,0.1)",
    nav: "rgba(246,248,252,0.9)", input: "#eef2f9", inputB: "#c8d3e8", skillBg: "#eef2f9",
    termBg: "#111828", termHead: "#1a2540", termBdr: "#2a3a58",
    menuBg: "rgba(246,248,252,0.95)", tagBg: "rgba(46,110,216,0.04)", tagBorder: "rgba(46,110,216,0.08)",
  };

  useEffect(() => {
    if (isMobile) return;
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w: number, h: number, cols: number, rows: number;
    const gap = 32;
    const resize = () => { if (!cv.parentElement) return; w = cv.width = cv.parentElement.clientWidth; h = cv.height = cv.parentElement.clientHeight; cols = Math.floor(w / gap) + 1; rows = Math.floor(h / gap) + 1; };
    resize(); window.addEventListener("resize", resize);
    const mm = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mm);
    const accentR = dark ? [91,160,245] : [46,110,216];
    const accent2R = dark ? [61,217,160] : [10,155,106];
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + gap / 2, y = j * gap + gap / 2;
          const dx = x - mx, dy = y - my, dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          if (dist < maxDist) {
            const t = 1 - dist / maxDist, push = t * 6;
            const px = dist > 0 ? x + (dx / dist) * push : x, py = dist > 0 ? y + (dy / dist) * push : y;
            const size = 1.2 + t * 2.2, mix = t;
            const r = Math.round(accentR[0] * (1 - mix * 0.4) + accent2R[0] * mix * 0.4);
            const g = Math.round(accentR[1] * (1 - mix * 0.4) + accent2R[1] * mix * 0.4);
            const b = Math.round(accentR[2] * (1 - mix * 0.4) + accent2R[2] * mix * 0.4);
            ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${0.08 + t * (dark ? 0.35 : 0.22)})`; ctx.fill();
            if (t > 0.3) {
              for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;
                const ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
                  const nx = ni * gap + gap / 2, ny = nj * gap + gap / 2;
                  const nd = Math.sqrt((nx - mx) ** 2 + (ny - my) ** 2);
                  if (nd < maxDist) { const nt = 1 - nd / maxDist; if (nt > 0.3) {
                    const npush = nt * 6; ctx.beginPath(); ctx.moveTo(px, py);
                    ctx.lineTo(nx + (nd > 0 ? ((nx - mx) / nd) * npush : 0), ny + (nd > 0 ? ((ny - my) / nd) * npush : 0));
                    ctx.strokeStyle = `rgba(${accentR[0]},${accentR[1]},${accentR[2]},${Math.min(t, nt) * (dark ? 0.12 : 0.06)})`; ctx.lineWidth = 0.5; ctx.stroke();
                  }}
                }
              }
            }
          } else { ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fillStyle = dark ? "rgba(91,160,245,0.035)" : "rgba(46,110,216,0.025)"; ctx.fill(); }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); window.removeEventListener("mousemove", mm); cancelAnimationFrame(animRef.current); };
  }, [dark, isMobile]);

  useEffect(() => { const root = rootRef.current; if (!root) return; const onScroll = () => { const h = root.scrollHeight - root.clientHeight; setScrollProg(h > 0 ? root.scrollTop / h : 0); for (const id of NAV_IDS) { const el = document.getElementById(id); if (el) { const r = el.getBoundingClientRect(); if (r.top <= 140 && r.bottom > 140) { setActiveNav(id); break; } } } }; root.addEventListener("scroll", onScroll, { passive: true }); return () => root.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { if (!countersGo) return; const ends = STATS.map(s => s.val); const st = performance.now(); const step = (now: number) => { const p = Math.min((now - st) / 2000, 1); setCounters(ends.map(v => Math.round(v * (1 - Math.pow(1 - p, 4))))); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }, [countersGo]);
  useEffect(() => { if (!menuOpen) return; const close = () => setMenuOpen(false); document.addEventListener("click", close); return () => document.removeEventListener("click", close); }, [menuOpen]);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const statsView = useInView(0.3); const aboutView = useInView(0.12); const projView = useInView(0.08); const skillView = useInView(0.12); const contactView = useInView(0.12);
  useEffect(() => { if (statsView.visible && !countersGo) setCountersGo(true); }, [statsView.visible, countersGo]);
  const reveal = (vis: boolean, delay = 0) => ({ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` });
  const pad = isMobile ? "0 18px" : isTablet ? "0 28px" : "0 32px";
  const secPad = isMobile ? "64px 0" : isTablet ? "80px 0" : "100px 0";

  const css = `
    *{margin:0;padding:0;box-sizing:border-box}
    .blink{animation:blink 1s step-end infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    .scroll-anim{position:relative;width:1px;height:32px;overflow:hidden;background:${c.border}}
    .scroll-anim::after{content:'';position:absolute;top:-50%;left:0;width:100%;height:50%;background:${c.accent};animation:sl 2.5s infinite;opacity:0.3}
    @keyframes sl{0%{top:-50%}100%{top:150%}}
    .proj-card{background:${c.card};border:1px solid ${c.border};border-radius:14px;padding:${isMobile ? "20px" : "28px 30px"};transition:all 0.35s;position:relative;overflow:hidden;display:flex;flex-direction:column;height:100%}
    .proj-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:0;background:${c.accent};transition:height 0.4s;border-radius:0 0 2px 0}
    .proj-card:hover{border-color:${c.accentBorder};background:${dark ? "#101e36" : "#f0f5ff"}}
    .proj-card:hover::before{height:100%}
    .sk-item{background:${c.card};border:1px solid ${c.border};border-radius:10px;padding:${isMobile ? "12px 14px" : "14px 20px"};transition:all 0.25s}
    .sk-item:hover{border-color:${c.accentBorder}}
    .ci-link{transition:all 0.2s;border-radius:10px;display:flex;align-items:center;gap:12px;padding:10px 12px;color:${c.muted};text-decoration:none}
    .ci-link:hover{background:${c.accentDim};color:${c.text}}
    input:focus,textarea:focus{border-color:${c.accent} !important;box-shadow:0 0 0 3px ${c.accentDim} !important}
    .fl:hover{color:${c.accent}}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${c.border};border-radius:2px}
    .hb{display:flex;flex-direction:column;gap:5px;padding:8px;cursor:pointer;border:none;background:none}.hb span{display:block;width:20px;height:1.5px;background:${c.text};border-radius:1px;transition:all 0.3s}.hb.op span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}.hb.op span:nth-child(2){opacity:0}.hb.op span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
    .mm{position:fixed;top:56px;left:0;right:0;background:${c.menuBg};backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid ${c.border};z-index:149;animation:slideDown 0.2s ease;padding:6px 0}.mm button{display:block;width:100%;text-align:left;padding:14px 24px;background:none;border:none;color:${c.muted};font-size:15px;font-weight:500;font-family:inherit;cursor:pointer}.mm button.ac{color:${c.accent}}.mm button:active{background:${c.accentDim}}
    .stat-card{text-align:center;padding:${isMobile ? "18px 10px" : "22px 14px"};border-radius:12px;background:${c.card};border:1px solid ${c.border};transition:all 0.3s;position:relative;overflow:hidden}
    .stat-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:${c.accent};transform:scaleX(0);transition:transform 0.4s;transform-origin:left}
    .stat-card:hover::after{transform:scaleX(1)}.stat-card:hover{border-color:${c.accentBorder}}
    .exp-item{background:${c.card};border:1px solid ${c.border};border-left:2px solid ${c.accent};border-radius:0 10px 10px 0;padding:${isMobile ? "12px 14px" : "14px 18px"};transition:all 0.25s}
    .exp-item:hover{border-left-color:${c.accent2};background:${c.accentDim}}
    .metric-badge{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-family:var(--font-jetbrains),monospace;color:${c.accent2};margin-top:auto;padding-top:12px}
    .metric-badge span{padding:2px 8px;border-radius:4px;background:${dark ? "rgba(61,217,160,0.05)" : "rgba(10,155,106,0.04)"};border:1px solid ${dark ? "rgba(61,217,160,0.08)" : "rgba(10,155,106,0.06)"}}
  `;

  return (
    <div ref={rootRef} className="font-sans" style={{ height: "100vh", overflowY: "auto", overflowX: "hidden", background: c.bg, color: c.text, transition: "background 0.4s, color 0.4s" }}>
      <style>{css}</style>
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 200, background: `linear-gradient(90deg, ${c.accent}, ${c.accent2})`, width: `${scrollProg * 100}%`, transition: "width 0.08s", opacity: 0.5 }} />
      {!isMobile && <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />}

      {isMobile || isTablet ? (
        <><nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 150, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", background: c.nav, borderBottom: `1px solid ${c.border}`, padding: "0 18px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: c.accent, letterSpacing: 1 }}>S.S.A</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{ background: "transparent", border: `1px solid ${c.border}`, color: c.text, width: 36, height: 36, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
            <button className={`hb ${menuOpen ? "op" : ""}`} onClick={e => { e.stopPropagation(); setMenuOpen(!menuOpen); }} aria-label="Menu"><span /><span /><span /></button>
          </div></nav>
        {menuOpen && <div className="mm" onClick={e => e.stopPropagation()}>{NAV_LABELS.map((n, i) => <button key={n} className={activeNav === NAV_IDS[i] ? "ac" : ""} onClick={() => scrollTo(NAV_IDS[i])}>{n}</button>)}</div>}</>
      ) : (
        <nav style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 150, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: c.nav, border: `1px solid ${c.border}`, borderRadius: 12, padding: "4px 5px", display: "flex", gap: 1, alignItems: "center" }}>
          {NAV_LABELS.map((n, i) => <button key={n} style={{ background: activeNav === NAV_IDS[i] ? c.accent : "none", color: activeNav === NAV_IDS[i] ? "#fff" : c.muted, border: "none", fontSize: 13, fontWeight: 500, padding: "7px 18px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }} onClick={() => scrollTo(NAV_IDS[i])} onMouseEnter={e => { if (activeNav !== NAV_IDS[i]) (e.target as HTMLElement).style.color = c.text; }} onMouseLeave={e => { if (activeNav !== NAV_IDS[i]) (e.target as HTMLElement).style.color = c.muted; }}>{n}</button>)}
          <div style={{ width: 1, height: 20, background: c.border, margin: "0 4px" }} />
          <button style={{ background: "transparent", border: "none", color: c.text, width: 34, height: 34, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
        </nav>
      )}

      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: isMobile ? 70 : 80, position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: pad, width: "100%" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500, color: c.accent, background: c.accentDim, border: `1px solid ${c.accentBorder}`, marginBottom: isMobile ? 24 : 32, animation: "fadeUp 0.5s ease both" }}>Cloud Team Lead at AKSIQ</div>
            <h1 style={{ fontSize: isMobile ? 40 : isTablet ? 56 : 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: isMobile ? -1.5 : -2.5, marginBottom: 16, animation: "fadeUp 0.5s ease 0.1s both" }}>Syed Salman Ali</h1>
            <div className="font-mono" style={{ fontSize: isMobile ? 16 : 20, fontWeight: 400, color: c.accent, marginBottom: isMobile ? 22 : 30, minHeight: 28, animation: "fadeUp 0.5s ease 0.2s both", opacity: 0.8 }}>
              {typed}<span className="blink" style={{ display: "inline-block", width: 2, height: "1em", background: c.accent, marginLeft: 2, verticalAlign: "text-bottom", opacity: 0.6 }} />
            </div>
            <p style={{ fontSize: isMobile ? 15 : 17, color: c.muted, lineHeight: 1.8, maxWidth: 560, margin: `0 auto ${isMobile ? 28 : 38}px`, animation: "fadeUp 0.5s ease 0.3s both" }}>Architecting multi-region AWS infrastructure for a license-based enterprise platform serving 22+ clients across SaaS, on-premises, and Linux deployments.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.5s ease 0.4s both" }}>
              <button style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 44 }} onClick={() => scrollTo("projects")}>View Work</button>
              <button style={{ background: "transparent", color: c.text, border: `1px solid ${c.border}`, padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 44, transition: "all 0.2s" }} onClick={() => scrollTo("contact")} onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = c.accent; (e.target as HTMLElement).style.color = c.accent; }} onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = c.border; (e.target as HTMLElement).style.color = c.text; }}>Contact</button>
            </div>
          </div>
        </div>
        {!isMobile && <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: c.muted, opacity: 0.35 }}><div className="scroll-anim" /><span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Scroll</span></div>}
      </section>

      <section id="stats" ref={statsView.ref} style={{ position: "relative", zIndex: 2, padding: `${isMobile ? 28 : 40}px 0 0` }}><div style={{ maxWidth: 1060, margin: "0 auto", padding: pad }}><div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 8 : 10 }}>{STATS.map((s, i) => (<div key={i} className="stat-card" style={reveal(statsView.visible, i * 0.06)}><div className="font-mono" style={{ fontSize: isMobile ? 26 : 32, fontWeight: 700, color: c.accent, letterSpacing: -1 }}>{counters[i]}{s.suf}</div><div style={{ fontSize: 11, color: c.muted, marginTop: 4, fontWeight: 500 }}>{s.label}</div></div>))}</div></div></section>

      <section id="about" ref={aboutView.ref} style={{ position: "relative", zIndex: 2, padding: secPad }}><div style={{ maxWidth: 1060, margin: "0 auto", padding: pad }}>
        <div style={reveal(aboutView.visible)}><div className="font-mono" style={{ fontSize: 11, fontWeight: 500, color: c.accent, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10, opacity: 0.7 }}>About</div><div style={{ fontSize: isMobile ? 22 : isTablet ? 28 : 34, fontWeight: 700, letterSpacing: -0.8, marginBottom: 14 }}>Background</div><div style={{ width: 32, height: 2, background: c.accent, borderRadius: 1, marginBottom: isMobile ? 28 : 40, opacity: 0.4 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1.1fr 0.9fr", gap: isMobile ? 24 : 44, alignItems: "start" }}>
          <div style={{ ...reveal(aboutView.visible, 0.1), fontSize: isMobile ? 14 : 14.5, lineHeight: 1.85, color: c.muted }}>
            <p style={{ marginBottom: 16 }}>Cloud Team Lead at AKSIQ with 3+ years architecting <strong style={{ color: c.text, fontWeight: 600 }}>multi-region AWS infrastructure</strong> for a license-based enterprise platform serving <strong style={{ color: c.text, fontWeight: 600 }}>22+ clients</strong> across the financial sector.</p>
            <p style={{ marginBottom: 16 }}>I manage the full cloud stack including <strong style={{ color: c.text, fontWeight: 600 }}>EC2, ECS, RDS, OpenSearch, ElastiCache, S3</strong> across 3 AWS regions. My work spans <strong style={{ color: c.text, fontWeight: 600 }}>SaaS, on-premises, and Linux-based deployments</strong> with 7 CI/CD pipelines at 100% success rate.</p>
            <p style={{ marginBottom: 24 }}>Currently pursuing <strong style={{ color: c.text, fontWeight: 600 }}>MS Data Science</strong> at FAST NUCES while leading GPU-powered ML infrastructure (L40S, A100) and AI/ML pipeline automation.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{ role: "Cloud Team Lead", period: "Jul 2025 – Present" }, { role: "Senior Cloud Engineer", period: "Mid 2024 – Jun 2025" }, { role: "Associate Software Engineer", period: "Oct 2022 – Mid 2024" }, { role: "Junior Software Engineer", period: "Jul 2022 – Sep 2022" }].map((exp, i) => (<div key={i} className="exp-item"><div style={{ fontSize: isMobile ? 13 : 13.5, fontWeight: 600, marginBottom: 1 }}>{exp.role}</div><div className="font-mono" style={{ fontSize: 11, color: c.muted }}>AKSIQ · {exp.period}</div></div>))}
            </div>
          </div>
          <div style={reveal(aboutView.visible, 0.2)}>
            <div style={{ background: c.termBg, borderRadius: 12, overflow: "hidden", border: `1px solid ${c.termBdr}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: c.termHead, borderBottom: `1px solid ${c.termBdr}` }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} /><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} /><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} /><span className="font-mono" style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#4a6080" }}>salman.config.ts</span></div>
              <div className="font-mono" style={{ padding: isMobile ? "14px" : "16px 18px", fontSize: isMobile ? 11 : 12, lineHeight: 1.9, color: "#a8bcd4", overflowX: "auto" }}>
                <span style={{ color: "#4a6080" }}>{"// infrastructure at AKSIQ"}</span><br /><span style={{ color: "#8a7adf" }}>const</span> <span style={{ color: "#5ba0f5" }}>cloud</span> = {"{"}<br />{"  "}lead: <span style={{ color: "#6cc8a0" }}>&quot;Syed Salman Ali&quot;</span>,<br />{"  "}platform: <span style={{ color: "#6cc8a0" }}>&quot;Enterprise SaaS&quot;</span>,<br />{"  "}clients: <span style={{ color: "#e8a44a" }}>22</span>,<br />{"  "}regions: [<span style={{ color: "#6cc8a0" }}>&quot;VA&quot;, &quot;OH&quot;, &quot;SG&quot;</span>],<br />{"  "}deploy: [<span style={{ color: "#6cc8a0" }}>&quot;SaaS&quot;, &quot;OnPrem&quot;, &quot;Linux&quot;</span>],<br />{"  "}pipelines: <span style={{ color: "#e8a44a" }}>7</span>,<br />{"  "}databases: <span style={{ color: "#e8a44a" }}>9</span>,<br />{"}"}<br />
              </div>
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="exp-item"><div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 1 }}>MS Data Science</div><div className="font-mono" style={{ fontSize: 11, color: c.muted }}>FAST NUCES · 2026 · CGPA 3.22</div></div>
              <div className="exp-item"><div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 1 }}>BS Computer Science</div><div className="font-mono" style={{ fontSize: 11, color: c.muted }}>MAJU · 2022 · CGPA 3.22</div></div>
            </div>
          </div>
        </div>
      </div></section>

      <section id="projects" ref={projView.ref} style={{ position: "relative", zIndex: 2, padding: secPad }}><div style={{ maxWidth: 1060, margin: "0 auto", padding: pad }}>
        <div style={reveal(projView.visible)}><div className="font-mono" style={{ fontSize: 11, fontWeight: 500, color: c.accent, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10, opacity: 0.7 }}>Work</div><div style={{ fontSize: isMobile ? 22 : isTablet ? 28 : 34, fontWeight: 700, letterSpacing: -0.8, marginBottom: 14 }}>What I Build & Manage</div><div style={{ width: 32, height: 2, background: c.accent, borderRadius: 1, marginBottom: isMobile ? 28 : 40, opacity: 0.4 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: isMobile ? 12 : 14 }}>{PROJECTS.map((p, i) => (<div key={i} style={reveal(projView.visible, i * 0.06)}><div className="proj-card"><div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}><span className="font-mono" style={{ fontSize: 11, color: c.accent, opacity: 0.5, fontWeight: 600 }}>{p.num}</span><span style={{ fontSize: isMobile ? 14.5 : 15.5, fontWeight: 650 }}>{p.title}</span></div><div style={{ fontSize: 13, color: c.muted, lineHeight: 1.75, marginBottom: 14, flex: 1 }}>{p.desc}</div><div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 2 }}>{p.tags.map(tg => <span key={tg} className="font-mono" style={{ padding: "3px 9px", borderRadius: 4, fontSize: 11, fontWeight: 500, color: c.accent, background: c.tagBg, border: `1px solid ${c.tagBorder}` }}>{tg}</span>)}</div><div className="metric-badge"><span>{p.metrics}</span></div></div></div>))}</div>
      </div></section>

      <section id="skills" ref={skillView.ref} style={{ position: "relative", zIndex: 2, padding: secPad }}><div style={{ maxWidth: 1060, margin: "0 auto", padding: pad }}>
        <div style={reveal(skillView.visible)}><div className="font-mono" style={{ fontSize: 11, fontWeight: 500, color: c.accent, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10, opacity: 0.7 }}>Skills</div><div style={{ fontSize: isMobile ? 22 : isTablet ? 28 : 34, fontWeight: 700, letterSpacing: -0.8, marginBottom: 14 }}>Technical Expertise</div><div style={{ width: 32, height: 2, background: c.accent, borderRadius: 1, marginBottom: isMobile ? 20 : 36, opacity: 0.4 }} /></div>
        <div style={{ ...reveal(skillView.visible, 0.06), display: "flex", gap: 2, background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, padding: 3, marginBottom: isMobile ? 18 : 28, overflowX: "auto" }}>{SKILL_CATS.map((cat, i) => <button key={cat.name} style={{ background: tab === i ? c.accent : "none", color: tab === i ? "#fff" : c.muted, border: "none", padding: isMobile ? "7px 14px" : "7px 18px", borderRadius: 6, fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap", minHeight: 34 }} onClick={() => setTab(i)}>{cat.name}</button>)}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{SKILL_CATS[tab].skills.map((s, i) => (<div key={`${tab}-${i}`} className="sk-item" style={reveal(skillView.visible, 0.08 + i * 0.04)}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 550 }}>{s.n}</span><span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: c.accent, opacity: 0.7 }}>{s.l}%</span></div><div style={{ height: 4, borderRadius: 2, background: c.skillBg, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 2, background: c.accent, width: skillView.visible ? `${s.l}%` : "0%", transition: "width 1s cubic-bezier(.22,.61,.36,1)", opacity: 0.65 }} /></div></div>))}</div>
      </div></section>

      <section id="contact" ref={contactView.ref} style={{ position: "relative", zIndex: 2, padding: isMobile ? "64px 0 50px" : secPad }}><div style={{ maxWidth: 1060, margin: "0 auto", padding: pad }}>
        <div style={reveal(contactView.visible)}><div className="font-mono" style={{ fontSize: 11, fontWeight: 500, color: c.accent, textTransform: "uppercase", letterSpacing: 5, marginBottom: 10, opacity: 0.7 }}>Contact</div><div style={{ fontSize: isMobile ? 22 : isTablet ? 28 : 34, fontWeight: 700, letterSpacing: -0.8, marginBottom: 14 }}>Let&apos;s Talk</div><div style={{ width: 32, height: 2, background: c.accent, borderRadius: 1, marginBottom: isMobile ? 24 : 40, opacity: 0.4 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 44 }}>
          <div style={reveal(contactView.visible, 0.08)}><h3 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 650, marginBottom: 10 }}>Open to opportunities</h3><p style={{ color: c.muted, lineHeight: 1.75, marginBottom: 22, fontSize: 14 }}>Whether you have a role, a project, or just want to connect.</p>
            {CONTACTS.map(ci => (<a key={ci.label} href={ci.href || "#"} target={ci.href ? "_blank" : undefined} rel="noopener noreferrer" className="ci-link" style={{ fontSize: isMobile ? 13 : 14 }}><span style={{ width: 38, height: 38, borderRadius: 8, background: c.accentDim, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{ci.icon}</span><span style={{ wordBreak: "break-all" }}>{ci.label}</span></a>))}
          </div>
          <div style={reveal(contactView.visible, 0.16)}>
            {sent ? (<div style={{ textAlign: "center", padding: isMobile ? 28 : 40, background: c.card, border: `1px solid ${c.border}`, borderRadius: 12 }}><div style={{ width: 48, height: 48, borderRadius: "50%", margin: "0 auto 12px", background: c.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: c.accent2 }}>✓</div><h3 style={{ fontSize: 16, fontWeight: 650, marginBottom: 4 }}>Message sent</h3><p style={{ color: c.muted, fontSize: 13 }}>I&apos;ll reply within 24 hours.</p></div>
            ) : (<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${c.inputB}`, background: c.input, color: c.text, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 44 }} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${c.inputB}`, background: c.input, color: c.text, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 44 }} placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              <textarea style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${c.inputB}`, background: c.input, color: c.text, fontSize: 14, fontFamily: "inherit", outline: "none", minHeight: 110, resize: "vertical" }} placeholder="What's on your mind?" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
              <button style={{ background: c.accent, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", width: "100%", minHeight: 44 }} onClick={() => setSent(true)}>Send Message</button>
            </div>)}
          </div>
        </div>
      </div></section>

      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "24px 0", textAlign: "center", position: "relative", zIndex: 2 }}><div style={{ maxWidth: 1060, margin: "0 auto", padding: pad }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 6 }}>{[{ l: "GitHub", h: "https://github.com/iSyedSalmanAli" }, { l: "LinkedIn", h: "https://www.linkedin.com/in/isyedsalmanali" }].map(lk => <a key={lk.l} href={lk.h} target="_blank" rel="noopener noreferrer" className="fl" style={{ color: c.muted, fontSize: 12, fontWeight: 500, textDecoration: "none" }}>{lk.l}</a>)}</div>
        <p style={{ fontSize: 11, color: c.muted, opacity: 0.4 }}>© 2026 Syed Salman Ali</p>
      </div></footer>
    </div>
  );
}
