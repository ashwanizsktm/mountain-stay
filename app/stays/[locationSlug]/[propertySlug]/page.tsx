

import { notFound } from "next/navigation";
import { locations } from "@/data/locations";
import PropertyGallery from "@/components/PropertyGallery";
import Link from "next/link";
import BookingCard from "@/components/BookingCard";

export async function generateMetadata({
  params,
}: {
  params: { locationSlug: string; propertySlug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { locationSlug, propertySlug } = resolvedParams;
  const location = locations.find(
    (loc) => loc.slug === locationSlug
  );
  const property = location?.properties.find(
    (prop) => prop.slug === propertySlug
  );

  if (!property || !location) {
    return {
      title: "Property Not Found",
    };
  }
  return {
    title:
      property.seo?.title ||
      `${property.name} in ${location.name} | Book Now`,

    description:
      property.seo?.description || property.description,

    openGraph: {
      title:
        property.seo?.title ||
        `${property.name} in ${location.name}`,
      description: property.description,
      images: [
        {
          url: property.images?.[0]?.src || "",
        },
      ],
      keywords: [
        `${property.name}`,
        `${location.name} homestay`,
        `stay in ${location.name}`,
      ],
    },
  };
}
export default async function PropertyPage({
  params,
}: {
  params: { locationSlug: string; propertySlug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const { locationSlug, propertySlug } = resolvedParams;
  const location = locations.find(
    (loc) => loc.slug === locationSlug
  );
  if (!location) notFound();
  const property = location.properties.find(
    (p) => p.slug === propertySlug
  );
  if (!property) notFound();


  return (
    <>
      {/* SEO CONTENT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            name: property.name,
            description: property.description,
            image: property.images?.[0]?.src,
            address: {
              "@type": "PostalAddress",
              addressLocality: location.name,
              addressCountry: "IN",
            },
            aggregateRating: property.reviews
              ? {
                "@type": "AggregateRating",
                ratingValue: property.reviews.rating,
                reviewCount: property.reviews.count,
              }
              : undefined,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: property.price,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <section className="bg-[var(--color-soft)] min-h-screen pt-6 pb-20 relative">
        {/* Back Button */}
        <Link
          href="/stays"
          className="absolute top-4 left-6 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow hover:shadow-md"
        >
          ←
        </Link>
        {/* Gallery */}
        <PropertyGallery images={property.images} />
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="grid md:grid-cols-5 gap-12">
            {/* LEFT */}
            <div className="md:col-span-3">
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-1">
                {property.name} in {location.name}
              </h1>
              <p className="text-gray-600 mb-4">
                Book this homestay in {location.name} starting at ₹{property.price} per night with {property.mountainView ? "beautiful mountain views" : "comfortable stay options"}.
              </p>
              {/* Tags */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {property.coupleFriendly && (
                  <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                    Couple Friendly
                  </span>
                )}
                {property.mountainView && (
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Mountain View
                  </span>
                )}
              </div>
              {/* Description */}
              <h2 className="text-lg font-semibold mb-1">About {property.name} in {location.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-10">{property.description}</p>
              {/* Amenities */}
              <h3 className="text-lg font-semibold mb-4">
                Amenities at {property.name}
              </h3>
              <ul className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                {property.amenities.map((item) => (
                  <li key={item}>✔ {item}</li>
                ))}
              </ul>
              <h2 className="text-lg font-semibold mt-10 mb-1">
                Location & Nearby Attractions
              </h2>
              <p className="text-gray-600">
                Located in {location.name}, this homestay offers a peaceful stay surrounded by natural beauty, making it perfect for travelers looking to relax and explore the mountains.
              </p>
              <Link
                href={`/stays/${location.slug}`}
                className="text-sm text-blue-600 underline"
              >
                Explore more stays in {location.name}
              </Link>
            </div>
            {/* RIGHT */}
            <div className="md:col-span-2">
              <BookingCard
                propertyName={property.name}
                price={property.price}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}