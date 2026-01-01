"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash2, Edit2, Plus } from "lucide-react"
import Link from "next/link"

interface SocialAccount {
  id: string
  platform: string
  display_name: string
  url: string
  icon_name: string
  is_enabled: boolean
  sort_order: number
}

function SocialAccountsContent() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAccount, setEditingAccount] = useState<SocialAccount | null>(null)
  const [formData, setFormData] = useState({
    platform: "",
    display_name: "",
    url: "",
    icon_name: "",
    is_enabled: true,
    sort_order: 0,
  })

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchAccounts()
  }, [router])

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/social-accounts")
      if (response.ok) {
        const data = await response.json()
        setAccounts(data)
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching social accounts:", error)
      setLoading(false)
    }
  }

  const handleAddAccount = async () => {
    if (!formData.platform || !formData.url) return

    try {
      const response = await fetch("/api/social-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newAccount = await response.json()
        setAccounts([...accounts, newAccount])
        setFormData({
          platform: "",
          display_name: "",
          url: "",
          icon_name: "",
          is_enabled: true,
          sort_order: 0,
        })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error("[v0] Error adding social account:", error)
    }
  }

  const handleUpdateAccount = async () => {
    if (!editingAccount) return

    try {
      const response = await fetch(`/api/social-accounts/${editingAccount.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updated = await response.json()
        setAccounts(accounts.map((a) => (a.id === editingAccount.id ? updated : a)))
        setEditingAccount(null)
        setFormData({
          platform: "",
          display_name: "",
          url: "",
          icon_name: "",
          is_enabled: true,
          sort_order: 0,
        })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error("[v0] Error updating social account:", error)
    }
  }

  const handleDeleteAccount = async (id: string) => {
    if (confirm("Are you sure you want to delete this social account?")) {
      try {
        const response = await fetch(`/api/social-accounts/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setAccounts(accounts.filter((a) => a.id !== id))
        }
      } catch (error) {
        console.error("[v0] Error deleting social account:", error)
      }
    }
  }

  const startEdit = (account: SocialAccount) => {
    setEditingAccount(account)
    setFormData({
      platform: account.platform,
      display_name: account.display_name,
      url: account.url,
      icon_name: account.icon_name,
      is_enabled: account.is_enabled,
      sort_order: account.sort_order,
    })
    setShowAddForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading social accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Social Account Management</h1>
          </div>
          <button
            onClick={() => {
              setEditingAccount(null)
              setFormData({
                platform: "",
                display_name: "",
                url: "",
                icon_name: "",
                is_enabled: true,
                sort_order: 0,
              })
              setShowAddForm(!showAddForm)
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Account
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingAccount ? "Edit Social Account" : "Add New Social Account"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Platform (e.g., facebook, x, youtube)"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Display Name"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="url"
                placeholder="URL (https://...)"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Icon Name (e.g., Facebook, Twitter)"
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Sort Order"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: Number.parseInt(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <label className="flex items-center gap-2 px-4">
                <input
                  type="checkbox"
                  checked={formData.is_enabled}
                  onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="text-gray-700">Enabled</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingAccount ? handleUpdateAccount : handleAddAccount}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                {editingAccount ? "Update Account" : "Add Account"}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingAccount(null)
                }}
                className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Display Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">URL</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Icon</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900 font-medium">{account.platform}</td>
                    <td className="py-4 px-4 text-gray-700">{account.display_name}</td>
                    <td className="py-4 px-4 text-gray-700 truncate max-w-xs">{account.url}</td>
                    <td className="py-4 px-4 text-gray-700">{account.icon_name}</td>
                    <td className="py-4 px-4 text-gray-700">{account.sort_order}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          account.is_enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {account.is_enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(account)} className="text-blue-600 hover:text-blue-700">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {accounts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No social accounts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SocialAccountsPage() {
  return (
    <Suspense fallback={null}>
      <SocialAccountsContent />
    </Suspense>
  )
}
