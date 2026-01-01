"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Trash2, Edit2, Plus } from "lucide-react"
import Link from "next/link"

interface Coupon {
  id: string
  code: string
  coupon_type: string
  discount_percentage: number
  discount_amount: number
  usage_limit: number
  usage_count: number
  expiration_date: string
  is_locked: boolean
}

function CouponsContent() {
  const router = useRouter()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    coupon_type: "Holiday",
    discount_percentage: 0,
    discount_amount: 0,
    usage_limit: 10,
    expiration_date: "",
  })

  const couponTypes = ["Holiday", "Birthday", "Christmas", "New Years", "Summer"]

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchCoupons()
  }, [router])

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setCoupons(data)
      } else {
        setCoupons([])
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching coupons:", error)
      setCoupons([])
      setLoading(false)
    }
  }

  const handleAddCoupon = async () => {
    if (!formData.code) return

    try {
      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newCoupon = await response.json()
        setCoupons([newCoupon, ...coupons])
        resetForm()
      }
    } catch (error) {
      console.error("[v0] Error adding coupon:", error)
    }
  }

  const handleUpdateCoupon = async () => {
    if (!editingCoupon) return

    try {
      const response = await fetch(`/api/coupons/${editingCoupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setCoupons(coupons.map((c) => (c.id === editingCoupon.id ? { ...editingCoupon, ...formData } : c)))
        resetForm()
      }
    } catch (error) {
      console.error("[v0] Error updating coupon:", error)
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      try {
        const response = await fetch(`/api/coupons/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setCoupons(coupons.filter((c) => c.id !== id))
        }
      } catch (error) {
        console.error("[v0] Error deleting coupon:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      coupon_type: "Holiday",
      discount_percentage: 0,
      discount_amount: 0,
      usage_limit: 10,
      expiration_date: "",
    })
    setShowAddForm(false)
    setEditingCoupon(null)
  }

  const startEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      coupon_type: coupon.coupon_type,
      discount_percentage: coupon.discount_percentage,
      discount_amount: coupon.discount_amount,
      usage_limit: coupon.usage_limit,
      expiration_date: coupon.expiration_date,
    })
    setShowAddForm(true)
  }

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.coupon_type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coupons...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Coupons & Offers Management</h1>
          </div>
          <button
            onClick={() => {
              setEditingCoupon(null)
              setFormData({
                code: "",
                coupon_type: "Holiday",
                discount_percentage: 0,
                discount_amount: 0,
                usage_limit: 10,
                expiration_date: "",
              })
              setShowAddForm(!showAddForm)
            }}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Coupon
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={formData.coupon_type}
                onChange={(e) => setFormData({ ...formData, coupon_type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {couponTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Discount Percentage"
                value={formData.discount_percentage}
                onChange={(e) => setFormData({ ...formData, discount_percentage: Number.parseInt(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Discount Amount"
                value={formData.discount_amount}
                onChange={(e) => setFormData({ ...formData, discount_amount: Number.parseFloat(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Usage Limit"
                value={formData.usage_limit}
                onChange={(e) => setFormData({ ...formData, usage_limit: Number.parseInt(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="date"
                value={formData.expiration_date}
                onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingCoupon ? handleUpdateCoupon : handleAddCoupon}
                className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                {editingCoupon ? "Update Coupon" : "Add Coupon"}
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
                placeholder="Search coupons by code or type..."
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
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Discount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Usage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Expiration</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon) => {
                  const isExpired = new Date(coupon.expiration_date) < new Date()
                  const isLimitReached = coupon.usage_count >= coupon.usage_limit

                  return (
                    <tr key={coupon.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-gray-900 font-bold">{coupon.code}</td>
                      <td className="py-4 px-4 text-gray-700">{coupon.coupon_type}</td>
                      <td className="py-4 px-4 text-gray-900 font-semibold">
                        {coupon.discount_percentage > 0
                          ? `${coupon.discount_percentage}%`
                          : `₱${coupon.discount_amount}`}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {coupon.usage_count}/{coupon.usage_limit}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(coupon.expiration_date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isExpired
                              ? "bg-red-100 text-red-700"
                              : isLimitReached
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {isExpired ? "Expired" : isLimitReached ? "Limited" : "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(coupon)} className="text-blue-600 hover:text-blue-700">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredCoupons.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No coupons found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CouponsPage() {
  return (
    <Suspense fallback={null}>
      <CouponsContent />
    </Suspense>
  )
}
