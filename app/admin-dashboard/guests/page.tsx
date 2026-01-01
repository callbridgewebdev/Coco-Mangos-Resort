"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Trash2, Edit2, Plus } from "lucide-react"
import Link from "next/link"

interface Guest {
  id: string
  full_name: string
  email: string
  phone: string
  account_balance: number
  created_at: string
}

function GuestsContent() {
  const router = useRouter()
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [formData, setFormData] = useState({ full_name: "", email: "", phone: "", account_balance: 0 })

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchGuests()
  }, [router])

  const fetchGuests = async () => {
    try {
      const response = await fetch("/api/guests", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setGuests(data)
      } else {
        setGuests([])
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching guests:", error)
      setGuests([])
      setLoading(false)
    }
  }

  const handleAddGuest = async () => {
    if (!formData.full_name || !formData.email) return

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newGuest = await response.json()
        setGuests([newGuest, ...guests])
        setFormData({ full_name: "", email: "", phone: "", account_balance: 0 })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error("[v0] Error adding guest:", error)
    }
  }

  const handleUpdateGuest = async () => {
    if (!editingGuest) return

    try {
      const response = await fetch(`/api/guests/${editingGuest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setGuests(guests.map((g) => (g.id === editingGuest.id ? { ...editingGuest, ...formData } : g)))
        setEditingGuest(null)
        setFormData({ full_name: "", email: "", phone: "", account_balance: 0 })
      }
    } catch (error) {
      console.error("[v0] Error updating guest:", error)
    }
  }

  const handleDeleteGuest = async (id: string) => {
    if (confirm("Are you sure you want to delete this guest?")) {
      try {
        const response = await fetch(`/api/guests/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          setGuests(guests.filter((g) => g.id !== id))
        }
      } catch (error) {
        console.error("[v0] Error deleting guest:", error)
      }
    }
  }

  const startEdit = (guest: Guest) => {
    setEditingGuest(guest)
    setFormData({
      full_name: guest.full_name,
      email: guest.email,
      phone: guest.phone,
      account_balance: guest.account_balance,
    })
    setShowAddForm(true)
  }

  const filteredGuests = guests.filter(
    (guest) =>
      guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading guests...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Guests Management</h1>
          </div>
          <button
            onClick={() => {
              setEditingGuest(null)
              setFormData({ full_name: "", email: "", phone: "", account_balance: 0 })
              setShowAddForm(!showAddForm)
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Guest
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingGuest ? "Edit Guest" : "Add New Guest"}</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Account Balance"
                value={formData.account_balance}
                onChange={(e) => setFormData({ ...formData, account_balance: Number.parseFloat(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingGuest ? handleUpdateGuest : handleAddGuest}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                {editingGuest ? "Update Guest" : "Add Guest"}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingGuest(null)
                }}
                className="flex-1 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search guests by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Account Balance</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900 font-medium">{guest.full_name}</td>
                    <td className="py-4 px-4 text-gray-700">{guest.email}</td>
                    <td className="py-4 px-4 text-gray-700">{guest.phone}</td>
                    <td className="py-4 px-4 text-gray-900 font-semibold">₱{guest.account_balance.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-600">{new Date(guest.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-gray-700">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(guest)} className="text-blue-600 hover:text-blue-700">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteGuest(guest.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGuests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No guests found</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <p>Total Guests: {filteredGuests.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GuestsPage() {
  return (
    <Suspense fallback={null}>
      <GuestsContent />
    </Suspense>
  )
}
