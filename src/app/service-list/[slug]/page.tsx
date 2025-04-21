import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Define types
type Package = {
  id: number;
  name: string;
  price: string;
};

type Artist = {
  id: number;
  name: string;
  location: string;
  price: string;
  tags: string[];
  imageUrl: string;
  coverImage: string;
  slug: string;
  packages: Package[];
  description: string;
};

type ArtistRecord = {
  [key: string]: Artist;
};

// Mock data store for artists
const ARTISTS: ArtistRecord = {
  'dj-ansh': {
    id: 204,
    name: 'DJ Ansh',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'DJ'],
    imageUrl: 'https://ext.same-assets.com/559902380/2334853538.jpeg',
    coverImage: 'https://ext.same-assets.com/559902380/3759930297.jpeg',
    slug: 'dj-ansh',
    packages: [
      {
        id: 1,
        name: '90 minutes session',
        price: '₹0.00'
      }
    ],
    description: ''
  },
  'vipul-khurana': {
    id: 201,
    name: 'Vipul Khurana',
    location: 'Bangalore, India',
    price: '₹0.00',
    tags: ['Bollywood and Punjabi', 'House and Techno', 'English commercial', 'Hip Hop & RnB', 'Techno', 'Afro House'],
    imageUrl: 'https://ext.same-assets.com/1887355265/125209397.jpeg',
    coverImage: 'https://ext.same-assets.com/1887355265/125209397.jpeg',
    slug: 'vipul-khurana',
    packages: [
      {
        id: 1,
        name: '90 minutes session',
        price: '₹0.00'
      },
      {
        id: 2,
        name: '120 minutes session',
        price: '₹5,000.00'
      }
    ],
    description: ''
  }
};

// Generate static params for all artists
export function generateStaticParams() {
  // Get all the keys (slugs) from the ARTISTS object
  return Object.keys(ARTISTS).map(slug => ({
    slug
  }));
}

type Props = {
  params: {
    slug: string
  }
}

export default function ArtistDetailPage({ params }: Props) {
  // In a real app, we would fetch the artist data based on the slug
  // Here we're using mock data
  const artist = ARTISTS[params.slug] || ARTISTS['dj-ansh']; // Default to DJ Ansh if not found

  return (
    <div className="bg-background">
      {/* Cover Image and Profile */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={artist.coverImage}
          alt={`${artist.name} Cover Image`}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute -bottom-16 left-8 md:left-16 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white">
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-12">
        {/* Artist Info */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {artist.location}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {artist.tags.map((tag: string) => (
                <span
                  key={`${artist.id}-${tag}`}
                  className="bg-primary text-white text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Know your artist
            </Button>
            <p className="text-lg font-semibold">
              <span className="text-sm font-normal">From: </span>
              {artist.price}
            </p>
          </div>
        </div>

        <hr className="my-8 border-muted" />

        {/* Packages Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Package</h2>
          <Card className="border border-muted">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{artist.price}</h3>
              </div>

              <h4 className="text-lg font-medium mb-4">Available Service Packages</h4>
              <ul className="space-y-3 mb-6">
                {artist.packages.map((pkg: Package) => (
                  <li key={pkg.id} className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full border border-primary flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {pkg.name}
                  </li>
                ))}
              </ul>
             <Link  href={`/checkout`}>
             <Button className="w-full">Book Now</Button>
             </Link>
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
