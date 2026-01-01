"use client"

import { useState, useEffect } from "react"
import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import { Gift, AlertCircle, Clock, Flame, Lock, Unlock } from "lucide-react"

interface Coupon {
  id: number
  title: string
  description: string
  discount: number
  code: string
  expiryDate: Date
  type: "holiday" | "birthday" | "christmas" | "newyear" | "summer"
  isLimited: boolean
  uses: number
  maxUses: number
  isUnlocked: boolean
}

export default function CouponsPage() {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({})
  const [unlockedCoupons, setUnlockedCoupons] = useState<number[]>([])

  const coupons: Coupon[] = [
    {
      id: 1,
      title: "Holiday Special",
      description: "Enjoy exclusive discounts on all room bookings during the holiday season",
      discount: 25,
      code: "HOLIDAY25",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      type: "holiday",
      isLimited: true,
      uses: 45,
      maxUses: 100,
      isUnlocked: false,
    },
    {
      id: 2,
      title: "Birthday Month Celebration",
      description: "Celebrate your special day with a birthday bonus discount",
      discount: 20,
      code: "BIRTHDAY20",
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      type: "birthday",
      isLimited: false,
      uses: 0,
      maxUses: 0,
      isUnlocked: false,
    },
    {
      id: 3,
      title: "Christmas Festive Offer",
      description: "Celebrate Christmas at Coco Mangos with premium discounted rates",
      discount: 30,
      code: "XMAS30",
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      type: "christmas",
      isLimited: true,
      uses: 78,
      maxUses: 150,
      isUnlocked: false,
    },
    {
      id: 4,
      title: "New Year New Adventure",
      description: "Start the year fresh with amazing savings on your resort stay",
      discount: 22,
      code: "NEWYEAR22",
      expiryDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      type: "newyear",
      isLimited: true,
      uses: 92,
      maxUses: 120,
      isUnlocked: false,
    },
    {
      id: 5,
      title: "Summer Paradise",
      description: "Beat the heat with our summer season exclusive rates",
      discount: 18,
      code: "SUMMER18",
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      type: "summer",
      isLimited: true,
      uses: 156,
      maxUses: 200,
      isUnlocked: false,
    },
    {
      id: 6,
      title: "Extended Summer Bliss",
      description: "Extend your summer vacation with special family rates",
      discount: 15,
      code: "SUMMER15",
      expiryDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
      type: "summer",
      isLimited: true,
      uses: 89,
      maxUses: 150,
      isUnlocked: false,
    },
  ]

  useEffect(() => {
    const updateCountdown = () => {
      const newTimeLeft: { [key: number]: string } = {}

      coupons.forEach((coupon) => {
        const now = new Date()
        const diffTime = coupon.expiryDate.getTime() - now.getTime()

        if (diffTime > 0) {
          const days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

          if (days > 0) {
            newTimeLeft[coupon.id] = `${days}d ${hours}h left`
          } else if (hours > 0) {
            newTimeLeft[coupon.id] = `${hours}h ${minutes}m left`
          } else {
            newTimeLeft[coupon.id] = `${minutes}m left`
          }
        } else {
          newTimeLeft[coupon.id] = "Expired"
        }
      })

      setTimeLeft(newTimeLeft)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleUnlockCoupon = (couponId: number) => {
    setUnlockedCoupons([...unlockedCoupons, couponId])
  }

  const typeColors = {
    holiday: "from-red-500/20 to-green-500/20 border-red-200 dark:border-red-900",
    birthday: "from-pink-500/20 to-purple-500/20 border-pink-200 dark:border-pink-900",
    christmas: "from-red-500/20 to-yellow-500/20 border-red-200 dark:border-red-900",
    newyear: "from-blue-500/20 to-purple-500/20 border-blue-200 dark:border-blue-900",
    summer: "from-yellow-500/20 to-orange-500/20 border-yellow-200 dark:border-yellow-900",
  }

  const typeIcons = {
    holiday: "🎄",
    birthday: "🎂",
    christmas: "🎅",
    newyear: "🎆",
    summer: "☀️",
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <div className="flex justify-center mb-6">
              <Gift size={48} />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">Exclusive Coupons & Offers</h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90">
              Unlock amazing discounts on your next stay at Coco Mangos Resort
            </p>
          </div>
        </section>

        {/* Coupons Grid */}
        <section className="section-padding pb-32 md:pb-16">
          <div className="section-max-width">
            {/* Special Offers Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Special Limited-Time Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Early Bird Discount", discount: 20, expires: "5 days 3 hours", status: "Active" },
                  { title: "Extended Stay", discount: 15, expires: "10 days 12 hours", status: "Active" },
                  { title: "Group Booking", discount: 25, expires: "Expired", status: "Expired" },
                ].map((offer, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 rounded-xl p-6 ${
                      offer.status === "Expired" ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold">{offer.title}</h3>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          offer.status === "Expired" ? "bg-gray-500/30 text-gray-600" : "bg-green-500/30 text-green-600"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-orange-600 mb-4">{offer.discount}% OFF</div>
                    {offer.status === "Expired" ? (
                      <div className="text-red-600 font-bold">Offer Expired</div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Clock size={16} />
                        {offer.expires}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Original Coupons Grid */}
            <h2 className="text-2xl font-bold mb-6">Exclusive Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coupons.map((coupon) => {
                const isUnlocked = unlockedCoupons.includes(coupon.id)

                return (
                  <div
                    key={coupon.id}
                    className={`bg-gradient-to-br ${typeColors[coupon.type]} border-2 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group ${
                      isUnlocked ? "" : "opacity-75"
                    }`}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 text-4xl opacity-20">{typeIcons[coupon.type]}</div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold">{coupon.title}</h3>
                          <p className="text-sm text-primary-foreground/80 mt-1">{coupon.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {!isUnlocked ? (
                        // Locked State
                        <div className="text-center space-y-4">
                          <div className="flex justify-center mb-4">
                            <Lock size={48} className="text-foreground/40" />
                          </div>
                          <p className="text-sm text-foreground/60">Coupon locked</p>
                          <button
                            onClick={() => handleUnlockCoupon(coupon.id)}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                          >
                            <Unlock size={18} />
                            Unlock Coupon
                          </button>
                        </div>
                      ) : (
                        // Unlocked State
                        <>
                          {/* Discount Badge */}
                          <div className="text-center mb-6">
                            <div className="inline-block bg-gradient-to-r from-secondary to-accent text-primary-foreground px-8 py-3 rounded-full">
                              <span className="text-4xl font-bold">{coupon.discount}%</span>
                              <span className="text-sm ml-2">OFF</span>
                            </div>
                          </div>

                          {/* Countdown */}
                          <div className="flex items-center justify-center gap-2 mb-6 text-sm font-semibold text-foreground">
                            <Clock size={18} className="text-red-500" />
                            <span>{timeLeft[coupon.id] || "Loading..."}</span>
                          </div>

                          {/* Coupon Code */}
                          <div className="bg-foreground/5 border border-dashed border-foreground/20 rounded-lg p-4 mb-6 text-center">
                            <p className="text-xs text-foreground/60 mb-2">COUPON CODE</p>
                            <p className="text-xl font-bold font-mono tracking-widest text-foreground">{coupon.code}</p>
                          </div>

                          {/* Limited Offers Info */}
                          {coupon.isLimited && (
                            <div className="flex items-center gap-2 mb-4 text-sm bg-orange-500/10 border border-orange-200 dark:border-orange-900 rounded-lg p-3">
                              <Flame size={16} className="text-orange-500" />
                              <span className="font-semibold">
                                {coupon.maxUses - coupon.uses} of {coupon.maxUses} available
                              </span>
                            </div>
                          )}

                          {/* Progress Bar */}
                          {coupon.isLimited && (
                            <div className="w-full bg-foreground/10 rounded-full h-2 mb-4 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all duration-500"
                                style={{ width: `${(coupon.uses / coupon.maxUses) * 100}%` }}
                              />
                            </div>
                          )}

                          {/* CTA Button */}
                          <button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            <Gift size={18} />
                            Claim Offer
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-blue-500/10 border border-blue-200 dark:border-blue-900 rounded-xl p-6 flex items-start gap-4">
              <AlertCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-2">How to Use Your Coupon</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/70">
                  <li>Click "Unlock Coupon" to reveal the coupon code</li>
                  <li>Click "Claim Offer" to save the coupon to your account</li>
                  <li>Choose your room and booking dates</li>
                  <li>Enter the coupon code at checkout to enjoy your discount!</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
