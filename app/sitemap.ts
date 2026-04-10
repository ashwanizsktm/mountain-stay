import { locations } from "@/data/locations";

export default function sitemap() {
  const baseUrl = "https://yourdomain.com"; // 🔁 change later

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/faq",
    "/stays",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/stays/${location.slug}`,
    lastModified: new Date(),
  }));

  const propertyPages = locations.flatMap((location) =>
    location.properties.map((property) => ({
      url: `${baseUrl}/stays/${location.slug}/${property.slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticPages, ...locationPages, ...propertyPages];
}