"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Heart, ExternalLink, LogIn } from "lucide-react";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm py-1 w-full text-left"
      >
        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400 flex-shrink-0" />
        {label}
      </button>
    </li>
  );
}

export default function Footer() {
  const { setView, user } = useAppStore();
  const currentYear = new Date().getFullYear();

  const nav = (id: ViewId) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CO = [
    { label: "About Us", id: "about" as ViewId },
    { label: "Services", id: "services" as ViewId },
    { label: "Our Work", id: "casestudies" as ViewId },
    { label: "Projects", id: "projects" as ViewId },
  ];
  const RES = [
    { label: "Pricing Plans", id: "pricing" as ViewId },
    { label: "Reviews", id: "feedback" as ViewId },
    { label: "Contact", id: "contact" as ViewId },
    { label: "About", id: "about" as ViewId },
  ];

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.015]" />
      </div>
      <div className="container-custom relative z-10">
        <div className="py-14 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              <button onClick={() => nav("home")} className="mb-5 inline-block group">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  Remarketix
                </span>
              </button>
              <p className="text-white/55 leading-relaxed mb-6 max-w-sm text-sm">
                A B2B growth partner helping businesses scale through data, outreach, content and digital execution.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:info@remarketix.in"
                  className="flex items-center gap-3 text-white/55 hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-8 h-8 min-w-[32px] rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm break-all">info@remarketix.in</span>
                </a>
                <a
                  href="tel:+918759839140"
                  className="flex items-center gap-3 text-white/55 hover:text-cyan-400 transition-colors group"
                >
                  <div className="w-8 h-8 min-w-[32px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 8759839140</span>
                </a>
                <div className="flex items-start gap-3 text-white/50">
                  <div className="w-8 h-8 min-w-[32px] rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm leading-snug">
                    Ecospace Business Park, Newtown
                    <br />
                    Kolkata, 700156, India
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                Company
              </h3>
              <ul className="space-y-1">
                {CO.map((l) => (
                  <FooterLink key={l.id + l.label} label={l.label} onClick={() => nav(l.id)} />
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                Resources
              </h3>
              <ul className="space-y-1">
                {RES.map((l) => (
                  <FooterLink key={l.id} label={l.label} onClick={() => nav(l.id)} />
                ))}
              </ul>
            </motion.div>

            {/* Account + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sm:col-span-2 lg:col-span-4 space-y-8"
            >
              <div>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  Account
                </h3>
                {!user ? (
                  <>
                    <button
                      onClick={() => nav("auth" as ViewId)}
                      className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/8 hover:bg-emerald-500/15 hover:border-emerald-500/50 transition-all touch-manipulation w-full md:w-auto"
                    >
                      <LogIn className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm font-bold text-emerald-400">Sign In to Your Account</span>
                    </button>
                    <p className="text-xs text-white/30 mt-3 leading-relaxed">
                      Access your dashboard, manage campaigns and track results.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-white/55">
                    You&apos;re signed in.{" "}
                    <button onClick={() => nav("contact" as ViewId)} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      Go to Contact
                    </button>
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                  Connect
                </h3>
                <div className="flex gap-3">
                  <motion.a
                    href="https://www.linkedin.com/company/remarketix-research-insight/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl border bg-[#0077B5]/10 border-[#0077B5]/25 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50 text-[#0A66C2] flex items-center justify-center transition-all"
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <LinkedInIcon className="w-[18px] h-[18px]" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/918759839140"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    title="WhatsApp"
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl border bg-[#25D366]/10 border-[#25D366]/25 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 text-[#25D366] flex items-center justify-center transition-all"
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <WhatsAppIcon className="w-[18px] h-[18px]" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs flex items-center gap-1.5 order-3 md:order-1">
              © {currentYear} Remarketix. Made with
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 flex-shrink-0" />
              All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs order-2">
              <button
                onClick={() => nav("privacy" as ViewId)}
                className="text-white/35 hover:text-white/70 transition-colors flex items-center gap-1"
              >
                Privacy Policy <ExternalLink className="w-3 h-3" />
              </button>
              <button
                onClick={() => nav("terms" as ViewId)}
                className="text-white/35 hover:text-white/70 transition-colors flex items-center gap-1"
              >
                Terms of Service <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent" />
    </footer>
  );
}