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
    "budget mountain accommodation",
    "himalayan homestays",
  ],

  openGraph: {
    title: "Mountain Stays",
    description:
      "Book beautiful mountain homestays across India.",
    url: "https://yourdomain.com",
    siteName: "Mountain Stays",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mountain Stays - Book Mountain Homestays",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mountain Stays | Book Homestays in Himalayas",
    description: "Book beautiful mountain homestays across India with scenic views",
    images: ["https://yourdomain.com/og-image.jpg"],
  },

  canonical: "https://yourdomain.com",
};

export default function Home() {
  return (
    <>
      {/* WebSite Schema with Search Action */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Mountain Stays",
            url: "https://yourdomain.com",
            description: "Book beautiful mountain homestays across India",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://yourdomain.com/stays?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Mountain Stays",
            description: "Book beautiful mountain homestays across India",
            url: "https://yourdomain.com",
            image: "https://yourdomain.com/og-image.jpg",
            telephone: "+91-8296443263",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Munsiyari",
              addressRegion: "Uttarakhand",
              postalCode: "262129",
              addressCountry: "IN",
            },
            areaServed: ["IN"],
            priceRange: "₹",
          }),
        }}
      />
      <HeroSection />
      <WhyBookUs />
      <FeaturedStays />
    </>
  );
}