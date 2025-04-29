
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileUserData } from "@/reducer/thunks";


const Navbar = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    // Check if we're running on the client-side
    if (typeof window !== "undefined") {
      const userId : any= localStorage.getItem("tokenId");

      console.log(userId, "userId");

      // Check if userId exists in localStorage (not null or undefined)
      if (userId !== null && userId !== undefined) {
        dispatch(ProfileUserData(userId));
      }
    }
  }, [dispatch]);

  const {
    loading: getprofileUserLoading,
    loginerror: getprofileUserError,
    getprofile: getUserResponse,
  } = useSelector((state: any) => state.getprofile);
  return (
    <header className="w-full py-4 bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="https://ext.same-assets.com/1887355265/3176037600.png"
            alt="Giggili Logo"
            width={130}
            height={50}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 font-medium">
                  <span>Service List</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/category/live-singer">DJ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/live-singer">Karaoke</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/live-singer">Band</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/live-singer">Sufi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/live-singer">Live Singer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/live-singer">Musician</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">About</Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</Link>

          <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>View All</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>North Bangalore</DropdownMenuItem>
                <DropdownMenuItem>South Bangalore</DropdownMenuItem>
                <DropdownMenuItem>East Bangalore</DropdownMenuItem>
                <DropdownMenuItem>West Bangalore</DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:block w-64">
            <Input
              type="search"
              placeholder="Search"
              className="rounded-md border-gray-300"
            />
          </div>
           {getUserResponse && getUserResponse?.User ? <div>
            <Link href="/profile" className="flex items-center space-x-2">
              <Image
                src={`https://giggili.com/assets/uploads/media-uploader/ruan-richard-rodrigues-pns2rubybng-unsplash-11732845880.jpg`}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{getUserResponse?.User.artist_name}</span>
            </Link>
           </div> :  <div className="flex items-center space-x-2">
            <Button variant="outline" asChild className="font-medium">
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>}
         
        </div>

        {/* Mobile Menu Button - for smaller screens */}
        <Button variant="ghost" className="md:hidden p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
