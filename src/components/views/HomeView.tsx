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
  Users,
  Database,
  Mail,
  Globe,
  Quote,
  Building2,
} from "lucide-react";
import Image from "next/image";
import { useRef, useMemo, useState, useEffect } from "react";

// ─── Animation Presets ────────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// ─── Swipe Carousel ────────────────────────────────────────────────────────────
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
    </div>
  );
}

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedNumber({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomeView() {
  const setView = useAppStore((s) => s.setView);
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  // ── Data ───────────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => [
      {
        value: "100+",
        label: "Clients Supported",
        icon: Users,
        color: "emerald",
      },
      {
        value: "500K+",
        label: "Data Records Delivered",
        icon: Database,
        color: "cyan",
      },
      {
        value: "50K+",
        label: "Leads Generated",
        icon: Target,
        color: "violet",
      },
      {
        value: "200+",
        label: "Campaigns Executed",
        icon: Megaphone,
        color: "amber",
      },
    ],
    []
  );

  const whatWeDo = useMemo(
    () => [
      {
        icon: Search,
        gradient: "from-emerald-500 to-teal-400",
        color: "emerald",
        title: "Data & Lead Generation",
        desc: "Build targeted databases and identify the right decision-makers for your business with 98.5% accuracy.",
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      },
      {
        icon: Mail,
        gradient: "from-blue-500 to-cyan-400",
        color: "blue",
        title: "Outreach & Engagement",
        desc: "Transform data into real conversations through strategic LinkedIn and email outreach campaigns.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      },
      {
        icon: Palette,
        gradient: "from-violet-500 to-fuchsia-400",
        color: "violet",
        title: "Content & Brand Growth",
        desc: "Build authority and generate consistent inbound leads through strategic content that positions you as the go-to expert.",
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
      },
      {
        icon: Globe,
        gradient: "from-orange-500 to-amber-400",
        color: "orange",
        title: "Digital & Product Solutions",
        desc: "Create high-performance websites and conversion-focused campaigns that turn visitors into revenue.",
        image:
          "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
      },
    ],
    []
  );

  const industries = useMemo(
    () => [
      { label: "SaaS & Tech", emoji: "</>" },
      { label: "Hospitality", emoji: "🏨" },
      { label: "Finance", emoji: "$" },
      { label: "Real Estate", emoji: "🏡" },
      { label: "Medical", emoji: "🏥" },
      { label: "Manufacturing", emoji: "🏭" },
      { label: "Retail", emoji: "SHOP" },
      { label: "Green Energy", emoji: "🌿" },
      { label: "Beauty", emoji: "💄" },
      { label: "Services", emoji: "🛠️" },
      { label: "Events", emoji: "EVENT" },
      { label: "& More", emoji: "🚀" },
    ],
    []
  );

  const process = useMemo(
    () => [
      {
        step: "01",
        title: "Understand",
        desc: "Deep-dive into your business, goals, and ideal customer profile",
      },
      {
        step: "02",
        title: "Strategize",
        desc: "Define target audience, messaging, and execution roadmap",
      },
      {
        step: "03",
        title: "Build",
        desc: "Create your data foundation and content infrastructure",
      },
      {
        step: "04",
        title: "Execute",
        desc: "Launch outreach campaigns and digital assets with precision",
      },
      {
        step: "05",
        title: "Optimize",
        desc: "Measure, iterate, and scale what drives the best results",
      },
    ],
    []
  );

  const whyUs = useMemo(
    () => [
      {
        icon: Target,
        color: "emerald",
        title: "100% ICP Targeting",
        description:
          "Reach verified decision-makers with zero wasted spend and zero random traffic.",
      },
      {
        icon: Zap,
        color: "cyan",
        title: "48h Execution",
        description:
          "Launch websites, campaigns, and lead batches in as fast as 48 hours.",
      },
      {
        icon: TrendingUp,
        color: "violet",
        title: "Revenue-First Focus",
        description:
          "Every strategy is built for one outcome: more pipeline, more growth.",
      },
      {
        icon: LayoutTemplate,
        color: "blue",
        title: "Convert-First Design",
        description:
          "High-performance websites and UX that turn visitors into booked meetings.",
      },
      {
        icon: Megaphone,
        color: "amber",
        title: "3× Engagement",
        description:
          "Creative campaigns and messaging that boost brand awareness across all channels.",
      },
      {
        icon: Shield,
        color: "rose",
        title: "Data Security",
        description:
          "Enterprise-grade security and full GDPR compliance for all your data.",
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: Database,
        color: "emerald",
        gradient: "from-emerald-500 to-teal-500",
        title: "Lead Generation Systems",
        desc: "Build a consistent, predictable pipeline with ICP-targeted data and deep research.",
      },
      {
        icon: Mail,
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
        title: "Outreach Campaigns",
        desc: "Run LinkedIn and email campaigns engineered to generate real responses from real buyers.",
      },
      {
        icon: Sparkles,
        color: "violet",
        gradient: "from-violet-500 to-fuchsia-500",
        title: "Content & Personal Branding",
        desc: "Position your brand as the authority and attract inbound opportunities at scale.",
      },
      {
        icon: Globe,
        color: "amber",
        gradient: "from-orange-500 to-amber-500",
        title: "Website & Digital Solutions",
        desc: "Create conversion-focused digital assets that look world-class and perform even better.",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          "Remarketix helped us build a consistent lead generation pipeline through accurate data and structured outreach. We saw a strong increase in qualified conversations and our sales team finally had a reliable source of warm leads.",
        company: "Event Management Company",
        result: "3× qualified leads",
      },
      {
        quote:
          "Their content and outreach system completely transformed our brand positioning. We went from chasing cold prospects to receiving inbound inquiries from the exact clients we wanted to work with.",
        company: "Marketing Agency",
        result: "40% higher response rate",
      },
    ],
    []
  );

  const clients = useMemo(
    () => [
      {
        name: "Global Expansion",
        url: "globalexpansion.com",
        abbr: "GX",
        abbrBg: "#ff6b3d",
        abbrColor: "#fff",
        logoStyle: "pill",
      },
      {
        name: "Dromominds",
        url: "dromominds.in",
        abbr: "D",
        abbrBg: "#fff",
        abbrColor: "#e53935",
        logoStyle: "letter",
        subText: "DROMO\nMINDS",
      },
      {
        name: "The Collab Hub",
        url: "thecollabhub.co",
        abbr: "◆",
        abbrBg: "#1a1a2e",
        abbrColor: "#00d4aa",
        logoStyle: "diamond",
      },
      {
        name: "DigiSynqe",
        url: "digisynqe.com",
        abbr: null,
        abbrBg: "transparent",
        abbrColor: "#1565c0",
        logoStyle: "wordmark",
      },
      {
        name: "Bluvise",
        url: "bluvise.com",
        abbr: "B",
        abbrBg: "#1565c0",
        abbrColor: "#fff",
        logoStyle: "letter",
      },
    ],
    []
  );

  const work = useMemo(
    () => [
      {
        tag: "Event Management",
        title: "3× Increase in Qualified Leads",
        desc: "Through targeted lead generation and structured outreach, we helped this event company fill their pipeline with decision-makers who were ready to buy.",
        color: "emerald",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      },
      {
        tag: "Marketing Agency",
        title: "40% Higher Campaign Response Rate",
        desc: "We rebuilt their outreach messaging and sequence strategy, resulting in dramatically better response rates and more discovery calls booked.",
        color: "blue",
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      },
      {
        tag: "Consulting Business",
        title: "Consistent Inbound & Brand Authority",
        desc: "A combined content and outreach strategy positioned the founder as a niche expert, driving inbound leads and improving brand perception measurably.",
        color: "violet",
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      },
      {
        tag: "Real Estate",
        title: "Scalable Lead Generation System",
        desc: "Built a targeted database for agents that resulted in consistent high-value listings and reduced cost-per-acquisition.",
        color: "amber",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      },
    ],
    []
  );

  return (
    <div className="relative min-h-screen">
      {/* ══════════════════════════════════════════════════════════════════════
          HERO - ✅ FIXED: Reduced top padding
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24"
        style={{ transform: "translateZ(0)" }}
      >
        {/* BG */}
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

        {/* Content */}
        <div className="relative z-10 container-custom pt-4 md:pt-8 pb-16 px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center text-center max-w-6xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="heading-display mb-6 md:mb-8 text-4xl md:text-6xl lg:text-7xl relative"
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
                className="block mt-2 md:mt-4 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <span
                  style={{
                    background:
                      "linear-gradient(135deg,#10b981 0%,#06b6d4 20%,#3b82f6 40%,#8b5cf6 60%,#ec4899 80%,#10b981 100%)",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animationName: !shouldReduceMotion
                      ? "gradient-shift"
                      : "none",
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

            <motion.div
              variants={fadeInUp}
              className="relative mb-8 md:mb-10 flex justify-center"
            >
              <div className="badge-glow relative text-sm md:text-base">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span className="font-semibold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  The #1 Data-Driven Growth Partner
                </span>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-xl lg:text-2xl max-w-3xl mb-6 md:mb-8 text-white/80 leading-relaxed px-4"
            >
              We help businesses scale through{" "}
              <span className="text-emerald-400 font-semibold">
                lead generation
              </span>
              ,{" "}
              <span className="text-cyan-400 font-semibold">accurate data</span>
              ,{" "}
              <span className="text-blue-400 font-semibold">
                structured outreach
              </span>
              , content creation and{" "}
              <span className="text-violet-400 font-semibold">
                performance-driven digital solutions
              </span>
              .
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-sm md:text-base text-white/50 mb-10 md:mb-12 italic"
            >
              Trusted by growing teams across SaaS, Events, Agencies and
              Consulting industries.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-14 md:mb-16 w-full sm:w-auto px-4"
            >
              <motion.button
                onClick={() => setView("contact")}
                className="btn-primary-premium group relative overflow-hidden w-full sm:w-auto"
                whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get a Quote{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                onClick={() => setView("contact")}
                className="btn-secondary-premium group w-full sm:w-auto"
                whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Book a Strategy Call</span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 mb-16 md:mb-20 px-4"
            >
              {[
                { icon: Award, text: "Top Rated 2024" },
                { icon: Star, text: "5.0 Reviews" },
                { icon: Rocket, text: "48h Delivery" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                >
                  <b.icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs md:text-sm font-medium text-white/70">
                    {b.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="w-full max-w-5xl px-4">
              {isMobile ? (
                <SwipeCarousel>
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="stat-card-premium mx-auto max-w-sm text-center"
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
                      className="stat-card-premium group"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ y: -5 }}
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
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHAT WE DO
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-2 md:pt-4 relative overflow-hidden">
        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
          >
            <div className="badge mx-auto mb-3 md:mb-4 w-fit">
              <Zap className="w-4 h-4" />
              What We Do
            </div>
            <h2 className="heading-xl mb-3 md:mb-4 text-4xl md:text-5xl lg:text-6xl">
              <span className="text-white">End-to-End</span>
              <span className="gradient-text-enhanced block mt-2 whitespace-nowrap">
                Growth Solutions
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              We provide complete growth solutions combining data, outreach,
              content and digital execution to help businesses build consistent
              pipelines and scale efficiently.
            </p>
          </motion.div>

          {isMobile ? (
            <SwipeCarousel>
              {whatWeDo.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative h-[380px] rounded-2xl overflow-hidden cursor-pointer bg-[#0a0f1a]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      loading="lazy"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      placeholder="blur"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-xl`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => setView("services")}
                  >
                    <ArrowRight className="w-5 h-5 text-emerald-400" />
                  </div>
                </motion.div>
              ))}
            </SwipeCarousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
              {whatWeDo.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative h-[420px] md:h-[500px]"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <motion.div
                    className="relative h-full rounded-[2rem] overflow-hidden cursor-pointer bg-[#0a0f1a] border border-white/5"
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setView("services")}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1200px) 50vw, 25vw"
                        loading="lazy"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                        placeholder="blur"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-2xl`}
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.7 }}
                      >
                        <item.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-white/75 text-sm leading-relaxed border-t border-white/10 pt-4">
                        {item.desc}
                      </p>
                      <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <ArrowRight className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INDUSTRIES WE SERVE
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-2 md:pt-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(59,130,246,0.03) 50%,transparent 100%)",
            }}
          />
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px]"
              style={{
                background:
                  "radial-gradient(ellipse at center,rgba(99,102,241,0.07),transparent 70%)",
                filter: "blur(60px)",
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
            className="text-center max-w-3xl mx-auto mb-8 md:mb-12"
          >
            <div className="badge mx-auto mb-3 md:mb-4 w-fit">
              <Building2 className="w-4 h-4" />
              Industries We Serve
            </div>
            <h2 className="heading-xl mb-2 text-3xl md:text-5xl lg:text-6xl leading-tight">
              <span className="text-white">Built for</span>
              <span className="gradient-text-enhanced block mt-2">
                Every Industry
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              We work with businesses across multiple industries, helping them
              build targeted pipelines and scalable growth systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <motion.div
                  className="relative flex flex-col items-center gap-2 md:gap-3 p-2 md:p-4 rounded-xl md:rounded-2xl cursor-default transition-all duration-300 bg-transparent border-0 hover:bg-white/5"
                  whileHover={!isMobile ? { y: -4, scale: 1.04 } : {}}
                  transition={{ duration: 0.22 }}
                >
                  <div className="flex items-center justify-center text-2xl md:text-3xl">
                    {ind.emoji}
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-white/80 group-hover:text-white transition-colors text-center leading-tight">
                    {ind.label}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WHY CHOOSE US
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-2 md:pt-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(16,185,129,0.025) 50%,transparent 100%)",
            }}
          />
          {!isMobile && (
            <>
              <div
                className="absolute w-72 h-72 rounded-full top-[15%] left-[5%]"
                style={{
                  background:
                    "radial-gradient(circle,rgba(16,185,129,0.07),transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div
                className="absolute w-72 h-72 rounded-full top-[60%] right-[8%]"
                style={{
                  background:
                    "radial-gradient(circle,rgba(59,130,246,0.07),transparent 70%)",
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
            className="text-center max-w-4xl mx-auto mb-8 md:mb-12"
          >
            <div className="badge mx-auto mb-3 md:mb-4 w-fit">
              <Shield className="w-4 h-4" />
              Why Remarketix?
            </div>
            <h2 className="heading-xl mb-3 text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Why Businesses Choose</span>
              <span className="gradient-text-enhanced block mt-2">
                Remarketix
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
            {whyUs.map((adv, i) => (
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
                  whileHover={!isMobile ? { y: -6 } : {}}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    className={`absolute -inset-px bg-gradient-to-br from-${adv.color}-500/15 to-transparent rounded-[1.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className={`icon-container-premium bg-${adv.color}-500/10 border-${adv.color}-500/20 mb-6 md:mb-8`}
                      whileHover={!isMobile ? { rotate: 360, scale: 1.15 } : {}}
                      transition={{ duration: 0.7 }}
                    >
                      <adv.icon
                        className={`w-7 h-7 md:w-8 md:h-8 text-${adv.color}-400`}
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
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR IMPACT
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing pt-2 md:pt-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px]"
              style={{
                background:
                  "radial-gradient(ellipse at center,rgba(16,185,129,0.1),transparent 70%)",
                filter: "blur(80px)",
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
            className="text-center mb-8 md:mb-12"
          >
            <div className="badge mx-auto mb-3 md:mb-4 w-fit">
              <TrendingUp className="w-4 h-4" />
              Our Impact
            </div>
            <h2 className="heading-xl text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Numbers That</span>
              <span className="gradient-text-enhanced block mt-2">
                Speak for Themselves
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              {
                value: 100,
                suffix: "+",
                label: "Clients Supported",
                color: "emerald",
              },
              {
                value: 500,
                suffix: "K+",
                label: "Data Records Delivered",
                color: "cyan",
              },
              {
                value: 50,
                suffix: "K+",
                label: "Leads Generated",
                color: "blue",
              },
              {
                value: 200,
                suffix: "+",
                label: "Campaigns Executed",
                color: "violet",
              },
              {
                value: 20,
                suffix: "+",
                label: "Brands Scaled",
                color: "amber",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="stat-card-premium text-center relative overflow-hidden"
                  whileHover={!isMobile ? { y: -8, scale: 1.04 } : {}}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-${item.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`text-3xl md:text-4xl lg:text-5xl font-bold text-${item.color}-400 mb-2 md:mb-3`}
                    >
                      <AnimatedNumber value={item.value} suffix={item.suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-white/60 font-medium">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW WE WORK
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(59,130,246,0.025) 50%,transparent 100%)",
            }}
          />
        </div>
        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-20"
          >
            <div className="badge mx-auto mb-4 md:mb-6 w-fit">
              <Zap className="w-4 h-4" />
              Our Process
            </div>
            <h2 className="heading-xl text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">How We Work</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 mt-4 leading-relaxed">
              A proven five-step system designed to deliver results from week
              one.
            </p>
          </motion.div>

          <div className="hidden md:flex items-start gap-0 relative">
            <div className="absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-violet-500/30" />
            {process.map((step, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center text-center px-4 relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border-2 border-emerald-500/40 flex items-center justify-center mb-6 relative z-10"
                  whileHover={{
                    scale: 1.15,
                    borderColor: "rgba(16,185,129,0.8)",
                  }}
                >
                  <span className="text-lg font-bold text-emerald-400">
                    {step.step}
                  </span>
                </motion.div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden space-y-4">
            {process.map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-400">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICES SNAPSHOT
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(139,92,246,0.025) 50%,transparent 100%)",
            }}
          />
        </div>
        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center mb-12 md:mb-16"
          >
            <div className="badge mb-4 md:mb-6">
              <Sparkles className="w-4 h-4" />
              Our Solutions
            </div>
            <h2 className="heading-xl text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Solutions Designed</span>
              <span className="gradient-text-enhanced block mt-2">
                for Growth
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={i}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
              >
                <motion.div
                  className="relative p-6 md:p-8 rounded-2xl md:rounded-[1.6rem] bg-white/[0.02] border border-white/[0.07] transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.04] overflow-hidden h-full cursor-pointer"
                  whileHover={!isMobile ? { y: -6 } : {}}
                  transition={{ duration: 0.3 }}
                  onClick={() => setView("services")}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${svc.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <div className="relative z-10 flex items-start gap-5">
                    <motion.div
                      className={`w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center shadow-xl`}
                      whileHover={!isMobile ? { rotate: 10, scale: 1.1 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <svc.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/65 leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <ArrowRight
                      className={`w-5 h-5 text-${svc.color}-400`}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          OUR WORK
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center mb-12 md:mb-16"
          >
            <div className="badge mb-4 md:mb-6">
              <Award className="w-4 h-4" />
              Our Work
            </div>
            <h2 className="heading-xl text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Real Results,</span>
              <span className="gradient-text-enhanced block mt-2">
                Real Businesses
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/70 mt-4">
              A look at how we help businesses generate leads, build systems and
              drive consistent growth.
            </p>
          </motion.div>

          {isMobile ? (
            <SwipeCarousel>
              {work.map((item, i) => (
                <div
                  key={i}
                  className="group relative h-[400px] rounded-2xl overflow-hidden bg-[#0a0f1a] cursor-pointer"
                  onClick={() => setView("casestudies")}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      loading="lazy"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      placeholder="blur"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/95" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30 mb-3 w-fit`}
                    >
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </SwipeCarousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {work.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative h-[420px] md:h-[480px]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <motion.div
                    className="relative h-full rounded-[1.8rem] overflow-hidden bg-[#0a0f1a] border border-white/5 cursor-pointer"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setView("casestudies")}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 1200px) 33vw, 33vw"
                        loading="lazy"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                        placeholder="blur"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-black/95" />
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30 mb-4 w-fit`}
                      >
                        {item.tag}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CLIENT TESTIMONIALS + CLIENTELE
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,transparent 0%,rgba(16,185,129,0.03) 50%,transparent 100%)",
            }}
          />
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px]"
              style={{
                background:
                  "radial-gradient(ellipse at center,rgba(6,182,212,0.07),transparent 70%)",
                filter: "blur(60px)",
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
            className="text-center mb-8 md:mb-12"
          >
            <div className="badge mx-auto mb-4 w-fit">
              <Star className="w-4 h-4" />
              Our Clients
            </div>
            <h2 className="heading-xl mb-3 text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Client</span>
              <span className="gradient-text-enhanced block mt-2">
                Testimonials
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/70">
              Trusted by businesses that demand real results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-center text-sm md:text-base font-bold text-white mb-2">
              Our Clientele
            </p>
            <div className="rounded-2xl overflow-hidden">
              <div className="flex flex-wrap justify-center divide-white/[0.08] bg-white/[0.02]">
                {clients.map((c, i) => (
                  <motion.a
                    key={i}
                    href={`https://${c.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[150px] flex flex-col items-center justify-center px-4 py-6 md:py-8 transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={!isMobile ? { scale: 1.03 } : {}}
                  >
                    <div className="flex items-center justify-center h-12">
                      {c.logoStyle === "pill" && (
                        <div
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                          style={{ background: c.abbrBg }}
                        >
                          <span
                            className="text-lg font-black"
                            style={{ color: c.abbrColor }}
                          >
                            {c.abbr}
                          </span>
                          <div className="flex flex-col leading-none ml-0.5">
                            <span
                              className="text-[8px] font-black tracking-wider"
                              style={{ color: c.abbrColor }}
                            >
                              GLOBAL
                            </span>
                            <span
                              className="text-[8px] font-black tracking-wider"
                              style={{ color: c.abbrColor }}
                            >
                              EXPANSION
                            </span>
                          </div>
                        </div>
                      )}
                      {c.logoStyle === "letter" && c.name === "Dromominds" && (
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full border-2 border-red-500 flex items-center justify-center bg-white">
                            <span className="text-xl font-black text-red-600">
                              D
                            </span>
                          </div>
                          <div className="flex flex-col leading-none">
                            <span className="text-sm font-black tracking-widest text-white/90">
                              DROMO
                            </span>
                            <span className="text-[9px] tracking-[0.3em] text-white/50">
                              MINDS
                            </span>
                          </div>
                        </div>
                      )}
                      {c.logoStyle === "diamond" && (
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 flex items-center justify-center">
                            <svg
                              viewBox="0 0 32 32"
                              width="32"
                              height="32"
                            >
                              <polygon
                                points="16,2 30,16 16,30 2,16"
                                fill="#1a1a2e"
                                stroke="#00d4aa"
                                strokeWidth="2"
                              />
                              <polygon
                                points="16,7 25,16 16,25 7,16"
                                fill="#00d4aa"
                                opacity="0.3"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col leading-none">
                            <span className="text-sm font-bold text-white/90">
                              The CollabHub
                            </span>
                            <span className="text-[9px] tracking-widest text-white/40">
                              SMART DELEGATION
                            </span>
                          </div>
                        </div>
                      )}
                      {c.logoStyle === "wordmark" && (
                        <span
                          className="text-xl md:text-2xl font-black tracking-tight"
                          style={{ color: c.abbrColor }}
                        >
                          <span style={{ color: "#1565c0" }}>Digi</span>{" "}
                          <span style={{ color: "#00acc1" }}>Synqe</span>
                        </span>
                      )}
                      {c.logoStyle === "letter" && c.name === "Bluvise" && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: c.abbrBg }}
                          >
                            <span className="text-xl font-black text-white">
                              B
                            </span>
                          </div>
                          <span className="text-xl font-black text-white/90">
                            luvise
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {isMobile ? (
            <SwipeCarousel>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                >
                  <Quote className="w-8 h-8 text-emerald-400/50 mb-4" />
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm font-semibold text-white/70">
                      {t.company}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {t.result}
                    </span>
                  </div>
                </div>
              ))}
            </SwipeCarousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <motion.div
                    className="p-6 md:p-8 rounded-2xl md:rounded-[1.8rem] bg-white/[0.03] border border-white/[0.07] transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.05] h-full flex flex-col"
                    style={{ willChange: "transform" }} whileHover={{ y: -5 }}
                  >
                    <Quote className="w-10 h-10 text-emerald-400/40 mb-6" />
                    <p className="text-white/80 text-base md:text-lg leading-relaxed italic flex-1 mb-6">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                      <p className="text-sm font-bold text-white/80">
                        {t.company}
                      </p>
                      <span className="text-xs md:text-sm font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                        {t.result}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {!isMobile && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px]"
              style={{
                background:
                  "radial-gradient(ellipse at center,rgba(16,185,129,0.13),rgba(6,182,212,0.09) 30%,rgba(59,130,246,0.06) 60%,transparent 80%)",
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
            className="relative max-w-3xl mx-auto"
          >
            <div className="card-glass-premium text-center p-5 md:p-8 relative overflow-hidden">
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
                  <span className="text-white">Ready to Build a</span>
                  <span
                    className="block mt-2 md:mt-3"
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
                    Consistent Growth System?
                  </span>
                </motion.h2>

                <motion.p
                  className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed text-white/80"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Whether you need{" "}
                  <span className="text-emerald-400 font-semibold">
                    lead generation
                  </span>
                  ,{" "}
                  <span className="text-cyan-400 font-semibold">outreach</span>
                  ,{" "}
                  <span className="text-blue-400 font-semibold">content</span>,
                  or{" "}
                  <span className="text-violet-400 font-semibold">
                    digital support
                  </span>{" "}
                  — we can help you execute, scale and grow consistently.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative">
                    <motion.button
                      onClick={() => setView("contact")}
                      className="btn-cta-premium group relative z-10 w-full sm:w-auto"
                      whileHover={!isMobile ? { scale: 1.05, y: -4 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg font-bold">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                        Get a Quote
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
                  </div>
                  <motion.button
                    onClick={() => setView("contact")}
                    className="btn-secondary-premium group w-full sm:w-auto"
                    whileHover={!isMobile ? { scale: 1.05, y: -2 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    Talk to Our Team
                  </motion.button>
                </motion.div>

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
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