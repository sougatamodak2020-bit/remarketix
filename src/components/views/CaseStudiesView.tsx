"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import {
  ArrowRight, Sparkles, Target, TrendingUp, Award,
  CheckCircle, X, ChevronLeft, ChevronRight,
  BarChart3, Search, Zap, Settings, Users, ArrowLeft
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const FILTERS = ["All", "Lead Generation", "Outreach", "Content", "Website"];

const CASES = [
  {
    id: 0,
    category: "Lead Generation",
    client: "Event Management Company",
    title: "Exhibitor Marketing Data – Europe",
    region: "DACH Region",
    type: "B2B Event Platform",
    result: "3x increase in qualified leads",
    shortDesc: "Built a targeted lead database and executed outreach campaigns to generate consistent leads.",
    stats: [
      { v: "2,400+", l: "Contacts",      icon: Target      },
      { v: "99%",    l: "Accuracy",       icon: CheckCircle },
      { v: "40%",    l: "Pipeline Boost", icon: TrendingUp  },
    ],
    problem: "No consistent lead generation system. Outdated exhibitor lists with incorrect emails and missing decision-makers caused campaigns to fail before they started.",
    solution: ["Built targeted database of 800+ companies", "Identified CMOs and Marketing Directors", "Triple-verified all email addresses", "Segmented contacts by role and company size"],
    results:  ["2,400+ verified contacts delivered", "99% email accuracy rate achieved", "40% pipeline growth within 60 days", "Consistent monthly lead pipeline established"],
    process:  ["Research & targeting of DACH exhibitors", "Data building with multi-source verification", "Campaign execution across email and LinkedIn", "Ongoing optimisation based on response rates"],
    services: ["Lead Generation", "Email Verification", "LinkedIn Outreach"],
    color: "emerald",
  },
  {
    id: 1,
    category: "Lead Generation",
    client: "Hospitality Supplier",
    title: "UK Pub & Restaurant Leads",
    region: "London & Southeast",
    type: "Hospitality Supplier",
    result: "Hyper-personalized outreach with immediate results",
    shortDesc: "Researched and verified over 1,200 hospitality decision-makers across London and Southeast UK.",
    stats: [
      { v: "1,200+", l: "Contacts", icon: Target      },
      { v: "98%",    l: "Accuracy", icon: CheckCircle },
      { v: "2 wks",  l: "Delivery", icon: Award       },
    ],
    problem: "Generic databases with duplicates and no real decision-maker contacts. The client was wasting budget on unqualified outreach with near-zero response rates.",
    solution: ["Manual research for every contact", "Validated ownership and management status", "Found Owners and Managing Directors only", "Segmented by location and venue type"],
    results:  ["1,200+ verified hospitality contacts", "98% deliverability on email campaigns", "Delivered in under 2 weeks", "Immediate pipeline conversations opened"],
    process:  ["Research of London & SE hospitality venues", "Manual validation of each decision-maker", "Data formatting for CRM import", "Campaign support and optimisation"],
    services: ["Lead Generation", "Data Research", "CRM Management"],
    color: "blue",
  },
  {
    id: 2,
    category: "Lead Generation",
    client: "Pharmaceutical R&D",
    title: "BioPharma Research Contacts",
    region: "South Korea",
    type: "Pharmaceutical R&D",
    result: "Breakthrough access to Korean scientific community",
    shortDesc: "Mapped Korean biotech companies and identified R&D decision-makers using specialist portals.",
    stats: [
      { v: "30+", l: "Companies", icon: Target      },
      { v: "90+", l: "Contacts",  icon: CheckCircle },
      { v: "95%", l: "Delivery",  icon: TrendingUp  },
    ],
    problem: "Language barriers and limited public data for Korean biotech made standard research impossible. The client had no foothold in the South Korean market.",
    solution: ["Used ResearchGate and Korean R&D portals", "Cross-referenced academic publications", "Identified lab heads and procurement directors", "Validated contacts through professional networks"],
    results:  ["30+ Korean biotech companies mapped", "90+ verified decision-maker contacts", "95% email deliverability rate", "Successful first-contact campaigns launched"],
    process:  ["Deep research using Korean-language sources", "Cross-validation via academic databases", "Contact extraction and formatting", "Outreach strategy tailored to R&D culture"],
    services: ["Company Research", "Email Hunting", "Data Collection"],
    color: "violet",
  },
  {
    id: 3,
    category: "Lead Generation",
    client: "B2B SaaS Platform",
    title: "Multi-Site Hospitality Chains",
    region: "UK National",
    type: "B2B SaaS Platform",
    result: "Successful SaaS demo campaign with surgical precision",
    shortDesc: "Identified Tier 1 & 2 hospitality chains and sourced multi-level decision-maker contacts.",
    stats: [
      { v: "200+", l: "Chains",      icon: Target      },
      { v: "800+", l: "Contacts",    icon: CheckCircle },
      { v: "3",    l: "Role Levels", icon: Award       },
    ],
    problem: "Identify Tier 1 & 2 chains and find Operations, Finance, and IT decision-makers — a multi-layered targeting challenge requiring precision at scale.",
    solution: ["Mapped 200+ chains via UK company registries", "Sourced C-level contacts via LinkedIn and Apollo", "Built 3-tier contact lists by seniority", "Verified all data against live company records"],
    results:  ["200+ chain organisations identified", "800+ contacts across 3 role levels", "SaaS demo campaign launched successfully", "Consistent qualified pipeline generated"],
    process:  ["UK hospitality chain registry research", "Multi-platform contact sourcing", "Role-level segmentation and tagging", "CRM-ready delivery with campaign support"],
    services: ["Lead Generation", "Company Research", "LinkedIn Outreach"],
    color: "cyan",
  },
];

