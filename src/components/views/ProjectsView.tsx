"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useAppStore } from "@/store/appStore";
import Image from "next/image";
import { ArrowRight, ExternalLink, Sparkles, TrendingUp, BarChart, Users, Target, ChevronLeft, ChevronRight } from "lucide-react";

const leadProjects = [
  {
    title: "Exhibitor Marketing Data – Europe",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    desc: "Verified database of senior marketing leaders across DACH, Nordics, and Eastern Europe.",
    focus: "CMOs & Heads of Sales",
    stats: "2,400+ contacts",
    color: "emerald"
  },
  {
    title: "UK Pub Lead List Building",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
    desc: "Verified contact list of pub owners and decision-makers in London and surrounding areas.",
    focus: "Owners & Managers",
    stats: "1,200+ venues",
    color: "blue"
  },
  {
    title: "BioPharma Contacts – South Korea",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    desc: "Focused list of emerging BioPharma companies targeting R&D professionals.",
    focus: "Research Directors",
    stats: "90+ contacts",
    color: "violet"
  },
  {
    title: "UK Hospitality Chains",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    desc: "Mapped UK restaurant and hotel chains with 4+ locations.",
    focus: "C-Level & Dept Heads",
    stats: "800+ contacts",
    color: "cyan"
  },
];

const smmProjects = [
  {
    title: "Founder Personal Branding",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    stat: "210%",
    label: "Profile Views Increase",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600"
  },
  {
    title: "B2B Brand Management",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    stat: "3x",
    label: "Engagement Growth",
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Multi-channel Outreach",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    stat: "15+",
    label: "Qualified Meetings/Month",
    color: "violet",
    gradient: "from-violet-500 to-violet-600"
  },
];

