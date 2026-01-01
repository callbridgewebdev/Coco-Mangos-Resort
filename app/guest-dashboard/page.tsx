"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import BookingModalPopup from "@/components/booking-modal-popup"
import { Wallet, Gift, LogOut, CreditCard, TrendingUp, Home, History } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Booking {
  id: string
  room_id: string
  room_name: string
  total_price: number
  check_in_date: string
  check_out_date: string
  status: "confirmed" | "completed" | "cancelled"
}

interface TopupTransaction {
  id: string
  amount: number
  created_at: string
  payment_method: string
}

export default function GuestDashboardPage() {
  const router = useRouter()
  const [guestEmail, setGuestEmail] = useState("")
  const [guestId, setGuestId] = useState("")
  const [balance, setBalance] = useState(0)
  const [topupAmount, setTopupAmount] = useState("")
  const [showTopupForm, setShowTopupForm] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("GCash")
  const [loading, setLoading] = useState(true)

  const [bookings, setBookings] = useState<Booking[]>([])
  const [topupHistory, setTopupHistory] = useState<TopupTransaction[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const email = localStorage.getItem("guestEmail")
    const id = localStorage.getItem("guestId")

    if (!email || !id) {
      router.push("/")
      return
    }

    setGuestEmail(email)
    setGuestId(id)
    fetchGuestData(id)
    fetchBookings(id)
    fetchTopupHistory(id)
  }, [router])

  const fetchGuestData = async (id: string) => {
    try {
      const response = await fetch(`/api/guests/${id}`)
      if (response.ok) {
        const guest = await response.json()
        setBalance(guest.account_balance || 0)
      }
    } catch (error) {
      console.error("[v0] Error fetching guest data:", error)
    }
  }

  const fetchBookings = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings?guest_id=${id}`)
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTopupHistory = async (id: string) => {
    try {
      const response = await fetch(`/api/top-up?guest_id=${id}`)
      if (response.ok) {
        const data = await response.json()
        setTopupHistory(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching top-up history:", error)
    }
  }

  const handleTopup = async () => {
    const amount = Number.parseFloat(topupAmount)
    if (amount <= 0) return

    try {
      const newBalance = balance + amount

      // Create top-up transaction
      await fetch("/api/top-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_id: guestId,
          amount: amount,
          payment_method: paymentMethod,
          status: "pending",
          new_balance: newBalance,
        }),
      })

      setBalance(newBalance)
      setTopupAmount("")
      setShowTopupForm(false)
      fetchTopupHistory(guestId)
    } catch (error) {
      console.error("[v0] Error processing top-up:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("guestEmail")
    localStorage.removeItem("guestId")
    localStorage.removeItem("guestBalance")
    localStorage.removeItem("guestName")
    localStorage.removeItem("guestPhone")
    router.push("/")
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isBookingDate = (day: number) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split("T")[0]
    return bookings.some((booking) => {
      return checkDate >= booking.check_in_date && checkDate <= booking.check_out_date
    })
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center text-foreground/30"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isBooked = isBookingDate(day)
      const relatedBooking = bookings.find((booking) => {
        const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split("T")[0]
        return checkDate >= booking.check_in_date && checkDate <= booking.check_out_date
      })

      days.push(
        <button
          key={day}
          onClick={() => {
            if (relatedBooking) {
              setSelectedBooking(relatedBooking)
              setShowBookingModal(true)
            }
          }}
          className={`p-2 text-center rounded-lg text-sm font-semibold transition ${
            isBooked
              ? "bg-primary text-primary-foreground cursor-pointer hover:shadow-lg"
              : "bg-green-500/20 text-green-700 hover:bg-green-500/30 cursor-pointer"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-lg opacity-90">{guestEmail}</p>
          </div>
        </section>

        {/* Dashboard Navigation Tabs */}
        <section className="section-padding border-b border-border sticky top-20 bg-background/95 backdrop-blur">
          <div className="section-max-width flex gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === "bookings"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === "calendar"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === "history"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              History
            </button>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="section-padding">
          <div className="section-max-width">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column - Account Info */}
                <div className="md:col-span-2 space-y-6">
                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary rounded-xl p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-foreground/70 text-sm mb-2">Account Balance</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold text-primary">₱{balance.toFixed(2)}</span>
                        </div>
                      </div>
                      <Wallet size={64} className="text-secondary opacity-30" />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setShowTopupForm(!showTopupForm)}
                      className="p-6 bg-card border-2 border-border rounded-xl hover:border-primary transition text-center"
                    >
                      <CreditCard size={32} className="text-secondary mx-auto mb-2" />
                      <p className="font-bold">Add Balance</p>
                      <p className="text-sm text-foreground/60">Top-up your account</p>
                    </button>

                    <button
                      onClick={() => router.push("/coupons")}
                      className="p-6 bg-card border-2 border-border rounded-xl hover:border-primary transition text-center"
                    >
                      <Gift size={32} className="text-secondary mx-auto mb-2" />
                      <p className="font-bold">View Coupons</p>
                      <p className="text-sm text-foreground/60">Available offers</p>
                    </button>
                  </div>

                  {/* Top-up Form */}
                  {showTopupForm && (
                    <div className="bg-card border-2 border-primary rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Add Balance</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Amount (₱)</label>
                          <input
                            type="number"
                            value={topupAmount}
                            onChange={(e) => setTopupAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-foreground/70">Quick amounts:</p>
                          <div className="flex gap-2 flex-wrap">
                            {[1500, 3000, 7500, 10000, 15000, 20000].map((amt) => (
                              <button
                                key={amt}
                                onClick={() => setTopupAmount(amt.toString())}
                                className="px-4 py-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition text-sm font-semibold"
                              >
                                ₱{amt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-foreground/70">Payment Method:</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { name: "GCash", icon: "💚" },
                              { name: "PayMaya", icon: "💙" },
                              { name: "Bank", icon: "🏦" },
                            ].map((method) => (
                              <button
                                key={method.name}
                                onClick={() => setPaymentMethod(method.name)}
                                className={`p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition text-center text-xs font-semibold ${
                                  paymentMethod === method.name ? "bg-primary text-primary-foreground" : ""
                                }`}
                              >
                                <span className="text-xl block mb-1">{method.icon}</span>
                                {method.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handleTopup}
                            className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-bold hover:shadow-lg transition"
                          >
                            Confirm Top-up
                          </button>
                          <button
                            onClick={() => setShowTopupForm(false)}
                            className="flex-1 py-3 border-2 border-border rounded-lg font-bold hover:bg-muted transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Recent Activity */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp size={24} className="text-secondary" />
                      Recent Activity
                    </h3>
                    {bookings.length > 0 ? (
                      <div className="space-y-3">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="p-3 bg-muted/50 rounded-lg border border-border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold">{booking.room_name}</p>
                                <p className="text-sm text-foreground/60">
                                  {booking.check_in_date} to {booking.check_out_date}
                                </p>
                              </div>
                              <span className="text-primary font-bold">₱{booking.total_price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 text-center py-8 text-foreground/60">
                        <p>No recent bookings</p>
                        <button
                          onClick={() => router.push("/accommodation")}
                          className="text-primary hover:text-secondary font-semibold transition"
                        >
                          Book a room now →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Account Settings */}
                <div>
                  <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                    <h3 className="text-xl font-bold mb-4">Account Settings</h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs text-foreground/60 mb-1">Email</p>
                        <p className="font-semibold text-foreground">{guestEmail}</p>
                      </div>

                      <div className="p-4 bg-blue-500/10 border border-blue-200 dark:border-blue-900 rounded-lg text-sm">
                        <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Pro Tips:</p>
                        <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                          <li>Keep balance updated for instant checkout</li>
                          <li>Unlock coupons for exclusive discounts</li>
                          <li>Check for seasonal offers</li>
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-3 bg-red-500/10 text-red-600 border-2 border-red-200 dark:border-red-900 rounded-lg font-bold hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">My Bookings</h2>
                {bookings.length > 0 ? (
                  <div className="grid gap-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-card border border-border rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                              <Home size={24} className="text-secondary" />
                              {booking.room_name}
                            </h3>
                            <p className="text-sm text-foreground/60 mt-1">Booking ID: {booking.id}</p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-lg font-bold text-sm ${
                              booking.status === "confirmed"
                                ? "bg-green-500/20 text-green-600"
                                : booking.status === "completed"
                                  ? "bg-blue-500/20 text-blue-600"
                                  : "bg-red-500/20 text-red-600"
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Check-in</p>
                            <p className="font-bold">{booking.check_in_date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Check-out</p>
                            <p className="font-bold">{booking.check_out_date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Total</p>
                            <p className="font-bold text-primary">₱{booking.total_price}</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition font-semibold">
                            View Details Receipt
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-foreground/60 mb-4">No bookings yet</p>
                    <button
                      onClick={() => router.push("/accommodation")}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:shadow-lg transition"
                    >
                      Browse Accommodations →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === "calendar" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Booking Calendar</h2>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <button onClick={previousMonth} className="p-2 hover:bg-muted rounded-lg">
                      <ChevronLeft size={24} />
                    </button>
                    <h3 className="text-2xl font-bold">
                      {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                    </h3>
                    <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg">
                      <ChevronRight size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-semibold text-foreground/60 text-sm p-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

                  <div className="mt-6 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500/20 rounded"></div>
                      <span>Available</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <History size={32} className="text-secondary" />
                  Transaction History
                </h2>

                {topupHistory.length > 0 ? (
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="px-6 py-3 text-left font-bold">Date</th>
                          <th className="px-6 py-3 text-left font-bold">Amount</th>
                          <th className="px-6 py-3 text-left font-bold">Payment Method</th>
                          <th className="px-6 py-3 text-left font-bold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topupHistory.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-border hover:bg-muted/30">
                            <td className="px-6 py-4">{new Date(transaction.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-bold text-green-600">+₱{transaction.amount}</td>
                            <td className="px-6 py-4">{transaction.payment_method}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-sm font-semibold">
                                Approved
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-foreground/60">No transaction history yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <MobileNav />
      {showBookingModal && selectedBooking && (
        <BookingModalPopup booking={selectedBooking} onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  )
}
