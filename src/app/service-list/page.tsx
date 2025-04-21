import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Artist data
const ARTISTS = [
  {
    id: 201,
    name: 'Vipul Khurana',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB', 'Techno', 'Afro House'],
    imageUrl: 'https://ext.same-assets.com/1887355265/125209397.jpeg',
    slug: 'vipul-khurana',
    certified: true
  },
  {
    id: 202,
    name: 'DJ Vihaan',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB', 'Techno', 'Afro House'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-vihaan'
  },
  {
    id: 204,
    name: 'DJ Ansh',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-ansh'
  },
  {
    id: 205,
    name: 'DJ Harsxit',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB', 'Retro', 'Melodic House', 'Techno', 'Afro House'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-harsxit'
  },
  {
    id: 206,
    name: 'Xsquaremusic',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB', 'Retro', 'Melodic House', 'Techno', 'Afro House'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'xsquaremusic'
  },
  {
    id: 207,
    name: 'DJ Melvin',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'English commercial', 'Hip Hop & RnB'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-melvin'
  },
  {
    id: 208,
    name: 'Dj Katz',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB', 'Melodic House', 'Techno', 'Afro House'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-katz'
  },
  {
    id: 209,
    name: 'Dj Basavaraj',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'English commercial', 'Retro'],
    imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
    slug: 'dj-basavaraj'
  }
];

// Genres/tags for filtering
const GENRES = [
  'Bollywood and Punjabi',
  'House and Techno',
  'English commercial',
  'Hip Hop & RnB',
  'Techno',
  'Afro House',
  'Retro',
  'Melodic House'
];

export default function ServiceListPage() {
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
          <Button variant="outline" className="text-sm">
            Express Booking
          </Button>
          <Button variant="outline" className="text-sm">
            VIP
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISTS.map((artist) => (
            <Link key={artist.id} href={`/service-list/${artist.slug}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                  {artist.certified && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-sm font-medium">
                      Giggili Certified
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs rounded shadow-sm">
                    {artist.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-1">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {artist.tags.slice(0, 2).join(', ')}
                    {artist.tags.length > 2 && '...'}
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
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="w-10 h-10 p-0 rounded-md flex items-center justify-center" disabled>
              &lt;
            </Button>
            <Button variant="default" className="w-10 h-10 p-0 rounded-md flex items-center justify-center">
              1
            </Button>
            <Button variant="outline" className="w-10 h-10 p-0 rounded-md flex items-center justify-center">
              2
            </Button>
            <Button variant="outline" className="w-10 h-10 p-0 rounded-md flex items-center justify-center">
              3
            </Button>
            <Button variant="outline" className="w-10 h-10 p-0 rounded-md flex items-center justify-center">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
