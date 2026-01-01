"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "/pristine-tropical-beach-with-palm-trees-sunset.jpg",
    title: "Your Tropical Paradise Awaits",
    subtitle: "Experience luxury, adventure, and pristine beaches at Coco Mangos Place Resort",
  },
  {
    image: "/luxury-resort-.jpg",
    title: "World-Class Accommodations",
    subtitle: "Discover our exquisite rooms and suites with stunning views",
  },
  {
    image: "/tropical-resort-lobby-with-palm-trees.jpg",
    title: "Island Adventures Await",
    subtitle: "Explore Bohol with our exclusive tour packages",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{slides[current].title}</h2>
        <p className="text-xl md:text-2xl mb-8 text-white/90">{slides[current].subtitle}</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/accommodation"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:opacity-90 transition-all inline-block"
          >
            Book Your Stay
          </a>
          <a
            href="/how-it-works"
            className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all inline-block"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 hover:bg-white/50 rounded-full transition text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 hover:bg-white/50 rounded-full transition text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setIsAutoPlay(false)
            }}
            className={`w-3 h-3 rounded-full transition ${index === current ? "bg-white w-8" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  )
}
