"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const brands = [
  {
    name: "Agoda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png",
    alt: "Agoda Logo",
  },
  {
    name: "Booking.com",
    logo: "https://cf.bstatic.com/static/img/booking_logo_knowledge_graph/247454a990efac1952e44dddbf30c58677aa0fd8.png",
    alt: "Booking.com Logo",
  },
  {
    name: "Kayak",
    logo: "https://logos-world.net/wp-content/uploads/2021/03/Kayak-Emblem.png",
    alt: "Kayak Logo",
  },
  {
    name: "Google Reviews",
    logo: "https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png",
    alt: "Google Reviews Logo",
  },
  {
    name: "TripAdvisor",
    logo: "https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg",
    alt: "TripAdvisor Logo",
  },
]

export default function TrustedBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollPosition)
      checkScrollPosition()
      return () => container.removeEventListener("scroll", checkScrollPosition)
    }
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

        // If at the end, scroll back to start
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          })
        } else {
          scroll("right")
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [autoPlay])

  return (
    <section className="section-padding bg-muted/30">
      <div className="section-max-width">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Trusted by Leading Booking Platforms</h2>
          <p className="text-lg text-foreground/70">Recognized and recommended by the world's top travel providers</p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => {
              setAutoPlay(false)
              scroll("left")
            }}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur p-2 rounded-full shadow-lg border border-border hover:bg-background transition-all ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            } hidden md:flex items-center justify-center`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-foreground" size={24} />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar py-8 px-4"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 md:w-56 bg-card border border-border rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-all hover:scale-105 group"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.alt}
                  className="max-w-full max-h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate brands for infinite scroll effect on larger screens */}
            {brands.map((brand, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-48 md:w-56 bg-card border border-border rounded-xl p-8 flex items-center justify-center hover:shadow-lg transition-all hover:scale-105 group hidden md:flex"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.alt}
                  className="max-w-full max-h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              setAutoPlay(false)
              scroll("right")
            }}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur p-2 rounded-full shadow-lg border border-border hover:bg-background transition-all ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            } hidden md:flex items-center justify-center`}
            aria-label="Scroll right"
          >
            <ChevronRight className="text-foreground" size={24} />
          </button>
        </div>

        {/* Mobile: Scroll indicator */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          <div className="text-sm text-foreground/60 flex items-center gap-2">
            <span>Swipe to see more</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </section>
  )
}
