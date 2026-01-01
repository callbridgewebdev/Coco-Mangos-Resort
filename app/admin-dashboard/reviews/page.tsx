"use client"

import { Suspense, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Search, Trash2, Check, Star } from "lucide-react"
import Link from "next/link"

interface Review {
  id: string
  room_id: string
  guest_id: string
  booking_id: string
  rating: number
  comment: string
  is_approved: boolean
  created_at: string
}

function ReviewsContent() {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated")
    if (!isAdmin) {
      router.push("/admin-auth")
      return
    }
    fetchReviews()
  }, [router, filterStatus])

  const fetchReviews = async () => {
    try {
      const url = filterStatus === "all" ? "/api/reviews" : `/api/reviews?approved=${filterStatus === "approved"}`

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const data = await response.json()
        setReviews(data)
      } else {
        setReviews([])
      }
      setLoading(false)
    } catch (error) {
      console.error("[v0] Error fetching reviews:", error)
      setReviews([])
      setLoading(false)
    }
  }

  const handleApproveReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_approved: true }),
      })

      if (response.ok) {
        setReviews(reviews.map((r) => (r.id === id ? { ...r, is_approved: true } : r)))
      }
    } catch (error) {
      console.error("[v0] Error approving review:", error)
    }
  }

  const handleDeleteReview = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`/api/reviews/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setReviews(reviews.filter((r) => r.id !== id))
        }
      } catch (error) {
        console.error("[v0] Error deleting review:", error)
      }
    }
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.room_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Room Reviews Management</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews by room or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Reviews</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Room ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Comment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900 font-semibold">{review.room_id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 font-semibold">{review.rating}/5</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 max-w-xs truncate">{review.comment || "No comment"}</td>
                    <td className="py-4 px-4 text-gray-600">{new Date(review.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          review.is_approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {review.is_approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      <div className="flex gap-2">
                        {!review.is_approved && (
                          <button
                            onClick={() => handleApproveReview(review.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Approve review"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete review"
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

          {filteredReviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <Suspense fallback={null}>
      <ReviewsContent />
    </Suspense>
  )
}
