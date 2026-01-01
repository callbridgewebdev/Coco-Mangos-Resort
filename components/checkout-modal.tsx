"use client"

import { useState } from "react"
import { X, CreditCard, Wallet } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  bookingData: any
  balance: number
  onConfirmPayment: (paymentMethod: string, bookingData: any) => void
}

export default function CheckoutModal({ isOpen, onClose, bookingData, balance, onConfirmPayment }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)

  if (!isOpen || !bookingData) return null

  const totalPrice = bookingData.totalPrice

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }

    if (paymentMethod === "topup" && balance < totalPrice) {
      alert(`Insufficient balance. You need ₱${(totalPrice - balance).toFixed(2)} more.`)
      return
    }

    onConfirmPayment(paymentMethod, bookingData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">{bookingData.roomName}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Check-in:</span>
                <span className="font-semibold">{bookingData.checkInDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Check-out:</span>
                <span className="font-semibold">{bookingData.checkOutDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/70">Guests:</span>
                <span className="font-semibold">{bookingData.guests}</span>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-foreground/80">Subtotal</span>
              <span>₱{bookingData.basePrice.toFixed(2)}</span>
            </div>
            {bookingData.discountAmount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount</span>
                <span>-₱{bookingData.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-border pt-3 flex justify-between text-xl font-bold text-primary">
              <span>Total</span>
              <span>₱{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-bold text-lg mb-4">Select Payment Method</h3>
            <div className="space-y-3">
              {/* Top-up Balance */}
              <label
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "topup" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="topup"
                  checked={paymentMethod === "topup"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="font-semibold flex items-center gap-2">
                  <Wallet size={20} className="text-secondary" />
                  Pay with Account Balance
                </span>
                <p className="text-sm text-foreground/60 mt-1">Current Balance: ₱{balance.toFixed(2)}</p>
              </label>

              {/* GCash */}
              <label
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "gcash" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="gcash"
                  checked={paymentMethod === "gcash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="font-semibold flex items-center gap-2">
                  <CreditCard size={20} className="text-blue-500" />
                  GCash
                </span>
                <p className="text-sm text-foreground/60 mt-1">Fast and secure mobile payment</p>
              </label>

              {/* Maya */}
              <label
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "maya" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="maya"
                  checked={paymentMethod === "maya"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="font-semibold flex items-center gap-2">
                  <CreditCard size={20} className="text-cyan-500" />
                  Maya
                </span>
                <p className="text-sm text-foreground/60 mt-1">Digital wallet and payments</p>
              </label>

              {/* Bank Transfer */}
              <label
                className={`p-4 border-2 rounded-lg cursor-pointer transition ${paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <span className="font-semibold flex items-center gap-2">
                  <CreditCard size={20} className="text-orange-500" />
                  Bank Transfer
                </span>
                <p className="text-sm text-foreground/60 mt-1">Direct bank account transfer</p>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
