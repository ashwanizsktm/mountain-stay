"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Where is the homestay located?",
    answer:
      "Our homestay is located in Munsiyari with beautiful views of the Panchachuli Himalayan peaks and peaceful Himalayan surroundings.",
  },
  {
    question: "What is the check-in and check-out time?",
    answer:
      "Check-in starts from 12:00 PM and check-out is before 11:00 AM. Early check-in may be possible depending on availability.",
  },
  {
    question: "How can I book the stay?",
    answer:
      "You can select your dates and guests from the booking card on the property page and click 'Enquire on WhatsApp'. Our host will confirm availability quickly.",
  },
  {
    question: "Is food available at the homestay?",
    answer:
      "Yes, freshly prepared homemade meals are available. Guests can enjoy authentic local Kumaoni food prepared by the host.",
  },
  {
    question: "Is parking available?",
    answer:
      "Yes, parking is available near the property for guests arriving by car.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Guests can cancel their booking free of charge up to 24 hours before check-in.",
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl bg-white shadow-sm transition hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left p-5 cursor-pointer"
            >
              <span className="font-medium text-gray-800">
                {faq.question}
              </span>

              <span className="text-xl text-gray-500">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export const faqData = faqs;
