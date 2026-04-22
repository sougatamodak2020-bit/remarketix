"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAppStore } from "@/store/appStore";
import {
  Users, Database, Crosshair, Keyboard, Link2, UserRound, Send,
  SearchCheck, CloudDownload, Building2, Code2, Wand2, ArrowRight,
  Sparkles, Check, ChevronLeft, ChevronRight, ChevronDown,
  BarChart3, Globe, Target, Zap
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "data",
    label: "Data & Lead Generation",
    accent: "emerald",
    icon: Database,
    intro: "Build accurate, targeted and high-quality data to reach the right audience.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    borderAccent: "border-emerald-500/30",
    services: [
      {
        icon: Users, color: "rose",
        title: "Lead Generation & Prospect Research",
        subtitle: "Prospect Research",
        desc: "Lead generation and prospect research involves identifying and building targeted contact lists based on your ideal customer profile. At Remarketix, we research, filter and verify data to ensure you connect with the right decision-makers for your business.",
        features: ["B2B Lead Generation", "Industry-Specific Prospecting", "Target Account Mapping", "Market Segmentation", "Decision-Maker Discovery"],
      },
      {
        icon: Database, color: "emerald",
        title: "Data Research & Web Scraping",
        subtitle: "Web Scraping",
        desc: "Data research and web scraping focuses on collecting structured information from multiple reliable sources. We gather, organize and format data that can be used for analysis, targeting and business decision-making.",
        features: ["Company & Contact Research", "Market Analysis", "Web Data Extraction", "Data Cleaning & Validation"],
      },
      {
        icon: Crosshair, color: "violet",
        title: "Email Hunting & Verification",
        subtitle: "Verification",
        desc: "Email hunting and verification is the process of finding and validating business email addresses for outreach campaigns. We use multiple verification steps to ensure high deliverability and reduce bounce rates.",
        features: ["Email Discovery", "Multi-Step Verification", "Deliverability Checks", "CRM-Ready Lists"],
      },
      {
        icon: Keyboard, color: "blue",
        title: "Data Entry & CRM Management",
        subtitle: "CRM Management",
        desc: "Data entry and CRM management ensures your data is properly organized, updated and usable. We maintain your CRM systems with clean, structured and accurate data for better workflow and tracking.",
        features: ["CRM Maintenance", "Data Entry & Formatting", "Duplicate Removal", "Periodic Audits"],
      },
      {
        icon: CloudDownload, color: "indigo",
        title: "Data Collection",
        subtitle: "Structured Data",
        desc: "Data collection involves gathering relevant business and market information from public and online sources. We deliver structured datasets that support research, targeting and campaign planning.",
        features: ["Web Data Gathering", "Competitor Analysis", "Contact Extraction", "Excel/CSV Delivery"],
      },
      {
        icon: Building2, color: "amber",
        title: "Company Research",
        subtitle: "Business Intelligence",
        desc: "Company research helps you understand your target accounts before reaching out. We provide insights into company background, industry position, decision-makers and growth signals.",
        features: ["Company Profiles", "Industry Analysis", "Growth Signals", "Decision-Maker IDs"],
      },
    ],
  },
  {
    id: "outreach",
    label: "Outreach & Engagement",
    accent: "blue",
    icon: Send,
    intro: "Turn data into conversations and business opportunities.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    borderAccent: "border-blue-500/30",
    services: [
      {
        icon: Link2, color: "cyan",
        title: "LinkedIn Outreach & Engagement",
        subtitle: "Engagement",
        desc: "LinkedIn outreach and engagement focuses on building professional connections through personalized messaging. We create structured campaigns that generate responses, conversations and qualified leads.",
        features: ["Prospect Identification", "Custom Sequences", "Response Tracking", "Campaign Reporting"],
      },
      {
        icon: Send, color: "pink",
        title: "Email Marketing Campaigns",
        subtitle: "Campaigns",
        desc: "Email marketing campaigns involve reaching your target audience with personalized and strategic communication. We design and execute campaigns that improve response rates and generate business opportunities.",
        features: ["Email Copywriting", "Campaign Setup", "A/B Testing", "Automation"],
      },
    ],
  },
  {
    id: "content",
    label: "Content & Brand Growth",
    accent: "violet",
    icon: SearchCheck,
    intro: "Build authority and generate inbound leads through content.",
    gradient: "from-violet-500/20 to-purple-500/10",
    borderAccent: "border-violet-500/30",
    services: [
      {
        icon: UserRound, color: "orange",
        title: "LinkedIn Management & Profile",
        subtitle: "Profile Optimization",
        desc: "LinkedIn management focuses on optimizing your profile and maintaining consistent content. We help position your profile as a strong personal brand that attracts inbound opportunities.",
        features: ["Profile Optimization", "Content Planning", "Audience Engagement", "Analytics Tracking"],
      },
      {
        icon: SearchCheck, color: "teal",
        title: "SEO & Content Marketing",
        subtitle: "Content Marketing",
        desc: "SEO and content marketing helps improve your visibility across search and digital platforms. We create optimized content that drives traffic, builds authority and supports long-term growth.",
        features: ["Keyword Research", "On-Page SEO", "Content Writing", "Ranking Reports"],
      },
    ],
  },
  {
    id: "digital",
    label: "Digital & Product Solutions",
    accent: "orange",
    icon: Code2,
    intro: "Build and promote digital assets that support your growth.",
    gradient: "from-orange-500/20 to-amber-500/10",
    borderAccent: "border-orange-500/30",
    services: [
      {
        icon: Code2, color: "fuchsia",
        title: "Web Development & UI/UX Design",
        subtitle: "UI/UX Design",
        desc: "Web development and UI UX design focuses on creating user-friendly and conversion-driven digital experiences. We design and develop websites that align with your business goals and improve user engagement.",
        features: ["Responsive Design", "UI/UX", "Frontend Build", "Tech Integration"],
      },
      {
        icon: Wand2, color: "red",
        title: "Product Advertising",
        subtitle: "CGI & Creative",
        desc: "Product advertisement focuses on promoting your offerings through creative and strategic campaigns. We develop concepts, messaging and campaigns that increase visibility and drive results.",
        features: ["Ad Concepts", "Script & Copy", "Visual Design", "Motion Graphics"],
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/25",    text: "text-rose-400",    dot: "bg-rose-400"    },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-400", dot: "bg-emerald-400" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/25",  text: "text-violet-400",  dot: "bg-violet-400"  },
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/25",    text: "text-blue-400",    dot: "bg-blue-400"    },
  cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/25",    text: "text-cyan-400",    dot: "bg-cyan-400"    },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/25",  text: "text-orange-400",  dot: "bg-orange-400"  },
  pink:    { bg: "bg-pink-500/10",    border: "border-pink-500/25",    text: "text-pink-400",    dot: "bg-pink-400"    },
  teal:    { bg: "bg-teal-500/10",    border: "border-teal-500/25",    text: "text-teal-400",    dot: "bg-teal-400"    },
  indigo:  { bg: "bg-indigo-500/10",  border: "border-indigo-500/25",  text: "text-indigo-400",  dot: "bg-indigo-400"  },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/25",   text: "text-amber-400",   dot: "bg-amber-400"   },
  fuchsia: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/25", text: "text-fuchsia-400", dot: "bg-fuchsia-400" },
  red:     { bg: "bg-red-500/10",     border: "border-red-500/25",     text: "text-red-400",     dot: "bg-red-400"     },
};

const accentMap: Record<string, string> = {
  emerald: "text-emerald-400", blue: "text-blue-400", violet: "text-violet-400", orange: "text-orange-400"
};
const accentBgMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
  blue:    "bg-blue-500/10    border-blue-500/25    text-blue-400",
  violet:  "bg-violet-500/10  border-violet-500/25  text-violet-400",
  orange:  "bg-orange-500/10  border-orange-500/25  text-orange-400",
};
const accentGradMap: Record<string, string> = {
  emerald: "from-emerald-500 to-teal-500",
  blue:    "from-blue-500 to-cyan-500",
  violet:  "from-violet-500 to-purple-500",
  orange:  "from-orange-500 to-amber-500",
};

