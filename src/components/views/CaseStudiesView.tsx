"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import {
  ArrowRight, Sparkles, Target, TrendingUp, Award,
  CheckCircle, ChevronLeft, ChevronRight,
  BarChart3, Search, Zap, Settings, Users, ArrowLeft
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════════
   DATA  — 10 case studies (4 original + 6 new)
══════════════════════════════════════════════════════════════════════════════ */
const FILTERS = ["All", "Lead Generation", "Data Enrichment", "Outreach", "Company Research"];

const CASES = [
  /* ── 0 ── Original */
  {
    id: 0,
    category: "Lead Generation",
    client: "Event Management Company",
    title: "Exhibitor Marketing Data – Europe",
    region: "DACH Region",
    type: "B2B Event Platform",
    result: "3× increase in qualified leads",
    shortDesc: "Built a targeted lead database and executed outreach campaigns to generate consistent leads.",
    stats: [
      { v: "2,400+", l: "Contacts",      icon: Target      },
      { v: "99%",    l: "Accuracy",       icon: CheckCircle },
      { v: "40%",    l: "Pipeline Boost", icon: TrendingUp  },
    ],
    problem: "No consistent lead generation system. Outdated exhibitor lists with incorrect emails and missing decision-makers caused campaigns to fail before they started.",
    solution: [
      "Built targeted database of 800+ companies",
      "Identified CMOs and Marketing Directors",
      "Triple-verified all email addresses",
      "Segmented contacts by role and company size",
    ],
    results: [
      "2,400+ verified contacts delivered",
      "99% email accuracy rate achieved",
      "40% pipeline growth within 60 days",
      "Consistent monthly lead pipeline established",
    ],
    process: [
      "Research & targeting of DACH exhibitors",
      "Data building with multi-source verification",
      "Campaign execution across email and LinkedIn",
      "Ongoing optimisation based on response rates",
    ],
    services: ["Lead Generation", "Email Verification", "LinkedIn Outreach"],
    color: "emerald",
    dataFields: [],
  },

  /* ── 1 ── Original */
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
    solution: [
      "Manual research for every contact",
      "Validated ownership and management status",
      "Found Owners and Managing Directors only",
      "Segmented by location and venue type",
    ],
    results: [
      "1,200+ verified hospitality contacts",
      "98% deliverability on email campaigns",
      "Delivered in under 2 weeks",
      "Immediate pipeline conversations opened",
    ],
    process: [
      "Research of London & SE hospitality venues",
      "Manual validation of each decision-maker",
      "Data formatting for CRM import",
      "Campaign support and optimisation",
    ],
    services: ["Lead Generation", "Data Research", "CRM Management"],
    color: "blue",
    dataFields: [],
  },

  /* ── 2 ── Original */
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
    solution: [
      "Used ResearchGate and Korean R&D portals",
      "Cross-referenced academic publications",
      "Identified lab heads and procurement directors",
      "Validated contacts through professional networks",
    ],
    results: [
      "30+ Korean biotech companies mapped",
      "90+ verified decision-maker contacts",
      "95% email deliverability rate",
      "Successful first-contact campaigns launched",
    ],
    process: [
      "Deep research using Korean-language sources",
      "Cross-validation via academic databases",
      "Contact extraction and formatting",
      "Outreach strategy tailored to R&D culture",
    ],
    services: ["Company Research", "Email Hunting", "Data Collection"],
    color: "violet",
    dataFields: [],
  },

  /* ── 3 ── Original */
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
    solution: [
      "Mapped 200+ chains via UK company registries",
      "Sourced C-level contacts via LinkedIn and Apollo",
      "Built 3-tier contact lists by seniority",
      "Verified all data against live company records",
    ],
    results: [
      "200+ chain organisations identified",
      "800+ contacts across 3 role levels",
      "SaaS demo campaign launched successfully",
      "Consistent qualified pipeline generated",
    ],
    process: [
      "UK hospitality chain registry research",
      "Multi-platform contact sourcing",
      "Role-level segmentation and tagging",
      "CRM-ready delivery with campaign support",
    ],
    services: ["Lead Generation", "Company Research", "LinkedIn Outreach"],
    color: "cyan",
    dataFields: [],
  },

  /* ── 4 ── NEW: Real Estate NSW & QLD */
  {
    id: 4,
    category: "Lead Generation",
    client: "Real Estate Outreach Client",
    title: "Licensed Real Estate Agent Database – NSW & QLD",
    region: "NSW & QLD, Australia",
    type: "Real Estate",
    result: "1,000+ 100% source-verified, outreach-ready agents delivered",
    shortDesc: "Built a verified database of licensed real estate agents across NSW and QLD using official government licensing registries.",
    stats: [
      { v: "1,000+", l: "Licensed Agents", icon: Target      },
      { v: "2",      l: "States Covered",  icon: CheckCircle },
      { v: "100%",   l: "Verified Data",   icon: Award       },
    ],
    problem: "The requirement demanded high-quality, compliant data of only licensed real estate agents across NSW and QLD — suitable for outreach and long-term scaling. Standard databases lacked license verification and included unlicensed contacts.",
    solution: [
      "Leveraged official licensing registry via Service NSW to identify verified agents",
      "Filtered exclusively for active, licensed professionals",
      "Enriched each profile with complete contact and company information",
      "Structured the database for scalability up to 1,000+ agents",
      "Ensured every record is backed by a verifiable source link",
    ],
    results: [
      "Built a database of 1,000+ licensed real estate agents",
      "100% source-verified data ensuring compliance and accuracy",
      "Outreach-ready dataset with complete contact information",
      "Scalable structure for ongoing data expansion",
    ],
    process: [
      "Government registry research (NSW & QLD licensing databases)",
      "License-based filtering & validation",
      "Contact data enrichment (email, phone, company, website)",
      "CRM-ready structuring with source verification",
    ],
    services: ["Lead Generation", "Data Research", "Data Verification"],
    color: "amber",
    dataFields: ["Agent Name", "Job Title", "Company Name", "Website", "Email", "Phone Number", "Source Link"],
  },

  /* ── 5 ── NEW: VC-Backed Startups */
  {
    id: 5,
    category: "Lead Generation",
    client: "B2B Sales Client",
    title: "Decision-Maker Leads for VC-Backed Startups – Global",
    region: "Global Market",
    type: "Startup Prospecting",
    result: "900+ decision-makers across 300+ funded startups delivered",
    shortDesc: "Identified and mapped key decision-makers within VC-backed startups across multiple departments and seniority levels for targeted outreach.",
    stats: [
      { v: "300+", l: "Startups",          icon: Target      },
      { v: "900+", l: "Decision-Makers",   icon: CheckCircle },
      { v: "3",    l: "Seniority Levels",  icon: TrendingUp  },
    ],
    problem: "The client needed access to funded, high-growth companies and key stakeholders across multiple departments for effective outreach — a highly competitive segment where targeting accuracy is critical.",
    solution: [
      "Mapped VC-backed startups using Crunchbase and AngelList",
      "Filtered companies based on recent funding, growth stage, and relevance",
      "Identified decision-makers across Founders, Growth, Operations, and Marketing",
      "Built segmented contact lists across 3 seniority levels",
      "Enriched and verified contact data for outreach readiness",
    ],
    results: [
      "300+ VC-backed startups identified and qualified",
      "900+ decision-makers across multiple departments",
      "Highly targeted outreach-ready database",
      "Consistent pipeline generation from high-growth companies",
    ],
    process: [
      "VC-backed startup research & funding validation",
      "Company qualification (stage, funding, relevance)",
      "Decision-maker identification & segmentation",
      "Contact enrichment & CRM-ready delivery",
    ],
    services: ["Lead Generation", "Company Research", "Data Enrichment", "LinkedIn Outreach"],
    color: "rose",
    dataFields: [],
  },

  /* ── 6 ── NEW: Indian Pharma QA/QC */
  {
    id: 6,
    category: "Company Research",
    client: "Pharma Industry Client",
    title: "QA, QC & Production Manager Mapping – Indian Pharma",
    region: "India",
    type: "Pharmaceutical Manufacturing",
    result: "2,500+ verified leads from Indian pharma manufacturing companies",
    shortDesc: "Mapped mid-to-senior QA, QC and Production professionals across Indian pharmaceutical manufacturing companies with LinkedIn activity validation.",
    stats: [
      { v: "2,500+", l: "Leads Delivered",     icon: Target      },
      { v: "India",  l: "Market Focus",         icon: CheckCircle },
      { v: "Multi",  l: "Mid-Senior Roles",     icon: Award       },
    ],
    problem: "Identifying mid-to-senior professionals (QA, QC, Production) within Indian pharmaceutical manufacturing companies required highly accurate filtering — distinguishing manufacturing vs non-manufacturing pharma companies and targeting specific departments and seniority levels.",
    solution: [
      "Identified pharma companies in India with verified manufacturing operations",
      "Validated companies using official websites and trusted sources",
      "Mapped professionals across QA, QC, and Production departments",
      "Filtered leads by mid to senior management levels (Manager → GM level)",
      "Ensured all leads are active on LinkedIn (recent activity check)",
      "Enriched profiles with complete professional and company data",
    ],
    results: [
      "Delivered 2,500+ verified leads from Indian pharma manufacturing companies",
      "Highly targeted dataset across QA, QC & Production functions",
      "Zero irrelevant companies (non-manufacturing filtered out)",
      "Outreach-ready data with high relevance and engagement potential",
    ],
    process: [
      "Pharma manufacturing company identification & validation",
      "Department-focused lead mapping (QA, QC, Production)",
      "Seniority-based filtering (Manager to GM level)",
      "LinkedIn activity validation & data enrichment",
    ],
    services: ["Lead Research", "Company Validation", "Data Enrichment", "LinkedIn Prospecting"],
    color: "teal",
    dataFields: [],
    qualificationCriteria: [
      "Active LinkedIn profiles (recent activity in last 3–6 months)",
      "Relevant departments only (QA, QC, Production)",
      "Mid to senior-level roles",
      "Verified company manufacturing presence",
    ],
  },

  /* ── 7 ── NEW: Event Leads Enrichment */
  {
    id: 7,
    category: "Data Enrichment",
    client: "Events & Marketing Client",
    title: "Enriching & Structuring Event Leads for Post-Event Campaigns",
    region: "Multi-Country",
    type: "Event Lead Enrichment",
    result: "1,000+ leads fully enriched and segmented for post-event nurture",
    shortDesc: "Cleaned, enriched and segmented raw event-generated leads (virtual & in-person) into a CRM-ready database for personalized post-event nurture campaigns.",
    stats: [
      { v: "1,000+", l: "Leads Processed",    icon: Target      },
      { v: "Multi",  l: "Country Dataset",     icon: CheckCircle },
      { v: "Full",   l: "Funnel Enrichment",   icon: TrendingUp  },
    ],
    problem: "The client had raw event-generated leads but the data was incomplete and not ready for effective follow-ups. Key gaps included missing industry, revenue, and company insights; incomplete contact profiles; and no segmentation for nurture campaigns.",
    solution: [
      "Cleaned and standardized raw lead data",
      "Enriched each lead with industry, company revenue, job role & department",
      "Added verified email and LinkedIn profile for each contact",
      "Segmented leads based on event type (virtual / in-person) and engagement level",
      "Structured the dataset for post-event nurture workflows",
      "Delivered a fully CRM-ready database",
    ],
    results: [
      "1,000+ leads enriched with complete company & contact data",
      "Added critical insights like industry and revenue for better targeting",
      "Fully segmented dataset for personalized email nurture campaigns",
      "Improved lead usability and campaign efficiency",
    ],
    process: [
      "Raw data cleaning & normalization",
      "Lead enrichment (industry, revenue, contact details)",
      "Event & engagement-based segmentation",
      "Nurture stream tagging & CRM structuring",
    ],
    services: ["Data Enrichment", "Data Cleaning", "Lead Qualification", "Marketing Data Support"],
    color: "indigo",
    dataFields: [
      "Contact Details (Name, Email, Phone, LinkedIn)",
      "Company Insights (Industry, Revenue, Location)",
      "Job Role & Department",
      "Event Participation (Virtual / In-Person)",
      "Lead Source & Engagement Status",
      "Nurture Stream Classification",
    ],
  },

  /* ── 8 ── NEW: Europe & UK Leadership Mapping */
  {
    id: 8,
    category: "Company Research",
    client: "B2B Outreach Client",
    title: "Leadership Mapping – Lighting, CAD & Interior Products (Europe & UK)",
    region: "Europe & UK",
    type: "Interior & Building Products",
    result: "2,500+ verified leadership contacts across 1,500+ companies delivered",
    shortDesc: "Identified and mapped senior sales, marketing and commercial decision-makers across niche categories including Lighting, CAD, Surfaces and Tiles across Europe and UK.",
    stats: [
      { v: "1,500+", l: "Companies",           icon: Target      },
      { v: "2,500+", l: "Leadership Contacts", icon: CheckCircle },
      { v: "Multi",  l: "Category Coverage",   icon: Award       },
    ],
    problem: "Identify and map senior decision-makers across niche categories like Lighting, CAD, Surfaces, and Tiles — where accurate data is highly fragmented. The client required strict targeting of leadership roles only at large scale across regions.",
    solution: [
      "Identified and mapped 1,500+ companies across target categories",
      "Segmented companies by niche (Lighting, CAD, Surfaces, Tiles)",
      "Mapped decision-makers across Sales, Marketing and Commercial leadership",
      "Ensured multiple relevant contacts per company",
      "Enriched each lead with verified email, LinkedIn profile and company contact details",
      "Standardized data for seamless CRM integration",
    ],
    results: [
      "Delivered 2,500+ verified leadership contacts",
      "Covered 1,500+ companies across Europe & UK",
      "Highly targeted dataset focused on decision-makers only",
      "Enabled scalable and structured B2B outreach campaigns",
    ],
    process: [
      "Category-based company research (Lighting, CAD, Surfaces, Tiles)",
      "Leadership role identification & filtering",
      "Multi-contact mapping per company",
      "Data enrichment & CRM-ready delivery",
    ],
    services: ["Company Research", "Decision-Maker Mapping", "Data Enrichment", "B2B Prospecting"],
    color: "orange",
    dataFields: [],
    targetRoles: [
      "CEO / Managing Director",
      "Chief Commercial Officer",
      "Sales Director / Head of Sales",
      "Business Development Director",
      "Marketing Director / Head of Marketing",
      "Commercial Director",
    ],
  },

  /* ── 9 ── NEW: UAE Startup LinkedIn Outreach */
  {
    id: 9,
    category: "Outreach",
    client: "Growth Services Client",
    title: "Generating Conversations with Funded Founders via LinkedIn – UAE",
    region: "UAE",
    type: "LinkedIn Outreach Campaign",
    result: "Strong acceptance rate + conversations initiated with recently funded decision-makers",
    shortDesc: "Targeted recently funded startup founders in the UAE with a curiosity-driven, personalized LinkedIn outreach strategy to generate meaningful conversations.",
    stats: [
      { v: "1,000+", l: "Founders Targeted", icon: Target      },
      { v: "High",   l: "Intent ICP",        icon: CheckCircle },
      { v: "Conv.",  l: "Driven Outreach",   icon: TrendingUp  },
    ],
    problem: "The client wanted to connect with recently funded founders in the UAE — a segment highly saturated with cold outreach. Key issues: low response rates from generic messaging; difficulty reaching Founder/CEO decision-makers; need to start meaningful conversations, not just send messages.",
    solution: [
      "Identified recently funded startups and mapped founders",
      "Built a high-intent ICP (post-funding = ready to scale)",
      "Designed a non-salesy, curiosity-driven outreach strategy",
      "Focused on timing + personalization for maximum relevance",
      "Daily LinkedIn connection requests with personalized follow-up",
      "Structured tracking via real-time status sheet",
    ],
    results: [
      "Strong acceptance rate from founder-level profiles",
      "Conversations initiated with recently funded decision-makers",
      "Pipeline built with high-budget prospects",
      "Repeatable outreach system established for ongoing scaling",
    ],
    process: [
      "Recently funded startup research & founder identification",
      "ICP qualification (post-funding, UAE-based, active on LinkedIn)",
      "Personalized message sequence creation",
      "Daily outreach execution + response tracking",
    ],
    services: ["LinkedIn Outreach", "Lead Research", "ICP Targeting", "Messaging Strategy"],
    color: "fuchsia",
    dataFields: [],
    sampleMessage: `Hi [First Name], saw you recently raised funding — exciting phase.\n\nCurious, are you currently focused on scaling acquisition internally or exploring external support as well?`,
    qualificationCriteria: [
      "Recently funded startups",
      "Founder / CEO roles",
      "Active on LinkedIn",
      "UAE-based companies",
      "High-growth signals",
    ],
  },
] as const;

