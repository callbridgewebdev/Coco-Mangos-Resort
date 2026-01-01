"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import Footer from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-lg md:text-xl opacity-90">Last updated: December 31, 2025</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width max-w-3xl">
            <div className="space-y-8">
              {[
                {
                  num: 1,
                  title: "Agreement to Terms",
                  content:
                    "By accessing and using the Coco Mangos Resort website, mobile app, and services, you accept and agree to be bound by these terms. If you do not agree, please discontinue use immediately.",
                },
                {
                  num: 2,
                  title: "Use License",
                  content:
                    "Permission is granted to temporarily download one copy of materials on our website for personal, non-commercial viewing only. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works, transfer, or sell information obtained from our site.",
                },
                {
                  num: 3,
                  title: "Booking Policies",
                  content:
                    "All bookings are subject to our Booking and Cancellation Policies. By making a reservation, you agree to abide by these policies. Reservations must be guaranteed by valid payment at booking.",
                },
                {
                  num: 4,
                  title: "Cancellation Terms",
                  content:
                    "Cancellations 30+ days before arrival: full refund. 15-29 days: 50% charge. 7-14 days: 75% charge. Within 7 days: 100% charge. No-show results in full charge.",
                },
                {
                  num: 5,
                  title: "Payment Terms",
                  content:
                    "Payment must be received in full before check-in unless other arrangements have been made. We accept credit cards, bank transfers, and mobile payment methods. A 3% processing fee applies to some payment methods.",
                },
                {
                  num: 6,
                  title: "Limitation of Liability",
                  content:
                    "The materials on our website are provided 'as is'. Coco Mangos Resort makes no warranties, expressed or implied, and disclaims all warranties including merchantability, fitness for particular purpose, and non-infringement of rights.",
                },
                {
                  num: 7,
                  title: "Accuracy of Materials",
                  content:
                    "Materials on our website could include technical, typographical, or photographic errors. We do not warrant that any materials are accurate, complete, or current. We reserve the right to correct errors.",
                },
                {
                  num: 8,
                  title: "Disclaimer of Warranties",
                  content:
                    "The resort and all content are provided 'as is' without warranty of any kind. We disclaim warranties for availability, uninterrupted service, accuracy, completeness, and absence of errors.",
                },
                {
                  num: 9,
                  title: "Indemnification",
                  content:
                    "You agree to indemnify and hold harmless Coco Mangos Resort from any claims, damages, losses, or expenses arising from your use of the service or violation of these terms.",
                },
                {
                  num: 10,
                  title: "User Conduct",
                  content:
                    "You agree not to use our services for illegal purposes, harassment, threats, obscene content, or anything violating these terms. We reserve the right to terminate access for violations.",
                },
                {
                  num: 11,
                  title: "Intellectual Property Rights",
                  content:
                    "All content, logos, images, and materials are owned or licensed by Coco Mangos Resort and protected by international copyright laws. Unauthorized use is prohibited.",
                },
                {
                  num: 12,
                  title: "Links to Third Parties",
                  content:
                    "Our website may contain links to third-party websites. We are not responsible for their content, accuracy, or practices. Your use of third-party sites is at your own risk.",
                },
                {
                  num: 13,
                  title: "Reservations & Availability",
                  content:
                    "Availability and pricing shown on our website is subject to change without notice. We reserve the right to refuse or cancel reservations. Rates may vary based on season, demand, and promotions.",
                },
                {
                  num: 14,
                  title: "Group Bookings",
                  content:
                    "Group reservations (5+ rooms) require 50% deposit and 30-day notice for cancellation. Groups are subject to additional terms and may require signed agreements.",
                },
                {
                  num: 15,
                  title: "Special Requests",
                  content:
                    "Special requests (early check-in, late check-out, crib, high floor) are subject to availability and may incur additional charges. We cannot guarantee special requests will be honored.",
                },
                {
                  num: 16,
                  title: "Guest Responsibilities",
                  content:
                    "Guests are responsible for damage to rooms/amenities beyond normal wear and tear. Excessive damage charges may be applied. Lost key cards incur ₱500 replacement fee.",
                },
                {
                  num: 17,
                  title: "Check-in & Check-out",
                  content:
                    "Standard check-in is 2:00 PM and check-out is 11:00 AM. Early check-in (12:00 PM) and late check-out (6:00 PM) available for ₱500 each, subject to availability.",
                },
                {
                  num: 18,
                  title: "Prohibited Activities",
                  content:
                    "Guests may not engage in illegal activities, gambling, drug use, weapons possession, or disruptive behavior. Violation may result in immediate termination of stay without refund.",
                },
                {
                  num: 19,
                  title: "Noise Policies",
                  content:
                    "Guests must maintain reasonable quiet hours (10:00 PM - 8:00 AM). Excessive noise will result in warnings and potential ejection from the property.",
                },
                {
                  num: 20,
                  title: "Security & Valuables",
                  content:
                    "We provide in-room safes for valuables. We are not responsible for lost, stolen, or damaged items. Use provided safes for important documents and valuables.",
                },
                {
                  num: 21,
                  title: "Liability Release",
                  content:
                    "By using our facilities and participating in activities, you acknowledge risks and assume all liability. We are not responsible for injuries, accidents, or illnesses.",
                },
                {
                  num: 22,
                  title: "Force Majeure",
                  content:
                    "We are not liable for services disrupted by natural disasters, acts of God, wars, pandemics, or events beyond our control. Payments may be refunded or rebooked.",
                },
                {
                  num: 23,
                  title: "Dispute Resolution",
                  content:
                    "Any disputes shall be governed by Philippine law. Both parties agree to attempt resolution through negotiation before pursuing legal action.",
                },
                {
                  num: 24,
                  title: "Limitation on Legal Actions",
                  content:
                    "Any legal action must be filed within one year of the incident. We limit liability to the amount paid for your reservation.",
                },
                {
                  num: 25,
                  title: "Modifications to Terms",
                  content:
                    "We may modify these terms at any time. Continued use of our service after changes indicates acceptance of updated terms.",
                },
                {
                  num: 26,
                  title: "Entire Agreement",
                  content:
                    "These terms, along with our Privacy Policy and Booking Policies, constitute the entire agreement between you and Coco Mangos Resort.",
                },
                {
                  num: 27,
                  title: "Severability",
                  content:
                    "If any provision is found invalid, remaining provisions remain in effect. We will replace invalid provisions with enforceable ones.",
                },
                {
                  num: 28,
                  title: "Contact for Legal Notices",
                  content:
                    "Legal notices should be sent to: Coco Mangos Place Resort, Panglao, Bohol, Philippines or email: boholcocomangos@gmail.com",
                },
                {
                  num: 29,
                  title: "Governing Law",
                  content:
                    "These terms are governed by and construed in accordance with the laws of the Republic of the Philippines without regard to conflict of law principles.",
                },
                {
                  num: 30,
                  title: "Feedback & Suggestions",
                  content:
                    "Any feedback, suggestions, or ideas you provide about our resort become our property. We may use them for any purpose without compensation or acknowledgment.",
                },
              ].map((section) => (
                <div key={section.num}>
                  <h2 className="text-2xl font-bold mb-3">
                    {section.num}. {section.title}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed">{section.content}</p>
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