/* ─── Service Card ───────────────────────────────────────────────────────────── */
function ServiceCard({ service, isMobile }: { service: typeof CATEGORIES[0]["services"][0]; isMobile: boolean }) {
  const c = colorMap[service.color];
  const setView = useAppStore((s) => s.setView);
  
  return (
    <motion.div
      className="group relative feature-card-premium h-full flex flex-col"
      whileHover={!isMobile ? { y: -6, scale: 1.015 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r ${c.text.replace("text-", "from-")} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon + subtitle */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <service.icon className={`w-6 h-6 ${c.text}`} />
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.bg} border ${c.border} ${c.text}`}>
            {service.subtitle}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base md:text-lg leading-snug mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/55 text-sm leading-relaxed mb-5 flex-grow">{service.desc}</p>

        {/* Features */}
        <div className="border-t border-white/[0.06] pt-4">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.12em] mb-3">Includes</p>
          <ul className="space-y-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                <Check className={`w-3.5 h-3.5 ${c.text} flex-shrink-0`} />
                <span className="group-hover:text-white/80 transition-colors duration-200">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FIX #7: Make arrow button clickable */}
        <motion.button
          onClick={() => setView("services")}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors group/arrow touch-manipulation"
          whileHover={!isMobile ? { x: 4 } : {}}
        >
          View Details
          <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Category Section ───────────────────────────────────────────────────────── */
function CategorySection({ cat, isMobile, scrollRef }: {
  cat: typeof CATEGORIES[0];
  isMobile: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [open, setOpen] = useState(true);
  const ac = accentMap[cat.accent];
  const acBg = accentBgMap[cat.accent];
  const acGrad = accentGradMap[cat.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mb-16 md:mb-24"
    >
      {/* Category header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left mb-8 md:mb-10 group"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${acBg}`}>
              <cat.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h2 className={`text-xl md:text-2xl font-bold text-white`}>{cat.label}</h2>
              <p className={`text-sm ${ac} font-medium`}>{cat.intro}</p>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${acBg} transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {/* Accent line */}
        <div className={`mt-5 h-px bg-gradient-to-r ${acGrad} to-transparent opacity-40`} />
      </button>

      {/* Cards */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Mobile swipe */}
          <div className="md:hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              {cat.services.map((s) => (
                <div key={s.title} className="flex-shrink-0 snap-start" style={{ width: "min(82vw, 300px)" }}>
                  <ServiceCard service={s} isMobile={isMobile} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {cat.services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <ServiceCard service={s} isMobile={isMobile} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────────── */
export default function ServicesView() {
  const setView = useAppStore((s) => s.setView);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {!prefersReducedMotion && !isMobile && (
          <>
            <div className="absolute top-0 right-0 w-[500px] h-[500px]"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.12),transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px]"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.12),transparent 70%)", filter: "blur(80px)" }} />
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
              Empower Your Business
            </div>
            <h1 className="heading-display mb-4 max-w-4xl mx-auto">
              <span className="block text-white">Our Services</span>
              <span className="block gradient-text-enhanced mt-2">to Power Your Growth</span>
            </h1>
            <div className="h-1.5 w-24 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6" />
            <p className="text-body-lg max-w-2xl mx-auto text-white/75 px-4">
              Structured solutions across lead generation, outreach, content and digital execution to help businesses grow consistently.
            </p>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 md:mt-14 max-w-3xl mx-auto">
            {[
              { icon: Target,    v: "12+", l: "Services" },
              { icon: BarChart3, v: "500+", l: "Projects" },
              { icon: Globe,     v: "12",   l: "Countries" },
              { icon: Zap,       v: "48h",  l: "Turnaround" },
            ].map((s, i) => (
              <motion.div key={s.l} className="stat-card-premium"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}>
                <s.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <div className="stat-value text-xl md:text-2xl mb-0.5">{s.v}</div>
                <div className="stat-label text-xs">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category jump nav ── */}
      <div className="sticky top-20 md:top-24 z-30 bg-[var(--bg-primary)]/80 border-b border-white/[0.06] backdrop-blur-md">
        <div className="container-custom px-4">
          <div className="flex gap-1 md:gap-2 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <a key={cat.id} href={`#cat-${cat.id}`}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border transition-all touch-manipulation ${accentBgMap[cat.accent]}`}>
                <cat.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category sections ── */}
      <section className="section-spacing">
        <div className="container-custom px-4">
          {CATEGORIES.map((cat) => (
            <div id={`cat-${cat.id}`} key={cat.id} className="scroll-mt-32">
              <CategorySection cat={cat} isMobile={isMobile} scrollRef={scrollRef} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing-sm relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {!prefersReducedMotion && !isMobile && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
              style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.12),transparent 70%)", filter: "blur(80px)" }} />
          )}
        </div>
        <div className="container-custom relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-16">
            <h2 className="heading-xl mb-4 md:mb-5">
              <span className="text-white">Ready to</span>
              <span className="block gradient-text-enhanced mt-2">Elevate Your Business?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 text-white/75 leading-relaxed">
              Let us help you connect with ideal customers, streamline your data, and build a powerful online presence.
            </p>
            <motion.button onClick={() => setView("contact")}
              className="btn-primary-premium group w-full sm:w-auto"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}} whileTap={{ scale: 0.98 }}>
              <span className="flex items-center justify-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}