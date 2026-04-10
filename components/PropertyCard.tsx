import Link from "next/link";
import { Property } from "@/data/types";
import { locations } from "@/data/locations";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  if (!property) return null;
  const coverImage = property.images?.[0]?.src;
  const location = locations.find((loc) =>
    loc.properties.some((p) => p.slug === property.slug)
  );
  const locationSlug = location?.slug;
  const locationName = location?.name;
  const rating = property.rating;
  // Fake rating for now (until real reviews exist)
  // const rating = 4.7;
  return (
    <Link href={`/stays/${locationSlug}/${property.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer group">
        {/* IMAGE */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={coverImage}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* LOCATION BADGE */}
          {locationName && (
            <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow">
              {locationName}
            </span>
          )}
          {/* WISHLIST HEART */}
          <button
            className="absolute top-3 right-3 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-white transition"
          >
            ❤️
          </button>
          {/* RATING BADGE */}
          <div className="absolute bottom-3 left-3 bg-white/90 text-xs font-medium px-2 py-1 rounded-full shadow flex items-center gap-1">
            ⭐ {rating}
          </div>
        </div>
        {/* CONTENT */}
        <div className="p-5">
          {/* PROPERTY NAME */}
          <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 line-clamp-2">
            {property.name}
          </h3>
          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-3">
            {property.coupleFriendly && (
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                Couple Friendly
              </span>
            )}
            {property.mountainView && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Mountain View
              </span>
            )}
          </div>
          {/* PRICE */}
          <p className="text-lg font-semibold text-[var(--color-primary)]">
            ₹{property.price}
            <span className="text-sm text-gray-500 font-normal"> / night</span>
          </p>
        </div>
      </div>
    </Link>
  );
}