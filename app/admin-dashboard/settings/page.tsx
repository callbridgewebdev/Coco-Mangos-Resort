"use client"

import { useEffect, useState } from "react"
import { Settings, AlertCircle, CheckCircle, Loader, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Setting {
  recaptcha_enabled: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting>({
    recaptcha_enabled: true,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string }>()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings/recaptcha")
      const data = await response.json()
      setSettings({ recaptcha_enabled: data.enabled })
    } catch (error) {
      console.error("[v0] Error fetching settings:", error)
      setMessage({ type: "error", text: "Failed to load settings" })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleRecaptcha = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/settings/recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !settings.recaptcha_enabled }),
      })

      if (!response.ok) {
        throw new Error("Failed to update setting")
      }

      setSettings({ recaptcha_enabled: !settings.recaptcha_enabled })
      setMessage({
        type: "success",
        text: `reCAPTCHA ${!settings.recaptcha_enabled ? "enabled" : "disabled"} successfully`,
      })

      setTimeout(() => setMessage(undefined), 3000)
    } catch (error) {
      console.error("[v0] Error updating setting:", error)
      setMessage({ type: "error", text: "Failed to update setting" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <Link
          href="/admin-dashboard"
          className="flex items-center gap-2 px-4 py-2 text-amber-600 hover:text-amber-700 font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* reCAPTCHA Setting */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">reCAPTCHA v2 Protection</h2>
              <p className="text-sm text-gray-600 mt-1">
                Enable or disable reCAPTCHA v2 verification for guest registration and login. This helps prevent
                automated abuse and bot attacks.
              </p>
            </div>
            <button
              onClick={handleToggleRecaptcha}
              disabled={saving}
              className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                settings.recaptcha_enabled
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } disabled:opacity-50`}
            >
              {saving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <div
                    className={`w-6 h-6 rounded-full transition ${
                      settings.recaptcha_enabled ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {settings.recaptcha_enabled ? "Enabled" : "Disabled"}
                </>
              )}
            </button>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <p className="font-semibold mb-2">Current Status:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>reCAPTCHA: {settings.recaptcha_enabled ? "✓ Enabled" : "✗ Disabled"}</li>
              <li>Guest Registration: {settings.recaptcha_enabled ? "Protected" : "Not protected"}</li>
              <li>Guest Login: {settings.recaptcha_enabled ? "Protected" : "Not protected"}</li>
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4">
          <h3 className="font-semibold text-gray-900 mb-3">Information</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p>
              reCAPTCHA v2 helps protect your application by verifying that users are human and not automated scripts.
              When disabled, guests can register and login without the "I'm not a robot" verification. This is useful
              for testing but not recommended for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
