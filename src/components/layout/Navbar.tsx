import React from 'react';
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

const Navbar = () => {
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
                  <Link href="/service-list/category/dj">DJ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-list/category/karaoke">Karaoke</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-list/category/band">Band</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-list/category/sufi">Sufi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-list/category/live-singer">Live Singer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/service-list/category/musician">Musician</Link>
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
                <DropdownMenuItem>All Locations</DropdownMenuItem>
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

          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild className="font-medium">
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
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
