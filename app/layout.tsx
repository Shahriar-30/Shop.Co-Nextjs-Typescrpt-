import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop.Co",
  description: "Your one-stop online shop for everything you need.",
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
        <ClerkProvider>
          <div className="w-full flex justify-center">
            {/* Centered max-width container */}
            <div className="w-full max-w-[1280px] ">
              <div className="px-4">
                <Navbar />
                <main>{children}</main>
              </div>
              <Footer />
            </div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
