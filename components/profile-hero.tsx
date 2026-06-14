"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { IdCard } from "@/components/IdCard";

export function ProfileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);
  const [cardReady, setCardReady] = useState(false);

  useEffect(() => {
    if (containerRef.current) setInitialized(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setCardReady(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-[#09090f]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row items-center px-6 pt-24 pb-12 md:pt-0 md:pb-0"
      >
        {/* Text — full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 z-10 select-none text-center md:text-left">
          <p
            className="text-xs uppercase tracking-[2.5px] mb-6 flex items-center gap-3 justify-center md:justify-start"
            style={{
              color: "rgba(110,231,247,0.7)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "rgba(110,231,247,0.6)",
              }}
            />
            Fullstack Engineer
          </p>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-[1.05]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-2px",
            }}
          >
            Odi Ezurike
          </h1>

          <p
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-8 leading-[1.05]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-2px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Building for the web.
          </p>

          <p
            className="text-base max-w-md mb-10 leading-relaxed mx-auto md:mx-0"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Creating precise, performant interfaces where design and engineering
            meet. I build things that feel as good as they look.
          </p>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <button
              onClick={scrollToProjects}
              className="flex items-center gap-2 text-sm font-medium text-[#09090f] bg-[#6EE7F7] px-6 py-3 rounded-md hover:bg-[#5dd4e4] transition-colors"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              View Projects
            </button>
            <button
              onClick={scrollToAbout}
              className="flex items-center gap-2 text-sm text-white/40 border border-white/10 px-6 py-3 rounded-md hover:text-white/70 hover:border-white/20 transition-all"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              About me <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card area — below text on mobile, right side on desktop */}
        {initialized && (
          <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full pointer-events-none">
            <IdCard
              containerRef={containerRef}
              initialized={cardReady}
              onSkillsClick={scrollToProjects}
            />
          </div>
        )}

        {/* Mobile — below text */}
        {initialized && (
          <div
            className="md:hidden relative w-full pointer-events-none"
            style={{ height: 480 }}
          >
            <IdCard
              containerRef={containerRef}
              initialized={cardReady}
              onSkillsClick={scrollToProjects}
            />
          </div>
        )}
      </div>
    </section>
  );
}
