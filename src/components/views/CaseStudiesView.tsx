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
   FILTERS  — exactly as specified in the brief
══════════════════════════════════════════════════════════════════════════════ */
const FILTERS = ["All", "Lead Generation", "Outreach", "Content", "Website"];

/* ══════════════════════════════════════════════════════════════════════════════
   CASES  — original 4 + 6 new, mapped to the brief's filter categories
══════════════════════════════════════════════════════════════════════════════ */
const CASES = [

  /* ─── ORIGINAL 4 ─────────────────────────────────────────────────────────── */

  {
    id: 0,
    filter: "Lead Generation",
    // Card fields (brief spec: client type, service, key result, short desc)
    clientType:  "B2B Event Platform",
    service:     "Lead Generation & Outreach",
    result:      "3× increase in qualified leads",
    shortDesc:   "Built a targeted lead database and executed outreach campaigns to generate consistent leads.",
    // Detail page fields
    client:  "Event Management Company",
    region:  "DACH Region",
    problem: "No consistent lead generation system. Outdated exhibitor lists with incorrect emails and missing decision-makers caused campaigns to fail before they started.",
    solution: [
      "Built targeted database of 800+ companies",
      "Identified CMOs and Marketing Directors",
      "Triple-verified all email addresses",
      "Segmented contacts by role and company size",
    ],
    results: [
      "3× increase in qualified leads",
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
    services: ["Lead Generation", "LinkedIn Outreach", "Email Campaign"],
    stats: [
      { v: "2,400+", l: "Contacts"      },
      { v: "99%",    l: "Accuracy"      },
      { v: "40%",    l: "Pipeline Boost"},
    ],
    color: "emerald",
  },

  {
    id: 1,
    filter: "Lead Generation",
    clientType:  "Hospitality Supplier",
    service:     "Lead Generation & Data Research",
    result:      "1,200+ verified hospitality contacts in 2 weeks",
    shortDesc:   "Researched and verified over 1,200 hospitality decision-makers across London and Southeast UK.",
    client:  "Hospitality Supplier",
    region:  "London & Southeast, UK",
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
    stats: [
      { v: "1,200+", l: "Contacts" },
      { v: "98%",    l: "Accuracy" },
      { v: "2 wks",  l: "Delivery" },
    ],
    color: "blue",
  },

  {
    id: 2,
    filter: "Lead Generation",
    clientType:  "Pharmaceutical R&D",
    service:     "Company Research & Email Hunting",
    result:      "Breakthrough access to Korean scientific community",
    shortDesc:   "Mapped Korean biotech companies and identified R&D decision-makers using specialist portals.",
    client:  "BioPharma Client",
    region:  "South Korea",
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
    stats: [
      { v: "30+", l: "Companies" },
      { v: "90+", l: "Contacts"  },
      { v: "95%", l: "Delivery"  },
    ],
    color: "violet",
  },

  {
    id: 3,
    filter: "Lead Generation",
    clientType:  "B2B SaaS Platform",
    service:     "Lead Generation & Company Research",
    result:      "Successful SaaS demo campaign with surgical precision",
    shortDesc:   "Identified Tier 1 & 2 hospitality chains and sourced multi-level decision-maker contacts.",
    client:  "B2B SaaS Platform",
    region:  "UK National",
    problem: "Identify Tier 1 & 2 hospitality chains and find Operations, Finance, and IT decision-makers — a multi-layered targeting challenge requiring precision at scale.",
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
    stats: [
      { v: "200+", l: "Chains"      },
      { v: "800+", l: "Contacts"    },
      { v: "3",    l: "Role Levels" },
    ],
    color: "cyan",
  },

  /* ─── NEW 6 ───────────────────────────────────────────────────────────────── */

  {
    id: 4,
    filter: "Lead Generation",
    clientType:  "Real Estate",
    service:     "Lead Generation & Data Verification",
    result:      "1,000+ 100% source-verified licensed agents delivered",
    shortDesc:   "Built a verified database of licensed real estate agents across NSW & QLD using official government licensing registries.",
    client:  "Real Estate Outreach Client",
    region:  "NSW & QLD, Australia",
    problem: "The client needed only licensed, active real estate agents — not generic directories. Standard databases lacked license verification and included unlicensed or inactive contacts.",
    solution: [
      "Leveraged official licensing registry via Service NSW to identify verified agents",
      "Filtered exclusively for active, licensed professionals",
      "Enriched each profile with complete contact and company information",
      "Structured the database for scalability up to 1,000+ agents",
      "Ensured every record is backed by a verifiable source link",
    ],
    results: [
      "1,000+ licensed real estate agents delivered",
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
    stats: [
      { v: "1,000+", l: "Licensed Agents" },
      { v: "2",      l: "States Covered"  },
      { v: "100%",   l: "Source Verified" },
    ],
    extraFields: {
      label: "Data Fields Delivered",
      items: ["Agent Name", "Job Title", "Company Name", "Website", "Email", "Phone Number", "Source Link"],
    },
    color: "amber",
  },

  {
    id: 5,
    filter: "Lead Generation",
    clientType:  "B2B Sales — Startup Market",
    service:     "Lead Generation & Company Research",
    result:      "900+ decision-makers across 300+ VC-backed startups delivered",
    shortDesc:   "Identified and mapped key decision-makers within VC-backed startups globally, segmented by funding stage and seniority level.",
    client:  "B2B Sales Client",
    region:  "Global Market",
    problem: "The client needed access to funded, high-growth companies and key stakeholders across multiple departments. Targeting funded startups requires real-time funding signals that standard databases don't provide.",
    solution: [
      "Mapped VC-backed startups using Crunchbase and AngelList",
      "Filtered companies based on recent funding, growth stage, and relevance",
      "Identified decision-makers across Founders, Growth, Operations and Marketing",
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
    stats: [
      { v: "300+", l: "Startups"         },
      { v: "900+", l: "Decision-Makers"  },
      { v: "3",    l: "Seniority Levels" },
    ],
    color: "rose",
  },

  {
    id: 6,
    filter: "Lead Generation",
    clientType:  "Pharmaceutical Manufacturing",
    service:     "Lead Research & LinkedIn Prospecting",
    result:      "2,500+ verified leads from Indian pharma manufacturing companies",
    shortDesc:   "Mapped mid-to-senior QA, QC and Production professionals across Indian pharmaceutical manufacturing companies with LinkedIn activity validation.",
    client:  "Pharma Industry Client",
    region:  "India",
    problem: "Identifying mid-to-senior QA, QC and Production professionals in Indian pharma required highly accurate filtering — distinguishing manufacturing vs non-manufacturing companies and targeting specific departments and seniority levels.",
    solution: [
      "Identified pharma companies in India with verified manufacturing operations",
      "Validated companies using official websites and trusted sources",
      "Mapped professionals across QA, QC, and Production departments",
      "Filtered leads by mid to senior management levels (Manager → GM level)",
      "Ensured all leads are active on LinkedIn (recent activity check)",
      "Enriched profiles with complete professional and company data",
    ],
    results: [
      "2,500+ verified leads from Indian pharma manufacturing companies",
      "Highly targeted dataset across QA, QC & Production functions",
      "Zero irrelevant companies — non-manufacturing filtered out",
      "Outreach-ready data with high relevance and engagement potential",
    ],
    process: [
      "Pharma manufacturing company identification & validation",
      "Department-focused lead mapping (QA, QC, Production)",
      "Seniority-based filtering (Manager to GM level)",
      "LinkedIn activity validation & data enrichment",
    ],
    services: ["Lead Research", "Company Validation", "Data Enrichment", "LinkedIn Prospecting"],
    stats: [
      { v: "2,500+", l: "Leads Delivered"    },
      { v: "India",  l: "Market Focus"       },
      { v: "Multi",  l: "Mid-Senior Roles"   },
    ],
    extraQualification: [
      "Active LinkedIn profiles (recent activity in last 3–6 months)",
      "Relevant departments only (QA, QC, Production)",
      "Mid to senior-level roles",
      "Verified company manufacturing presence",
    ],
    color: "teal",
  },

  {
    id: 7,
    filter: "Lead Generation",
    clientType:  "Events & Marketing",
    service:     "Data Enrichment & Lead Qualification",
    result:      "1,000+ leads fully enriched and segmented for post-event nurture",
    shortDesc:   "Cleaned, enriched and segmented raw event-generated leads into a CRM-ready database for personalized post-event nurture campaigns.",
    client:  "Events & Marketing Client",
    region:  "Multi-Country",
    problem: "The client had raw event-generated leads (virtual & in-person) but the data was incomplete and not ready for effective follow-ups. Key gaps: missing industry, revenue, and company insights; incomplete contact profiles; no segmentation for nurture campaigns.",
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
      "Critical insights added — industry and revenue for better targeting",
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
    stats: [
      { v: "1,000+", l: "Leads Processed"   },
      { v: "Multi",  l: "Country Dataset"   },
      { v: "Full",   l: "Funnel Enrichment" },
    ],
    extraFields: {
      label: "Key Data Points Enhanced",
      items: [
        "Contact Details (Name, Email, Phone, LinkedIn)",
        "Company Insights (Industry, Revenue, Location)",
        "Job Role & Department",
        "Event Participation (Virtual / In-Person)",
        "Lead Source & Engagement Status",
        "Nurture Stream Classification",
      ],
    },
    color: "indigo",
  },

  {
    id: 8,
    filter: "Lead Generation",
    clientType:  "Interior & Building Products",
    service:     "Company Research & Decision-Maker Mapping",
    result:      "2,500+ verified leadership contacts across 1,500+ companies",
    shortDesc:   "Identified and mapped senior sales, marketing and commercial decision-makers across Lighting, CAD, Surfaces and Tiles companies in Europe and UK.",
    client:  "B2B Outreach Client",
    region:  "Europe & UK",
    problem: "Identify and map senior decision-makers across niche categories like Lighting, CAD, Surfaces and Tiles — where accurate data is highly fragmented. The client required strict leadership-only targeting at large scale across regions.",
    solution: [
      "Identified and mapped 1,500+ companies across target categories",
      "Segmented companies by niche (Lighting, CAD, Surfaces, Tiles)",
      "Mapped decision-makers across Sales, Marketing and Commercial leadership",
      "Ensured multiple relevant contacts per company",
      "Enriched each lead with verified email, LinkedIn profile and company contact details",
      "Standardized data for seamless CRM integration",
    ],
    results: [
      "2,500+ verified leadership contacts delivered",
      "1,500+ companies covered across Europe & UK",
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
    stats: [
      { v: "1,500+", l: "Companies"          },
      { v: "2,500+", l: "Leadership Contacts"},
      { v: "Multi",  l: "Category Coverage"  },
    ],
    extraFields: {
      label: "Target Roles Covered",
      items: [
        "CEO / Managing Director",
        "Chief Commercial Officer",
        "Sales Director / Head of Sales",
        "Business Development Director",
        "Marketing Director / Head of Marketing",
        "Commercial Director",
      ],
    },
    color: "orange",
  },

  {
    id: 9,
    filter: "Outreach",
    clientType:  "Growth Services — UAE Startups",
    service:     "LinkedIn Outreach & ICP Targeting",
    result:      "Strong acceptance rate + conversations with recently funded founders",
    shortDesc:   "Targeted recently funded startup founders in the UAE with a personalized, curiosity-driven LinkedIn outreach strategy to generate meaningful conversations.",
    client:  "Growth Services Client",
    region:  "UAE",
    problem: "The client wanted to connect with recently funded founders in the UAE — a segment highly saturated with cold outreach. Key issues: low response rates from generic messaging; difficulty reaching Founder/CEO decision-makers; need to start real conversations, not just send messages.",
    solution: [
      "Identified recently funded startups and mapped founders",
      "Built a high-intent ICP (post-funding = ready to scale)",
      "Designed a non-salesy, curiosity-driven outreach strategy",
      "Focused on timing and personalization for maximum relevance",
      "Daily LinkedIn connection requests with personalized follow-up",
      "Structured real-time tracking via status sheet",
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
    stats: [
      { v: "1,000+", l: "Founders Targeted" },
      { v: "High",   l: "Intent ICP"        },
      { v: "Conv.",  l: "Driven Outreach"   },
    ],
    sampleMessage: "Hi [First Name], saw you recently raised funding — exciting phase.\n\nCurious, are you currently focused on scaling acquisition internally or exploring external support as well?",
    extraQualification: [
      "Recently funded startups",
      "Founder / CEO roles",
      "Active on LinkedIn",
      "UAE-based companies",
      "High-growth signals",
    ],
    color: "fuchsia",
  },

];

type Case = typeof CASES[number];

/* ══════════════════════════════════════════════════════════════════════════════
   COLOR MAP
══════════════════════════════════════════════════════════════════════════════ */
const CM: Record<string, { text: string; bg: string; border: string; badge: string; dot: string; grad: string }> = {
  emerald: { text:"text-emerald-400", bg:"bg-emerald-500/10", border:"border-emerald-500/25", badge:"bg-emerald-500/15 border-emerald-500/25 text-emerald-400", dot:"bg-emerald-400", grad:"from-emerald-500 to-teal-500"   },
  blue:    { text:"text-blue-400",    bg:"bg-blue-500/10",    border:"border-blue-500/25",    badge:"bg-blue-500/15    border-blue-500/25    text-blue-400",    dot:"bg-blue-400",    grad:"from-blue-500 to-cyan-500"      },
  violet:  { text:"text-violet-400",  bg:"bg-violet-500/10",  border:"border-violet-500/25",  badge:"bg-violet-500/15  border-violet-500/25  text-violet-400",  dot:"bg-violet-400",  grad:"from-violet-500 to-purple-500"  },
  cyan:    { text:"text-cyan-400",    bg:"bg-cyan-500/10",    border:"border-cyan-500/25",    badge:"bg-cyan-500/15    border-cyan-500/25    text-cyan-400",    dot:"bg-cyan-400",    grad:"from-cyan-500 to-blue-500"      },
  amber:   { text:"text-amber-400",   bg:"bg-amber-500/10",   border:"border-amber-500/25",   badge:"bg-amber-500/15   border-amber-500/25   text-amber-400",   dot:"bg-amber-400",   grad:"from-amber-500 to-orange-500"   },
  rose:    { text:"text-rose-400",    bg:"bg-rose-500/10",    border:"border-rose-500/25",    badge:"bg-rose-500/15    border-rose-500/25    text-rose-400",    dot:"bg-rose-400",    grad:"from-rose-500 to-pink-500"      },
  teal:    { text:"text-teal-400",    bg:"bg-teal-500/10",    border:"border-teal-500/25",    badge:"bg-teal-500/15    border-teal-500/25    text-teal-400",    dot:"bg-teal-400",    grad:"from-teal-500 to-cyan-500"      },
  indigo:  { text:"text-indigo-400",  bg:"bg-indigo-500/10",  border:"border-indigo-500/25",  badge:"bg-indigo-500/15  border-indigo-500/25  text-indigo-400",  dot:"bg-indigo-400",  grad:"from-indigo-500 to-violet-500"  },
  orange:  { text:"text-orange-400",  bg:"bg-orange-500/10",  border:"border-orange-500/25",  badge:"bg-orange-500/15  border-orange-500/25  text-orange-400",  dot:"bg-orange-400",  grad:"from-orange-500 to-amber-500"   },
  fuchsia: { text:"text-fuchsia-400", bg:"bg-fuchsia-500/10", border:"border-fuchsia-500/25", badge:"bg-fuchsia-500/15 border-fuchsia-500/25 text-fuchsia-400", dot:"bg-fuchsia-400", grad:"from-fuchsia-500 to-violet-500"  },
};

/* ══════════════════════════════════════════════════════════════════════════════
   DETAIL PAGE
   Structure from brief:
     • Client Type
     • Problem
     • Solution (bullet list)
     • Results (bullet list)
     • "How We Delivered Results" process (numbered steps) — REQUIRED
     • "Services Used" tags — REQUIRED
   + extras: stats banner, data fields, qualification criteria, sample message
══════════════════════════════════════════════════════════════════════════════ */
function DetailPage({
  c, onBack, onPrev, onNext, hasPrev, hasNext,
}: {
  c: Case; onBack: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  const col = CM[c.color];
  const setView = useAppStore((s) => s.setView);
  const prefersReduced = useReducedMotion();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [c.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen text-white pb-24"
    >
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {!prefersReduced && (
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px]"
            style={{ background:`radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.09),transparent 70%)`, filter:"blur(100px)" }} />
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>

      {/* ── Sticky navigation bar ── */}
      <div className="sticky top-16 md:top-20 z-40 bg-[#0a0f1a]/85 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="container-custom px-4 py-3 flex items-center justify-between gap-4">
          <button onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group text-sm font-semibold touch-manipulation">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All Cases
          </button>
          <div className="flex items-center gap-3">
            <button onClick={onPrev} disabled={!hasPrev}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all flex items-center justify-center touch-manipulation">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-white/35 tabular-nums">{c.id + 1} / {CASES.length}</span>
            <button onClick={onNext} disabled={!hasNext}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all flex items-center justify-center touch-manipulation">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom px-4 relative z-10 max-w-4xl mx-auto">

        {/* ══ HEADER — client type, service, result ══ */}
        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.05, duration:0.55 }} className="pt-10 pb-8 md:pt-14">

          {/* Colour accent bar */}
          <div className={`h-1.5 w-24 bg-gradient-to-r ${col.grad} rounded-full mb-8`} />

          {/* Client type + region tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${col.badge}`}>{c.clientType}</span>
            <span className="text-xs text-white/45 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">{c.region}</span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${col.badge}`}>{c.filter}</span>
          </div>

          {/* Client name */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2">{c.client}</h1>
          <p className={`text-base md:text-lg font-semibold ${col.text} mb-5`}>{c.service}</p>

          {/* Key result highlight */}
          <div className={`inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl ${col.bg} border ${col.border}`}>
            <Award className={`w-5 h-5 ${col.text} flex-shrink-0`} />
            <p className={`text-sm md:text-base font-bold ${col.text} italic`}>{c.result}</p>
          </div>
        </motion.div>

        {/* ══ STATS BANNER ══ */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.12, duration:0.5 }}
          className="grid grid-cols-3 gap-4 mb-12">
          {c.stats.map((s, i) => (
            <div key={i} className={`p-5 md:p-6 rounded-2xl text-center ${col.bg} border ${col.border}`}>
              <div className={`text-2xl md:text-3xl font-black ${col.text} mb-1`}>{s.v}</div>
              <div className="text-[10px] md:text-xs text-white/45 uppercase tracking-widest font-bold leading-tight">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* ══ PROBLEM ══ */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.18, duration:0.5 }} className="feature-card-premium p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-3 h-3 rounded-full bg-red-400 flex-shrink-0" />
            <h2 className="text-base md:text-lg font-black text-white uppercase tracking-widest">Problem</h2>
          </div>
          <p className="text-sm md:text-base text-white/65 leading-relaxed">{c.problem}</p>
        </motion.div>

        {/* ══ SOLUTION ══ */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.24, duration:0.5 }} className="feature-card-premium p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <span className={`w-3 h-3 rounded-full ${col.dot} flex-shrink-0`} />
            <h2 className="text-base md:text-lg font-black text-white uppercase tracking-widest">Solution</h2>
          </div>
          <ul className="space-y-3">
            {c.solution.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/65">
                <CheckCircle className={`w-4 h-4 ${col.text} flex-shrink-0 mt-0.5`} />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ══ RESULTS ══ */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3, duration:0.5 }} className="feature-card-premium p-6 md:p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <Award className={`w-5 h-5 ${col.text}`} />
            <h2 className="text-base md:text-lg font-black text-white uppercase tracking-widest">Result</h2>
          </div>
          <ul className="space-y-3">
            {c.results.map((r, i) => (
              <li key={i} className={`flex items-start gap-3 text-sm md:text-base ${col.text}`}>
                <span className={`w-2 h-2 rounded-full ${col.dot} flex-shrink-0 mt-1.5`} />
                <span className="font-semibold">{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ══ PROCESS PROOF — "How We Delivered Results" ══ */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.36, duration:0.5 }} className="mb-6">
          <h2 className="text-base md:text-lg font-black text-white uppercase tracking-widest text-center mb-6">
            How We Delivered Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.process.map((p, i) => (
              <div key={i} className="feature-card-premium p-5 flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${col.bg} border ${col.border} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-sm font-black ${col.text}`}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm text-white/65 leading-relaxed pt-1">{p}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ══ EXTRA: Data Fields / Target Roles ══ */}
        {"extraFields" in c && (c as any).extraFields && (
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.42 }} className="feature-card-premium p-6 md:p-7 mb-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">{(c as any).extraFields.label}</h3>
            <div className="flex flex-wrap gap-2">
              {(c as any).extraFields.items.map((f: string) => (
                <span key={f} className={`text-xs px-3 py-2 rounded-xl border ${col.badge} font-semibold`}>{f}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* ══ EXTRA: Qualification Criteria ══ */}
        {"extraQualification" in c && (c as any).extraQualification && (
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.44 }} className="feature-card-premium p-6 md:p-7 mb-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Lead Qualification Criteria</h3>
            <ul className="space-y-2.5">
              {(c as any).extraQualification.map((q: string) => (
                <li key={q} className="flex items-center gap-2.5 text-sm text-white/65">
                  <CheckCircle className={`w-4 h-4 ${col.text} flex-shrink-0`} />
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* ══ EXTRA: Sample Outreach Message ══ */}
        {"sampleMessage" in c && (c as any).sampleMessage && (
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.46 }} className="feature-card-premium p-6 md:p-7 mb-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Sample Outreach Message</h3>
            <div className={`p-5 rounded-xl ${col.bg} border ${col.border}`}>
              <pre className={`text-sm ${col.text} leading-relaxed whitespace-pre-wrap font-sans italic`}>
                {(c as any).sampleMessage}
              </pre>
            </div>
          </motion.div>
        )}

        {/* ══ SERVICES USED TAGS ══ */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.5 }} className="mb-12">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest text-center mb-4">Services Used</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {c.services.map((s) => (
              <span key={s} className={`text-sm px-5 py-2.5 rounded-full border ${col.badge} font-bold`}>{s}</span>
            ))}
          </div>
        </motion.div>

        {/* ══ Bottom prev / next ══ */}
        <div className="flex items-center justify-between pt-8 pb-6 border-t border-white/10 mb-10">
          <button onClick={onPrev} disabled={!hasPrev}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all touch-manipulation ${hasPrev ? `${col.bg} ${col.border} hover:scale-105` : "bg-white/5 border-white/10 opacity-25 cursor-not-allowed"}`}>
            <ChevronLeft className={`w-4 h-4 ${hasPrev ? col.text : "text-white/30"}`} />
            <span className={`text-sm font-semibold ${hasPrev ? col.text : "text-white/30"}`}>Previous</span>
          </button>
          <button onClick={onBack} className="text-xs text-white/30 hover:text-white transition-colors font-medium">All Cases</button>
          <button onClick={onNext} disabled={!hasNext}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all touch-manipulation ${hasNext ? `${col.bg} ${col.border} hover:scale-105` : "bg-white/5 border-white/10 opacity-25 cursor-not-allowed"}`}>
            <span className={`text-sm font-semibold ${hasNext ? col.text : "text-white/30"}`}>Next</span>
            <ChevronRight className={`w-4 h-4 ${hasNext ? col.text : "text-white/30"}`} />
          </button>
        </div>

        {/* ══ Page-level CTA ══ */}
        <div className="card-glass-premium text-center p-8 md:p-12">
          <h2 className="heading-xl mb-4">
            <span className="text-white">Ready to Write Your</span>
            <span className="block gradient-text-enhanced mt-2">Success Story?</span>
          </h2>
          <p className="text-body-lg text-white/65 max-w-xl mx-auto mb-8">
            Join businesses that turned data challenges into consistent growth.
          </p>
          <button onClick={() => setView("contact")} className="btn-cta-premium group w-full sm:w-auto">
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
   CASE CARD
   Structure from brief:
     • Client type
     • Service used
     • Short 2–3 line description
     • Key result
     • Button: View Details
══════════════════════════════════════════════════════════════════════════════ */
function CaseCard({ c, onOpen, isMobile, index }: {
  c: Case; onOpen: () => void; isMobile: boolean; index: number;
}) {
  const col = CM[c.color];
  return (
    <motion.div layout
      initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }}
      exit={{ opacity:0, scale:0.94 }} transition={{ duration:0.32 }}
      className="group">
      <motion.div
        className="feature-card-premium h-full flex flex-col cursor-pointer relative"
        whileHover={!isMobile ? { y: -5 } : {}} transition={{ duration:0.25 }}
        onClick={onOpen} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        aria-label={`View ${c.client} case study`}>

        {/* Background number watermark */}
        <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* ① Client type tag + region */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border ${col.badge}`}>{c.clientType}</span>
            <span className="text-[10px] text-white/35 leading-tight text-right">{c.region}</span>
          </div>

          {/* ② Service used */}
          <p className={`text-[11px] font-black uppercase tracking-widest ${col.text} mb-2`}>{c.service}</p>

          {/* ③ Client name */}
          <h3 className="text-white font-bold text-base leading-snug mb-3">{c.client}</h3>

          {/* ④ Short 2–3 line description */}
          <p className="text-sm text-white/50 leading-relaxed mb-5 flex-grow">{c.shortDesc}</p>

          {/* ⑤ Mini stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/[0.025] rounded-xl border border-white/[0.05]">
            {c.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-sm font-bold ${col.text} mb-0.5`}>{s.v}</div>
                <div className="text-[10px] text-white/35 uppercase tracking-wide leading-tight">{s.l}</div>
              </div>
            ))}
          </div>

          {/* ⑥ Key result */}
          <div className={`flex items-center gap-2 p-2.5 rounded-xl ${col.bg} border ${col.border} mb-4`}>
            <Award className={`w-3.5 h-3.5 ${col.text} flex-shrink-0`} />
            <p className={`text-xs font-semibold ${col.text} italic leading-snug`}>{c.result}</p>
          </div>

          {/* ⑦ View Details button */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-white/25 text-white/55 hover:text-white text-sm font-semibold transition-all touch-manipulation">
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   Structure from brief:
     HEADER  → Our Work + subtext
     FILTERS → All | Lead Generation | Outreach | Content | Website
     GRID    → 3-col desktop, 1-col mobile
     (+ process strip + CTA below)
══════════════════════════════════════════════════════════════════════════════ */
export default function CaseStudiesView() {
  const setView      = useAppStore((s) => s.setView);
  const prefersReduced = useReducedMotion();
  const [active, setActive]   = useState("All");
  const [openId, setOpenId]   = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible  = CASES.filter((c) => active === "All" || c.filter === active);
  const openCase = openId !== null ? CASES.find((c) => c.id === openId) ?? null : null;

  const nav = useCallback((dir: 1 | -1) => {
    if (openId === null) return;
    const idx  = CASES.findIndex((c) => c.id === openId);
    const next = CASES[idx + dir];
    if (next) setOpenId(next.id);
  }, [openId]);

  /* Show full detail page when a case is open */
  if (openCase) {
    return (
      <AnimatePresence mode="wait">
        <DetailPage
          key={openCase.id}
          c={openCase}
          onBack={() => { setOpenId(null); requestAnimationFrame(() => window.scrollTo({ top:0, behavior:"instant" })); }}
          onPrev={() => nav(-1)}
          onNext={() => nav(1)}
          hasPrev={openCase.id > 0}
          hasNext={openCase.id < CASES.length - 1}
        />
      </AnimatePresence>
    );
  }

  /* ── GRID VIEW ── */
  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Static background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!prefersReduced && !isMobile && (
          <>
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px]"
              style={{ background:"radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.09),transparent 70%)", filter:"blur(80px)" }} />
            <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px]"
              style={{ background:"radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.09),transparent 70%)", filter:"blur(80px)" }} />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.018]" />
      </div>

      {/* ════ HEADER — "Our Work" ════ */}
      <section className="relative section-spacing pt-16 md:pt-24">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="badge-glow mx-auto mb-6 w-fit">
              <Sparkles className="w-4 h-4" />
              Precision • Verification • Execution
            </div>

            {/* Heading: Our Work */}
            <h1 className="heading-display mb-4 max-w-4xl mx-auto">
              <span className="block text-white">Our Work</span>
              <span className="block gradient-text-enhanced mt-2">Real Results, Real Growth</span>
            </h1>
            <div className="h-1.5 w-24 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6" />

            {/* Subtext from brief */}
            <p className="text-body-lg max-w-2xl mx-auto text-white/72 px-4">
              A look at how we help businesses generate leads, build systems and drive consistent
              growth through data, outreach and execution.
            </p>
          </motion.div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 md:mt-14 max-w-4xl mx-auto">
            {[
              { n:"10+",    l:"Case Studies"      },
              { n:"99%",    l:"Data Accuracy"     },
              { n:"12",     l:"Countries Served"  },
              { n:"4,500+", l:"Verified Contacts" },
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

      {/* ════ FILTER / CATEGORY TABS ════ */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="container-custom px-4">

          {/* Tabs — All | Lead Generation | Outreach | Content | Website */}
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

          {/* ════ PROJECT / CASE STUDY CARDS — 3-col desktop, 1-col mobile ════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((c, i) => (
                <CaseCard key={c.id} c={c} index={i} isMobile={isMobile}
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

      {/* ════ PROCESS PROOF — "How We Delivered Results" ════ */}
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
              { icon: Search,    n:"01", title:"Research & Targeting", desc:"Deep ICP analysis and market mapping"           },
              { icon: BarChart3, n:"02", title:"Data Building",        desc:"Multi-source, triple-verified databases"        },
              { icon: Zap,       n:"03", title:"Campaign Execution",   desc:"Structured outreach with personalised messaging" },
              { icon: Settings,  n:"04", title:"Optimisation",         desc:"Ongoing tuning based on real response data"     },
            ].map((p, i) => (
              <motion.div key={p.n}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
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

      {/* ════ CTA ════ */}
      <section className="section-spacing-sm">
        <div className="container-custom px-4">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.55 }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-14">
            <h2 className="heading-xl mb-4">
              <span className="text-white">Ready to Write Your</span>
              <span className="block gradient-text-enhanced mt-2">Success Story?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 text-white/72">
              Join hundreds of businesses that turned data challenges into growth.
            </p>
            <button onClick={() => setView("contact")} className="btn-cta-premium group w-full sm:w-auto">
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