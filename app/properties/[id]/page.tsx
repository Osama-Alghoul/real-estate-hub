import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property.type";

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

export default async function PropertyDetails({ params }: PropertyPageProps) {
  const { id } = await params;
  const propertyData = await getProperty(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>

              <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                {propertyData.images?.length || 1} Photos
              </div>

              <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                For {propertyData.type}
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6">
            {propertyData.images?.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                className="relative h-full min-h-[150px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`${propertyData.title} gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
                  {propertyData.title}
                </h1>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${propertyData.price.toLocaleString("en-US")}
                </span>
                <span className="text-gray-500 text-lg">/month</span>
              </div>
            </div>

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

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {propertyData.description}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Key Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyData.amenities?.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 px-4 py-3 rounded-xl border border-blue-200/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                      <span className="text-sm font-semibold text-gray-800">
                        {amenity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {propertyData.video && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                  Property Tour
                </h2>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <video controls className="w-full h-auto">
                    <source src={propertyData.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 shadow-2xl text-white">
                <h3 className="text-xl font-bold mb-6">Contact Agent</h3>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Image
                      src={propertyData.avatar}
                      alt={propertyData.name}
                      width={80}
                      height={80}
                      className="rounded-2xl border-4 border-white/20 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-4 border-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xl font-bold">{propertyData.name}</p>
                    <p className="text-blue-100 text-sm">Real Estate Agent</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/20">
                    <PhoneIcon />
                    Call Agent
                  </button>
                  <button className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/20">
                    <EmailIcon />
                    Send Email
                  </button>
                </div>

                <Link
                  href={`/booking?propertyId=${propertyData.id}`}
                  className="block w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform text-center"
                >
                  Book a Viewing
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Quick Stats</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Property ID</span>
                    <span className="font-semibold text-gray-900">
                      #{propertyData.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {propertyData.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold text-xs">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
