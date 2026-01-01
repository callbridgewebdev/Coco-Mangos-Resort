"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { useState, useEffect } from "react"
import { X, Star, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryItem {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  sort_order: number
  is_published: boolean
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [reviewsPage, setReviewsPage] = useState(0)
  const [images, setImages] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery?published=true")
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      }
    } catch (error) {
      console.error("[v0] Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  const allReviews = [
    {
      name: "Sarah Mitchell",
      rating: 5,
      text: "Absolutely stunning resort! The service was impeccable and the views were breathtaking.",
    },
    {
      name: "John Anderson",
      rating: 5,
      text: "Best vacation we've had in years. Everyone was so welcoming and attentive.",
    },
    {
      name: "Elena Rodriguez",
      rating: 5,
      text: "The beach, the food, the accommodations - everything was perfect. Highly recommended!",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Paradise found! Staff went above and beyond to make our stay memorable.",
    },
    {
      name: "Maria Santos",
      rating: 5,
      text: "Spectacular sunsets and incredible hospitality. Will definitely return!",
    },
    { name: "David Thompson", rating: 5, text: "One of the best resort experiences of my life. Worth every peso!" },
    { name: "Ana Garcia", rating: 5, text: "The attention to detail is remarkable. Everything is perfect here." },
    { name: "James Wilson", rating: 5, text: "A hidden gem in Bohol. Highly recommend to everyone!" },
  ]

  const imagesPerPage = 8
  const paginatedImages = images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage)
  const totalPages = Math.ceil(images.length / imagesPerPage)

  const reviewsPerPage = 3
  const paginatedReviews = allReviews.slice(reviewsPage * reviewsPerPage, (reviewsPage + 1) * reviewsPerPage)

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-lg md:text-xl opacity-90">Explore the beauty and luxury of Coco Mangos Resort</p>
          </div>
        </section>

        <section className="section-padding pb-32 md:pb-16">
          <div className="section-max-width">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-foreground/60">Loading gallery...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {paginatedImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-32 md:h-48 lg:h-64 rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(image.image_url)}
                    >
                      <img
                        src={image.image_url || "/placeholder.svg"}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition text-sm md:text-base">
                          View
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          {image.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition"
                  >
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-8 h-8 rounded-lg transition ${
                          currentPage === i
                            ? "bg-primary text-primary-foreground"
                            : "border border-border hover:bg-muted"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <div className="bg-card rounded-lg overflow-hidden">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Enlarged"
                  className="w-full h-auto max-h-96 md:max-h-[70vh] object-contain"
                />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition hover:scale-110"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === img.image_url ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img.image_url || "/placeholder.svg"}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-4xl font-bold mb-12 text-center">Guest Reviews</h2>

            {/* Swipeable Reviews Container */}
            <div className="relative mb-8">
              <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory">
                {paginatedReviews.map((review, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-full md:w-1/3 bg-card border border-border rounded-lg p-6 snap-center"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} className="fill-secondary text-secondary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/70">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setReviewsPage(Math.max(0, reviewsPage - 1))}
                disabled={reviewsPage === 0}
                className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(allReviews.length / reviewsPerPage) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewsPage(i)}
                    className={`w-2 h-2 rounded-full transition ${reviewsPage === i ? "bg-primary w-8" : "bg-border"}`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setReviewsPage(Math.min(Math.ceil(allReviews.length / reviewsPerPage) - 1, reviewsPage + 1))
                }
                disabled={reviewsPage === Math.ceil(allReviews.length / reviewsPerPage) - 1}
                className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-muted transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
