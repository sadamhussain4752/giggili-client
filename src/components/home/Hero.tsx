import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ImageCardProps {
  src: StaticImageData;
  size: boolean;
}
const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full bg-[#FFF9F3] py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222] leading-snug">
            Entertainment Delivered <br />
            To Your Doorstep
          </h1>

          <div className="bg-white rounded-xl shadow-md p-6 border border-[#f3d9c1] max-w-md">
            <h3 className="text-md font-semibold text-start mb-6">What are you looking for?</h3>
            <div className="grid grid-cols-3 gap-4">
            <CategoryCard
  title="DJ"
  iconSrc="https://ext.same-assets.com/1887355265/2244096686.png"
  href="#"
  onClick={() => setShowModal(true)}
/>

              <CategoryCard
                title="Live Singer"
                iconSrc="https://ext.same-assets.com/1887355265/108643548.png"
                href="/category/live-singer"
              />
              <CategoryCard
                title="Band"
                iconSrc="https://ext.same-assets.com/1887355265/1389202622.png"
                href="/category/band"
              />
              <CategoryCard
                title="Musician"
                iconSrc="https://ext.same-assets.com/1887355265/2072431407.png"
                href="/category/musician"
              />
              <CategoryCard
                title="Karaoke"
                iconSrc="https://ext.same-assets.com/1887355265/2759589883.png"
                href="/category/karaoke"
              />
              <CategoryCard
                title="Sufi"
                iconSrc="https://ext.same-assets.com/1887355265/3277607109.png"
                href="/category/sufi"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="columns-1 sm:columns-2 gap-4">
  <ImageCard src={require("../../asset/Rectangle 1.png")} size={true} />
  <ImageCard src={require("../../asset/Rectangle 2.png")} size={false} />
  <ImageCard src={require("../../asset/Rectangle 4.png")} size={false} />
  <ImageCard src={require("../../asset/Rectangle 3.png")} size={true} />
</div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
      <button
        className="absolute top-2 right-2 text-gray-600 text-xl"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-4">Choose Booking Type</h2>
      <div className="flex justify-between gap-4">
        <Link href="/category/live-singer" className="flex-1">
          <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow cursor-pointer transition">
            <Image
              src="https://giggili.com/assets/uploads/media-uploader/express-delivery1734088773.png"
              alt="Express"
              width={40}
              height={40}
            />
            <span className="mt-2 text-sm font-medium">Express Booking</span>
          </div>
        </Link>
        <Link href="/category/live-singer" className="flex-1">
          <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow cursor-pointer transition">
            <Image
              src="https://giggili.com/assets/uploads/media-uploader/booking1734088770.png"
              alt="Regular"
              width={40}
              height={40}
            />
            <span className="mt-2 text-sm font-medium">Regular Booking</span>
          </div>
        </Link>
      </div>
    </div>
  </div>
)}


    </section>
  );
};

const CategoryCard = ({
  title,
  iconSrc,
  href,
  onClick,
}: {
  title: string;
  iconSrc: string;
  href: string;
  onClick?: () => void;
}) => {
  return (
    <Link href={href} onClick={onClick} className="group">
      <div className="flex flex-col items-center justify-center p-3 border border-[#ffffff] rounded-lg bg-white hover:border-[#f97316] transition">
        <div className="w-10 h-10 relative mb-2">
          <Image src={iconSrc} alt={title} fill className="object-contain" />
        </div>
        <h4 className="text-sm text-center font-medium text-[#333]">{title}</h4>
      </div>
    </Link>
  );
};


const ImageCard: React.FC<ImageCardProps> = ({ src, size }) => (
  <div
    className={`relative mb-4 overflow-hidden rounded-lg ${
      size ? 'h-[350px]' : 'h-[250px]'
    }`}
  >
    <Image
      src={src}
      alt="Performer"
      fill
      className="object-cover rounded-lg"
    />
  </div>
);





export default Hero;
