'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // optional icons

const images = [
  require('../../asset/Rectangle 1.png'),
  require('../../asset/Rectangle 2.png'),
  require('../../asset/Rectangle 3.png'),
  require('../../asset/Rectangle 4.png'),
];

const PerformerSlider = () => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1.5,
          spacing: 12,
        },
      },
    },
  });

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4"> 
    <div className="relative ">
      {/* Left Arrow */}
      <button
        onClick={() => slider.current?.prev()}
        className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {images.map((img, idx) => (
          <div className="keen-slider__slide" key={idx}>
            <div className="relative h-44 w-full rounded-lg overflow-hidden">
              <Image src={img} alt={`Performer ${idx}`} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => slider.current?.next()}
        className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
    </div> </section>
  );
};

export default PerformerSlider;
