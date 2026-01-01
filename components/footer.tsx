"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Youtube, Mail, Linkedin } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 2000)
    }
  }

  const socialIconClass =
    "w-8 h-8 p-2 rounded-lg bg-background/10 hover:bg-primary/20 text-foreground/80 hover:text-primary transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-lg"

  return (
    <footer className="bg-foreground text-background dark:bg-card dark:text-foreground py-12 mt-16">
      <div className="section-max-width section-padding">
        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 mb-8">
          {/* Logo & Branding Column */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src="/coco-mangos-logo.png" alt="Coco Mangos Place Resort Logo" className="w-16 h-16" />
              <div>
                <h4 className="font-bold text-lg">Coco Mangos</h4>
                <p className="text-background/80 dark:text-foreground/70 text-sm">Place Resort</p>
              </div>
            </div>
            <p className="text-background/80 dark:text-foreground/70 text-sm">
              Your tropical paradise awaits. Experience luxury, adventure, and authentic island hospitality.
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-background/80 dark:text-foreground/70 text-sm">
              <li>
                <Link href="/" className="hover:text-background dark:hover:text-foreground transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background dark:hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-background dark:hover:text-foreground transition">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className="hover:text-background dark:hover:text-foreground transition">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-background dark:hover:text-foreground transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-background dark:hover:text-foreground transition">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-background/80 dark:text-foreground/70 text-sm">
              <li>
                <Link href="/faq" className="hover:text-background dark:hover:text-foreground transition">
                  F.A.Q
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-background dark:hover:text-foreground transition">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/news-blog" className="hover:text-background dark:hover:text-foreground transition">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background dark:hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us & Newsletter */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              <a href="https://facebook.com" className={socialIconClass} title="Follow us on Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://x.com" className={socialIconClass} title="Follow us on X">
                <svg size={20} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.693-5.829 6.693h-3.307l7.713-8.835L2.25 2.25h6.514l4.882 6.479 5.288-6.479zM17.364 20.455h1.828L6.817 3.96H4.854l12.51 16.495z" />
                </svg>
              </a>
              <a href="https://youtube.com" className={socialIconClass} title="Subscribe to our YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com" className={socialIconClass} title="Connect on LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="mailto:boholcocomangos@gmail.com" className={socialIconClass} title="Email us">
                <Mail size={20} />
              </a>
            </div>

            <div>
              <h5 className="font-semibold mb-2 text-sm">Subscribe to Newsletter</h5>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-3 py-2 rounded text-foreground text-sm bg-background/20"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-background/30 text-background dark:text-foreground rounded hover:bg-background/50 transition text-sm font-medium"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Two-Column Layout */}
        <div className="md:hidden grid grid-cols-2 gap-6 mb-8">
          {/* Logo & Branding */}
          <div className="col-span-2 flex flex-col mb-4">
            <div className="flex items-center gap-3 mb-4">
              <img src="/coco-mangos-logo.png" alt="Coco Mangos Place Resort Logo" className="w-16 h-16" />
              <div>
                <h4 className="font-bold text-lg">Coco Mangos</h4>
                <p className="text-background/80 dark:text-foreground/70 text-sm">Place Resort</p>
              </div>
            </div>
            <p className="text-background/80 dark:text-foreground/70 text-sm">Your tropical paradise awaits.</p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-bold mb-3 text-sm">Explore</h4>
            <ul className="space-y-1 text-background/80 dark:text-foreground/70 text-xs">
              <li>
                <Link href="/" className="hover:text-background dark:hover:text-foreground transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-background dark:hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="hover:text-background dark:hover:text-foreground transition">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className="hover:text-background dark:hover:text-foreground transition">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-background dark:hover:text-foreground transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-background dark:hover:text-foreground transition">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold mb-3 text-sm">Support</h4>
            <ul className="space-y-1 text-background/80 dark:text-foreground/70 text-xs">
              <li>
                <Link href="/faq" className="hover:text-background dark:hover:text-foreground transition">
                  F.A.Q
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-background dark:hover:text-foreground transition">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/news-blog" className="hover:text-background dark:hover:text-foreground transition">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background dark:hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links & Newsletter */}
          <div className="col-span-2">
            <h4 className="font-bold mb-3 text-sm">Follow Us</h4>
            <div className="flex gap-2 mb-4">
              <a href="https://facebook.com" className={socialIconClass} title="Follow us on Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://x.com" className={socialIconClass} title="Follow us on X">
                <svg size={16} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.693-5.829 6.693h-3.307l7.713-8.835L2.25 2.25h6.514l4.882 6.479 5.288-6.479zM17.364 20.455h1.828L6.817 3.96H4.854l12.51 16.495z" />
                </svg>
              </a>
              <a href="https://youtube.com" className={socialIconClass} title="Subscribe to our YouTube">
                <Youtube size={16} />
              </a>
              <a href="https://linkedin.com" className={socialIconClass} title="Connect on LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="mailto:boholcocomangos@gmail.com" className={socialIconClass} title="Email us">
                <Mail size={16} />
              </a>
            </div>

            <div>
              <h5 className="font-semibold mb-2 text-xs">Subscribe to Newsletter</h5>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-3 py-2 rounded text-foreground text-xs bg-background/20"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-background/30 text-background dark:text-foreground rounded hover:bg-background/50 transition text-xs font-medium"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-background/20 dark:border-foreground/20 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Legal Links on Left */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-background/80 dark:text-foreground/70 text-sm flex flex-col gap-2">
                <li>
                  <Link
                    href="/legal/cookie-policy"
                    className="hover:text-background dark:hover:text-foreground transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="hover:text-background dark:hover:text-foreground transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms-of-service"
                    className="hover:text-background dark:hover:text-foreground transition"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Supported Payment Methods on Right Side */}
            <div className="text-right">
              <h4 className="font-bold mb-4">Supported Payment Methods</h4>
              <div className="flex justify-end gap-4 flex-wrap">
                {/* GCash Logo */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                    <svg viewBox="0 0 100 100" fill="white" className="w-10 h-10">
                      <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10m0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32m10-50H40v16h20V32z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">GCash</span>
                </div>

                {/* Maya Logo */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                    <svg viewBox="0 0 100 100" fill="white" className="w-10 h-10">
                      <circle cx="30" cy="30" r="12" />
                      <circle cx="70" cy="30" r="12" />
                      <path d="M50 65c-8 0-15-3-20-8h40c-5 5-12 8-20 8z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">Maya</span>
                </div>

                {/* Bank Transfer Logo */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                    <svg viewBox="0 0 100 100" fill="white" className="w-10 h-10">
                      <path d="M50 15L20 35v50h60V35L50 15zM30 75V45h40v30H30zm15-15h10v10H45V60z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">Bank Transfer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile responsive: Stack vertically */}
          <div className="md:hidden space-y-6">
            <div>
              <h4 className="font-bold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-background/80 dark:text-foreground/70 text-xs">
                <li>
                  <Link
                    href="/legal/cookie-policy"
                    className="hover:text-background dark:hover:text-foreground transition"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="hover:text-background dark:hover:text-foreground transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms-of-service"
                    className="hover:text-background dark:hover:text-foreground transition"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-sm">Supported Payments</h4>
              <div className="flex gap-3 flex-wrap">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center mb-1">
                    <svg viewBox="0 0 100 100" fill="white" className="w-7 h-7">
                      <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10m0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32m10-50H40v16h20V32z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">GCash</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center mb-1">
                    <svg viewBox="0 0 100 100" fill="white" className="w-7 h-7">
                      <circle cx="30" cy="30" r="12" />
                      <circle cx="70" cy="30" r="12" />
                      <path d="M50 65c-8 0-15-3-20-8h40c-5 5-12 8-20 8z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">Maya</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center mb-1">
                    <svg viewBox="0 0 100 100" fill="white" className="w-7 h-7">
                      <path d="M50 15L20 35v50h60V35L50 15zM30 75V45h40v30H30zm15-15h10v10H45V60z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold">Bank</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 dark:border-foreground/20 pt-8 text-center text-background/70 dark:text-foreground/50 text-sm">
          <p>Copyright &copy; 2025. Coco Mangos Place Resort. All Rights Reserved. | Callbridge Web Design Services</p>
        </div>
      </div>
    </footer>
  )
}
