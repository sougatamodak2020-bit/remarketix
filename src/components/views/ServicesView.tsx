"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useAppStore } from "@/store/appStore";
import {
  Users, Database, Crosshair, Keyboard, Link2, UserRound, Send,
  SearchCheck, CloudDownload, Building2, Code2, Wand2, ArrowRight,
  Sparkles, Check, ChevronLeft, ChevronRight
} from "lucide-react";

const services = [
  { icon: Users, color: "rose", title: "Lead Generation", subtitle: "Prospect Research", desc: "Find verified business contacts tailored to your ideal customer profile.", features: ["B2B Lead Generation", "Industry-Specific Prospecting", "Target Account Mapping", "Market Segmentation", "Decision-Maker Discovery"] },
  { icon: Database, color: "emerald", title: "Data Research", subtitle: "Web Scraping", desc: "Accurate, structured, and customized data to fuel your business insights.", features: ["Company & Contact Research", "Market Analysis", "Web Data Extraction", "Data Cleaning & Validation"] },
  { icon: Crosshair, color: "violet", title: "Email Hunting", subtitle: "Verification", desc: "Build clean, deliverable email databases for your campaigns.", features: ["Email Discovery", "Multi-Step Verification", "Deliverability Checks", "CRM-Ready Lists"] },
  { icon: Keyboard, color: "blue", title: "Data Entry", subtitle: "CRM Management", desc: "Keep your CRM and spreadsheets clean, accurate, and actionable.", features: ["CRM Maintenance", "Data Entry & Formatting", "Duplicate Removal", "Periodic Audits"] },
  { icon: Link2, color: "cyan", title: "LinkedIn Outreach", subtitle: "Engagement", desc: "Build real business connections through personalized strategies.", features: ["Prospect Identification", "Custom Sequences", "Response Tracking", "Campaign Reporting"] },
  { icon: UserRound, color: "orange", title: "LinkedIn Management", subtitle: "Profile Optimization", desc: "Transform your LinkedIn presence into a lead-generation asset.", features: ["Profile Optimization", "Content Planning", "Audience Engagement", "Analytics Tracking"] },
  { icon: Send, color: "pink", title: "Email Marketing", subtitle: "Campaigns", desc: "Reach your audience with personalized, conversion-focused campaigns.", features: ["Email Copywriting", "Campaign Setup", "A/B Testing", "Automation"] },
  { icon: SearchCheck, color: "teal", title: "SEO", subtitle: "Content Marketing", desc: "Increase visibility and organic reach with search-optimized strategies.", features: ["Keyword Research", "On-Page SEO", "Content Writing", "Ranking Reports"] },
  { icon: CloudDownload, color: "indigo", title: "Data Collection", subtitle: "Structured Data", desc: "Gather accurate information from public sources to fuel decisions.", features: ["Web Data Gathering", "Competitor Analysis", "Contact Extraction", "Excel/CSV Delivery"] },
  { icon: Building2, color: "amber", title: "Company Research", subtitle: "Business Intel", desc: "Deep insights that help you understand targets before you sell.", features: ["Company Profiles", "Industry Analysis", "Growth Signals", "Decision-Maker IDs"] },
  { icon: Code2, color: "fuchsia", title: "Web Development", subtitle: "UI/UX Design", desc: "Build, launch, and grow high-converting web products.", features: ["Responsive Design", "UI/UX", "Frontend Build", "Tech Integration"] },
  { icon: Wand2, color: "red", title: "Product Advertising", subtitle: "CGI & Creative", desc: "High-impact strategies that make your product impossible to ignore.", features: ["Ad Concepts", "Script & Copy", "Visual Design", "Motion Graphics"] },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/20 hover:border-rose-500/40", text: "text-rose-400", glow: "group-hover:shadow-rose-500/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20 hover:border-emerald-500/40", text: "text-emerald-400", glow: "group-hover:shadow-emerald-500/20" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20 hover:border-violet-500/40", text: "text-violet-400", glow: "group-hover:shadow-violet-500/20" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20 hover:border-blue-500/40", text: "text-blue-400", glow: "group-hover:shadow-blue-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20 hover:border-cyan-500/40", text: "text-cyan-400", glow: "group-hover:shadow-cyan-500/20" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20 hover:border-orange-500/40", text: "text-orange-400", glow: "group-hover:shadow-orange-500/20" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/20 hover:border-pink-500/40", text: "text-pink-400", glow: "group-hover:shadow-pink-500/20" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/20 hover:border-teal-500/40", text: "text-teal-400", glow: "group-hover:shadow-teal-500/20" },
  indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/20 hover:border-indigo-500/40", text: "text-indigo-400", glow: "group-hover:shadow-indigo-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20 hover:border-amber-500/40", text: "text-amber-400", glow: "group-hover:shadow-amber-500/20" },
  fuchsia: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20 hover:border-fuchsia-500/40", text: "text-fuchsia-400", glow: "group-hover:shadow-fuchsia-500/20" },
  red: { bg: "bg-red-500/10", border: "border-red-500/20 hover:border-red-500/40", text: "text-red-400", glow: "group-hover:shadow-red-500/20" },
};

