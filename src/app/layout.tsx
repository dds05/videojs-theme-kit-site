import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Videojs Theme Kit",
  description: "Customize themes for your Video.js player easily with our toolkit.",
  keywords: ["Video.js", "Theme", "Player Customization", "Videojs Theme Kit","Videojs-Plugin"],
  metadataBase: new URL("https://videojs-theme-kit-site.vercel.app/"),
  openGraph: {
    title: "Videojs Theme Kit",
    description: "Customize themes for your Video.js player easily.",
    url: "https://videojs-theme-kit-site.vercel.app/",
    siteName: "Videojs Theme Kit",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        {children}
      </body>
    </html>
  );
}
