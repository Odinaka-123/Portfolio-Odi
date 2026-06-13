"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { IdCard } from "@/components/IdCard";

export function ProfileHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (containerRef.current) setInitialized(true);
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
        className="relative max-w-6xl mx-auto min-h-screen flex items-center px-6"
      >
        <div className="w-full md:w-1/2 z-10 select-none">
          <p
            className="text-xs uppercase tracking-[2.5px] mb-6 flex items-center gap-3"
            style={{ color: "rgba(110,231,247,0.7)", fontFamily: "Inter, sans-serif" }}
          >
            <span style={{ display: "block", width: 20, height: 1, background: "rgba(110,231,247,0.6)" }} />
            Fullstack Engineer
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-[1.05]"
            style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-2px" }}
          >
            Odi Ezurike
          </h1>
          <p
            className="text-5xl md:text-6xl font-light tracking-tight mb-8 leading-[1.05]"
            style={{ fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-2px", color: "rgba(255,255,255,0.2)" }}
          >
            Building for the web.
          </p>
          <p
            className="text-base max-w-md mb-10 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.4)" }}
          >
            Creating precise, performant interfaces where design and engineering
            meet. I build things that feel as good as they look.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToAbout}
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
              Scroll down <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {initialized && (
          <IdCard
            containerRef={containerRef}
            initialized={initialized}
            onSkillsClick={scrollToProjects}
          />
        )}
      </div>
    </section>
  );
}