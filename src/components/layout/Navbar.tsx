"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Home, Briefcase, LineChart, Tag, MessageCircle, Users, Mail, Menu, X, User as UserIcon, Shield, LogOut } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";

const NAV_ITEMS: { id: ViewId; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "casestudies", label: "Cases", icon: LineChart },
  { id: "pricing", label: "Pricing", icon: Tag },
  { id: "feedback", label: "Reviews", icon: MessageCircle },
  { id: "about", label: "About", icon: Users },
  { id: "contact", label: "Contact", icon: Mail },
];

const NavItem = memo(function NavItem({
  id, label, icon: Icon, isActive, onClick,
}: { id: ViewId; label: string; icon: React.ElementType; isActive: boolean; onClick: (id: ViewId) => void; }) {
  return (
    <motion.button onClick={() => onClick(id)} className={`nav-item-matched ${isActive ? "active" : ""}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Icon className="flex-shrink-0 w-[18px] h-[18px] transition-all duration-300" style={{ color: isActive ? '#34d399' : '', filter: isActive ? 'drop-shadow(0 0 8px rgba(52,211,153,0.5))' : '' }} />
      <span className="leading-none flex items-center transition-all duration-300" style={{ background: isActive ? 'linear-gradient(to right, #6ee7b7, #67e8f9, #93c5fd)' : 'transparent', WebkitBackgroundClip: isActive ? 'text' : 'unset', WebkitTextFillColor: isActive ? 'transparent' : 'unset', fontWeight: isActive ? 600 : 500, color: isActive ? 'transparent' : '' }}>{label}</span>
    </motion.button>
  );
});

export default function Navbar() {
  const { activeView, setView, user, userRole, setUser, setUserRole } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isMobileMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [isMobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleNavigation = useCallback((id: ViewId) => {
    setView(id);
    setIsMobileMenuOpen(false);
    if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setView]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null); setUserRole(null); setView("home");
  }, [setUser, setUserRole, setView]);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);

  return (
    <>
      {/* 
        ✅ GUARANTEED FIXED NAVBAR:
        - position: fixed via Tailwind 'fixed' class
        - top-0 left-0 right-0: spans full width at top
        - z-[9999]: highest z-index to stay above all content
        - bg with backdrop-blur: prevents content showing through
      */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[9999] pt-2 px-0 md:pt-3 md:px-0"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          className={`nav-bar-matched ${isScrolled ? "scrolled" : ""}`}
          style={{
            willChange: "transform, opacity, backdrop-filter",
            // Ensure background is solid enough to block scrolling content
            background: isScrolled 
              ? "rgba(10, 14, 26, 0.95)" 
              : "rgba(15, 20, 31, 0.85)",
          }}
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
          
          {/* Ambient glows */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex items-center z-10 w-full">
            {/* LEFT: Logo */}
            <div className="flex w-full justify-start min-w-0">
              <motion.button onClick={() => handleNavigation("home")} className="flex-shrink-0 group relative z-20 ml-4 md:ml-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} aria-label="Go to home">
                <Image src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png" alt="Remarketix" width={140} height={42} className="relative h-auto w-auto transition-all duration-300 max-h-9 sm:max-h-10 md:max-h-11 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" priority quality={90} />
              </motion.button>
            </div>

            {/* MIDDLE: Desktop Nav */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <div className="flex items-center gap-1 px-1 py-1 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                {NAV_ITEMS.map(({ id, label, icon }) => (
                  <NavItem key={id} id={id} label={label} icon={icon} isActive={activeView === id} onClick={handleNavigation} />
                ))}
              </div>
            </div>

            {/* RIGHT: Auth & Toggle */}
            <div className="flex w-full justify-end items-center gap-3 min-w-0 mr-4 md:mr-6">
              <div className="hidden lg:flex items-center gap-3">
                {user && (<div className="flex items-center gap-3">
                  {userRole === "admin" && (<motion.button onClick={() => handleNavigation("admin")} whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} className="group relative px-4 py-2 rounded-xl overflow-hidden border border-blue-500/20 bg-blue-500/5 flex items-center gap-2"><div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><Shield className="relative w-4 h-4 text-blue-400" /><span className="relative text-xs font-bold tracking-wide text-blue-200">Admin</span></motion.button>)}
                  <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" /><UserIcon className="w-4 h-4 text-slate-300" /><span className="text-xs font-medium text-slate-200 max-w-[100px] truncate">{user.email?.split('@')[0]}</span></div>
                  <motion.button onClick={handleSignOut} whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.1)" }} whileTap={{ scale: 0.95 }} className="p-2 rounded-xl border border-white/5 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center justify-center" title="Sign Out"><LogOut className="w-4 h-4" /></motion.button>
                </div>)}
              </div>
              <motion.button onClick={toggleMobileMenu} className="lg:hidden relative p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center overflow-hidden group z-20" whileTap={{ scale: 0.95 }} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>{isMobileMenuOpen ? <X className="relative w-5 h-5 text-white" /> : <Menu className="relative w-5 h-5 text-slate-200" />}</motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">{isMobileMenuOpen && (<>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[9998] bg-[#020617]/60 backdrop-blur-sm lg:hidden" onClick={toggleMobileMenu} />
        <motion.div initial={{ opacity: 0, y: -20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="fixed top-[72px] left-4 right-4 z-[9999] lg:hidden max-h-[calc(100vh-90px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-2xl shadow-2xl shadow-black/50">
          <div className="p-4 space-y-2">
            {NAV_ITEMS.map(({ id, label, icon: Icon }, index) => (<motion.button key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03, duration: 0.3 }} onClick={() => handleNavigation(id)} className={`nav-item-mobile ${activeView === id ? "active" : ""}`} whileTap={{ scale: 0.98 }}><Icon className={`w-5 h-5 transition-all duration-300 ${activeView === id ? "text-emerald-400" : "text-slate-500 group-hover:text-emerald-400"}`} /><span className="font-medium text-[15px]">{label}</span></motion.button>))}
            {user && (<div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">{user.email?.[0].toUpperCase()}</div><div className="flex flex-col"><span className="text-xs text-slate-400">Signed in as</span><span className="text-sm font-medium text-white truncate max-w-[200px]">{user.email}</span></div></div>
              {userRole === "admin" && (<motion.button onClick={() => handleNavigation("admin")} whileTap={{ scale: 0.98 }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/20 transition-colors"><Shield className="w-5 h-5" />Admin Panel</motion.button>)}
              <motion.button onClick={handleSignOut} whileTap={{ scale: 0.98 }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium hover:bg-red-500/20 transition-colors"><LogOut className="w-5 h-5" />Sign Out</motion.button>
            </div>)}
          </div>
        </motion.div>
      </>)}</AnimatePresence>
    </>
  );
}