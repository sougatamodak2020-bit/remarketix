"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import Image from "next/image";
import { Home, Briefcase, FolderKanban, LineChart, Tag, MessageCircle, Users, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_ITEMS: { id: ViewId; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "casestudies", label: "Cases", icon: LineChart },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "feedback", label: "Reviews", icon: MessageCircle },
  { id: "about", label: "About", icon: Users },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const { activeView, setView } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const handleNavigation = (id: ViewId) => {
    setView(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
      {/* ===== NAVBAR - MATCHES WEBSITE BACKGROUND ===== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] pt-4 px-4 md:pt-6 md:px-6"
      >
        <div className="container-custom">
          {/* Glass container with WEBSITE background colors (no blue tint) */}
          <motion.div
            className={`nav-bar-matched no-scrollbar overflow-hidden transition-all duration-300 rounded-2xl border ${
              isScrolled 
                ? "py-2 px-3" 
                : "py-3 px-4"
            }`}
            animate={{
              backdropFilter: isScrolled ? "blur(16px)" : "blur(20px)",
            }}
          >
            <div className="flex items-center justify-between gap-2 px-1">
              {/* Logo */}
              <motion.button
                onClick={() => handleNavigation("home")}
                className="flex-shrink-0 p-1.5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go to home"
              >
                <Image
                  src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png"
                  alt="Remarketix"
                  width={120}
                  height={36}
                  className="h-auto w-auto transition-all duration-300 max-h-7 sm:max-h-8"
                  unoptimized
                  priority
                />
              </motion.button>

              {/* Desktop Nav Items */}
              <div className="hidden md:flex items-center gap-0.5">
                {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => handleNavigation(id)}
                    className={`nav-item-matched flex-shrink-0 relative px-3 py-2.5 rounded-xl transition-all duration-200 min-h-[44px] ${
                      activeView === id 
                        ? "text-emerald-400" 
                        : "text-white/70 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Minimal active indicator */}
                    {activeView === id && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{label}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={toggleMobileMenu}
                className="md:hidden flex-shrink-0 p-2.5 rounded-xl text-white/80 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* ===== MOBILE MENU - MATCHES WEBSITE BACKGROUND ===== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Subtle backdrop for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[95] bg-[#030712] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel - Website background matched */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] left-4 right-4 z-[96] md:hidden"
            >
              <div className="nav-bar-matched rounded-2xl border border-white/10 p-3 shadow-2xl">
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map(({ id, label, icon: Icon }, index) => (
                    <motion.button
                      key={id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(id)}
                      className={`nav-item-mobile flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 min-h-[48px] ${
                        activeView === id 
                          ? "text-emerald-400" 
                          : "text-white/80 hover:text-white"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-base">{label}</span>
                      {activeView === id && (
                        <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}