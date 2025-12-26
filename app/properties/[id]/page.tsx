import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";
import BookViewingButton from "@/components/booking/BookViewingButton";
import Header from "@/components/layout/Header";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

async function getProperty(id: string): Promise<Property> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
  const res = await fetch(`${API_URL}/properties/${id}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Property not found");
  return res.json();
}

const PropertyFeatureCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) => (
  <div className="group relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  </div>
);

const AreaIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    />
  </svg>
);
const BathIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
    />
  </svg>
);
const GarageIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const CalendarIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);
const EmailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default async function PropertyDetails({ params }: PropertyPageProps) {
  const { id } = await params;
  const propertyData = await getProperty(id);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          {/* TOP SECTION: IMAGES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 relative group">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={propertyData.img}
                  alt={propertyData.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                  For {propertyData.type}
                </div>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-6">
              {propertyData.images?.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full min-h-[150px] rounded-2xl overflow-hidden shadow-xl group"
                >
                  <Image
                    src={img}
                    alt="Gallery"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: DETAILS */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h1 className="text-4xl font-extrabold mb-4">
                  {propertyData.title}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-blue-600">
                    ${propertyData.price.toLocaleString("en-US")}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>

              {/* FEATURES GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <PropertyFeatureCard
                  icon={<AreaIcon />}
                  label="Area"
                  value={`${propertyData.size} sqft`}
                />
                <PropertyFeatureCard
                  icon={<BathIcon />}
                  label="Bathrooms"
                  value={propertyData.bath}
                />
                <PropertyFeatureCard
                  icon={<GarageIcon />}
                  label="Garage"
                  value={propertyData.garag}
                />
                <PropertyFeatureCard
                  icon={<CalendarIcon />}
                  label="Year Built"
                  value={propertyData.yearBuilt}
                />
              </div>

              {/* AMENITIES */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Key Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {propertyData.amenities?.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-50 px-4 py-3 rounded-xl text-sm font-semibold"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR */}
            <div className="space-y-6">
              {/* AGENT CARD */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={propertyData.avatar || "/user.png"}
                    alt={propertyData.name}
                    width={60}
                    height={60}
                    className="rounded-2xl border-2 border-white/20"
                  />
                  <div>
                    <p className="text-xl font-bold">{propertyData.name}</p>
                    <p className="text-blue-100 text-sm">Real Estate Agent</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {/* <button className="w-full bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl flex items-center justify-center gap-2 border border-white/20">
                    <PhoneIcon /> Call Agent
                  </button> */}
                  <Link
                    href="/contact"
                    className="w-full bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl flex items-center justify-center gap-2 border border-white/20 transition-all"
                  >
                    <EmailIcon /> Send Email
                  </Link>
                </div>
                <BookViewingButton propertyId={propertyData.id} />
              </div>

              {/* STATS CARD */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h4 className="font-bold mb-4">Quick Stats</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-semibold">#{propertyData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold capitalize">
                      {propertyData.type}
                    </span>
                  </div>
                  {propertyData.latitude && propertyData.longitude && (
                    <>
                      <div className="border-t border-gray-200 my-3"></div>
                      <a
                        href={`https://www.google.com/maps?q=${propertyData.latitude},${propertyData.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                      >
                        <LocationIcon />
                        View on Google Maps
                      </a>
                      {/* <p className="text-xs text-gray-500 text-center">
                        {propertyData.latitude.toFixed(4)}°,{" "}
                        {propertyData.longitude.toFixed(4)}°
                      </p> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
