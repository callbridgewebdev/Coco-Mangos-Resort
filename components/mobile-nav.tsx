"use client"

import { useState } from "react"
import { Home, Info, Bed, Compass, ImageIcon, Menu } from "lucide-react"
import Link from "next/link"
import MenuModal from "./menu-modal"

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border z-40">
        <div className="flex justify-around py-2">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-foreground/70 hover:text-primary transition p-3 text-center"
          >
            <Home size={22} />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center gap-1 text-foreground/70 hover:text-primary transition p-3 text-center"
          >
            <Info size={22} />
            <span className="text-xs font-medium">About</span>
          </Link>
          <Link
            href="/accommodation"
            className="flex flex-col items-center gap-1 text-foreground/70 hover:text-primary transition p-3 text-center"
          >
            <Bed size={22} />
            <span className="text-xs font-medium">Rooms</span>
          </Link>
          <Link
            href="/tour-packages"
            className="flex flex-col items-center gap-1 text-foreground/70 hover:text-primary transition p-3 text-center"
          >
            <Compass size={22} />
            <span className="text-xs font-medium">Tours</span>
          </Link>
          <Link
            href="/gallery"
            className="flex flex-col items-center gap-1 text-foreground/70 hover:text-primary transition p-3 text-center"
          >
            <ImageIcon size={22} />
            <span className="text-xs font-medium">Gallery</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-foreground/70 hover:text-primary transition p-3 text-center"
          >
            <Menu size={22} />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>

      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
