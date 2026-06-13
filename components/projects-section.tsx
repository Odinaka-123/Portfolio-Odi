"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    title: "CCTV Tracker",
    description:
      "Real-time multi-object tracking for university CCTV footage using YOLOv8 + DeepSORT with transfer learning.",
    category: "AI / Computer Vision",
    color: "#6EE7F7",
    codeUrl: "https://github.com/Odinaka-123/cctv-tracker",
    liveUrl: null,
    techs: ["python", "pytorch", "opencv", "linux"],
  },
  {
    title: "Personal Learning",
    description:
      "AI-powered learning platform personalized for each user. Built with React, Next.js App Router, Firebase and Google Auth.",
    category: "AI / EdTech",
    color: "#818cf8",
    codeUrl: null,
    liveUrl: "https://personalized-learning-nine.vercel.app/",
    techs: ["react", "nextjs", "firebase", "typescript"],
  },
  {
    title: "SpendWise",
    description:
      "Full-stack personal finance and budget management platform. Built with Next.js 15 App Router, React, Tailwind CSS, and Supabase.",
    category: "Fintech / Fullstack",
    color: "#34d399",
    codeUrl: "https://github.com/Odinaka-123/SpendWise",
    liveUrl: "https://spendwise-beige-five.vercel.app/",
    techs: ["nextjs", "react", "supabase", "tailwindcss"],
  },
  {
    title: "Skwad",
    description:
      "Secure, code-based communication for small trusted groups — no phone numbers, no accounts, no single point of failure. Built with Flutter and React.",
    category: "Security / Mobile + Web",
    color: "#f59e0b",
    codeUrl: "https://github.com/Odinaka-123/Skwad",
    liveUrl: null,
    techs: ["flutter", "react", "typescript", "cplusplus"],
  },
  {
    title: "EasyScript",
    description:
      "A beginner-friendly programming language that reads like natural sentences and compiles down to JavaScript.",
    category: "Programming Language",
    color: "#f97316",
    codeUrl: "https://github.com/Odinaka-123/EasyScript",
    liveUrl: null,
    techs: ["javascript", "nodejs", "typescript", "vscode"],
  },
  {
    title: "EasyScript VSCode",
    description:
      "Official VS Code extension for EasyScript — syntax highlighting, themes, and editor support for the language.",
    category: "Developer Tools",
    color: "#a78bfa",
    codeUrl: "https://github.com/Odinaka-123/EasyScript-Vscode",
    liveUrl: null,
    techs: ["vscode", "typescript", "javascript"],
  },
  {
    title: "Desktop Calculator",
    description:
      "A modern desktop calculator app built with Next.js 16, React 19, Tailwind CSS 4, and packaged with Electron 26.",
    category: "Desktop App",
    color: "#6EE7F7",
    codeUrl: "https://github.com/Odinaka-123/desktop-calculator",
    liveUrl: null,
    techs: ["electron", "nextjs", "react", "tailwindcss"],
  },
  {
    title: "BillWatch",
    description:
      "Automated illegal billboard detection using YOLOv8, street-view imagery, and OSM geospatial validation. Built for Lagos, adaptable globally.",
    category: "AI / Civic Tech",
    color: "#34d399",
    codeUrl: "https://github.com/Odinaka-123/BillWatch",
    liveUrl: null,
    techs: ["python", "pytorch", "opencv", "postgresql"],
  },
  {
    title: "NetGuard IDS",
    description:
      "Hybrid Network Traffic Analysis Intrusion Detection System using ML/DL — Random Forest, SVM, LSTM with PCA dimensionality reduction. Trained on CICIDS2017 & UNSW-NB15.",
    category: "Cybersecurity / ML",
    color: "#f43f5e",
    codeUrl: "https://github.com/Odinaka-123/ntaids",
    liveUrl: null,
    techs: ["python", "pytorch", "linux", "postgresql"],
  },
];

