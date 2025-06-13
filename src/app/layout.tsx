import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donate bang butuh buat deploy",
  description: "Please bang mon nya",
  openGraph: {
    title: "Donate bang butuh buat deploy",
    description: "Please bang mon nya",
    siteName: "Donate or Donate ?",
    images: [
      {
        url: "/donate-mon.jpeg",
        width: 512,
        height: 451,
        alt: "api",
      },
    ],
    locale: "id_ID",
    type: "website"
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
