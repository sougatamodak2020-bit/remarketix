"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { CORE_PLANS, PRICING_SERVICES } from "@/data/pricing";
import {
  Check, ArrowRight, Zap, Layers, Globe, Search, Send, PenTool,
  Box, Video, Mail, BarChart2, Database, Link2, Sparkles, Crown,
  ChevronLeft, ChevronRight
} from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  Zap, Layers, Globe, Search, Send, PenTool, Box, Video, Mail, BarChart2, Database, Linkedin: Link2
};

export default function PricingView() {
  const { currency, setCurrency, setView } = useAppStore();
  const sym = currency === "USD" ? "$" : "₹";
  const fmt = (v: number | string) => typeof v === "number" ? v.toLocaleString() : v;
  const plansScrollRef = useRef<HTMLDivElement>(null);

  const scrollPlans = (dir: number) => plansScrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div className="bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px]"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59, 130, 246, 0.12), transparent 70%)", filter: "blur(80px)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.02]" />
      </div>

      <div className="relative z-10 container-custom section-spacing">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="badge-glow mx-auto mb-6 md:mb-8">
            <Sparkles className="w-4 h-4" />
            Simple & Transparent
          </div>
          <h1 className="heading-display mb-5 md:mb-6">
            <span className="block text-white">Pricing for</span>
            <span className="block gradient-text-enhanced mt-2 md:mt-3">Global Growth</span>
          </h1>
          <motion.div
            className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-body-lg mb-8 md:mb-10 text-white/80 px-4 md:px-0">
            Flexible plans designed for scale. Pay only for what you need.
          </p>

          {/* Currency Toggle */}
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

        {/* Core Plans — Mobile swipe */}
        <div className="md:hidden relative mb-16">
          <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">Swipe to compare plans →</p>
          <div className="relative">
            <button
              onClick={() => scrollPlans(-1)}
              className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div
              ref={plansScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              {CORE_PLANS.map((plan, i) => {
                const Icon = ICONS[plan.icon] ?? Zap;
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
                      className={`${isFeatured ? "pricing-card-featured" : "pricing-card"} h-full`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                    >
                      <div className="mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${isFeatured ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-white/5 border border-white/10"} flex items-center justify-center mb-5`}>
                          <Icon className={`w-7 h-7 ${isFeatured ? "text-emerald-400" : "text-white/60"}`} />
                        </div>
                        <h3 className="heading-sm text-white mb-1.5">{plan.title}</h3>
                        <p className="text-body-sm text-sm">{plan.subtitle}</p>
                      </div>
                      <div className="mb-6 pb-6 border-b border-white/10">
                        {plan.label && <span className="text-xs text-white/40 uppercase tracking-wider block mb-1.5">{plan.label}</span>}
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-white">{sym}{fmt(val)}</span>
                          <span className="text-white/50 text-sm">{plan.unit}</span>
                        </div>
                        {plan.details && <p className="text-xs text-white/40 mt-2">{plan.details}</p>}
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check className={`w-4 h-4 ${isFeatured ? "text-emerald-400" : "text-emerald-500"} flex-shrink-0 mt-0.5`} />
                            <span className="text-white/80 text-sm leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <motion.button
                        onClick={() => setView("contact")}
                        className={`${isFeatured ? "btn-primary-premium" : "btn-secondary-premium"} w-full touch-manipulation`}
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
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Core Plans — Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-24">
          {CORE_PLANS.map((plan, i) => {
            const Icon = ICONS[plan.icon] ?? Zap;
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
                  className={isFeatured ? "pricing-card-featured" : "pricing-card"}
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
                      className={`w-16 h-16 rounded-2xl ${isFeatured ? "bg-emerald-500/20 border border-emerald-500/30" : "bg-white/5 border border-white/10"} flex items-center justify-center mb-6`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className={`w-8 h-8 ${isFeatured ? "text-emerald-400" : "text-white/60"}`} />
                    </motion.div>
                    <h3 className="heading-sm text-white mb-2">{plan.title}</h3>
                    <p className="text-body-sm">{plan.subtitle}</p>
                  </div>
                  <div className="mb-8 pb-8 border-b border-white/10">
                    {plan.label && <span className="text-xs text-white/40 uppercase tracking-wider block mb-2">{plan.label}</span>}
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">{sym}{fmt(val)}</span>
                      <span className="text-white/50">{plan.unit}</span>
                    </div>
                    {plan.details && <p className="text-sm text-white/40 mt-3">{plan.details}</p>}
                  </div>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((f, idx) => (
                      <motion.li key={f} className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + idx * 0.05 }}>
                        <Check className={`w-5 h-5 ${isFeatured ? "text-emerald-400" : "text-emerald-500"} flex-shrink-0 mt-0.5`} />
                        <span className="text-white/80 leading-relaxed">{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => setView("contact")}
                    className={isFeatured ? "btn-primary-premium w-full" : "btn-secondary-premium w-full"}
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

        {/* Divider */}
        <div className="divider-glow my-12 md:my-20" />

        {/* Service Pricing */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="badge mx-auto mb-4">
              <Layers className="w-4 h-4" />
              Specialized Services
            </div>
            <h2 className="heading-xl text-white mb-4 px-4 md:px-0">
              Tailored packages for specific business outcomes
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {PRICING_SERVICES.map((service, i) => {
              const Icon = ICONS[service.icon] ?? Zap;
              const val = service.price[currency === "USD" ? "usd" : "inr"];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 4) * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <motion.div
                    className="feature-card-premium flex flex-col h-full"
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex justify-between items-start mb-5 md:mb-6">
                      <motion.div
                        className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                      </motion.div>
                      <div className="text-right">
                        <span className="text-xs text-white/40 block mb-1">From</span>
                        <span className="text-xl md:text-2xl font-bold text-white">{sym}{fmt(val)}</span>
                        <span className="text-xs text-white/40 block mt-1">{service.unit}</span>
                      </div>
                    </div>
                    <h4 className="heading-sm text-white mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                      {service.title}
                    </h4>
                    <ul className="space-y-2.5 mb-5 md:mb-6 flex-grow">
                      {service.features.map((f, idx) => (
                        <motion.li
                          key={f}
                          className="flex items-start gap-2 text-sm text-white/60"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * idx }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span className="group-hover:text-white/80 transition-colors">{f}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.button
                      onClick={() => setView("contact")}
                      className="w-full py-3 text-center text-sm font-semibold border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white/80 hover:text-emerald-400 rounded-xl transition-all touch-manipulation"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4 inline-block ml-2" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-16"
        >
          <h2 className="heading-xl mb-5 md:mb-6">
            <span className="text-white">Not sure which</span>
            <span className="block gradient-text-enhanced mt-2">plan fits?</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80">
            Get a free sample and personalized quote within 24 hours.
          </p>
          <motion.button
            onClick={() => setView("contact")}
            className="btn-cta-premium group w-full sm:w-auto"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              Book a Consultation
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}