type CaseType = (typeof CASES)[number];

/* ══════════════════════════════════════════════════════════════════════════════
   COLOR MAP
══════════════════════════════════════════════════════════════════════════════ */
const colorMap: Record<string, {
  text: string; bg: string; border: string;
  badge: string; dot: string; grad: string;
}> = {
  emerald: { text:"text-emerald-400", bg:"bg-emerald-500/10", border:"border-emerald-500/25", badge:"bg-emerald-500/15 border-emerald-500/25 text-emerald-400", dot:"bg-emerald-400", grad:"from-emerald-500 to-teal-500"    },
  blue:    { text:"text-blue-400",    bg:"bg-blue-500/10",    border:"border-blue-500/25",    badge:"bg-blue-500/15    border-blue-500/25    text-blue-400",    dot:"bg-blue-400",    grad:"from-blue-500 to-cyan-500"       },
  violet:  { text:"text-violet-400",  bg:"bg-violet-500/10",  border:"border-violet-500/25",  badge:"bg-violet-500/15  border-violet-500/25  text-violet-400",  dot:"bg-violet-400",  grad:"from-violet-500 to-purple-500"   },
  cyan:    { text:"text-cyan-400",    bg:"bg-cyan-500/10",    border:"border-cyan-500/25",    badge:"bg-cyan-500/15    border-cyan-500/25    text-cyan-400",    dot:"bg-cyan-400",    grad:"from-cyan-500 to-blue-500"       },
  amber:   { text:"text-amber-400",   bg:"bg-amber-500/10",   border:"border-amber-500/25",   badge:"bg-amber-500/15   border-amber-500/25   text-amber-400",   dot:"bg-amber-400",   grad:"from-amber-500 to-orange-500"    },
  rose:    { text:"text-rose-400",    bg:"bg-rose-500/10",    border:"border-rose-500/25",    badge:"bg-rose-500/15    border-rose-500/25    text-rose-400",    dot:"bg-rose-400",    grad:"from-rose-500 to-pink-500"       },
  teal:    { text:"text-teal-400",    bg:"bg-teal-500/10",    border:"border-teal-500/25",    badge:"bg-teal-500/15    border-teal-500/25    text-teal-400",    dot:"bg-teal-400",    grad:"from-teal-500 to-cyan-500"       },
  indigo:  { text:"text-indigo-400",  bg:"bg-indigo-500/10",  border:"border-indigo-500/25",  badge:"bg-indigo-500/15  border-indigo-500/25  text-indigo-400",  dot:"bg-indigo-400",  grad:"from-indigo-500 to-violet-500"   },
  orange:  { text:"text-orange-400",  bg:"bg-orange-500/10",  border:"border-orange-500/25",  badge:"bg-orange-500/15  border-orange-500/25  text-orange-400",  dot:"bg-orange-400",  grad:"from-orange-500 to-amber-500"    },
  fuchsia: { text:"text-fuchsia-400", bg:"bg-fuchsia-500/10", border:"border-fuchsia-500/25", badge:"bg-fuchsia-500/15 border-fuchsia-500/25 text-fuchsia-400", dot:"bg-fuchsia-400", grad:"from-fuchsia-500 to-violet-500"  },
};

