"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

interface Payment {
  id: string
  guest_name: string
  booking_id: string
  amount: number
  payment_method: string
  status: string
  created_at: string
}

function PaymentsContent() {
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchPayments()
  }, [router])

  const fetchPayments = async () => {
    try {
      setPayments([
        {
          id: "1",
          guest_name: "John Doe",
          booking_id: "BK001",
          amount: 1497,
          payment_method: "Account Balance",
          status: "approved",
          created_at: "2025-01-14",
        },
        {
          id: "2",
          guest_name: "Jane Smith",
          booking_id: "BK002",
          amount: 1197,
          payment_method: "GCash",
          status: "pending",
          created_at: "2025-01-15",
        },
        {
          id: "3",
          guest_name: "Mike Johnson",
          booking_id: "BK003",
          amount: 1797,
          payment_method: "PayMaya",
          status: "approved",
          created_at: "2025-01-16",
        },
        {
          id: "4",
          guest_name: "Sarah Davis",
          booking_id: "BK004",
          amount: 999,
          payment_method: "Bank Transfer",
          status: "failed",
          created_at: "2025-01-17",
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching payments:", error)
      setLoading(false)
    }
  }

  const updatePaymentStatus = (id: string, newStatus: string) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.booking_id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payments...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments by guest or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Booking ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900 font-medium">{payment.guest_name}</td>
                    <td className="py-4 px-4 text-gray-700">{payment.booking_id}</td>
                    <td className="py-4 px-4 text-gray-900 font-semibold">₱{payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-700">{payment.payment_method}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          payment.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      {payment.status === "pending" && (
                        <button
                          onClick={() => updatePaymentStatus(payment.id, "approved")}
                          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={null}>
      <PaymentsContent />
    </Suspense>
  )
}
