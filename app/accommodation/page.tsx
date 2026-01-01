import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import RoomCard from "@/components/room-card"
import Footer from "@/components/footer"

export default function AccommodationPage() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Ocean View",
      category: "Deluxe",
      price: 299,
      image: "/deluxe-ocean-view-room.jpg",
      description: "Spacious rooms with stunning ocean views",
      capacity: "2-3 guests",
      amenities: ["AC", "WiFi", "Ocean View", "Balcony", "Safe"],
    },
    {
      id: 2,
      name: "Premium Beach Suite",
      category: "Premium",
      price: 499,
      image: "/premium-beach-suite.jpg",
      description: "Luxurious suites with private terraces",
      capacity: "2-4 guests",
      amenities: ["AC", "WiFi", "Private Terrace", "Mini Bar", "Safe", "Spa Bath"],
    },
    {
      id: 3,
      name: "Beachfront Villa",
      category: "Villa",
      price: 799,
      image: "/beachfront-villa.jpg",
      description: "Ultimate luxury with direct beach access",
      capacity: "4-6 guests",
      amenities: ["AC", "WiFi", "Direct Beach", "Pool", "Chef Service", "Private Entrance"],
    },
    {
      id: 4,
      name: "Standard Room",
      category: "Standard",
      price: 199,
      image: "/standard-room.jpg",
      description: "Comfortable rooms with garden views",
      capacity: "2 guests",
      amenities: ["AC", "WiFi", "Garden View", "Shower", "Safe"],
    },
    {
      id: 5,
      name: "Tropical Suite",
      category: "Premium",
      price: 599,
      image: "/tropical-suite.jpg",
      description: "Exotic ambiance with tropical decor",
      capacity: "2-3 guests",
      amenities: ["AC", "WiFi", "Outdoor Shower", "Terrace", "Safe", "Hammock"],
    },
    {
      id: 6,
      name: "Family Bungalow",
      category: "Villa",
      price: 699,
      image: "/family-bungalow.jpg",
      description: "Spacious accommodations perfect for families",
      capacity: "4-5 guests",
      amenities: ["AC", "WiFi", "Kitchen", "Pool Access", "Game Room", "Patio"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">Our Accommodations</h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90">
              Choose from our range of luxurious rooms and suites tailored to your needs
            </p>
          </div>
        </section>

        <section className="section-padding border-b border-border">
          <div className="section-max-width">
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Filter by Category</h3>
              <div className="overflow-x-auto md:overflow-visible pb-2">
                <div className="flex gap-2 flex-nowrap md:flex-wrap min-w-max md:min-w-0">
                  {["All", "Standard", "Deluxe", "Premium", "Villa"].map((cat) => (
                    <button
                      key={cat}
                      className={`px-3 sm:px-4 py-2 rounded-full border transition whitespace-nowrap text-xs sm:text-sm md:text-base font-medium hover:scale-105 active:scale-95 ${
                        cat === "All"
                          ? "bg-primary text-primary-foreground border-primary shadow-lg"
                          : "border-border hover:border-primary bg-background/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding pb-32 md:pb-16">
          <div className="section-max-width">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Special Offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                { title: "Early Bird Discount", desc: "Book 30 days in advance for 20% off", badge: "20%" },
                { title: "Extended Stay", desc: "5+ nights get 15% discount on accommodation", badge: "15%" },
                {
                  title: "Group Booking",
                  desc: "Book 5+ rooms and enjoy exclusive group rates",
                  badge: "25%",
                },
              ].map((offer, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition hover:scale-105 text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-secondary mb-4">{offer.badge}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-foreground/70 text-sm sm:text-base">{offer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