export default function ProjectsView() {
  const setView = useAppStore((s) => s.setView);
  const smmScrollRef = useRef<HTMLDivElement>(null);
  const leadScrollRef = useRef<HTMLDivElement>(null);

  const scrollSMM = (dir: number) => smmScrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  const scrollLead = (dir: number) => leadScrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i === 0 ? "rgba(16, 185, 129, 0.1)" : i === 1 ? "rgba(59, 130, 246, 0.1)" : "rgba(139, 92, 246, 0.1)"}, transparent 70%)`,
              filter: "blur(60px)",
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
            }}
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
          />
        ))}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.02]" />
      </div>

      {/* Hero */}
      <section className="relative section-spacing">
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="badge-glow mx-auto mb-6 md:mb-8">
              <Sparkles className="w-4 h-4" />
              Results-Driven Agency
            </div>
            <h1 className="heading-display mb-5 md:mb-6 max-w-5xl mx-auto">
              <span className="block text-white">Real projects. Real outcomes.</span>
              <span className="block gradient-text-enhanced mt-2 md:mt-3">Real growth.</span>
            </h1>
            <motion.div
              className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <p className="text-body-lg max-w-2xl mx-auto text-white/80 px-4 md:px-0">
              At Remarketix, we deliver more than services. We deliver measurable business impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lead Generation */}
      <section className="section-spacing">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="badge mx-auto mb-4">
              <BarChart className="w-4 h-4" />
              Lead Generation & Research
            </div>
            <h2 className="heading-xl text-white mb-4 px-4 md:px-0">
              Verified contacts. Real buyers. Zero waste.
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          {/* Mobile: swipe */}
          <div className="lg:hidden relative">
            <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">Swipe to explore →</p>
            <div className="relative">
              <button
                onClick={() => scrollLead(-1)}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div
                ref={leadScrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              >
                {leadProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    className="flex-shrink-0 snap-start"
                    style={{ width: "min(85vw, 340px)" }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="card overflow-hidden h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />
                        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full bg-${project.color}-500/20 border border-${project.color}-500/30 backdrop-blur-sm text-${project.color}-400 text-xs font-semibold`}>
                          {project.stats}
                        </div>
                      </div>
                      <div className="p-5 relative z-10">
                        <h3 className="heading-sm text-white mb-2">{project.title}</h3>
                        <p className="text-body-sm mb-4 leading-relaxed text-sm">{project.desc}</p>
                        <div className="flex items-center justify-between">
                          <div className={`px-3 py-1.5 rounded-xl bg-${project.color}-500/10 border border-${project.color}-500/20`}>
                            <span className="text-xs">
                              <span className="text-white/60">Focus:</span>{" "}
                              <span className={`text-${project.color}-400 font-medium`}>{project.focus}</span>
                            </span>
                          </div>
                          <button className={`flex items-center gap-1.5 text-${project.color}-400 font-medium text-sm`}>
                            Details <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scrollLead(1)}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {leadProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <motion.div className="card overflow-hidden h-full" whileHover={{ y: -8 }} transition={{ duration: 0.4 }}>
                  <motion.div className={`absolute -inset-1 bg-gradient-to-r from-${project.color}-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  <div className="relative h-64 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                      <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent" />
                    <motion.div className={`absolute top-4 right-4 px-4 py-2 rounded-full bg-${project.color}-500/20 border border-${project.color}-500/30 backdrop-blur-sm text-${project.color}-400 text-sm font-semibold shadow-lg`} whileHover={{ scale: 1.1 }}>
                      {project.stats}
                    </motion.div>
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${project.color}-500/30 to-transparent blur-2xl`} />
                  </div>
                  <div className="p-8 relative z-10">
                    <h3 className="heading-sm text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-body-sm mb-6 leading-relaxed">{project.desc}</p>
                    <div className="flex items-center justify-between">
                      <motion.div className={`px-4 py-2 rounded-xl bg-${project.color}-500/10 border border-${project.color}-500/20`} whileHover={{ scale: 1.05 }}>
                        <span className="text-sm">
                          <span className="text-white/60">Focus:</span>{" "}
                          <span className={`text-${project.color}-400 font-medium`}>{project.focus}</span>
                        </span>
                      </motion.div>
                      <motion.button className={`flex items-center gap-2 text-${project.color}-400 hover:text-${project.color}-300 font-medium transition-colors group/btn`} whileHover={{ x: 5 }}>
                        Details <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-${project.color}-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-spacing bg-white/[0.02]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="badge mx-auto mb-4">
              <Users className="w-4 h-4" />
              Social Media & Outreach
            </div>
            <h2 className="heading-xl text-white mb-4 px-4 md:px-0">
              Content that converts. Engagement that builds pipeline.
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full mx-auto" />
          </motion.div>

          {/* Mobile: swipe */}
          <div className="md:hidden relative">
            <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">Swipe to explore →</p>
            <div className="relative">
              <button
                onClick={() => scrollSMM(-1)}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div
                ref={smmScrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              >
                {smmProjects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    className="flex-shrink-0 snap-start"
                    style={{ width: "min(82vw, 300px)" }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <div className="card overflow-hidden h-full">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                      </div>
                      <div className="p-5 relative z-10">
                        <h4 className="text-base font-semibold text-white mb-4">{project.title}</h4>
                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} opacity-20 border border-${project.color}-500/30 flex items-center justify-center flex-shrink-0`}>
                            <TrendingUp className={`w-5 h-5 text-${project.color}-400`} />
                          </div>
                          <div>
                            <span className={`text-2xl font-bold text-${project.color}-400 block`}>{project.stat}</span>
                            <span className="text-xs text-white/60 block mt-0.5">{project.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scrollSMM(1)}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {smmProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <motion.div className="card overflow-hidden h-full" whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.4 }}>
                  <motion.div className={`absolute -inset-1 bg-gradient-to-r from-${project.color}-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  <div className="relative h-48 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                      <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  </div>
                  <div className="p-6 relative z-10">
                    <h4 className="text-lg font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <motion.div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} opacity-20 border border-${project.color}-500/30 flex items-center justify-center`} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                        <TrendingUp className={`w-6 h-6 text-${project.color}-400`} />
                      </motion.div>
                      <div>
                        <motion.span className={`text-3xl font-bold text-${project.color}-400 block`} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200 }}>
                          {project.stat}
                        </motion.span>
                        <span className="text-sm text-white/60 block mt-1">{project.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 text-6xl font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] md:w-[800px] md:h-[600px]"
            style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)", filter: "blur(100px)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        <div className="container-custom relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-16"
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            >
              <Target className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
            </motion.div>
            <h2 className="heading-xl mb-5 md:mb-6">
              <span className="text-white">Want similar</span>
              <span className="block gradient-text-enhanced mt-2">results?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80">
              Let&apos;s build your growth engine using data, design, and outreach.
            </p>
            <motion.button
              onClick={() => setView("contact")}
              className="btn-primary-premium group w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
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