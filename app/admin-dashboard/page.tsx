"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Users, BookOpen, CreditCard, LogOut, Menu, X, Home, Settings } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalGuests: number
  totalBookings: number
  totalRevenue: number
  pendingPayments: number
}

interface RecentBooking {
  id: string
  guest_name: string
  room_name: string
  check_in_date: string
  status: string
  total_price: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalGuests: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
  })
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([])

  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem("admin_authenticated")
      if (!isAdmin) {
        router.push("/admin-auth")
        return
      }
      setIsAuthenticated(true)
      setLoading(false)
      fetchDashboardData()
    }

    checkAuth()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      setStats({
        totalGuests: 45,
        totalBookings: 128,
        totalRevenue: 25600,
        pendingPayments: 8,
      })

      setRecentBookings([
        {
          id: "1",
          guest_name: "John Doe",
          room_name: "Premium Beach Suite",
          check_in_date: "2025-01-15",
          status: "confirmed",
          total_price: 499,
        },
        {
          id: "2",
          guest_name: "Jane Smith",
          room_name: "Deluxe Ocean View",
          check_in_date: "2025-01-16",
          status: "pending",
          total_price: 399,
        },
        {
          id: "3",
          guest_name: "Mike Johnson",
          room_name: "Beachfront Villa",
          check_in_date: "2025-01-17",
          status: "confirmed",
          total_price: 599,
        },
      ])
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    localStorage.removeItem("admin_email")
    localStorage.removeItem("admin_login_time")
    router.push("/admin-auth")
  }

  const menuItems = [
    { icon: BarChart3, label: "Overview", href: "/admin-dashboard" },
    { icon: Users, label: "Guests", href: "/admin-dashboard/guests" },
    { icon: BookOpen, label: "Bookings", href: "/admin-dashboard/bookings" },
    { icon: CreditCard, label: "Payments", href: "/admin-dashboard/payments" },
    { icon: Home, label: "Accommodations", href: "/admin-dashboard/accommodations" },
    { icon: Settings, label: "Settings", href: "/admin-dashboard/settings" }, // Added Settings menu item
  ]

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 fixed h-full z-30`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
          </div>
        </div>

        <nav className={`p-4 space-y-2 ${!sidebarOpen && "flex flex-col items-center"}`}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-700 text-gray-300 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-auto h-[calc(100vh-80px)]">
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Total Guests",
                  value: stats.totalGuests,
                  icon: Users,
                  color: "blue",
                },
                {
                  title: "Total Bookings",
                  value: stats.totalBookings,
                  icon: BookOpen,
                  color: "green",
                },
                {
                  title: "Total Revenue",
                  value: `₱${stats.totalRevenue.toLocaleString()}`,
                  icon: CreditCard,
                  color: "amber",
                },
                {
                  title: "Pending Payments",
                  value: stats.pendingPayments,
                  icon: BarChart3,
                  color: "red",
                },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        stat.color === "blue"
                          ? "bg-blue-100"
                          : stat.color === "green"
                            ? "bg-green-100"
                            : stat.color === "amber"
                              ? "bg-amber-100"
                              : "bg-red-100"
                      }`}
                    >
                      <stat.icon
                        className={`w-6 h-6 ${
                          stat.color === "blue"
                            ? "text-blue-600"
                            : stat.color === "green"
                              ? "text-green-600"
                              : stat.color === "amber"
                                ? "text-amber-600"
                                : "text-red-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Room</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-gray-900">{booking.guest_name}</td>
                        <td className="py-4 px-4 text-gray-700">{booking.room_name}</td>
                        <td className="py-4 px-4 text-gray-700">
                          {new Date(booking.check_in_date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-900">₱{booking.total_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
