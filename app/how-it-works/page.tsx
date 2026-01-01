"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { CheckCircle2, MapPin, Bed, Calendar, CreditCard } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-secondary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">How It Works</h1>
            <p className="text-lg md:text-xl opacity-90">Book your tropical escape in just a few simple steps</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid md:grid-cols-5 gap-6 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">Choose Your Dates</h3>
                <p className="text-foreground/70 text-sm">Select your arrival and departure dates</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-1/2 top-8 w-full h-1 bg-primary/30 -translate-x-1/2 -z-10 md:block hidden"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                  <Bed className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">Select Room</h3>
                <p className="text-foreground/70 text-sm">Browse and choose your perfect room</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-1/2 top-8 w-full h-1 bg-primary/30 -translate-x-1/2 -z-10 md:block hidden"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">Add Details</h3>
                <p className="text-foreground/70 text-sm">Tell us about yourself and preferences</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-1/2 top-8 w-full h-1 bg-primary/30 -translate-x-1/2 -z-10 md:block hidden"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">Make Payment</h3>
                <p className="text-foreground/70 text-sm">Secure payment processing</p>
              </div>

              <div className="flex flex-col items-center text-center relative">
                <div className="absolute left-1/2 top-8 w-full h-1 bg-primary/30 -translate-x-1/2 -z-10 md:block hidden"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">Confirm & Enjoy</h3>
                <p className="text-foreground/70 text-sm">Confirmation sent to your email</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-12 mt-16">
              <h2 className="text-3xl font-bold mb-8">What to Expect</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">24/7 Support</h3>
                      <p className="text-foreground/70">Our team is available round the clock to assist you</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Flexible Cancellation</h3>
                      <p className="text-foreground/70">Cancel up to 7 days before arrival for full refund</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Best Rate Guarantee</h3>
                      <p className="text-foreground/70">Find a lower price? We'll match it</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Instant Confirmation</h3>
                      <p className="text-foreground/70">Get your booking confirmation immediately</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Personalized Service</h3>
                      <p className="text-foreground/70">Special requests handled with care</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Loyalty Rewards</h3>
                      <p className="text-foreground/70">Earn points with every booking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
