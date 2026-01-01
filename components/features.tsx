"use client"

import { Waves, Users, Leaf, Utensils } from "lucide-react"

const features = [
  {
    icon: Waves,
    title: "Beachfront Location",
    description: "Direct access to pristine white-sand beaches",
  },
  {
    icon: Users,
    title: "World-Class Service",
    description: "Personalized attention from our dedicated staff",
  },
  {
    icon: Leaf,
    title: "Sustainable Resort",
    description: "Eco-friendly practices for a better tomorrow",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Culinary excellence with local and international cuisine",
  },
]

export default function Features() {
  return (
    <section className="section-padding bg-background">
      <div className="section-max-width">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
