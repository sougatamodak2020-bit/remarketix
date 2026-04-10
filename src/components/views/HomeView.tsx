"use client";
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion, PanInfo, useMotionValue, useAnimation } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { ArrowRight, Check, TrendingUp, Target, Palette, Search, LayoutTemplate, Megaphone, Sparkles, Zap, Shield, Clock, Star, Rocket, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useMemo, useState, useEffect } from "react";

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Pre-generated stable particle positions (reduced for mobile)
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

// Swipeable Carousel Component
interface SwipeCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

function SwipeCarousel({ children, className = "" }: SwipeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    controls.start({ x: -currentIndex * 100 + "%" });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    controls.start({ x: -index * 100 + "%" });
  };

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ x: 0 }}
          className="flex"
          style={{ x }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className="min-w-full px-4"
              style={{ flex: "0 0 100%" }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-emerald-400 w-8"
                : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      )}
      
      {currentIndex < children.length - 1 && (
        <button
          onClick={() => goToSlide(currentIndex + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
}

export default function HomeView() {
  const setView = useAppStore((s) => s.setView);
  const heroRef = useRef(null);
  const standardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion ?? false;
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect client-side mount and mobile
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isStandardInView = useInView(standardRef, { 
    once: true, 
    margin: "-100px",
    amount: isMobile ? 0.1 : 0.3
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Smooth parallax transforms (reduced for mobile)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "15%" : "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const smoothY = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothOpacity = useSpring(opacity, { stiffness: 50, damping: 20 });

  const stats = useMemo(() => [
    { value: "98.5%", label: "Lead Accuracy", icon: Check, color: "emerald" },
    { value: "+240%", label: "Pipeline Growth", icon: TrendingUp, color: "cyan" },
    { value: "48h", label: "Turnaround", icon: Clock, color: "violet" },
    { value: "500+", label: "Projects", icon: Sparkles, color: "amber" },
  ], []);

  const capabilities = useMemo(() => [
    {
      icon: Search,
      gradient: "from-emerald-500 via-emerald-400 to-teal-400",
      title: "Data & Research",
      items: ["Lead Generation", "Data Research", "Email Marketing", "Data Enrichment"],
      description: "Precision prospecting powered by deep research and real-time verification.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      accent: "emerald"
    },
    {
      icon: Palette,
      gradient: "from-blue-500 via-blue-400 to-cyan-400",
      title: "Content & SEO",
      items: ["Content Marketing", "SEO Optimization", "Social Media"],
      description: "Build authority with strategic content and search-optimized strategies.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      accent: "blue"
    },
    {
      icon: LayoutTemplate,
      gradient: "from-violet-500 via-purple-400 to-fuchsia-400",
      title: "Web & Design",
      items: ["Web Development", "UI/UX Design", "Brand Identity"],
      description: "High-performance websites and intuitive design that converts.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      accent: "violet"
    },
    {
      icon: Megaphone,
      gradient: "from-orange-500 via-amber-400 to-yellow-400",
      title: "Advertising",
      items: ["Product Ads", "CGI Visuals", "Campaign Strategy"],
      description: "High-impact campaigns designed to boost visibility and drive sales.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      accent: "orange"
    },
  ], []);

  const advantages = useMemo(() => [
    { icon: Target, color: "emerald", title: "100% ICP Targeting", description: "Reach real buyers with verified data — zero wasted spend, zero random traffic." },
    { icon: LayoutTemplate, color: "blue", title: "Convert-First Design", description: "High-performance websites and UX that turn visitors into meetings." },
    { icon: Megaphone, color: "violet", title: "3× Engagement", description: "Creative campaigns and messaging that boost awareness across all channels." },
    { icon: Zap, color: "amber", title: "48h Execution", description: "Launch websites, campaigns, and lead batches in as fast as 48 hours." },
    { icon: TrendingUp, color: "cyan", title: "Revenue Focus", description: "Every strategy built for one outcome: more pipeline, more growth." },
    { icon: Shield, color: "rose", title: "Data Security", description: "Enterprise-grade security and GDPR compliance for all your data." },
  ], []);

  const trustBadges = useMemo(() => [
    { icon: Award, text: "Top Rated 2024" },
    { icon: Star, text: "5.0 Reviews" },
    { icon: Rocket, text: "Fast Delivery" },
  ], []);

  // Memoized particle colors
  const particleColors = useMemo(() => [
    { bg: "rgba(16, 185, 129, 0.4)", shadow: "0 0 10px rgba(16, 185, 129, 0.6)" },
    { bg: "rgba(59, 130, 246, 0.4)", shadow: "0 0 10px rgba(59, 130, 246, 0.6)" },
    { bg: "rgba(139, 92, 246, 0.4)", shadow: "0 0 10px rgba(139, 92, 246, 0.6)" },
  ], []);

  return (
    <div className="bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Optimized Background Layers */}
        <div className="absolute inset-0 pointer-events-none will-change-transform">
          {/* Primary Gradient Orbs - Reduced blur on mobile */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] md:w-[1400px] md:h-[800px]"
            style={{
              background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15) 40%, transparent 70%)",
              filter: isMobile ? "blur(40px)" : "blur(80px)",
              transform: "translateZ(0)",
              willChange: "transform, opacity"
            }}
            animate={!shouldReduceMotion ? {
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Secondary Accent Orbs - Hidden on mobile for performance */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-0 right-0 w-[1000px] h-[1000px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
                filter: "blur(100px)",
                transform: "translateZ(0)",
                willChange: "transform, opacity"
              }}
              animate={!shouldReduceMotion ? {
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
              } : {}}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          )}

          {/* Animated Blobs - Desktop only */}
          {isClient && !shouldReduceMotion && !isMobile && (
            <>
              <motion.div
                className="blob-emerald w-[600px] h-[600px] top-[5%] left-[10%]"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="blob-blue w-[500px] h-[500px] bottom-[15%] right-[5%]"
                animate={{
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />

              <motion.div
                className="blob-purple w-[400px] h-[400px] top-[45%] right-[25%]"
                animate={{
                  x: [0, 60, 0],
                  y: [0, -80, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
              />
            </>
          )}

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-dense opacity-20" />

          {/* Gradient Mesh Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(3, 7, 18, 0.4) 50%, rgba(3, 7, 18, 0.8) 100%)"
            }}
          />

          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.015]" />

          {/* Spotlight Effect - Desktop only */}
          {isClient && !shouldReduceMotion && !isMobile && (
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px]"
              style={{
                background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255, 255, 255, 0.03), transparent 60%)",
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>

        {/* Floating Particles - Desktop only */}
        {isClient && !shouldReduceMotion && !isMobile && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLE_POSITIONS.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  background: particleColors[particle.color].bg,
                  boxShadow: particleColors[particle.color].shadow,
                  willChange: "transform, opacity",
                  transform: "translateZ(0)"
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          style={{ 
            y: isMobile ? 0 : smoothY, 
            opacity: smoothOpacity, 
            scale: isMobile ? 1 : scale,
            willChange: "transform, opacity"
          }}
          className="relative z-10 container-custom pt-24 md:pt-32 pb-16 md:pb-20 px-4"
        >
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center text-center max-w-6xl mx-auto"
          >
            {/* Premium Badge with Glow */}
            <motion.div
              variants={fadeInUp}
              className="relative mb-8 md:mb-10"
            >
              {!shouldReduceMotion && !isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{
                    background: "linear-gradient(90deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              <div className="badge-glow relative backdrop-blur-xl border-2 text-sm md:text-base">
                <motion.span
                  className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400"
                  animate={!shouldReduceMotion && !isMobile ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(16, 185, 129, 0.7)",
                      "0 0 0 8px rgba(16, 185, 129, 0)",
                      "0 0 0 0 rgba(16, 185, 129, 0)"
                    ]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="font-semibold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  The #1 Data-Driven Growth Partner
                </span>
              </div>
            </motion.div>

            {/* Ultra-Premium Heading - Mobile optimized */}
            <motion.h1
              variants={fadeInUp}
              className="heading-display mb-8 md:mb-10 relative text-4xl md:text-6xl lg:text-7xl"
            >
              <motion.span
                className="block text-white relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Turn Data
                {!shouldReduceMotion && !isMobile && (
                  <motion.span
                    className="absolute inset-0 blur-2xl opacity-20"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    Turn Data
                  </motion.span>
                )}
              </motion.span>

              <motion.span
                className="block mt-2 md:mt-3 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span
                  className="gradient-text-hero-ultra relative inline-block"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #06b6d4 20%, #3b82f6 40%, #8b5cf6 60%, #ec4899 80%, #10b981 100%)",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: !shouldReduceMotion && !isMobile ? "gradient-shift 8s ease infinite" : "none"
                  }}
                >
                  Into Growth.
                </span>

                <motion.div
                  className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-1 md:h-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #10b981, #06b6d4, #3b82f6, #8b5cf6)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={!shouldReduceMotion && !isMobile ? {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  } : {}}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.span>
            </motion.h1>

            {/* Enhanced Subtitle - Mobile optimized */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg lg:text-xl max-w-3xl mb-10 md:mb-14 text-white/80 leading-relaxed px-4"
            >
              Stop wasting money on random tactics. We help you scale with{" "}
              <span className="text-emerald-400 font-semibold">verified data</span>,{" "}
              <span className="text-cyan-400 font-semibold">powerful websites</span>, and{" "}
              <span className="text-blue-400 font-semibold">impactful advertising</span>{" "}
              — engineered for explosive growth.
            </motion.p>

            {/* Premium CTA Buttons - Mobile optimized */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-12 md:mb-16 w-full sm:w-auto px-4"
            >
              <motion.button
                onClick={() => setView("services")}
                className="btn-primary-premium group relative overflow-hidden w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {!shouldReduceMotion && !isMobile && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.4), transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                onClick={() => setView("contact")}
                className="btn-secondary-premium group w-full sm:w-auto"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Book Free Call</span>
              </motion.button>
            </motion.div>

            {/* Trust Badges - Mobile optimized */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-16 md:mb-20 px-4"
            >
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.3)" }}
                >
                  <badge.icon className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                  <span className="text-xs md:text-sm font-medium text-white/70">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Stats Grid - Mobile optimized with swipe */}
            <motion.div
              variants={fadeInUp}
              className="w-full max-w-5xl px-4"
            >
              {isMobile ? (
                <SwipeCarousel className="w-full">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="stat-card-premium group relative overflow-hidden mx-auto max-w-sm"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                    >
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at center, var(--color-${stat.color}-500) 0%, transparent 70%)`,
                            filter: "blur(40px)",
                          }}
                        />
                      )}

                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, var(--color-${stat.color}-500), transparent)`,
                          padding: "1px",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />

                      <div className="relative z-10">
                        <motion.div
                          className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                        </motion.div>

                        <motion.div
                          className="stat-value mb-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + i * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </motion.div>

                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </motion.div>
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
                      {!shouldReduceMotion && (
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at center, var(--color-${stat.color}-500) 0%, transparent 70%)`,
                            filter: "blur(40px)",
                          }}
                        />
                      )}

                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, var(--color-${stat.color}-500), transparent)`,
                          padding: "1px",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />

                      <div className="relative z-10">
                        <motion.div
                          className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                        </motion.div>

                        <motion.div
                          className="stat-value mb-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + i * 0.1, type: "spring" }}
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
        </motion.div>

        {/* Enhanced Scroll Indicator - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center gap-3">
              <motion.span
                className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold"
                animate={!shouldReduceMotion ? { opacity: [0.4, 0.7, 0.4] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll
              </motion.span>
              <motion.div
                className="relative w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
                whileHover={{ borderColor: "rgba(16, 185, 129, 0.5)" }}
              >
                <motion.div
                  className="w-1.5 h-3 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400"
                  animate={!shouldReduceMotion ? {
                    y: [0, 12, 0],
                    opacity: [1, 0.3, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%)",
                      filter: "blur(8px)",
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      {/* ===== PREMIUM STANDARD SECTION ===== */}
      <section ref={standardRef} className="section-spacing relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)",
            }}
            animate={!shouldReduceMotion && !isMobile ? {
              backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
            } : {}}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Floating orbs - Desktop only */}
          {!shouldReduceMotion && !isMobile && (
            <motion.div
              className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent 70%)",
                filter: "blur(80px)",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>

        <div className="container-custom relative z-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">
            {/* Enhanced Content */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -60 }}
              animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="badge mb-6 md:mb-8"
                whileHover={{ scale: 1.05 }}
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
                  <span className="gradient-text-enhanced">Strategic Growth.</span>

                  {/* Animated accent line */}
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    animate={isStandardInView ? { width: "100%" } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </motion.span>
              </h2>

              <motion.p
                className="text-base md:text-lg lg:text-xl mb-10 md:mb-14 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isStandardInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                We go beyond lead lists. We build{" "}
                <span className="text-emerald-400 font-semibold">data-driven acquisition systems</span>,{" "}
                <span className="text-cyan-400 font-semibold">high-performing websites</span>, and{" "}
                <span className="text-blue-400 font-semibold">impactful campaigns</span>{" "}
                designed to boost visibility, engagement, and revenue.
              </motion.p>

              {/* Premium Value Props */}
              <div className="grid gap-6 md:gap-8">
                {[
                  {
                    icon: Target,
                    color: "emerald",
                    title: "Precision",
                    desc: "ICP-based targeting that reaches real decision-makers",
                    gradient: "from-emerald-500/20 to-emerald-500/5"
                  },
                  {
                    icon: Palette,
                    color: "blue",
                    title: "Creativity",
                    desc: "Modern design and compelling creatives that convert",
                    gradient: "from-blue-500/20 to-blue-500/5"
                  },
                  {
                    icon: TrendingUp,
                    color: "violet",
                    title: "Conversion",
                    desc: "Sales-focused funnels that turn traffic into revenue",
                    gradient: "from-violet-500/20 to-violet-500/5"
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: isMobile ? 0 : -40 }}
                    animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="group relative"
                  >
                    {/* Background glow on hover - Desktop only */}
                    {!shouldReduceMotion && !isMobile && (
                      <motion.div
                        className={`absolute -inset-4 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                      />
                    )}

                    <div className="relative flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04]">
                      <motion.div
                        className={`w-12 h-12 md:w-16 md:h-16 bg-${item.color}-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-${item.color}-500/20`}
                        whileHover={{
                          rotate: 360,
                          scale: 1.1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className={`w-6 h-6 md:w-8 md:h-8 text-${item.color}-400`} />
                      </motion.div>

                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                          {item.title}
                        </h4>
                        <p className="text-sm md:text-base text-body-sm leading-relaxed">{item.desc}</p>
                      </div>

                      {/* Hover arrow - Desktop only */}
                      {!isMobile && (
                        <motion.div
                          className={`opacity-0 group-hover:opacity-100 transition-opacity text-${item.color}-400`}
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Premium Image Section */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 60 }}
              animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Glow layers - Desktop only */}
              {!shouldReduceMotion && !isMobile && (
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-500/20 rounded-[2rem] blur-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                {/* Image with parallax effect */}
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.6 }}
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

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 mix-blend-overlay" />

                {/* Premium badge overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isStandardInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 rounded-xl md:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50"
                      whileHover={!isMobile ? { rotate: 180, scale: 1.1 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <Check className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1">Real Connections</p>
                      <p className="text-emerald-400 font-semibold text-sm md:text-lg">Real Results</p>
                    </div>
                  </div>
                </motion.div>

                {/* Scanning line effect - Desktop only */}
                {!shouldReduceMotion && !isMobile && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                    animate={{
                      top: ["0%", "100%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </div>

              {/* Floating stats - Desktop only */}
              {!isMobile && (
                <>
                  <motion.div
                    className="absolute -right-6 top-1/4 bg-black/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-4 shadow-2xl"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(16, 185, 129, 0.5)" }}
                  >
                    <div className="text-3xl font-bold text-emerald-400 mb-1">98.5%</div>
                    <div className="text-sm text-white/60">Satisfaction</div>
                  </motion.div>

                  <motion.div
                    className="absolute -left-6 bottom-1/3 bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 shadow-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isStandardInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.5)" }}
                  >
                    <div className="text-3xl font-bold text-cyan-400 mb-1">+240%</div>
                    <div className="text-sm text-white/60">ROI Growth</div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES SECTION ===== */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
          {!shouldReduceMotion && !isMobile && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
              style={{
                background: "radial-gradient(circle 800px at 50% 50%, rgba(139, 92, 246, 0.05), transparent)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>

        <div className="container-custom relative z-10 px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: isMobile ? 0.1 : 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-12 mb-12 md:mb-20"
          >
            <div className="max-w-2xl">
              <motion.div
                className="badge mb-4 md:mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                Expertise
              </motion.div>

              <h2 className="heading-xl mb-4 text-3xl md:text-5xl lg:text-6xl">
                <span className="block text-white">Our</span>
                <span className="gradient-text-enhanced block mt-2">Capabilities</span>
              </h2>

              <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full" />
            </div>

            <motion.p
              className="text-base md:text-lg lg:text-xl max-w-lg lg:text-right"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Data, web, and demand solutions designed for{" "}
              <span className="text-emerald-400 font-semibold">high-growth teams</span>.
            </motion.p>
          </motion.div>

          {/* Capability Cards - Mobile swipe */}
          {isMobile ? (
            <SwipeCarousel>
              {capabilities.map((cap, i) => (
                <CapabilityCard key={cap.title} cap={cap} index={i} isMobile={isMobile} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </SwipeCarousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {capabilities.map((cap, i) => (
                <CapabilityCard key={cap.title} cap={cap} index={i} isMobile={isMobile} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== ADVANTAGES SECTION ===== */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)",
            }}
            animate={!shouldReduceMotion && !isMobile ? {
              backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
            } : {}}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Orbiting elements - Desktop only */}
          {!shouldReduceMotion && !isMobile && [...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${i === 0 ? "rgba(16, 185, 129, 0.1)" :
                    i === 1 ? "rgba(59, 130, 246, 0.1)" :
                      "rgba(139, 92, 246, 0.1)"
                  }, transparent 70%)`,
                filter: "blur(60px)",
                top: `${20 + i * 30}%`,
                left: `${10 + i * 25}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.3, 1],
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

        <div className="container-custom relative z-10 px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: isMobile ? 0.1 : 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-12 md:mb-20"
          >
            <motion.div
              className="badge mx-auto mb-4 md:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-4 h-4" />
              Why Remarketix?
            </motion.div>

            <h2 className="heading-xl mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              <span className="text-white">Your unfair advantage in</span>
              <motion.span
                className="gradient-text-enhanced block mt-2 md:mt-3"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Data, Web & Demand
              </motion.span>
            </h2>

            <motion.div
              className="h-1.5 w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Advantages Grid - Mobile optimized */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {advantages.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px", amount: isMobile ? 0.1 : 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative"
              >
                <motion.div
                  className="feature-card-premium h-full"
                  whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {/* Gradient background on hover - Desktop only */}
                  {!shouldReduceMotion && !isMobile && (
                    <motion.div
                      className={`absolute -inset-px bg-gradient-to-br from-${adv.color}-500/20 to-transparent rounded-[1.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  )}

                  {/* Glow effect - Desktop only */}
                  {!shouldReduceMotion && !isMobile && (
                    <motion.div
                      className={`absolute -inset-4 bg-${adv.color}-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`icon-container-premium bg-${adv.color}-500/10 border-${adv.color}-500/20 mb-6 md:mb-8 relative overflow-hidden`}
                      whileHover={!isMobile ? {
                        rotate: 360,
                        scale: 1.15,
                      } : {}}
                      transition={{ duration: 0.8 }}
                    >
                      <adv.icon className={`w-6 h-6 md:w-8 md:h-8 text-${adv.color}-400 relative z-10`} />

                      {/* Icon background pulse - Desktop only */}
                      {!shouldReduceMotion && !isMobile && (
                        <motion.div
                          className={`absolute inset-0 bg-${adv.color}-400`}
                          animate={{
                            scale: [0, 2],
                            opacity: [0.5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>

                    {/* Title */}
                    <h3 className="heading-sm text-white mb-3 md:mb-4 text-lg md:text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                      {adv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-body-sm leading-relaxed group-hover:text-white/80 transition-colors">
                      {adv.description}
                    </p>

                    {/* Bottom accent line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${adv.color}-500 to-transparent rounded-full`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>

                  {/* Hover arrow - Desktop only */}
                  {!isMobile && (
                    <motion.div
                      className={`absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-${adv.color}-400`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  )}

                  {/* Number indicator */}
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 text-4xl md:text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 md:mt-16"
          >
            <motion.button
              onClick={() => setView("services")}
              className="btn-primary-premium group w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section-spacing relative overflow-hidden">
        {/* Epic Background */}
        <div className="absolute inset-0">
          {/* Main gradient orb */}
          {!shouldReduceMotion && !isMobile && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 80%)",
                filter: "blur(100px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Rotating rays - Desktop only */}
          {!shouldReduceMotion && !isMobile && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(16, 185, 129, 0.1) 90deg, transparent 180deg, rgba(59, 130, 246, 0.1) 270deg, transparent 360deg)",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-dense opacity-10" />
        </div>

        <div className="container-custom relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: isMobile ? 0.1 : 0.3 }}
            transition={{ duration: 1 }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Premium CTA Card */}
            <div className="card-glass-premium text-center p-8 md:p-12 lg:p-20 relative overflow-hidden">
              {/* Animated border - Desktop only */}
              {!shouldReduceMotion && !isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-2xl md:rounded-[2rem]"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(59, 130, 246, 0.3))",
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Spotlight effect - Desktop only */}
              {!shouldReduceMotion && !isMobile && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
                  style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.05), transparent 60%)",
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Premium badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 mb-6 md:mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Rocket className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400 text-sm md:text-base">Limited Spots Available</span>
                </motion.div>

                {/* Main heading */}
                <motion.h2
                  className="heading-xl mb-6 md:mb-8 text-3xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-white">Ready for</span>
                  <motion.span
                    className="block mt-2 md:mt-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <span
                      className="gradient-text-cta"
                      style={{
                        background: "linear-gradient(135deg, #10b981 0%, #06b6d4 25%, #3b82f6 50%, #8b5cf6 75%, #ec4899 100%)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: !shouldReduceMotion && !isMobile ? "gradient-shift 6s ease infinite" : "none"
                      }}
                    >
                      Explosive Growth?
                    </span>
                  </motion.span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  Get a{" "}
                  <span className="text-emerald-400 font-semibold">free strategy call</span>{" "}
                  and discover how{" "}
                  <span className="text-cyan-400 font-semibold">better data</span>,{" "}
                  <span className="text-blue-400 font-semibold">better design</span>,
                  and{" "}
                  <span className="text-violet-400 font-semibold">better campaigns</span>{" "}
                  can double your pipeline.
                </motion.p>

                {/* CTA Button */}
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
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button glow - Desktop only */}
                    {!shouldReduceMotion && !isMobile && (
                      <motion.div
                        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(59, 130, 246, 0.5))",
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg font-bold">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                      Book Free Strategy Call
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </motion.button>

                  {/* Pulse rings - Desktop only */}
                  {!shouldReduceMotion && !isMobile && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
                      animate={{
                        scale: [1, 1.2, 1.4],
                        opacity: [0.5, 0.2, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                    <span className="text-white/70 text-sm md:text-base">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                    <span className="text-white/70 text-sm md:text-base">100% Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    <span className="text-white/70 text-sm md:text-base">30-min consultation</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating elements - Desktop only */}
              {!shouldReduceMotion && !isMobile && (
                <>
                  <motion.div
                    className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl"
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />

                  <motion.div
                    className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-violet-400/20 blur-2xl"
                    animate={{
                      y: [0, 20, 0],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: 1,
                    }}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Capability Card Component
interface CapabilityCardProps {
  cap: any;
  index: number;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}

function CapabilityCard({ cap, index, isMobile, shouldReduceMotion }: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px", amount: isMobile ? 0.1 : 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative h-[500px] md:h-[550px]"
    >
      <motion.div
        className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer"
        whileHover={!isMobile ? { y: -12 } : {}}
        transition={{ duration: 0.4 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.div
            className="relative w-full h-full"
            whileHover={!isMobile ? { scale: 1.1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={cap.image}
              alt={cap.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/95" />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-b ${cap.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
        />

        {/* Shimmer effect - Desktop only */}
        {!shouldReduceMotion && !isMobile && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        )}

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, var(--color-${cap.accent}-500), transparent)`,
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          {/* Icon */}
          <motion.div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center mb-6 md:mb-8 shadow-2xl relative`}
            whileHover={!isMobile ? { rotate: 360, scale: 1.15 } : {}}
            transition={{ duration: 0.8 }}
          >
            <cap.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
            {cap.title}
          </h3>

          {/* Items */}
          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            {cap.items.map((item: string, idx: number) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 group/item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <motion.span
                  className={`w-2 h-2 rounded-full bg-${cap.accent}-400 shadow-lg`}
                  style={{
                    boxShadow: `0 0 10px var(--color-${cap.accent}-400)`,
                  }}
                  whileHover={{ scale: 1.5 }}
                />
                <span className="text-sm md:text-base text-white/90 font-medium group-hover/item:text-white group-hover/item:translate-x-1 transition-all">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {cap.description}
          </p>

          {/* Arrow */}
          <motion.div
            className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={!isMobile ? { scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" } : {}}
          >
            <ArrowRight className={`w-5 h-5 text-${cap.accent}-400`} />
          </motion.div>
        </div>

        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${cap.gradient} opacity-20 blur-2xl md:blur-3xl group-hover:opacity-40 transition-opacity`} />
      </motion.div>

      {/* External glow - Desktop only */}
      {!shouldReduceMotion && !isMobile && (
        <motion.div
          className="absolute -inset-1 rounded-2xl md:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl"
          style={{
            background: `linear-gradient(135deg, var(--color-${cap.accent}-500), transparent)`,
          }}
        />
      )}
    </motion.div>
  );
}