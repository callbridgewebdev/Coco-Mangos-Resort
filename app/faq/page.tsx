"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "How far in advance should I book?",
      a: "We recommend booking at least 2-4 weeks in advance, especially during peak season (November-April). Last-minute bookings are accepted subject to availability.",
    },
    {
      q: "What's your cancellation policy?",
      a: "Cancellations made 30 days before arrival receive full refund. Cancellations within 30 days are subject to 50% charge. Cancellations within 7 days incur full charge.",
    },
    {
      q: "Do you offer group discounts?",
      a: "Yes! Groups of 5 or more rooms qualify for 10-15% discount. Contact our group coordinator at boholcocomangos@gmail.com for details and customized packages.",
    },
    {
      q: "What facilities are available?",
      a: "We offer beach access, infinity pool, spa, fitness center, multiple restaurants, water sports, tour desk, business center, and complimentary WiFi throughout.",
    },
    {
      q: "Is parking available?",
      a: "Yes, complimentary parking for all guests. We also offer valet parking for ₱200/day and secure underground parking for ₱150/day.",
    },
    {
      q: "Do all rooms have WiFi?",
      a: "Yes, all rooms include high-speed WiFi (100+ Mbps). WiFi is also available throughout the resort including beaches and outdoor areas.",
    },
    {
      q: "Are meals included?",
      a: "Meals are not included in standard room rates. We offer meal plans starting at ₱1,500/day with breakfast, lunch, and dinner options.",
    },
    {
      q: "Do you accommodate dietary restrictions?",
      a: "Our chefs prepare meals for vegetarian, vegan, gluten-free, halal, kosher, and any allergy-related dietary requirements.",
    },
    {
      q: "Are vegetarian options available?",
      a: "Yes, we offer extensive vegetarian and vegan menus at all restaurants featuring local and international cuisine.",
    },
    {
      q: "What tours are included?",
      a: "No tours are included with standard bookings, but we offer 20-30% discounts for guests. Popular tours include island hopping, jungle trekking, and snorkeling.",
    },
    {
      q: "Are activities suitable for children?",
      a: "Yes! We offer family-friendly activities including beach games, pool activities, kids' club (ages 3-12), and age-appropriate tours.",
    },
    {
      q: "Can I book tours in advance?",
      a: "Yes, we recommend booking popular tours 2-3 days before. Many tours sell out during peak season, so early booking ensures availability.",
    },
    {
      q: "What's the best time to visit?",
      a: "Dry season (November-April) offers pleasant weather. Wet season (May-October) has fewer tourists and lower rates. We're beautiful year-round!",
    },
    {
      q: "Is airport transportation available?",
      a: "Yes! Airport pickups from Tagbilaran Airport cost ₱800 (shared van) or ₱1,500 (private car). Book when making your reservation.",
    },
    {
      q: "Do you recommend travel insurance?",
      a: "We recommend comprehensive travel insurance covering trip cancellation, medical emergencies, and evacuation. We can provide partner recommendations.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit cards (Visa, Mastercard, American Express), bank transfers, GCash, PayMaya, and cash payment. 3% surcharge for some payment methods.",
    },
    {
      q: "Is the resort suitable for honeymoons?",
      a: "We offer honeymoon packages including romantic dinner setups, couples spa, champagne, and special room decorations.",
    },
    {
      q: "Do you have wedding facilities?",
      a: "Yes! Our Function Room accommodates up to 100 guests for weddings, receptions, and events. We offer full catering and decoration services.",
    },
    {
      q: "What's your check-in/check-out time?",
      a: "Standard check-in is 2:00 PM and check-out is 11:00 AM. Early check-in (from 12:00 PM) and late check-out (until 6:00 PM) available for ₱500.",
    },
    {
      q: "Are pets allowed?",
      a: "Yes, pets are allowed in designated rooms only. There's a ₱500/day pet fee. We provide pet bed, bowls, and treats.",
    },
    {
      q: "Do you have accessibility features?",
      a: "Yes, we have wheelchair-accessible rooms, elevators, ramps, accessible bathrooms, and trained staff to assist guests with disabilities.",
    },
    {
      q: "Is there a business center?",
      a: "Yes, fully-equipped business center with computers, printers, high-speed internet, meeting rooms, and secretarial services available 24/7.",
    },
    {
      q: "Can I use my mobile phone here?",
      a: "Yes, mobile networks (Globe, Smart, Sun) have good coverage. We recommend getting a local SIM for better rates.",
    },
    {
      q: "What should I pack?",
      a: "Pack light clothing, swimwear, sunscreen, hat, and sandals for the beach. Bring a light jacket for air-conditioned areas and evenings.",
    },
    {
      q: "Is the water safe to drink?",
      a: "Yes, all water is filtered and purified. We provide complimentary bottled water in rooms. Tap water is safe but we recommend using filtered water.",
    },
    {
      q: "How do I get around the island?",
      a: "We arrange car rentals (₱1,500-2,500/day), van rentals, motorcycle rentals, or can book tricycle services for island exploration.",
    },
    {
      q: "What's the local currency?",
      a: "Philippine Peso (₱). USD is accepted at tourist establishments. ATMs are available nearby. Exchange rates: 1 USD ≈ ₱55-60.",
    },
    {
      q: "Is COVID vaccination required?",
      a: "No specific vaccine requirement. We maintain enhanced hygiene protocols. Masks available upon request and recommended for high-risk individuals.",
    },
    {
      q: "What languages do staff speak?",
      a: "Our staff speaks English, Tagalog, Bisaya, and some Spanish/German. Translation services available for other languages.",
    },
    {
      q: "How can I contact you for more questions?",
      a: "Call us at +63-38-XXXXXX, email boholcocomangos@gmail.com or info@boholcocomangos.com, or use our contact form. We respond within 24 hours.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-accent to-primary text-accent-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-lg md:text-xl opacity-90">Find answers to common questions about Coco Mangos Resort</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted/50 transition"
                  >
                    <h3 className="text-lg font-semibold text-left">{faq.q}</h3>
                    <ChevronDown
                      size={24}
                      className={`text-primary transition-transform flex-shrink-0 ml-4 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="p-6 bg-muted/30 border-t border-border">
                      <p className="text-foreground/80 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Didn't find your answer?</h2>
            <p className="text-lg opacity-90 mb-8">Contact our support team - we're here to help!</p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-primary-foreground text-primary rounded-lg font-bold hover:opacity-90 transition"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
