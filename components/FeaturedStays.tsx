import PropertyCard from "./PropertyCard";
import { locations } from "@/data/locations";

export default function FeaturedStays() {
  // Get all properties from all locations
  const featured = locations
    .flatMap((location) => location.properties)
    .slice(0, 3); // show first 3 as featured

  return (
    <section className="py-20 px-6 bg-[var(--color-soft)]">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-4">
            Featured Homestays
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover some of the most loved and scenic stays in Munsiyari.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((stay) => (
            <PropertyCard key={stay.slug} property={stay} />
          ))}
        </div>
      </div>
    </section>
  );
}