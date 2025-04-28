import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import CenteredBanner from './CenteredBanner'; // adjust path as needed
import { useDispatch, useSelector } from "react-redux";

// Define artist type
type Artist = {
  id: number;
  name: string;
  location: string;
  price: string;
  imageUrl: string;
  slug: string;
};

// Artist data by region


const RegionalArtists = () => {

  const {
    productlist,
    loading: productListLoading,
    error: productListError,
  } = useSelector((state: any) => state.productlist);
 console.log("productlist", productlist);
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 space-y-12">
      {Array.isArray(productlist) && productlist.map((region) => (
          <div key={region.id} className="space-y-6">
            <h2 className="text-xl font-bold">{region.service_area}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {region.tasks.slice(0, 4).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>

            <CenteredBanner src={require("../../asset/banner2.png")} />
          </div>
        ))}
      </div>
    </section>
  );
};

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <Link href={`/service-list/${artist._id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={`https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
            alt={artist.title}
            fill
            className="object-cover"
            loading="lazy" // <-- this is optional in Next.js (defaults to lazy)
            
          />
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow-sm">
          ₹{" "}{artist.price}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-foreground mb-1">
            {artist.title}
          </h3>
          <p className="text-xs flex items-center gap-1 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-3 h-3"
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
            {"Bangalore, India"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RegionalArtists;
