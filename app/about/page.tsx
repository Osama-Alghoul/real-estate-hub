// About.tsx

import { AboutData, Client, FetchedDataType, Statistic, TeamMember } from "@/types/about.type";
import Image from "next/image";
import { Eye, Target, Handshake, ArrowRight } from "lucide-react";
import { JSX } from "react";
// Import types from the dedicated file


const iconMap: { [key: string]: JSX.Element } = {
  FaEye: <Eye className="text-blue-500" />,
  FaBullseye: <Target className="text-blue-500" />,
  FaHandshake: <Handshake className="text-blue-500" />,
};

async function fetchData<T extends FetchedDataType>(endpoint: string): Promise<T> {
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const res = await fetch(`${baseUrl}/${endpoint}`, { next: { revalidate: 0 } });

  if (!res.ok) {
    console.error(`Error fetching ${endpoint}: ${res.statusText}`); 
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export default async function About() {
  
  const [about, team, statistics, clients] = await Promise.all([
    fetchData<AboutData>("about"),
    fetchData<TeamMember[]>("team"),
    fetchData<Statistic[]>("statistics"),
    fetchData<Client[]>("clients"),
  ]);

  return (
    
    <main className="min-h-screen bg-gray-50 antialiased">      
      <header className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={about.hero.backgroundImage}
          alt="Abstract background image representing the company's ethos"
          priority 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl text-white font-extrabold tracking-tight text-center max-w-4xl px-4 animate-fadeIn">
            {about.hero.title}
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-16">
          <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed italic">
            &quot;{about.hero.subtitle}&quot;
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {about.sections.map((section, i) => (
              <article
                key={i}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="text-5xl mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  {iconMap[section.icon] || <ArrowRight className="text-blue-500" />}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3 uppercase tracking-wider">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-base">{section.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-20 bg-blue-50 p-10 rounded-3xl shadow-inner">
          <h2 className="sr-only">Company Statistics</h2> {/* Screen reader only heading */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((item, i) => (
              <div key={i} className="p-4">
                <p className="text-5xl font-extrabold text-blue-600 mb-1 leading-none">
                  {item.number}
                </p>
                <p className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Exceptional Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {team.map((member, i) => (
              <article
                key={i}
                className="group flex flex-col items-center text-center p-4"
              >
                <div className="w-32 h-32 relative mb-4 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:border-blue-400 transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 150px, 200px"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-500 text-sm italic">{member.position}</p>
              </article>
            ))}
          </div>
        </section>


        <section className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Trusted By The Best
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 p-8 bg-white rounded-2xl shadow-inner">
            {clients.map((client, i) => (
              <div key={i} className="w-28 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <Image
                  src={client.logo}
                  alt={`Client logo ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="128px"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}