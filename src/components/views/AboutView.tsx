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
} from "lucide-react";

const team = [
  {
    name: "Devan",
    role: "Founder & CEO",
    image:
      "https://i.postimg.cc/Pq5J4mp4/Whats-App-Image-2026-02-14-at-7-44-21-PM.jpg",
    bio: "Leading Remarketix with a vision to make data-driven growth simple and impactful.",
    color: "emerald",
  },
  {
    name: "Syed Rahaman",
    role: "Partner & CGO",
    image:
      "https://i.postimg.cc/t4X4qhzK/Whats-App-Image-2026-02-14-at-7-52-20-PM.jpg",
    bio: "Driving the growth engine, turning ideas into measurable outcomes.",
    color: "blue",
  },
  {
    name: "Souvik Bera",
    role: "Head of Lead Gen",
    image:
      "https://i.postimg.cc/66RT66dq/Whats-App-Image-2026-02-15-at-12-02-34-PM.jpg",
    bio: "Leading lead generation with precision and creativity.",
    color: "violet",
  },
  {
    name: "Sun Roy",
    role: "CTO & Automation",
    image: "https://i.postimg.cc/tTmXDwQT/Sun-suit.png",
    bio: "Leading technology and automation for efficient, scalable processes.",
    color: "cyan",
  },
  {
    name: "Sourav Show",
    role: "Data Research Manager",
    image:
      "https://i.postimg.cc/pdmxrknH/Whats-App-Image-2026-02-15-at-12-04-15-PM.jpg",
    bio: "Overseeing data research with focus on accuracy and insights.",
    color: "pink",
  },
  {
    name: "Sujata Manna",
    role: "Head of BD",
    image:
      "https://i.postimg.cc/CxHm3fMx/Whats-App-Image-2026-02-14-at-7-50-07-PM.jpg",
    bio: "Driving expansion and building lasting client partnerships.",
    color: "amber",
  },
];

const values = [
  {
    icon: Crosshair,
    color: "emerald",
    title: "Precision",
    desc: "Data that targets real buyers",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Palette,
    color: "blue",
    title: "Creativity",
    desc: "Design and ads that stand out",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: BarChart2,
    color: "violet",
    title: "Performance",
    desc: "Pipeline and revenue impact",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: ShieldCheck,
    color: "rose",
    title: "Trust",
    desc: "We grow when you grow",
    gradient: "from-rose-500 to-rose-600",
  },
];