const colorMap: Record<string, {
  text: string; bg: string; border: string;
  badge: string; dot: string; grad: string;
}> = {
  emerald: { text:"text-emerald-400", bg:"bg-emerald-500/10", border:"border-emerald-500/25", badge:"bg-emerald-500/15 border-emerald-500/25 text-emerald-400", dot:"bg-emerald-400", grad:"from-emerald-500 to-teal-500"   },
  blue:    { text:"text-blue-400",    bg:"bg-blue-500/10",    border:"border-blue-500/25",    badge:"bg-blue-500/15    border-blue-500/25    text-blue-400",    dot:"bg-blue-400",    grad:"from-blue-500 to-cyan-500"      },
  violet:  { text:"text-violet-400",  bg:"bg-violet-500/10",  border:"border-violet-500/25",  badge:"bg-violet-500/15  border-violet-500/25  text-violet-400",  dot:"bg-violet-400",  grad:"from-violet-500 to-purple-500"  },
  cyan:    { text:"text-cyan-400",    bg:"bg-cyan-500/10",    border:"border-cyan-500/25",    badge:"bg-cyan-500/15    border-cyan-500/25    text-cyan-400",    dot:"bg-cyan-400",    grad:"from-cyan-500 to-blue-500"      },
};

/* ─── Dedicated Case Study Details Page ─────────────────────────────────────── */
function CaseDetailsPage({ c, onBack, onPrev, onNext, hasPrev, hasNext }: {
  c: typeof CASES[0]; onBack: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  const col = colorMap[c.color];
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [c.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen text-white pb-20"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-[500px] h-[500px]"
              style={{ 
                background: `radial-gradient(ellipse 50% 50% at 50% 50%,${c.color === 'emerald' ? 'rgba(16,185,129,0.12)' : c.color === 'blue' ? 'rgba(59,130,246,0.12)' : c.color === 'violet' ? 'rgba(139,92,246,0.12)' : 'rgba(6,182,212,0.12)'},transparent 70%)`,
                filter: "blur(100px)"
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
              style={{ 
                background: `radial-gradient(ellipse 50% 50% at 50% 50%,${c.color === 'emerald' ? 'rgba(20,184,166,0.1)' : c.color === 'blue' ? 'rgba(6,182,212,0.1)' : c.color === 'violet' ? 'rgba(168,85,247,0.1)' : 'rgba(59,130,246,0.1)'},transparent 70%)`,
                filter: "blur(100px)"
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>

      {/* Sticky Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0f1a]/80 border-b border-white/[0.08]"
      >
        <div className="container-custom px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">All Cases</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center group"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <span className="text-sm text-white/40 font-medium min-w-[60px] text-center">
                {c.id + 1} / {CASES.length}
              </span>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container-custom px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="pt-12 pb-8 md:pt-16 md:pb-12"
        >
          {/* Color accent bar */}
          <div className={`h-1.5 w-32 bg-gradient-to-r ${col.grad} rounded-full mb-8`} />

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`text-sm font-bold px-4 py-2 rounded-xl border ${col.badge}`}>
              {c.type}
            </span>
            <span className="text-sm text-white/50 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              {c.region}
            </span>
            <span className={`text-sm font-bold px-4 py-2 rounded-xl border ${col.badge}`}>
              {c.category}
            </span>
          </div>

          {/* Title & Client */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            {c.title}
          </h1>
          <p className={`text-xl md:text-2xl font-semibold ${col.text} mb-6`}>
            {c.client}
          </p>

          {/* Result highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${col.bg} border ${col.border}`}
          >
            <Award className={`w-6 h-6 ${col.text}`} />
            <p className={`text-lg font-bold ${col.text} italic`}>{c.result}</p>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {c.stats.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`relative overflow-hidden p-8 rounded-2xl ${col.bg} border ${col.border} group hover:scale-105 transition-transform duration-300`}
            >
              <div className="relative z-10">
                <s.icon className={`w-10 h-10 ${col.text} mb-4`} />
                <div className={`text-4xl md:text-5xl font-black ${col.text} mb-2`}>
                  {s.v}
                </div>
                <div className="text-sm text-white/50 uppercase tracking-widest font-bold">
                  {s.l}
                </div>
              </div>
              <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${col.grad} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Problem Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="feature-card-premium p-8 h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                The Challenge
              </h2>
            </div>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {c.problem}
            </p>
          </motion.div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="feature-card-premium p-8 h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${col.dot}`} />
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                Our Solution
              </h2>
            </div>
            <ul className="space-y-4">
              {c.solution.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-3 text-base text-white/70"
                >
                  <CheckCircle className={`w-5 h-5 ${col.text} flex-shrink-0 mt-0.5`} />
                  <span>{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <div className="feature-card-premium p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Award className={`w-8 h-8 ${col.text}`} />
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">
                The Results
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className={`flex items-start gap-4 p-5 rounded-xl ${col.bg} border ${col.border}`}
                >
                  <div className={`w-2 h-2 rounded-full ${col.dot} flex-shrink-0 mt-2`} />
                  <p className={`text-base font-semibold ${col.text}`}>{r}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-8 text-center">
            How We Delivered Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="feature-card-premium p-6 flex items-start gap-4 group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${col.bg} border ${col.border} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-xl font-black ${col.text}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-base text-white/80 leading-relaxed">{p}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Used */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-xl font-black text-white/50 uppercase tracking-widest mb-6 text-center">
            Services Used
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {c.services.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className={`text-sm px-6 py-3 rounded-full border ${col.badge} font-bold hover:scale-110 transition-transform duration-300 cursor-default`}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Navigation Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center justify-between pt-12 pb-8 border-t border-white/10"
        >
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all group ${
              hasPrev
                ? `${col.bg} ${col.border} hover:scale-105`
                : 'bg-white/5 border-white/10 opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className={`w-5 h-5 ${hasPrev ? col.text : 'text-white/30'} group-hover:-translate-x-1 transition-transform`} />
            <span className={`font-semibold ${hasPrev ? col.text : 'text-white/30'}`}>
              Previous Case
            </span>
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all group ${
              hasNext
                ? `${col.bg} ${col.border} hover:scale-105`
                : 'bg-white/5 border-white/10 opacity-30 cursor-not-allowed'
            }`}
          >
            <span className={`font-semibold ${hasNext ? col.text : 'text-white/30'}`}>
              Next Case
            </span>
            <ChevronRight className={`w-5 h-5 ${hasNext ? col.text : 'text-white/30'} group-hover:translate-x-1 transition-transform`} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Case Card ─────────────────────────────────────────────────────────────── */
function CaseCard({ c, onOpen, isMobile, index }: {
  c: typeof CASES[0]; onOpen: () => void; isMobile: boolean; index: number;
}) {
  const col = colorMap[c.color];
  return (
    <motion.div layout
      initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.35 }}
      className="group"
    >
      <motion.div
        className="feature-card-premium h-full flex flex-col cursor-pointer relative"
        whileHover={!isMobile ? { y: -5 } : {}} transition={{ duration: 0.25 }}
        onClick={onOpen} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        aria-label={`View ${c.title} case study`}
      >
        {/* Watermark */}
        <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header badges */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${col.badge}`}>{c.type}</span>
            <span className="text-[10px] text-white/35 text-right leading-tight">{c.region}</span>
          </div>

          {/* Category */}
          <span className={`text-[10px] font-black uppercase tracking-widest ${col.text} mb-2`}>{c.category}</span>

          {/* Title + client */}
          <h3 className="text-white font-bold text-base leading-snug mb-1">{c.title}</h3>
          <p className={`text-sm font-semibold ${col.text} mb-3`}>{c.client}</p>
          <p className="text-sm text-white/50 leading-relaxed mb-5 flex-grow">{c.shortDesc}</p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/[0.025] rounded-xl border border-white/[0.05]">
            {c.stats.map((s) => (
              <div key={s.l} className="text-center">
                <div className={`text-sm font-bold ${col.text} mb-0.5`}>{s.v}</div>
                <div className="text-[10px] text-white/35 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Result pill */}
          <div className={`flex items-center gap-2 p-2.5 rounded-xl ${col.bg} border ${col.border} mb-4`}>
            <Award className={`w-3.5 h-3.5 ${col.text} flex-shrink-0`} />
            <p className={`text-xs font-semibold ${col.text} italic`}>{c.result}</p>
          </div>

          {/* CTA */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-white/55 hover:text-white text-sm font-semibold transition-all touch-manipulation">
            View Full Case Study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────────── */
export default function CaseStudiesView() {
  const setView = useAppStore((s) => s.setView);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState("All");
  const [openId, setOpenId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible = CASES.filter((c) => active === "All" || c.category === active);
  const openCase = openId !== null ? CASES.find((c) => c.id === openId) ?? null : null;
  
  const nav = useCallback((dir: 1 | -1) => {
    if (openId === null) return;
    const idx = CASES.findIndex((c) => c.id === openId);
    const next = CASES[idx + dir];
    if (next) setOpenId(next.id);
  }, [openId]);

  // If a case is open, show the dedicated page
  if (openCase) {
    return (
      <AnimatePresence mode="wait">
        <CaseDetailsPage
          key={openCase.id}
          c={openCase}
          onBack={() => setOpenId(null)}
          onPrev={() => nav(-1)}
          onNext={() => nav(1)}
          hasPrev={openCase.id > 0}
          hasNext={openCase.id < CASES.length - 1}
        />
      </AnimatePresence>
    );
  }

  // Otherwise show the grid view
  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!prefersReducedMotion && !isMobile && (
          <>
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px]"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.09),transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px]"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.09),transparent 70%)", filter: "blur(80px)" }} />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.018]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative section-spacing pt-16 md:pt-24">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="badge-glow mx-auto mb-6 w-fit">
              <Sparkles className="w-4 h-4" />
              Precision • Verification • Execution
            </div>
            <h1 className="heading-display mb-4 max-w-4xl mx-auto">
              <span className="block text-white">Our Work</span>
              <span className="block gradient-text-enhanced mt-2">Real Results, Real Growth</span>
            </h1>
            <div className="h-1.5 w-24 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6" />
            <p className="text-body-lg max-w-2xl mx-auto text-white/75 px-4">
              A look at how we help businesses generate leads, build systems and drive consistent growth through data, outreach and execution.
            </p>
          </motion.div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 md:mt-14 max-w-4xl mx-auto">
            {[
              { n: "4,500+", l: "Verified Contacts" },
              { n: "99%",    l: "Accuracy Rate"     },
              { n: "12",     l: "Countries"          },
              { n: "40%",    l: "Avg. Growth Boost"  },
            ].map((s, i) => (
              <motion.div key={s.l} className="stat-card-premium"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}>
                <div className="stat-value text-2xl md:text-3xl mb-1">{s.n}</div>
                <div className="stat-label text-xs">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="container-custom px-4">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:flex-wrap md:justify-center md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`flex-shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-sm font-semibold transition-all touch-manipulation ${
                  active === f
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-white/5 text-white/55 hover:bg-white/10 hover:text-white border border-white/10"
                }`}>
                {f}
              </button>
            ))}
          </div>

          {/* Grid — 3-col desktop, 1-col mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((c, i) => (
                <CaseCard key={c.title} c={c} index={i} isMobile={isMobile}
                  onOpen={() => setOpenId(c.id)} />
              ))}
            </AnimatePresence>
          </div>

          {visible.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-white/15 mx-auto mb-4" />
              <p className="text-white/35 text-sm">No case studies in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Process proof ── */}
      <section className="section-spacing-sm">
        <div className="container-custom px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-12">
            <h2 className="heading-xl text-white mb-3">How We Deliver Results</h2>
            <div className="h-px w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { icon: Search,    n: "01", title: "Research & Targeting",  desc: "Deep ICP analysis and market mapping"           },
              { icon: BarChart3, n: "02", title: "Data Building",         desc: "Multi-source, triple-verified databases"        },
              { icon: Zap,       n: "03", title: "Campaign Execution",    desc: "Structured outreach with personalised messaging" },
              { icon: Settings,  n: "04", title: "Optimisation",          desc: "Ongoing tuning based on real response data"     },
            ].map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.45 }}
                className="feature-card-premium text-center p-4 md:p-5">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs font-black text-white/20 mb-1.5 tracking-widest">{p.n}</div>
                <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">{p.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing-sm">
        <div className="container-custom px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-14">
            <h2 className="heading-xl mb-4">
              <span className="text-white">Ready to Write Your</span>
              <span className="block gradient-text-enhanced mt-2">Success Story?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 text-white/75">
              Join hundreds of businesses that turned data challenges into growth.
            </p>
            <button onClick={() => setView("contact")}
              className="btn-cta-premium group w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              Let&apos;s Talk Growth
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}