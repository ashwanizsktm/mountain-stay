import './globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mountain Stays | Book Homestays in the Himalayas",
    template: "%s | Mountain Stays",
  },
  description:
    "Discover and book the best mountain homestays across India including Munsiyari, Shimla and more. Affordable stays with scenic views.",
  keywords: [
    "mountain stays",
    "homestays in india",
    "homestays in Munsiyari",
    "homestays in Uttrakhand",
    "himalayan stays",
    "budget homestays",
  ],
  openGraph: {
    title: "Mountain Stays",
    description:
      "Book beautiful mountain homestays across India.",
    url: "https://yourdomain.com", // 🔁 update later
    siteName: "Mountain Stays",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-soft text-gray-800">
        <Navbar />
        <main className="pt-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}