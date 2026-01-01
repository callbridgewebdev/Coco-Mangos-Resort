"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }

    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <button
        onClick={toggleTheme}
        className="fixed bottom-36 md:bottom-8 right-4 md:right-6 z-50 p-2 rounded-full bg-primary text-primary-foreground hover:opacity-80 transition-all shadow-lg"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {children}
    </>
  )
}
