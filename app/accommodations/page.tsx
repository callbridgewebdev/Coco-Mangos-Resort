"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Star } from "lucide-react"

interface Accommodation {
  id: string
  name: string
  capacity: number
  price_per_night: number
  description: string
  amenities: string
  image_url?: string
}

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAccommodations()
  }, [])

  const fetchAccommodations = async () => {
    try {
      const response = await fetch("/api/accommodations")
      const data = await response.json()
      setAccommodations(data)
    } catch (error) {
      console.error("[v0] Error fetching accommodations:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading accommodations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Accommodations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((accommodation) => (
            <Link key={accommodation.id} href={`/accommodation/${accommodation.id}`}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-48 flex items-center justify-center">
                  {accommodation.image_url ? (
                    <img
                      src={accommodation.image_url || "/placeholder.svg"}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-center">Room Image</span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{accommodation.name}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{accommodation.description}</p>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="text-sm text-gray-600 ml-2">(48 reviews)</span>
                  </div>

                  <div className="space-y-2 mb-6 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Capacity:</span> Up to {accommodation.capacity} guests
                    </p>
                    <p>
                      <span className="font-semibold">Amenities:</span> {accommodation.amenities}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-amber-600">
                        ₱{accommodation.price_per_night.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">per night</p>
                    </div>
                    <button className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {accommodations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
