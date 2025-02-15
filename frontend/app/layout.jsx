"use client";
import { Inter } from "next/font/google";
import "../assets/styles/globals.css";  

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function Layout({ children }) {
  return (
    <html lang="en" className="w-full h-full bg-gradient1">
      <body className={`${inter.className} w-full min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
