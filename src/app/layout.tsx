import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Remarketix - Growth Marketing Agency",
  description: "Transform your business with data-driven marketing solutions",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Remarketix - Growth Marketing Agency",
    description: "Transform your business with data-driven marketing solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}