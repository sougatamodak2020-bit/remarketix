"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import {
  Check,
  ArrowRight,
  Zap,
  Clock,
  Briefcase,
  Target,
  Search,
  Database,
  Mail,
  FileText,
  Building2,
  Link as LinkIcon,
  Send,
  BarChart2,
  Globe,
  Code,
  Megaphone,
  Sparkles,
  Crown,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

// Icon mapping
const ICONS: Record<string, React.ElementType> = {
  Clock,
  Briefcase,
  Target,
  Search,
  Database,
  Mail,
  FileText,
  Building2,
  Linkedin: LinkIcon,
  Send,
  BarChart2,
  Globe,
  Code,
  Megaphone,
  Sparkles,
};

// Service type definition
interface Service {
  title: string;
  icon: string;
  description: string;
  features: string[];
  price: { usd: number; inr: number };
  label: string;
  unit?: string;
}

// 💼 Engagement Models
const ENGAGEMENT_MODELS = [
  {
    icon: "Clock",
    title: "Hourly Plan",
    subtitle: "Flexible and task-based support",
    price: { usd: 4, inr: 333 },
    unit: "/ hour",
    features: ["Small tasks", "Quick updates", "One-time requirements"],
    highlight: false,
  },
  {
    icon: "Briefcase",
    title: "Project-Based",
    subtitle: "Fixed deliverables and defined scope",
    price: { usd: 67, inr: 5583 },
    unit: "/ project",
    label: "Starts from",
    features: [
      "One-time projects",
      "Defined outcomes",
      "Website or campaign setup",
    ],
    highlight: true,
  },
  {
    icon: "Target",
    title: "Monthly Dedicated",
    subtitle: "Full-time or ongoing support",
    price: { usd: 222, inr: 18500 },
    unit: "/ month",
    features: [
      "Agencies and teams",
      "Continuous lead generation",
      "Long-term growth support",
    ],
    highlight: false,
  },
];

// 🔹 Service Categories
const SERVICE_CATEGORIES = [
  {
    id: "data",
    title: "Data & Lead Generation",
    icon: "Database",
    services: [
      {
        title: "Lead Generation and Prospect Research",
        icon: "Search",
        description:
          "Targeted lead databases built based on your ideal customer profile.",
        features: [
          "B2B lead generation",
          "Industry-specific targeting",
          "Verified decision-makers",
          "Structured data delivery",
        ],
        price: { usd: 36, inr: 3000 },
        label: "Starting from",
      },
      {
        title: "Data Research and Web Scraping",
        icon: "Database",
        description:
          "Structured and customized data collected from reliable sources.",
        features: [
          "Company and contact research",
          "Market and competitor analysis",
          "Data extraction and formatting",
        ],
        price: { usd: 30, inr: 2500 },
        label: "Starting from",
      },
      {
        title: "Email Hunting and Verification",
        icon: "Mail",
        description:
          "Clean and deliverable email databases for outreach campaigns.",
        features: ["Email discovery", "Multi-step verification", "Deliverability checks"],
        price: { usd: 24, inr: 2000 },
        label: "Starting from",
      },
      {
        title: "Data Entry and CRM Management",
        icon: "FileText",
        description:
          "Organized and accurate data management for your CRM systems.",
        features: ["Data entry and formatting", "CRM updates", "Duplicate removal"],
        price: { usd: 18, inr: 1500 },
        label: "Starting from",
      },
      {
        title: "Data Collection",
        icon: "Database",
        description:
          "Collection of structured data from public and online sources.",
        features: ["Web data collection", "Market data gathering", "Structured delivery"],
        price: { usd: 24, inr: 2000 },
        label: "Starting from",
      },
      {
        title: "Company Research",
        icon: "Building2",
        description:
          "Detailed insights about target companies and decision-makers.",
        features: [
          "Company analysis",
          "Market insights",
          "Decision-maker identification",
        ],
        price: { usd: 30, inr: 2500 },
        label: "Starting from",
      },
    ] as Service[],
  },
  {
    id: "outreach",
    title: "Outreach & Engagement",
    icon: "Send",
    services: [
      {
        title: "LinkedIn Outreach and Engagement",
        icon: "Linkedin",
        description:
          "Personalized LinkedIn campaigns to generate leads and conversations.",
        features: ["Prospect targeting", "Message sequences", "Follow-ups and tracking"],
        price: { usd: 72, inr: 6000 },
        label: "Starting from",
        unit: "per month",
      },
      {
        title: "Email Marketing Campaigns",
        icon: "Mail",
        description:
          "Conversion-focused email campaigns designed to generate responses.",
        features: ["Campaign setup", "Copywriting", "Automation and tracking"],
        price: { usd: 60, inr: 5000 },
        label: "Starting from",
        unit: "per month",
      },
    ] as Service[],
  },
  {
    id: "content",
    title: "Content & Brand Growth",
    icon: "BarChart2",
    services: [
      {
        title: "LinkedIn Management and Profile",
        icon: "Linkedin",
        description:
          "Optimize your profile and build authority through consistent content.",
        features: ["Profile optimization", "Content planning", "Posting and engagement"],
        price: { usd: 84, inr: 7000 },
        label: "Starting from",
        unit: "per month",
      },
      {
        title: "SEO and Content Marketing",
        icon: "BarChart2",
        description:
          "Improve visibility and drive organic growth through optimized content.",
        features: ["Keyword research", "Content creation", "SEO optimization"],
        price: { usd: 96, inr: 8000 },
        label: "Starting from",
        unit: "per month",
      },
    ] as Service[],
  },
  {
    id: "digital",
    title: "Digital & Product Solutions",
    icon: "Globe",
    services: [
      {
        title: "Web Development and UI UX Design",
        icon: "Code",
        description:
          "Conversion-focused websites and user-friendly digital experiences.",
        features: ["UI and UX design", "Website development", "Responsive design"],
        price: { usd: 180, inr: 15000 },
        label: "Starting from",
      },
      {
        title: "Product Advertisement",
        icon: "Megaphone",
        description:
          "Creative and performance-driven campaigns to promote your product.",
        features: ["Ad strategy", "Creative development", "Campaign execution"],
        price: { usd: 120, inr: 10000 },
        label: "Starting from",
      },
    ] as Service[],
  },
];

