"use client"

import type React from "react"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Star, Users, Wifi, Eye, MessageSquare } from "lucide-react"
import CurrencySwap from "@/components/currency-swap"
import CouponModal from "@/components/coupon-modal"
import BookingDetailsModal from "@/components/booking-details-modal"
import CheckoutModal from "@/components/checkout-modal"
import Link from "next/link"

export default function RoomDetailPage() {
  const params = useParams()
  const roomId = params.id
  const [reviews, setReviews] = useState([
    { id: 1, author: "John Doe", rating: 5, text: "Amazing room with beautiful ocean views!", date: "2025-01-15" },
    { id: 2, author: "Sarah Smith", rating: 4, text: "Very comfortable and clean. Great service!", date: "2025-01-10" },
  ])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", rating: 5, text: "" })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [guestBalance, setGuestBalance] = useState(0)
  const [bookingData, setBookingData] = useState(null)

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

  useEffect(() => {
    const email = localStorage.getItem("guestEmail")
    const savedBalance = localStorage.getItem("guestBalance")
    setIsLoggedIn(!!email)
    if (savedBalance) {
      setGuestBalance(Number.parseFloat(savedBalance))
    }
  }, [])

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.text) {
      const newReview = {
        id: reviews.length + 1,
        author: formData.name,
        rating: formData.rating,
        text: formData.text,
        date: new Date().toISOString().split("T")[0],
      }
      setReviews([newReview, ...reviews])
      setFormData({ name: "", email: "", rating: 5, text: "" })
      setShowReviewForm(false)
    }
  }

  const handleApplyCoupon = (code: string, discount: number) => {
    setAppliedCoupon({ code, discount })
  }

  const handleBookRoom = () => {
    if (isLoggedIn) {
      setShowBookingModal(true)
    } else {
      setShowCouponModal(true)
    }
  }

  const handleProceedCheckout = (bookingDataObj: any) => {
    setBookingData(bookingDataObj)
    setShowBookingModal(false)
    setShowCheckoutModal(true)
  }

  const handleConfirmPayment = (paymentMethod: string, bookingDataObj: any) => {
    const newBooking = {
      id: `booking-${Date.now()}`,
      roomId: bookingDataObj.roomId,
      roomName: bookingDataObj.roomName,
      price: bookingDataObj.totalPrice,
      checkInDate: bookingDataObj.checkInDate,
      checkOutDate: bookingDataObj.checkOutDate,
      status: "confirmed" as const,
      paymentMethod,
    }

    const existingBookings = JSON.parse(localStorage.getItem("guestBookings") || "[]")
    const updatedBookings = [newBooking, ...existingBookings]
    localStorage.setItem("guestBookings", JSON.stringify(updatedBookings))

    if (paymentMethod === "topup") {
      const newBalance = guestBalance - bookingDataObj.totalPrice
      localStorage.setItem("guestBalance", newBalance.toString())

      const topupHistory = JSON.parse(localStorage.getItem("topupHistory") || "[]")
      topupHistory.push({
        id: `payment-${Date.now()}`,
        amount: -bookingDataObj.totalPrice,
        date: new Date().toISOString().split("T")[0],
        type: "booking_payment",
        paymentMethod: "Account Balance",
      })
      localStorage.setItem("topupHistory", JSON.stringify(topupHistory))
    }

    setShowCheckoutModal(false)
    alert("Booking confirmed! Check your dashboard for details.")
    window.location.href = "/guest-dashboard"
  }

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
              <Link href={`/rooms/${roomId}/reviews`}>
                <span className="text-lg cursor-pointer hover:opacity-80 transition">
                  {room.rating} ({room.reviews} reviews)
                </span>
              </Link>
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
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold text-primary">${room.price}</span>
                      <span className="text-foreground/60">/night</span>
                    </div>
                    {/* Currency Swap */}
                    <CurrencySwap usdPrice={room.price} />
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

                  {/* Applied Coupon */}
                  {appliedCoupon && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg">
                      <p className="text-sm font-semibold text-green-600 mb-1">Coupon Applied!</p>
                      <p className="text-xs text-foreground/70 mb-2">{appliedCoupon.code}</p>
                      <p className="text-lg font-bold text-green-600">{appliedCoupon.discount}% Discount</p>
                      <p className="text-sm text-foreground/60 mt-2">
                        New Price: ${(room.price * (1 - appliedCoupon.discount / 100)).toFixed(2)}/night
                      </p>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button onClick={handleBookRoom} className="w-full btn-primary text-lg">
                      {isLoggedIn ? "Proceed Booking" : "Book Now"}
                    </button>
                    {/* Coupon Button */}
                    <button
                      onClick={() => setShowCouponModal(true)}
                      className="w-full border-2 border-secondary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-secondary-foreground transition"
                    >
                      Apply Coupon
                    </button>
                    <Link href="/tour-packages" className="w-full">
                      <button className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition">
                        Tour Packages
                      </button>
                    </Link>
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

        {/* Coupon Modal */}
        <CouponModal
          isOpen={showCouponModal}
          onClose={() => setShowCouponModal(false)}
          onApplyCoupon={handleApplyCoupon}
        />

        {/* Booking Details Modal */}
        <BookingDetailsModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          room={room}
          appliedCoupon={appliedCoupon}
          onProceedCheckout={handleProceedCheckout}
        />

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          bookingData={bookingData}
          balance={guestBalance}
          onConfirmPayment={handleConfirmPayment}
        />

        {/* Reviews Section */}
        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Guest Reviews ({reviews.length})</h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn-primary flex items-center gap-2"
              >
                <MessageSquare size={20} />
                Write Review
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-2 border border-border rounded-lg bg-background"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-2 border border-border rounded-lg bg-background"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className={`text-2xl transition ${
                            star <= formData.rating ? "text-primary" : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Share your experience..."
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background min-h-32"
                    required
                  ></textarea>

                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary">
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.slice(0, 4).map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{review.author}</h3>
                      <p className="text-sm text-foreground/60">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? "fill-primary text-primary" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/80">{review.text}</p>
                </div>
              ))}
            </div>

            {reviews.length > 4 && (
              <div className="mt-8 text-center">
                <Link href={`/rooms/${params.id}/reviews`}>
                  <button className="btn-primary px-8 py-3">View All Reviews ({reviews.length})</button>
                </Link>
              </div>
            )}
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
