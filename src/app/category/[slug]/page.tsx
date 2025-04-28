'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreData } from '@/reducer/thunks';

export default function ServiceListPage() {
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchStoreData());
  }, [dispatch]);

  const { storelist, loading, error } = useSelector((state: any) => state.storelist);

  const GENRES = useMemo(
    () => [
      'Bollywood and Punjabi',
      'House and Techno',
      'English commercial',
      'Hip Hop & RnB',
      'Techno',
      'Afro House',
      'Retro',
      'Melodic House',
    ],
    []
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return storelist?.slice(startIndex, startIndex + itemsPerPage) || [];
  }, [storelist, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil((storelist?.length || 0) / itemsPerPage);
  }, [storelist]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderArtistCard = (artist: any) => (
    <Link key={artist.id} href={`/service-list/${artist._id}`} aria-label={`View ${artist.name}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={`https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
            alt={artist.name || 'Artist Image'}
            fill
            className="object-cover"
          />
          {artist.certified === '1' && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-sm font-medium">
              Giggili Certified
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow-sm">
            ₹{artist.price || 'N/A'}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-1">{artist.name}</h3>
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
            {artist.location || 'Bangalore, India'}
          </p>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-background to-gray-100 rounded-xl mb-12 overflow-hidden">
          <div className="p-8 md:p-12 md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover DJs That Move the Crowd
            </h1>
            <Button className="bg-primary hover:bg-primary/90 mt-4">Find an Artist</Button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 hidden md:block">
            <Image
              src="https://ext.same-assets.com/1808818058/2213424676.jpeg"
              alt="DJ Crowd"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap gap-3">
          {GENRES.map((genre) => (
            <Button key={genre} variant="outline" className="text-sm">
              {genre}
            </Button>
          ))}
          <Button variant="outline" className="text-sm">Express Booking</Button>
          <Button variant="outline" className="text-sm">VIP</Button>
        </div>

        {/* Content Section */}
        {loading ? (
          <p className="text-center">Loading artists...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading data: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(paginatedData) && paginatedData.length > 0
              ? paginatedData.map(renderArtistCard)
              : <p className="text-center col-span-full">No artists found.</p>}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-10 h-10 p-0"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                &lt;
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  className="w-10 h-10 p-0"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                className="w-10 h-10 p-0"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
