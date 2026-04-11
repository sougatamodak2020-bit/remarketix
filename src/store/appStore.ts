import { create } from "zustand";
import { User } from "@supabase/supabase-js";

export type ViewId =
  | "home"
  | "services"
  | "projects"
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
  setView: (activeView) => set({ activeView }),
  setUser: (user) => set({ user }),
  setUserRole: (userRole) => set({ userRole }),
  setCurrency: (currency) => set({ currency }),
}));