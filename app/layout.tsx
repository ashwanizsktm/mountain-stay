import './globals.css';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // Update this with your domain
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
    "mountain accommodations",
    "hill station homestays",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
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
        alt: "Mountain Stays - Book Homestays",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mountain Stays",
    description: "Book beautiful mountain homestays across India",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
  authors: [{ name: "Mountain Stays" }],
  creator: "Mountain Stays",
  publisher: "Mountain Stays",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com" />
      </head>
      <body className="bg-soft text-gray-800">
        <Navbar />
        <main className="pt-2">{children}</main>
        <Footer />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mountain Stays",
              url: "https://yourdomain.com",
              logo: "https://yourdomain.com/logo.png",
              description: "Book beautiful mountain homestays across India",
              sameAs: [
                "https://www.facebook.com/mountainstays",
                "https://www.instagram.com/mountainstays",
                "https://www.twitter.com/mountainstays",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+91-8296443263",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}