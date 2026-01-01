"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { CheckCircle2, Lightbulb, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-secondary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Coco Mangos Resort</h1>
            <p className="text-lg md:text-xl opacity-90">Your Gateway to Tropical Paradise</p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <h2 className="text-4xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To provide world-class hospitality and unforgettable tropical experiences that exceed our guests'
                  expectations. We are committed to creating meaningful memories while maintaining the highest standards
                  of comfort, luxury, and personalized service.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mt-4">
                  Every detail of your stay is carefully curated to ensure you experience the true essence of paradise.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-80 flex items-center justify-center overflow-hidden">
                <img
                  src="/pristine-tropical-beach-with-palm-trees-sunset.jpg"
                  alt="Tropical Beach"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Vision Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl h-80 flex items-center justify-center overflow-hidden order-2 md:order-1">
                <img src="/luxury-resort-.jpg" alt="Luxury Resort" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-8 h-8 text-secondary" />
                  <h2 className="text-4xl font-bold">Our Vision</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  To be recognized as the premier destination for luxury tropical hospitality in the region, setting the
                  standard for excellence, sustainability, and authentic guest experiences.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mt-4">
                  We envision a resort where nature, luxury, and genuine hospitality converge to create transformative
                  experiences that guests cherish for a lifetime.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-12">
              <div className="flex items-center gap-3 mb-8">
                <Heart className="w-8 h-8 text-accent" />
                <h2 className="text-4xl font-bold">Our Core Values</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Excellence</h3>
                  <p className="text-foreground/80">
                    We pursue excellence in every aspect of our operations, from guest service to facility maintenance.
                    Quality is never compromised.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Sustainability</h3>
                  <p className="text-foreground/80">
                    We are committed to protecting our pristine environment through responsible practices and continuous
                    improvement.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-accent">Authenticity</h3>
                  <p className="text-foreground/80">
                    We celebrate local culture and traditions, offering genuine experiences that connect guests with the
                    true spirit of the islands.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Hospitality</h3>
                  <p className="text-foreground/80">
                    Our warmth and genuine care for our guests define everything we do. Your satisfaction is our
                    ultimate measure of success.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Innovation</h3>
                  <p className="text-foreground/80">
                    We continuously evolve to meet changing guest expectations while maintaining the timeless charm of
                    our tropical sanctuary.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-accent">Community</h3>
                  <p className="text-foreground/80">
                    We support local communities and foster meaningful connections with our team and the destinations we
                    call home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Experience the Difference</h2>
            <p className="text-lg mb-8 opacity-90">
              Discover why guests choose Coco Mangos Resort for their tropical escape
            </p>
            <a
              href="/accommodation"
              className="px-8 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-all inline-block"
            >
              Book Your Stay
            </a>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
