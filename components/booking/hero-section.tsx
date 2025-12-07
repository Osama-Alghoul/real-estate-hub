export default function HeroSection() {
  return (
    <div className="relative w-full h-64 md:h-80 bg-gradient-to-b from-black/40 to-black/20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/properties/P1.png)",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Booking Visit</h1>
        <p className="text-gray-200 text-sm md:text-base mb-4">Home / Properties / Booking Visit</p>
        <p className="text-gray-100 max-w-2xl text-sm md:text-base">
          Schedule a personalized visit to explore your dream property with our experienced agents
        </p>
      </div>
    </div>
  )
}
