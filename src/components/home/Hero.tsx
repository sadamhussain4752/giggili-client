import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MultiStepModal from "../MultiStepModal";
import { useRouter } from "next/navigation";

interface ImageCardProps {
  src: StaticImageData;
  size: boolean;
}
const Hero = () => {
  const router = useRouter(); // use `useRouter()` from next/router

  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingview, setBookingView] = useState('');

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
            <h3 className="text-md font-semibold text-start mb-6">
              What are you looking for?
            </h3>
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
                href="/category/29"
              />
              <CategoryCard
                title="Band"
                iconSrc="https://ext.same-assets.com/1887355265/1389202622.png"
                href="/category/30"
              />
              <CategoryCard
                title="Musician"
                iconSrc="https://ext.same-assets.com/1887355265/2072431407.png"
                href="/category/31"
              />
              <CategoryCard
                title="Karaoke"
                iconSrc="https://ext.same-assets.com/1887355265/2759589883.png"
                href="/category/32"
              />
              <CategoryCard
                title="Sufi"
                iconSrc="https://ext.same-assets.com/1887355265/3277607109.png"
                href="/category/33"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="columns-1 sm:columns-2 gap-4">
          <ImageCard src={require("../../asset/Homebanner1.jpg")} size={true} />
          <ImageCard
            src={require("../../asset/Homebanner3.jpg")}
            size={false}
          />
          <ImageCard
            src={require("../../asset/Homebanner22.jpg")}
            size={false}
          />
          <ImageCard src={require("../../asset/Homebanner4.png")} size={true} />
        </div>
      </div>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Choose Booking Type</h2>
            <div className="flex justify-between gap-4">
              <Link href="#" className="flex-1" onClick={() => setIsModalOpen(true)}>
                <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow cursor-pointer transition">
                  <Image
                    src="https://giggili.com/assets/uploads/media-uploader/express-delivery1734088773.png"
                    alt="Express"
                    width={40}
                    height={40}
                    onClick={() => {
                      setBookingView("Express Booking"),
                      setIsModalOpen(true)}}
                  />
                  <span className="mt-2 text-sm font-medium">
                    Express Booking
                  </span>
                </div>
              </Link>
              <Link href="#" className="flex-1" onClick={() => setIsModalOpen(true)}>
                <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow cursor-pointer transition">
                  <Image
                    src="https://giggili.com/assets/uploads/media-uploader/booking1734088770.png"
                    alt="Regular"
                    width={40}
                    height={40}
                      onClick={() => {
                      setBookingView("Regular Booking"),
                      setIsModalOpen(true)}}
                  />
                  <span className="mt-2 text-sm font-medium">
                    Regular Booking
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      <MultiStepModal
        isOpen={isModalOpen}
        bookingview={bookingview}
        onClose={() => {
          setIsModalOpen(false);
          router.push("/category/28");
        }}
        
      />
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center justify-center p-3 border border-[#ffffff] rounded-lg bg-white hover:border-[#f97316] transition"
      >
        <div className="w-10 h-10 relative mb-2">
          <Image src={iconSrc} alt={title} fill className="object-contain" />
        </div>
        <h4 className="text-sm text-center font-medium text-[#333]">{title}</h4>
      </motion.div>
    </Link>
  );
};

const ImageCard: React.FC<ImageCardProps> = ({ src, size }) => (
  <motion.div
    className={`relative mb-4 overflow-hidden rounded-lg ${
      size ? "h-[350px]" : "h-[250px]"
    }`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Image src={src} alt="Performer" fill className="object-cover rounded-lg" />
  </motion.div>
);

export default Hero;
