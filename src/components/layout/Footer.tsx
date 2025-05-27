import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  AtSign,
  MapPin,
  Phone
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-12 bg-gradient-to-t from-[#f7e9f0] to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="block mb-4">
              <Image
                src="https://ext.same-assets.com/1887355265/698896015.png"
                alt="Giggili Logo"
                width={130}
                height={50}
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              It is a long established fact that a reader will be distracted by the
              readable content of a page when looking at its layout. The point of
              using Lorem Ipsum is that it has a more-or-less.
            </p>
          </div>

          {/* Quick Links */}
        

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-medium mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/category/28" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Service List
                </Link>
              </li>
              {/* <li>
                <Link href="/category/28" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Become an Artist
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-medium mb-4 text-foreground">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Bengaluru Urban, Karnataka, 560002
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  + 918123382771
                </span>
              </li>
              <li className="flex items-center gap-2">
                <AtSign className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  contact@giggili.com
                </span>
              </li>
            </ul>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <Link href="https://www.facebook.com/profile.php?id=61568805868280" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/giggili_?igsh=cDMyazRkbXJkaXRt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://x.com/search?q=Giggili&src=typed_query" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/giggili/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="https://www.youtube.com/@Giggili" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium mb-4 text-foreground">Social Links</h3>
            <div className="flex space-x-4 mt-4">
              <Link href="https://www.facebook.com/profile.php?id=61568805868280" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/giggili_?igsh=cDMyazRkbXJkaXRt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://x.com/i/flow/login?redirect_after_login=%2FGiggili238160" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/company/giggili/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="https://www.youtube.com/@Giggili" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-muted pt-4 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-primary">
                Terms & Conditions
              </Link>
              <Link href="/cancellation-and-refund" className="hover:text-primary">
                Cancellation and refund
              </Link>
              <Link href="/payment-policy" className="hover:text-primary">
                Payment Policy
              </Link>
            </div>

            <div className="text-xs text-muted-foreground">
              All copyright © 2025 Reserved
            </div>

            <div>
              <Image
                src={require("../../asset/images.png")}
                alt="Cashfree Payments"
                width={120}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Link */}
      <div className="fixed bottom-6 right-6 z-50">
         <Link
    href="tel:+918123382771"
    className="bg-blue-500 text-white p-3 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors mb-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.39 21.23 2.77 13.61 2.77 4a1 1 0 011-1H7.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
    </svg>
  </Link>
        <Link
          href="https://api.whatsapp.com/send?phone=918123382771&text=Hi"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.61.39 3.19 1.13 4.6L2 21l4.59-1.2c1.36.72 2.89 1.1 4.45 1.1 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 012.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.12-.23-.19-.48-.31z" />
          </svg>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
