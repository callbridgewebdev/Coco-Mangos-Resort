"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-secondary-foreground">
          <div className="section-max-width">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-lg md:text-xl opacity-90">Last updated: December 31, 2025</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width max-w-3xl prose prose-invert">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Cookies are small pieces of data stored on your browser or device. They help us remember your
                  preferences, understand how you use our site, and improve your experience. Most websites use cookies
                  for similar reasons.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
                <p className="text-foreground/80 leading-relaxed mb-3">
                  Coco Mangos Resort uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic website functionality
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> Remember your choices and settings
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver targeted advertisements
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary">Session Cookies</h3>
                    <p className="text-foreground/80">
                      These cookies expire when you close your browser and are used to maintain your session while
                      browsing our website.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">Persistent Cookies</h3>
                    <p className="text-foreground/80">
                      These cookies remain on your device for a specified period and help us remember your preferences
                      on future visits.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-accent">Third-Party Cookies</h3>
                    <p className="text-foreground/80">
                      Set by partners and service providers to track analytics, advertising, and social media
                      integration.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Most web browsers allow you to control cookies through your browser settings. You can set your browser
                  to refuse cookies or alert you when cookies are being sent. However, blocking certain cookies may
                  affect your browsing experience on our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-foreground/80 leading-relaxed">
                  If you have questions about our Cookie Policy, please contact us at:
                </p>
                <ul className="list-none space-y-2 text-foreground/80 mt-3">
                  <li>Email: boholcocomangos@gmail.com</li>
                  <li>Email: info@boholcocomangos.com</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
