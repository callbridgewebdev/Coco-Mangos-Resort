"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { useState } from "react"

export default function TourPackagesPage() {
  const [activeDuration, setActiveDuration] = useState("3d")

  const packages3d = [
    {
      id: 1,
      name: "BOHOL COUNTRYSIDE TOUR",
      duration: "3D/2N",
      price: 599,
      rating: 4.8,
      reviews: 156,
      image: "/gallery-beach-1.jpg",
      description: "Explore the most popular destinations at Bohol's best tourist spots",
      highlights: [
        "Tarsier Sanctuary",
        "Hanging Bridge",
        "Blood Compact Shrine",
        "Man-made Forest",
        "Albur Python",
        "Butterfly Garden",
        "Zip-line/Cable Cart Ride",
        "Chocolate Hills",
      ],
      includes: [
        "3D/2N air-conditioned room accommodations",
        "FREE Breakfast daily",
        "Countryside tour entrance fees",
        "Roundtrip airport/pier transfer",
        "Air-conditioned car/van",
        "Shuttle to Alona Beach",
        "Welcome drinks",
      ],
      excludes: ["Roundtrip airfare", "Other meals", "Entrance fees (additional)"],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park – Zip-line and Cable Car Ride",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
      ],
    },
    {
      id: 2,
      name: "ISLAND HOPPING & DOLPHIN WATCHING",
      duration: "3D/2N",
      price: 749,
      rating: 4.9,
      reviews: 203,
      image: "/gallery-beach-2.jpg",
      description:
        "Experience island hopping and watch dolphins in their natural habitat with Balicasag Marine Sanctuary",
      highlights: [
        "Balicasag Island",
        "Dolphin watching",
        "Snorkeling opportunities",
        "Exotic fish viewing",
        "Wild dolphins",
        "Bohol water birds",
        "Countryside tour",
      ],
      includes: [
        "3D/2N air-conditioned accommodations",
        "FREE Breakfast daily",
        "Countryside tour",
        "Balicasag and island hopping",
        "Free lunch pack",
        "Roundtrip airport/pier transfer",
        "Motorized boat",
        "Air-conditioned vehicle",
        "Shuttle to Alona Beach",
        "Welcome drinks",
      ],
      excludes: [
        "Roundtrip airfare",
        "Balicasag Marine Sanctuary entrance fees",
        "Snorkeling gear rental (₱130 per mask/snorkel, ₱130 per aqua socks)",
        "Other meals",
        "Countryside tour entrance fees",
      ],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
        "Balicasag Island",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
      ],
    },
    {
      id: 3,
      name: "COUNTRYSIDE + PANGLAO ISLAND TOUR",
      duration: "3D/2N",
      price: 799,
      rating: 4.8,
      reviews: 178,
      image: "/gallery-pool-1.jpg",
      description: "Combine Bohol countryside with scenic Panglao Island exploration and beach relaxation",
      highlights: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park",
        "Tarsier Conservation Center",
        "Chocolate Hills",
        "Dauis Church",
        "Bohol Bee Farm",
        "Hinagdanan Cave",
        "Panglao Tower",
      ],
      includes: [
        "3D/2N air-conditioned accommodations",
        "FREE Breakfast daily",
        "Countryside tour",
        "Panglao Island tour",
        "Roundtrip airport/pier transfer",
        "Air-conditioned vehicle",
        "Shuttle to Alona Beach",
        "Welcome drinks",
      ],
      excludes: ["Roundtrip airfare", "Other meals", "Countryside tour/Panglao tour entrance fees"],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park – Zip-line and Cable Car Ride",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
        "Dauis Church",
        "Bohol Bee Farm",
        "Nova Sea Shell Museum",
        "Hinagdanan Cave",
        "Panglao Tower",
        "Alona Beach",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
      ],
    },
    {
      id: 4,
      name: "ULTIMATE BOHOL EXPERIENCE",
      duration: "3D/2N",
      price: 999,
      rating: 5.0,
      reviews: 287,
      image: "/gallery-night-1.jpg",
      description: "The ultimate Bohol adventure - countryside, island hopping, and Panglao island exploration",
      highlights: [
        "Full countryside tour",
        "Island hopping with dolphins",
        "Panglao island tour",
        "Snorkeling adventures",
        "Beach relaxation",
        "Cultural sites",
        "Natural wonders",
        "Surprise souvenir",
      ],
      includes: [
        "3D/2N air-conditioned accommodations",
        "FREE Breakfast daily",
        "Countryside tour",
        "Balicasag and island hopping",
        "Panglao island tour",
        "Roundtrip airport/pier transfer",
        "Motorized boat",
        "Air-conditioned vehicle",
        "Shuttle to Alona Beach",
        "Welcome drinks",
        "Free souvenir",
      ],
      excludes: [
        "Roundtrip airfare",
        "Balicasag Marine Sanctuary entrance fees",
        "Snorkeling gear rental (₱130 per mask/snorkel, ₱130 per aqua socks)",
        "Other meals",
        "Countryside tour/Panglao tour entrance fees",
      ],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park – Zip-line and Cable Car Ride",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
        "Balicasag Island",
        "Dauis Church",
        "Bohol Bee Farm",
        "Nova Sea Shell Museum",
        "Hinagdanan Cave",
        "Panglao Tower",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
        "Includes free surprise souvenir item",
      ],
    },
  ]

  const packages4d = [
    {
      id: 5,
      name: "BOHOL COUNTRYSIDE TOUR",
      duration: "4D/3N",
      price: 899,
      rating: 4.8,
      reviews: 142,
      image: "/gallery-beach-1.jpg",
      description: "Extended 4-day Bohol countryside experience with more time to explore",
      highlights: [
        "Tarsier Sanctuary",
        "Hanging Bridge",
        "Blood Compact Monument",
        "Man-made Forest",
        "Butterfly Garden",
        "Zip-line/Cable Cart Ride",
        "Chocolate Hills",
        "Extra leisure time",
      ],
      includes: [
        "4D/3N air-conditioned room accommodations",
        "FREE Breakfast daily",
        "Countryside tour entrance fees",
        "Roundtrip airport/pier transfer",
        "Air-conditioned car/van",
        "Shuttle to Alona Beach",
        "Welcome drinks",
      ],
      excludes: ["Roundtrip airfare", "Other meals", "Additional entrance fees"],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park – Zip-line and Cable Car Ride",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
        "Extra day for leisurely exploration",
      ],
    },
    {
      id: 6,
      name: "COUNTRYSIDE + PANGLAO ISLAND TOUR",
      duration: "4D/3N",
      price: 1099,
      rating: 4.9,
      reviews: 195,
      image: "/gallery-pool-1.jpg",
      description: "Extended 4-day package combining countryside and Panglao Island with more leisure time",
      highlights: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park",
        "Tarsier Conservation Center",
        "Chocolate Hills",
        "Dauis Church",
        "Bohol Bee Farm",
        "Hinagdanan Cave",
        "Panglao Tower",
      ],
      includes: [
        "4D/3N air-conditioned accommodations",
        "FREE Breakfast daily",
        "Countryside tour",
        "Panglao island tour",
        "Roundtrip airport/pier transfer",
        "Air-conditioned vehicle",
        "Shuttle to Alona Beach",
        "Welcome drinks",
      ],
      excludes: ["Roundtrip airfare", "Other meals", "Countryside tour/Panglao tour entrance fees"],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park – Zip-line and Cable Car Ride",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
        "Dauis Church",
        "Bohol Bee Farm",
        "Nova Sea Shell Museum",
        "Hinagdanan Cave",
        "Panglao Tower",
        "Alona Beach",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
      ],
    },
    {
      id: 7,
      name: "ULTIMATE BOHOL PACKAGE",
      duration: "4D/3N",
      price: 1399,
      rating: 5.0,
      reviews: 312,
      image: "/gallery-night-1.jpg",
      description: "The ultimate extended 4-day Bohol experience with island hopping, countryside, and Panglao",
      highlights: [
        "Countryside tour",
        "Island hopping with dolphins",
        "Panglao island tour",
        "Snorkeling adventures",
        "Beach relaxation",
        "Cultural exploration",
        "Extra leisure day",
        "Surprise souvenir",
      ],
      includes: [
        "4D/3N air-conditioned accommodations",
        "FREE Breakfast daily",
        "Countryside tour",
        "Balicasag and island hopping",
        "Panglao island tour",
        "Roundtrip airport/pier transfer",
        "Motorized boat",
        "Air-conditioned vehicle",
        "Shuttle to Alona Beach",
        "Welcome drinks",
        "Free souvenir",
      ],
      excludes: [
        "Roundtrip airfare",
        "Balicasag Marine Sanctuary entrance fees",
        "Snorkeling gear rental (₱130 per mask/snorkel, ₱130 per aqua socks)",
        "Other meals",
        "Countryside tour/Panglao tour entrance fees",
      ],
      attractions: [
        "Blood Compact Monument",
        "Baclayon Church",
        "Python Sanctuary",
        "Loboc Adventure Park – Zip-line and Cable Car Ride",
        "Tarsier Conservation Center",
        "Butterfly Garden",
        "Man-made Forest",
        "Chocolate Hills",
        "Chocolate Hills Adventure Park – Sky Biking",
        "Sevilla Hanging Bridge",
        "Balicasag Island",
        "Dauis Church",
        "Bohol Bee Farm",
        "Nova Sea Shell Museum",
        "Hinagdanan Cave",
        "Panglao Tower",
      ],
      schedule: "Pickup: 7:00 AM | Drop-off: 5:00 PM",
      notes: [
        "All airport/seaport transfers and land tours based on group size",
        "Optional lunch at Bohol Bee Farm (subject to availability)",
        "Available year-round",
        "Standard check-in: 2:00 PM | Check-out: 12:00 PM",
        "Early check-in subject to availability",
        "Includes free surprise souvenir item",
      ],
    },
  ]

  const activePackages = activeDuration === "3d" ? packages3d : packages4d

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Tour Packages</h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover Bohol with our all-inclusive tour packages with accommodations
            </p>
          </div>
        </section>

        {/* Duration Toggle */}
        <section className="section-padding py-8 border-b border-border">
          <div className="section-max-width">
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setActiveDuration("3d")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeDuration === "3d"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                3D/2N Packages
              </button>
              <button
                onClick={() => setActiveDuration("4d")}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  activeDuration === "4d"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                4D/3N Packages
              </button>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="section-padding pb-32 md:pb-16">
          <div className="section-max-width">
            <div className="grid md:grid-cols-2 gap-8">
              {activePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 overflow-hidden">
                    <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-foreground/70 mb-4">{pkg.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-yellow-500 font-bold">★ {pkg.rating}</span>
                      <span className="text-foreground/60 text-sm">({pkg.reviews} reviews)</span>
                    </div>

                    {/* Duration & Price */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                      <span className="text-sm font-semibold text-foreground/70">{pkg.duration}</span>
                      <span className="text-2xl font-bold text-secondary">₱{pkg.price.toLocaleString()}</span>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-bold text-sm mb-2">Highlights:</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        {pkg.highlights.slice(0, 4).map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-primary">•</span> {highlight}
                          </li>
                        ))}
                        {pkg.highlights.length > 4 && (
                          <li className="text-primary font-semibold">+ {pkg.highlights.length - 4} more</li>
                        )}
                      </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          const modal = document.getElementById(`modal-${pkg.id}`)
                          if (modal) modal.classList.remove("hidden")
                        }}
                        className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition"
                      >
                        View Details
                      </button>
                      <a
                        href="/accommodation"
                        className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition text-center"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>

                  {/* Modal */}
                  <div
                    id={`modal-${pkg.id}`}
                    className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
                  >
                    <div className="bg-background rounded-xl max-w-2xl w-full my-8">
                      <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 flex justify-between items-center">
                        <h3 className="text-xl font-bold">{pkg.name}</h3>
                        <button
                          onClick={(e) => {
                            const modal = e.currentTarget.closest('[id^="modal-"]')
                            if (modal) modal.classList.add("hidden")
                          }}
                          className="text-2xl font-bold hover:opacity-80"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                        <div>
                          <h4 className="font-bold text-primary mb-2">Includes:</h4>
                          <ul className="text-sm text-foreground/80 space-y-1">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-secondary">✓</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-secondary mb-2">Excludes:</h4>
                          <ul className="text-sm text-foreground/80 space-y-1">
                            {pkg.excludes.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-primary mb-2">Main Attractions:</h4>
                          <ul className="text-sm text-foreground/80 space-y-1">
                            {pkg.attractions.map((item, i) => (
                              <li key={i}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-border">
                          <p className="text-sm text-foreground/60">
                            <span className="font-bold">Schedule:</span> {pkg.schedule}
                          </p>
                          <p className="text-xs text-foreground/60">Check-in: 2:00 PM | Check-out: 12:00 PM</p>
                          <div className="text-xs text-foreground/60">
                            <span className="font-bold">Notes:</span>
                            <ul className="mt-1 space-y-1">
                              {pkg.notes.map((note, i) => (
                                <li key={i}>• {note}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Packages?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "All-Inclusive", desc: "Room, meals, tours, transfers, and activities included" },
                { title: "Best Value", desc: "Save significantly by booking packages vs separate items" },
                { title: "Expert Guides", desc: "Local knowledge and professional tour guides included" },
              ].map((benefit, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-foreground/70 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Tours CTA */}
        <section className="section-padding bg-muted/50 border-y border-border">
          <div className="section-max-width text-center">
            <h2 className="text-2xl font-bold mb-4">Want a Custom Tour?</h2>
            <p className="text-foreground/70 mb-6">
              Build your own custom Bohol tour experience tailored to your preferences and schedule
            </p>
            <a
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition inline-block"
            >
              Inquire About Custom Tours
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for an Adventure?</h2>
            <p className="text-lg mb-8 opacity-90">
              Book your Bohol tour package today and create unforgettable memories at Coco Mangos Place Resort
            </p>
            <a
              href="/accommodation"
              className="px-8 py-4 bg-primary-foreground text-primary rounded-lg font-bold hover:opacity-90 transition-all inline-block"
            >
              Book Your Package Now
            </a>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
