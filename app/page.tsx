"use client"

import { useEffect, useState } from "react"
import {
  Home,
  Info,
  Bed,
  Compass,
  Phone,
  Trophy,
  Star,
  Users,
  Leaf,
  Clock,
  Camera,
  Shield,
  Sparkles,
  Gift,
} from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"
import HeroSlider from "@/components/hero-slider"
import Features from "@/components/features"
import BookingForm from "@/components/booking-form"
import MobileNav from "@/components/mobile-nav"
import BookNowModal from "@/components/book-now-modal"
import TrustedBrands from "@/components/trusted-brands"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPWAInstallable, setIsPWAInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.log("[v0] SW registration failed:", err)
      })
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsPWAInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsPWAInstallable(false)
      }
      setDeferredPrompt(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />
      <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

      {isMenuOpen && (
        <nav className="fixed inset-0 top-16 bg-background/95 backdrop-blur z-40 md:hidden">
          <div className="flex flex-col gap-6 p-6">
            <a href="#home" className="text-foreground font-semibold flex items-center gap-2">
              <Home size={20} /> Home
            </a>
            <a href="/about" className="text-foreground font-semibold flex items-center gap-2">
              <Info size={20} /> About Us
            </a>
            <a href="#rooms" className="text-foreground font-semibold flex items-center gap-2">
              <Bed size={20} /> Accommodation
            </a>
            <a href="#tours" className="text-foreground font-semibold flex items-center gap-2">
              <Compass size={20} /> Tours & Packages
            </a>
            <a href="#contact" className="text-foreground font-semibold flex items-center gap-2">
              <Phone size={20} /> Contact
            </a>
          </div>
        </nav>
      )}

      <main className="flex-1">
        <HeroSlider />
        <Features />

        {/* About Section */}
        <section id="about" className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-balance">Our Tropical Paradise</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  Nestled on pristine white-sand beaches, Coco Mangos Resort is your gateway to paradise. With over 20
                  years of excellence in hospitality, we've perfected the art of tropical luxury.
                </p>
                <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                  Our commitment to sustainability, personalized service, and unforgettable experiences make us the
                  premier destination for travelers seeking authentic tropical bliss.
                </p>
                <a href="/accommodation" className="btn-primary inline-block">
                  Discover More
                </a>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/tropical-resort-lobby-with-palm-trees.jpg"
                  alt="Resort Lobby"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="section-padding bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="section-max-width">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-foreground/70">Luxury Rooms</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">5★</div>
                <p className="text-foreground/70">Rated Resort</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">20+</div>
                <p className="text-foreground/70">Years Active</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <p className="text-foreground/70">Happy Guests</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Preview */}
        <section id="rooms" className="section-padding">
          <div className="section-max-width">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Exquisite Accommodations</h2>
            <p className="text-lg text-foreground/70 mb-12">Discover our world-class rooms and suites</p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { name: "Deluxe Rooms", price: "$299", desc: "Ocean view with modern amenities" },
                { name: "Premium Suites", price: "$499", desc: "Spacious with private terrace" },
                { name: "Beachfront Villas", price: "$799", desc: "Ultimate luxury with direct beach access" },
              ].map((room, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 flex items-center justify-center">
                    <img
                      src={`/luxury-resort-.jpg?key=8s61b&height=200&width=300&query=luxury-resort-${room.name.toLowerCase().replace(/\s+/g, "-")}`}
                      alt={room.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{room.name}</h3>
                    <p className="text-foreground/70 mb-6">{room.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{room.price}</span>
                      <button onClick={() => setIsBookModalOpen(true)} className="btn-secondary text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a href="/accommodation" className="inline-block btn-primary">
              View All Accommodations
            </a>
          </div>
        </section>

        {/* Tours Preview */}
        <section id="tours" className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Adventures Await</h2>
            <p className="text-lg text-foreground/70 mb-12">Experience unforgettable tropical adventures</p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { name: "Island Explorer", price: "$89", time: "Full Day" },
                { name: "Jungle Trek", price: "$65", time: "4 Hours" },
                { name: "Water Sports", price: "$120", time: "6 Hours" },
              ].map((tour, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow p-6"
                >
                  <h3 className="text-2xl font-bold mb-2">{tour.name}</h3>
                  <p className="text-foreground/70 mb-6">{tour.time}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-secondary">{tour.price}</span>
                    <a href="/tour-packages" className="btn-secondary text-sm">
                      Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <a href="/tour-packages" className="inline-block btn-primary">
              Explore All Tours
            </a>
          </div>
        </section>

        {/* Why Choose Our Packages - Expanded to 9 items */}
        <section className="section-padding">
          <div className="section-max-width">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">
              Why Choose Our Tour Packages?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Trophy className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
                <p className="text-foreground/70">
                  Our knowledgeable local guides provide authentic insights into Bohol's culture and nature.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition">
                  <Star className="text-secondary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">All-Inclusive</h3>
                <p className="text-foreground/70">
                  Everything included - meals, transportation, entrance fees, and water activities.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <Users className="text-accent" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Small Groups</h3>
                <p className="text-foreground/70">
                  Intimate group sizes ensure personalized attention and unforgettable memories.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition">
                  <Leaf className="text-green-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
                <p className="text-foreground/70">
                  Sustainable tourism practices protecting Bohol's pristine natural environment.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
                <p className="text-foreground/70">
                  Choose from fixed departures or customize your adventure based on your preferences.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition">
                  <Camera className="text-purple-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Photo Opportunities</h3>
                <p className="text-foreground/70">
                  Stunning backdrops and professional photography tips to capture your adventure.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition">
                  <Shield className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Safety First</h3>
                <p className="text-foreground/70">
                  Comprehensive insurance, safety equipment, and emergency protocols for peace of mind.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition">
                  <Sparkles className="text-yellow-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
                <p className="text-foreground/70">
                  Luxury accommodations, fine dining, and 5-star service throughout your journey.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition group">
                <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition">
                  <Gift className="text-pink-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Special Perks</h3>
                <p className="text-foreground/70">
                  Complimentary snacks, premium beverages, souvenir packages, and welcome gifts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Brands Section */}
        <TrustedBrands />

        {/* Booking Form Section */}
        <section className="section-padding">
          <div className="section-max-width">
            <BookingForm />
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
