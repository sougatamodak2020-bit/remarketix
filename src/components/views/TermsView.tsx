"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { FileText, Briefcase, CreditCard, TrendingUp, Database, Copyright, Lock, Ban, AlertCircle, Mail, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  {
    icon: Briefcase,
    title: "Services",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    content: [
      "Remarketix provides services including but not limited to:",
      "• Lead generation and data research",
      "• Outreach and marketing campaigns",
      "• Content creation and digital services",
      "All services are delivered based on agreed scope, requirements and timelines.",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Client Responsibilities",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    content: [
      "Clients agree to:",
      "• Provide accurate and complete information",
      "• Review and approve deliverables in a timely manner",
      "• Use provided data and services in compliance with applicable laws and regulations",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    content: [
      "• Pricing is based on agreed scope and service requirements",
      "• Payments must be made as per agreed terms or invoices",
      "• Delayed payments may result in delay or suspension of services",
    ],
  },
  {
    icon: TrendingUp,
    title: "Service Outcomes",
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    content: [
      "We focus on delivering high-quality execution across data, outreach, content and digital services to support your business growth.",
      "While results such as conversions, responses and revenue may vary based on factors like market conditions, targeting and client-side processes, our approach is designed to improve performance, consistency and overall effectiveness.",
    ],
  },
  {
    icon: Database,
    title: "Data Usage",
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
    content: [
      "Data provided by Remarketix is intended for business use such as outreach, research and marketing.",
      "Clients are responsible for ensuring that their use of data complies with applicable data protection and communication laws.",
    ],
  },
  {
    icon: Copyright,
    title: "Intellectual Property",
    color: "rose",
    gradient: "from-rose-500 to-rose-600",
    content: [
      "All materials created by Remarketix remain our property until full payment is received.",
      "Upon full payment, usage rights are transferred to the client unless otherwise agreed in writing.",
    ],
  },
  {
    icon: Lock,
    title: "Confidentiality",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    content: [
      "Both parties agree to keep any shared business, project or proprietary information confidential and not disclose it to third parties without consent.",
    ],
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    content: [
      "Remarketix shall not be liable for any indirect, incidental or consequential damages arising from the use of our services.",
    ],
  },
  {
    icon: Ban,
    title: "Termination",
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    content: [
      "We reserve the right to suspend or terminate services if:",
      "• Terms are violated",
      "• Payments are not made",
      "• Services are misused",
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", gradient: "from-emerald-500 to-emerald-600" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", gradient: "from-blue-500 to-blue-600" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-400", gradient: "from-violet-500 to-violet-600" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", gradient: "from-cyan-500 to-cyan-600" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", gradient: "from-amber-500 to-amber-600" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", gradient: "from-rose-500 to-rose-600" },
};

export default function TermsView() {
  const setView = useAppStore((s) => s.setView);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {!prefersReducedMotion && !isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-1/4 w-[500px] h-[500px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(139,92,246,0.12),transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[400px] h-[400px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.1),transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>

      {/* Hero Section — ✅ FIXED: pt-20 md:pt-24 */}
      <section className="relative pt-14 md:pt-16 pb-10 md:pb-14">
        <div className="container-custom relative z-10 px-4">
          <motion.button
            onClick={() => setView("home")}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Back to Home</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-violet-400">Legal Agreement</span>
            </motion.div>

            <h1 className="heading-display mb-6">
              <span className="block text-white">Terms of</span>
              <span className="block mt-2 bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>

            <motion.div
              className="h-1.5 w-32 mx-auto bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 rounded-full mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <p className="text-body-lg text-white/70 mb-4">
              Effective Date: <span className="text-white font-semibold">April 2025</span>
            </p>

            <p className="text-body-lg text-white/80 leading-relaxed">
              These Terms of Service govern your use of the Remarketix website and services.
              By using our website or engaging our services, you agree to these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="section-spacing relative">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {sections.map((section, i) => {
              const c = colorMap[section.color];
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <motion.div
                    className="feature-card-premium p-5 md:p-6"
                    whileHover={!isMobile ? { y: -6, scale: 1.01 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-opacity`} />
                        <div className={`relative w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                          <section.icon className={`w-7 h-7 ${c.text}`} />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="heading-sm text-white mb-4 flex items-center gap-2">
                          <span className="text-2xl font-bold">{i + 1}.</span>
                          {section.title}
                        </h3>
                        <div className="space-y-3">
                          {section.content.map((item, idx) => (
                            <motion.p
                              key={idx}
                              className="text-body-sm text-white/70 leading-relaxed"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 + idx * 0.05 }}
                            >
                              {item}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Changes Section */}
      <section className="section-spacing-sm relative">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="feature-card-premium p-5 md:p-6"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="heading-sm text-white mb-3">10. Changes to Terms</h3>
                  <p className="text-body-sm text-white/70 leading-relaxed">
                    We may update these Terms from time to time. Continued use of our services indicates acceptance of the updated terms.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing-sm relative">
        <div className="container-custom px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass-premium p-5 md:p-7 text-center"
            >
              <h3 className="heading-xl mb-6">
                <span className="text-white">Questions About Our</span>
                <span className="block mt-2 gradient-text-enhanced">Terms?</span>
              </h3>
              <p className="text-body-lg text-white/70 mb-8 max-w-2xl mx-auto">
                For any questions regarding these Terms, please contact us:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:info@remarketix.in"
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all"
                >
                  <Mail className="w-5 h-5 text-violet-400" />
                  <span className="text-sm font-semibold text-white">info@remarketix.in</span>
                </a>
                <a
                  href="tel:+918759839140"
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all"
                >
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-semibold text-white">+91 8759839140</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}