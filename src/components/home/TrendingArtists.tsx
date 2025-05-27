import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { fetchStoreData } from '@/reducer/thunks'; // Adjust path if needed

import { useDispatch, useSelector } from "react-redux";


const TrendingArtists = () => {
  const dispatch = useDispatch<any>();

   useEffect(() => {
     dispatch(fetchStoreData());
   }, [dispatch]);
 
   const { storelist, loading, error } = useSelector((state: any) => state.storelist);
 console.log("storelist", storelist);
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Trending Artists</h2>
          <Link href="/category/28" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {storelist?.filter((i: any) =>  i.price !== "0" && i.status === "1").slice(0, 8).map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Most Booked Artists</h2>
          <Link href="/category/28" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {storelist?.filter((i: any) => i.price !== "0").slice(0, 8).map((artist: any) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ArtistCard = ({ artist }: { artist: any }) => {
  return (
    <Link key={artist.id} href={`/service-list/${artist._id}`} aria-label={`View ${artist.name}`}>
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={artist.images ?  artist.images: `https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
          alt={artist.name || 'Artist Image'}
          fill
          className="object-cover"
        />
        {artist.certified === '1' && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-sm font-medium">
            Giggili Certified
          </div>
        )}
        {artist.request_call !== "true" &&  <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow-sm">
          ₹{ artist.price || 'N/A'}
        </div>}
       
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{artist.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {artist?.Categories_Name?.slice(0, 2).join(', ') || 'No categories'}
          {artist?.Categories_Name?.length > 2 && '...'}
        </p>
        <p className="text-xs flex items-center gap-1 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {'Bangalore, India'}
        </p>
      </CardContent>
    </Card>
  </Link>
  );
};

export default TrendingArtists;
