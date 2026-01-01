"use client"

import { Download, X } from "lucide-react"
import { useEffect, useState } from "react"

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)
    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <div className="fixed bottom-32 md:bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-sm mx-auto px-4">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl shadow-2xl p-4 border border-primary/20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Install App</h3>
            <p className="text-sm opacity-90">Get Coco Mangos Place Resort on your home screen for quick access.</p>
          </div>
          <button
            onClick={() => setShowPrompt(false)}
            className="text-primary-foreground/70 hover:text-primary-foreground mt-1"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleInstall}
            className="flex-1 bg-white text-primary font-semibold py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Install
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="flex-1 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground font-semibold py-2 rounded-lg transition"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  )
}
