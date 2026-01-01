"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
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
      setBookings([
        {
          id: "1",
          guest_name: "John Doe",
          room_name: "Premium Beach Suite",
          check_in_date: "2025-01-15",
          check_out_date: "2025-01-18",
          number_of_guests: 2,
          status: "confirmed",
          total_price: 1497,
          discount_amount: 0,
        },
        {
          id: "2",
          guest_name: "Jane Smith",
          room_name: "Deluxe Ocean View",
          check_in_date: "2025-01-16",
          check_out_date: "2025-01-19",
          number_of_guests: 3,
          status: "pending",
          total_price: 1197,
          discount_amount: 200,
        },
        {
          id: "3",
          guest_name: "Mike Johnson",
          room_name: "Beachfront Villa",
          check_in_date: "2025-01-17",
          check_out_date: "2025-01-20",
          number_of_guests: 4,
          status: "completed",
          total_price: 1797,
          discount_amount: 0,
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching bookings:", error)
      setLoading(false)
    }
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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
        </div>

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

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <p>Total Bookings: {filteredBookings.length}</p>
          </div>
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
