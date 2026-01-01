"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import BookNowModal from "./book-now-modal"
import { Globe } from "lucide-react"

interface HeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const [showTranslate, setShowTranslate] = useState(false)
  const [showBookModal, setShowBookModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const email = localStorage.getItem("guestEmail")
    setIsLoggedIn(!!email)
  }, [])

  const handleBookNow = () => {
    if (isLoggedIn) {
      window.location.href = "/guest-dashboard"
    } else {
      setShowBookModal(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-background border-b border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/coco-mangos-logo.png"
              alt="Coco Mangos Place Resort Logo"
              width={50}
              height={50}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Coco Mangos</h1>
              <p className="text-xs text-foreground/60">Place Resort</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Accommodations", href: "/accommodation" },
              { label: "Function Rooms", href: "/function-rooms" },
              { label: "Tour Packages", href: "/tour-packages" },
              { label: "Gallery", href: "/gallery" },
              { label: "Reviews", href: "/reviews" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 hover:text-primary font-medium transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowTranslate(!showTranslate)}
                className="p-2 rounded-lg border border-border hover:border-primary hover:bg-muted transition group"
                aria-label="Change language"
              >
                <Globe size={20} className="text-foreground/80 group-hover:text-primary transition" />
              </button>
              {showTranslate && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg p-3 z-50">
                  <p className="text-xs text-foreground/60 px-2 py-1 font-semibold mb-2">Select Language</p>
                  <div id="google-translate-element" className="px-2 py-2"></div>
                </div>
              )}
            </div>
            <button className="btn-primary" onClick={handleBookNow}>
              {isLoggedIn ? "Dashboard" : "Book Now"}
            </button>
          </div>

          {/* Mobile Actions - Language first, then Book Now */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setShowTranslate(!showTranslate)}
              className="p-2 rounded-lg border border-border hover:border-primary hover:bg-muted transition group"
              aria-label="Change language"
            >
              <Globe size={18} className="text-foreground/80 group-hover:text-primary transition" />
            </button>
            {showTranslate && (
              <div className="absolute top-16 right-12 w-56 bg-card border border-border rounded-lg shadow-lg p-3 z-50">
                <p className="text-xs text-foreground/60 px-2 py-1 font-semibold mb-2">Language</p>
                <div id="google-translate-element-mobile" className="px-2 py-2"></div>
              </div>
            )}
            <button className="btn-primary text-sm py-2 px-3" onClick={handleBookNow}>
              {isLoggedIn ? "Dashboard" : "Book Now"}
            </button>
          </div>
        </div>
      </header>

      {/* Book Now Modal */}
      {showBookModal && <BookNowModal isOpen={showBookModal} onClose={() => setShowBookModal(false)} />}
    </>
  )
}
