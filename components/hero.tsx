"use client"

import { ChevronDown } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src="/pristine-tropical-beach-with-palm-trees-sunset.jpg" alt="Tropical Beach" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Your Tropical Paradise Awaits</h2>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Experience luxury, adventure, and pristine beaches at Coco Mangos Resort
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:opacity-90 transition-all">
            Book Your Stay
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  )
}
