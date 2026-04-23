"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Heart, ExternalLink, LogIn } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 text-sm py-2 w-full text-left rounded-lg hover:bg-white/[0.02] px-2 -mx-2"
    >
      {label}
      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
    </button>
  );
}

export default function Footer() {
  const { setView, user } = useAppStore();
  const currentYear = new Date().getFullYear();

  // FIX #18: Listen for custom event to navigate home
  useEffect(() => {
    const handleNavHome = () => {
      setView("home");
    };
    window.addEventListener("navigate-to-home", handleNavHome);
    return () => window.removeEventListener("navigate-to-home", handleNavHome);
  }, [setView]);

  const nav = (id: ViewId) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CO = [
    { label: "About Us", id: "about" as ViewId },
    { label: "Services", id: "services" as ViewId },
    { label: "Our Work", id: "casestudies" as ViewId },
    { label: "Pricing", id: "pricing" as ViewId },
  ];

  const RES = [
    { label: "Case Studies", id: "casestudies" as ViewId },
    { label: "Reviews", id: "feedback" as ViewId },
    { label: "Contact", id: "contact" as ViewId },
    { label: "Get Started", id: "contact" as ViewId },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.012]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              {/* FIX #19: Replace text with logo */}
              <motion.button
                onClick={() => nav("home")}
                className="mb-6 inline-block group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png"
                  alt="Remarketix"
                  width={140}
                  height={42}
                  className="h-auto w-auto max-h-10 transition-all duration-300"
                />
              </motion.button>

              <p className="text-slate-400 leading-relaxed mb-8 max-w-sm text-[15px]">
                Your B2B growth partner. We help businesses scale through strategic data, outreach, content and digital execution.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href="mailto:info@remarketix.in"
                  className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 min-w-[36px] rounded-xl bg-emerald-500/8 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/15 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-[14px] break-all group-hover:translate-x-0.5 transition-transform">
                    info@remarketix.in
                  </span>
                </a>

                <a
                  href="tel:+918759839140"
                  className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 min-w-[36px] rounded-xl bg-cyan-500/8 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
                    <Phone className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className="text-[14px] group-hover:translate-x-0.5 transition-transform">
                    +91 8759839140
                  </span>
                </a>

                <div className="flex items-start gap-3 text-slate-400">
                  <div className="w-9 h-9 min-w-[36px] rounded-xl bg-blue-500/8 border border-blue-500/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[14px] leading-snug pt-0.5">
                    Ecospace Business Park, Newtown <br />
                    Kolkata, 700156, India
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                Company
              </h3>
              <ul className="space-y-0.5">
                {CO.map((l) => (
                  <FooterLink key={l.id + l.label} label={l.label} onClick={() => nav(l.id)} />
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                Resources
              </h3>
              <ul className="space-y-0.5">
                {RES.map((l) => (
                  <FooterLink key={l.id + l.label} label={l.label} onClick={() => nav(l.id)} />
                ))}
              </ul>
            </motion.div>

            {/* Account + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sm:col-span-2 lg:col-span-4 space-y-10"
            >
              {/* Account Section */}
              <div>
                <h3 className="text-white font-bold text-[11px] uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  Account
                </h3>
                {!user ? (
                  <div>
                    <motion.button
                      onClick={() => nav("auth" as ViewId)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-6 py-3.5 rounded-xl border border-emerald-500/25 bg-gradient-to-r from-emerald-500/8 to-cyan-500/8 hover:from-emerald-500/15 hover:to-cyan-500/15 hover:border-emerald-500/40 transition-all duration-300 w-full md:w-auto overflow-hidden"
                    >
                      <span className="relative flex items-center gap-3">
                        <LogIn className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[15px] font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                          Sign In
                        </span>
                      </span>
                    </motion.button>
                    <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                      Access your dashboard, manage campaigns and track results in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="px-5 py-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
                    <p className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      You&apos;re signed in.{" "}
                      <button
                        onClick={() => nav("contact" as ViewId)}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors underline underline-offset-2"
                      >
                        Contact us
                      </button>
                    </p>
                  </div>
                )}
              </div>

              {/* Social Section */}
              <div>
                <h3 className="text-white font-bold text-[11px] uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                  Connect
                </h3>
                <div className="flex gap-3">
                  <motion.a
                    href="https://www.linkedin.com/company/remarketix-research-insight/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="Follow us on LinkedIn"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border bg-[#0077B5]/8 border-[#0077B5]/20 hover:bg-[#0077B5]/15 hover:border-[#0077B5]/40 text-[#0A66C2] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(10,102,194,0.25)]"
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </motion.a>

                  <motion.a
                    href="https://wa.me/918759839140"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="Chat on WhatsApp"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border bg-[#25D366]/8 border-[#25D366]/20 hover:bg-[#25D366]/15 hover:border-[#25D366]/40 text-[#25D366] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.25)]"
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-500 text-[13px] flex items-center gap-2 order-3 md:order-1"
            >
              © {currentYear} Remarketix. Made with
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              All rights reserved.
            </motion.p>

            <div className="flex items-center gap-6 text-[13px] order-2">
              <motion.button
                onClick={() => nav("privacy" as ViewId)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
              >
                <span className="group-hover:underline underline-offset-2">Privacy Policy</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </motion.button>

              <motion.button
                onClick={() => nav("terms" as ViewId)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
              >
                <span className="group-hover:underline underline-offset-2">Terms of Service</span>
                <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm" />
      </div>
    </footer>
  );
}