"use client"
import Link from "next/link"
import { X } from "lucide-react"

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  if (!isOpen) return null

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Accommodations", href: "/accommodation" },
    { label: "Function Rooms", href: "/function-rooms" },
    { label: "Tour Packages", href: "/tour-packages" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
    { label: "F.A.Q", href: "/faq" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "News & Blog", href: "/news-blog" },
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
  ]

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="absolute bottom-20 left-0 right-0 mx-4 bg-background border-2 border-primary/30 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 z-50 overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 border-b border-primary/20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Navigation Menu
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-primary/10 rounded-lg transition-all hover:scale-110"
              aria-label="Close menu"
            >
              <X size={24} className="text-foreground" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="px-4 py-3 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 text-foreground text-sm font-semibold transition-all duration-300 text-center hover:bg-gradient-to-br hover:from-primary/15 hover:to-secondary/15 hover:border-primary/50 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