export default function PricingView() {
  const { currency, setCurrency, setView } = useAppStore();
  const sym = currency === "USD" ? "$" : "₹";
  const fmt = (v: number) => v.toLocaleString();
  const plansScrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollPlans = (dir: number) => {
    plansScrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return (
    <div className="relative min-h-screen">
      {/* 🎨 Animated Background */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px]"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59, 130, 246, 0.12), transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* ✅ FIXED: Reduced top padding from pt-32 to pt-16 md:pt-20 */}
      <div className="relative z-10 container-custom section-spacing px-4 md:px-6 pt-14 md:pt-16">
        
        {/* 🎯 Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-6 md:mb-10"
        >
          <div className="badge-glow mx-auto mb-6 md:mb-8">
            <Sparkles className="w-4 h-4" />
            💼 Choose Your Engagement Model
          </div>
          <h1 className="heading-display mb-4 md:mb-5">
            <span className="block text-white">Transparent Pricing</span>
            <span className="block gradient-text-enhanced mt-2 md:mt-3">
              Built for Scale
            </span>
          </h1>
          <motion.div
            className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "6rem" : "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-body-lg mb-5 md:mb-7 text-white/80 px-4 md:px-0">
            Flexible plans designed for businesses of all sizes. Pay only for
            what you need.
          </p>

          {/* 💱 Currency Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm w-full max-w-[260px] mx-auto">
            <motion.button
              onClick={() => setCurrency("INR")}
              className={`flex-1 px-4 md:px-8 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all touch-manipulation ${
                currency === "INR"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-white/60 hover:text-white"
              }`}
              whileHover={{ scale: currency === "INR" ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              INR (₹)
            </motion.button>
            <motion.button
              onClick={() => setCurrency("USD")}
              className={`flex-1 px-4 md:px-8 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all touch-manipulation ${
                currency === "USD"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-white/60 hover:text-white"
              }`}
              whileHover={{ scale: currency === "USD" ? 1 : 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              USD ($)
            </motion.button>
          </div>
        </motion.div>

        {/* 📱 Mobile: Engagement Models (Swipeable) */}
        <div className="md:hidden relative mb-16">
          <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">
            Swipe to compare plans →
          </p>
          <div className="relative">
            <button
              onClick={() => scrollPlans(-1)}
              className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
              aria-label="Previous plan"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <div
              ref={plansScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              } as React.CSSProperties}
            >
              {ENGAGEMENT_MODELS.map((plan, i) => {
                const Icon = ICONS[plan.icon] ?? Briefcase;
                const val = plan.price[currency === "USD" ? "usd" : "inr"];
                const isFeatured = plan.highlight;

                return (
                  <div
                    key={plan.title}
                    className="flex-shrink-0 snap-start relative"
                    style={{ width: "min(85vw, 320px)" }}
                  >
                    {isFeatured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg whitespace-nowrap">
                        <Crown className="w-3.5 h-3.5" />
                        Most Popular
                      </div>
                    )}

                    <motion.div
                      className={`${
                        isFeatured ? "pricing-card-featured" : "pricing-card"
                      } h-full`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                      <div className="mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl ${
                            isFeatured
                              ? "bg-emerald-500/20 border border-emerald-500/30"
                              : "bg-white/5 border border-white/10"
                          } flex items-center justify-center mb-5`}
                        >
                          <Icon
                            className={`w-7 h-7 ${
                              isFeatured ? "text-emerald-400" : "text-white/60"
                            }`}
                          />
                        </div>
                        <h3 className="heading-sm text-white mb-1.5">
                          {plan.title}
                        </h3>
                        <p className="text-body-sm text-sm">{plan.subtitle}</p>
                      </div>

                      <div className="mb-6 pb-6 border-b border-white/10">
                        {plan.label && (
                          <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">
                            {plan.label}
                          </span>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-white">
                            {sym}
                            {fmt(val)}
                          </span>
                          <span className="text-white/50 text-sm">
                            {plan.unit}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check
                              className={`w-4 h-4 ${
                                isFeatured
                                  ? "text-emerald-400"
                                  : "text-emerald-500"
                              } flex-shrink-0 mt-0.5`}
                            />
                            <span className="text-white/80 text-sm leading-relaxed">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        onClick={() => setView("contact")}
                        className={`${
                          isFeatured
                            ? "btn-primary-premium"
                            : "btn-secondary-premium"
                        } w-full touch-manipulation`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Get Started <ArrowRight className="w-4 h-4" />
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => scrollPlans(1)}
              className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
              aria-label="Next plan"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* 🖥️ Desktop: Engagement Models Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-24">
          {ENGAGEMENT_MODELS.map((plan, i) => {
            const Icon = ICONS[plan.icon] ?? Briefcase;
            const val = plan.price[currency === "USD" ? "usd" : "inr"];
            const isFeatured = plan.highlight;

            return (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  className={
                    isFeatured ? "pricing-card-featured" : "pricing-card"
                  }
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {isFeatured && (
                    <motion.div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </motion.div>
                  )}

                  <div className="mb-8">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl ${
                        isFeatured
                          ? "bg-emerald-500/20 border border-emerald-500/30"
                          : "bg-white/5 border border-white/10"
                      } flex items-center justify-center mb-6`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          isFeatured ? "text-emerald-400" : "text-white/60"
                        }`}
                      />
                    </motion.div>
                    <h3 className="heading-sm text-white mb-2">
                      {plan.title}
                    </h3>
                    <p className="text-body-sm">{plan.subtitle}</p>
                  </div>

                  <div className="mb-8 pb-8 border-b border-white/10">
                    {plan.label && (
                      <span className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                        {plan.label}
                      </span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        {sym}
                        {fmt(val)}
                      </span>
                      <span className="text-white/50">{plan.unit}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((f, idx) => (
                      <motion.li
                        key={f}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.05 }}
                      >
                        <Check
                          className={`w-5 h-5 ${
                            isFeatured
                              ? "text-emerald-400"
                              : "text-emerald-500"
                          } flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-white/80 leading-relaxed">
                          {f}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => setView("contact")}
                    className={
                      isFeatured
                        ? "btn-primary-premium w-full"
                        : "btn-secondary-premium w-full"
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ℹ️ Pricing Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-white/50 text-sm md:text-base italic">
            👉 Final pricing may vary based on scope, volume and complexity
          </p>
        </motion.div>

        {/* 📊 Divider */}
        <div className="divider-glow my-12 md:my-20" />

        {/* 🔹 Service Categories */}
        {SERVICE_CATEGORIES.map((category, categoryIndex) => {
          const CategoryIcon = ICONS[category.icon] ?? Layers;

          return (
            <div key={category.id} className="mb-12 md:mb-16"> {/* ✅ Reduced from mb-20/28 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 md:mb-10"
              >
                <div className="inline-flex items-center gap-3 mb-4 md:mb-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <h2 className="heading-xl text-white">
                    🔹 {category.title}
                  </h2>
                </div>
                <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {category.services.map(
                  (service: Service, serviceIndex) => {
                    const ServiceIcon = ICONS[service.icon] ?? Zap;
                    const val =
                      service.price[currency === "USD" ? "usd" : "inr"];

                    return (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          delay: (serviceIndex % 3) * 0.1,
                          duration: 0.6,
                        }}
                        className="group"
                      >
                        <motion.div
                          className="feature-card-premium flex flex-col h-full"
                          whileHover={
                            !isMobile ? { y: -8, scale: 1.03 } : {}
                          }
                          transition={{ duration: 0.4 }}
                        >
                          {/* Service Header */}
                          <div className="flex justify-between items-start mb-4 md:mb-5">
                            <motion.div
                              className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20"
                              whileHover={!isMobile ? { rotate: 360 } : {}}
                              transition={{ duration: 0.6 }}
                            >
                              <ServiceIcon className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" />
                            </motion.div>
                            <div className="text-right">
                              <span className="text-xs text-white/40 block mb-1">
                                {service.label || "Starting from"}
                              </span>
                              <span className="text-2xl md:text-3xl font-bold text-white">
                                {sym}
                                {fmt(val)}
                              </span>
                              {service.unit && (
                                <span className="text-xs text-white/40 block mt-1">
                                  {service.unit}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Service Title & Description */}
                          <h4 className="heading-sm text-white mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
                            {service.title}
                          </h4>
                          <p className="text-sm text-white/60 mb-4 md:mb-5">
                            {service.description}
                          </p>

                          {/* Includes */}
                          <div className="mb-6 flex-grow">
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                              Includes:
                            </p>
                            <ul className="space-y-2.5">
                              {service.features.map((feature, idx) => (
                                <motion.li
                                  key={feature}
                                  className="flex items-start gap-2 text-sm text-white/70"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.05 * idx }}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                  <span className="group-hover:text-white/90 transition-colors">
                                    {feature}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            onClick={() => setView("contact")}
                            className="w-full py-3 md:py-3.5 text-center text-sm font-semibold border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white/80 hover:text-emerald-400 rounded-xl transition-all touch-manipulation group/btn"
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="flex items-center justify-center gap-2">
                              Get Quote
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    );
                  }
                )}
              </div>

              {/* Category Divider (except last) */}
              {categoryIndex < SERVICE_CATEGORIES.length - 1 && (
                <div className="divider-glow my-8 md:my-12" /> 
              )}
            </div>
          );
        })}

        {/* 🎯 Final CTA - ✅ FIXED: Constrained width & Tighter Top Margin */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // ✅ FIX: Changed mt-20/28 to mt-8 md:mt-12 and added max-w-3xl
          className="card-glass-premium max-w-3xl mx-auto text-center p-5 md:p-8 mt-8 md:mt-12"
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center"
            whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
          </motion.div>

          <h2 className="heading-xl mb-4 md:mb-5">
            <span className="block text-white">Need a Custom Plan?</span>
          </h2>

          <p className="text-body-lg max-w-2xl mx-auto mb-5 md:mb-7 text-white/80 px-4 md:px-0">
            We create customized solutions based on your business goals, target
            market and required services.
          </p>

          <motion.button
            onClick={() => setView("contact")}
            className="btn-cta-premium group w-full sm:w-auto"
            whileHover={!isMobile ? { scale: 1.05, y: -4 } : {}}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              Get a Custom Quote
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}