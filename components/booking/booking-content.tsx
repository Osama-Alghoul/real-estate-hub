"use client";
import { useState } from "react";
import PropertySummary from "./property-summary";
import BookingForm from "./booking-form";
import { Property } from "@/types/property.type";

interface BookingContentProps {
  property: Property;
}

export default function BookingContent({ property }: BookingContentProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [visitType, setVisitType] = useState("in-person");

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Property Summary */}
        <div className="md:col-span-1">
          <PropertySummary property={property} />
        </div>

        {/* Right Column - Booking Form */}
        <div className="md:col-span-2">
          <BookingForm
            property={property}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            visitType={visitType}
            setVisitType={setVisitType}
          />
        </div>
      </div>
    </div>
  );
}
