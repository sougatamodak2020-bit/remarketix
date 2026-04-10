"use client";
import { useAppStore } from "@/store/appStore";
import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeView from "@/components/views/HomeView";
import ServicesView from "@/components/views/ServicesView";
import ProjectsView from "@/components/views/ProjectsView";
import CaseStudiesView from "@/components/views/CaseStudiesView";
import PricingView from "@/components/views/PricingView";
import FeedbackView from "@/components/views/FeedbackView";
import AboutView from "@/components/views/AboutView";
import ContactView from "@/components/views/ContactView";

export default function Page() {
  const activeView = useAppStore((s) => s.activeView);
  useLenis();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24">
        {activeView === "home" && <HomeView />}
        {activeView === "services" && <ServicesView />}
        {activeView === "projects" && <ProjectsView />}
        {activeView === "casestudies" && <CaseStudiesView />}
        {activeView === "pricing" && <PricingView />}
        {activeView === "feedback" && <FeedbackView />}
        {activeView === "about" && <AboutView />}
        {activeView === "contact" && <ContactView />}
      </main>
      <Footer />
    </>
  );
}