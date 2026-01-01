"use client"

import { useState } from "react"
import { X, Calendar, Users } from "lucide-react"

interface BookingDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  room: any
  appliedCoupon: { code: string; discount: number } | null
  onProceedCheckout: (bookingData: any) => void
}

export default function BookingDetailsModal({
  isOpen,
  onClose,
  room,
  appliedCoupon,
  onProceedCheckout,
}: BookingDetailsModalProps) {
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState(2)
  const [specialRequests, setSpecialRequests] = useState("")

  if (!isOpen) return null

  const nightsCount =
    checkInDate && checkOutDate
      ? Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))
      : 1
  const basePrice = room.price * nightsCount
  const discountAmount = appliedCoupon ? (basePrice * appliedCoupon.discount) / 100 : 0
  const totalPrice = basePrice - discountAmount

  const handleModifyBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates")
      return
    }

    const bookingData = {
      roomId: room.id,
      roomName: room.name,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
      basePrice,
      discountAmount,
      totalPrice,
      appliedCoupon,
    }
    onProceedCheckout(bookingData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Booking Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Room Info */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">{room.name}</h3>
            <p className="text-sm text-foreground/70">{room.description}</p>
          </div>

          {/* Booking Dates */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Calendar size={20} className="text-primary" />
              Dates
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
              <Users size={20} className="text-primary" />
              Guests
            </h3>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <h3 className="font-bold text-lg mb-3">Special Requests</h3>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests for your stay..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-background min-h-20"
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-foreground/80">
              <span>
                ${room.price} × {nightsCount} nights
              </span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount ({appliedCoupon.discount}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-primary">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              onClick={handleModifyBooking}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