// Map tech keys to devicon class names
const TECH_ICONS: Record<string, { icon: string; label: string }> = {
  python: { icon: "devicon-python-plain", label: "Python" },
  pytorch: { icon: "devicon-pytorch-plain", label: "PyTorch" },
  opencv: { icon: "devicon-opencv-plain", label: "OpenCV" },
  linux: { icon: "devicon-linux-plain", label: "Linux" },
  react: { icon: "devicon-react-original", label: "React" },
  nextjs: { icon: "devicon-nextjs-plain", label: "Next.js" },
  firebase: { icon: "devicon-firebase-plain", label: "Firebase" },
  typescript: { icon: "devicon-typescript-plain", label: "TypeScript" },
  supabase: { icon: "devicon-supabase-plain", label: "Supabase" },
  tailwindcss: { icon: "devicon-tailwindcss-plain", label: "Tailwind" },
  flutter: { icon: "devicon-flutter-plain", label: "Flutter" },
  cplusplus: { icon: "devicon-cplusplus-plain", label: "C++" },
  javascript: { icon: "devicon-javascript-plain", label: "JavaScript" },
  nodejs: { icon: "devicon-nodejs-plain", label: "Node.js" },
  vscode: { icon: "devicon-vscode-plain", label: "VSCode" },
  electron: { icon: "devicon-electron-original", label: "Electron" },
  postgresql: { icon: "devicon-postgresql-plain", label: "PostgreSQL" },
};

const TOTAL = PROJECTS.length;

