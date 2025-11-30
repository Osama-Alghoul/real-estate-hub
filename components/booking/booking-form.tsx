"use client"
import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar, Clock } from "lucide-react"

interface BookingFormProps {
  selectedDate: string
  setSelectedDate: (date: string) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
  visitType: string
  setVisitType: (type: string) => void
}

const availableTimeSlots = [
  "09:00 - 09:30",
  "10:00 - 10:30",
  "11:00 - 11:30",
  "12:00 - 12:30",
  "14:00 - 14:30",
  "15:00 - 15:30",
  "16:00 - 16:30",
  "17:00 - 17:30",
]

const bookedSlots = ["10:00 - 10:30", "14:00 - 14:30"]

export default function BookingForm({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  visitType,
  setVisitType,
}: BookingFormProps) {
  const [wantCall, setWantCall] = useState(false)
  const [payDeposit, setPayDeposit] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
  }

  return (
    <Card className="p-8 shadow-md">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-8">Book a Visit</h2>

      <form className="space-y-8">
        {/* Step 1: Visit Type */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Visit Type</h3>
          <RadioGroup value={visitType} onValueChange={setVisitType}>
            <div className="flex items-center space-x-3 mb-3">
              <RadioGroupItem value="in-person" id="in-person" />
              <Label htmlFor="in-person" className="cursor-pointer font-normal">
                In-person visit
              </Label>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <RadioGroupItem value="virtual" id="virtual" />
              <Label htmlFor="virtual" className="cursor-pointer font-normal">
                Virtual tour
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="open-house" id="open-house" />
              <Label htmlFor="open-house" className="cursor-pointer font-normal">
                Open house
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Step 2: Select Date */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4DA6C7]" />
            Select Date
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B72D9]"
          />
          <p className="text-xs text-gray-500 mt-2">
            Only available dates are clickable. Greyed out dates are unavailable.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Step 3: Available Time Slots */}
        {selectedDate && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4DA6C7]" />
              Available Time Slots
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableTimeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot)
                const isSelected = selectedTime === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => !isBooked && setSelectedTime(slot)}
                    disabled={isBooked}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      isBooked
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isSelected
                          ? "bg-[#5B72D9] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Step 4: Additional Details */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Additional Details</h3>
          <textarea
            placeholder="Message to the owner / special requests..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B72D9] resize-none"
            rows={4}
          />
          <div className="flex items-center gap-3 mt-4">
            <Checkbox id="call" checked={wantCall} onCheckedChange={(checked :boolean) => setWantCall(checked as boolean)} />
            <Label htmlFor="call" className="cursor-pointer font-normal">
              I want the agent to call me before the visit
            </Label>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Step 5: Optional Payment */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Checkbox
              id="deposit"
              checked={payDeposit}
              onCheckedChange={(checked:boolean) => setPayDeposit(checked as boolean)}
            />
            <Label htmlFor="deposit" className="cursor-pointer font-normal">
              Pay a deposit now to confirm my booking (optional)
            </Label>
          </div>

          {payDeposit && (
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Deposit Amount</span>
                <span className="font-semibold text-[#2C3E50]">$1,000.00</span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-800 mb-3">Payment Method</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 border-2 border-[#5B72D9] rounded-lg text-sm font-medium text-[#5B72D9] hover:bg-blue-50"
                  >
                    💳 Credit Card
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    🅿️ PayPal
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B72D9]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B72D9]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B72D9]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5B72D9]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1 bg-[#5B72D9] hover:bg-[#4A5FB8] text-white py-3 rounded-lg font-semibold">
            Request Visit
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold bg-transparent"
          >
            Cancel
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 text-center">
          Your booking will be sent to the owner. You will receive a confirmation when the owner approves the visit.
        </p>
      </form>
    </Card>
  )
}
