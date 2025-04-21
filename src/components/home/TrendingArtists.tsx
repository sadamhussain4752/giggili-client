import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const TRENDING_ARTISTS = [
  {
    id: 1,
    name: 'Nayab The Band',
    genres: ['Bollywood and Punjabi', 'Retro'],
    location: 'Bangalore, India',
    price: '₹0.00',
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'nayab-the-band'
  },
  {
    id: 2,
    name: 'Dj Basavaraj',
    genres: ['Bollywood and Punjabi', 'English commercial', 'Retro'],
    location: 'Bangalore, India',
    price: '₹0.00',
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-basavaraj'
  },
  {
    id: 3,
    name: 'Testsadas',
    genres: ['Bollywood and Punjabi', 'House and Techno', 'English commercial'],
    location: 'Bangalore, India',
    price: '₹4,999.00',
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'testsadas'
  },
  {
    id: 4,
    name: 'DJ Saurabh',
    genres: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB'],
    location: 'Bangalore, India',
    price: '₹0.00',
    imageUrl: 'https://ext.same-assets.com/1887355265/1137231418.jpeg',
    slug: 'dj-saurabh'
  }
];

const TrendingArtists = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Trending Artists</h2>
          <Link href="/service-list" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_ARTISTS.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ArtistCard = ({ artist }: { artist: typeof TRENDING_ARTISTS[number] }) => {
  return (
    <Link href={`/service-list/${artist.slug}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow-sm">
            {artist.price}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-1">{artist.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {artist.genres.slice(0, 2).join(', ')}
            {artist.genres.length > 2 && '...'}
          </p>
          <p className="text-xs flex items-center gap-1 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {artist.location}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TrendingArtists;
