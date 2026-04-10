"use client";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useAppStore } from "@/store/appStore";
import {
  ArrowRight,
  Check,
  TrendingUp,
  Target,
  Palette,
  Search,
  LayoutTemplate,
  Megaphone,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Star,
  Rocket,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRef, useMemo, useState, useEffect } from "react";

// ─── animation presets ────────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Static particle positions — no Math.random() on each render
const PARTICLE_POSITIONS = [
  { left: 15.2, top: 23.4, color: 0 },
  { left: 78.3, top: 67.1, color: 1 },
  { left: 42.7, top: 89.3, color: 2 },
  { left: 91.5, top: 12.8, color: 0 },
  { left: 23.8, top: 45.6, color: 1 },
  { left: 67.2, top: 78.9, color: 2 },
  { left: 34.9, top: 34.2, color: 0 },
  { left: 56.4, top: 91.7, color: 1 },
  { left: 12.1, top: 56.3, color: 2 },
  { left: 88.6, top: 41.8, color: 0 },
];

const particleColors = [
  { bg: "rgba(16,185,129,0.4)", shadow: "0 0 10px rgba(16,185,129,0.6)" },
  { bg: "rgba(59,130,246,0.4)", shadow: "0 0 10px rgba(59,130,246,0.6)" },
  { bg: "rgba(139,92,246,0.4)", shadow: "0 0 10px rgba(139,92,246,0.6)" },
];

