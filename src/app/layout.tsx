import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/provider/QueryProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stream Nest - AI-Powered Video Platform",
  description:
    "The next-generation video platform powered by AI. Upload in seconds, stream in 4K, and connect with millions of creators worldwide.",

  // Keywords for SEO
  keywords: [
    "video platform",
    "streaming",
    "AI-powered",
    "4K streaming",
    "content creators",
    "video sharing",
    "live streaming",
    "video upload",
    "social media",
    "creator economy",
    "video community",
    "streaming platform",
    "video content",
    "digital media",
  ],

  // Author and creator information
  authors: [{ name: "Stream Nest Team & TechSphere Solutions" }],
  creator: "TechSphere Solutions",
  publisher: "TechSphere Solutions",

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://streamnest.com",
    siteName: "Stream Nest",
    title: "Stream Nest - AI-Powered Video Platform",
    description:
      "The next-generation video platform powered by AI. Upload in seconds, stream in 4K, and connect with millions of creators worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stream Nest - AI-Powered Video Platform",
        type: "/images/defaultThumb.png",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Stream Nest Logo",
        type: "/images/defaultThumb.png",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@AJ_ITACHI",
    creator: "@AJ_ITACHI",
    title: "Stream Nest - AI-Powered Video Platform",
    description:
      "The next-generation video platform powered by AI. Upload in seconds, stream in 4K, and connect with millions of creators worldwide.",
    images: ["/images/defaultThumb.png"],
  },

  // App-specific metadata
  applicationName: "Stream Nest",
  category: "Entertainment",
  classification: "Video Streaming Platform",

  // Viewport and device optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover", // Important for iOS safe areas
  },

  // Theme and appearance
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    // { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light",

  // Manifest for PWA
  manifest: "/manifest.json",

  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      {
        url: "/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/apple-touch-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },

  // Apple-specific meta tags
  appleWebApp: {
    capable: true,
    title: "Stream Nest",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.jpg",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1668-2388.jpg",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1536-2048.jpg",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-1125-2436.jpg",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-splash-1242-2208.jpg",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-splash-750-1334.jpg",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-splash-640-1136.jpg",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },

  // Additional metadata
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },

  // Verification tokens (add your actual tokens)
  verification: {
    google: "your-google-verification-token",
    yandex: "your-yandex-verification-token",
    yahoo: "your-yahoo-verification-token",
    other: {
      "msvalidate.01": "your-bing-verification-token",
      "facebook-domain-verification": "your-facebook-verification-token",
    },
  },

  // Additional Open Graph properties for video platform
  other: {
    "og:video": "https://streamnest.com/featured-video.mp4",
    "og:video:type": "video/mp4",
    "og:video:width": "1920",
    "og:video:height": "1080",
    "fb:app_id": "your-facebook-app-id",
    "al:ios:app_name": "Stream Nest",
    "al:ios:app_store_id": "your-ios-app-id",
    "al:android:app_name": "Stream Nest",
    "al:android:package": "com.streamnest.app",
    "al:web:url": "https://streamnest.com",
  },
};

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
        <QueryProviders>
          <Toaster position="top-center" richColors closeButton />
          {children}
        </QueryProviders>
      </body>
    </html>
  );
}