function ServiceCard({ service, colors, mobile = false }: {
  service: typeof services[0];
  colors: typeof colorMap[string];
  mobile?: boolean;
}) {
  return (
    <div className={`service-card h-full ${colors.glow} ${mobile ? "" : ""}`}>
      <div className="relative z-10">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-5 border ${colors.border} transition-all`}>
          <service.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.text}`} />
        </div>
        <div className="mb-4">
          <h3 className="heading-sm text-white mb-1">{service.title}</h3>
          <p className={`text-sm ${colors.text} font-medium`}>{service.subtitle}</p>
        </div>
        <p className="text-body-sm mb-5 leading-relaxed">{service.desc}</p>
        <div className="pt-5 border-t border-white/5">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Includes:</p>
          <ul className="space-y-2.5">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-white/70">
                <Check className={`w-3.5 h-3.5 ${colors.text} flex-shrink-0`} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ServicesView() {
  const setView = useAppStore((s) => s.setView);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)",
            filter: "blur(80px)"
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)",
            filter: "blur(80px)"
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.02]" />
      </div>

      {/* Hero */}
      <section className="relative section-spacing">
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge-glow mx-auto mb-6 md:mb-8">
              <Sparkles className="w-4 h-4" />
              Empower Your Business
            </div>
            <h1 className="heading-display mb-5 md:mb-6 max-w-4xl mx-auto">
              <span className="block text-white">Data-Driven Services</span>
              <span className="block gradient-text-enhanced mt-2 md:mt-3">to Power Your Growth</span>
            </h1>
            <motion.div
              className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <p className="text-body-lg max-w-2xl mx-auto text-white/80 px-4 md:px-0">
              We help businesses turn raw data into real opportunities through targeted
              research, outreach, and marketing execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid / Swiper */}
      <section className="section-spacing">
        <div className="container-custom">

          {/* Mobile: horizontal swipe */}
          <div className="md:hidden relative">
            <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">Swipe to explore →</p>
            <div className="relative">
              <button
                onClick={() => scroll(-1)}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
              >
                {services.map((service, i) => {
                  const colors = colorMap[service.color];
                  return (
                    <motion.div
                      key={service.title}
                      className="flex-shrink-0 snap-start"
                      style={{ width: "min(82vw, 300px)" }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.5 }}
                    >
                      <ServiceCard service={service} colors={colors} mobile />
                    </motion.div>
                  );
                })}
              </div>
              <button
                onClick={() => scroll(1)}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: Math.ceil(services.length / 3) }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const colors = colorMap[service.color];
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
                  className="group relative"
                >
                  <motion.div
                    className={`service-card h-full ${colors.glow}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="absolute -inset-px rounded-[1.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, var(--color-${service.color}-500) 0%, transparent 100%)`, opacity: 0.1 }}
                    />
                    <div className="relative z-10">
                      <motion.div
                        className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 border ${colors.border} transition-all`}
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.8 }}
                      >
                        <service.icon className={`w-8 h-8 ${colors.text}`} />
                      </motion.div>
                      <div className="mb-4">
                        <h3 className="heading-sm text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                          {service.title}
                        </h3>
                        <p className={`text-sm ${colors.text} font-medium`}>{service.subtitle}</p>
                      </div>
                      <p className="text-body-sm mb-6 leading-relaxed">{service.desc}</p>
                      <div className="pt-6 border-t border-white/5">
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Includes:</p>
                        <ul className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <motion.li
                              key={feature}
                              className="flex items-center gap-3 text-sm text-white/70 group/item"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 * idx }}
                            >
                              <Check className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                              <span className="group-hover/item:text-white group-hover/item:translate-x-1 transition-all">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <motion.div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className={`w-5 h-5 ${colors.text}`} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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
            transition={{ duration: 0.8 }}
            className="card-glass-premium max-w-4xl mx-auto text-center p-8 md:p-12 lg:p-16"
          >
            <h2 className="heading-xl mb-5 md:mb-6">
              <span className="text-white">Ready to</span>
              <span className="block gradient-text-enhanced mt-2">Elevate Your Business?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80 leading-relaxed">
              Let us help you connect with ideal customers, streamline your data,
              and build a powerful online presence.
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