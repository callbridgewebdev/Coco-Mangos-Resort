"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Accommodation {
  id: string
  name: string
  capacity: number
  price_per_night: number
  description: string
  amenities: string
}

export default function AccommodationsManagement() {
  const router = useRouter()
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    capacity: 2,
    price_per_night: 0,
    description: "",
    amenities: "",
  })

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchAccommodations()
  }, [router])

  const fetchAccommodations = async () => {
    try {
      setAccommodations([
        {
          id: "1",
          name: "Premium Beach Suite",
          capacity: 2,
          price_per_night: 499,
          description: "Luxurious suites with private terraces and ocean views",
          amenities: "AC, WiFi, TV, Mini Bar",
        },
        {
          id: "2",
          name: "Deluxe Ocean View",
          capacity: 3,
          price_per_night: 399,
          description: "Spacious rooms with modern amenities and ocean vistas",
          amenities: "AC, WiFi, TV, Desk",
        },
        {
          id: "3",
          name: "Beachfront Villa",
          capacity: 4,
          price_per_night: 599,
          description: "Premium villa with direct beach access",
          amenities: "AC, WiFi, TV, Kitchen, Pool Access",
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching accommodations:", error)
      setLoading(false)
    }
  }

  const handleAddAccommodation = (e: React.FormEvent) => {
    e.preventDefault()
    const newAccommodation: Accommodation = {
      id: (accommodations.length + 1).toString(),
      ...formData,
    }
    setAccommodations([...accommodations, newAccommodation])
    setFormData({
      name: "",
      capacity: 2,
      price_per_night: 0,
      description: "",
      amenities: "",
    })
    setShowForm(false)
  }

  const handleDeleteAccommodation = (id: string) => {
    setAccommodations(accommodations.filter((acc) => acc.id !== id))
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Accommodations Management</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
          >
            <Plus className="w-5 h-5" />
            Add Accommodation
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Accommodation</h2>
            <form onSubmit={handleAddAccommodation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Room Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <input
                type="number"
                placeholder="Price Per Night"
                value={formData.price_per_night}
                onChange={(e) => setFormData({ ...formData, price_per_night: Number.parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={3}
              />
              <textarea
                placeholder="Amenities (comma-separated)"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={2}
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition font-medium"
                >
                  Add Accommodation
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-32"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{accommodation.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{accommodation.description}</p>
                <div className="space-y-2 mb-4 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Capacity:</span> {accommodation.capacity} guests
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ₱{accommodation.price_per_night.toLocaleString()}
                    /night
                  </p>
                  <p>
                    <span className="font-semibold">Amenities:</span> {accommodation.amenities}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAccommodation(accommodation.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {accommodations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations found. Add one to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
