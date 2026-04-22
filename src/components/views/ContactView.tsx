"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Sparkles, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const contactInfo = [
  {
    icon: MapPin,
    color: "emerald",
    title: "Office",
    content: "Ecospace Business Park, Newtown\nKolkata, 700156, India",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Phone,
    color: "blue",
    title: "Phone",
    content: "+91 8759839140",
    href: "tel:+918759839140",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Mail,
    color: "violet",
    title: "Email",
    content: "info@remarketix.in",
    href: "mailto:info@remarketix.in",
    gradient: "from-violet-500 to-violet-600",
  },
];

export default function ContactView() {
  const [sent, setSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // FIX #18: Handle browser back button properly
  useEffect(() => {
    // Push a new history state when component mounts
    const initialState = { page: 'contact', timestamp: Date.now() };
    window.history.pushState(initialState, '');

    const handlePopState = (event: PopStateEvent) => {
      // If we're on contact page and back is pressed, go to home
      if (window.location.hash.includes('contact') || document.title.includes('Contact')) {
        // Navigate to home view
        const homeEvent = new CustomEvent('navigate-to-home');
        window.dispatchEvent(homeEvent);
        // Also try direct scroll
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const shouldReduceMotion = prefersReducedMotion || isMobile;

  return (
    <div className="relative min-h-screen">
      {/* Background - Static on mobile */}
      {!shouldReduceMotion &&
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, ${i === 0 ? "rgba(16, 185, 129, 0.1)" : i === 1 ? "rgba(59, 130, 246, 0.1)" : "rgba(139, 92, 246, 0.1)"}, transparent 70%)`,
              filter: "blur(80px)",
              top: `${5 + i * 30}%`,
              left: `${5 + i * 25}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}

      <div className="relative z-10 container-custom section-spacing px-4 md:px-6 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="badge-glow mx-auto mb-6 md:mb-8">
            <Sparkles className="w-4 h-4" />
            Let&apos;s Connect
          </div>
          <h1 className="heading-display mb-5 md:mb-6">
            <span className="block text-white">Get in</span>
            <span className="block gradient-text-enhanced mt-2 md:mt-3">
              Touch
            </span>
          </h1>
          <motion.div
            className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full mb-6 md:mb-8"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-body-lg max-w-2xl mx-auto text-white/80">
            Ready to scale your business? Drop us a message and we&apos;ll craft
            a tailored growth strategy for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 md:space-y-6"
          >
            <h2 className="heading-md text-white mb-6 md:mb-8">
              Contact Information
            </h2>

            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group"
              >
                <motion.div
                  className="feature-card-premium flex items-start gap-4"
                  whileHover={!isMobile ? { x: 3, scale: 1.01 } : {}}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500 blur-xl`}
                  />
                  <div className="relative z-10 flex items-start gap-4 w-full">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${info.gradient} opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 border border-${info.color}-500/30`}
                      whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon
                        className={`w-6 h-6 text-${info.color}-400`}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-white mb-1.5">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={`text-white/60 hover:text-${info.color}-400 active:text-${info.color}-400 transition-colors whitespace-pre-line block text-sm md:text-base touch-manipulation`}
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-white/60 whitespace-pre-line text-sm md:text-base">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="feature-card-premium mt-4 md:mt-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Business Hours</h4>
              </div>
              <div className="text-white/60 text-sm space-y-1">
                <p>Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                <p>Saturday: 10:00 AM – 4:00 PM IST</p>
                <p>Sunday: Closed</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                className="card-glass-premium p-8 md:p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-emerald-400" />
                </motion.div>
                <h3 className="heading-md text-white mb-4">Message Sent!</h3>
                <p className="text-body-lg text-white/70 mb-6">
                  Thank you for reaching out. We&apos;ll get back to you with a
                  tailored growth strategy within 24 hours.
                </p>
                <motion.button
                  onClick={() => setSent(false)}
                  className="btn-secondary-premium w-full sm:w-auto touch-manipulation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form
                className="card-glass-premium p-6 md:p-8 lg:p-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <h2 className="heading-md text-white mb-6 md:mb-8">
                  Send us a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 md:mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="John"
                      required
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2 md:mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Doe"
                      required
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                </div>

                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-white/70 mb-2 md:mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="john@company.com"
                    required
                    style={{ fontSize: "16px" }}
                  />
                </div>

                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-white/70 mb-2 md:mb-3">
                    Company / Website
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="www.yourcompany.com"
                    style={{ fontSize: "16px" }}
                  />
                </div>

                <div className="mb-6 md:mb-8">
                  <label className="block text-sm font-medium text-white/70 mb-2 md:mb-3">
                    How can we help?
                  </label>
                  <textarea
                    rows={5}
                    className="input resize-none w-full"
                    placeholder="Tell us about your goals and challenges..."
                    required
                    style={{ fontSize: "16px" }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary-premium w-full group touch-manipulation"
                  whileHover={!isMobile ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}