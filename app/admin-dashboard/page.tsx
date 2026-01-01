"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Users,
  BookOpen,
  CreditCard,
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  Star,
  Tag,
  FileText,
  Share2,
  CalendarIcon,
  Wallet,
  ImageIcon,
} from "lucide-react"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
      // Fetch real guests count
      const guestsRes = await fetch("/api/guests")
      const guestsData = await guestsRes.json()

      // Fetch real bookings
      const bookingsRes = await fetch("/api/bookings")
      const bookingsData = await bookingsRes.json()

      // Fetch real payments
      const paymentsRes = await fetch("/api/payments")
      const paymentsData = await paymentsRes.json()

      // Calculate total revenue from approved payments
      const totalRevenue = paymentsData
        .filter((p: any) => p.status === "approved")
        .reduce((sum: number, p: any) => sum + p.amount, 0)

      // Count pending payments
      const pendingPayments = paymentsData.filter((p: any) => p.status === "pending").length

      setStats({
        totalGuests: guestsData.length || 0,
        totalBookings: bookingsData.length || 0,
        totalRevenue: totalRevenue || 0,
        pendingPayments: pendingPayments || 0,
      })

      // Set recent bookings with guest names
      const recentBookingsWithNames = bookingsData.slice(0, 5).map((booking: any) => {
        // Try to find guest name from guests data
        const guest = guestsData.find((g: any) => g.id === booking.guest_id)
        return {
          id: booking.id,
          guest_name: guest?.full_name || "Unknown Guest",
          room_name: booking.room_name,
          check_in_date: booking.check_in_date,
          status: booking.status,
          total_price: booking.total_price,
        }
      })

      setRecentBookings(recentBookingsWithNames)
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
      // Keep default mock data if fetch fails
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
    { icon: CalendarIcon, label: "Booking Calendar", href: "/admin-dashboard/booking-calendar" },
    { icon: CreditCard, label: "Payments", href: "/admin-dashboard/payments" },
    { icon: Home, label: "Accommodations", href: "/admin-dashboard/accommodations" },
    { icon: Tag, label: "Coupons", href: "/admin-dashboard/coupons" },
    { icon: Star, label: "Reviews", href: "/admin-dashboard/reviews" },
    { icon: Wallet, label: "Top-up Management", href: "/admin-dashboard/topup-management" },
    { icon: ImageIcon, label: "Gallery", href: "/admin-dashboard/gallery" },
    { icon: FileText, label: "Page Management", href: "/admin-dashboard/page-management" },
    { icon: Share2, label: "Social Accounts", href: "/admin-dashboard/social-accounts" },
    { icon: Settings, label: "Settings", href: "/admin-dashboard/settings" },
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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 fixed h-full z-30 hidden md:block`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Admin</span>}
          </div>
        </div>

        <nav
          className={`p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)] ${!sidebarOpen && "flex flex-col items-center"}`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-700 text-gray-300 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
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

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-transform duration-300 z-50 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition hover:bg-gray-700 text-gray-300"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"} flex flex-col h-screen`}
      >
        {/* Mobile Top Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 md:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="text-gray-600 hover:text-gray-900">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Admin</span>
          </div>
          <div className="w-6" />
        </div>

        {/* Desktop Top Bar */}
        <div className="hidden md:flex bg-white border-b border-gray-200 px-8 py-4 items-center justify-between sticky top-0 z-20">
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
        <div className="flex-1 p-4 md:p-8 overflow-auto pb-20 md:pb-8">
          <div className="space-y-6 md:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                <div
                  key={idx}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">{stat.title}</p>
                      <p className="text-xl md:text-3xl font-bold text-gray-900 mt-1 md:mt-2">{stat.value}</p>
                    </div>
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${
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
                        className={`w-5 h-5 md:w-6 md:h-6 ${
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
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
                        Guest Name
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
                        Room
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm hidden md:table-cell">
                        Check-in
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
                        Status
                      </th>
                      <th className="text-left py-3 px-2 md:px-4 font-semibold text-gray-700 text-xs md:text-sm">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 md:py-4 px-2 md:px-4 text-gray-900 text-xs md:text-base">
                          {booking.guest_name}
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4 text-gray-700 text-xs md:text-base">
                          {booking.room_name}
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4 text-gray-700 text-xs md:text-base hidden md:table-cell">
                          {new Date(booking.check_in_date).toLocaleDateString()}
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4">
                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4 font-semibold text-gray-900 text-xs md:text-base">
                          ₱{booking.total_price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 flex items-center justify-around z-30 md:hidden">
          {[
            { icon: BarChart3, label: "Overview", href: "/admin-dashboard" },
            { icon: Users, label: "Guests", href: "/admin-dashboard/guests" },
            { icon: BookOpen, label: "Bookings", href: "/admin-dashboard/bookings" },
            { icon: CalendarIcon, label: "Calendar", href: "/admin-dashboard/booking-calendar" },
            { icon: Settings, label: "Settings", href: "/admin-dashboard/settings" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-amber-600 transition"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
