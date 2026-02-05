import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminSection from "@/components/admin/AdminSection";

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
    <div className="w-full flex justify-center">
      {/* Centered max-width container */}
      <div className="w-full max-w-[1280px] ">
        <div className="px-4">
          <main>
            <AdminSection>{children}</AdminSection>
          </main>
        </div>
      </div>
    </div>
  );
}
