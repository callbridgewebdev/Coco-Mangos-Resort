"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { CheckCircle2, Users, Utensils, Wifi, Waves, Music } from "lucide-react"

export default function RoomsPage() {
  const roomTypes = [
    {
      id: 1,
      name: "Deluxe Room",
      capacity: "2 guests",
      price: "₱2,500/night",
      image: "/gallery-room-1.jpg",
      features: ["Ocean view balcony", "King size bed", "Modern bathroom", "Air conditioning", "LCD TV", "Minibar"],
    },
    {
      id: 2,
      name: "Family Suite",
      capacity: "4-5 guests",
      price: "₱4,500/night",
      image: "/gallery-room-2.jpg",
      features: [
        "Multiple bedrooms",
        "Living area",
        "Two bathrooms",
        "Kitchenette",
        "Balcony with view",
        "Premium amenities",
      ],
    },
    {
      id: 3,
      name: "Beach Bungalow",
      capacity: "2 guests",
      price: "₱3,500/night",
      image: "/gallery-room-3.jpg",
      features: [
        "Direct beach access",
        "Romantic setting",
        "Private garden",
        "Outdoor shower",
        "Traditional design",
        "Beachfront location",
      ],
    },
  ]

  const whatsIncluded = [
    {
      icon: Utensils,
      title: "Daily Breakfast",
      description: "Complimentary full breakfast buffet with local and international cuisines.",
    },
    {
      icon: Wifi,
      title: "High-Speed WiFi",
      description: "Unlimited internet access throughout the resort for seamless connectivity.",
    },
    {
      icon: Waves,
      title: "Beach Access",
      description: "Unlimited access to our private beach with lounge chairs and umbrellas.",
    },
    {
      icon: Music,
      title: "Entertainment",
      description: "Nightly entertainment shows and live music performances at the resort.",
    },
    {
      icon: Users,
      title: "Concierge Service",
      description: "Professional concierge team to assist with tours and activities.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-secondary to-accent text-secondary-foreground py-8 md:py-16">
          <div className="section-max-width text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">Our Rooms & Functions</h1>
            <p className="text-base md:text-xl opacity-90">
              Discover luxurious accommodations and world-class event spaces
            </p>
          </div>
        </section>

        {/* Room Types */}
        <section className="section-padding py-8 md:py-16">
          <div className="section-max-width px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Room Types</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {roomTypes.map((room) => (
                <div
                  key={room.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-foreground/60">{room.capacity}</span>
                      <span className="text-lg font-bold text-primary">{room.price}</span>
                    </div>
                    <ul className="space-y-2">
                      {room.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-foreground/70 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 btn-primary">Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="section-padding py-8 md:py-16 bg-muted/30">
          <div className="section-max-width px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What's Included</h2>

            {/* Two Column Layout: Image on Right, Content on Left */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Content on Left */}
              <div className="space-y-6">
                {whatsIncluded.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Image on Right */}
              <div className="h-96 md:h-full rounded-xl overflow-hidden shadow-lg">
                <img src="/gallery-room-1.jpg" alt="Resort Room" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Function Spaces */}
        <section className="section-padding py-8 md:py-16">
          <div className="section-max-width px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Function Spaces</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Beach Pavilion</h3>
                <p className="text-foreground/70 mb-4">
                  Perfect for intimate gatherings and ceremonies with ocean backdrop.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70 mb-6">
                  <li>✓ Capacity: 50-150 guests</li>
                  <li>✓ Sound system included</li>
                  <li>✓ Catering available</li>
                </ul>
                <button className="btn-primary w-full">Book Event Space</button>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Ballroom</h3>
                <p className="text-foreground/70 mb-4">
                  Indoor event space ideal for conferences and large celebrations.
                </p>
                <ul className="space-y-2 text-sm text-foreground/70 mb-6">
                  <li>✓ Capacity: 100-300 guests</li>
                  <li>✓ AV equipment included</li>
                  <li>✓ Full catering service</li>
                </ul>
                <button className="btn-primary w-full">Book Event Space</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
