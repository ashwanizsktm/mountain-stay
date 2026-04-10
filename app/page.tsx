import type { Metadata } from "next";
import FeaturedStays from "@/components/FeaturedStays";
import HeroSection from "@/components/HeroSection";
import WhyBookUs from "@/components/WhyBookUs";

export const metadata: Metadata = {
  title: "Mountain Stays | Book Homestays in the Himalayas",
  description:
    "Discover and book the best mountain homestays across India including Munsiyari, Shimla and more. Affordable stays with scenic views.",

  keywords: [
    "mountain stays",
    "homestays in india",
    "himalayan stays",
    "stay in munsiyari",
    "hill station stays",
  ],

  openGraph: {
    title: "Mountain Stays",
    description:
      "Book beautiful mountain homestays across India.",
    url: "https://yourdomain.com", // 🔁 update after domain
    siteName: "Mountain Stays",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // optional
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyBookUs />
      <FeaturedStays />
    </>
  );
}