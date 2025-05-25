'use client';

import { use } from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreData } from '@/reducer/thunks';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ServiceListPage({ params }: Props) {
  const { slug } = use(params); // Unwrapping Promise from App Router
  console.log(slug, "slug");

  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchStoreData());
  }, [dispatch]);

  const { storelist, loading, error } = useSelector((state: any) => state.storelist);

  const filteredData = useMemo(() => {
    if (!slug) return storelist; // No filter if slug is empty
    return storelist?.filter((artist: any) => artist?.service_area_id === slug  && artist.price !== "0" && artist.status === "1") || [];
  }, [storelist, slug]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData?.length / itemsPerPage);
  }, [filteredData]);

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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
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
