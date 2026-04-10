import { create } from "zustand";

export type ViewId =
  | "home" | "services" | "projects" | "casestudies"
  | "pricing" | "feedback" | "about" | "contact";

interface AppState {
  activeView: ViewId;
  currency: "USD" | "INR";
  setView: (v: ViewId) => void;
  toggleCurrency: () => void;
  setCurrency: (c: "USD" | "INR") => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: "home",
  currency: "USD",
  setView: (v) => set({ activeView: v }),
  toggleCurrency: () => set((s) => ({ currency: s.currency === "USD" ? "INR" : "USD" })),
  setCurrency: (c) => set({ currency: c }),
}));
