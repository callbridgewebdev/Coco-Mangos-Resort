"use client"
import { X, Calendar, Users, DollarSign } from "lucide-react"

interface BookingModalPopupProps {
  isOpen: boolean
  onClose: () => void
  booking: any
}

export default function BookingModalPopup({ isOpen, onClose, booking }: BookingModalPopupProps) {
  if (!isOpen || !booking) return null

  const nightsCount = Math.ceil(
    (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold">Booking Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">{booking.roomName}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
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

          <div className="bg-muted/30 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-primary" />
              <div>
                <p className="text-xs text-foreground/60">Check-in</p>
                <p className="font-semibold">{booking.checkInDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-primary" />
              <div>
                <p className="text-xs text-foreground/60">Check-out</p>
                <p className="font-semibold">{booking.checkOutDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={20} className="text-secondary" />
              <div>
                <p className="text-xs text-foreground/60">Duration</p>
                <p className="font-semibold">
                  {nightsCount} night{nightsCount > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign size={20} className="text-green-600" />
              <div>
                <p className="text-xs text-foreground/60">Price</p>
                <p className="font-semibold text-lg">₱{booking.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
