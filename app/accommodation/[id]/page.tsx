"use client"

import { useParams } from "next/navigation"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Star, Users, Wifi, Eye } from "lucide-react"

export default function RoomDetailPage() {
  const params = useParams()
  const roomId = params.id

  const rooms: { [key: string]: any } = {
    "1": {
      id: 1,
      name: "Deluxe Ocean View",
      category: "Deluxe",
      price: 299,
      image: "/deluxe-ocean-view-room.jpg",
      description: "Spacious rooms with stunning ocean views and modern amenities",
      capacity: "2-3 guests",
      rating: 4.8,
      reviews: 156,
      amenities: ["AC", "WiFi", "Ocean View", "Balcony", "Safe", "Flat-screen TV", "Mini Fridge", "Work Desk"],
      features: [
        "25 sqm spacious room",
        "King-size bed",
        "Private bathroom with shower",
        "Air conditioning",
        "High-speed WiFi",
        "Ocean-facing balcony",
        "24-hour room service",
      ],
      gallery: ["/deluxe-ocean-view-room.jpg", "/luxury-resort-.jpg", "/tropical-resort-lobby-with-palm-trees.jpg"],
    },
    "2": {
      id: 2,
      name: "Premium Beach Suite",
      category: "Premium",
      price: 499,
      image: "/premium-beach-suite.jpg",
      description: "Luxurious suites with private terraces and premium amenities",
      capacity: "2-4 guests",
      rating: 4.9,
      reviews: 203,
      amenities: [
        "AC",
        "WiFi",
        "Private Terrace",
        "Mini Bar",
        "Safe",
        "Jacuzzi",
        "Butler Service",
        "Premium Toiletries",
      ],
      features: [
        "45 sqm luxury suite",
        "King & Queen beds",
        "Marble bathroom with bathtub",
        "Private terrace",
        "Premium minibar",
        "Concierge service",
        "Premium welcome amenities",
      ],
      gallery: ["/premium-beach-suite.jpg", "/tropical-suite.jpg", "/beachfront-villa.jpg"],
    },
    "3": {
      id: 3,
      name: "Beachfront Villa",
      category: "Villa",
      price: 799,
      image: "/beachfront-villa.jpg",
      description: "Ultimate luxury with direct beach access and exclusive amenities",
      capacity: "4-6 guests",
      rating: 5.0,
      reviews: 287,
      amenities: [
        "AC",
        "WiFi",
        "Direct Beach",
        "Pool",
        "Chef Service",
        "Private Entrance",
        "Home Theater",
        "Wine Cellar",
      ],
      features: [
        "120 sqm private villa",
        "Multiple bedrooms",
        "Full kitchen",
        "Private infinity pool",
        "Direct beach access",
        "Personal chef service",
        "Private beachfront garden",
      ],
      gallery: ["/beachfront-villa.jpg", "/gallery-pool-1.jpg", "/gallery-spa-1.jpg"],
    },
  }

  const room = rooms[roomId as string]

  if (!room) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <HeaderWrapper />
        <main className="flex-1 flex items-center justify-center section-padding">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Room not found</h1>
            <a href="/accommodation" className="btn-primary inline-block">
              Back to Accommodations
            </a>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{room.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(room.rating) ? "fill-current" : "text-primary-foreground/50"}
                  />
                ))}
              </div>
              <span className="text-lg">
                {room.rating} ({room.reviews} reviews)
              </span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Images & Description */}
              <div className="md:col-span-2">
                {/* Main Image */}
                <div className="mb-6 rounded-xl overflow-hidden h-96">
                  <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">About This Room</h2>
                  <p className="text-lg text-foreground/80 mb-6 leading-relaxed">{room.description}</p>
                  <p className="text-foreground/70 leading-relaxed">{room.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-6">Features</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {room.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                        <span className="text-primary text-xl">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-3xl font-bold mb-6">Room Amenities</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                        <Wifi size={18} className="text-secondary flex-shrink-0" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Card */}
              <div>
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-lg">
                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-foreground/70 text-sm mb-2">Price per night</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">${room.price}</span>
                      <span className="text-foreground/60">/night</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Users size={20} className="text-secondary" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Eye size={20} className="text-secondary" />
                      <span>{room.category} Room</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="w-full btn-primary text-lg">Book Now</button>
                    <button className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition">
                      Request Info
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-6 pt-6 border-t border-border text-xs text-foreground/70 space-y-2">
                    <p>✓ Free WiFi included</p>
                    <p>✓ Free breakfast</p>
                    <p>✓ Free cancellation</p>
                    <p>✓ 24/7 room service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-3xl font-bold mb-8">Room Gallery</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {room.gallery.map((img: string, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden h-64">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Gallery ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Rooms */}
        <section className="section-padding">
          <div className="section-max-width">
            <h2 className="text-3xl font-bold mb-8">Other Available Rooms</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(rooms)
                .filter(([key]) => key !== roomId)
                .slice(0, 3)
                .map(([key, relatedRoom]) => (
                  <a
                    key={key}
                    href={`/accommodation/${key}`}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedRoom.image || "/placeholder.svg"}
                        alt={relatedRoom.name}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">{relatedRoom.name}</h3>
                      <p className="text-primary text-lg font-bold">${relatedRoom.price}/night</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
