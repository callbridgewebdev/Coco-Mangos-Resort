"use client"

import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"
import Footer from "@/components/footer"
import { Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

const reviewsData: Record<number, any> = {
  1: {
    name: "Sarah Johnson",
    rating: 5,
    date: "January 15, 2025",
    title: "Paradise Found!",
    content: `My husband and I had the most incredible honeymoon at Coco Mangos Resort. From the moment we arrived, we were treated like royalty. The beachfront villa exceeded all our expectations with stunning ocean views and modern amenities.

The staff was incredibly attentive and helpful. They arranged special surprises including a romantic dinner on the beach and champagne in our room. The spa treatments were heavenly, and the food at all the restaurants was exceptional.

We participated in several tours including the island hopping adventure and the jungle trek, both of which were well-organized and unforgettable. The resort's location on Panglao Island is perfect for exploring the beautiful Bohol region.

I would absolutely recommend Coco Mangos Resort to anyone looking for a luxury tropical getaway. It's truly paradise!`,
  },
  2: {
    name: "Michael Chen",
    rating: 5,
    date: "January 10, 2025",
    title: "Best Vacation Ever",
    content: `My family and I spent 5 wonderful days at Coco Mangos Resort and it was by far our best vacation ever. The rooms were spacious, clean, and beautifully decorated. The beach access was immediate and convenient.

The pool area is fantastic with plenty of loungers and a swim-up bar. The kids loved the kids club activities, which gave us adults some relaxation time. The infinity pool offers stunning sunset views.

Food-wise, the variety was excellent. The Filipino cuisine was authentic and delicious, and they had great international options too. The staff remembered our preferences and always greeted us warmly.

The tour desk helped us arrange several adventures including the famous Chocolate Hills tour and a snorkeling trip. Everything was seamlessly organized. We're already planning our next trip back!`,
  },
  3: {
    name: "Emma Wilson",
    rating: 4,
    date: "January 8, 2025",
    title: "Wonderful Experience",
    content: `We had a wonderful 3-night stay at Coco Mangos Resort. The location is excellent with direct beach access and beautiful tropical surroundings. Our deluxe ocean view room was spacious and comfortable with a private balcony.

The resort offers great facilities including multiple pools, restaurants, and a well-equipped spa. The spa treatments were very reasonably priced and of high quality. The staff was generally helpful and friendly.

The only minor issue we encountered was WiFi connectivity in some areas of the resort, particularly near the beach section. We were told they were upgrading their system, so this should be resolved soon.

Overall, it's a wonderful resort offering great value for money. The combination of luxury, service, and natural beauty makes it an excellent choice for a tropical vacation. We look forward to returning.`,
  },
  4: {
    name: "David Martinez",
    rating: 5,
    date: "January 5, 2025",
    title: "Luxury Tropical Escape",
    content: `We held our company's annual retreat at Coco Mangos Resort and it was a tremendous success. The Function Room is well-equipped with modern audiovisual technology and can accommodate various configurations.

The resort staff's event coordination was exceptional. They handled all the details from setup to catering to cleanup without any issues. The catering options were diverse and the food quality was outstanding.

The location provided the perfect balance of productivity and recreation. In the mornings we held our business sessions, and in the afternoons teams could enjoy team-building activities like beach volleyball and group snorkeling.

Accommodating all 80 guests was seamless. Rooms were comfortable, the service was attentive, and the overall ambiance was professional yet relaxing. Several executives mentioned they would love to bring their families back for leisure trips.

Highly recommended for corporate events and retreats!`,
  },
  5: {
    name: "Lisa Anderson",
    rating: 5,
    date: "January 2, 2025",
    title: "Family Paradise",
    content: `Coco Mangos Resort is perfect for families! We brought our two children (ages 6 and 9) and they had an absolute blast. The kids club kept them entertained with various activities while we enjoyed some adult time.

The beach is safe and beautiful, perfect for families. There's a shallow area for younger children and plenty of beach toys and activities. The pool area is also family-friendly with lifeguards on duty.

The family bungalow we booked had enough space for everyone to be comfortable. The kitchenette was useful, though we mostly ate at the restaurants which offered great kids' menus.

Staff was very accommodating with our family's needs. High chairs were provided without asking, and the restaurants adapted meals for the children's preferences. The room cleaning service was efficient and never disturbed us.

I especially appreciated that the resort offers various family-oriented activities and tours. We did a gentle jungle walk and a marine sanctuary tour that were perfect for the kids' ages. It's rare to find a resort that balances romance and luxury with family-friendly activities. Highly recommend!`,
  },
  6: {
    name: "James Thompson",
    rating: 4,
    date: "December 28, 2024",
    title: "Beautiful Setting",
    content: `Coco Mangos Resort sits in one of the most beautiful settings I've ever seen. The tropical gardens are lush and well-maintained, and the beachfront location offers stunning views throughout the day.

Our premium suite was comfortable and well-appointed with modern amenities. The service level was excellent with housekeeping attending to our needs promptly and courteously.

The main dining restaurant offered good food, though the menu variety could have been broader. There are only 2 main restaurants, so choices felt limited after 3 days. The dinner buffet was good but repeated items day to day.

Despite this minor issue with dining variety, the overall experience was excellent. The room quality, service, and stunning natural environment make it a great value. The beachfront location alone is worth the stay. Would return in the future.`,
  },
  7: {
    name: "Maria Garcia",
    rating: 5,
    date: "December 25, 2024",
    title: "Dream Destination",
    content: `This is the most romantic resort I've ever stayed at. Every moment felt like a dream. The beachfront villa we booked offered complete privacy and the most spectacular sunset views.

The natural beauty of Panglao Island combined with the resort's elegant design creates pure magic. We spent mornings on the private beach and evenings watching the sunset from our terrace with a bottle of wine.

The spa services were luxurious and therapeutic. We had couples massages that were absolutely rejuvenating. The spa therapists were professional and attentive to our needs.

For dining, the romantic oceanfront restaurant created the perfect ambiance for special meals. The chef prepared our special dinner request flawlessly.

My husband surprised me with a renewal of our vows ceremony arranged by the resort staff, and it was perfect. Every detail was executed beautifully. This resort truly deserves its reputation as a romantic paradise. If you're celebrating a special occasion, this is the place to be.`,
  },
  8: {
    name: "Robert Kim",
    rating: 5,
    date: "December 20, 2024",
    title: "Outstanding Service",
    content: `The level of service at Coco Mangos Resort is truly outstanding. From the moment our car pulled up, we felt welcomed and valued. The staff remembered our names and preferences throughout our stay.

Every staff member was professional, friendly, and eager to help. When we requested late checkout, they accommodated us without hesitation. When we wanted breakfast moved earlier one morning, it was arranged immediately.

The housekeeping staff maintained our room impeccably. Small details like fresh flowers daily and personalized touches showed they cared. The room service was prompt and the food arrived hot and well-presented.

At the beach, staff provided shade and refreshments. At the restaurants, servers anticipated our needs before we asked. The front desk went above and beyond to arrange our tours and transportation.

This level of service is rare. It's the kind of experience that makes you want to return immediately. Every team member embodies the resort's commitment to guest satisfaction. Exceptional!`,
  },
  9: {
    name: "Patricia Lee",
    rating: 4,
    date: "December 18, 2024",
    title: "Highly Recommended",
    content: `Coco Mangos Resort is highly recommended for a tropical getaway. The property is beautiful with well-maintained gardens and excellent facilities. Our room was spacious, clean, and comfortable.

The spa services were among the best I've experienced. I had a full body massage and a facial, both performed by skilled therapists. The spa facility itself is serene and relaxing with calming music and aromatherapy.

The beach area is lovely though it can get crowded during peak hours. The infinity pool offers beautiful views and is a great spot for relaxation. Multiple dining options cater to different tastes.

One note: We experienced some noise from the beach bar area extending late into the night. It was pleasant as background ambiance, but guests looking for a very quiet retreat might want to request rooms away from the beach.

Overall, it's an excellent resort offering good value and excellent amenities. The staff is friendly and attentive. We enjoyed our stay and would return.`,
  },
  10: {
    name: "Thomas Robinson",
    rating: 5,
    date: "December 15, 2024",
    title: "Worth Every Penny",
    content: `Coco Mangos Resort offers premium accommodations and service at a great price point compared to similar resorts in the region. We got exceptional value for our money.

The room quality alone justifies the rate. Modern furnishings, quality bedding, excellent bathrooms, and thoughtful touches everywhere. The location on a private beach adds significant value.

The tour packages offered through the resort were competitively priced and well-organized. We booked the island hopping tour and the Chocolate Hills tour, both of which provided great experiences and excellent guides.

Activities and facilities (pools, spa, restaurants, beach) are all included in the nightly rate or available at reasonable additional costs. No hidden charges or surprise fees.

The staff consistently provided value by going above and beyond typical service expectations. When we needed recommendations, they gave us insider tips.

If you're looking for luxury at a reasonable price in Southeast Asia, this resort is hard to beat. The combination of quality, service, amenities, and location makes it exceptional value. Highly worth the investment!`,
  },
}

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  const review = reviewsData[Number.parseInt(params.id) || 1]

  if (!review) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <HeaderWrapper />
        <main className="flex-1 section-padding">
          <div className="section-max-width text-center">
            <h1 className="text-4xl font-bold mb-4">Review Not Found</h1>
            <Link href="/reviews" className="text-primary hover:underline">
              Back to Reviews
            </Link>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <HeaderWrapper />

      <main className="flex-1">
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width">
            <Link
              href="/reviews"
              className="flex items-center gap-2 mb-6 text-primary-foreground/80 hover:text-primary-foreground transition"
            >
              <ArrowLeft size={20} /> Back to Reviews
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{review.title}</h1>
            <p className="text-lg md:text-xl opacity-90">By {review.name}</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-max-width max-w-3xl">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-lg font-bold text-foreground">{review.name}</p>
                  <p className="text-foreground/60">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_: any, i: number) => (
                    <Star key={i} size={24} className="fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                {review.content.split("\n\n").map((paragraph: string, i: number) => (
                  <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="font-bold mb-4">Was this review helpful?</h3>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition">
                  Yes, Helpful
                </button>
                <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition">
                  Not Helpful
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
