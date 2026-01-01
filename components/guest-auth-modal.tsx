"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, Lock, User } from "lucide-react"

interface GuestAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GuestAuthModal({ isOpen, onClose }: GuestAuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate auth - In real app, this would call an API
    setTimeout(() => {
      if (isLogin) {
        if (formData.email && formData.password) {
          // Store guest session
          localStorage.setItem("guestEmail", formData.email)
          localStorage.setItem("guestBalance", "0")
          // Redirect to dashboard
          window.location.href = "/guest-dashboard"
        } else {
          setError("Please fill all fields")
        }
      } else {
        if (formData.email && formData.password && formData.name && formData.phone) {
          localStorage.setItem("guestEmail", formData.email)
          localStorage.setItem("guestName", formData.name)
          localStorage.setItem("guestPhone", formData.phone)
          localStorage.setItem("guestBalance", "0")
          window.location.href = "/guest-dashboard"
        } else {
          setError("Please fill all fields")
        }
      }
      setLoading(false)
    }, 500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border-2 border-primary rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{isLogin ? "Guest Login" : "Create Account"}</h2>
          <button onClick={onClose} className="hover:bg-primary-foreground/20 p-1 rounded-lg transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Register Fields */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                    <User size={18} className="text-secondary" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="flex-1 bg-transparent outline-none text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                    <User size={18} className="text-secondary" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone"
                      className="flex-1 bg-transparent outline-none text-foreground"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                <Mail size={18} className="text-secondary" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent outline-none text-foreground"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                <Lock size={18} className="text-secondary" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none text-foreground"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-200 dark:border-red-900 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
            </button>

            {/* Toggle */}
            <div className="text-center text-sm">
              <span className="text-foreground/70">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError("")
                  setFormData({ email: "", password: "", name: "", phone: "" })
                }}
                className="text-primary hover:text-secondary font-semibold transition"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-border text-xs text-foreground/60 space-y-2">
            <p className="font-semibold text-foreground">Guest Account Benefits:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Top-up your account balance for quick payments</li>
              <li>View and manage your coupons</li>
              <li>Track your bookings</li>
              <li>Exclusive member-only offers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
