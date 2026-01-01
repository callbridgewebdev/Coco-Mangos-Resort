"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Mail, Lock, User, AlertCircle, CheckCircle, Phone } from "lucide-react"
import { validateEmail, validateUsername, validatePassword } from "@/lib/validation"
import { getRecaptchaKey } from "@/app/actions/get-recaptcha-key"

interface GuestAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GuestAuthModal({ isOpen, onClose }: GuestAuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
    phone: "",
    rememberMe: false,
    agreeToTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState("")
  const [recaptchaEnabled, setRecaptchaEnabled] = useState(true) // Added recaptchaEnabled state
  const recaptchaLoadedRef = useRef(false)

  useEffect(() => {
    const loadRecaptchaKey = async () => {
      const key = await getRecaptchaKey()
      setRecaptchaSiteKey(key)
    }
    loadRecaptchaKey()
  }, [])

  useEffect(() => {
    const checkRecaptchaEnabled = async () => {
      try {
        const response = await fetch("/api/settings/recaptcha")
        const data = await response.json()
        setRecaptchaEnabled(data.enabled ?? true)
      } catch (error) {
        console.error("[v0] Error checking reCAPTCHA setting:", error)
        setRecaptchaEnabled(true) // Default to enabled if error
      }
    }
    checkRecaptchaEnabled()
  }, [isOpen])

  useEffect(() => {
    if (recaptchaSiteKey && isOpen && recaptchaEnabled) {
      // Load reCAPTCHA script only once
      if (!window.grecaptcha) {
        const script = document.createElement("script")
        script.src = "https://www.google.com/recaptcha/api.js"
        script.async = true
        script.defer = true
        script.onload = () => {
          console.log("[v0] reCAPTCHA v2 script loaded successfully")
          // grecaptcha will auto-render elements with class 'g-recaptcha'
        }
        script.onerror = () => {
          console.error("[v0] Failed to load reCAPTCHA v2 script")
        }
        document.head.appendChild(script)
      }
    }
  }, [recaptchaSiteKey, isOpen, recaptchaEnabled])

  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaEnabled) {
      return "recaptcha_disabled"
    }

    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA not loaded yet")
    }

    try {
      const token = window.grecaptcha.getResponse()

      if (!token) {
        throw new Error("Please complete the reCAPTCHA challenge")
      }

      return token
    } catch (error) {
      console.error("[v0] Failed to get reCAPTCHA token:", error)
      throw error
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format"
    }

    if (!isLogin) {
      const usernameValidation = validateUsername(formData.username)
      if (!usernameValidation.valid) {
        errors.username = usernameValidation.error
      }

      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.valid) {
        errors.password = passwordValidation.error
      }

      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
      }

      if (!formData.fullName.trim()) {
        errors.fullName = "Full name is required"
      }

      if (!formData.agreeToTerms) {
        errors.agreeToTerms = "You must agree to terms and conditions"
      }
    } else {
      if (!formData.password) {
        errors.password = "Password is required"
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const token = await getRecaptchaToken()

      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Authentication failed")
        if (window.grecaptcha && window.grecaptcha.getResponse) {
          window.grecaptcha.reset()
        }
        return
      }

      setSuccess(isLogin ? "Login successful! Redirecting..." : "Account created successfully!")

      // Store guest session
      localStorage.setItem("guestId", data.guest.id)
      localStorage.setItem("guestEmail", data.guest.email)
      localStorage.setItem("guestUsername", data.guest.username || "")

      if (data.rememberMeToken) {
        localStorage.setItem("rememberMeToken", data.rememberMeToken)
        localStorage.setItem("rememberMe", "true")
      }

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        window.location.href = "/guest-dashboard"
      }, 1000)
    } catch (err) {
      console.error("[v0] Auth error:", err)
      setError(err instanceof Error ? err.message : "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAuth = () => {
    setIsLogin(!isLogin)
    setError("")
    setSuccess("")
    setValidationErrors({})
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      fullName: "",
      phone: "",
      rememberMe: false,
      agreeToTerms: false,
    })
    if (window.grecaptcha && typeof window.grecaptcha.reset === "function") {
      window.grecaptcha.reset()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border-2 border-primary rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 flex justify-between items-center sticky top-0 z-10">
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
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                    <User size={18} className="text-secondary" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your full name"
                      className="flex-1 bg-transparent outline-none text-foreground"
                    />
                  </div>
                  {validationErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {validationErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Username * (min 6 chars)</label>
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                    <User size={18} className="text-secondary" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Choose a username"
                      className="flex-1 bg-transparent outline-none text-foreground"
                    />
                  </div>
                  {validationErrors.username && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {validationErrors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                    <Phone size={18} className="text-secondary" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone number"
                      className="flex-1 bg-transparent outline-none text-foreground"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address *</label>
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
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password * {!isLogin && "(min 8 chars, 1 number, 1 special char)"}
              </label>
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
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={14} /> {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2">Confirm Password *</label>
                <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted/30">
                  <Lock size={18} className="text-secondary" />
                  <input
                    type="password"
                    value={formData.confirmPassword || ""}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-foreground"
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me & Agree to Terms */}
            {!isLogin && (
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <span className="text-sm text-foreground">I agree to the Terms and Conditions *</span>
                </label>
                {validationErrors.agreeToTerms && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={14} /> {validationErrors.agreeToTerms}
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm text-foreground">Remember me</span>
              </label>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-200 dark:border-red-900 rounded-lg text-red-600 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-500/10 border border-green-200 dark:border-green-900 rounded-lg text-green-600 text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                {success}
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
                onClick={handleToggleAuth}
                className="text-primary hover:text-secondary font-semibold transition"
              >
                {isLogin ? "Register Here" : "Login Here"}
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

          {/* reCAPTCHA Info */}
          <div className="mt-4 text-xs text-foreground/50 text-center">
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy" className="text-primary hover:underline">
              {" "}
              Privacy Policy{" "}
            </a>
            and
            <a href="https://policies.google.com/terms" className="text-primary hover:underline">
              {" "}
              Terms of Service{" "}
            </a>
            apply.
          </div>
          {recaptchaEnabled && (
            <div className="mt-4 flex justify-center">
              <div className="g-recaptcha" data-sitekey={recaptchaSiteKey}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Extend Window type for reCAPTCHA v2
declare global {
  interface Window {
    grecaptcha: {
      getResponse: () => string
      reset: () => void
      render: (container: string | HTMLElement, options: Record<string, unknown>) => void
    }
  }
}
