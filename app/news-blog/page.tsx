"use client"

import { useState } from "react"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export default function NewsBlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  const allBlogPosts = [
    // Coco Mangos Resort Blogs (6)
    {
      id: 1,
      title: "Welcome to Coco Mangos Place Resort: Your Tropical Paradise Awaits",
      excerpt:
        "Discover why Coco Mangos is the ultimate destination for luxury tropical getaways with stunning ocean views and world-class amenities.",
      date: "December 28, 2025",
      author: "Resort Team",
      category: "Coco Mangos",
      image: "/tropical-resort-lobby-with-palm-trees.jpg",
      content:
        "Nestled on pristine white-sand beaches of Panglao, Coco Mangos Place Resort offers an unparalleled tropical experience. With over 20 years of hospitality excellence, we've perfected the art of island luxury. Our 50+ carefully designed rooms feature ocean views, modern amenities, and authentic Filipino hospitality that makes every guest feel like family...",
    },
    {
      id: 2,
      title: "Culinary Excellence: Farm-to-Table Dining at Coco Mangos",
      excerpt:
        "Experience authentic Filipino cuisine and international flavors prepared by our award-winning chefs using fresh local ingredients.",
      date: "December 25, 2025",
      author: "Culinary Team",
      category: "Coco Mangos",
      image: "/gallery-dining-1.jpg",
      content:
        "Our restaurant specializes in farm-to-table cuisine, sourcing ingredients directly from local Bohol farmers. Every dish tells a story of our commitment to sustainability and authentic flavors. From traditional boodle fights to gourmet fusion cuisine, our culinary team creates unforgettable dining experiences...",
    },
    {
      id: 3,
      title: "Wellness & Spa: Rejuvenate Your Body and Soul",
      excerpt:
        "Discover our world-class spa treatments and wellness programs designed to rejuvenate your mind, body, and spirit.",
      date: "December 20, 2025",
      author: "Wellness Team",
      category: "Coco Mangos",
      image: "/gallery-spa-1.jpg",
      content:
        "Our full-service spa offers traditional Filipino massage, aromatherapy, and holistic wellness treatments. Located in a serene tropical garden setting, our spa provides the perfect escape for relaxation and rejuvenation. Professional therapists use natural products sourced from local suppliers...",
    },
    {
      id: 4,
      title: "Adventure Activities: Water Sports at Coco Mangos",
      excerpt:
        "From snorkeling to paddleboarding, explore thrilling water sports adventures available exclusively at our resort.",
      date: "December 15, 2025",
      author: "Activities Team",
      category: "Coco Mangos",
      image: "/gallery-beach-1.jpg",
      content:
        "Coco Mangos offers a complete range of water sports including snorkeling, scuba diving, jet skiing, and island hopping tours. Our certified instructors ensure safety while you explore the vibrant marine life and pristine beaches of Panglao...",
    },
    {
      id: 5,
      title: "Romantic Getaways: Perfect Honeymoon Packages",
      excerpt: "Create unforgettable memories with our specially curated honeymoon and romantic retreat packages.",
      date: "December 10, 2025",
      author: "Events Team",
      category: "Coco Mangos",
      image: "/gallery-beach-2.jpg",
      content:
        "Our romantic packages include beachfront dinners, couples' spa treatments, sunset cruises, and personalized service. Perfect for honeymoons, anniversaries, or special occasions, every detail is crafted to create magical moments...",
    },
    {
      id: 6,
      title: "Sustainability at Coco Mangos: Protecting Our Paradise",
      excerpt:
        "Learn how we're committed to eco-friendly practices and environmental conservation while providing luxury hospitality.",
      date: "December 5, 2025",
      author: "Sustainability Team",
      category: "Coco Mangos",
      image: "/gallery-garden-1.jpg",
      content:
        "Coco Mangos implements comprehensive sustainability programs including ocean conservation, reef protection, and waste management. We believe luxury and environmental responsibility go hand in hand, creating a better future for our island home...",
    },

    // Panglao Tourist Destination Blogs (6)
    {
      id: 7,
      title: "Panglao Island: Gateway to Bohol's Best Adventures",
      excerpt:
        "Explore Panglao Island, home to stunning beaches, vibrant culture, and world-class resorts including Coco Mangos.",
      date: "November 28, 2025",
      author: "Travel Guide Team",
      category: "Panglao Island",
      image: "/pristine-tropical-beach-with-palm-trees-sunset.jpg",
      content:
        "Panglao Island is one of Bohol's premier destinations, offering pristine beaches, crystal-clear waters, and a perfect blend of relaxation and adventure. As home to Coco Mangos Place Resort, Panglao provides easy access to the island's best attractions and play-to-stay experiences...",
    },
    {
      id: 8,
      title: "Alona Beach: Panglao's Most Popular Beach Destination",
      excerpt:
        "Discover Alona Beach, famous for water sports, restaurants, and stunning sunsets - easily accessible from Coco Mangos.",
      date: "November 25, 2025",
      author: "Beach Guide",
      category: "Panglao Island",
      image: "/gallery-beach-1.jpg",
      content:
        "Just a short distance from Coco Mangos, Alona Beach offers white sand, turquoise waters, and vibrant nightlife. Perfect for beach lovers, divers, and adventurers, Alona is the heart of Panglao's tourism with restaurants, bars, and water sports facilities...",
    },
    {
      id: 9,
      title: "Island Hopping from Panglao: Explore Virgin Islands",
      excerpt:
        "Experience exciting island hopping tours that depart from Panglao, visiting pristine virgin islands and hidden coves.",
      date: "November 20, 2025",
      author: "Adventure Team",
      category: "Panglao Island",
      image: "/gallery-beach-2.jpg",
      content:
        "Panglao is the perfect base for island hopping adventures. Visit the stunning Virgin Islands, explore hidden lagoons, and discover secluded beaches. Coco Mangos can arrange complete packages including tours, meals, and accommodations...",
    },
    {
      id: 10,
      title: "Diving Paradise: Panglao's Underwater Wonders",
      excerpt: "Dive into world-class diving spots around Panglao with thriving coral reefs and exotic marine life.",
      date: "November 15, 2025",
      author: "Diving Instructor",
      category: "Panglao Island",
      image: "/gallery-pool-1.jpg",
      content:
        "Panglao is recognized as one of Asia's top diving destinations. With multiple dive sites accessible from our resort, including Pamilacan Island and Balicasag Island, divers of all levels can experience incredible underwater adventures...",
    },
    {
      id: 11,
      title: "Play to Stay: Experience Panglao Like a Local",
      excerpt:
        "Discover authentic local experiences, cultural activities, and community engagement opportunities in Panglao with Coco Mangos.",
      date: "November 10, 2025",
      author: "Cultural Guide",
      category: "Panglao Island",
      image: "/gallery-garden-1.jpg",
      content:
        "Experience Panglao beyond the beaches. Visit local markets, participate in traditional crafts, support local artisans, and engage with communities. Coco Mangos offers curated play-to-stay packages that connect you with authentic Panglao culture...",
    },
    {
      id: 12,
      title: "Panglao's Hidden Gems: Secret Beaches and Viewpoints",
      excerpt:
        "Uncover lesser-known locations and hidden gems that make Panglao special - perfect for adventurous travelers.",
      date: "November 5, 2025",
      author: "Explorer",
      category: "Panglao Island",
      image: "/pristine-tropical-beach-with-palm-trees-sunset.jpg",
      content:
        "Beyond the famous beaches, Panglao offers hidden viewpoints, secret coves, and secluded swimming spots. Our local guides at Coco Mangos know the best-kept secrets and can arrange personalized tours to these exclusive locations...",
    },

    // Why Travel to Bohol Blogs (6)
    {
      id: 13,
      title: "Why Bohol is the Perfect Tropical Destination: A Complete Guide",
      excerpt:
        "Discover why Bohol attracts travelers worldwide with natural wonders, culture, and adventure opportunities.",
      date: "October 28, 2025",
      author: "Travel Journalist",
      category: "Bohol Travel",
      image: "/tropical-resort-lobby-with-palm-trees.jpg",
      content:
        "Bohol offers an incredible mix of natural beauty, cultural experiences, and adventure activities. From the Chocolate Hills to pristine beaches, underwater wonders to warm hospitality, Bohol is truly a paradise that shouldn't be missed...",
    },
    {
      id: 14,
      title: "The Chocolate Hills: Bohol's Most Iconic Natural Wonder",
      excerpt:
        "Explore Bohol's famous Chocolate Hills - a breathtaking geological formation and UNESCO-recognized landscape.",
      date: "October 25, 2025",
      author: "Nature Guide",
      category: "Bohol Travel",
      image: "/gallery-garden-1.jpg",
      content:
        "The Chocolate Hills are a must-see attraction featuring 1,268 cone-shaped hills that turn brown during dry season, resembling chocolate drops. A short trip from Panglao and Coco Mangos, this iconic landscape offers spectacular views and photo opportunities...",
    },
    {
      id: 15,
      title: "Marine Sanctuaries of Bohol: Snorkeling and Diving Paradise",
      excerpt:
        "Experience Bohol's protected marine ecosystems with world-class snorkeling and diving in crystal-clear waters.",
      date: "October 20, 2025",
      author: "Marine Biologist",
      category: "Bohol Travel",
      image: "/gallery-beach-1.jpg",
      content:
        "Bohol's marine sanctuaries are among the Philippines' finest. Balicasag Island, Pamilacan Island, and the Virgin Islands offer pristine coral reefs, diverse marine species, and unforgettable underwater experiences accessible from Coco Mangos...",
    },
    {
      id: 16,
      title: "Cultural Heritage: Exploring Bohol's History and Traditions",
      excerpt:
        "Discover Bohol's rich cultural heritage through historic churches, local festivals, and traditional crafts.",
      date: "October 15, 2025",
      author: "Cultural Historian",
      category: "Bohol Travel",
      image: "/gallery-dining-1.jpg",
      content:
        "Bohol's history spans centuries, reflected in colonial churches, traditional celebrations, and local craftsmanship. Visit historical sites, participate in festivals, and connect with communities that have preserved Bohol's unique cultural identity...",
    },
    {
      id: 17,
      title: "Wildlife Watching in Bohol: Tarsiers and Exotic Birds",
      excerpt:
        "Encounter Bohol's unique wildlife including the endangered Philippine tarsier and numerous bird species.",
      date: "October 10, 2025",
      author: "Wildlife Expert",
      category: "Bohol Travel",
      image: "/gallery-garden-1.jpg",
      content:
        "Bohol is home to incredible wildlife including the world's smallest primate, the Philippine tarsier. Visit protected sanctuaries, explore rainforests, and observe endemic bird species. These experiences offer genuine connection with nature...",
    },
    {
      id: 18,
      title: "Best Time to Visit Bohol: Seasonal Guide and Travel Tips",
      excerpt:
        "Learn about Bohol's seasons, weather patterns, and best times to visit for various activities and experiences.",
      date: "October 5, 2025",
      author: "Travel Planner",
      category: "Bohol Travel",
      image: "/pristine-tropical-beach-with-palm-trees-sunset.jpg",
      content:
        "Bohol can be visited year-round, but different seasons offer unique experiences. The dry season (November-May) is perfect for beach activities, while the rainy season offers fewer crowds and lush landscapes. Plan your trip based on your preferences...",
    },
  ]

  const totalPages = Math.ceil(allBlogPosts.length / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const displayedPosts = allBlogPosts.slice(startIndex, startIndex + blogsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

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
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {displayedPosts.map((post) => (
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
                      href={`/news-blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Read More <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-between md:justify-center gap-4 md:gap-8 flex-wrap">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-semibold transition ${
                      currentPage === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-center mt-8 text-foreground/70">
              <p>
                Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
