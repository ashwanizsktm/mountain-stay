import { Metadata } from "next";
import FAQClient, { faqData } from "./faq-client";

export const metadata: Metadata = {
  title: "FAQs | Mountain Stays",
  description:
    "Find answers to common questions about booking homestays on Mountain Stays, check-in/check-out times, amenities, cancellation policies, and more.",
  keywords: [
    "FAQs",
    "mountain stays FAQ",
    "homestay booking questions",
    "munsiyari homestay",
    "booking policies",
    "cancellation policy",
  ],
  openGraph: {
    title: "Frequently Asked Questions | Mountain Stays",
    description:
      "Get answers to common questions about booking mountain homestays, amenities, and travel information.",
    url: "https://yourdomain.com/faq",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Mountain Stays",
    description: "Answers to common questions about booking mountain homestays",
  },
};

export default function FAQPage() {
  return (
    <main>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* HERO SECTION */}
      <section
        className="relative h-[420px] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative text-center px-6 max-w-3xl">
          <h1 className="text-4xl font-semibold mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-lg text-gray-200">
            Find answers to common questions about our stays in Munsiyari,
            booking process, amenities, and travel experience.
          </p>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <FAQClient />
    </main>
  );
}