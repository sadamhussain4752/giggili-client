import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giggili - Entertainment Delivered to Your Doorstep",
  description: "Book DJs, Live Singers, Bands, Musicians and more for your events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </ClientBody>
    </html>
  );
}
