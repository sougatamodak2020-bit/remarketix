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

function ViewSkeleton() {
  return <div className="min-h-[50vh] animate-pulse bg-white/5" />;
}

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

export default function Page() {
  const { activeView, setUser, setUserRole } = useAppStore();
  
  useLenis();

  const handleSessionUser = useCallback(
    async (user: any) => {
      setUser(user);
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (profile) setUserRole(profile.role);
    },
    [setUser, setUserRole]
  );

  useEffect(() => {
    let mounted = true;
    const initAuth = async () => {
      // ✅ FIXED: Corrected destructuring syntax to `const { data: { session } }`
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && mounted) await handleSessionUser(session.user);
    };
    initAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) await handleSessionUser(session.user);
      else { setUser(null); setUserRole(null); }
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [handleSessionUser, setUser, setUserRole]);

  const prevView = useRef(activeView);
  useEffect(() => {
    if (prevView.current !== activeView) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
      prevView.current = activeView;
    }
  }, [activeView]);

  return (
    <>
      <Navbar />
      <main className="relative z-[1] pt-20">
        <ViewContent activeView={activeView} />
      </main>
      <Footer />
    </>
  );
}