import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhisperSync — AI Captions for Short-Form Video",
  description: "Upload your reels and shorts — get crisp, synced captions in seconds. Multilingual support for Hindi, English, and Hinglish. Export as SRT, ASS, or burned-in MP4.",
  keywords: ["AI captions", "video subtitles", "transcription", "TikTok captions", "Instagram Reels", "YouTube Shorts", "Hindi captions", "multilingual subtitles"],
  openGraph: {
    title: "WhisperSync — AI Captions for Short-Form Video",
    description: "Upload your reel. Get perfect captions in 30 seconds. Multilingual. Accurate. Free to start.",
    type: "website",
    siteName: "WhisperSync",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhisperSync — AI Captions for Short-Form Video",
    description: "Upload your reel. Get perfect captions in 30 seconds. Multilingual. Accurate. Free to start.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Providers >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            {children}
        </body>
        </Providers>
    </html>
  );
}
