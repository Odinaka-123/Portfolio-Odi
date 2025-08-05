"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function ProfileHero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <img
            src="https://ik.imagekit.io/ovkmq81lc/linkdln1.jpg?updatedAt=1754413915965"
            alt="Profile Photo"
            className="w-48 h-48 rounded-full mx-auto mb-6 shadow-2xl border-4 border-white dark:border-gray-700 object-cover"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Odi Ezurike
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-light">
            Software Engineer | Front-End
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Creating seamless digital experiences with a passion for design and functionality
          </p>
        </div>

        <Button
          onClick={scrollToAbout}
          variant="outline"
          size="lg"
          className="rounded-full px-8 py-6 text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        >
          Learn More About Me
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
