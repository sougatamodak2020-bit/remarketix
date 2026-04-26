"use client";
import { useAppStore, ViewId } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  Menu, X, User as UserIcon, Shield, LogOut, ChevronDown,
  Database, Send, Palette, Globe, ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, memo, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES_DROPDOWN = [
  { label: "Data & Lead Generation",      icon: Database, id: "services" as ViewId, categoryId: "data"     },
  { label: "Outreach & Engagement",       icon: Send,     id: "services" as ViewId, categoryId: "outreach" },
  { label: "Content & Brand Growth",      icon: Palette,  id: "services" as ViewId, categoryId: "content"  },
  { label: "Digital & Product Solutions", icon: Globe,    id: "services" as ViewId, categoryId: "digital"  },
];

const NAV_ITEMS: { id: ViewId; label: string; hasDropdown?: boolean }[] = [
  { id: "home",        label: "Home" },
  { id: "services",    label: "Services", hasDropdown: true },
  { id: "casestudies", label: "Cases" },
  { id: "pricing",     label: "Pricing" },
  { id: "feedback",    label: "Reviews" },
  { id: "about",       label: "About" },
  { id: "contact",     label: "Contact" },
];

// Sticky nav offset — must match the constant in ServicesView.tsx
const SCROLL_OFFSET = 136;

// ─── Dropdown sub-item ────────────────────────────────────────────────────────
const DropdownItem = memo(function DropdownItem({
  item,
  onClick,
}: {
  item: typeof SERVICES_DROPDOWN[0];
  onClick: (id: ViewId, categoryId: string) => void;
}) {
  return (
    <button className="nav-dropdown-item" onClick={() => onClick(item.id, item.categoryId)}>
      <span className="dropdown-dot" />
      <item.icon className="w-4 h-4 text-emerald-400/70 flex-shrink-0" />
      <span>{item.label}</span>
    </button>
  );
});

