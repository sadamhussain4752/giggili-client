import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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
const REGIONS = [
  {
    id: 'north',
    name: 'North Bangalore',
    artists: [
      {
        id: 101,
        name: 'Dj Harsh Bhutani',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-harsh-bhutani'
      },
      {
        id: 102,
        name: 'Dj Nick8',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-nick8'
      },
      {
        id: 103,
        name: 'DJ VIJJU',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-vijju'
      },
      {
        id: 104,
        name: 'Dj yash',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-yash'
      }
    ]
  },
  {
    id: 'east',
    name: 'East Bangalore',
    artists: [
      {
        id: 201,
        name: 'Vipul Khurana',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/125209397.jpeg',
        slug: 'vipul-khurana'
      },
      {
        id: 202,
        name: 'DJ Vihaan',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-vihaan'
      },
      {
        id: 203,
        name: 'DJ Rauny',
        location: 'Bangalore, India',
        price: '₹4,999.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-rauny'
      },
      {
        id: 204,
        name: 'DJ Ansh',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-ansh'
      }
    ]
  },
  {
    id: 'south',
    name: 'South Bangalore',
    artists: [
      {
        id: 301,
        name: 'Saket Maskara',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'saket-maskara'
      },
      {
        id: 302,
        name: 'AKSHAR',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'akshar'
      },
      {
        id: 303,
        name: 'DJ VARUN',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-varun'
      },
      {
        id: 304,
        name: 'DJ Massy',
        location: 'Bangalore, India',
        price: '₹0.00',
        imageUrl: 'https://ext.same-assets.com/1887355265/406590761.png',
        slug: 'dj-massy'
      }
    ]
  }
];

const RegionalArtists = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 space-y-12">
        {REGIONS.map((region) => (
          <div key={region.id} className="space-y-6">
            <h2 className="text-xl font-bold">{region.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {region.artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <Link href={`/service-list/${artist.slug}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
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
          <h3 className="font-semibold text-lg text-foreground mb-1">{artist.name}</h3>
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

export default RegionalArtists;
