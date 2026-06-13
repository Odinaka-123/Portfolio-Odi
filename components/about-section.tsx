"use client";

import React, { useRef, useEffect, useState } from "react";
import { ExternalLink, Github, Code2, Layers, Globe, Cpu } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "52+", label: "Projects Built" },
  { value: "30+", label: "Fullstack" },
  { value: "20+", label: "Frontend" },
  { value: "1", label: "Language Created" },
];

interface Highlight {
  icon: React.ElementType;
  title: string;
  sub: string;
  href: string;
  desc: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    icon: Globe,
    title: "Founder, Kakkatech",
    sub: "kakkatech.com",
    href: "https://kakkatech.com",
    desc: "Built and runs a digital agency delivering websites, branding, and growth systems for businesses across Nigeria and beyond.",
  },
  {
    icon: Code2,
    title: "EasyScript",
    sub: "Custom Language + VSCode Extension",
    href: "https://github.com/Odinaka-123",
    desc: "Designed and built his own programming language from scratch — complete with syntax, interpreter, and a published VSCode extension.",
  },
  {
    icon: Layers,
    title: "52+ Projects",
    sub: "github.com/Odinaka-123",
    href: "https://github.com/Odinaka-123",
    desc: "From fintech platforms and AI-powered tools to SaaS products and musician portfolios — all shipped.",
  },
  {
    icon: Cpu,
    title: "Fullstack Engineer",
    sub: "React · Next.js · Node · Python · PostgreSQL",
    href: "https://github.com/Odinaka-123",
    desc: "Operates across the full stack — UI architecture, API design, database modelling, and cloud deployment.",
  },
];

function useInView(threshold = 0.3): { ref: React.RefObject<HTMLDivElement | null>; visible: boolean } {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

function StatCard({ value, label, index }: StatCardProps) {
  const { ref, visible } = useInView(0.3);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 rounded-2xl relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div
        className="absolute top-0 left-0 w-16 h-16 rounded-br-full"
        style={{ background: "rgba(110,231,247,0.04)" }}
      />
      <span
        className="text-4xl font-bold tracking-tight mb-1"
        style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6EE7F7" }}
      >
        {value}
      </span>
      <span
        className="text-xs uppercase tracking-widest text-center"
        style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
    </div>
  );
}

interface HighlightCardProps extends Highlight {
  index: number;
}

function HighlightCard({
  icon: Icon,
  title,
  sub,
  href,
  desc,
  index,
}: HighlightCardProps) {
  const { ref, visible } = useInView(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 flex flex-col gap-3"
      style={{
        background: hovered ? "rgba(110,231,247,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(110,231,247,0.2)" : "rgba(255,255,255,0.06)"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.1 + 0.1}s, transform 0.55s ease ${
          index * 0.1 + 0.1
        }s, background 0.2s, border-color 0.2s`,
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(110,231,247,0.08)",
            border: "1px solid rgba(110,231,247,0.15)",
          }}
        >
          <Icon size={18} color="rgba(110,231,247,0.8)" />
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
          style={{
            opacity: hovered ? 0.5 : 0,
            transition: "opacity 0.2s",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ExternalLink size={14} color="rgba(255,255,255,0.5)" />
        </a>
      </div>

      <div>
        <h3
          className="font-semibold text-white mb-0.5"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 15,
            letterSpacing: "-0.2px",
          }}
        >
          {title}
        </h3>
        <p
          className="text-[11px] uppercase tracking-wider"
          style={{ fontFamily: "Inter, sans-serif", color: "rgba(110,231,247,0.55)" }}
        >
          {sub}
        </p>
      </div>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          color: "rgba(255,255,255,0.4)",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function NavLink({
  href,
  icon: Icon,
  label,
}: NavLinkProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2"
      style={{
        fontFamily: "Inter, sans-serif",
        color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
        fontSize: 13,
        transition: "color 0.2s",
        textDecoration: "none",
      }}
    >
      <Icon size={15} />
      {label}
    </a>
  );
}

export function AboutSection(): React.ReactElement {
  const { ref: headerRef, visible: headerVisible } = useInView(0.3);

  return (
    <section
      id="about"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#09090f" }}
    >
      {/* Grid */}
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

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "60%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(110,231,247,0.04) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p
            className="text-xs uppercase tracking-[2.5px] mb-4 flex items-center gap-3"
            style={{ fontFamily: "Inter, sans-serif", color: "rgba(110,231,247,0.7)" }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "rgba(110,231,247,0.6)",
              }}
            />
            About
          </p>

          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-1.5px",
            }}
          >
            Engineer. Founder.{" "}
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>Builder.</span>
          </h2>

          <p
            className="max-w-2xl leading-relaxed"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.45)",
              fontSize: 15,
              lineHeight: 1.8,
            }}
          >
            I&apos;m Odi Ezurike — a Fullstack Engineer and the Founder of{" "}
            <a
              href="https://kakkatech.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(110,231,247,0.75)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Kakkatech
            </a>
            , a digital agency building growth engines for businesses. I&apos;ve shipped 52+ projects
            across the full stack, created my own programming language (EasyScript) complete with a
            VSCode extension, and I operate at the intersection of engineering precision and product
            thinking. I don&apos;t just write code — I architect systems that scale.
          </p>

          <div className="flex items-center gap-5 mt-6">
            <NavLink href="https://github.com/Odinaka-123" icon={Github} label="github.com/Odinaka-123" />
            <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
            <NavLink href="https://kakkatech.com" icon={Globe} label="kakkatech.com" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} index={i} />
          ))}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HIGHLIGHTS.map((h, i) => (
            <HighlightCard key={h.title} {...h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}