import HeroSection from "@/components/booking/hero-section"
import BookingContent from "@/components/booking/booking-content"
import Header from "@/components/layout/header"
import BookingInfoStrip from "@/components/booking/booking-info-strip"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <BookingContent />
      <BookingInfoStrip />
    </div>
  )
}
