import type React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={require("../../asset/About.webp")}
                  alt="DJ mixing music"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-lg -z-10" />

              <div className="absolute bottom-8 right-8 bg-primary rounded-lg p-6 text-white">
                <h3 className="text-3xl font-bold">8 Years</h3>
                <p className="text-lg">Experience</p>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About Us</h1>
              <p className="text-muted-foreground mb-6">
               At GIGGILI, we bring your events to life with rhythm, energy, and unforgettable performances. Our innovative platform seamlessly connects you with top-tier DJs, singers, and dancers, making it easier than ever to book the perfect talent for any occasion.
  <br/>
    <br/>
  Whether you're planning a house party, corporate event, wedding, or private celebration, GIGGILI lets you browse performer profiles, check availability, and book instantly—all in one place.
 <br/>
  <br/>
 With a focus on quality, convenience, and creativity, we’re redefining how entertainment is discovered and delivered. Let GIGGILI turn your next event into an extraordinary experience.

              </p>

              <ul className="space-y-3">
            
                <FeatureItem text="It's a long established way" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Marketplace */}
      <section className="py-12 md:py-16 bg-[#f7f7f9]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">WHY GIGGILI</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              It is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              }
              title="One-Stop Entertainment Booking Platform"
              description="Instantly discover and book top DJs, singers, and dancers for any event—all in one place."
              bgColor="bg-blue-50"
            />

            <FeatureCard
              icon={
                <div className="bg-pink-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-pink-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              }
              title="Real-Time Availability & Instant Booking"
              description="View performer schedules and confirm bookings with just a few clicks—no back-and-forth."
              bgColor="bg-pink-50"
            />

            <FeatureCard
              icon={
                <div className="bg-blue-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              }
              title="Verified Talent, Trusted Performances"
              description="All performers are pre-screened and rated to ensure high-quality, professional entertainment."
              bgColor="bg-blue-50"
            />

            <FeatureCard
              icon={
                <div className="bg-orange-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-orange-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              }
              title="Curated for Every Occasion"
              description="From house parties and weddings to corporate functions and cultural events, GIGGILI has the right talent for every vibe."
              bgColor="bg-orange-50"
            />

            <FeatureCard
              icon={
                <div className="bg-green-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              }
              title="Transparent Pricing, No Surprises"
              description="Know exactly what you’re paying for upfront—no hidden fees or last-minute charges."
              bgColor="bg-green-50"
            />

            <FeatureCard
              icon={
                <div className="bg-purple-100 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-purple-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              }
              title="Reliable Support Team"
              description="Dedicated event support to ensure everything runs smoothly—from booking to performance."
              bgColor="bg-purple-50"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  bgColor
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}) => {
  return (
    <div className={`p-8 rounded-lg ${bgColor}`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default AboutPage;
