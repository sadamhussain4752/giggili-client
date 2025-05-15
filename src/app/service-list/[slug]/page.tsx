'use client';

import { use } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VerifyOTP } from '@/reducer/thunks'; // Adjust path if needed

type Package = {
  id: number;
  name: string;
  price: string;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};


const initialReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing performance! Really enjoyed the experience.",
    date: "2024-05-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Very talented artist. Would definitely book again.",
    date: "2024-04-28",
  },
  {
    id: 3,
    name: "Raj Kumar",
    rating: 5,
    comment: "Excellent vibe and presence. Made our event memorable!",
    date: "2024-04-20",
  },
];

export default function ArtistDetailPage({ params }: Props) {
  const { slug } = use(params); // Unwrapping Promise from App Router

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (slug) {
      dispatch(VerifyOTP(slug));
    }
  }, [dispatch, slug]);

  const {
    servicelist: artist,
    loadinglist,
    error,
  } = useSelector((state: any) => state.servicelist);
  if (loadinglist) return <div className="text-center py-20">Loading...</div>;
  if (!artist) {
    return <div className="text-center py-20">Loading...</div>
  }
  return (
    // <div className="bg-background">
    //   {/* Cover Image and Profile */}
    //   <div className="relative h-[300px] md:h-[400px]">
    //     {artist?.seller_image && (
    //       <Image
    //         src={`https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
    //         alt={`${artist?.title || 'Artist'} Cover Image`}
    //         fill
    //         className="object-cover"
    //         priority
    //       />
    //     )}
    //     <div className="absolute -bottom-16 left-8 md:left-16 w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white">
    //       {artist?.seller_image && (
    //         <Image
    //           src={`https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
    //           alt={`${artist?.title || 'Artist'} Profile Image`}
    //           fill
    //           className="object-cover"
    //         />
    //       )}
    //     </div>
    //   </div>

    //   <div className="container mx-auto px-4 pt-20 pb-12">
    //     {/* Artist Info */}
    //     <div className="flex flex-col md:flex-row justify-between items-start mb-12">
    //       <div>
    //         <h1 className="text-3xl font-bold mb-2">{artist?.title}</h1>
    //         <div className="flex items-center gap-2 text-muted-foreground">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             className="w-4 h-4"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    //             />
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    //             />
    //           </svg>
    //           {artist?.location || 'Bangalore, India'}
    //         </div>
    //         <div className="flex flex-wrap gap-2 mt-4">
    //           {artist?.Categories_Name?.map((tag: string) => (
    //             <span
    //               key={`${artist.id}-${tag}`}
    //               className="bg-primary text-white text-xs px-3 py-1 rounded-full"
    //             >
    //               {tag}
    //             </span>
    //           ))}
    //         </div>
    //       </div>

    //       <div className="mt-4 md:mt-0 flex items-center gap-2">

    //       <Link href={`/service-list/artist/${artist?._id}`} >
    //         <Button variant="outline" className="flex items-center gap-2">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             className="w-5 h-5"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M14 5l7 7m0 0l-7 7m7-7H3"
    //             />
    //           </svg>
    //           Know your artist
    //         </Button>
    //         </Link>
    //         <p className="text-lg font-semibold">
    //           {/* <span className="text-sm font-normal">From: </span> */}
    //           {/* {artist?.price || '₹0.00'} */}
    //         </p>
    //       </div>
    //     </div>

    //     <hr className="my-8 border-muted" />

    //     {/* Packages Section */}
    //     <div className="mb-10">
    //       <h2 className="text-2xl font-bold mb-6">Package</h2>
    //       <Card className="border border-muted">
    //         <CardContent className="p-6">
    //           <div className="flex justify-between items-center mb-4">
    //             <h3 className="text-xl font-semibold">{artist?.price}</h3>
    //           </div>

    //           <h4 className="text-lg font-medium mb-4">
    //             Available Service Packages
    //           </h4>

    //           <ul className="space-y-3 mb-6">
    //             {artist?.packages?.map((pkg: Package) => (
    //               <li
    //                 key={pkg.id}
    //                 className="flex items-center gap-2 text-sm text-muted-foreground"
    //               >
    //                 <span className="h-5 w-5 rounded-full border border-primary flex items-center justify-center text-primary">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     stroke="currentColor"
    //                     className="w-3 h-3"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       strokeWidth={2}
    //                       d="M5 13l4 4L19 7"
    //                     />
    //                   </svg>
    //                 </span>
    //                 {pkg.name} - {pkg.price}
    //               </li>
    //             ))}
    //           </ul>

    //           <Link href={`/checkout/${artist?._id}`} >
    //             <Button className="w-full">Book Now</Button>
    //           </Link>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-background">



      {/* Two-column layout */}
      <div className="container mx-auto px-4 pt-20 pb-12 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Banner */}
          <div className="w-full md:w-8/12 mb-2 md:mb-0 h-[380px]">
            <Image
              src={`https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
              alt="Event Banner"
              width={1200}
              height={300}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>




          {/* Right: Booking Card */}
          <div className="w-full md:w-4/12">
            <div className="sticky top-24 z-10">
              <Card className="border border-muted shadow-lg">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-2">{artist.date}</p>
                  <p className="font-semibold text-lg mb-2">{artist.time}</p>
                  <p className="mb-2">Age: {artist.age_limit}</p>
                  <p className="mb-2">Languages: {artist.languages.join(', ')}</p>

                  <p className="mb-2">Genre: {artist.genre}</p>
                  <p className="mb-4">
                    Location: {artist.location}
                  </p>
                  <div className="font-bold text-xl mb-2">₹{artist.price} onwards</div>
                  <Link href={`/checkout/${artist._id}`}>
                    <Button className="w-full">Book Now</Button>
                  </Link>
                  <p className="text-xs text-orange-500 mt-2">Filling Fast</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="container mx-auto px-4  pb-12 ">
        {/* Basic Info Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {artist?.title || "Artist Name"}
            </h1>
            <p className="text-muted-foreground mb-2">
              {artist?.short_description || "No short description provided."}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              {artist?.location || "Bangalore, India"}
            </div>
            {/* Category Tags */}
            {artist?.Categories_Name?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {artist.Categories_Name.map((tag: string) => (
                  <span
                    key={`${artist.id}-${tag}`}
                    className="bg-primary text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Booking Info */}
          <div className="mt-4 md:mt-0 flex items-center gap-4">

            <div className="text-lg font-semibold">
              {/* <span className="text-sm font-normal">From: </span> */}
              {/* {artist?.price || "₹0.00"} */}
            </div>
          </div>
        </div>

        {/* Full Description */}
        {artist?.description && (
          <section className="mb-10 prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About the Artist</h2>
            <p>{artist.description}</p>
          </section>
        )}

        {/* Service Packages */}


        {/* About the Event */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">About the Venue</h2>
          <p className="text-muted-foreground">
            Join us for an unforgettable night of music, dance, and celebration
            with the best talents from across the country!
          </p>
        </section>

        {/* Facilities and Experience */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Facilities</h2>
            <ul className="list-disc list-inside text-muted-foreground">
              <ul>
                {artist.facilities.map((faci: any, index: any) => (
                  <li key={index}>{faci}</li>
                ))}
              </ul>

            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Years of Experience</h2>
            <p className="text-muted-foreground">
              {artist.experience}
            </p>
          </div>
        </section>

        {/* Artist Image with Likes */}
        <section className="mb-10 text-start">
          <h2 className="text-2xl font-bold mb-4">Featured Artist</h2>
          <div className="flex flex-col items-start gap-2">
            <Image
              src={`https://giggili.com/assets/uploads/media-uploader/${artist?.seller_image || "placeholder.jpg"
                }`}
              alt="Artist"
              width={200}
              height={200}
              className="rounded object-cover"
            />
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                4.42 3 7.5 3c1.74 0 3.41 0.81 
                4.5 2.09C13.09 3.81 14.76 3 
                16.5 3 19.58 3 22 5.42 22 
                8.5c0 3.78-3.4 6.86-8.55 
                11.54L12 21.35z"
                />
              </svg>
              <span>1.2k Likes</span>
            </div>
          </div>
        </section>

        {/* M-Ticket */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">M-Ticket</h2>
          <p className="text-muted-foreground">
            Your entry will be confirmed via SMS and Email. No printout
            required. Just show the M-Ticket at the entry gate.
          </p>
        </section>

        {/* About the Venue */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">About The Venue</h2>
          <p className="text-muted-foreground">
            The Grand Arena, Bangalore - A state-of-the-art venue equipped with
            modern acoustics, seating, and lighting arrangements.
          </p>
        </section>

        {/* Terms & Conditions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Entry allowed for individuals aged 18 and above only.</li>
            <li>No refunds on purchased tickets are possible.</li>
            <li>Right of admission reserved by the organizers.</li>
            <li>Unauthorized recording is prohibited.</li>
          </ul>
        </section>

        {/* You May Also Like */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <CardContent className="p-4">
                  <Image
                    src={`https://giggili.com/assets/uploads/media-uploader/${artist.seller_image}`}
                    alt={`Recommended Artist ${item}`}
                    width={300}
                    height={180}
                    className="rounded mb-3 object-cover"
                  />
                  <h4 className="font-semibold text-lg">Artist {item}</h4>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Privacy Note */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-4">Privacy Note</h2>
          <p className="text-muted-foreground">
            Your personal information is kept confidential and secure. We do not
            share your details with any third party without consent.
          </p>
        </section>

        {/* Reviews Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {artist.reviews && artist.reviews.map((review: any, index: number) => (
  <Card key={review.id || index} className="shadow-md">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-semibold">{review.name}</h4>
        <div className="text-xs text-muted-foreground">
          {review.date}
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(review.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.382 2.46a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.382 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.62 9.394c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {review.comment}
      </p>
    </CardContent>
  </Card>
))}

          </div>
        </section>
      </div>
    </div>
  );
}
