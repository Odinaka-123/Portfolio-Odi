"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090f]/80 backdrop-blur-md border-b border-white/[0.09]"
          : "bg-transparent border-b border-white/[0.05]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-[62px]">

          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 font-display font-semibold text-[16px] tracking-[-0.4px] text-white"
          >
            Odi Ezurike
            <span className="text-[9px] font-medium font-body uppercase tracking-[0.8px] text-[#6EE7F7]/80 bg-[#6EE7F7]/[0.08] border border-[#6EE7F7]/20 px-[7px] py-[2px] rounded-[4px]">
              Fullstack
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {["about", "projects", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s)}
                className="capitalize text-[13.5px] font-body text-white/45 hover:text-white/90 hover:bg-white/[0.05] px-[14px] py-[6px] rounded-[6px] transition-all duration-150"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-px h-[18px] bg-white/[0.08] mx-1" />
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-[34px] h-[34px] flex items-center justify-center rounded-[7px] border border-white/[0.09] bg-white/[0.03] text-white/50 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#09090f]/90 backdrop-blur-md">
            <div className="py-4 px-2 space-y-0.5">
              {["about", "projects", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(s)}
                  className="block w-full text-left capitalize text-sm font-body text-white/45 hover:text-white/90 hover:bg-white/[0.05] px-4 py-3 rounded-[6px] transition-all duration-150"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}