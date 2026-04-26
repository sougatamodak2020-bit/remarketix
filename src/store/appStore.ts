import { create } from "zustand";
import { User } from "@supabase/supabase-js";

export type ViewId =
  | "home"
  | "services"
  | "casestudies"
  | "pricing"
  | "feedback"
  | "about"
  | "contact"
  | "auth"
  | "admin"
  | "privacy"
  | "terms";

export type Currency = "USD" | "INR";

interface AppState {
  activeView: ViewId;
  user: User | null;
  userRole: "user" | "admin" | null;
  currency: Currency;
  setView: (view: ViewId) => void;
  setUser: (user: User | null) => void;
  setUserRole: (role: "user" | "admin" | null) => void;
  setCurrency: (currency: Currency) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: "home",
  user: null,
  userRole: null,
  currency: "USD",
  setView: (activeView) => {
    set({ activeView });
    // Push a history entry on every view change so the browser back button
    // has something to intercept instead of leaving the site entirely.
    if (typeof window !== "undefined") {
      window.history.pushState({ view: activeView }, "", window.location.pathname);
    }
  },
  setUser: (user) => set({ user }),
  setUserRole: (userRole) => set({ userRole }),
  setCurrency: (currency) => set({ currency }),
}));