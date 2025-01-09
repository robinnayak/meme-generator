import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BASE_URL } from "@/components/services/baseurl";
import {SocialAd } from "@/components/Ads/AdBanner";
import Script from 'next/script';
import AdillaAd from "@/components/Ads/AdillaAd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Meme Generator",
    default: "Meme Generator Nepal - Create Custom Memes Online - Robin Nayak",
  },
  description: "Create and customize memes easily with Nepal's free online meme generator. Choose from popular templates or upload your own images to create unique memes.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    'meme generator nepal',
    'nepali meme maker',
    'custom memes nepal',
    'online meme creator nepal',
    'free meme generator nepal',
    'meme editor nepal',
    'nepali memes'
  ],
  authors: [{ name: 'Robin Nayak' }],
  openGraph: {
    type: 'website',
    siteName: 'Meme Generator Nepal',
    title: 'Meme Generator Nepal - Create Custom Memes Online',
    description: 'Nepal\'s free online tool to create and customize memes. Choose from templates or upload your own images to create Nepali memes.',
    url: `${BASE_URL}`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meme Generator Nepal - Create Custom Memes Online',
    description: 'Nepal\'s free online tool to create and customize memes. Choose from templates or upload your own images to create Nepali memes.',
    creator: '@robinnayak'  // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'h1DINKQoi5w392Qk_PdkpruK09IRyoJtXTJrrZtlOu4',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JX3S8TX2ZH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JX3S8TX2ZH');
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR-AD-CLIENT-ID"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col`}
      >
        <Navbar />
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <AdillaAd type="Banner" />
        </div>
        <main className="flex-grow pb-16">
          {children}
        </main>
        <SocialAd style={{ margin: '0 auto' }} />
        <Footer />
      </body>
    </html>
  );
}
