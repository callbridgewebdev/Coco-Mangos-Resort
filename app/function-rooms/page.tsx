import HeaderWrapper from "@/components/header-wrapper"
import MobileNav from "@/components/mobile-nav"

export default function FunctionRoomsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 md:pb-0">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Function Rooms</h1>
            <p className="text-lg md:text-xl opacity-90">
              Perfect venue for your special events and corporate gatherings
            </p>
          </div>
        </section>

        {/* Main Function Room */}
        <section className="section-padding">
          <div className="section-max-width">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Large Function Room</h2>
                <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                  Located in Panglao, our state-of-the-art Large Function Room at Coco Mango's Place Resort is the
                  perfect destination for an important event.
                </p>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  Whether it's a wedding celebration, birthday party, baptismal party, or family reunion, we can make
                  your special occasions even more memorable. Our versatile space is also ideal for corporate events
                  such as conferences, seminars, training sessions, team-building activities, and company parties.
                </p>

                <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-xl mb-4 text-primary">Room Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold">✓</span>
                      <span>Seating capacity for 60 – 80 people</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold">✓</span>
                      <span>Professional sound system included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold">✓</span>
                      <span>Overhead projector and screen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold">✓</span>
                      <span>Climate-controlled environment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold">✓</span>
                      <span>Flexible table and chair arrangements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold">✓</span>
                      <span>Easy access to catering facilities</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <a href="/contact" className="btn-primary text-center">
                    Request Booking
                  </a>
                  <a href="/contact" className="btn-secondary text-center">
                    Get More Info
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/gallery-dining-1.jpg"
                  alt="Function Room"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="section-padding bg-muted/30">
          <div className="section-max-width">
            <h2 className="text-4xl font-bold mb-12 text-center">Perfect For All Occasions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Personal Celebrations",
                  items: ["Weddings", "Birthday Parties", "Baptismal Parties", "Family Reunions", "Anniversaries"],
                },
                {
                  title: "Corporate Events",
                  items: ["Conferences", "Seminars", "Training Sessions", "Team Building", "Company Parties"],
                },
                {
                  title: "Social Gatherings",
                  items: ["Receptions", "Cocktail Parties", "Dinner Events", "Networking Events", "Product Launches"],
                },
              ].map((category, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold mb-4 text-primary">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="text-foreground/70 flex items-center gap-2">
                        <span className="text-secondary">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Info */}
        <section className="section-padding">
          <div className="section-max-width">
            <h2 className="text-4xl font-bold mb-12 text-center">What's Included</h2>
            <div className="bg-card border border-border rounded-xl p-8 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-primary">Venue Setup</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>✓ Spacious, well-lit room</li>
                  <li>✓ Professional sound system</li>
                  <li>✓ Overhead projector with screen</li>
                  <li>✓ WiFi connectivity</li>
                  <li>✓ Flexible seating arrangements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 text-secondary">Additional Services</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>✓ Catering services available</li>
                  <li>✓ Event planning assistance</li>
                  <li>✓ Professional staff support</li>
                  <li>✓ Parking facilities</li>
                  <li>✓ Hotel accommodations available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="section-max-width text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Event Today</h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us to reserve the Function Room and make your event unforgettable
            </p>
            <a
              href="/contact"
              className="px-8 py-4 bg-primary-foreground text-primary rounded-lg font-bold text-lg hover:opacity-90 transition-all inline-block"
            >
              Contact Us Now
            </a>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