export default function AboutView() {
  const setView = useAppStore((s) => s.setView);
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTeam = (dir: number) =>
    teamScrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!shouldReduceMotion &&
          [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  i === 0
                    ? "rgba(16, 185, 129, 0.08)"
                    : i === 1
                    ? "rgba(59, 130, 246, 0.08)"
                    : "rgba(139, 92, 246, 0.08)"
                }, transparent 70%)`,
                filter: "blur(80px)",
                top: `${5 + i * 35}%`,
                left: `${10 + i * 20}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
      </div>

      {/* Hero */}
      <section className="relative section-spacing pt-32">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-glow mx-auto mb-6 md:mb-8">
              <Sparkles className="w-4 h-4" />
              Who We Are
            </div>
            <h1 className="heading-display mb-5 md:mb-6">
              <span className="block text-white">About</span>
              <span className="block gradient-text-enhanced mt-2 md:mt-3">
                Remarketix
              </span>
            </h1>
            <motion.div
              className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <p className="text-body-lg max-w-2xl mx-auto text-white/80">
              Where data meets design and demand
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-spacing">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-500/20 blur-3xl rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] md:aspect-auto">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="order-2 lg:order-1"
            >
              <div className="badge mb-5 md:mb-6">
                <Zap className="w-4 h-4" />
                High Impact Solutions
              </div>
              <h2 className="heading-xl mb-5 md:mb-6">
                <span className="block text-white">
                  We build the foundation of
                </span>
                <span className="block gradient-text-enhanced mt-2 md:mt-3">
                  your revenue engine
                </span>
              </h2>
              <p className="text-body-lg leading-relaxed text-white/80 mb-7 md:mb-8">
                At Remarketix, we don&apos;t just find leads — we create
                everything you need to reach them, impress them, and convert
                them. From ICP-aligned data and powerful websites to product
                advertising and social outreach, we deliver a complete growth
                system.
              </p>
              <motion.button
                onClick={() => setView("services")}
                className="btn-secondary-premium group w-full sm:w-auto"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-white/[0.02]">
        <div className="container-custom px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="heading-xl text-white mb-4">
              Core <span className="gradient-text-enhanced">Values</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <motion.div
                  className="feature-card-premium text-center py-6 md:py-8"
                  whileHover={!isMobile ? { y: -8, scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} opacity-20 border border-${value.color}-500/30 flex items-center justify-center group-hover:opacity-30 transition-opacity`}
                    whileHover={!isMobile ? { rotate: 360 } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    <value.icon
                      className={`w-6 h-6 md:w-8 md:h-8 text-${value.color}-400`}
                    />
                  </motion.div>
                  <h3 className="heading-sm text-white mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300 text-base md:text-lg">
                    {value.title}
                  </h3>
                  <p className="text-body-sm text-sm">{value.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section-spacing">
        <div className="container-custom max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <Quote className="w-12 h-12 md:w-16 md:h-16 text-emerald-500/30 mx-auto mb-5 md:mb-6" />
            <h2 className="heading-xl text-white">
              The Story Behind Remarketix
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass-premium p-7 md:p-10 lg:p-14"
          >
            <p className="text-xl md:text-2xl font-medium text-white mb-6 md:mb-8">
              Hi, I&apos;m Devan.
            </p>
            <div className="space-y-5 md:space-y-6 text-white/70 leading-relaxed text-base md:text-lg">
              <p>
                My journey has been built in silence, in late nights when no one
                was watching and weekends when everyone else was resting. I
                didn&apos;t start with a perfect plan — I started with
                determination.
              </p>
              <motion.blockquote
                className="border-l-4 border-emerald-500 pl-5 md:pl-8 py-3 md:py-4 my-6 md:my-8 bg-emerald-500/5 rounded-r-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <p className="italic text-white/80 text-base md:text-xl">
                  &ldquo;During this journey, I realized many businesses want to
                  grow but struggle because they don&apos;t have the right data,
                  prospects, or strategy. That&apos;s when I decided to build
                  something better.&rdquo;
                </p>
              </motion.blockquote>
              <p className="text-xl md:text-2xl font-bold">
                <span className="gradient-text-enhanced">
                  That decision became Remarketix.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-spacing bg-white/[0.02]">
        <div className="container-custom px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="heading-xl text-white mb-3 md:mb-4">
              Meet the Team
            </h2>
            <p className="text-body-lg text-white/70">
              Talented individuals driving innovation and excellence
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mt-5 md:mt-6" />
          </div>

          {/* Mobile: swipe */}
          <div className="md:hidden relative">
            <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">
              Swipe to meet the team →
            </p>
            <div className="relative">
              <button
                onClick={() => scrollTeam(-1)}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div
                ref={teamScrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                } as React.CSSProperties}
              >
                {team.map((member, i) => (
                  <motion.div
                    key={member.name}
                    className="flex-shrink-0 snap-start"
                    style={{ width: "min(72vw, 240px)" }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                  >
                    <div className="team-card text-center p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div className="relative z-10">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={112}
                          height={112}
                          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/10 mb-4"
                          unoptimized
                        />
                        <h3 className="text-lg font-bold text-white mb-1">
                          {member.name}
                        </h3>
                        <p
                          className={`text-${member.color}-400 font-semibold text-xs uppercase tracking-wider mb-3`}
                        >
                          {member.role}
                        </p>
                        <div
                          className={`w-12 h-1 bg-gradient-to-r from-${member.color}-400 to-${member.color}-600 mx-auto rounded-full mb-3`}
                        />
                        <p className="text-body-sm leading-relaxed text-sm">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scrollTeam(1)}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
                className="group"
              >
                <motion.div
                  className="team-card p-6 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className={`absolute -inset-1 bg-gradient-to-br from-${member.color}-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white/10 group-hover:border-emerald-500/50 mb-6 transition-all duration-300"
                        unoptimized
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p
                      className={`text-${member.color}-400 font-semibold text-sm uppercase tracking-wider mb-4`}
                    >
                      {member.role}
                    </p>
                    <div
                      className={`w-16 h-1 bg-gradient-to-r from-${member.color}-400 to-${member.color}-600 mx-auto rounded-full mb-4`}
                    />
                    <p className="text-body-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
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
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 fill-emerald-400" />
            </motion.div>
            <h2 className="heading-xl mb-5 md:mb-6">
              <span className="text-white">One partner.</span>
              <span className="block gradient-text-enhanced mt-2">
                Endless growth.
              </span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80">
              The complete growth system behind modern B2B brands.
            </p>
            <motion.button
              onClick={() => setView("contact")}
              className="btn-primary-premium group w-full sm:w-auto"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Growing Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}