// ─── Single Nav Link ──────────────────────────────────────────────────────────
const NavLink = memo(function NavLink({
  id,
  label,
  isActive,
  onClick,
  onServiceClick,
  hasDropdown,
}: {
  id: ViewId;
  label: string;
  isActive: boolean;
  onClick: (id: ViewId) => void;
  onServiceClick: (id: ViewId, categoryId: string) => void;
  hasDropdown?: boolean;
}) {
  const btn = (
    <button
      onClick={() => onClick(id)}
      className={`relative flex items-center gap-1 px-1 py-2 text-[15px] font-medium
                  transition-colors duration-200 whitespace-nowrap cursor-pointer
                  ${isActive ? "text-emerald-400" : "text-slate-300/80 hover:text-white"}`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
      )}
      {hasDropdown && (
        <ChevronDown className="nav-dropdown-chevron w-3.5 h-3.5 text-slate-500 mt-px" />
      )}
    </button>
  );

  if (!hasDropdown) return btn;

  return (
    <div className="nav-dropdown-wrapper">
      {btn}
      <div className="nav-dropdown-menu" role="menu" aria-label="Services submenu">
        {SERVICES_DROPDOWN.map((item) => (
          <DropdownItem key={item.label} item={item} onClick={onServiceClick} />
        ))}
      </div>
    </div>
  );
});

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const { activeView, setView, user, userRole, setUser, setUserRole } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const header = navRef.current;
          if (!header) return;
          if (window.scrollY > 10) header.classList.add("header--scrolled");
          else header.classList.remove("header--scrolled");
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [isMobileMenuOpen]);

  const handleNavigation = useCallback(
    (id: ViewId) => {
      setView(id);
      setIsMobileMenuOpen(false);
      setMobileServicesOpen(false);
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setView]
  );

  /**
   * Navigate to the Services view and scroll to a specific category section.
   * Strategy:
   *   1. If already on services → scroll directly (section is already in DOM).
   *   2. If on a different view → switch to services, then scroll once the
   *      section elements have mounted (poll with rAF until the element exists).
   */
  const handleServiceCategoryClick = useCallback(
    (id: ViewId, categoryId: string) => {
      setIsMobileMenuOpen(false);
      setMobileServicesOpen(false);

      const scrollToCategory = () => {
        const el = document.getElementById(`cat-${categoryId}`);
        if (!el) return false;
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
        return true;
      };

      if (activeView === "services") {
        // Already on Services page — DOM is present, scroll immediately
        requestAnimationFrame(() => requestAnimationFrame(scrollToCategory));
      } else {
        // Switch view first, then wait for the target element to appear in the DOM
        setView(id);
        let attempts = 0;
        const MAX_ATTEMPTS = 40; // ~660ms at 60fps

        const poll = () => {
          attempts++;
          if (scrollToCategory()) return;          // found it — done
          if (attempts >= MAX_ATTEMPTS) return;    // give up after timeout
          requestAnimationFrame(poll);
        };

        requestAnimationFrame(poll);
      }
    },
    [activeView, setView]
  );

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setView("home");
  }, [setUser, setUserRole, setView]);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);

  return (
    <>
      <nav
        id="header"
        ref={navRef}
        className="header"
        style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        <div className="relative flex items-center w-full px-4 md:px-6 lg:px-8 py-3 gap-8">

          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ── Logo + Brand ── */}
          <button
            onClick={() => handleNavigation("home")}
            className="flex-shrink-0 flex items-center gap-3 group"
            aria-label="Go to home"
          >
            <Image
              src="https://i.postimg.cc/t4msmVH7/Remarketix-logo.png"
              alt="Remarketix"
              width={160}
              height={48}
              className="h-auto w-auto max-h-11 md:max-h-12 transition-opacity duration-200 group-hover:opacity-90 drop-shadow-[0_0_12px_rgba(255,255,255,0.08)]"
              priority
              loading="eager"
              quality={90}
            />
            <div className="hidden xl:flex flex-col leading-none gap-1">
              <span className="text-[15px] font-bold text-white tracking-tight">Remarketix</span>
              <span className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(52,211,153,0.8)" }}>
                Turn data into growth
              </span>
            </div>
          </button>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-7 ml-auto">
            {NAV_ITEMS.map(({ id, label, hasDropdown }) => (
              <NavLink
                key={id}
                id={id}
                label={label}
                isActive={activeView === id}
                onClick={handleNavigation}
                onServiceClick={handleServiceCategoryClick}
                hasDropdown={hasDropdown}
              />
            ))}
          </div>

          {/* ── CTA / Auth ── */}
          <div className="hidden lg:flex items-center gap-3 ml-6 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-2">
                {userRole === "admin" && (
                  <button
                    onClick={() => handleNavigation("admin")}
                    className="group relative px-3 py-2 rounded-lg overflow-hidden border border-blue-500/20 bg-blue-500/5 flex items-center gap-2 hover:bg-blue-500/10 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold tracking-wide text-blue-200">Admin</span>
                  </button>
                )}
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                  <UserIcon className="w-4 h-4 text-slate-300" />
                  <span className="text-xs font-medium text-slate-200 max-w-[90px] truncate">
                    {user.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg border border-white/5 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation("contact")}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-gradient-to-r from-emerald-500/20 to-cyan-500/15
                           border border-emerald-500/30 hover:border-emerald-500/55
                           text-emerald-300 hover:text-white transition-all duration-200
                           text-[14px] font-semibold overflow-hidden whitespace-nowrap
                           hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="relative">Get a Quote</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden ml-auto relative p-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center z-20"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen
              ? <X className="w-5 h-5 text-white" />
              : <Menu className="w-5 h-5 text-slate-200" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9998] bg-[#020617]/70 backdrop-blur-sm lg:hidden"
              onClick={toggleMobileMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[72px] left-3 right-3 z-[9999] lg:hidden max-h-[calc(100vh-84px)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1526]/97 backdrop-blur-2xl shadow-2xl"
            >
              <div className="p-3 space-y-0.5">
                {NAV_ITEMS.map(({ id, label, hasDropdown }, index) => (
                  <div key={id}>
                    <motion.button
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.025, duration: 0.2 }}
                      onClick={() => {
                        if (hasDropdown) setMobileServicesOpen((p) => !p);
                        else handleNavigation(id);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-150 ${
                        activeView === id
                          ? "text-emerald-400 bg-emerald-500/8"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{label}</span>
                      {hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </motion.button>

                    {hasDropdown && mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="ml-3 mt-0.5 space-y-0.5 overflow-hidden"
                      >
                        {SERVICES_DROPDOWN.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleServiceCategoryClick(item.id, item.categoryId)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                                       text-[13px] text-slate-400 hover:text-white
                                       hover:bg-white/5 transition-colors duration-150 text-left"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 flex-shrink-0" />
                            <item.icon className="w-3.5 h-3.5 text-emerald-400/60 flex-shrink-0" />
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                {!user && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.18, duration: 0.2 }}
                    onClick={() => handleNavigation("contact")}
                    className="w-full flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl
                               bg-gradient-to-r from-emerald-500/15 to-cyan-500/10
                               border border-emerald-500/30 text-emerald-300
                               font-semibold text-[15px] transition-colors"
                  >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}

                {user && (
                  <div className="mt-2 pt-3 border-t border-white/10 space-y-1.5">
                    <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-slate-400">Signed in as</span>
                        <span className="text-sm font-medium text-white truncate">{user.email}</span>
                      </div>
                    </div>
                    {userRole === "admin" && (
                      <button
                        onClick={() => handleNavigation("admin")}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium hover:bg-blue-500/20 transition-colors"
                      >
                        <Shield className="w-5 h-5" />Admin Panel
                      </button>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium hover:bg-red-500/20 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}