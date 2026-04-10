"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import Image from "next/image";
import { Home, Briefcase, FolderKanban, LineChart, Tag, MessageCircle, Users, Mail } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNavigation = (id: ViewId) => {
    setView(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "py-3" : "py-4 md:py-6"
      }`}
    >
      <div className="container-custom">
        <motion.div
          className={`nav-bar-premium no-scrollbar overflow-x-auto transition-all duration-500 ${
            isScrolled ? "nav-bar-scrolled" : ""
          }`}
          animate={{
            backdropFilter: isScrolled ? "blur(24px)" : "blur(12px)",
          }}
        >
          <div className="flex items-center gap-1 px-2">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavigation("home")}
              className="flex-shrink-0 px-3 py-2 mr-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png"
                alt="Remarketix"
                width={120}
                height={36}
                className={`h-auto w-auto transition-all duration-300 ${
                  isScrolled ? "max-h-7" : "max-h-8 md:max-h-9"
                }`}
                unoptimized
                priority
              />
            </motion.button>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent mr-2 flex-shrink-0" />

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => handleNavigation(id)}
                  className={`nav-item-premium flex-shrink-0 relative ${
                    activeView === id ? "active" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active indicator */}
                  {activeView === id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline font-medium">{label}</span>
                  </span>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                    style={{
                      background: "radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%)",
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background blur overlay when scrolled */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(to bottom, rgba(3, 7, 18, 0.95), rgba(3, 7, 18, 0.8))",
          backdropFilter: "blur(20px)",
        }}
      />
    </motion.nav>
  );
}