/* ══════════════════════════════════════════════════════════════════════════════
   CASE DETAIL PAGE  (full-page view, not a modal)
══════════════════════════════════════════════════════════════════════════════ */
function CaseDetailsPage({
  c, onBack, onPrev, onNext, hasPrev, hasNext,
}: {
  c: CaseType; onBack: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  const col = colorMap[c.color];
  const prefersReducedMotion = useReducedMotion();
  const setView = useAppStore((s) => s.setView);

  // Scroll top when case changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [c.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen text-white pb-24"
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {!prefersReducedMotion && (
          <>
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px]"
              style={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%,var(--blob-a,rgba(16,185,129,0.1)),transparent 70%)`, filter: "blur(100px)" }} />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
              style={{ background: `radial-gradient(ellipse 50% 50% at 50% 50%,var(--blob-b,rgba(59,130,246,0.09)),transparent 70%)`, filter: "blur(100px)" }} />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>

      {/* ── Sticky nav bar ── */}
      <div className="sticky top-16 md:top-20 z-40 bg-[#0a0f1a]/85 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="container-custom px-4 py-3 flex items-center justify-between gap-4">
          <button onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group text-sm font-semibold">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All Cases
          </button>

          <div className="flex items-center gap-3">
            <button onClick={onPrev} disabled={!hasPrev}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-all flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-white/35 font-medium tabular-nums">{c.id + 1} / {CASES.length}</span>
            <button onClick={onNext} disabled={!hasNext}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:opacity-25 disabled:cursor-not-allowed transition-all flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom px-4 relative z-10">

        {/* ── Hero ── */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05, duration:0.55 }}
          className="pt-10 pb-8 md:pt-14 md:pb-12">
          <div className={`h-1.5 w-28 bg-gradient-to-r ${col.grad} rounded-full mb-8`} />

          <div className="flex flex-wrap gap-2 mb-5">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${col.badge}`}>{c.type}</span>
            <span className="text-xs text-white/45 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">{c.region}</span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${col.badge}`}>{c.category}</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            {c.title}
          </h1>
          <p className={`text-lg md:text-xl font-semibold ${col.text} mb-6`}>{c.client}</p>

          {/* Result highlight */}
          <div className={`inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl ${col.bg} border ${col.border}`}>
            <Award className={`w-5 h-5 ${col.text}`} />
            <p className={`text-base font-bold ${col.text} italic`}>{c.result}</p>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {c.stats.map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.15 + i*0.08 }}
              className={`relative overflow-hidden p-7 rounded-2xl ${col.bg} border ${col.border} group`}>
              <s.icon className={`w-9 h-9 ${col.text} mb-4`} />
              <div className={`text-3xl md:text-4xl font-black ${col.text} mb-1.5`}>{s.v}</div>
              <div className="text-xs text-white/45 uppercase tracking-widest font-bold">{s.l}</div>
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${col.grad} opacity-10 rounded-full blur-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* ── Challenge + Solution ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <motion.div initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.25, duration:0.55 }}
            className="feature-card-premium p-7 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">The Challenge</h2>
            </div>
            <p className="text-base text-white/65 leading-relaxed">{c.problem}</p>
          </motion.div>

          <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.3, duration:0.55 }}
            className="feature-card-premium p-7 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-3 h-3 rounded-full ${col.dot}`} />
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-widest">Our Solution</h2>
            </div>
            <ul className="space-y-3.5">
              {c.solution.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle className={`w-4 h-4 ${col.text} flex-shrink-0 mt-0.5`} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Results ── */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.35, duration:0.55 }} className="feature-card-premium p-7 md:p-10 mb-10">
          <div className="flex items-center gap-3 mb-7">
            <Award className={`w-6 h-6 ${col.text}`} />
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">The Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.results.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${col.bg} border ${col.border}`}>
                <div className={`w-2 h-2 rounded-full ${col.dot} flex-shrink-0 mt-2`} />
                <p className={`text-sm font-semibold ${col.text}`}>{r}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Process ── */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.4, duration:0.55 }} className="mb-10">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mb-7 text-center">
            How We Delivered Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.process.map((p, i) => (
              <div key={i} className="feature-card-premium p-5 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${col.bg} border ${col.border} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-base font-black ${col.text}`}>{String(i+1).padStart(2,"0")}</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed pt-1">{p}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Data Fields (if present) ── */}
        {"dataFields" in c && (c as any).dataFields?.length > 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.45 }} className="feature-card-premium p-7 mb-10">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Data Fields Delivered</h3>
            <div className="flex flex-wrap gap-2.5">
              {(c as any).dataFields.map((f: string) => (
                <span key={f} className={`text-xs px-3 py-2 rounded-xl border ${col.badge} font-semibold`}>{f}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Target Roles (if present) ── */}
        {"targetRoles" in c && (c as any).targetRoles?.length > 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.45 }} className="feature-card-premium p-7 mb-10">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Target Roles Covered</h3>
            <div className="flex flex-wrap gap-2.5">
              {(c as any).targetRoles.map((r: string) => (
                <span key={r} className={`text-xs px-3 py-2 rounded-xl border ${col.badge} font-semibold`}>{r}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Qualification Criteria (if present) ── */}
        {"qualificationCriteria" in c && (c as any).qualificationCriteria?.length > 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.48 }} className="feature-card-premium p-7 mb-10">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Lead Qualification Criteria</h3>
            <ul className="space-y-2.5">
              {(c as any).qualificationCriteria.map((q: string) => (
                <li key={q} className="flex items-center gap-2.5 text-sm text-white/65">
                  <CheckCircle className={`w-4 h-4 ${col.text} flex-shrink-0`} />
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* ── Sample Outreach Message (Outreach cases) ── */}
        {"sampleMessage" in c && (c as any).sampleMessage && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.5 }} className="feature-card-premium p-7 mb-10">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Sample Outreach Message</h3>
            <div className={`p-5 rounded-xl ${col.bg} border ${col.border}`}>
              <pre className={`text-sm ${col.text} leading-relaxed whitespace-pre-wrap font-sans italic`}>
                {(c as any).sampleMessage}
              </pre>
            </div>
          </motion.div>
        )}

        {/* ── Services Used ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.52 }} className="mb-14">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4 text-center">Services Used</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {c.services.map((s) => (
              <span key={s} className={`text-sm px-5 py-2.5 rounded-full border ${col.badge} font-bold`}>{s}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom navigation ── */}
        <div className="flex items-center justify-between pt-10 pb-6 border-t border-white/10">
          <button onClick={onPrev} disabled={!hasPrev}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all group ${hasPrev ? `${col.bg} ${col.border} hover:scale-105` : "bg-white/5 border-white/10 opacity-25 cursor-not-allowed"}`}>
            <ChevronLeft className={`w-5 h-5 ${hasPrev ? col.text : "text-white/30"} group-hover:-translate-x-0.5 transition-transform`} />
            <span className={`font-semibold text-sm ${hasPrev ? col.text : "text-white/30"}`}>Previous</span>
          </button>

          <button onClick={onBack} className="text-xs text-white/35 hover:text-white transition-colors font-medium">
            All Case Studies
          </button>

          <button onClick={onNext} disabled={!hasNext}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all group ${hasNext ? `${col.bg} ${col.border} hover:scale-105` : "bg-white/5 border-white/10 opacity-25 cursor-not-allowed"}`}>
            <span className={`font-semibold text-sm ${hasNext ? col.text : "text-white/30"}`}>Next</span>
            <ChevronRight className={`w-5 h-5 ${hasNext ? col.text : "text-white/30"} group-hover:translate-x-0.5 transition-transform`} />
          </button>
        </div>

        {/* ── CTA ── */}
        <div className="card-glass-premium text-center p-8 md:p-12 mt-6">
          <h2 className="heading-xl mb-4">
            <span className="text-white">Ready to Write Your</span>
            <span className="block gradient-text-enhanced mt-2">Success Story?</span>
          </h2>
          <p className="text-body-lg text-white/70 max-w-xl mx-auto mb-8">Join businesses that turned data challenges into consistent growth.</p>
          <button onClick={() => setView("contact")}
            className="btn-cta-premium group w-full sm:w-auto">
            <Sparkles className="w-5 h-5" />
            Let&apos;s Talk Growth
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CASE CARD  (grid view)
══════════════════════════════════════════════════════════════════════════════ */
function CaseCard({ c, onOpen, isMobile, index }: {
  c: CaseType; onOpen: () => void; isMobile: boolean; index: number;
}) {
  const col = colorMap[c.color];
  return (
    <motion.div layout
      initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }}
      exit={{ opacity:0, scale:0.94 }} transition={{ duration:0.35 }}
      className="group">
      <motion.div
        className="feature-card-premium h-full flex flex-col cursor-pointer relative"
        whileHover={!isMobile ? { y:-5 } : {}} transition={{ duration:0.25 }}
        onClick={onOpen} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        aria-label={`View ${c.title} case study`}>

        {/* Watermark */}
        <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${col.badge}`}>{c.type}</span>
            <span className="text-[10px] text-white/35 text-right leading-tight">{c.region}</span>
          </div>

          <span className={`text-[10px] font-black uppercase tracking-widest ${col.text} mb-2`}>{c.category}</span>
          <h3 className="text-white font-bold text-base leading-snug mb-1">{c.title}</h3>
          <p className={`text-sm font-semibold ${col.text} mb-3`}>{c.client}</p>
          <p className="text-sm text-white/50 leading-relaxed mb-5 flex-grow">{c.shortDesc}</p>

          {/* Mini stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/[0.025] rounded-xl border border-white/[0.05]">
            {c.stats.map((s) => (
              <div key={s.l} className="text-center">
                <div className={`text-sm font-bold ${col.text} mb-0.5`}>{s.v}</div>
                <div className="text-[10px] text-white/35 uppercase tracking-wide leading-tight">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Result */}
          <div className={`flex items-center gap-2 p-2.5 rounded-xl ${col.bg} border ${col.border} mb-4`}>
            <Award className={`w-3.5 h-3.5 ${col.text} flex-shrink-0`} />
            <p className={`text-xs font-semibold ${col.text} italic leading-snug`}>{c.result}</p>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-white/55 hover:text-white text-sm font-semibold transition-all touch-manipulation">
            View Full Case Study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN VIEW
══════════════════════════════════════════════════════════════════════════════ */
export default function CaseStudiesView() {
  const setView = useAppStore((s) => s.setView);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive]  = useState("All");
  const [openId, setOpenId]  = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible   = CASES.filter((c) => active === "All" || c.category === active);
  const openCase  = openId !== null ? (CASES as readonly CaseType[]).find((c) => c.id === openId) ?? null : null;
  const nav       = useCallback((dir: 1 | -1) => {
    if (openId === null) return;
    const idx  = CASES.findIndex((c) => c.id === openId);
    const next = CASES[idx + dir];
    if (next) setOpenId(next.id);
  }, [openId]);

  /* Show dedicated detail page when a case is open */
  if (openCase) {
    return (
      <AnimatePresence mode="wait">
        <CaseDetailsPage
          key={openCase.id}
          c={openCase}
          onBack={() => { setOpenId(null); window.scrollTo({ top:0, behavior:"instant" }); }}
          onPrev={() => nav(-1)}
          onNext={() => nav(1)}
          hasPrev={openCase.id > 0}
          hasNext={openCase.id < CASES.length - 1}
        />
      </AnimatePresence>
    );
  }

  /* ── Grid view ── */
  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!prefersReducedMotion && !isMobile && (
          <>
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px]"
              style={{ background:"radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.09),transparent 70%)", filter:"blur(80px)" }} />
            <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px]"
              style={{ background:"radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.09),transparent 70%)", filter:"blur(80px)" }} />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.018]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative section-spacing pt-16 md:pt-24">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
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
              A look at how we help businesses generate leads, build systems and drive consistent
              growth through data, outreach and execution.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 md:mt-14 max-w-4xl mx-auto">
            {[
              { n: "10+",    l: "Case Studies"     },
              { n: "99%",    l: "Accuracy Rate"    },
              { n: "12",     l: "Countries"         },
              { n: "4,500+", l: "Verified Contacts" },
            ].map((s, i) => (
              <motion.div key={s.l} className="stat-card-premium"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:0.4 + i*0.08 }}>
                <div className="stat-value text-2xl md:text-3xl mb-1">{s.n}</div>
                <div className="stat-label text-xs">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="container-custom px-4">
          {/* Filters */}
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

          {/* Cards — 3-col desktop, 1-col mobile */}
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

      {/* ── Process ── */}
      <section className="section-spacing-sm">
        <div className="container-custom px-4">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            className="text-center mb-10">
            <h2 className="heading-xl text-white mb-3">How We Deliver Results</h2>
            <div className="h-px w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
            {[
              { icon: Search,    n:"01", title:"Research & Targeting",  desc:"Deep ICP analysis and market mapping"            },
              { icon: BarChart3, n:"02", title:"Data Building",         desc:"Multi-source, triple-verified databases"         },
              { icon: Zap,       n:"03", title:"Campaign Execution",    desc:"Structured outreach with personalised messaging"  },
              { icon: Settings,  n:"04", title:"Optimisation",          desc:"Ongoing tuning based on real response data"      },
            ].map((p, i) => (
              <motion.div key={p.n} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.09, duration:0.45 }}
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
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.55 }}
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