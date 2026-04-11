"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAppStore } from "@/store/appStore";
import Image from "next/image";
import {
  Zap,
  Crosshair,
  Palette,
  BarChart2,
  ShieldCheck,
  Quote,
  ArrowRight,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  Users,
  Target,
  TrendingUp,
  Award,
  Rocket,
  Globe,
  Check,
  ChevronDown,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const team = [
  {
    name: "Devan",
    role: "Founder & CEO",
    image: "https://i.postimg.cc/Pq5J4mp4/Whats-App-Image-2026-02-14-at-7-44-21-PM.jpg",
    bio: "Leading Remarketix with a vision to make data-driven growth simple and impactful.",
    color: "emerald",
    achievements: ["500+ Projects", "12 Countries", "99% Success Rate"],
  },
  {
    name: "Syed Rahaman",
    role: "Partner & CGO",
    image: "https://i.postimg.cc/t4X4qhzK/Whats-App-Image-2026-02-14-at-7-52-20-PM.jpg",
    bio: "Driving the growth engine, turning ideas into measurable outcomes.",
    color: "blue",
    achievements: ["Growth Strategy", "Client Success", "Revenue Scaling"],
  },
  {
    name: "Souvik Bera",
    role: "Head of Lead Gen",
    image: "https://i.postimg.cc/66RT66dq/Whats-App-Image-2026-02-15-at-12-02-34-PM.jpg",
    bio: "Leading lead generation with precision and creativity.",
    color: "violet",
    achievements: ["50K+ Leads", "98% Accuracy", "Multi-Region"],
  },
  {
    name: "Sun Roy",
    role: "CTO & Automation",
    image: "https://i.postimg.cc/tTmXDwQT/Sun-suit.png",
    bio: "Leading technology and automation for efficient, scalable processes.",
    color: "cyan",
    achievements: ["AI Integration", "Process Automation", "Tech Innovation"],
  },
  {
    name: "Sourav Show",
    role: "Data Research Manager",
    image: "https://i.postimg.cc/pdmxrknH/Whats-App-Image-2026-02-15-at-12-04-15-PM.jpg",
    bio: "Overseeing data research with focus on accuracy and insights.",
    color: "pink",
    achievements: ["Data Excellence", "Quality Assurance", "Research Lead"],
  },
  {
    name: "Sujata Manna",
    role: "Head of BD",
    image: "https://i.postimg.cc/CxHm3fMx/Whats-App-Image-2026-02-14-at-7-50-07-PM.jpg",
    bio: "Driving expansion and building lasting client partnerships.",
    color: "amber",
    achievements: ["Partnership Growth", "Market Expansion", "Client Relations"],
  },
];

const values = [
  {
    icon: Crosshair,
    color: "emerald",
    title: "Precision",
    desc: "Data that targets real buyers",
    gradient: "from-emerald-500 to-emerald-600",
    features: ["Triple-verified data", "ICP alignment", "Decision-maker focus"],
  },
  {
    icon: Palette,
    color: "blue",
    title: "Creativity",
    desc: "Design and ads that stand out",
    gradient: "from-blue-500 to-blue-600",
    features: ["Unique campaigns", "Brand storytelling", "Visual excellence"],
  },
  {
    icon: BarChart2,
    color: "violet",
    title: "Performance",
    desc: "Pipeline and revenue impact",
    gradient: "from-violet-500 to-violet-600",
    features: ["Measurable results", "ROI tracking", "Growth metrics"],
  },
  {
    icon: ShieldCheck,
    color: "rose",
    title: "Trust",
    desc: "We grow when you grow",
    gradient: "from-rose-500 to-rose-600",
    features: ["Client partnerships", "Transparent process", "Long-term focus"],
  },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Started with a vision to transform B2B growth" },
  { year: "2021", title: "100+ Clients", desc: "Expanded across multiple industries" },
  { year: "2022", title: "Global Reach", desc: "Serving clients in 12 countries" },
  { year: "2023", title: "500+ Projects", desc: "Delivered consistent growth results" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-400", dot: "bg-emerald-400" },
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/25",    text: "text-blue-400",    dot: "bg-blue-400"    },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/25",  text: "text-violet-400",  dot: "bg-violet-400"  },
  cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/25",    text: "text-cyan-400",    dot: "bg-cyan-400"    },
  pink:    { bg: "bg-pink-500/10",    border: "border-pink-500/25",    text: "text-pink-400",    dot: "bg-pink-400"    },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/25",   text: "text-amber-400",   dot: "bg-amber-400"   },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/25",    text: "text-rose-400",    dot: "bg-rose-400"    },
};

