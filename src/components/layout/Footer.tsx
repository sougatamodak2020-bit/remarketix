"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon,
  Share2,
  Globe,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Heart,
  ExternalLink
} from "lucide-react";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", id: "about" as ViewId },
    { label: "Services", id: "services" as ViewId },
    { label: "Projects", id: "projects" as ViewId },
    { label: "Case Studies", id: "casestudies" as ViewId },
  ],
  services: [
    { label: "Lead Generation", id: "services" as ViewId },
    { label: "Web Development", id: "services" as ViewId },
    { label: "Content Marketing", id: "services" as ViewId },
    { label: "Product Advertising", id: "services" as ViewId },
  ],
  resources: [
    { label: "Pricing", id: "pricing" as ViewId },
    { label: "Reviews", id: "feedback" as ViewId },
    { label: "Contact", id: "contact" as ViewId },
  ],
};

const SOCIAL_LINKS = [
  { icon: LinkIcon, href: "https://linkedin.com/company/remarketix", label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: Share2, href: "https://twitter.com/remarketix", label: "Twitter", color: "hover:text-cyan-400" },
  { icon: MessageCircle, href: "https://wa.me/1234567890", label: "WhatsApp", color: "hover:text-green-400" },
  { icon: Globe, href: "https://remarketix.com", label: "Website", color: "hover:text-purple-400" },
];

export default function Footer() {
  const setView = useAppStore((s) => s.setView);
  const currentYear = new Date().getFullYear();

  const handleNavigation = (id: ViewId) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--bg-primary)] border-t border-white/5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-dense opacity-[0.02]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          {/* 
            GRID LAYOUT:
            Mobile: 1 column (grid-cols-1)
            Tablet: 2 columns (sm:grid-cols-2)
            Desktop: 12 columns (lg:grid-cols-12)
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* Brand Section - Spans 4 cols on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-4"
            >
              <motion.div 
                className="mb-6 cursor-pointer inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleNavigation("home")}
              >
                <Image
                  src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png"
                  alt="Remarketix"
                  width={160}
                  height={48}
                  className="h-9 md:h-10 w-auto"
                  unoptimized
                />
              </motion.div>

              <p className="text-white/60 leading-relaxed mb-8 max-w-sm text-sm md:text-base">
                Data-driven growth partner helping businesses scale with verified data, 
                powerful websites, and impactful advertising.
              </p>

              {/* Contact Info - Stacked vertically */}
              <div className="space-y-4">
                <motion.a
                  href="mailto:info@remarketix.in"
                  className="flex items-center gap-3 text-white/70 hover:text-emerald-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 min-w-[40px] rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm md:text-base break-all">info@remarketix.in</span>
                </motion.a>

                <motion.a
                  href="tel:+918759839140"
                  className="flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 min-w-[40px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm md:text-base">+91 8759839140</span>
                </motion.a>

                <motion.div
                  className="flex items-start gap-3 text-white/70"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 min-w-[40px] rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm md:text-base leading-snug">
                    Ecospace Business Park, Newtown<br />
                    Kolkata, 700156, India
                  </span>
                </motion.div>
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
              <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Company
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavigation(link.id)}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base w-full text-left py-1"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Services
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.services.map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavigation(link.id)}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base w-full text-left py-1"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources & Newsletter Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sm:col-span-2 lg:col-span-4 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8"
            >
              {/* Resources */}
              <div>
                <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Resources
                </h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.resources.map((link, i) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavigation(link.id)}
                        className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base w-full text-left py-1"
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                        {link.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  Newsletter
                </h3>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  Get growth tips delivered to your inbox.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm md:text-base min-h-[44px]"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group min-h-[44px] text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-xs md:text-sm flex items-center gap-2 text-center md:text-left order-3 md:order-1"
            >
              © {currentYear} Remarketix. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 fill-red-500" />
              </motion.span>
              All rights reserved.
            </motion.p>

            {/* Social Links - Centered on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 md:gap-3 order-1 md:order-2"
            >
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 ${social.color} transition-all group hover:border-white/20`}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Legal Links - Stacked or hidden on very small screens if needed, but here we keep them flexible */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-xs md:text-sm order-2 md:order-3"
            >
              <button className="text-white/40 hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
                Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </button>
              <button className="text-white/40 hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap">
                Terms of Service
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </footer>
  );
}