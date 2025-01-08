import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BASE_URL } from "@/components/services/baseurl";
import AdBanner from "@/components/Ads/AdBanner";

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
    default: "Meme Generator - Create Custom Memes Online - Robin Nayak",
  },
  description: "Create and customize memes easily with our free online meme generator. Choose from popular templates or upload your own images.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: [
    'meme generator',
    'meme maker',
    'custom memes',
    'online meme creator',
    'free meme generator',
    'meme editor'
  ],
  authors: [{ name: 'Robin Nayak' }],
  openGraph: {
    type: 'website',
    siteName: 'Meme Generator',
    title: 'Meme Generator - Create Custom Memes Online',
    description: 'Free online tool to create and customize memes. Choose from templates or upload your own images.',
    url: `${BASE_URL}`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meme Generator - Create Custom Memes Online',
    description: 'Free online tool to create and customize memes. Choose from templates or upload your own images.',
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
    google: 'your-google-verification-code', // Add your Google Search Console verification code
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
        <main className="flex-grow pb-16">
          {children}
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <AdBanner type="social" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
