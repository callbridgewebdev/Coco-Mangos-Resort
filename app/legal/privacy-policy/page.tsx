"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import Footer from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl opacity-90">Last updated: December 31, 2025</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width max-w-3xl">
            <div className="space-y-8">
              {[
                {
                  num: 1,
                  title: "Introduction & Scope",
                  content:
                    "Coco Mangos Resort ('we,' 'us,' 'our,' or 'Company') operates the website and mobile application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We are committed to protecting your privacy and ensuring you have a positive experience on our platform.",
                },
                {
                  num: 2,
                  title: "Information We Collect",
                  content:
                    "We collect information you provide directly, including name, email address, phone number, postal address, payment information, booking preferences, dietary restrictions, and special requests.",
                },
                {
                  num: 3,
                  title: "Automatically Collected Information",
                  content:
                    "When you visit our site, we automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, time and date of visit, and referring URL.",
                },
                {
                  num: 4,
                  title: "Cookies & Tracking Technologies",
                  content:
                    "We use cookies, web beacons, and similar tracking technologies to remember your preferences, understand your usage patterns, and improve your user experience. You can control cookie settings through your browser.",
                },
                {
                  num: 5,
                  title: "Booking Information Collection",
                  content:
                    "When making a reservation, we collect guest names, contact information, room preferences, booking history, special requests, loyalty program membership details, and payment methods to process your booking.",
                },
                {
                  num: 6,
                  title: "Communication Data",
                  content:
                    "If you contact us via email, phone, or chat, we collect the content of your communications, your contact information, and the date and time of communication for customer service purposes.",
                },
                {
                  num: 7,
                  title: "Payment Information",
                  content:
                    "Payment processing is handled by secure third-party payment providers. We do not store complete credit card numbers. We retain transaction records for accounting and dispute resolution.",
                },
                {
                  num: 8,
                  title: "Use of Your Information - Service Provision",
                  content:
                    "We use your information to provide, maintain, and improve our services, process your bookings, send confirmation emails, and deliver customer support.",
                },
                {
                  num: 9,
                  title: "Use of Your Information - Marketing",
                  content:
                    "With your consent, we use your email and phone number to send promotional materials, newsletters, special offers, and updates about new services. You can opt-out anytime.",
                },
                {
                  num: 10,
                  title: "Use of Your Information - Analytics",
                  content:
                    "We analyze aggregated usage data to understand user behavior, improve our website functionality, develop new features, and optimize marketing strategies.",
                },
                {
                  num: 11,
                  title: "Use of Your Information - Legal Compliance",
                  content:
                    "We may use your information to comply with legal obligations, enforce our terms of service, protect against fraud, and respond to legal requests from authorities.",
                },
                {
                  num: 12,
                  title: "Information Sharing - Service Providers",
                  content:
                    "We share information with third-party service providers who assist with payment processing, email delivery, hosting, analytics, and customer support. These providers are contractually bound to protect your data.",
                },
                {
                  num: 13,
                  title: "Information Sharing - Business Partners",
                  content:
                    "We may share information with airline and tour operators to facilitate integrated booking experiences. Your data will be governed by their privacy policies.",
                },
                {
                  num: 14,
                  title: "Information Sharing - Legal Requirements",
                  content:
                    "We may disclose information if required by law, court order, or government request, or to protect our rights, privacy, safety, or property.",
                },
                {
                  num: 15,
                  title: "Data Security Measures",
                  content:
                    "We implement industry-standard security measures including SSL encryption, secure servers, firewalls, and regular security audits to protect your data. However, no method is 100% secure.",
                },
                {
                  num: 16,
                  title: "Data Retention Policy",
                  content:
                    "We retain personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Booking information is retained for 7 years for tax purposes.",
                },
                {
                  num: 17,
                  title: "Your Rights & Choices",
                  content:
                    "You have the right to access, correct, or delete your personal information. You can also object to processing, request portability of data, and withdraw consent for marketing communications.",
                },
                {
                  num: 18,
                  title: "GDPR Compliance",
                  content:
                    "If you are in the EU, your data is protected under GDPR. You have additional rights including data portability, right to be forgotten, and right to lodge complaints with supervisory authorities.",
                },
                {
                  num: 19,
                  title: "CCPA Compliance",
                  content:
                    "If you are a California resident, CCPA provides you rights to know what data is collected, delete personal information, opt-out of sale, and non-discrimination for exercising these rights.",
                },
                {
                  num: 20,
                  title: "Children's Privacy",
                  content:
                    "Our services are not directed to children under 13. We do not knowingly collect information from children. If we become aware of such collection, we will delete the information promptly.",
                },
                {
                  num: 21,
                  title: "Third-Party Links",
                  content:
                    "Our website contains links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing information.",
                },
                {
                  num: 22,
                  title: "International Data Transfers",
                  content:
                    "Your information may be transferred to and processed in countries other than your country of residence, which may have different data protection laws. By using our service, you consent to such transfers.",
                },
                {
                  num: 23,
                  title: "Updates to Privacy Policy",
                  content:
                    "We may update this Privacy Policy periodically. We will notify you of material changes by email or by posting notice on our website. Your continued use indicates acceptance of the updated policy.",
                },
                {
                  num: 24,
                  title: "Opt-Out Preferences",
                  content:
                    "You can opt-out of marketing communications by clicking 'Unsubscribe' in our emails or contacting us directly. You can also update your communication preferences in your account settings.",
                },
                {
                  num: 25,
                  title: "Data Breach Notification",
                  content:
                    "In case of a data breach, we will notify affected individuals within 72 hours and provide information about the breach, data affected, and steps we're taking to secure it.",
                },
                {
                  num: 26,
                  title: "Contact Us",
                  content:
                    "If you have questions about this Privacy Policy, contact us at: Email: boholcocomangos@gmail.com or info@boholcocomangos.com",
                },
                {
                  num: 27,
                  title: "Data Protection Officer",
                  content:
                    "For inquiries related to data protection and privacy compliance, you can contact our Data Protection Officer through our contact form.",
                },
                {
                  num: 28,
                  title: "Right to Lodge Complaints",
                  content:
                    "If you believe we have violated your privacy rights, you have the right to lodge a complaint with your local data protection authority or supervisory authority.",
                },
                {
                  num: 29,
                  title: "Social Media Privacy",
                  content:
                    "We do not control the privacy practices of third-party social media platforms. We encourage you to review their policies before sharing information or interacting with our social media accounts.",
                },
                {
                  num: 30,
                  title: "Accessibility of Privacy Policy",
                  content:
                    "This Privacy Policy is available in multiple languages and formats. We remain committed to making our privacy practices transparent and accessible to all users.",
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
