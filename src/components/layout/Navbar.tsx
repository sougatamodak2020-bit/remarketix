"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Home, Briefcase, FolderKanban, LineChart, Tag, MessageCircle, Users, Mail, Menu, X, User as UserIcon, Shield, LogOut } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useCallback, memo } from "react";

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

// Enhanced nav item with premium styling
const NavItem = memo(function NavItem({
  id,
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  id: ViewId;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: (id: ViewId) => void;
}) {
  return (
    <motion.button
      onClick={() => onClick(id)}
      className={`group relative px-4 py-3 rounded-xl transition-all duration-300 min-h-[48px] ${
        isActive 
          ? "text-white" 
          : "text-white/60 hover:text-white"
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Active background glow */}
      {isActive && (
        <motion.div
          layoutId="activeNavBg"
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-blue-500/15 rounded-xl border border-emerald-500/30"
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
        />
      )}
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-emerald-500/5 group-hover:via-cyan-500/5 group-hover:to-blue-500/5 rounded-xl transition-all duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2.5">
        <Icon className={`w-5 h-5 transition-all duration-300 ${
          isActive 
            ? "text-emerald-400" 
            : "text-white/50 group-hover:text-emerald-400"
        }`} />
        <span className={`text-[15px] font-semibold tracking-wide transition-all duration-300 ${
          isActive 
            ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent" 
            : ""
        }`}>
          {label}
        </span>
      </span>

      {/* Active indicator dot */}
      {isActive && (
        <motion.div
          layoutId="activeNavDot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-500/50"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
});

export default function Navbar() {
  const { activeView, setView, user, userRole, setUser, setUserRole } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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

  const handleNavigation = useCallback((id: ViewId) => {
    setView(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setView]);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setView("home");
  }, [setUser, setUserRole, setView]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] pt-5 px-5 md:pt-7 md:px-8"
      >
        <div className="container-custom">
          <motion.div
            className={`relative overflow-hidden transition-all duration-500 rounded-[20px] border ${
              isScrolled 
                ? "py-2.5 px-4 bg-[#0a0f1a]/95 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/20" 
                : "py-4 px-6 bg-[#0a0f1a]/80 backdrop-blur-2xl border-white/[0.08]"
            }`}
            style={{
              willChange: "transform, opacity",
            }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-grid-dense opacity-[0.02] pointer-events-none" />

            <div className="relative flex items-center justify-between gap-6">
              {/* Logo - Enhanced */}
              <motion.button
                onClick={() => handleNavigation("home")}
                className="flex-shrink-0 group relative"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Go to home"
              >
                {/* Glow effect behind logo */}
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Image
                  src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png"
                  alt="Remarketix"
                  width={160}
                  height={48}
                  className="relative h-auto w-auto transition-all duration-300 max-h-10 sm:max-h-11 md:max-h-12 drop-shadow-2xl"
                  priority
                  quality={95}
                />
              </motion.button>

              {/* Desktop Nav Items - Enhanced spacing */}
              <div className="hidden lg:flex items-center gap-1.5 px-2">
                {NAV_ITEMS.map(({ id, label, icon }) => (
                  <NavItem
                    key={id}
                    id={id}
                    label={label}
                    icon={icon}
                    isActive={activeView === id}
                    onClick={handleNavigation}
                  />
                ))}
              </div>

              {/* Auth Section - Desktop - Only show if logged in */}
              <div className="hidden lg:flex items-center gap-3">
                {user && (
                  <div className="flex items-center gap-3">
                    {userRole === "admin" && (
                      <motion.button
                        onClick={() => handleNavigation("admin")}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="group relative px-5 py-3 rounded-xl overflow-hidden border border-blue-500/30"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 group-hover:from-blue-500/25 group-hover:via-indigo-500/25 group-hover:to-purple-500/25 transition-all duration-300" />
                        <span className="relative flex items-center gap-2.5">
                          <Shield className="w-5 h-5 text-blue-400" />
                          <span className="text-[15px] font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Admin
                          </span>
                        </span>
                      </motion.button>
                    )}
                    
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2.5">
                        <UserIcon className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-white/90 max-w-[140px] truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={handleSignOut}
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="group relative p-3 rounded-xl border border-red-500/30 min-h-[50px] min-w-[50px] flex items-center justify-center overflow-hidden"
                      title="Sign Out"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-pink-500/15 group-hover:from-red-500/25 group-hover:to-pink-500/25 transition-all duration-300" />
                      <LogOut className="relative w-5 h-5 text-red-400" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle - Enhanced */}
              <motion.button
                onClick={toggleMobileMenu}
                className="lg:hidden relative p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm min-h-[50px] min-w-[50px] flex items-center justify-center overflow-hidden group"
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.06 }}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isMobileMenuOpen ? (
                    <X className="relative w-6 h-6 text-white" />
                  ) : (
                    <Menu className="relative w-6 h-6 text-white" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[95] bg-[#030712]/80 backdrop-blur-md lg:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[88px] left-5 right-5 z-[96] lg:hidden max-h-[calc(100vh-104px)] overflow-y-auto"
            >
              <div className="relative rounded-[20px] border border-white/10 bg-[#0a0f1a]/95 backdrop-blur-2xl p-4 shadow-2xl shadow-black/40">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 rounded-[20px] pointer-events-none" />
                
                <div className="relative flex flex-col gap-2">
                  {NAV_ITEMS.map(({ id, label, icon: Icon }, index) => (
                    <motion.button
                      key={id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => handleNavigation(id)}
                      className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 min-h-[56px] ${
                        activeView === id 
                          ? "text-white" 
                          : "text-white/70 hover:text-white"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Active background */}
                      {activeView === id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-blue-500/15 rounded-xl border border-emerald-500/30" />
                      )}
                      
                      {/* Hover background */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-300" />

                      {/* Icon */}
                      <Icon className={`relative w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                        activeView === id 
                          ? "text-emerald-400" 
                          : "text-white/50 group-hover:text-emerald-400"
                      }`} />
                      
                      {/* Label */}
                      <span className={`relative font-semibold text-[16px] tracking-wide transition-all duration-300 ${
                        activeView === id 
                          ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent" 
                          : ""
                      }`}>
                        {label}
                      </span>
                      
                      {/* Active indicator */}
                      {activeView === id && (
                        <div className="ml-auto w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-500/50" />
                      )}
                    </motion.button>
                  ))}
                  
                  {/* Mobile Auth Section - Only show if logged in */}
                  {user && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="space-y-2">
                        {userRole === "admin" && (
                          <motion.button
                            onClick={() => handleNavigation("admin")}
                            whileTap={{ scale: 0.97 }}
                            className="group relative w-full flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden border border-blue-500/30"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 transition-all duration-300" />
                            <Shield className="relative w-6 h-6 text-blue-400" />
                            <span className="relative font-bold text-[16px] tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              Admin Panel
                            </span>
                          </motion.button>
                        )}
                        
                        <div className="px-5 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                          <div className="flex items-center gap-2.5 mb-2">
                            <UserIcon className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm font-medium text-white/60">Signed in as:</span>
                          </div>
                          <span className="text-[15px] font-semibold text-white/90 block truncate">
                            {user.email}
                          </span>
                        </div>
                        
                        <motion.button
                          onClick={handleSignOut}
                          whileTap={{ scale: 0.97 }}
                          className="group relative w-full flex items-center gap-4 px-5 py-4 rounded-xl overflow-hidden border border-red-500/30"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-pink-500/15 transition-all duration-300" />
                          <LogOut className="relative w-6 h-6 text-red-400" />
                          <span className="relative font-bold text-[16px] tracking-wide bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                            Sign Out
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}