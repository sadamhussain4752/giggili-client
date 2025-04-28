"use client";

import "./globals.css";
import ClientBody from "./ClientBody";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Provider } from "react-redux";
import { stores } from "../store/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientBody>
      <Provider store={stores}> 
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        </Provider>

      </ClientBody>
    </html>
  );
}
