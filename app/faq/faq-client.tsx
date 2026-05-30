"use client";
import { useState } from "react";
import { faqData } from "@/data/faq";

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-5">
        {faqData.map((faq, index) => (
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
