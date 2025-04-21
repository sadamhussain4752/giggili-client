import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full bg-background py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
            ENTERTAINMENT <br />
            DELIVERED TO YOUR <br />
            DOORSTEP
          </h1>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">What are you looking for?</h3>
            <div className="grid grid-cols-3 gap-4">
              <CategoryCard
                title="DJ"
                iconSrc="https://ext.same-assets.com/1887355265/2244096686.png"
                href="/service-list/category/dj"
              />
              <CategoryCard
                title="Live Singer"
                iconSrc="https://ext.same-assets.com/1887355265/108643548.png"
                href="/service-list/category/live-singer"
              />
              <CategoryCard
                title="Band"
                iconSrc="https://ext.same-assets.com/1887355265/1389202622.png"
                href="/service-list/category/band"
              />
              <CategoryCard
                title="Musician"
                iconSrc="https://ext.same-assets.com/1887355265/2072431407.png"
                href="/service-list/category/musician"
              />
              <CategoryCard
                title="Karaoke"
                iconSrc="https://ext.same-assets.com/1887355265/2759589883.png"
                href="/service-list/category/karaoke"
              />
              <CategoryCard
                title="Sufi"
                iconSrc="https://ext.same-assets.com/1887355265/3277607109.png"
                href="/service-list/category/sufi"
              />
            </div>
          </div>
        </div>

        <div className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center">
          <div className="relative w-[90%] h-[300px] md:h-[400px]">
            <Image
              src="https://ext.same-assets.com/1887355265/1742656969.jpeg"
              alt="DJ Performance"
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="absolute -top-4 -left-4 w-[90%] h-[300px] md:h-[400px] border-2 border-primary rounded-md -z-10" />
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ title, iconSrc, href }: { title: string; iconSrc: string; href: string }) => {
  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center justify-center p-4 border border-[#e6e6e6] rounded-md bg-white hover:border-primary transition-colors">
        <div className="w-12 h-12 relative mb-2">
          <Image
            src={iconSrc}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <h4 className="text-sm font-medium text-center">{title}</h4>
      </div>
    </Link>
  );
};

export default Hero;
