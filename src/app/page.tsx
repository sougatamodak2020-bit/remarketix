"use client";

import { useAppStore } from "@/store/appStore";
import { useLenis } from "@/hooks/useLenis";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeView from "@/components/views/HomeView";
import { lazy, Suspense, useEffect, useRef, memo, useCallback } from "react";

// Lazy-load views with prefetch
const ServicesView = lazy(() => 
  import("@/components/views/ServicesView").then(module => ({
    default: module.default,
  }))
);
const ProjectsView = lazy(() => import("@/components/views/ProjectsView"));
const CaseStudiesView = lazy(() => import("@/components/views/CaseStudiesView"));
const PricingView = lazy(() => import("@/components/views/PricingView"));
const FeedbackView = lazy(() => import("@/components/views/FeedbackView"));
const AboutView = lazy(() => import("@/components/views/AboutView"));
const ContactView = lazy(() => import("@/components/views/ContactView"));
const AuthView = lazy(() => import("@/components/views/AuthView"));
const AdminPanel = lazy(() => import("@/components/views/AdminPanel"));

// Optimized skeleton with no animations
function ViewSkeleton() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      aria-label="Loading…"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-white/10 border-t-emerald-400"
          style={{ 
            animation: "spin 0.8s linear infinite",
            willChange: "transform" 
          }}
        />
        <span className="text-white/30 text-sm font-medium tracking-wide">
          Loading…
        </span>
      </div>
    </div>
  );
}

// Memoized content with proper typing
const ViewContent = memo(function ViewContent({
  activeView,
}: {
  activeView: string;
}) {
  return (
    <Suspense fallback={<ViewSkeleton />}>
      {activeView === "home" && <HomeView />}
      {activeView === "services" && <ServicesView />}
      {activeView === "projects" && <ProjectsView />}
      {activeView === "casestudies" && <CaseStudiesView />}
      {activeView === "pricing" && <PricingView />}
      {activeView === "feedback" && <FeedbackView />}
      {activeView === "about" && <AboutView />}
      {activeView === "contact" && <ContactView />}
      {activeView === "auth" && <AuthView />}
      {activeView === "admin" && <AdminPanel />}
    </Suspense>
  );
});

export default function Page() {
  const { activeView, setUser, setUserRole } = useAppStore();
  useLenis();

  // Memoize auth handler
  const handleSessionUser = useCallback(
    async (user: any) => {
      setUser(user);
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserRole(profile.role);
      }
    },
    [setUser, setUserRole]
  );

  // Check for existing auth session
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && mounted) {
        await handleSessionUser(session.user);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      
      if (session?.user) {
        await handleSessionUser(session.user);
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleSessionUser, setUser, setUserRole]);

  // Optimized scroll to top
  const prevView = useRef(activeView);
  useEffect(() => {
    if (prevView.current !== activeView) {
      // Use native scroll for instant scrolling
      window.scrollTo({ top: 0, behavior: "instant" });
      prevView.current = activeView;
    }
  }, [activeView]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-20 md:pt-24">
        <ViewContent activeView={activeView} />
      </main>
      <Footer />
    </>
  );
}