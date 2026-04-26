"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useAppStore } from "@/store/appStore";
import {
  Star, Quote, ArrowRight, Sparkles,
  Award, Users, ChevronLeft, ChevronRight,
} from "lucide-react";

// ─── Shared animation config ─────────────────────────────────────────────────
const FADE_UP = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  { quote: "Remarketix delivered exactly what we needed — accurate leads, on time.",                                                                                          author: "B2B Project Client",       role: "Marketing Director",   color: "emerald" },
  { quote: "We were impressed by the accuracy of their data and the quick turnaround time.",                                                                                  author: "U.S. E-commerce Company",  role: "VP of Sales",           color: "blue"    },
  { quote: "Fast, reliable, and highly accurate data for our campaigns.",                                                                                                     author: "UK Hospitality Project",   role: "Operations Lead",       color: "violet"  },
  { quote: "Working with Remarketix was a great experience. They were meticulous in their work, had a direct approach, and delivered impressive results.",                    author: "Joshua Austin",            role: "Founder of Bluvise",    color: "cyan"    },
  { quote: "Amazing experience! Excellent post creation and super smooth LinkedIn and Instagram handling. Truly reliable and effective.",                                     author: "Mohd Aamish Aftab",        role: "Founder - The Collabhub",color: "pink"    },
  { quote: "Out of 149 leads, 147 are highly valid. Only 2 bounced. Considering how niche the Japanese market is, this is excellent.",                                       author: "Lead Generation Client",   role: "Business Development",  color: "amber"   },
];

const sectors = [
  { icon: "💼", label: "B2B Services",      color: "emerald" },
  { icon: "🏠", label: "Real Estate",       color: "blue"    },
  { icon: "🛍️", label: "E-Commerce",       color: "violet"  },
  { icon: "💻", label: "IT & SaaS",         color: "cyan"    },
  { icon: "🧴", label: "Beauty & Cosmetics",color: "pink"    },
  { icon: "👞", label: "Fashion & Apparel", color: "orange"  },
  { icon: "🎯", label: "Marketing",         color: "teal"    },
  { icon: "🍽️", label: "Hospitality",      color: "amber"   },
];