// ─── Lightweight CSS-based swipe carousel ─────────────────────────────────────
function SwipeCarousel({
  children,
  className = "",
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const total = children.length;
  const startX = useRef(0);

  const prev = () => setIdx((i) => (i > 0 ? i - 1 : total - 1));
  const next = () => setIdx((i) => (i < total - 1 ? i + 1 : 0));

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = startX.current - e.changedTouches[0].clientX;
    if (dx > 50) next();
    else if (dx < -50) prev();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="overflow-hidden touch-pan-x"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="min-w-full px-2"
              style={{ flex: "0 0 100%" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
              i === idx ? "bg-emerald-400 w-8" : "bg-white/30 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows (Optional for mobile, usually hidden but kept for accessibility) */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 border border-white/10 rounded-full flex items-center justify-center touch-manipulation md:hidden"
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 border border-white/10 rounded-full flex items-center justify-center touch-manipulation md:hidden"
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}

// ─── Capability Card Component ────────────────────────────────────────────────
interface CapabilityCardProps {
  cap: any;
  index: number;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}

function CapabilityCard({
  cap,
  index,
  isMobile,
  shouldReduceMotion,
}: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative h-[400px] md:h-[550px]"
    >
      <motion.div
        className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer bg-[#0a0f1a]"
        whileHover={!isMobile ? { y: -12 } : {}}
        transition={{ duration: 0.35 }}
      >
        {/* Background image — Optimized with fill and sizes */}
        <div className="absolute inset-0 aspect-video md:aspect-auto">
          <Image
            src={cap.image}
            alt={cap.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${cap.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          <motion.div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center mb-6 md:mb-8 shadow-2xl`}
            whileHover={!isMobile ? { rotate: 360, scale: 1.15 } : {}}
            transition={{ duration: 0.7 }}
          >
            <cap.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </motion.div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
            {cap.title}
          </h3>

          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            {cap.items.map((item: string) => (
              <div key={item} className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full bg-${cap.accent}-400 flex-shrink-0`}
                />
                <span className="text-sm md:text-base text-white/90 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 hidden md:block">
            {cap.description}
          </p>
          
          {/* Mobile Description (Always Visible) */}
          <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4 md:hidden">
            {cap.description}
          </p>

          <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className={`w-5 h-5 text-${cap.accent}-400`} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HomeView() {
  const setView = useAppStore((s) => s.setView);
  const heroRef = useRef(null);
  const standardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // State for mobile detection to disable heavy animations
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  // once: true prevents re-triggering on scroll-back
  const isStandardInView = useInView(standardRef, {
    once: true,
    margin: "-80px",
  });

  const stats = useMemo(
    () => [
      {
        value: "98.5%",
        label: "Lead Accuracy",
        icon: Check,
        color: "emerald",
      },
      {
        value: "+240%",
        label: "Pipeline Growth",
        icon: TrendingUp,
        color: "cyan",
      },
      { value: "48h", label: "Turnaround", icon: Clock, color: "violet" },
      { value: "500+", label: "Projects", icon: Sparkles, color: "amber" },
    ],
    []
  );

  const capabilities = useMemo(
    () => [
      {
        icon: Search,
        gradient: "from-emerald-500 via-emerald-400 to-teal-400",
        title: "Data & Research",
        items: [
          "Lead Generation",
          "Data Research",
          "Email Marketing",
          "Data Enrichment",
        ],
        description:
          "Precision prospecting powered by deep research and real-time verification.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        accent: "emerald",
      },
      {
        icon: Palette,
        gradient: "from-blue-500 via-blue-400 to-cyan-400",
        title: "Content & SEO",
        items: ["Content Marketing", "SEO Optimization", "Social Media"],
        description:
          "Build authority with strategic content and search-optimized strategies.",
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
        accent: "blue",
      },
      {
        icon: LayoutTemplate,
        gradient: "from-violet-500 via-purple-400 to-fuchsia-400",
        title: "Web & Design",
        items: ["Web Development", "UI/UX Design", "Brand Identity"],
        description:
          "High-performance websites and intuitive design that converts.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        accent: "violet",
      },
      {
        icon: Megaphone,
        gradient: "from-orange-500 via-amber-400 to-yellow-400",
        title: "Advertising",
        items: ["Product Ads", "CGI Visuals", "Campaign Strategy"],
        description:
          "High-impact campaigns designed to boost visibility and drive sales.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        accent: "orange",
      },
    ],
    []
  );

  const advantages = useMemo(
    () => [
      {
        icon: Target,
        color: "emerald",
        title: "100% ICP Targeting",
        description:
          "Reach real buyers with verified data — zero wasted spend, zero random traffic.",
      },
      {
        icon: LayoutTemplate,
        color: "blue",
        title: "Convert-First Design",
        description:
          "High-performance websites and UX that turn visitors into meetings.",
      },
      {
        icon: Megaphone,
        color: "violet",
        title: "3× Engagement",
        description:
          "Creative campaigns and messaging that boost awareness across all channels.",
      },
      {
        icon: Zap,
        color: "amber",
        title: "48h Execution",
        description:
          "Launch websites, campaigns, and lead batches in as fast as 48 hours.",
      },
      {
        icon: TrendingUp,
        color: "cyan",
        title: "Revenue Focus",
        description:
          "Every strategy built for one outcome: more pipeline, more growth.",
      },
      {
        icon: Shield,
        color: "rose",
        title: "Data Security",
        description:
          "Enterprise-grade security and GDPR compliance for all your data.",
      },
    ],
    []
  );

  const trustBadges = useMemo(
    () => [
      { icon: Award, text: "Top Rated 2024" },
      { icon: Star, text: "5.0 Reviews" },
      { icon: Rocket, text: "Fast Delivery" },
    ],
    []
  );

  return (
    <div className="flex flex-col">
      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background — PERF: static divs, zero JS animation cost */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px]"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16,185,129,0.18), rgba(6,182,212,0.13) 40%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
          {!isMobile && (
            <div
              className="absolute bottom-0 right-0 w-[900px] h-[900px]"
              style={{
                background:
                  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.13), rgba(139,92,246,0.08) 40%, transparent 70%)",
                filter: "blur(90px)",
              }}
            />
          )}
          <div className="absolute inset-0 bg-grid-dense opacity-20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(3,7,18,0.35) 55%,rgba(3,7,18,0.8) 100%)",
            }}
          />
        </div>

        {/* Floating particles — desktop only, post-mount */}
        {isClient && !shouldReduceMotion && !isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLE_POSITIONS.map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  background: particleColors[p.color].bg,
                  boxShadow: particleColors[p.color].shadow,
                  willChange: "transform",
                }}
                animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Hero content */}
        <div className="relative z-10 container-custom pt-24 md:pt-32 pb-16 md:pb-20 px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center text-center max-w-6xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="relative mb-8 md:mb-10">
              <div className="badge-glow relative text-sm md:text-base">
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="font-semibold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  The #1 Data-Driven Growth Partner
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="heading-display mb-8 md:mb-10 relative text-4xl md:text-6xl lg:text-7xl"
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Turn Data
              </motion.span>
              <motion.span
                className="block mt-2 md:mt-3 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <span
                  className="gradient-text-hero-ultra relative inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg,#10b981 0%,#06b6d4 20%,#3b82f6 40%,#8b5cf6 60%,#ec4899 80%,#10b981 100%)",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animationName: !shouldReduceMotion ? "gradient-shift" : "none",
                    animationDuration: "8s",
                    animationTimingFunction: "ease",
                    animationIterationCount: "infinite",
                  }}
                >
                  Into Growth.
                </span>
                <div
                  className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-1 md:h-1.5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg,#10b981,#06b6d4,#3b82f6,#8b5cf6)",
                  }}
                />
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg lg:text-xl max-w-3xl mb-10 md:mb-14 text-white/80 leading-relaxed px-4"
            >
              Stop wasting money on random tactics. We help you scale with{" "}
              <span className="text-emerald-400 font-semibold">
                verified data
              </span>
              ,{" "}
              <span className="text-cyan-400 font-semibold">
                powerful websites
              </span>
              , and{" "}
              <span className="text-blue-400 font-semibold">
                impactful advertising
              </span>{" "}
              — engineered for explosive growth.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-12 md:mb-16 w-full sm:w-auto px-4"
            >
              <motion.button
                onClick={() => setView("services")}
                className="btn-primary-premium group relative overflow-hidden w-full sm:w-auto"
                whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                onClick={() => setView("contact")}
                className="btn-secondary-premium group w-full sm:w-auto"
                whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Book Free Call</span>
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-16 md:mb-20 px-4"
            >
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                >
                  <badge.icon className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                  <span className="text-xs md:text-sm font-medium text-white/70">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats — swipe on mobile, grid on desktop */}
            <motion.div
              variants={fadeInUp}
              className="w-full max-w-5xl px-4"
            >
              {isMobile ? (
                <SwipeCarousel>
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="stat-card-premium mx-auto max-w-sm"
                    >
                      <div
                        className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}
                      >
                        <stat.icon
                          className={`w-6 h-6 text-${stat.color}-400`}
                        />
                      </div>
                      <div className="stat-value mb-2">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </SwipeCarousel>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="stat-card-premium group relative overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ y: -8, scale: 1.05 }}
                    >
                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}
                        >
                          <stat.icon
                            className={`w-6 h-6 text-${stat.color}-400`}
                          />
                        </div>
                        <motion.div
                          className="stat-value mb-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 1 + i * 0.1,
                            type: "spring",
                          }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only */}
        {isClient && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">
                Scroll
              </span>
              <div className="relative w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
                <motion.div
                  className="w-1.5 h-3 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* ================================================================
          STANDARD SECTION
          ================================================================ */}
      <section ref={standardRef} className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(16,185,129,0.025) 50%,transparent 100%)",
            }}
          />
          {!isMobile && (
            <div
              className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
                filter: "blur(80px)",
              }}
            />
          )}
        </div>

        <div className="container-custom relative z-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">
            {/* Left — content */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="badge mb-6 md:mb-8"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
              >
                <Zap className="w-4 h-4" />
                The Remarketix Standard
              </motion.div>

              <h2 className="heading-xl mb-6 md:mb-8 text-3xl md:text-5xl lg:text-6xl">
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStandardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  Not just data.
                </motion.span>
                <motion.span
                  className="block mt-2 md:mt-3 relative inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isStandardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <span className="gradient-text-enhanced">
                    Strategic Growth.
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    animate={isStandardInView ? { width: "100%" } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </motion.span>
              </h2>

              <motion.p
                className="text-base md:text-lg lg:text-xl mb-10 md:mb-14 leading-relaxed text-white/75"
                initial={{ opacity: 0 }}
                animate={isStandardInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                We go beyond lead lists. We build{" "}
                <span className="text-emerald-400 font-semibold">
                  data-driven acquisition systems
                </span>
                ,{" "}
                <span className="text-cyan-400 font-semibold">
                  high-performing websites
                </span>
                , and{" "}
                <span className="text-blue-400 font-semibold">
                  impactful campaigns
                </span>{" "}
                designed to boost visibility, engagement, and revenue.
              </motion.p>

              {/* Value props */}
              <div className="grid gap-6 md:gap-8">
                {[
                  {
                    icon: Target,
                    color: "emerald",
                    title: "Precision",
                    desc: "ICP-based targeting that reaches real decision-makers",
                  },
                  {
                    icon: Palette,
                    color: "blue",
                    title: "Creativity",
                    desc: "Modern design and compelling creatives that convert",
                  },
                  {
                    icon: TrendingUp,
                    color: "violet",
                    title: "Conversion",
                    desc: "Sales-focused funnels that turn traffic into revenue",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="group relative"
                    initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
                    animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 }}
                  >
                    <div className="relative flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-colors duration-300 group-hover:border-white/10 group-hover:bg-white/[0.04]">
                      <motion.div
                        className={`w-12 h-12 md:w-16 md:h-16 bg-${item.color}-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-${item.color}-500/20`}
                        whileHover={
                          !isMobile ? { rotate: 360, scale: 1.1 } : {}
                        }
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon
                          className={`w-6 h-6 md:w-8 md:h-8 text-${item.color}-400`}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm md:text-base text-body-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      {!isMobile && (
                        <div
                          className={`opacity-0 group-hover:opacity-100 transition-opacity text-${item.color}-400 mt-1`}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — image */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-8 lg:mt-0"
            >
              {!isMobile && (
                <div
                  className="absolute -inset-6 rounded-[2rem]"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(16,185,129,0.14),rgba(6,182,212,0.09),rgba(59,130,246,0.1))",
                    filter: "blur(40px)",
                  }}
                />
              )}

              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] md:aspect-auto">
                <motion.div
                  whileHover={!isMobile ? { scale: 1.04 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                    alt="Team collaboration"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                    loading="eager"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 mix-blend-overlay" />

                {/* Badge overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isStandardInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 rounded-xl md:rounded-2xl bg-black/40 border border-white/10">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50"
                      whileHover={
                        !isMobile ? { rotate: 180, scale: 1.1 } : {}
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <Check className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1">
                        Real Connections
                      </p>
                      <p className="text-emerald-400 font-semibold text-sm md:text-lg">
                        Real Results
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating stat cards — desktop only */}
              {!isMobile && (
                <>
                  <motion.div
                    className="absolute -right-6 top-1/4 bg-black/60 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                      98.5%
                    </div>
                    <div className="text-sm text-white/60">Satisfaction</div>
                  </motion.div>
                  <motion.div
                    className="absolute -left-6 bottom-1/3 bg-black/60 border border-cyan-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-cyan-400 mb-1">
                      +240%
                    </div>
                    <div className="text-sm text-white/60">ROI Growth</div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CAPABILITIES
          ================================================================ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.015] to-transparent" />
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
              style={{
                background:
                  "radial-gradient(circle 700px at 50% 50%, rgba(139,92,246,0.04), transparent)",
              }}
            />
          )}
        </div>

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12 mb-12 md:mb-20"
          >
            <div className="max-w-2xl">
              <div className="badge mb-4 md:mb-6">
                <Sparkles className="w-4 h-4" />
                Expertise
              </div>
              <h2 className="heading-xl mb-4 text-3xl md:text-5xl lg:text-6xl">
                <span className="block text-white">Our</span>
                <span className="gradient-text-enhanced block mt-2">
                  Capabilities
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full" />
            </div>
            <motion.p
              className="text-base md:text-lg lg:text-xl max-w-lg text-white/75 lg:text-right"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Data, web, and demand solutions designed for{" "}
              <span className="text-emerald-400 font-semibold">
                high-growth teams
              </span>
              .
            </motion.p>
          </motion.div>

          {isMobile ? (
            <SwipeCarousel>
              {capabilities.map((cap, i) => (
                <CapabilityCard
                  key={cap.title}
                  cap={cap}
                  index={i}
                  isMobile={isMobile}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </SwipeCarousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {capabilities.map((cap, i) => (
                <CapabilityCard
                  key={cap.title}
                  cap={cap}
                  index={i}
                  isMobile={isMobile}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          ADVANTAGES
          ================================================================ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(59,130,246,0.025) 50%,transparent 100%)",
            }}
          />
          {!isMobile && (
            <>
              <div
                className="absolute w-56 h-56 rounded-full top-[20%] left-[10%]"
                style={{
                  background:
                    "radial-gradient(circle,rgba(16,185,129,0.07),transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div
                className="absolute w-56 h-56 rounded-full top-[50%] left-[35%]"
                style={{
                  background:
                    "radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div
                className="absolute w-56 h-56 rounded-full top-[80%] left-[60%]"
                style={{
                  background:
                    "radial-gradient(circle,rgba(139,92,246,0.07),transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
            </>
          )}
        </div>

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto mb-12 md:mb-20"
          >
            <div className="badge mx-auto mb-4 md:mb-6 w-fit">
              <Shield className="w-4 h-4" />
              Why Remarketix?
            </div>
            <h2 className="heading-xl mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Your unfair advantage in</span>
              <span className="gradient-text-enhanced block mt-2 md:mt-3">
                Data, Web &amp; Demand
              </span>
            </h2>
            <motion.div
              className="h-1.5 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
              >
                <motion.div
                  className="feature-card-premium h-full"
                  whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    className={`absolute -inset-px bg-gradient-to-br from-${adv.color}-500/15 to-transparent rounded-[1.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`icon-container-premium bg-${adv.color}-500/10 border-${adv.color}-500/20 mb-6 md:mb-8`}
                      whileHover={
                        !isMobile ? { rotate: 360, scale: 1.15 } : {}
                      }
                      transition={{ duration: 0.7 }}
                    >
                      <adv.icon
                        className={`w-6 h-6 md:w-8 md:h-8 text-${adv.color}-400`}
                      />
                    </motion.div>

                    <h3 className="heading-sm text-white mb-3 md:mb-4 text-lg md:text-xl">
                      {adv.title}
                    </h3>
                    <p className="text-sm md:text-base text-body-sm leading-relaxed">
                      {adv.description}
                    </p>

                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-${adv.color}-500 to-transparent rounded-full`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      style={{ transformOrigin: "left" }}
                    />

                    {!isMobile && (
                      <div
                        className={`absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-${adv.color}-400`}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}

                    <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-white/[0.04]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 md:mt-16"
          >
            <motion.button
              onClick={() => setView("services")}
              className="btn-primary-premium group w-full sm:w-auto"
              whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.98 }}
            >
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          CTA SECTION
          ================================================================ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px]"
              style={{
                background:
                  "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.13),rgba(6,182,212,0.09) 30%,rgba(59,130,246,0.06) 60%,transparent 80%)",
                filter: "blur(80px)",
              }}
            />
          )}
          <div className="absolute inset-0 bg-grid-dense opacity-10" />
        </div>

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="card-glass-premium text-center p-8 md:p-12 lg:p-20 relative overflow-hidden">
              <div
                className="absolute inset-0 rounded-2xl md:rounded-[2rem] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(59,130,246,0.18))",
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-6 md:mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <Rocket className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400 text-sm md:text-base">
                    Limited Spots Available
                  </span>
                </motion.div>

                <motion.h2
                  className="heading-xl mb-6 md:mb-8 text-3xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">Ready for</span>
                  <span className="block mt-2 md:mt-3">
                    <span
                      style={{
                        background:
                          "linear-gradient(135deg,#10b981 0%,#06b6d4 25%,#3b82f6 50%,#8b5cf6 75%,#ec4899 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animationName: !shouldReduceMotion
                          ? "gradient-shift"
                          : "none",
                        animationDuration: "6s",
                        animationTimingFunction: "ease",
                        animationIterationCount: "infinite",
                      }}
                    >
                      Explosive Growth?
                    </span>
                  </span>
                </motion.h2>

                <motion.p
                  className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed text-white/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Get a{" "}
                  <span className="text-emerald-400 font-semibold">
                    free strategy call
                  </span>{" "}
                  and discover how{" "}
                  <span className="text-cyan-400 font-semibold">
                    better data
                  </span>
                  ,{" "}
                  <span className="text-blue-400 font-semibold">
                    better design
                  </span>
                  , and{" "}
                  <span className="text-violet-400 font-semibold">
                    better campaigns
                  </span>{" "}
                  can double your pipeline.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="relative inline-block w-full sm:w-auto"
                >
                  <motion.button
                    onClick={() => setView("contact")}
                    className="btn-cta-premium group relative z-10 w-full sm:w-auto"
                    whileHover={!isMobile ? { scale: 1.05, y: -4 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg font-bold">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                      Book Free Strategy Call
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </motion.button>
                  {!isMobile && !shouldReduceMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-400 pointer-events-none"
                      animate={{
                        scale: [1, 1.2, 1.4],
                        opacity: [0.5, 0.2, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  {[
                    {
                      icon: Check,
                      color: "emerald",
                      text: "No credit card required",
                    },
                    {
                      icon: Shield,
                      color: "cyan",
                      text: "100% Confidential",
                    },
                    {
                      icon: Clock,
                      color: "blue",
                      text: "30-min consultation",
                    },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <b.icon
                        className={`w-4 h-4 md:w-5 md:h-5 text-${b.color}-400`}
                      />
                      <span className="text-white/70 text-sm md:text-base">
                        {b.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}