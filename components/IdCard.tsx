"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Pin, PinOff } from "lucide-react";

interface CardPhysics {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotateX: number;
  rotateY: number;
  ropePoints: { x: number; y: number; vx: number; vy: number }[];
}

interface IdCardProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  initialized: boolean;
  onSkillsClick?: () => void;
}

const ROPE_SEGMENTS = 22;
const CARD_W = 230;
const CARD_H = 330;
const STRAP_W = 16;
const SEGMENT_LEN = 14;
const PINNED_Y_RATIO = 0.42;

const ALL_SKILLS = [
  "React",
  "Python",
  "SQL",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "GraphQL",
  "Redis",
];
const VISIBLE_SKILLS = ALL_SKILLS.slice(0, 2);
const HIDDEN_COUNT = ALL_SKILLS.length - VISIBLE_SKILLS.length;

const initRope = () =>
  Array.from({ length: ROPE_SEGMENTS }, (_, i) => ({
    x: 0,
    y: i * SEGMENT_LEN,
    vx: 0,
    vy: 0,
  }));

export function IdCard({
  containerRef,
  initialized,
  onSkillsClick,
}: IdCardProps) {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const hasKicked = useRef(false);
  const isPinnedRef = useRef(false);

  const physics = useRef<CardPhysics>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotateX: 0,
    rotateY: 0,
    ropePoints: initRope(),
  });

  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [ropePoints, setRopePoints] = useState(initRope());
  const [anchorX, setAnchorX] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  const getContainer = useCallback(() => svgContainerRef.current, []);

  const getPinnedPos = useCallback(() => {
    const container = getContainer();
    if (!container) return { x: 0, y: 0 };
    const rect = container.getBoundingClientRect();
    return {
      x: rect.width * 0.5,
      y: rect.height * PINNED_Y_RATIO,
    };
  }, [getContainer]);

  // Init — park card above viewport
  useEffect(() => {
    const container = getContainer();
    if (!container || !initialized) return;
    const rect = container.getBoundingClientRect();
    const ax = rect.width * 0.5;
    setAnchorX(ax);
    physics.current.x = ax;
    physics.current.y = -CARD_H;
    physics.current.vx = 0;
    physics.current.vy = 0;
    physics.current.ropePoints = Array.from({ length: ROPE_SEGMENTS }, () => ({
      x: ax,
      y: 0,
      vx: 0,
      vy: 0,
    }));
    setCardPos({ x: ax, y: -CARD_H });
    setRopePoints([...physics.current.ropePoints]);
    hasKicked.current = false;
  }, [initialized, getContainer]);

  // Physics loop
  useEffect(() => {
    if (!initialized) return;
    const container = getContainer();
    if (!container) return;

    const GRAVITY = 0.6;
    const DAMPING = 0.83;
    const CARD_DAMPING = 0.91;
    const CARD_GRAVITY = 1.2;

    const simulate = () => {
      const p = physics.current;
      const rect = container.getBoundingClientRect();
      const ax = rect.width * 0.5;
      const ay = 0;

      if (!hasKicked.current) {
        hasKicked.current = true;
        p.x = ax;
        p.y = -10;
        p.vy = 12;
        p.vx = 0;
      }

      if (!isDragging.current && !isPinnedRef.current) {
        p.vy += CARD_GRAVITY;
        p.vx *= CARD_DAMPING;
        p.vy *= CARD_DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < CARD_W / 2) {
          p.x = CARD_W / 2;
          p.vx *= -0.45;
        }
        if (p.x > rect.width - CARD_W / 2) {
          p.x = rect.width - CARD_W / 2;
          p.vx *= -0.45;
        }
        if (p.y < 80) {
          p.y = 80;
          p.vy *= -0.5;
        }
        if (p.y > rect.height - CARD_H / 2) {
          p.y = rect.height - CARD_H / 2;
          p.vy *= -0.62;
        }
      } else if (isPinnedRef.current && !isDragging.current) {
        const pinned = getPinnedPos();
        p.x += (pinned.x - p.x) * 0.08;
        p.y += (pinned.y - p.y) * 0.08;
        p.vx *= 0.7;
        p.vy *= 0.7;
      }

      // Rope Verlet
      const rope = p.ropePoints;
      rope[0].x = ax;
      rope[0].y = ay;
      rope[0].vx = 0;
      rope[0].vy = 0;

      for (let i = 1; i < rope.length - 1; i++) {
        rope[i].vy += GRAVITY;
        rope[i].vx *= DAMPING;
        rope[i].vy *= DAMPING;
        rope[i].x += rope[i].vx;
        rope[i].y += rope[i].vy;
      }

      for (let iter = 0; iter < 8; iter++) {
        rope[0].x = ax;
        rope[0].y = ay;
        for (let i = 1; i < rope.length - 1; i++) {
          const dx = rope[i].x - rope[i - 1].x;
          const dy = rope[i].y - rope[i - 1].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const diff = (dist - SEGMENT_LEN) / dist;
          rope[i].x -= dx * diff * 0.5;
          rope[i].y -= dy * diff * 0.5;
          rope[i - 1].x += dx * diff * 0.5;
          rope[i - 1].y += dy * diff * 0.5;
        }
        rope[rope.length - 1].x = p.x;
        rope[rope.length - 1].y = p.y - CARD_H / 2 - 10;
        const dx = rope[rope.length - 2].x - rope[rope.length - 1].x;
        const dy = rope[rope.length - 2].y - rope[rope.length - 1].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        if (dist > SEGMENT_LEN) {
          const diff = (dist - SEGMENT_LEN) / dist;
          rope[rope.length - 2].x -= dx * diff * 0.5;
          rope[rope.length - 2].y -= dy * diff * 0.5;
        }
      }

      setCardPos({ x: p.x, y: p.y });
      setRopePoints([...rope]);
      setAnchorX(ax);
      animFrameRef.current = requestAnimationFrame(simulate);
    };

    animFrameRef.current = requestAnimationFrame(simulate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [initialized, getContainer, getPinnedPos]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const container = getContainer();
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const p = physics.current;
      p.vx = (e.clientX - lastMouse.current.x) * 0.6;
      p.vy = (e.clientY - lastMouse.current.y) * 0.6;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      p.x = e.clientX - rect.left;
      p.y = e.clientY - rect.top;
      const rx = Math.max(-25, Math.min(25, -p.vy * 1.5));
      const ry = Math.max(-25, Math.min(25, p.vx * 1.5));
      p.rotateX = rx;
      p.rotateY = ry;
      setTilt({ rx, ry });
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const container = getContainer();
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const p = physics.current;
      p.vx = (touch.clientX - lastMouse.current.x) * 0.6;
      p.vy = (touch.clientY - lastMouse.current.y) * 0.6;
      lastMouse.current = { x: touch.clientX, y: touch.clientY };
      p.x = touch.clientX - rect.left;
      p.y = touch.clientY - rect.top;
      e.preventDefault();
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [getContainer]);

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isPinned;
    setIsPinned(next);
    isPinnedRef.current = next;
    if (!next) {
      physics.current.vy = 18;
      physics.current.vx = (Math.random() - 0.5) * 6;
    }
  };

  const buildStrapOutline = () => {
    if (ropePoints.length < 2) return "";
    const half = STRAP_W / 2;
    const left: string[] = [];
    const right: string[] = [];
    for (let i = 0; i < ropePoints.length; i++) {
      const prev = ropePoints[Math.max(0, i - 1)];
      const next = ropePoints[Math.min(ropePoints.length - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = (-dy / len) * half;
      const ny = (dx / len) * half;
      left.push(
        `${(ropePoints[i].x + nx).toFixed(2)},${(ropePoints[i].y + ny).toFixed(2)}`,
      );
      right.push(
        `${(ropePoints[i].x - nx).toFixed(2)},${(ropePoints[i].y - ny).toFixed(2)}`,
      );
    }
    return `M ${left[0]} L ${left.slice(1).join(" L ")} L ${right[right.length - 1]} L ${right.slice(0, -1).reverse().join(" L ")} Z`;
  };

  const strapPath =
    ropePoints.length > 1 ?
      `M ${ropePoints[0].x} ${ropePoints[0].y} ` +
      ropePoints
        .slice(1)
        .map((p) => `L ${p.x} ${p.y}`)
        .join(" ")
    : "";

  const strapOutline = buildStrapOutline();
  const tipPt = ropePoints[ropePoints.length - 1];

  return (
    <div ref={svgContainerRef} className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <pattern
            id="lanyardStripe"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="5" height="10" fill="rgba(110,231,247,0.22)" />
            <rect x="5" width="5" height="10" fill="rgba(129,140,248,0.12)" />
          </pattern>
          <filter id="strapShadow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodColor="rgba(110,231,247,0.3)"
            />
          </filter>
        </defs>

        {/* Anchor clip */}
        <rect
          x={anchorX - 10}
          y={0}
          width={20}
          height={22}
          rx={4}
          fill="#1a2535"
          stroke="rgba(110,231,247,0.55)"
          strokeWidth={1.5}
        />
        <rect
          x={anchorX - 4}
          y={5}
          width={8}
          height={12}
          rx={2.5}
          fill="none"
          stroke="rgba(110,231,247,0.8)"
          strokeWidth={1.2}
        />

        {/* Strap body */}
        <path
          d={strapOutline}
          fill="url(#lanyardStripe)"
          filter="url(#strapShadow)"
        />
        <path
          d={strapPath}
          fill="none"
          stroke="rgba(110,231,247,0.55)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: `translateX(${-STRAP_W / 2}px)` }}
        />
        <path
          d={strapPath}
          fill="none"
          stroke="rgba(110,231,247,0.55)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: `translateX(${STRAP_W / 2}px)` }}
        />
        <path
          d={strapPath}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom clip */}
        <rect
          x={tipPt.x - 12}
          y={tipPt.y - 10}
          width={24}
          height={18}
          rx={4}
          fill="#1a2535"
          stroke="rgba(110,231,247,0.65)"
          strokeWidth={1.5}
        />
        <rect
          x={tipPt.x - 6}
          y={tipPt.y - 5}
          width={12}
          height={9}
          rx={2.5}
          fill="none"
          stroke="rgba(110,231,247,0.85)"
          strokeWidth={1.2}
        />
      </svg>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseDown={onMouseDown}
        onTouchStart={(e) => {
          isDragging.current = true;
          const touch = e.touches[0];
          const container = getContainer()!;
          const rect = container.getBoundingClientRect();
          physics.current.x = touch.clientX - rect.left;
          physics.current.y = touch.clientY - rect.top;
          lastMouse.current = { x: touch.clientX, y: touch.clientY };
        }}
        className="absolute pointer-events-auto"
        style={{
          left: cardPos.x - CARD_W / 2,
          top: cardPos.y - CARD_H / 2,
          width: CARD_W,
          height: CARD_H,
          cursor: isDragging.current ? "grabbing" : "grab",
          transform: `perspective(700px) rotateX(${isPinned ? 0 : tilt.rx}deg) rotateY(${isPinned ? 0 : tilt.ry}deg)`,
          transition: isDragging.current ? "none" : "transform 0.3s ease",
          userSelect: "none",
        }}
      >
        <div
          className="w-full h-full rounded-2xl overflow-hidden flex flex-col relative"
          style={{
            background: "linear-gradient(160deg, #12121e 0%, #0d0d1a 100%)",
            border: "1px solid rgba(110,231,247,0.2)",
            boxShadow:
              isPinned ?
                "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1.5px rgba(110,231,247,0.35)"
              : "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="h-2 w-full flex-shrink-0"
            style={{ background: "linear-gradient(90deg, #6EE7F7, #818cf8)" }}
          />

          <button
            onClick={handlePin}
            className="absolute top-4 right-3 z-10"
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background:
                isPinned ? "rgba(110,231,247,0.15)" : "rgba(255,255,255,0.05)",
              border:
                isPinned ?
                  "1px solid rgba(110,231,247,0.5)"
                : "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {isPinned ?
              <PinOff
                style={{
                  width: 12,
                  height: 12,
                  color: "rgba(110,231,247,0.9)",
                }}
              />
            : <Pin
                style={{
                  width: 12,
                  height: 12,
                  color: "rgba(255,255,255,0.4)",
                }}
              />
            }
          </button>

          <div className="flex flex-col items-center flex-1 px-5 pt-4 pb-4">
            <div
              className="text-[9px] uppercase tracking-[2px] mb-3 w-full text-center pb-3"
              style={{
                color: "rgba(110,231,247,0.5)",
                fontFamily: "Inter, sans-serif",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              Portfolio · 2026
            </div>

            <div
              className="rounded-xl overflow-hidden mb-3"
              style={{
                width: 90,
                height: 90,
                border: "2px solid rgba(110,231,247,0.25)",
                boxShadow: "0 0 20px rgba(110,231,247,0.1)",
                flexShrink: 0,
              }}
            >
              <img
                src="https://ik.imagekit.io/ovkmq81lc/linkdln1.jpg?updatedAt=1754413915965"
                alt="Odi Ezurike"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                draggable={false}
              />
            </div>

            <h3
              className="text-white font-semibold text-center leading-tight mb-0.5"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 16,
                letterSpacing: "-0.3px",
              }}
            >
              Odi Ezurike
            </h3>
            <p
              className="text-center mb-4"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Fullstack Engineer
            </p>

            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              {VISIBLE_SKILLS.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10,
                    color: "rgba(110,231,247,0.7)",
                    background: "rgba(110,231,247,0.07)",
                    border: "1px solid rgba(110,231,247,0.15)",
                    padding: "3px 8px",
                    borderRadius: 4,
                    letterSpacing: "0.5px",
                  }}
                >
                  {s}
                </span>
              ))}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSkillsClick?.();
                }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "3px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                }}
              >
                +{HIDDEN_COUNT} more →
              </button>
            </div>

            <div
              className="w-full"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                marginTop: "auto",
              }}
            />
            <div className="w-full pt-3">
              <div className="flex justify-center gap-[2px] mb-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i % 3 === 0 ? 2 : 1,
                      height: i % 5 === 0 ? 16 : 11,
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
              <p
                className="text-center"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 8,
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "2px",
                }}
              >
                OE-2026-FS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
