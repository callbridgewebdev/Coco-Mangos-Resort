"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface BookNowModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookNowModal({ isOpen, onClose }: BookNowModalProps) {
  const [step, setStep] = useState<"form" | "payment">("form")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomType: "deluxe",
  })
  const [paymentData, setPaymentData] = useState({
    method: "gcash",
    referenceNumber: "",
    receipt: null as File | null,
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPaymentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPaymentData((prev) => ({ ...prev, receipt: e.target.files![0] }))
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.checkIn && formData.checkOut) {
      setStep("payment")
    }
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (paymentData.referenceNumber && paymentData.receipt) {
      setBookingConfirmed(true)
      setTimeout(() => {
        setBookingConfirmed(false)
        setStep("form")
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkIn: "",
          checkOut: "",
          guests: "1",
          roomType: "deluxe",
        })
        setPaymentData({
          method: "gcash",
          referenceNumber: "",
          receipt: null,
        })
        onClose()
      }, 3000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-background rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border">
        <div className="sticky top-0 bg-gradient-to-r from-primary/20 to-secondary/20 flex justify-between items-center p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Book Your Stay</h2>
            <p className="text-sm text-foreground/60 mt-1">Complete your luxury getaway</p>
          </div>
          <button onClick={onClose} aria-label="Close modal" className="p-1 hover:bg-muted rounded-lg transition">
            <X size={24} className="text-foreground" />
          </button>
        </div>

        <div className="p-6">
          {bookingConfirmed ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2 text-primary">Booking Confirmed!</h3>
              <p className="text-foreground/70 mb-4">
                Your reservation has been confirmed. A confirmation email will be sent to {formData.email}
              </p>
            </div>
          ) : step === "form" ? (
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Check-in Date</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Check-out Date</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Room Type</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                >
                  <option value="deluxe">Deluxe Room - ₱299/night</option>
                  <option value="premium">Premium Suite - ₱499/night</option>
                  <option value="villa">Beachfront Villa - ₱799/night</option>
                </select>
              </div>

              <button type="submit" className="w-full btn-primary mt-6">
                Proceed to Payment
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payment Method</label>
                <select
                  name="method"
                  value={paymentData.method}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                >
                  <option value="gcash">GCash</option>
                  <option value="maya">Maya (PayMaya)</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {paymentData.method === "gcash" && (
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <p className="font-medium mb-1">GCash Number:</p>
                  <p className="text-foreground/70">09XX XXX XXXX</p>
                </div>
              )}

              {paymentData.method === "maya" && (
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <p className="font-medium mb-1">Maya Account:</p>
                  <p className="text-foreground/70">cocomangos.resort@maya.com</p>
                </div>
              )}

              {paymentData.method === "bank" && (
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <p className="font-medium mb-1">Bank Details:</p>
                  <p className="text-foreground/70">Bank Name: BDO</p>
                  <p className="text-foreground/70">Account: Coco Mangos Resort</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Reference Number</label>
                <input
                  type="text"
                  name="referenceNumber"
                  value={paymentData.referenceNumber}
                  onChange={handlePaymentChange}
                  placeholder="Enter transaction reference"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Receipt</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background/50"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  Back
                </button>
                <button type="submit" className="flex-1 btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
