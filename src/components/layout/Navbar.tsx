import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileUserData } from "@/reducer/thunks";
import { MapPin } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch<any>();
  const [showMenu, setShowMenu] = useState<any>(false);
  const [locationName, setLocationName] = useState("Detecting...");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [location, setlocation] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if we're running on the client-side
    if (typeof window !== "undefined") {
      const userId: any = localStorage.getItem("tokenId");

      console.log(userId, "userId");

      // Check if userId exists in localStorage (not null or undefined)
      if (userId !== null && userId !== undefined) {
        dispatch(ProfileUserData(userId));
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBoMO9HVyopxwZ5XzMiF1Xs7DVy8SU7NqY`
            );
            const data = await res.json();
            if (data.status === "OK" && data.results.length > 0) {
              const result = data.results[0];
              const city = result.address_components.find((c: any) =>
                c.types.includes("locality")
              );
              setLocationName(city?.long_name || "Unknown Location");
              setFormattedAddress(result.formatted_address);
            } else {
              setLocationName("Location Unavailable");
            }
          } catch (error) {
            setLocationName("Error Fetching Location");
          }
        },
        () => {
          setLocationName("Location Denied");
        }
      );
    } else {
      setLocationName("Geolocation Unsupported");
    }
  }, []);

  const {
    loading: getprofileUserLoading,
    loginerror: getprofileUserError,
    getprofile: getUserResponse,
  } = useSelector((state: any) => state.getprofile);
  return (
    <header className="w-full py-4 bg-white shadow-sm relative">
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
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 font-medium"
                >
                  <span>Service List</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/category/28">DJ</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/29">Karaoke</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/30">Band</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/31">Sufi</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/32">Live Singer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/33">Musician</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Contact
          </Link>

          <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{location === "" ? "View All" : location} </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => {
                    setlocation("North Bangalore");
                  }}
                >
                  {" "}
                  North Bangalore
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setlocation("South Bangalore");
                  }}
                >
                  South Bangalore
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setlocation("East Bangalore");
                  }}
                >
                  East Bangalore
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setlocation("West Bangalore");
                  }}
                >
                  West Bangalore
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
        <div className="hidden md:flex flex-col items-start text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{locationName}</span>
          </div>
          {formattedAddress && (
            <span className="text-xs text-gray-500 truncate max-w-[200px]">
              {formattedAddress}
            </span>
          )}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:block w-64">
            <Input
              type="search"
              placeholder="Search"
              className="rounded-md border-gray-300"
            />
          </div>
          <>
            {getUserResponse && getUserResponse?.User ? (
              <div
                className="relative"
                onMouseEnter={() => setShowMenu(true)}
                onMouseLeave={() => setShowMenu(false)}
              >
                <Link href="#" className="flex items-center space-x-2">
                  <Image
                    src={`https://giggili.com/assets/uploads/media-uploader/ruan-richard-rodrigues-pns2rubybng-unsplash-11732845880.jpg`}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">
                    {getUserResponse?.User.name}
                  </span>
                </Link>

                {showMenu && (
                  <div className="absolute top-30 right-0 bg-white shadow-md rounded-md p-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2"
                    >
                      <button
                        onClick={() => {}}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("tokenId");
                        window.location.reload(); // Add the missing parentheses here
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild className="font-medium">
                  <Link href="/register">Sign Up</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white font-medium"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </>
        </div>

        {/* Mobile Menu Button - for smaller screens */}
        <Button
          variant="ghost"
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </Button>

        {mobileMenuOpen && (
  <div className="absolute top-full left-0 w-full bg-white z-50 shadow-md px-4 py-4 space-y-4 md:hidden">
    <div className="relative group">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center space-x-1 font-medium"
            onClick={() => setMobileMenuOpen(false)} // Close menu when the dropdown is clicked
          >
            <span>Service List</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/category/28" onClick={() => setMobileMenuOpen(false)}>DJ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/category/29" onClick={() => setMobileMenuOpen(false)}>Karaoke</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/category/30" onClick={() => setMobileMenuOpen(false)}>Band</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/category/31" onClick={() => setMobileMenuOpen(false)}>Sufi</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/category/32" onClick={() => setMobileMenuOpen(false)}>Live Singer</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/category/33" onClick={() => setMobileMenuOpen(false)}>Musician</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <Link href="/about" className="block font-medium" onClick={() => setMobileMenuOpen(false)}>
      About
    </Link>
    <Link href="/contact" className="block font-medium" onClick={() => setMobileMenuOpen(false)}>
      Contact
    </Link>
    <div className="border-t pt-4">
      <label
        htmlFor="location"
        className="block text-sm font-medium mb-2 text-gray-700"
      >
        Select Location
      </label>
      <select
        id="location"
        className="block w-50 border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        value={location}
        onChange={(e) => {
          setlocation(e.target.value);
          setMobileMenuOpen(false);
        }}
      >
        <option value="">location-</option>
        <option value="North Bangalore">North Bangalore</option>
        <option value="South Bangalore">South Bangalore</option>
        <option value="East Bangalore">East Bangalore</option>
        <option value="West Bangalore">West Bangalore</option>
      </select>
    </div>

    <div className="pt-4 border-t">
      {getUserResponse?.User ? (
        <>
          <p className="text-sm font-medium mb-2">
            {getUserResponse.User.name}
          </p>
          <Link href="/profile" className="block text-sm text-blue-600" onClick={() => setMobileMenuOpen(false)}>
            Profile
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("tokenId");
              window.location.reload();
              setMobileMenuOpen(false); // Close the menu after logging out
            }}
            className="block text-sm text-red-600 mt-2"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
          </Button>
          <Button className="bg-primary text-white" asChild>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
          </Button>
        </div>
      )}
    </div>
  </div>
)}

      </div>
    </header>
  );
};

export default Navbar;
