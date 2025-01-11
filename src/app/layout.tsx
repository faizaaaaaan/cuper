import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import WebLodingProvider from "@/components/webloding";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Createreel - AI Video Generator for Reels & Shorts",
  description: "Createreel helps you generate stunning Instagram Reels and YouTube Shorts using AI. Transform your ideas into professional social videos in minutes.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  // Additional metadata for better device support
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://createreel.com"), // Replace with your domain
  openGraph: {
    title: "CreateReel - AI Video Generator",
    description:
      "Transform your ideas into professional social videos in minutes.",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Add your OpenGraph image
        width: 1200,
        height: 630,
        alt: "CreateReel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CreateReel - AI Video Generator",
    description:
      "Transform your ideas into professional social videos in minutes.",
    images: ["/twitter-image.png"], // Add your Twitter card image
  },
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CreateReel",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased bg-background text-foreground",
          font.className
        )}
      >
        <Toaster richColors theme="light" />
        <WebLodingProvider>{children}</WebLodingProvider>
      </body>
    </html>
  );
}
