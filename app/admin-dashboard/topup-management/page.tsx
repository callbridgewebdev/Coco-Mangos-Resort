"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Check, X, FileText, Eye } from "lucide-react"
import Link from "next/link"

interface TopUpTransaction {
  id: string
  guest_id: string
  amount: number
  payment_method: string
  reference_number: string
  receipt_url: string
  status: string
  admin_notes: string
  created_at: string
  guests: {
    full_name: string
    email: string
  }
}

function TopUpManagementContent() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<TopUpTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<TopUpTransaction | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchTransactions()
  }, [router])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/top-up")
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching transactions:", error)
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/top-up/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved", admin_notes: adminNotes }),
      })

      if (response.ok) {
        fetchTransactions()
        setSelectedTransaction(null)
        setAdminNotes("")
      }
    } catch (error) {
      console.error("[v0] Error approving transaction:", error)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this top-up request?")) return

    try {
      const response = await fetch(`/api/top-up/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", admin_notes: adminNotes }),
      })

      if (response.ok) {
        fetchTransactions()
        setSelectedTransaction(null)
        setAdminNotes("")
      }
    } catch (error) {
      console.error("[v0] Error rejecting transaction:", error)
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.guests?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference_number?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin-dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Top-Up Balance Management</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by guest name or reference number..."
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
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Reference #</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.guests?.full_name || "Unknown"}</p>
                        <p className="text-sm text-gray-600">{transaction.guests?.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900 font-semibold">₱{transaction.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-700">{transaction.payment_method}</td>
                    <td className="py-4 px-4 text-gray-700 font-mono text-sm">{transaction.reference_number}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Top-Up Transaction Details</h2>
              <button onClick={() => setSelectedTransaction(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Guest Name</p>
                  <p className="font-semibold">{selectedTransaction.guests?.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{selectedTransaction.guests?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-semibold text-lg text-green-600">₱{selectedTransaction.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold">{selectedTransaction.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reference Number</p>
                  <p className="font-semibold font-mono">{selectedTransaction.reference_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedTransaction.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : selectedTransaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </span>
                </div>
              </div>

              {selectedTransaction.receipt_url && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Payment Receipt</p>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    {selectedTransaction.receipt_url.endsWith(".pdf") ? (
                      <a
                        href={selectedTransaction.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-4 hover:bg-gray-50"
                      >
                        <FileText size={24} className="text-red-600" />
                        <span className="text-blue-600 hover:underline">View PDF Receipt</span>
                      </a>
                    ) : (
                      <img
                        src={selectedTransaction.receipt_url || "/placeholder.svg"}
                        alt="Receipt"
                        className="w-full h-auto max-h-96 object-contain"
                      />
                    )}
                  </div>
                </div>
              )}

              {selectedTransaction.status === "pending" && (
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Admin Notes (Optional)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add any notes for this transaction..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 h-24"
                  />
                </div>
              )}
            </div>

            {selectedTransaction.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedTransaction.id)}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
                >
                  <Check size={20} /> Approve & Credit Balance
                </button>
                <button
                  onClick={() => handleReject(selectedTransaction.id)}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold flex items-center justify-center gap-2"
                >
                  <X size={20} /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function TopUpManagementPage() {
  return (
    <Suspense fallback={null}>
      <TopUpManagementContent />
    </Suspense>
  )
}
