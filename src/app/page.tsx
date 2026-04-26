"use client";
import { useAppStore } from "@/store/appStore";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeView from "@/components/views/HomeView";
import { lazy, Suspense, useEffect, useRef, memo, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";

const ServicesView = lazy(() => import("@/components/views/ServicesView"));
const CaseStudiesView = lazy(() => import("@/components/views/CaseStudiesView"));
const PricingView = lazy(() => import("@/components/views/PricingView"));
const FeedbackView = lazy(() => import("@/components/views/FeedbackView"));
const AboutView = lazy(() => import("@/components/views/AboutView"));
const ContactView = lazy(() => import("@/components/views/ContactView"));
const AuthView = lazy(() => import("@/components/views/AuthView"));
const AdminPanel = lazy(() => import("@/components/views/AdminPanel"));
const PrivacyPolicyView = lazy(() => import("@/components/views/PrivacyPolicyView"));
const TermsView = lazy(() => import("@/components/views/TermsView"));

// ─── Premium Skeleton ─────────────────────────────────────────────────────────
function ViewSkeleton() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Navbar height spacer */}
      <div className="h-[72px]" />

      {/* Shimmer overlay – uses the shimmer keyframe already defined in globals.css */}
      <style>{`
        .skel-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 0%,
            rgba(255,255,255,0.10) 40%,
            rgba(255,255,255,0.04) 80%
          );
          background-size: 400% auto;
          animation: shimmer 2.2s linear infinite;
        }
        .skel-shimmer-accent {
          background: linear-gradient(
            90deg,
            rgba(16,185,129,0.08) 0%,
            rgba(6,182,212,0.18) 40%,
            rgba(16,185,129,0.08) 80%
          );
          background-size: 400% auto;
          animation: shimmer 2.2s linear infinite;
        }
        .skel-pulse {
          animation: skel-pulse 1.8s ease-in-out infinite;
        }
        @keyframes skel-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
      `}</style>

      {/* ── Hero block ── */}
      <div className="container-custom pt-12 pb-10 px-4">
        {/* Badge pill */}
        <div className="flex justify-center mb-8">
          <div
            className="h-8 w-44 rounded-full skel-shimmer"
            style={{ border: "1px solid rgba(16,185,129,0.15)" }}
          />
        </div>

        {/* Title lines */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="h-11 w-[72%] max-w-[480px] rounded-xl skel-shimmer" />
          <div className="h-11 w-[48%] max-w-[320px] rounded-xl skel-shimmer-accent" />
        </div>

        {/* Accent bar */}
        <div className="h-1.5 w-28 mx-auto rounded-full skel-shimmer-accent mb-8" />

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2.5 mb-10">
          <div className="h-4 w-[60%] max-w-[420px] rounded-lg skel-shimmer" />
          <div className="h-4 w-[44%] max-w-[300px] rounded-lg skel-shimmer" style={{ animationDelay: "0.1s" }} />
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <div
            className="h-12 w-44 rounded-xl skel-shimmer-accent"
            style={{ border: "1px solid rgba(16,185,129,0.2)" }}
          />
          <div
            className="h-12 w-44 rounded-xl skel-shimmer"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="container-custom px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Stat value */}
              <div
                className="h-8 w-16 mx-auto rounded-lg skel-shimmer-accent mb-3"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
              {/* Stat label */}
              <div
                className="h-3 w-20 mx-auto rounded skel-shimmer"
                style={{ animationDelay: `${i * 0.12 + 0.06}s` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="container-custom px-4 pb-16">
        {/* Section heading */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="h-6 w-28 rounded-full skel-shimmer-accent" style={{ border: "1px solid rgba(16,185,129,0.15)" }} />
          <div className="h-8 w-56 rounded-xl skel-shimmer" />
          <div className="h-1 w-20 rounded-full skel-shimmer-accent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.06)",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {/* Icon box */}
              <div
                className="w-12 h-12 rounded-xl skel-shimmer-accent flex-shrink-0"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              {/* Card title */}
              <div
                className="h-5 w-3/4 rounded-lg skel-shimmer"
                style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
              />
              {/* Body lines */}
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-full rounded skel-shimmer" style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
                <div className="h-3.5 w-5/6 rounded skel-shimmer" style={{ animationDelay: `${i * 0.1 + 0.15}s` }} />
                <div className="h-3.5 w-2/3 rounded skel-shimmer" style={{ animationDelay: `${i * 0.1 + 0.2}s` }} />
              </div>
              {/* CTA link */}
              <div className="h-4 w-28 rounded skel-shimmer-accent mt-2" style={{ animationDelay: `${i * 0.1 + 0.25}s` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── View Content ─────────────────────────────────────────────────────────────
const ViewContent = memo(function ViewContent({ activeView }: { activeView: string }) {
  return (
    <Suspense fallback={<ViewSkeleton />}>
      {activeView === "home" && <HomeView />}
      {activeView === "services" && <ServicesView />}
      {activeView === "casestudies" && <CaseStudiesView />}
      {activeView === "pricing" && <PricingView />}
      {activeView === "feedback" && <FeedbackView />}
      {activeView === "about" && <AboutView />}
      {activeView === "contact" && <ContactView />}
      {activeView === "auth" && <AuthView />}
      {activeView === "admin" && <AdminPanel />}
      {activeView === "privacy" && <PrivacyPolicyView />}
      {activeView === "terms" && <TermsView />}
    </Suspense>
  );
});

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function Page() {
  const { activeView, setUser, setUserRole } = useAppStore();

  useLenis();

  const handleSessionUser = useCallback(
    async (user: any) => {
      setUser(user);
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profile) setUserRole(profile.role);
    },
    [setUser, setUserRole]
  );

  // ── Auth init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user && mounted) await handleSessionUser(session.user);
    };
    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) await handleSessionUser(session.user);
      else {
        setUser(null);
        setUserRole(null);
      }
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleSessionUser, setUser, setUserRole]);

  // ── Back-button interception ───────────────────────────────────────────────
  // When the browser back button fires (popstate), instead of leaving the site
  // we push a new history entry and force the view back to "home".
  useEffect(() => {
    // Seed an initial entry so the very first popstate is also caught.
    window.history.replaceState({ view: activeView }, "", window.location.pathname);

    const handlePopState = () => {
      // Re-push so the history stack never empties.
      window.history.pushState({ view: "home" }, "", window.location.pathname);
      useAppStore.getState().setView("home");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // ── Scroll to top on view change ───────────────────────────────────────────
  const prevView = useRef(activeView);
  useEffect(() => {
    if (prevView.current !== activeView) {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "instant" })
      );
      prevView.current = activeView;
    }
  }, [activeView]);

  return (
    <>
      <Navbar />
      <main className="relative z-[1]">
        <ViewContent activeView={activeView} />
      </main>
      <Footer />
    </>
  );
}
