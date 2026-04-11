"use client";
import { useEffect } from "react";

export default function PerformanceMonitor() {
  useEffect(() => {
    // Report Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log performance metrics in development
          if (process.env.NODE_ENV === "development") {
            console.log(`${entry.name}: ${entry.startTime}ms`);
          }
        }
      });

      observer.observe({ entryTypes: ["navigation", "paint", "largest-contentful-paint"] });

      return () => observer.disconnect();
    }
  }, []);

  return null;
}