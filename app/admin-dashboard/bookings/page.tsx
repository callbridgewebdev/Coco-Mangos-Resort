"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Trash2, Edit2, Plus } from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  guest_name: string
  room_name: string
  check_in_date: string
  check_out_date: string
  number_of_guests: number
  status: string
  total_price: number
  discount_amount: number
}

function BookingsContent() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [formData, setFormData] = useState({
    guest_name: "",
    room_name: "",
    check_in_date: "",
    check_out_date: "",
    number_of_guests: 1,
    status: "pending",
    total_price: 0,
    discount_amount: 0,
  })

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchBookings()
  }, [router])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        setBookings([])
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching bookings:", error)
      setBookings([])
      setLoading(false)
    }
  }

  const handleAddBooking = async () => {
    if (!formData.guest_name || !formData.room_name) return

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newBooking = await response.json()
        setBookings([newBooking, ...bookings])
        resetForm()
      }
    } catch (error) {
      console.error("[v0] Error adding booking:", error)
    }
  }

  const handleUpdateBooking = async () => {
    if (!editingBooking) return

    try {
      const response = await fetch(`/api/bookings/${editingBooking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setBookings(bookings.map((b) => (b.id === editingBooking.id ? { ...editingBooking, ...formData } : b)))
        resetForm()
      }
    } catch (error) {
      console.error("[v0] Error updating booking:", error)
    }
  }

  const handleDeleteBooking = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`/api/bookings/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setBookings(bookings.filter((b) => b.id !== id))
        }
      } catch (error) {
        console.error("[v0] Error deleting booking:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      guest_name: "",
      room_name: "",
      check_in_date: "",
      check_out_date: "",
      number_of_guests: 1,
      status: "pending",
      total_price: 0,
      discount_amount: 0,
    })
    setShowAddForm(false)
    setEditingBooking(null)
  }

  const startEdit = (booking: Booking) => {
    setEditingBooking(booking)
    setFormData({
      guest_name: booking.guest_name,
      room_name: booking.room_name,
      check_in_date: booking.check_in_date,
      check_out_date: booking.check_out_date,
      number_of_guests: booking.number_of_guests,
      status: booking.status,
      total_price: booking.total_price,
      discount_amount: booking.discount_amount,
    })
    setShowAddForm(true)
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          </div>
          <button
            onClick={() => {
              setEditingBooking(null)
              setFormData({
                guest_name: "",
                room_name: "",
                check_in_date: "",
                check_out_date: "",
                number_of_guests: 1,
                status: "pending",
                total_price: 0,
                discount_amount: 0,
              })
              setShowAddForm(!showAddForm)
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Booking
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingBooking ? "Edit Booking" : "Add New Booking"}</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Guest Name"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Room Name"
                value={formData.room_name}
                onChange={(e) => setFormData({ ...formData, room_name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="date"
                value={formData.check_in_date}
                onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="date"
                value={formData.check_out_date}
                onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Number of Guests"
                value={formData.number_of_guests}
                onChange={(e) => setFormData({ ...formData, number_of_guests: Number.parseInt(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="number"
                placeholder="Total Price"
                value={formData.total_price}
                onChange={(e) => setFormData({ ...formData, total_price: Number.parseFloat(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Discount Amount"
                value={formData.discount_amount}
                onChange={(e) => setFormData({ ...formData, discount_amount: Number.parseFloat(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingBooking ? handleUpdateBooking : handleAddBooking}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                {editingBooking ? "Update Booking" : "Add Booking"}
              </button>
              <button
                onClick={resetForm}
                className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings by guest or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Room</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-out</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guests</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900 font-medium">{booking.guest_name}</td>
                    <td className="py-4 px-4 text-gray-700">{booking.room_name}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(booking.check_in_date).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">{new Date(booking.check_out_date).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">{booking.number_of_guests}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : booking.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 font-semibold">₱{booking.total_price.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-700">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(booking)} className="text-blue-600 hover:text-blue-700">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <Suspense fallback={null}>
      <BookingsContent />
    </Suspense>
  )
}
