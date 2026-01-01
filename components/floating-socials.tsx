"use client"

import { Facebook, Youtube, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FloatingSocials() {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)

  return (
    <>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 md:left-8">
        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-80 transition-all hover:scale-110 shadow-lg"
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </Link>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-80 transition-all hover:scale-110 shadow-lg"
          aria-label="X (Twitter)"
        >
          <svg size={20} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.693-5.829 6.693h-3.307l7.713-8.835L2.25 2.25h6.514l4.882 6.479 5.288-6.479zM17.364 20.455h1.828L6.817 3.96H4.854l12.51 16.495z" />
          </svg>
        </a>
        <Link
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-accent text-accent-foreground rounded-full hover:opacity-80 transition-all hover:scale-110 shadow-lg"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </Link>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-primary text-primary-foreground rounded-full hover:opacity-80 transition-all hover:scale-110 shadow-lg"
          aria-label="Google"
        >
          <svg
            size={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </a>
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-secondary text-secondary-foreground rounded-full hover:opacity-80 transition-all hover:scale-110 shadow-lg"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </Link>
        <button
          onClick={() => setShowWhatsAppModal(true)}
          className="p-3 bg-green-500 text-white rounded-full hover:opacity-80 transition-all hover:scale-110 shadow-lg"
          aria-label="WhatsApp Support"
        >
          <img src="/whatsapp-icon.png" alt="WhatsApp" width="20" height="20" />
        </button>
      </div>

      {showWhatsAppModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWhatsAppModal(false)}
        >
          <div
            className="bg-card rounded-xl shadow-2xl p-6 max-w-sm w-full border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">WhatsApp Support</h3>
              <button onClick={() => setShowWhatsAppModal(false)} className="text-foreground/60 hover:text-foreground">
                ✕
              </button>
            </div>
            <p className="text-foreground/80 mb-6">Need help? Chat with us on WhatsApp for instant support.</p>
            <a
              href="https://wa.me/63999888670"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold text-center flex items-center justify-center gap-2"
            >
              <img src="/whatsapp-icon.png" alt="WhatsApp" width="20" height="20" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  )
}
