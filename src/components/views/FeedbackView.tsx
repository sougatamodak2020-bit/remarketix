"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useAppStore } from "@/store/appStore";
import { Star, Quote, ArrowRight, Sparkles, Award, Users, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { quote: "Remarketix delivered exactly what we needed — accurate leads, on time.", author: "B2B Project Client", role: "Marketing Director", color: "emerald" },
  { quote: "We were impressed by the accuracy of their data and the quick turnaround time.", author: "U.S. E-commerce Company", role: "VP of Sales", color: "blue" },
  { quote: "Fast, reliable, and highly accurate data for our campaigns.", author: "UK Hospitality Project", role: "Operations Lead", color: "violet" },
  { quote: "Working with Remarketix was a great experience. They were meticulous in their work, had a direct approach, and delivered impressive results.", author: "Joshua Austin", role: "Founder of Bluvise", color: "cyan" },
  { quote: "Amazing experience! Excellent post creation and super smooth LinkedIn and Instagram handling. Truly reliable and effective.", author: "Mohd Aamish Aftab", role: "Founder - The Collabhub", color: "pink" },
  { quote: "Out of 149 leads, 147 are highly valid. Only 2 bounced. Considering how niche the Japanese market is, this is excellent.", author: "Lead Generation Client", role: "Business Development", color: "amber" },
];

const sectors = [
  { icon: "💼", label: "B2B Services", color: "emerald" },
  { icon: "🏠", label: "Real Estate", color: "blue" },
  { icon: "🛍️", label: "E-Commerce", color: "violet" },
  { icon: "💻", label: "IT & SaaS", color: "cyan" },
  { icon: "🧴", label: "Beauty & Cosmetics", color: "pink" },
  { icon: "👞", label: "Fashion & Apparel", color: "orange" },
  { icon: "🎯", label: "Marketing", color: "teal" },
  { icon: "🍽️", label: "Hospitality", color: "amber" },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="testimonial-card flex flex-col h-full">
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, j) => (
            <Star key={j} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
          ))}
        </div>
        <Quote className="w-10 h-10 text-white/10 mb-3" />
        <p className="text-base md:text-lg text-white/90 leading-relaxed flex-grow mb-5">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div className="pt-5 border-t border-white/10 mt-auto">
          <p className="font-semibold text-white mb-1">{t.author}</p>
          <p className={`text-sm text-${t.color}-400 font-medium`}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackView() {
  const setView = useAppStore((s) => s.setView);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

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
              Client Success Stories
            </div>
            <h1 className="heading-display mb-5 md:mb-6">
              <span className="block text-white">What Our</span>
              <span className="block gradient-text-enhanced mt-2 md:mt-3">Clients Say</span>
            </h1>
            <motion.div
              className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <p className="text-body-lg max-w-2xl mx-auto text-white/80 px-4 md:px-0">
              Real feedback from businesses we&apos;ve helped achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing">
        <div className="container-custom">
          {/* Mobile: swipe */}
          <div className="md:hidden relative">
            <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">Swipe to read more →</p>
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
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 snap-start"
                    style={{ width: "min(85vw, 320px)" }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                  >
                    <TestimonialCard t={t} />
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scroll(1)}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {testimonials.map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
                className="group"
              >
                <motion.div
                  className="testimonial-card flex flex-col h-full"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div className={`absolute -inset-1 bg-gradient-to-r from-${t.color}-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <motion.div key={j} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + j * 0.1 }}>
                          <Star className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                        </motion.div>
                      ))}
                    </div>
                    <Quote className="w-12 h-12 text-white/10 mb-4" />
                    <p className="text-lg text-white/90 leading-relaxed flex-grow mb-6">&ldquo;{t.quote}&rdquo;</p>
                    <div className="pt-6 border-t border-white/10 mt-auto">
                      <p className="font-semibold text-white mb-1">{t.author}</p>
                      <p className={`text-sm text-${t.color}-400 font-medium`}>{t.role}</p>
                    </div>
                    <div className={`absolute top-6 right-6 w-16 h-16 rounded-full bg-${t.color}-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
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
              Industries We Serve
            </div>
            <h2 className="heading-xl text-white mb-4">Trusted Across Sectors</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="group"
              >
                <motion.div
                  className="feature-card-premium text-center py-5 md:py-6"
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-br from-${sector.color}-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="text-4xl md:text-5xl mb-3 inline-block"
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {sector.icon}
                    </motion.div>
                    <h3 className={`font-semibold text-white group-hover:text-${sector.color}-400 transition-colors text-sm md:text-base`}>
                      {sector.label}
                    </h3>
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
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            >
              <Award className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
            </motion.div>
            <h2 className="heading-xl mb-5 md:mb-6">
              <span className="text-white">Ready to Write Your</span>
              <span className="block gradient-text-enhanced mt-2">Success Story?</span>
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80">
              Join hundreds of businesses that turned their data challenges into growth opportunities.
            </p>
            <motion.button
              onClick={() => setView("contact")}
              className="btn-primary-premium group w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Let&apos;s Talk Growth
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}