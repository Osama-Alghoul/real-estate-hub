import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us - REIS Real Estate",
  description:
    "Get in touch with our team. We're here to help you find your dream property.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full py-24 md:py-32 bg-cover bg-center"
        style={{
          backgroundImage: "url(/banner/hero.png)",
        }}
      >
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-blue-500/30" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl text-pretty">
            Have questions about finding your perfect property? Our team is
            ready to help.
          </p>
          <nav className="text-white/80 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Contact Section - Two Columns */}
      <section className="w-full py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Send us a message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>

              <ContactForm />
            </div>

            {/* Right Column - Contact Information */}
            <div className="flex flex-col gap-6">
              {/* Address Card */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Office Address
                    </h3>
                    <p className="text-muted-foreground">
                      123 Main Street
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Phone Numbers
                    </h3>
                    <p className="text-muted-foreground">
                      Main:{" "}
                      <a
                        href="tel:+15551234567"
                        className="hover:text-primary transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                      <br />
                      Sales:{" "}
                      <a
                        href="tel:+15559876543"
                        className="hover:text-primary transition-colors"
                      >
                        +1 (555) 987-6543
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      Email Address
                    </h3>
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:info@reisrealestate.com"
                        className="hover:text-primary transition-colors"
                      >
                        info@reisrealestate.com
                      </a>
                      <br />
                      <a
                        href="mailto:support@reisrealestate.com"
                        className="hover:text-primary transition-colors"
                      >
                        support@reisrealestate.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Business Hours
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                      <p>Saturday: 10:00 AM – 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Description */}
              <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                Our dedicated team is committed to answering all your questions
                and connecting you with the perfect property. Whether
                you&apos;re buying, selling, or investing, we&apos;re here to
                guide you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="w-full py-16 md:py-24 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2"></div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Strip */}
      <section className="w-full py-12 md:py-16 px-4 bg-primary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 text-balance">
              Looking for your dream home?
            </h3>
            <p className="text-primary-foreground/90">
              Browse our extensive collection of premium properties available
              now.
            </p>
          </div>
          <Button
            asChild
            className="whitespace-nowrap h-11 px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
          >
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
