"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
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
      setGuests([
        {
          id: "1",
          full_name: "John Doe",
          email: "john@example.com",
          phone: "+63 9123456789",
          account_balance: 5000,
          created_at: "2025-01-01",
        },
        {
          id: "2",
          full_name: "Jane Smith",
          email: "jane@example.com",
          phone: "+63 9234567890",
          account_balance: 7500,
          created_at: "2025-01-02",
        },
        {
          id: "3",
          full_name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+63 9345678901",
          account_balance: 2500,
          created_at: "2025-01-03",
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching guests:", error)
      setLoading(false)
    }
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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Guests Management</h1>
        </div>

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
