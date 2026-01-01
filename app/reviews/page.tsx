"use client"

import type React from "react"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import Link from "next/link"
import { Star } from "lucide-react"
import { useState } from "react"

export default function ReviewsPage() {
  const allReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2025-01-15",
      title: "Paradise Found!",
      excerpt:
        "Absolutely stunning resort with world-class service. The staff went above and beyond to make our honeymoon unforgettable...",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      date: "2025-01-10",
      title: "Best Vacation Ever",
      excerpt:
        "Exceeded all expectations! Beautiful rooms, excellent food, and amazing activities. Definitely coming back.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      date: "2025-01-08",
      title: "Wonderful Experience",
      excerpt:
        "Great location, friendly staff, and beautiful beachfront. Only minor issue was WiFi connectivity in one area.",
    },
    {
      id: 4,
      name: "David Martinez",
      rating: 5,
      date: "2025-01-05",
      title: "Luxury Tropical Escape",
      excerpt:
        "The Function Room was perfect for our company event. Professional staff handled everything beautifully.",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      rating: 5,
      date: "2025-01-02",
      title: "Family Paradise",
      excerpt:
        "Perfect for families! Kids loved the pool and beach activities. Staff was very accommodating with our family needs.",
    },
    {
      id: 6,
      name: "James Thompson",
      rating: 4,
      date: "2024-12-28",
      title: "Beautiful Setting",
      excerpt:
        "Stunning views and comfortable rooms. Great value for money. Would have liked more variety in restaurant options.",
    },
    {
      id: 7,
      name: "Maria Garcia",
      rating: 5,
      date: "2024-12-25",
      title: "Dream Destination",
      excerpt:
        "Romantic, beautiful, and peaceful. The sunset view from the beachfront villa is absolutely breathtaking.",
    },
    {
      id: 8,
      name: "Robert Kim",
      rating: 5,
      date: "2024-12-20",
      title: "Outstanding Service",
      excerpt: "Every detail was perfect. From check-in to check-out, the staff provided exceptional service.",
    },
    {
      id: 9,
      name: "Patricia Lee",
      rating: 4,
      date: "2024-12-18",
      title: "Highly Recommended",
      excerpt:
        "Beautiful resort with excellent amenities. The spa treatments were incredible. Minor: room was a bit noisy from the bar.",
    },
    {
      id: 10,
      name: "Thomas Robinson",
      rating: 5,
      date: "2024-12-15",
      title: "Worth Every Penny",
      excerpt:
        "Premium experience at a great price point. The tour packages offered excellent value and unforgettable experiences.",
    },
    {
      id: 11,
      name: "Jennifer Brown",
      rating: 5,
      date: "2024-12-10",
      title: "Magical Getaway",
      excerpt: "An absolutely magical experience. The staff treated us like family and the amenities are top-notch.",
    },
    {
      id: 12,
      name: "Christopher Davis",
      rating: 4,
      date: "2024-12-05",
      title: "Great Value Resort",
      excerpt: "Great value for money with clean rooms and friendly staff. Activities were well-organized.",
    },
    {
      id: 13,
      name: "Amanda White",
      rating: 5,
      date: "2024-11-30",
      title: "Perfect Honeymoon Spot",
      excerpt: "Could not have asked for a better place for our honeymoon. Romantic, beautiful, and luxurious.",
    },
    {
      id: 14,
      name: "Mark Sullivan",
      rating: 4,
      date: "2024-11-25",
      title: "Excellent Beach Resort",
      excerpt: "Excellent beach resort with stunning views. Food was delicious and portions were generous.",
    },
    {
      id: 15,
      name: "Rachel Green",
      rating: 5,
      date: "2024-11-20",
      title: "Unforgettable Experience",
      excerpt: "Everything about this resort is unforgettable. Will definitely return for another amazing stay.",
    },
    {
      id: 16,
      name: "Kevin Murphy",
      rating: 5,
      date: "2024-11-15",
      title: "Best Resort in Bohol",
      excerpt: "Hands down the best resort we've stayed at in Bohol. Staff is attentive and the location is perfect.",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const [showWriteForm, setShowWriteForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    title: "",
    review: "",
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(allReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = allReviews.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Review submitted:", reviewForm)
    setReviewForm({ name: "", email: "", rating: 5, title: "", review: "" })
    setShowWriteForm(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Guest Reviews</h1>
            <p className="text-lg md:text-xl opacity-90">Read what our guests have to say about their stay</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width mb-12">
            {!showWriteForm && (
              <button onClick={() => setShowWriteForm(true)} className="btn-primary">
                Write a Review
              </button>
            )}

            {showWriteForm && (
              <div className="bg-card border border-border rounded-lg p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Share Your Experience</h2>
                  <button
                    onClick={() => setShowWriteForm(false)}
                    className="text-foreground/60 hover:text-foreground text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className={`text-3xl transition ${
                            star <= reviewForm.rating ? "text-secondary" : "text-foreground/20"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Review Title</label>
                    <input
                      type="text"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Your Review</label>
                    <textarea
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Share your detailed experience..."
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary">
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowWriteForm(false)}
                      className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {paginatedReviews.map((review) => (
                <Link href={`/reviews/${review.id}`} key={review.id}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{review.name}</h3>
                        <p className="text-sm text-foreground/60">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>
                    <h4 className="font-bold mb-2 text-foreground">{review.title}</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">{review.excerpt}</p>
                    <div className="mt-4 text-primary font-semibold text-sm">Read Full Review →</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-border rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-border rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition"
              >
                Next
              </button>
            </div>

            <p className="text-center text-foreground/60 text-sm mt-4">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
