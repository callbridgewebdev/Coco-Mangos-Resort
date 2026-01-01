"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function NewsBlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Discover the Hidden Beaches of Bohol",
      excerpt: "Explore pristine white-sand beaches and crystal-clear waters perfect for your next tropical escape.",
      date: "December 28, 2025",
      author: "Travel Team",
      category: "Travel Guide",
      image: "/gallery-beach-1.jpg",
    },
    {
      id: 2,
      title: "Top 5 Water Sports Activities at Our Resort",
      excerpt: "From snorkeling to paddleboarding, discover the best water adventures available at Coco Mangos.",
      date: "December 25, 2025",
      author: "Activities Team",
      category: "Activities",
      image: "/gallery-pool-1.jpg",
    },
    {
      id: 3,
      title: "Local Cuisine You Must Try in Bohol",
      excerpt: "Experience authentic flavors with our guide to traditional Philippine dishes and fusion cuisine.",
      date: "December 20, 2025",
      author: "Culinary Team",
      category: "Food & Dining",
      image: "/gallery-dining-1.jpg",
    },
    {
      id: 4,
      title: "Sustainable Tourism at Coco Mangos Resort",
      excerpt: "Learn how we're committed to protecting our environment while providing world-class hospitality.",
      date: "December 15, 2025",
      author: "Sustainability Team",
      category: "Sustainability",
      image: "/gallery-garden-1.jpg",
    },
    {
      id: 5,
      title: "Perfect Honeymoon Packages for Couples",
      excerpt: "Create unforgettable memories with our specially curated romantic getaway experiences.",
      date: "December 10, 2025",
      author: "Packages Team",
      category: "Special Offers",
      image: "/gallery-beach-2.jpg",
    },
    {
      id: 6,
      title: "Spa & Wellness: Relax Your Way to Paradise",
      excerpt: "Rejuvenate your mind and body with our world-class spa treatments and wellness programs.",
      date: "December 5, 2025",
      author: "Wellness Team",
      category: "Wellness",
      image: "/gallery-spa-1.jpg",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-secondary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">News & Blog</h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover travel tips, resort updates, and island inspiration
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-foreground/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </div>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
