import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'CSE 435 Project - HFD1',
    description: 'CSE 435 Software Engineering project website featuring team information, resources, and project documentation.',
    openGraph: {
        title: 'CSE 435 Project - Software Engineering',
        description: 'CSE 435 Software Engineering project website featuring team information, resources, and project documentation.',
        url: 'https://cse-435-hfd1.vercel.app/',
        siteName: 'CSE 435 Project',
        images: [
            {
                url: 'https://cse-435-hfd1.vercel.app/og-image.png',
                width: 1200,
                height: 630,
                alt: 'CSE 435 Project',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-12">
              {children}
          </main>
          <Footer />
      </div>
      </body>
    </html>
  );
}
