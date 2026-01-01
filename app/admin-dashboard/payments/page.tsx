"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Plus } from "lucide-react"
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
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    guest_name: "",
    booking_id: "",
    amount: 0,
    payment_method: "Account Balance",
    status: "pending",
  })

  const paymentMethods = ["Account Balance", "GCash", "PayMaya", "Bank Transfer"]

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
      const response = await fetch("/api/payments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setPayments(data)
      } else {
        setPayments([])
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching payments:", error)
      setPayments([])
      setLoading(false)
    }
  }

  const handleAddPayment = async () => {
    if (!formData.guest_name || !formData.booking_id) return

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newPayment = await response.json()
        setPayments([newPayment, ...payments])
        resetForm()
      }
    } catch (error) {
      console.error("[v0] Error adding payment:", error)
    }
  }

  const updatePaymentStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setPayments(payments.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
      }
    } catch (error) {
      console.error("[v0] Error updating payment:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      guest_name: "",
      booking_id: "",
      amount: 0,
      payment_method: "Account Balance",
      status: "pending",
    })
    setShowAddForm(false)
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
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
          </div>
          <button
            onClick={() => {
              setFormData({
                guest_name: "",
                booking_id: "",
                amount: 0,
                payment_method: "Account Balance",
                status: "pending",
              })
              setShowAddForm(!showAddForm)
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Payment
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Record Manual Payment</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Guest Name"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Booking ID"
                value={formData.booking_id}
                onChange={(e) => setFormData({ ...formData, booking_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddPayment}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                Add Payment
              </button>
              <button
                onClick={resetForm}
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
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
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
