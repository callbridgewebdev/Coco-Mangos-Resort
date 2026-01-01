"use client"

import { useParams, useRouter } from "next/navigation"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Calendar, User, ArrowLeft, Share2, ArrowRight } from "lucide-react"

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id

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
        "Nestled on pristine white-sand beaches of Panglao, Coco Mangos Place Resort offers an unparalleled tropical experience. With over 20 years of hospitality excellence, we've perfected the art of island luxury.\n\nOur 50+ carefully designed rooms feature ocean views, modern amenities, and authentic Filipino hospitality that makes every guest feel like family. Whether you're seeking a romantic escape, family vacation, or adventure-filled retreat, Coco Mangos delivers unforgettable experiences.\n\nFrom our award-winning restaurant serving farm-to-table cuisine to our world-class spa and thrilling water sports activities, every aspect of Coco Mangos is designed to exceed expectations. Our commitment to sustainability ensures that your luxury getaway doesn't compromise our beautiful environment.\n\nExperience the magic of Panglao Island with Coco Mangos Place Resort - where every moment becomes a cherished memory.",
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
        "Our restaurant specializes in farm-to-table cuisine, sourcing ingredients directly from local Bohol farmers. Every dish tells a story of our commitment to sustainability and authentic flavors.\n\nFrom traditional boodle fights to gourmet fusion cuisine, our culinary team creates unforgettable dining experiences. Our chefs combine traditional Filipino cooking techniques with modern presentation, resulting in dishes that celebrate local culture while appealing to international palates.\n\nEnjoy fresh seafood caught daily, tropical fruits at peak ripeness, and vegetables harvested just hours before serving. Our sustainable sourcing practices support local farmers and reduce our environmental footprint.\n\nWhether you're dining on our beachfront terrace at sunset or enjoying an intimate dinner in your room, every meal at Coco Mangos is a celebration of Bohol's culinary heritage and contemporary gastronomy.",
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
        "Our full-service spa offers traditional Filipino massage, aromatherapy, and holistic wellness treatments. Located in a serene tropical garden setting, our spa provides the perfect escape for relaxation and rejuvenation.\n\nProfessional therapists use natural products sourced from local suppliers, ensuring authenticity and sustainability in every treatment. From the signature Hilot massage to exotic spa rituals, each experience is customized to your needs.\n\nOur wellness programs include yoga classes overlooking the ocean, meditation sessions in nature, and nutritional counseling. Whether you're seeking stress relief, pain management, or complete body rejuvenation, our spa team designs personalized wellness journeys.\n\nInvestments in your well-being are investments in your happiness. At Coco Mangos, we believe luxury means taking time to restore your inner peace while surrounded by nature's beauty.",
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
        "Coco Mangos offers a complete range of water sports including snorkeling, scuba diving, jet skiing, and island hopping tours. Our certified instructors ensure safety while you explore the vibrant marine life and pristine beaches of Panglao.\n\nExperience world-class diving at Balicasag Island and Pamilacan Island, with encounters with sea turtles, rays, and thousands of tropical fish species. Snorkeling excursions take you to shallow reefs perfect for families and beginners.\n\nFor adrenaline seekers, jet skiing, wakeboarding, and kayaking provide thrilling experiences. Our professional guides combine adventure with education, teaching you about local marine ecosystems while ensuring your safety.\n\nAll equipment is regularly maintained and meets international safety standards. Whether you're a water sports enthusiast or trying something new, our activities department creates customized experiences matching your skill level and interests.",
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
        "Our romantic packages include beachfront dinners, couples' spa treatments, sunset cruises, and personalized service. Perfect for honeymoons, anniversaries, or special occasions, every detail is crafted to create magical moments.\n\nStart your celebration with champagne and rose petals in your private beachfront villa. Enjoy candlelit dinners on pristine beaches, couples' massage sessions under the stars, and sunrise breakfast overlooking the ocean.\n\nOur events team arranges surprise celebrations, renews vows ceremonies, and bespoke romantic experiences. Photography services capture your precious moments, creating lasting memories of your special time at Coco Mangos.\n\nWhether celebrating newlywed bliss, milestone anniversaries, or special engagements, Coco Mangos transforms your tropical paradise into an unforgettable romantic adventure. Every moment is personalized, every detail perfect.",
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
        "Coco Mangos implements comprehensive sustainability programs including ocean conservation, reef protection, and waste management. We believe luxury and environmental responsibility go hand in hand, creating a better future for our island home.\n\nOur initiatives include marine sanctuary protection, coastal clean-ups, waste reduction programs, and renewable energy investments. We support local conservation organizations and educate guests about environmental stewardship.\n\nAll our amenities use eco-friendly materials, our kitchens implement zero-waste practices, and our water systems emphasize conservation. We're committed to reducing our carbon footprint while maintaining the highest hospitality standards.\n\nBy choosing Coco Mangos, you're supporting sustainable tourism that protects Panglao's natural beauty for future generations. Together, we're proving that luxury and environmental consciousness create the most authentic, meaningful travel experiences.",
    },

    // Panglao Island Blogs (6)
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
        "Panglao Island is one of Bohol's premier destinations, offering pristine beaches, crystal-clear waters, and a perfect blend of relaxation and adventure. As home to Coco Mangos Place Resort, Panglao provides easy access to the island's best attractions and play-to-stay experiences.\n\nLocated just 30 minutes from Bohol's airport, Panglao offers convenient access combined with authentic island charm. The island balances modern tourism infrastructure with preserved natural beauty and local culture.\n\nVisitors discover world-class restaurants, water sports facilities, dive shops, and wellness centers. Yet Panglao maintains its authentic character through local markets, traditional communities, and cultural preservation efforts.\n\nWhether seeking adventure, relaxation, cultural immersion, or luxury getaways, Panglao delivers diverse experiences. Stay at Coco Mangos and use it as your base for exploring everything Panglao has to offer.",
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
        "Just a short distance from Coco Mangos, Alona Beach offers white sand, turquoise waters, and vibrant nightlife. Perfect for beach lovers, divers, and adventurers, Alona is the heart of Panglao's tourism with restaurants, bars, and water sports facilities.\n\nAlona Beach is renowned as one of Asia's top dive sites, attracting divers worldwide. The beach offers excellent visibility, diverse marine life, and multiple dive shops offering courses and guided dives.\n\nBeyond diving, Alona Beach provides snorkeling, paddleboarding, jetskiing, and beach hopping tours. The shoreline features restaurants serving fresh seafood and international cuisine, perfect for casual lunches or romantic dinners.\n\nAs sunset approaches, Alona Beach transforms into a social hub where travelers gather to watch the sun disappear over the Sulu Sea. Beach bars offer live music, cocktails, and the island's most vibrant atmosphere.",
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
        "Panglao is the perfect base for island hopping adventures. Visit the stunning Virgin Islands, explore hidden lagoons, and discover secluded beaches. Coco Mangos can arrange complete packages including tours, meals, and accommodations.\n\nThe Virgin Islands consist of several uninhabited islands accessible by boat from Panglao. These pristine locations feature untouched beaches, coral reefs perfect for snorkeling, and abundant marine life.\n\nTypical island hopping itineraries include stops at multiple islands, allowing swimming, snorkeling, and beach time. Local guides share knowledge about marine ecosystems, island ecology, and local legends.\n\nPicnic lunches feature freshly caught seafood prepared onboard, complementing the adventure experience. Evening returns to Panglao leave you with unforgettable memories of virgin island exploration.",
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
        "Panglao is recognized as one of Asia's top diving destinations. With multiple dive sites accessible from our resort, including Pamilacan Island and Balicasag Island, divers of all levels can experience incredible underwater adventures.\n\nBalicasag Island offers pristine walls with vibrant coral gardens, seahorses, and rare nudibranch species. Pamilacan Island provides opportunities to encounter sea turtles, rays, and schools of barracuda.\n\nCoral gardens at various depths showcase the region's incredible marine biodiversity. Night dives reveal nocturnal species rarely seen during daylight, while muck diving sites offer macro photography opportunities.\n\nDive operators at Coco Mangos are PADI-certified and provide courses from beginner to advanced levels. Equipment rental, boat operations, and professional guidance ensure safe, unforgettable diving experiences.",
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
        "Experience Panglao beyond the beaches. Visit local markets, participate in traditional crafts, support local artisans, and engage with communities. Coco Mangos offers curated play-to-stay packages connecting you with authentic Panglao culture.\n\nVisit morning markets where locals shop for fresh produce, dried fish, and traditional foods. Participate in cooking classes preparing dishes using market ingredients, learning culinary traditions directly from locals.\n\nSupport local artisans creating traditional crafts like weaving, carving, and pottery. Visit workshops, learn techniques, and purchase authentic souvenirs directly from creators.\n\nEngage with communities through volunteer opportunities, cultural exchanges, and educational programs. These authentic experiences create meaningful connections, supporting local economies while enriching your understanding of Panglao's living culture.",
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
        "Beyond the famous beaches, Panglao offers hidden viewpoints, secret coves, and secluded swimming spots. Our local guides at Coco Mangos know the best-kept secrets and can arrange personalized tours to these exclusive locations.\n\nDiscover hidden beaches accessible only by boat or adventurous trails, offering complete privacy and untouched natural beauty. Visit dramatic cliff viewpoints providing breathtaking sunset views overlooking the Sulu Sea.\n\nSecluded lagoons surrounded by mangrove forests provide peaceful retreats away from crowds. Explore limestone caves with freshwater pools, creating magical settings for adventure and discovery.\n\nOur guides combine adventure with environmental education, ensuring you explore responsibly while supporting conservation efforts. These hidden gems showcase Panglao's complete natural diversity beyond its famous attractions.",
    },

    // Why Travel Bohol Blogs (6)
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
        "Bohol offers an incredible mix of natural beauty, cultural experiences, and adventure activities. From the Chocolate Hills to pristine beaches, underwater wonders to warm hospitality, Bohol is truly a paradise that shouldn't be missed.\n\nBohol's appeal transcends typical beach vacations. Adventure enthusiasts find thrilling activities, nature lovers discover pristine ecosystems, cultural explorers connect with rich heritage, and relaxation seekers find peaceful retreats.\n\nThe island combines accessibility (conveniently located with good infrastructure) with authenticity (preserving local culture and traditions). World-class accommodations at resorts like Coco Mangos blend comfort with environmental responsibility.\n\nBohol transforms travel expectations, offering diverse experiences within compact geography. Whether seeking adventure or serenity, culture or cuisine, Bohol accommodates every travel passion.",
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
        "The Chocolate Hills are a must-see attraction featuring 1,268 cone-shaped hills that turn brown during dry season, resembling chocolate drops. A short trip from Panglao and Coco Mangos, this iconic landscape offers spectacular views and photo opportunities.\n\nFormed through geological processes over millions of years, the Chocolate Hills represent unique karst topography. The perfect symmetry and uniform distribution puzzle geologists, while their beauty captivates visitors.\n\nVisit from viewpoint platforms offering 360-degree panoramas across the entire hill formation. Early morning light or sunset colors create magical photography conditions. Local legends add mystical dimensions to the geological wonder.\n\nUNESCO recognition ensures preservation efforts protecting this natural treasure. Combining adventure (hiking between hills) with simple sightseeing, the Chocolate Hills accommodate visitors of all abilities.",
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
        "Bohol's marine sanctuaries are among the Philippines' finest. Balicasag Island, Pamilacan Island, and the Virgin Islands offer pristine coral reefs, diverse marine species, and unforgettable underwater experiences accessible from Coco Mangos.\n\nThese protected areas support thriving coral ecosystems, fish populations, and marine megafauna including sea turtles and manta rays. Conservation efforts ensure sustained protection while allowing responsible tourism.\n\nSnorkeling offers accessible exploration of reef ecosystems without specialized equipment. Diving provides deeper encounters with intricate coral gardens, pelagic species, and underwater geological formations.\n\nMarine sanctuaries serve important ecological functions, providing breeding grounds and nurseries for numerous fish species. Tourism supports conservation funding, creating economic incentives for environmental protection.",
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
        "Bohol's history spans centuries, reflected in colonial churches, traditional celebrations, and local craftsmanship. Visit historical sites, participate in festivals, and connect with communities that have preserved Bohol's unique cultural identity.\n\nBaclayan Church, constructed in 1827, stands as testament to Spanish colonial architecture and faith. Other historic churches feature intricate details, artistic works, and spiritual significance.\n\nAnnual festivals celebrate patron saints through processions, music, dance, and traditional foods. The Bohol Panublion showcases indigenous arts, crafts, and performances during cultural celebrations.\n\nLocal artisans continue traditional crafts including weaving, pottery, woodcarving, and indigenous instruments. Supporting these artisans sustains cultural traditions while providing economic livelihood for communities.",
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
        "Bohol is home to incredible wildlife including the world's smallest primate, the Philippine tarsier. Visit protected sanctuaries, explore rainforests, and observe endemic bird species. These experiences offer genuine connection with nature.\n\nPhilippine tarsiers, weighing only 120-160 grams, possess enormous eyes adapted for nocturnal hunting. These critically endangered primates exist nowhere else on Earth, making Bohol encounters extraordinary privileges.\n\nBohol harbors numerous endemic bird species found only on the island. Birdwatchers explore forests seeking species like Chocolate-like Rail and Blue-winged Koel, among many others.\n\nWildlife sanctuaries employ local guides passionate about conservation education. These experiences fund protection programs, ensuring survival of Bohol's unique biodiversity.",
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
        "Bohol can be visited year-round, but different seasons offer unique experiences. The dry season (November-May) is perfect for beach activities, while the rainy season offers fewer crowds and lush landscapes.\n\nDry season features ideal weather for water sports, diving, and island hopping. Temperatures range 25-32°C (77-90°F) with minimal rainfall. This period attracts peak tourism, necessitating early accommodations booking.\n\nRainy season (June-October) brings occasional showers, lush vegetation, and reduced crowds. Water remains clear for diving, while fewer tourists mean more peaceful experiences.\n\nPlanning depends on preferences: peak season for social travel, or shoulder seasons balancing weather and crowds. Coco Mangos accommodates visitors year-round, offering seasonal packages and activities matching each period's unique character.",
    },
  ]

  const blog = allBlogPosts.find((b) => b.id === Number.parseInt(blogId as string))

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <HeaderWrapper />
        <main className="flex-1 flex items-center justify-center section-padding">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
            <button onClick={() => router.push("/news-blog")} className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={20} />
              Back to Blog
            </button>
          </div>
        </main>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Image */}
        <section className="h-96 md:h-[500px] relative">
          <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </section>

        {/* Article Content */}
        <section className="section-padding">
          <div className="section-max-width max-w-3xl">
            {/* Back Button */}
            <button
              onClick={() => router.push("/news-blog")}
              className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </button>

            {/* Meta Information */}
            <div className="mb-8">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

            {/* Meta Details */}
            <div className="flex flex-wrap items-center gap-6 text-foreground/60 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>By {blog.author}</span>
              </div>
              <button className="flex items-center gap-2 hover:text-primary transition">
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              {blog.content.split("\n").map((paragraph, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Related Articles Link */}
            <div className="pt-8 border-t border-border">
              <a
                href="/news-blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Explore More Articles <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
