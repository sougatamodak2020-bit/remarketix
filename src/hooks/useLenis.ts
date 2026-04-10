"use client";
import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;
    let rafId: number;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      function raf(time: number) { lenis!.raf(time); rafId = requestAnimationFrame(raf); }
      rafId = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(rafId); lenis?.destroy(); };
  }, []);
}