// Sector color accent map
const sectorAccent: Record<string, string> = {
  emerald: "group-hover:text-emerald-400",
  blue:    "group-hover:text-blue-400",
  violet:  "group-hover:text-violet-400",
  cyan:    "group-hover:text-cyan-400",
  pink:    "group-hover:text-pink-400",
  orange:  "group-hover:text-orange-400",
  teal:    "group-hover:text-teal-400",
  amber:   "group-hover:text-amber-400",
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="flex flex-col h-full p-6 md:p-8 rounded-2xl md:rounded-3xl
                 bg-white/[0.03] border border-white/10 relative overflow-hidden
                 group transition-transform duration-300 ease-out
                 hover:-translate-y-1.5 will-change-transform"
    >
      <div className={`absolute -inset-1 bg-gradient-to-r from-${t.color}-500/15
                       to-transparent rounded-3xl opacity-0 group-hover:opacity-100
                       transition-opacity duration-400 pointer-events-none`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex gap-1 mb-6">
          {[0,1,2,3,4].map((j) => (
            <Star key={j} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
          ))}
        </div>

        <Quote className="w-10 h-10 text-white/10 mb-4 flex-shrink-0" />

        <p className="text-base md:text-lg text-white/90 leading-relaxed flex-grow mb-6">
          &ldquo;{t.quote}&rdquo;
        </p>

        <div className="pt-5 border-t border-white/10 mt-auto">
          <p className="font-semibold text-white mb-0.5">{t.author}</p>
          <p className={`text-sm text-${t.color}-400 font-medium`}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Sector Card ──────────────────────────────────────────────────────────────
function SectorCard({ sector }: { sector: typeof sectors[0] }) {
  const accent = sectorAccent[sector.color] ?? "group-hover:text-white";
  return (
    <div
      className="feature-card-premium text-center py-5 md:py-6 group cursor-default
                 transition-transform duration-300 ease-out
                 hover:-translate-y-2 will-change-transform"
    >
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl mb-3 inline-block
                        transition-transform duration-300 ease-out
                        group-hover:scale-110">
          {sector.icon}
        </div>
        <h3 className={`font-semibold text-white transition-colors duration-200 text-sm md:text-base ${accent}`}>
          {sector.label}
        </h3>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FeedbackView() {
  const setView         = useAppStore((s) => s.setView);
  const scrollRef       = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersRM       = useReducedMotion();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const noAnim = prefersRM || isMobile;

  const scroll = (dir: number) =>
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="flex flex-col min-h-screen">

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {!noAnim && (
          <>
            <div
              className="absolute top-0 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(16,185,129,0.10), transparent 70%)",
                filter: "blur(80px)",
                willChange: "transform",
                animation: "fb-blob-1 18s ease-in-out infinite",
              }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.09), transparent 70%)",
                filter: "blur(80px)",
                willChange: "transform",
                animation: "fb-blob-2 22s ease-in-out infinite",
              }}
            />
          </>
        )}
      </div>

      <style>{`
        @keyframes fb-blob-1 {
          0%,100% { transform: translate(0,0) scale(1);      }
          50%      { transform: translate(30px,-20px) scale(1.1); }
        }
        @keyframes fb-blob-2 {
          0%,100% { transform: translate(0,0) scale(1);      }
          50%      { transform: translate(-25px,25px) scale(1.08); }
        }
      `}</style>

      {/* ── Hero — ✅ FIXED: pt-16 md:pt-20 ── */}
      <section className="relative section-spacing pt-16 md:pt-20">
        <div className="container-custom relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="badge-glow mx-auto mb-6 md:mb-8">
              <Sparkles className="w-4 h-4" />
              Client Success Stories
            </div>

            <h1 className="heading-display mb-5 md:mb-6">
              <span className="block text-white">What Our</span>
              <span className="block gradient-text-enhanced mt-2 md:mt-3">Clients Say</span>
            </h1>

            <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8" />

            <p className="text-body-lg max-w-2xl mx-auto text-white/80 px-4 md:px-0">
              Real feedback from businesses we&apos;ve helped achieve their goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-spacing pt-0">
        <div className="container-custom px-4">

          {/* Mobile */}
          <div className="md:hidden relative">
            <p className="text-center text-white/40 text-xs mb-4 tracking-wider uppercase">
              Swipe to read more →
            </p>
            <div className="relative">
              <button
                onClick={() => scroll(-1)}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
                           bg-black/40 backdrop-blur-sm border border-white/20
                           flex items-center justify-center touch-manipulation"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-shrink-0 snap-center" style={{ width: "min(85vw, 320px)" }}>
                    <TestimonialCard t={t} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll(1)}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full
                           bg-black/40 backdrop-blur-sm border border-white/20
                           flex items-center justify-center touch-manipulation"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="section-spacing bg-white/[0.02]">
        <div className="container-custom px-4">
          <motion.div {...FADE_UP} className="text-center mb-6 md:mb-10">
            <div className="badge mx-auto mb-4">
              <Users className="w-4 h-4" />
              Industries We Serve
            </div>
            <h2 className="heading-xl text-white mb-4">Trusted Across Sectors</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {sectors.map((sector) => (
              <SectorCard key={sector.label} sector={sector} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing">
        <div className="container-custom px-4 md:px-6">
          <motion.div
            {...FADE_UP}
            className="card-glass-premium max-w-3xl mx-auto text-center p-5 md:p-8"
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl
                         bg-gradient-to-br from-emerald-500/20 to-cyan-500/20
                         border border-emerald-500/30 flex items-center justify-center
                         transition-transform duration-500 ease-out hover:rotate-12 hover:scale-105"
            >
              <Award className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
            </div>

            <h2 className="heading-xl mb-5 md:mb-6">
              <span className="text-white">Ready to Write Your</span>
              <span className="block gradient-text-enhanced mt-2">Success Story?</span>
            </h2>

            <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-10 text-white/80">
              Join hundreds of businesses that turned their data challenges into growth opportunities.
            </p>

            <button
              onClick={() => setView("contact")}
              className="btn-primary-premium group w-full sm:w-auto
                         transition-transform duration-200 ease-out
                         hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Let&apos;s Talk Growth
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}