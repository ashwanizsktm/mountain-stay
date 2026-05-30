export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin",
      },
    ],
    sitemap: "https://yourdomain.com/sitemap.xml", // Update domain
    host: "https://yourdomain.com", // Update domain
  };
}