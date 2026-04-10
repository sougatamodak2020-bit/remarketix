"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { ArrowRight, Sparkles, Target, TrendingUp, Award, CheckCircle } from "lucide-react";

const filters = ["All", "Europe", "UK", "Asia", "Hospitality", "Tech/SaaS"];

const cases = [
  {
    title: "Exhibitor Marketing Data – Europe",
    tags: ["Europe", "Tech/SaaS"],
    region: "DACH Region",
    type: "B2B Event Platform",
    stats: [
      { v: "2,400+", l: "Contacts", icon: Target },
      { v: "99%", l: "Accuracy", icon: CheckCircle },
      { v: "40%", l: "Pipeline Boost", icon: TrendingUp }
    ],
    challenge: "Outdated exhibitor lists with incorrect emails and missing decision-makers.",
    solution: "Mapped 800+ companies, identified CMOs/Marketing Directors, triple-verified all emails.",
    result: "Complete database transformation enabling multi-event campaigns.",
    color: "emerald"
  },
  {
    title: "UK Pub & Restaurant Leads",
    tags: ["UK", "Hospitality"],
    region: "London & Southeast",
    type: "Hospitality Supplier",
    stats: [
      { v: "1,200+", l: "Contacts", icon: Target },
      { v: "98%", l: "Accuracy", icon: CheckCircle },
      { v: "2 wks", l: "Delivery", icon: Award }
    ],
    challenge: "Generic databases with duplicates and no real decision-maker contacts.",
    solution: "Manual research, validated ownership, found Owners/Managing Directors only.",
    result: "Hyper-personalized local outreach with immediate results.",
    color: "blue"
  },
  {
    title: "BioPharma Research Contacts",
    tags: ["Asia", "Tech/SaaS"],
    region: "South Korea",
    type: "Pharmaceutical R&D",
    stats: [
      { v: "30+", l: "Companies", icon: Target },
      { v: "90+", l: "Contacts", icon: CheckCircle },
      { v: "95%", l: "Delivery", icon: TrendingUp }
    ],
    challenge: "Language barriers and limited public data for Korean biotech.",
    solution: "Used ResearchGate, Korean R&D portals, validated through publications.",
    result: "Breakthrough access to Korean scientific community.",
    color: "violet"
  },
  {
    title: "Multi-Site Hospitality Chains",
    tags: ["UK", "Hospitality", "Tech/SaaS"],
    region: "UK National",
    type: "B2B SaaS Platform",
    stats: [
      { v: "200+", l: "Chains", icon: Target },
      { v: "800+", l: "Contacts", icon: CheckCircle },
      { v: "3", l: "Role Levels", icon: Award }
    ],
    challenge: "Identify Tier 1&2 chains and find Operations/Finance/IT decision-makers.",
    solution: "Mapped chains via registries, sourced C-level through LinkedIn/Apollo.",
    result: "Successful SaaS demo campaign with surgical precision.",
    color: "cyan"
  },
];

export default function CaseStudiesView() {
  const setView = useAppStore((s) => s.setView);
  const [active, setActive] = useState("All");
  const visible = cases.filter((c) => active === "All" || c.tags.includes(active));

  return (
    <div className="bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.12), transparent 70%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px]"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59, 130, 246, 0.12), transparent 70%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.02]" />
      </div>

      {/* Hero */}
      <section className="relative section-spacing">
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="badge-glow mx-auto mb-6 md:mb-8">
              <Sparkles className="w-4 h-4" />
              Precision • Verification • Execution
            </div>
            <h1 className="heading-display mb-5 md:mb-6 max-w-4xl mx-auto">
              <span className="block text-white">Data Challenges?</span>
              <span className="block gradient-text-enhanced mt-2 md:mt-3">We Turn Them Into Growth!</span>
            </h1>
            <motion.div
              className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <p className="text-body-lg max-w-2xl mx-auto text-white/80 px-4 md:px-0">
              Stop wasting time on bad lists. We deliver manually verified, high-intent B2B data.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-10 md:mt-16 max-w-4xl mx-auto px-2 md:px-0">
            {[
              { n: "4,500+", l: "Verified Contacts", color: "emerald" },
              { n: "99%", l: "Accuracy Rate", color: "blue" },
              { n: "12", l: "Countries", color: "violet" },
              { n: "40%", l: "Avg. Growth Boost", color: "cyan" },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                className="stat-card-premium group"
              >
                <motion.div
                  className="stat-value mb-1 md:mb-2 text-2xl md:text-4xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                >
                  {stat.n}
                </motion.div>
                <div className="stat-label text-xs md:text-sm">{stat.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="section-spacing bg-white/[0.02]">
        <div className="container-custom">
          {/* Filters — horizontal scroll on mobile */}
          <motion.div
            className="flex gap-2 md:gap-3 mb-10 md:mb-16 overflow-x-auto pb-2 -mx-4 px-4 md:flex-wrap md:justify-center md:overflow-visible md:pb-0 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                className={`flex-shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all touch-manipulation ${
                  active === f
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {f}
              </motion.button>
            ))}
          </motion.div>

          {/* Case Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {visible.map((c, index) => (
                <motion.div
                  key={c.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <motion.div
                    className="feature-card-premium h-full"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div className={`absolute -inset-1 bg-gradient-to-r from-${c.color}-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-5 md:mb-6 gap-2">
                        <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-${c.color}-500/10 border border-${c.color}-500/20 text-${c.color}-400 text-xs md:text-sm font-semibold`}>
                          {c.type}
                        </span>
                        <span className="text-xs md:text-sm text-white/40 font-medium text-right">{c.region}</span>
                      </div>

                      {/* Title */}
                      <h3 className="heading-sm text-white mb-4 md:mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                        {c.title}
                      </h3>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8 p-3 md:p-5 bg-white/[0.03] rounded-xl border border-white/5">
                        {c.stats.map((s, i) => (
                          <motion.div
                            key={s.l}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <motion.div
                              className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-1.5 md:mb-2 rounded-xl bg-${c.color}-500/10 border border-${c.color}-500/20 flex items-center justify-center`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <s.icon className={`w-4 h-4 md:w-5 md:h-5 text-${c.color}-400`} />
                            </motion.div>
                            <div className={`text-base md:text-xl font-bold text-${c.color}-400 mb-0.5 md:mb-1`}>{s.v}</div>
                            <div className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider">{s.l}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Details */}
                      <div className="space-y-4 md:space-y-5 mb-5 md:mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Challenge</span>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed pl-4">{c.challenge}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Solution</span>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed pl-4">{c.solution}</p>
                        </div>
                      </div>

                      {/* Result */}
                      <div className="pt-5 md:pt-6 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className={`w-4 h-4 md:w-5 md:h-5 text-${c.color}-400`} />
                          <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Result</span>
                        </div>
                        <p className={`text-sm italic text-${c.color}-400/90 leading-relaxed pl-6 md:pl-7`}>
                          &ldquo;{c.result}&rdquo;
                        </p>
                      </div>

                      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-5xl md:text-7xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-custom px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-16"
          >
            <h2 className="heading-xl mb-5 md:mb-6">
              <span className="text-white">Ready to Write Your</span>
              <span className="block gradient-text-enhanced mt-2">Success Story?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80">
              Join hundreds of businesses that turned data challenges into growth.
            </p>
            <motion.button
              onClick={() => setView("contact")}
              className="btn-cta-premium group w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                Let&apos;s Talk Growth
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}