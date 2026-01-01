"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyCoupon: (code: string, discount: number) => void
}

export default function CouponModal({ isOpen, onClose, onApplyCoupon }: CouponModalProps) {
  const [couponCode, setCouponCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const availableCoupons = [
    { code: "HOLIDAY25", discount: 25, label: "Holiday Special" },
    { code: "BIRTHDAY20", discount: 20, label: "Birthday Month" },
    { code: "XMAS30", discount: 30, label: "Christmas Festive" },
    { code: "NEWYEAR22", discount: 22, label: "New Year" },
    { code: "SUMMER18", discount: 18, label: "Summer Paradise" },
  ]

  const handleApply = () => {
    const coupon = availableCoupons.find((c) => c.code === couponCode.toUpperCase())
    if (coupon) {
      onApplyCoupon(coupon.code, coupon.discount)
      setCouponCode("")
      setError("")
      onClose()
    } else {
      setError("Invalid coupon code")
    }
  }

  const handleCopyCoupon = (code: string) => {
    setCouponCode(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border-2 border-primary rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 flex justify-between items-center border-b border-primary/20">
          <h2 className="text-2xl font-bold">Apply Coupon</h2>
          <button onClick={onClose} className="hover:bg-primary-foreground/20 p-1 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Manual Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">Enter Coupon Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase())
                  setError("")
                }}
                placeholder="e.g., HOLIDAY25"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-foreground/60">Available Coupons</span>
            </div>
          </div>

          {/* Available Coupons */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availableCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{coupon.label}</p>
                    <p className="text-sm text-secondary font-bold">{coupon.discount}% OFF</p>
                  </div>
                  <button
                    onClick={() => handleCopyCoupon(coupon.code)}
                    className="p-2 hover:bg-background rounded transition"
                    title="Copy coupon code"
                  >
                    {copied && couponCode === coupon.code ? (
                      <Check size={20} className="text-green-500" />
                    ) : (
                      <Copy size={20} className="text-foreground/60" />
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono bg-background px-2 py-1 rounded border border-dashed border-border text-foreground/80">
                  {coupon.code}
                </p>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="p-4 bg-blue-500/10 border border-blue-200 dark:border-blue-900 rounded-lg text-sm text-foreground/80">
            <p className="font-semibold mb-1">How to use:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Select a coupon above or enter the code</li>
              <li>Click "Apply" to add the discount</li>
              <li>The discount will be calculated at checkout</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
