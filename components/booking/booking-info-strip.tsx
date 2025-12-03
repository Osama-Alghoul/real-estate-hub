import { Calendar, User, CreditCard, Home } from "lucide-react"

export default function BookingInfoStrip() {
  const steps = [
    {
      icon: Calendar,
      number: 1,
      title: "Choose Date & Time",
      description: "Select your preferred visit slot",
    },
    {
      icon: User,
      number: 2,
      title: "Owner Approves",
      description: "Wait for owner confirmation",
    },
    {
      icon: CreditCard,
      number: 3,
      title: "Payment (Optional)",
      description: "Secure your booking with deposit",
    },
    {
      icon: Home,
      number: 4,
      title: "Visit Property",
      description: "Explore on scheduled time",
    },
  ]

  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2C3E50] text-center mb-12">Booking Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#5B72D9] text-white flex items-center justify-center mb-4 flex-shrink-0">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {step.number}. {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
