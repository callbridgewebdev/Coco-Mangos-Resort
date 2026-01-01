"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function CookieConsent() {
  const [showCookie, setShowCookie] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      setShowCookie(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowCookie(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setShowCookie(false)
  }

  if (!showCookie) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg shadow-lg p-4 md:p-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">We Value Your Privacy</h3>
            <p className="text-sm text-foreground/70">
              We use cookies to enhance your experience, analyze site traffic, and personalize content. By continuing to
              browse, you consent to our use of cookies. Read our{" "}
              <a href="/legal/privacy-policy" className="text-primary hover:underline font-semibold">
                Privacy Policy
              </a>{" "}
              for more details.
            </p>
          </div>
          <button
            onClick={() => setShowCookie(false)}
            className="text-foreground/60 hover:text-foreground mt-2 md:mt-0 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleReject}
            className="px-6 py-2 border border-border rounded-lg font-semibold hover:bg-muted transition text-sm sm:text-base"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