function useViewportSize() {
  const [width, setWidth] = useState(1200);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const dragDelta = useRef(0);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovered, setHovered] = useState(false);
  const viewportWidth = useViewportSize();

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const CARD_W =
    isMobile ? Math.min(280, viewportWidth - 64)
    : isTablet ? 300
    : 340;
  const CARD_H =
    isMobile ? 400
    : isTablet ? 410
    : 420;

  const goTo = useCallback((index: number) => {
    setActive(((index % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (!hovered) {
      autoRef.current = setInterval(() => {
        setActive((a) => (a + 1) % TOTAL);
      }, 3500);
    }
  }, [hovered]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [hovered, resetAuto]);

  const handleDragStart = (clientX: number) => {
    setDragging(true);
    dragStart.current = clientX;
    dragDelta.current = 0;
  };

  const handleDragMove = (clientX: number) => {
    if (!dragging) return;
    dragDelta.current = clientX - dragStart.current;
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    if (Math.abs(dragDelta.current) > 60) {
      goTo(dragDelta.current < 0 ? active + 1 : active - 1);
    }
    dragDelta.current = 0;
    resetAuto();
  };

  const angleStep = (2 * Math.PI) / TOTAL;
  const radius =
    isMobile ?
      TOTAL <= 4 ? 160
      : TOTAL <= 6 ? 200
      : 230
    : isTablet ?
      TOTAL <= 4 ? 260
      : TOTAL <= 6 ? 320
      : 370
    : TOTAL <= 4 ? 320
    : TOTAL <= 6 ? 400
    : 460;
  const perspective =
    isMobile ? 600
    : isTablet ? 760
    : 900;

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#09090f", minHeight: "100vh" }}
    >
      {/* Devicons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      {/* Grid bg */}
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

      {/* Radial glow behind carousel */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(110,231,247,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <p
            className="text-xs uppercase tracking-[2.5px] mb-4 flex items-center justify-center gap-3"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(110,231,247,0.7)",
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
            Work
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "rgba(110,231,247,0.6)",
              }}
            />
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "-1.5px",
            }}
          >
            Featured{" "}
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>
              Projects
            </span>
          </h2>
          <p
            className="mt-4 text-sm"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {active + 1} / {TOTAL} — drag or use arrows to explore
          </p>
        </div>

        {/* Carousel stage */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: CARD_H + (isMobile ? 140 : 220),
            perspective,
            perspectiveOrigin: "50% 50%",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            handleDragEnd();
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {PROJECTS.map((project, i) => {
            const offset = i - active;
            // Normalise offset to [-TOTAL/2, TOTAL/2]
            const norm =
              offset > TOTAL / 2 ? offset - TOTAL
              : offset < -TOTAL / 2 ? offset + TOTAL
              : offset;

            const angle = norm * angleStep;
            const tx = Math.sin(angle) * radius;
            const tz = Math.cos(angle) * radius - radius;
            const rotateY = -angle * (180 / Math.PI); // full rotation, true cylindrical bend
            const scale = 0.4 + 0.6 * Math.cos(angle);
            const opacity = Math.max(
              0,
              0.1 + 0.9 * Math.pow(Math.cos(angle), 1.5),
            );
            const isActive = norm === 0;
            const isNear = Math.abs(norm) <= 1;
            const zIndex = Math.round(100 * Math.cos(angle));

            const cardTransform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotateY}deg) scale(${scale})`;

            return (
              <div
                key={project.title}
                style={{ position: "absolute", width: CARD_W, height: CARD_H }}
              >
                {/* Main card */}
                <div
                  onClick={() => !dragging && goTo(i)}
                  style={{
                    position: "absolute",
                    width: CARD_W,
                    height: CARD_H,
                    transform: cardTransform,
                    opacity,
                    zIndex,
                    transition:
                      dragging ? "none" : (
                        "transform 0.6s cubic-bezier(0.23,1,0.32,1), opacity 0.6s ease, scale 0.6s ease"
                      ),
                    cursor: isActive ? "default" : "pointer",
                    userSelect: "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ProjectCard
                    project={project}
                    active={isActive}
                    near={isNear}
                  />
                </div>

                {/* Mirror reflection */}
                <div
                  style={{
                    position: "absolute",
                    width: CARD_W,
                    height: CARD_H,
                    transform: `${cardTransform} scaleY(-1) translateY(${CARD_H * 2 + 12}px)`,
                    opacity: opacity * 0.18,
                    zIndex: zIndex - 1,
                    transition:
                      dragging ? "none" : (
                        "transform 0.6s cubic-bezier(0.23,1,0.32,1), opacity 0.6s ease"
                      ),
                    pointerEvents: "none",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 60%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 60%)",
                    filter: "blur(1px)",
                  }}
                >
                  <ProjectCard
                    project={project}
                    active={isActive}
                    near={isNear}
                  />
                </div>
              </div>
            );
          })}

          {/* Floor gradient to ground the mirror */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: -180,
              left: "50%",
              transform: "translateX(-50%)",
              width: "120%",
              height: 220,
              background:
                "linear-gradient(to bottom, #09090f 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => {
              goTo(active - 1);
              resetAuto();
            }}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(110,231,247,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(110,231,247,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "#6EE7F7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.5)";
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goTo(i);
                  resetAuto();
                }}
                style={{
                  width: i === active ? 24 : 6,
                  height: 6,
                  borderRadius: 3,
                  background:
                    i === active ? "#6EE7F7" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              goTo(active + 1);
              resetAuto();
            }}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              width: 44,
              height: 44,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(110,231,247,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(110,231,247,0.25)";
              (e.currentTarget as HTMLButtonElement).style.color = "#6EE7F7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.09)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.5)";
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  active,
  near,
}: {
  project: (typeof PROJECTS)[0];
  active: boolean;
  near: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-full rounded-2xl flex flex-col overflow-hidden relative"
      style={{
        background: "linear-gradient(160deg, #12121e 0%, #0c0c18 100%)",
        border: `1px solid ${
          active && hovered ? project.color + "55"
          : active ? project.color + "33"
          : "rgba(255,255,255,0.06)"
        }`,
        boxShadow:
          active ?
            `0 0 0 1px ${project.color}22, 0 32px 80px rgba(0,0,0,0.7), 0 0 60px ${project.color}18`
          : "0 8px 32px rgba(0,0,0,0.5)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Top accent */}
      <div
        className="h-[3px] w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      {/* Category pill */}
      <div className="px-5 pt-4">
        <span
          className="text-[10px] uppercase tracking-[1.5px] px-3 py-1 rounded-full"
          style={{
            fontFamily: "Inter, sans-serif",
            color: project.color,
            background: project.color + "15",
            border: `1px solid ${project.color}30`,
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Title + desc */}
      <div className="px-5 pt-4 flex-1">
        <h3
          className="text-white font-bold mb-3 leading-tight"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: 20,
            letterSpacing: "-0.4px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Tech icons */}
      <div className="px-5 pb-4">
        <div
          className="pt-4 mb-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-[9px] uppercase tracking-widest mb-3"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Stack
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {project.techs.map((tech) => {
              const t = TECH_ICONS[tech];
              if (!t) return null;
              return (
                <div key={tech} className="relative group/icon">
                  <i
                    className={`${t.icon} colored`}
                    style={{ fontSize: 24 }}
                    title={t.label}
                  />
                  {/* Tooltip */}
                  <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded text-[10px] whitespace-nowrap pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      background: "rgba(0,0,0,0.85)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {t.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.9)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.09)";
              }}
            >
              <Github size={13} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#09090f",
                background: project.color,
                border: `1px solid ${project.color}`,
                textDecoration: "none",
              }}
            >
              <ExternalLink size={13} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
