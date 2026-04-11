"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart,
  ExternalLink,
} from "lucide-react";

// ─── Brand SVG icons (official colours, no external deps) ─────────────────────
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  company: [
    { label: "About Us",     id: "about"       as ViewId },
    { label: "Services",     id: "services"    as ViewId },
    { label: "Projects",     id: "projects"    as ViewId },
    { label: "Case Studies", id: "casestudies" as ViewId },
  ],
  services: [
    { label: "Lead Generation",    id: "services" as ViewId },
    { label: "Web Development",    id: "services" as ViewId },
    { label: "Content Marketing",  id: "services" as ViewId },
    { label: "Product Advertising",id: "services" as ViewId },
  ],
  resources: [
    { label: "Pricing",  id: "pricing"  as ViewId },
    { label: "Reviews",  id: "feedback" as ViewId },
    { label: "Contact",  id: "contact"  as ViewId },
  ],
};

const SOCIAL_LINKS = [
  {
    Icon: LinkedInIcon,
    href: "https://linkedin.com/company/remarketix",
    label: "LinkedIn",
    bg: "bg-[#0077B5]/10",
    border: "border-[#0077B5]/25",
    hover: "hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50",
    color: "text-[#0A66C2]",
  },
  {
    Icon: InstagramIcon,
    href: "https://instagram.com/remarketix",
    label: "Instagram",
    bg: "bg-[#E1306C]/10",
    border: "border-[#E1306C]/25",
    hover: "hover:bg-[#E1306C]/20 hover:border-[#E1306C]/50",
    color: "text-[#E1306C]",
  },
  {
    Icon: XIcon,
    href: "https://twitter.com/remarketix",
    label: "X (Twitter)",
    bg: "bg-white/5",
    border: "border-white/15",
    hover: "hover:bg-white/10 hover:border-white/30",
    color: "text-white",
  },
  {
    Icon: WhatsAppIcon,
    href: "https://wa.me/918759839140",
    label: "WhatsApp",
    bg: "bg-[#25D366]/10",
    border: "border-[#25D366]/25",
    hover: "hover:bg-[#25D366]/20 hover:border-[#25D366]/50",
    color: "text-[#25D366]",
  },
];

// ─── Reusable nav link ─────────────────────────────────────────────────────────
function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex items-center gap-1.5 text-white/50 hover:text-white transition-colors duration-200 text-sm py-1 w-full text-left"
      >
        <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-emerald-400 flex-shrink-0" />
        {label}
      </button>
    </li>
  );
}

// ─── Main footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  const setView = useAppStore((s) => s.setView);
  const currentYear = new Date().getFullYear();

  const nav = (id: ViewId) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-white/5 overflow-hidden">
      {/* Static background — no animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/4 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.018]" />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Main content ── */}
        <div className="py-14 md:py-18 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* Brand block — 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              {/* Brand name text instead of logo image */}
              <button
                onClick={() => nav("home")}
                className="mb-5 inline-block group"
                aria-label="Go to home"
              >
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  Remarketix
                </span>
              </button>

              <p className="text-white/55 leading-relaxed mb-8 max-w-sm text-sm">
                Data-driven growth partner helping businesses scale with verified data,
                powerful websites, and impactful advertising.
              </p>

              {/* Contact info */}
              <div className="space-y-3.5">
                <a
                  href="mailto:info@remarketix.in"
                  className="flex items-center gap-3 text-white/60 hover:text-emerald-400 transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 min-w-[36px] rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-200 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm break-all">info@remarketix.in</span>
                </a>

                <a
                  href="tel:+918759839140"
                  className="flex items-center gap-3 text-white/60 hover:text-cyan-400 transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 min-w-[36px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-200 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm">+91 8759839140</span>
                </a>

                <div className="flex items-start gap-3 text-white/55">
                  <div className="w-9 h-9 min-w-[36px] rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm leading-snug">
                    Ecospace Business Park, Newtown<br />
                    Kolkata, 700156, India
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Company links — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                Company
              </h3>
              <ul className="space-y-1">
                {FOOTER_LINKS.company.map((link) => (
                  <FooterLink key={link.id + link.label} label={link.label} onClick={() => nav(link.id)} />
                ))}
              </ul>
            </motion.div>

            {/* Services links — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                Services
              </h3>
              <ul className="space-y-1">
                {FOOTER_LINKS.services.map((link, i) => (
                  <FooterLink key={i} label={link.label} onClick={() => nav(link.id)} />
                ))}
              </ul>
            </motion.div>

            {/* Resources + Newsletter — 4 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sm:col-span-2 lg:col-span-4 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8"
            >
              {/* Resources */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  Resources
                </h3>
                <ul className="space-y-1">
                  {FOOTER_LINKS.resources.map((link) => (
                    <FooterLink key={link.id} label={link.label} onClick={() => nav(link.id)} />
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0" />
                  Newsletter
                </h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">
                  Get growth tips delivered to your inbox.
                </p>
                <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email"
                    style={{ fontSize: "16px" }}
                    className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-colors duration-200 text-sm"
                  />
                  <motion.button
                    type="submit"
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-white transition-shadow duration-200 hover:shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 group text-sm min-h-[44px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06] py-7">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-4">

            {/* Copyright */}
            <p className="text-white/35 text-xs flex items-center gap-1.5 text-center md:text-left order-3 md:order-1 flex-wrap justify-center md:justify-start">
              © {currentYear} Remarketix. Made with
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 flex-shrink-0" />
              All rights reserved.
            </p>

            {/* Social icons with real brand logos */}
            <div className="flex items-center gap-2.5 order-1 md:order-2">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl border flex items-center justify-center transition-all duration-200 ${s.bg} ${s.border} ${s.hover} ${s.color}`}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <s.Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  <span className="sr-only">{s.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex items-center gap-5 text-xs order-2 md:order-3">
              <button className="text-white/35 hover:text-white/70 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap">
                Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </button>
              <button className="text-white/35 hover:text-white/70 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap">
                Terms of Service
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    </footer>
  );
}