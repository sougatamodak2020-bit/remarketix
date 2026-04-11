"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { Shield, Lock, Eye, Database, Cookie, ExternalLink, User, Mail, Phone, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    content: [
      "Name, email address and contact details",
      "Company information",
      "Information submitted through forms or inquiries",
      "Usage data such as IP address, browser type and pages visited",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    content: [
      "Respond to inquiries and provide services",
      "Improve our website and services",
      "Communicate updates, offers or relevant information",
      "Deliver requested data, outreach or marketing services",
    ],
  },
  {
    icon: Shield,
    title: "Data Sharing",
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    content: [
      "We do not sell your personal information",
      "We may share data with trusted third-party tools or service providers only when necessary to deliver our services, such as email platforms, CRM systems or analytics tools",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    content: [
      "We implement reasonable security measures to protect your data from unauthorized access, loss or misuse",
      "However, no method of transmission over the internet is completely secure",
    ],
  },
  {
    icon: Cookie,
    title: "Cookies and Tracking",
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
    content: [
      "Our website may use cookies to enhance user experience and analyze website traffic",
      "You can disable cookies through your browser settings",
    ],
  },
  {
    icon: ExternalLink,
    title: "Third-Party Links",
    color: "rose",
    gradient: "from-rose-500 to-rose-600",
    content: [
      "Our website may contain links to external websites",
      "We are not responsible for the privacy practices of those websites",
    ],
  },
  {
    icon: User,
    title: "Your Rights",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    content: [
      "Access your data",
      "Update or correct your information",
      "Request deletion of your data",
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

export default function PrivacyPolicyView() {
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
              className="absolute top-0 right-1/4 w-[500px] h-[500px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(16,185,129,0.12),transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-1/4 w-[400px] h-[400px]"
              style={{
                background: "radial-gradient(ellipse 50% 50% at 50% 50%,rgba(59,130,246,0.1),transparent 70%)",
                filter: "blur(100px)",
              }}
              animate={{ x: [0, -40, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">Legal</span>
            </motion.div>

            <h1 className="heading-display mb-6">
              <span className="block text-white">Privacy</span>
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <motion.div
              className="h-1.5 w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <p className="text-body-lg text-white/70 mb-4">
              Effective Date: <span className="text-white font-semibold">April 2025</span>
            </p>

            <p className="text-body-lg text-white/80 leading-relaxed">
              Remarketix values your privacy and is committed to protecting your personal information.
              This Privacy Policy explains how we collect, use and safeguard your data when you visit
              our website or use our services.
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
                    className="feature-card-premium p-8"
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
                        <ul className="space-y-3">
                          {section.content.map((item, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 + idx * 0.05 }}
                            >
                              <CheckCircle2 className={`w-5 h-5 ${c.text} flex-shrink-0 mt-0.5`} />
                              <span className="text-body-sm text-white/70 leading-relaxed">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
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
              className="feature-card-premium p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="heading-sm text-white mb-3">8. Changes to This Policy</h3>
                  <p className="text-body-sm text-white/70 leading-relaxed">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page.
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
              className="card-glass-premium p-8 md:p-12 text-center"
            >
              <h3 className="heading-xl mb-6">
                <span className="text-white">Have Questions About Your</span>
                <span className="block mt-2 gradient-text-enhanced">Privacy?</span>
              </h3>
              <p className="text-body-lg text-white/70 mb-8 max-w-2xl mx-auto">
                If you have any questions regarding this Privacy Policy, please contact us:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:info@remarketix.in"
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
                >
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">info@remarketix.in</span>
                </a>
                <a
                  href="tel:+918759839140"
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                >
                  <Phone className="w-5 h-5 text-cyan-400" />
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