"use client"

import { Users, Wifi, Cloud, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import PriceConverter from "./price-converter"

interface Room {
  id: number
  name: string
  category: string
  price: number
  image: string
  description: string
  capacity: string
  amenities: string[]
}

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    Pool: Cloud,
    Safe: Lock,
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden group">
        <img
          src={room.image || "/placeholder.svg"}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold">
          {room.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-foreground">{room.name}</h3>
        <p className="text-foreground/70 mb-4 leading-relaxed">{room.description}</p>

        {/* Capacity */}
        <div className="flex items-center gap-2 mb-4 text-foreground/70">
          <Users size={18} />
          <span>{room.capacity}</span>
        </div>

        <div className="mb-4 pb-4 border-b border-border">
          <PriceConverter priceUSD={room.price} />
        </div>

        {/* Amenities */}
        {isExpanded && (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((amenity, i) => (
                <span key={i} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
          >
            {isExpanded ? "Less" : "More"}
          </button>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/accommodation/${room.id}`}
            className="flex-1 py-3 bg-border text-foreground rounded-lg font-bold hover:bg-primary hover:text-primary-foreground transition text-center"
          >
            View Details
          </Link>
          <button className="flex-1 py-3 bg-secondary text-secondary-foreground rounded-lg font-bold hover:opacity-90 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
