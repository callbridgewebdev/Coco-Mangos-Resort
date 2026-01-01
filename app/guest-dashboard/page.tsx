"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Wallet, Home, LogOut, History, ChevronLeft, ChevronRight, Tag, Zap } from "lucide-react"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import BookingModalPopup from "@/components/booking-modal-popup"

interface Booking {
  id: string
  room_name: string
  check_in_date: string
  check_out_date: string
  total_price: number
  status: string
}

interface TopupTransaction {
  id: string
  amount: number
  payment_method: string
  status: string
  created_at: string
}

interface Coupon {
  id: string
  code: string
  coupon_type: string
  discount_percentage: number
  discount_amount: number
  expiration_date: string
  is_locked: boolean
  usage_count: number
  usage_limit: number
}

interface RoomAvailability {
  roomId: string
  roomName: string
  status: string
  availableSlots: number
  capacity: number
}

interface TimeSlot {
  time: string
  displayTime: string
  available: boolean
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
  const [referenceNumber, setReferenceNumber] = useState("")
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [submittingTopup, setSubmittingTopup] = useState(false)
  const [loading, setLoading] = useState(true)

  const [bookings, setBookings] = useState<Booking[]>([])
  const [topupHistory, setTopupHistory] = useState<TopupTransaction[]>([])
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [roomAvailability, setRoomAvailability] = useState<RoomAvailability[]>([])
  const [selectedRoomForTime, setSelectedRoomForTime] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loadingAvailability, setLoadingAvailability] = useState(false)

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
    fetchAvailableCoupons()
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

  const fetchAvailableCoupons = async () => {
    try {
      const response = await fetch("/api/coupons")
      if (response.ok) {
        const data = await response.json()
        // Filter available and unlocked coupons
        const availableCoupons = data.filter((c: Coupon) => {
          const isExpired = new Date(c.expiration_date) < new Date()
          const isLimitReached = c.usage_count >= c.usage_limit
          return !isExpired && !isLimitReached
        })
        setCoupons(availableCoupons)
      }
    } catch (error) {
      console.error("[v0] Error fetching coupons:", error)
    }
  }

  const fetchRoomAvailability = async (date: Date) => {
    setLoadingAvailability(true)
    try {
      const dateString = date.toISOString().split("T")[0]
      const response = await fetch(`/api/bookings/availability?date=${dateString}`)

      if (response.ok) {
        const data = await response.json()
        setRoomAvailability(data.availability || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching room availability:", error)
    } finally {
      setLoadingAvailability(false)
    }
  }

  const fetchTimeSlots = async (date: Date, roomId: string) => {
    setLoadingAvailability(true)
    try {
      const dateString = date.toISOString().split("T")[0]
      const response = await fetch(`/api/bookings/time-slots?date=${dateString}&roomId=${roomId}`)

      if (response.ok) {
        const data = await response.json()
        setTimeSlots(data.timeSlots || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching time slots:", error)
    } finally {
      setLoadingAvailability(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("guestId")
    localStorage.removeItem("guestEmail")
    localStorage.removeItem("guestUsername")
    localStorage.removeItem("rememberMeToken")
    localStorage.removeItem("rememberMe")
    router.push("/")
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateBooked = (day: number) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return bookings.some((booking) => {
      const checkInDate = new Date(booking.check_in_date)
      const checkOutDate = new Date(booking.check_out_date)
      return checkDate >= checkInDate && checkDate <= checkOutDate
    })
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date)
    setSelectedRoomForTime(null)
    setTimeSlots([])
    fetchRoomAvailability(date)
  }

  const handleRoomTimeClick = (roomId: string) => {
    setSelectedRoomForTime(roomId)
    if (selectedDate) {
      fetchTimeSlots(selectedDate, roomId)
    }
  }

  const handleTopupSubmit = async () => {
    if (!topupAmount || !referenceNumber) {
      alert("Please fill in all required fields")
      return
    }

    if (!receiptFile) {
      alert("Please upload a payment receipt")
      return
    }

    setSubmittingTopup(true)

    try {
      // Convert file to base64 for simple storage (in production, use proper file upload service)
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Receipt = reader.result as string

        const response = await fetch("/api/top-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guest_id: guestId,
            amount: Number.parseFloat(topupAmount),
            payment_method: paymentMethod,
            reference_number: referenceNumber,
            receipt_url: base64Receipt,
          }),
        })

        if (response.ok) {
          alert("Top-up request submitted! Waiting for admin approval.")
          setShowTopupForm(false)
          setTopupAmount("")
          setReferenceNumber("")
          setReceiptFile(null)
          fetchTopupHistory(guestId)
        } else {
          alert("Failed to submit top-up request. Please try again.")
        }
        setSubmittingTopup(false)
      }
      reader.readAsDataURL(receiptFile)
    } catch (error) {
      console.error("[v0] Error submitting top-up:", error)
      alert("Error submitting top-up request")
      setSubmittingTopup(false)
    }
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
        <section className="section-padding border-b border-border sticky top-20 bg-background/95 backdrop-blur z-40">
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
              onClick={() => setActiveTab("coupons")}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === "coupons"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Available Coupons
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
                    <div className="flex items-center justify-between">
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
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Wallet size={20} /> Top-up Balance
                    </button>
                    <button
                      onClick={() => router.push("/accommodation")}
                      className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Home size={20} /> Book a Room
                    </button>
                  </div>

                  {/* Recent Transactions Card */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <History size={24} className="text-secondary" />
                      Recent Transactions
                    </h3>
                    {topupHistory.length > 0 ? (
                      <div className="space-y-3">
                        {topupHistory.slice(0, 5).map((transaction) => (
                          <div
                            key={transaction.id}
                            className="p-3 bg-muted/50 rounded-lg border border-border flex justify-between items-center"
                          >
                            <div>
                              <p className="font-semibold text-sm">{transaction.payment_method}</p>
                              <p className="text-xs text-foreground/60">
                                {new Date(transaction.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">+₱{transaction.amount.toFixed(2)}</p>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  transaction.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : transaction.status === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }`}
                              >
                                {transaction.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-6 text-foreground/60">No transactions yet</p>
                    )}
                  </div>

                  {/* Recent Bookings */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Home size={24} className="text-secondary" />
                      Recent Bookings
                    </h3>
                    {bookings.slice(0, 3).length > 0 ? (
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

                  {/* Top-up Form Modal */}
                  {showTopupForm && (
                    <div className="bg-card border-2 border-primary rounded-xl p-6 mb-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Wallet size={24} className="text-primary" />
                        Top-up Balance
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Amount (₱)</label>
                          <input
                            type="number"
                            value={topupAmount}
                            onChange={(e) => setTopupAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            min="100"
                            step="100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Payment Method</label>
                          <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="GCash">GCash</option>
                            <option value="PayMaya">PayMaya</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Over the Counter">Over the Counter</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Reference Number</label>
                          <input
                            type="text"
                            value={referenceNumber}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                            placeholder="Enter transaction reference number"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Payment Receipt (JPG, JPEG, PNG, or PDF)
                          </label>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          {receiptFile && (
                            <p className="text-sm text-green-600 mt-2">
                              Selected: {receiptFile.name} ({(receiptFile.size / 1024).toFixed(2)} KB)
                            </p>
                          )}
                        </div>

                        <div className="bg-blue-500/10 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                          <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                            Important Notes:
                          </p>
                          <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                            <li>Your balance will be credited after admin approval</li>
                            <li>Please upload a clear photo or screenshot of your receipt</li>
                            <li>Processing time: 1-24 hours</li>
                            <li>Keep your reference number for tracking</li>
                          </ul>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handleTopupSubmit}
                            disabled={submittingTopup}
                            className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition font-bold disabled:opacity-50"
                          >
                            {submittingTopup ? "Submitting..." : "Submit Top-up Request"}
                          </button>
                          <button
                            onClick={() => {
                              setShowTopupForm(false)
                              setTopupAmount("")
                              setReferenceNumber("")
                              setReceiptFile(null)
                            }}
                            className="flex-1 py-3 border-2 border-border rounded-lg hover:bg-muted transition font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Account Settings */}
                <div>
                  <div className="bg-card border border-border rounded-xl p-6 sticky top-32">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>

                    <div className="space-y-3 mb-6">
                      <button
                        onClick={() => setActiveTab("coupons")}
                        className="w-full p-3 bg-amber-500/20 text-amber-600 rounded-lg hover:bg-amber-500/30 transition font-semibold flex items-center gap-2"
                      >
                        <Tag size={18} /> View Available Coupons
                      </button>
                      <button
                        onClick={() => setActiveTab("bookings")}
                        className="w-full p-3 bg-blue-500/20 text-blue-600 rounded-lg hover:bg-blue-500/30 transition font-semibold flex items-center gap-2"
                      >
                        <Home size={18} /> My Bookings
                      </button>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-200 dark:border-blue-900 rounded-lg text-sm mb-6">
                      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Pro Tips:</p>
                      <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                        <li>Check available coupons for discounts</li>
                        <li>Maintain balance for faster checkout</li>
                        <li>View booking calendar anytime</li>
                      </ul>
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

                        <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition font-semibold">
                          View Details Receipt
                        </button>
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

            {/* Available Coupons Tab */}
            {activeTab === "coupons" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Tag size={32} className="text-secondary" />
                  Available Coupons & Discounts
                </h2>

                {coupons.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coupons.map((coupon) => {
                      const daysLeft = Math.ceil(
                        (new Date(coupon.expiration_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      )
                      const availableUses = coupon.usage_limit - coupon.usage_count

                      return (
                        <div
                          key={coupon.id}
                          className="bg-card border-2 border-primary rounded-xl p-6 relative overflow-hidden"
                        >
                          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                            {coupon.discount_percentage > 0
                              ? `${coupon.discount_percentage}% OFF`
                              : `₱${coupon.discount_amount} OFF`}
                          </div>

                          <div className="mb-4">
                            <p className="text-xs text-foreground/60 mb-1">Coupon Code</p>
                            <p className="text-2xl font-bold text-primary font-mono">{coupon.code}</p>
                          </div>

                          <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between">
                              <span className="text-foreground/70">Type:</span>
                              <span className="font-semibold">{coupon.coupon_type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-foreground/70">Availability:</span>
                              <span className="font-semibold text-green-600">{availableUses} left</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-foreground/70">Expires in:</span>
                              <span className="font-semibold text-orange-600">{daysLeft} days</span>
                            </div>
                          </div>

                          <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center gap-2">
                            <Zap size={18} /> Copy Code
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <Tag size={48} className="mx-auto text-foreground/30 mb-4" />
                    <p className="text-foreground/60 mb-4">No available coupons at the moment</p>
                    <button
                      onClick={() => router.push("/coupons")}
                      className="text-primary hover:text-secondary font-semibold transition"
                    >
                      View all offers →
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

                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-bold text-foreground/60 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array(getFirstDayOfMonth(currentMonth))
                      .fill(null)
                      .map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                    {Array(getDaysInMonth(currentMonth))
                      .fill(null)
                      .map((_, i) => {
                        const day = i + 1
                        const isBooked = isDateBooked(day)
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const isPast = date < today
                        const isSelected =
                          selectedDate?.getDate() === day &&
                          selectedDate?.getMonth() === currentMonth.getMonth() &&
                          selectedDate?.getFullYear() === currentMonth.getFullYear()

                        return (
                          <button
                            key={day}
                            onClick={() => !isPast && handleDateClick(day)}
                            disabled={isPast}
                            className={`p-3 rounded-lg text-center font-semibold cursor-pointer transition ${
                              isPast
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : isSelected
                                  ? "bg-amber-600 text-white"
                                  : isBooked
                                    ? "bg-primary text-primary-foreground hover:opacity-80"
                                    : "bg-green-500/20 text-green-600 hover:bg-green-500/30"
                            }`}
                          >
                            {day}
                          </button>
                        )
                      })}
                  </div>

                  <div className="mt-6 flex gap-4 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500/20 rounded"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <span className="text-sm">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm">Fully Booked</span>
                    </div>
                  </div>
                </div>

                {/* Room availability for selected date */}
                {selectedDate && (
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Room Availability for{" "}
                      {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </h3>

                    {loadingAvailability ? (
                      <div className="text-center py-8">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-foreground/60">Loading availability...</p>
                      </div>
                    ) : roomAvailability.length > 0 ? (
                      <div className="space-y-3">
                        {roomAvailability.map((room) => (
                          <button
                            key={room.roomId}
                            onClick={() => handleRoomTimeClick(room.roomId)}
                            className={`w-full p-4 rounded-lg border-2 transition text-left ${
                              selectedRoomForTime === room.roomId
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{room.roomName}</h4>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  room.status === "available"
                                    ? "bg-green-500 text-white"
                                    : room.status === "booked"
                                      ? "bg-amber-600 text-white"
                                      : "bg-red-500 text-white"
                                }`}
                              >
                                {room.status === "available"
                                  ? "Available"
                                  : room.status === "booked"
                                    ? "Booked"
                                    : "Fully Booked"}
                              </span>
                            </div>
                            <p className="text-sm text-foreground/60">
                              {room.availableSlots} of {room.capacity} slots available
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-8 text-foreground/60">No rooms available for this date</p>
                    )}

                    {/* Time slots for selected room */}
                    {selectedRoomForTime && timeSlots.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <h4 className="font-semibold mb-4">Available Time Slots (GMT+8 Manila Time)</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <div
                              key={slot.time}
                              className={`p-2 rounded-lg text-center text-sm font-medium ${
                                slot.available
                                  ? "bg-green-500/20 text-green-600"
                                  : "bg-red-500/20 text-red-600 line-through"
                              }`}
                            >
                              {slot.displayTime}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                                {transaction.status}
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
