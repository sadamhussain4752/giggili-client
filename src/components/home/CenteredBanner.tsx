// components/CenteredBanner.tsx

import React from 'react';
import Image from 'next/image';

interface CenteredBannerProps {
  src: string;
}

const CenteredBanner: React.FC<CenteredBannerProps> = ({ src }) => {
  return (
    <div className="w-full py-10 px-4 flex justify-center bg-[#FFF9F3]">
      <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-md">
        <div className="relative w-full h-72 md:h-[400px] lg:h-[580px]">
          <Image
            src={src}
            alt="Center Banner"
            fill
            className="object-cover"
            priority
            // placeholder="blur" // Uncomment this if you use blurDataURL
          />
        </div>
      </div>
    </div>
  );
};

export default CenteredBanner;