/* ─── Value Card ────────────────────────────────────────────────────────────── */
function ValueCard({ value, isMobile, index }: {
  value: typeof values[0];
  isMobile: boolean;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const c = colorMap[value.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <motion.div
        className="feature-card-premium h-full flex flex-col cursor-pointer"
        whileHover={!isMobile ? { y: -6, scale: 1.02 } : {}}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Icon + gradient overlay */}
        <div className="relative mb-5">
          <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity`} />
          <div className={`relative w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center`}>
            <value.icon className={`w-7 h-7 ${c.text}`} />
          </div>
        </div>

        {/* Title + desc */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
          {value.title}
        </h3>
        <p className="text-sm text-white/60 mb-4">{value.desc}</p>

        {/* Expandable features */}
        <div className="mt-auto">
          <button
            className={`flex items-center gap-2 text-xs font-semibold ${c.text} hover:opacity-80 transition-opacity`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? "Hide" : "Show"} Details
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 space-y-2 border-t border-white/10 pt-3"
            >
              {value.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-white/70">
                  <Check className={`w-3 h-3 ${c.text} flex-shrink-0`} />
                  {f}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Team Member Card ──────────────────────────────────────────────────────── */
function TeamMemberCard({ member, isMobile, index }: {
  member: typeof team[0];
  isMobile: boolean;
  index: number;
}) {
  const c = colorMap[member.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
      className="group h-full"
    >
      <motion.div
        className="feature-card-premium h-full flex flex-col relative overflow-hidden"
        whileHover={!isMobile ? { y: -8, scale: 1.03 } : {}}
        transition={{ duration: 0.35 }}
      >
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.text.replace("text-", "from-")} to-transparent`} />

        <div className="relative z-10 flex flex-col h-full items-center text-center p-6">
          {/* Image */}
          <motion.div
            className="relative mb-5"
            whileHover={!isMobile ? { scale: 1.1, rotate: 3 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className={`absolute -inset-2 bg-gradient-to-br ${c.text.replace("text-", "from-")} ${c.text.replace("text-", "to-")}-600 opacity-20 rounded-full blur-xl`} />
            <Image
              src={member.image}
              alt={member.name}
              width={120}
              height={120}
              className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 ${c.border} group-hover:border-opacity-50 transition-all`}
              unoptimized
            />
          </motion.div>

          {/* Name + Role */}
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{member.name}</h3>
          <p className={`text-xs md:text-sm font-semibold uppercase tracking-wider mb-4 ${c.text}`}>
            {member.role}
          </p>

          {/* Divider */}
          <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${c.text.replace("text-", "from-")} ${c.text.replace("text-", "to-")}-600 mb-4`} />

          {/* Bio */}
          <p className="text-sm text-white/65 leading-relaxed mb-5 flex-grow">{member.bio}</p>

          {/* Achievements */}
          <div className={`w-full pt-4 border-t ${c.border}`}>
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">Key Impact</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.achievements.map((ach) => (
                <span
                  key={ach}
                  className={`text-xs px-2.5 py-1 rounded-full ${c.bg} border ${c.border} ${c.text} font-semibold`}
                >
                  {ach}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function AboutView() {
  const setView = useAppStore((s) => s.setView);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!prefersReducedMotion && !isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-[500px] h-[500px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.12),transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.1),transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{
                x: [0, -40, 0],
                y: [0, -40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative section-spacing pt-16 md:pt-24">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="badge-glow mx-auto mb-6 w-fit">
              <Sparkles className="w-4 h-4" />
              About Remarketix
            </div>
            <h1 className="heading-display mb-4 max-w-4xl mx-auto">
              <span className="block text-white">Where Data Meets Design</span>
              <span className="block gradient-text-enhanced mt-2">and Demand</span>
            </h1>
            <div className="h-1.5 w-24 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6" />
            <p className="text-body-lg max-w-2xl mx-auto text-white/75 px-4">
              Building the foundation of your revenue engine through precision data, creative execution, and measurable results.
            </p>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 md:mt-14 max-w-3xl mx-auto">
            {[
              { icon: Target,    v: "500+", l: "Projects Delivered" },
              { icon: Users,     v: "100+", l: "Active Clients" },
              { icon: Globe,     v: "12",   l: "Countries" },
              { icon: Award,     v: "99%",  l: "Success Rate" },
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

      {/* ── Mission Statement ── */}
      <section className="section-spacing">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="badge mb-5">
                <Zap className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="heading-xl mb-5">
                <span className="block text-white">We build the foundation of</span>
                <span className="block gradient-text-enhanced mt-2">your revenue engine</span>
              </h2>
              <p className="text-body-lg leading-relaxed text-white/75 mb-6">
                At Remarketix, we don&apos;t just find leads — we create everything you need to reach them, impress them, and convert them.
              </p>
              <p className="text-base text-white/65 leading-relaxed mb-8">
                From ICP-aligned data and powerful websites to product advertising and social outreach, we deliver a complete growth system that drives real business results.
              </p>
              <motion.button
                onClick={() => setView("services")}
                className="btn-secondary-premium group"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-500/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="heading-xl text-white mb-3">
              Core <span className="gradient-text-enhanced">Values</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mb-4" />
            <p className="text-body-lg text-white/60 max-w-2xl mx-auto">
              The principles that guide every project, partnership, and decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {values.map((value, i) => (
              <ValueCard key={value.title} value={value} isMobile={isMobile} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Story ── */}
      <section className="section-spacing">
        <div className="container-custom max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <Quote className="w-12 h-12 md:w-16 md:h-16 text-emerald-500/30 mx-auto mb-5" />
            <h2 className="heading-xl text-white mb-3">The Story Behind Remarketix</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="feature-card-premium p-8 md:p-12"
          >
            <p className="text-xl md:text-2xl font-bold text-white mb-6">
              Hi, I&apos;m Devan.
            </p>

            <div className="space-y-5 text-white/70 leading-relaxed text-base md:text-lg">
              <p>
                My journey has been built in silence, in late nights when no one was watching and weekends when everyone else was resting. I didn&apos;t start with a perfect plan — I started with determination.
              </p>

              <motion.blockquote
                className="border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-emerald-500/5 rounded-r-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="italic text-white/85 text-lg md:text-xl">
                  &ldquo;During this journey, I realized many businesses want to grow but struggle because they don&apos;t have the right data, prospects, or strategy. That&apos;s when I decided to build something better.&rdquo;
                </p>
              </motion.blockquote>

              {showFullStory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <p>
                    I started small — freelancing, learning, failing, and improving. Each client taught me something new. Each campaign showed me what works and what doesn&apos;t.
                  </p>
                  <p>
                    Over time, I built a team of specialists who shared the same vision: to help businesses grow through data, design, and execution.
                  </p>
                  <p>
                    Today, Remarketix serves clients across 12 countries, delivering everything from lead generation to full-scale digital transformation.
                  </p>
                </motion.div>
              )}

              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors mt-6"
              >
                {showFullStory ? "Show Less" : "Read Full Story"}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFullStory ? "rotate-180" : ""}`} />
              </button>

              <div className="pt-6 border-t border-white/10 mt-8">
                <p className="text-2xl font-black">
                  <span className="gradient-text-enhanced">That decision became Remarketix.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-spacing bg-white/[0.01]">
        <div className="container-custom px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="heading-xl text-white mb-3">Our Journey</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-blue-500/50" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`relative flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Year badge */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-4 border-[#0a0f1a] flex items-center justify-center z-10">
                    <span className="text-sm font-black text-emerald-400">{milestone.year}</span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-24 md:pl-0 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="feature-card-premium p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-sm md:text-base text-white/65">{milestone.desc}</p>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-spacing">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="heading-xl text-white mb-3">Meet the Team</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mb-4" />
            <p className="text-body-lg text-white/60 max-w-2xl mx-auto">
              Talented individuals driving innovation and excellence across every project.
            </p>
          </motion.div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <TeamMemberCard key={member.name} member={member} isMobile={isMobile} index={i} />
            ))}
          </div>

          {/* Mobile: Swipe carousel */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
              {team.map((member, i) => (
                <div key={member.name} className="flex-shrink-0 snap-start" style={{ width: "min(85vw, 320px)" }}>
                  <TeamMemberCard member={member} isMobile={isMobile} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing-sm">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-16"
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 fill-emerald-400" />
            </motion.div>
            <h2 className="heading-xl mb-5">
              <span className="text-white">One partner.</span>
              <span className="block gradient-text-enhanced mt-2">Endless growth.</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 text-white/75">
              The complete growth system behind modern B2B brands. Let&apos;s build yours.
            </p>
            <motion.button
              onClick={() => setView("contact")}
              className="btn-cta-premium group w-full sm:w-auto"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              Start Growing Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}