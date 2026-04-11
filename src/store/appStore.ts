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
  | "admin";

interface AppState {
  activeView: ViewId;
  user: User | null;
  userRole: "user" | "admin" | null;
  setView: (view: ViewId) => void;
  setUser: (user: User | null) => void;
  setUserRole: (role: "user" | "admin" | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: "home",
  user: null,
  userRole: null,
  setView: (activeView) => set({ activeView }),
  setUser: (user) => set({ user }),
  setUserRole: (userRole) => set({ userRole }),
}));