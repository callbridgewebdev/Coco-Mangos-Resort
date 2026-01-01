"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Clock, Users, Star } from "lucide-react"

export default function ToursPage() {
  const tours = [
    {
      id: 1,
      name: "Island Explorer",
      description: "Visit neighboring islands with snorkeling and beach activities",
      duration: "Full Day",
      price: 89,
      groupSize: "2-20 people",
      rating: 4.8,
      image: "/island-explorer-tour.jpg",
      highlights: ["Island Hopping", "Snorkeling", "Lunch Included", "Photography Stop"],
    },
    {
      id: 2,
      name: "Jungle Trek Adventure",
      description: "Guided hiking through lush tropical jungle with waterfall discovery",
      duration: "4 Hours",
      price: 65,
      groupSize: "2-15 people",
      rating: 4.9,
      image: "/jungle-trek-adventure.jpg",
      highlights: ["Waterfall", "Wildlife Spotting", "Expert Guide", "Refreshments"],
    },
    {
      id: 3,
      name: "Water Sports Package",
      description: "Experience kayaking, paddleboarding, and diving in crystal clear waters",
      duration: "6 Hours",
      price: 120,
      groupSize: "1-10 people",
      rating: 4.7,
      image: "/water-sports-package.jpg",
      highlights: ["Kayaking", "Paddleboarding", "Snorkeling", "Equipment Provided"],
    },
    {
      id: 4,
      name: "Sunset Cruise",
      description: "Romantic evening cruise with dinner and live music",
      duration: "3 Hours",
      price: 95,
      groupSize: "2-30 people",
      rating: 4.9,
      image: "/sunset-cruise.jpg",
      highlights: ["Dinner", "Live Music", "Drinks", "Sunset Views"],
    },
    {
      id: 5,
      name: "Cultural Village Tour",
      description: "Explore local villages and experience authentic tropical culture",
      duration: "5 Hours",
      price: 75,
      groupSize: "2-20 people",
      rating: 4.6,
      image: "/cultural-village-tour.jpg",
      highlights: ["Local Markets", "Traditional Crafts", "Local Cuisine", "Photo Ops"],
    },
    {
      id: 6,
      name: "Fishing Expedition",
      description: "Professional fishing trip with experienced guides and equipment",
      duration: "4 Hours",
      price: 85,
      groupSize: "2-6 people",
      rating: 4.8,
      image: "/fishing-expedition.jpg",
      highlights: ["Professional Guide", "Equipment Provided", "Catch & Cook", "Bar Access"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-accent to-primary text-accent-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Tours & Adventures</h1>
            <p className="text-lg md:text-xl opacity-90">
              Create unforgettable memories with our expertly guided tours
            </p>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                    <img
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{tour.name}</h3>
                    <p className="text-sm md:text-base text-foreground/70 mb-4">{tour.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(tour.rating) ? "fill-secondary text-secondary" : "text-border"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-foreground/70">{tour.rating}</span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 mb-4 pb-4 border-b border-border text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-primary" />
                        <span>{tour.groupSize}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.map((h, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex-1">
                        <span className="text-lg md:text-2xl font-bold text-primary">${tour.price}</span>
                        <span className="text-xs text-foreground/70"> /person</span>
                      </div>
                      <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-bold hover:opacity-90 transition text-sm md:text-base">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Tours */}
        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Our Tours?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Expert Guides", desc: "Experienced and knowledgeable local guides" },
                { title: "Small Groups", desc: "Personalized experience with intimate group sizes" },
                { title: "Safety First", desc: "All activities follow strict safety standards" },
                { title: "Flexible Booking", desc: "Easy rescheduling and cancellation policies" },
                { title: "All Inclusive", desc: "Most tours include meals and equipment" },
                { title: "Memorable", desc: "Unforgettable experiences you'll treasure forever" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
