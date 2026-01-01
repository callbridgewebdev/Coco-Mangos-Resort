"use client"
import { useParams } from "next/navigation"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import Link from "next/link"
import { Star, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function RoomReviewsPage() {
  const params = useParams()
  const roomId = params.id as string

  // Sample reviews data - in a real app, filter by room ID
  const allReviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2025-01-15",
      text: "Absolutely stunning room with world-class amenities. The beachfront view is breathtaking and the staff was incredibly attentive.",
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 5,
      date: "2025-01-10",
      text: "Exceeded all expectations! Spacious, clean, and beautifully decorated. The room service was exceptional.",
    },
    {
      id: 3,
      author: "Emma Wilson",
      rating: 4,
      date: "2025-01-08",
      text: "Great room with excellent amenities. Only minor issue was WiFi connectivity at times.",
    },
    {
      id: 4,
      author: "David Martinez",
      rating: 5,
      date: "2025-01-05",
      text: "The suite exceeded our expectations. Modern design, comfortable bed, and stunning ocean views.",
    },
    {
      id: 5,
      author: "Lisa Anderson",
      rating: 5,
      date: "2025-01-02",
      text: "Perfect for our anniversary! Romantic ambiance, luxurious amenities, and impeccable service.",
    },
    {
      id: 6,
      author: "James Thompson",
      rating: 4,
      date: "2024-12-28",
      text: "Beautiful room with great value for money. Comfortable bedding and modern bathroom facilities.",
    },
    {
      id: 7,
      author: "Maria Garcia",
      rating: 5,
      date: "2024-12-25",
      text: "Dream room! Every detail was perfect. The private balcony overlooking the beach is absolutely magical.",
    },
    {
      id: 8,
      author: "Robert Kim",
      rating: 5,
      date: "2024-12-20",
      text: "Outstanding room quality. The staff went above and beyond to ensure our comfort.",
    },
    {
      id: 9,
      author: "Patricia Lee",
      rating: 4,
      date: "2024-12-18",
      text: "Lovely room with excellent furnishings. Spa amenities were incredible.",
    },
    {
      id: 10,
      author: "Thomas Robinson",
      rating: 5,
      date: "2024-12-15",
      text: "Worth every penny! Luxury accommodation with exceptional service. Will definitely return.",
    },
    {
      id: 11,
      author: "Jennifer Brown",
      rating: 5,
      date: "2024-12-10",
      text: "Absolutely magical room. The staff treated us like family and the amenities are top-notch.",
    },
    {
      id: 12,
      author: "Christopher Davis",
      rating: 4,
      date: "2024-12-05",
      text: "Great room with clean facilities and friendly staff. Activities were well-organized.",
    },
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(allReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = allReviews.slice(startIndex, startIndex + itemsPerPage)

  const avgRating = (allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length).toFixed(1)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Header */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width">
            <Link href={`/accommodation/${roomId}`} className="flex items-center gap-2 mb-4 hover:opacity-80">
              <ArrowLeft size={20} />
              Back to Room
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Room Reviews</h1>
            <p className="text-lg opacity-90">
              Average Rating: <span className="font-bold">{avgRating}</span> / 5.0 ({allReviews.length} reviews)
            </p>
          </div>
        </section>

        {/* Reviews List */}
        <section className="section-padding">
          <div className="section-max-width">
            <div className="space-y-6">
              {paginatedReviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{review.author}</h3>
                      <p className="text-sm text-foreground/60">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < review.rating ? "fill-secondary text-secondary" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-12">
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
