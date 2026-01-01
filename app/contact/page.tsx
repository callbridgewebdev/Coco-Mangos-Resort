"use client"

import type React from "react"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Mail, Phone, Clock, Send, MapPin } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-r from-secondary to-accent text-secondary-foreground py-8 md:py-16">
          <div className="section-max-width text-center px-4">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">Contact Us</h1>
            <p className="text-base md:text-xl opacity-90">
              We'd love to hear from you. Get in touch with our team today.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="section-padding py-8 md:py-16">
          <div className="section-max-width px-4">
            <div className="grid md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-4 text-sm md:text-base">Location</h3>
                <div className="space-y-2 text-foreground/70 text-xs md:text-sm">
                  <p>
                    <strong>Address:</strong> <br />
                    Purok 5 Danao <br />
                    Panglao, Bohol <br />
                    Philippines
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-4 text-sm md:text-base">Reservations</h3>
                <div className="space-y-2 text-foreground/70 text-xs md:text-sm">
                  <p>
                    <strong>Smart / TNT:</strong> <br />
                    +63-999-888-6700
                  </p>
                  <p>
                    <strong>Globe / TM:</strong> <br />
                    +63-917-704-2739
                  </p>
                  <p>
                    <strong>Landline:</strong> <br />
                    +63-38-412-4589
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 text-center">
                <Mail className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h3 className="font-bold mb-4 text-sm md:text-base">Email Us</h3>
                <div className="space-y-3 text-foreground/70 text-xs md:text-sm">
                  <div>
                    <p className="font-semibold text-foreground">Contact:</p>
                    <a href="mailto:cocomangosplace@gmail.com" className="hover:text-primary transition break-all">
                      cocomangosplace@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Corporate:</p>
                    <a href="mailto:info@boholcocomangos.com" className="hover:text-primary transition break-all">
                      info@boholcocomangos.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 text-center">
                <Clock className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-bold mb-2 text-sm md:text-base">Hours</h3>
                <p className="text-foreground/70 text-xs md:text-sm">24/7 Guest Support</p>
                <p className="text-foreground/60 text-xs mt-2">Available daily for reservations and inquiries</p>
              </div>
            </div>

            {/* Contact Form & Map */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block font-semibold mb-2 text-sm md:text-base">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-sm md:text-base">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-sm md:text-base">Phone</label>
                    <input
                      type="tel"
                      placeholder="+63 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-sm md:text-base">Message</label>
                    <textarea
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm md:text-base"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <Send size={18} /> Send Message
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8">Find Us</h2>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8264851234567!2d123.80295!3d9.14507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab6d12345678%3A0x987654321abcdef!2sCoco%20Mangos%20Place%20Resort!5e0!3m2!1sen!2sph!4v1234567890123"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "0.625rem" }}
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="section-padding bg-muted/30 py-8 md:py-12">
          <div className="section-max-width px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Follow Us</h2>
            <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
              <a
                href="https://facebook.com"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition hover:scale-110 hover:shadow-lg"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.693-5.829 6.693h-3.307l7.713-8.835L2.25 2.25h6.514l4.882 6.479 5.288-6.479zM17.364 20.455h1.828L6.817 3.96H4.854l12.51 16.495z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:cocomangosplace@gmail.com"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition hover:scale-110 hover:shadow-lg"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
