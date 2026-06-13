import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Loader from "@/components/ui/loader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Odi Ezurike — Frontend Engineer",
  description:
    "Building precise, performant interfaces where design and engineering meet.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} bg-[#08080f] text-white antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* Loader — renders on top of everything, removes itself when done */}
          <Loader />

          {/* Grid background */}
          <div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
          {/* Radial vignette */}
          <div
            className="fixed inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 30%, #08080f 100%)",
            }}
          />
          {/* Left accent line */}
          <div
            className="fixed left-0 top-0 bottom-0 w-[3px] -z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(110,231,247,0.35) 40%, rgba(110,231,247,0.35) 60%, transparent 100%)",
            }}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
