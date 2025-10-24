import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import ViewCanvas from "@/components/sections/ViewCanvas";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const mulish = Mulish({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "adidas",
  description:
    "Foot Locker and adidas Originals latest collection breaks new ground.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} antialiased`}>
        <ViewCanvas />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
