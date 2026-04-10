import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remarketix — Turn Data Into Growth",
  description: "Data-driven growth partner. High-quality leads, powerful websites, impactful advertising.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
