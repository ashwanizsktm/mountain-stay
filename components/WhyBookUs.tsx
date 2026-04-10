export default function WhyBookUs() {
  const features = [
    {
      title: "Verified Homestays",
      description:
        "Every property is personally verified to ensure comfort, safety and authentic mountain experience.",
      icon: "🏡",
    },
    {
      title: "Best Panchachuli Views",
      description:
        "Wake up to breathtaking Himalayan views from carefully selected scenic locations.",
      icon: "🏔",
    },
    {
      title: "Couple-Friendly Options",
      description:
        "Safe and welcoming stays designed for couples, families and solo travelers.",
      icon: "❤️",
    },
    {
      title: "Direct & Transparent Pricing",
      description:
        "No hidden fees. Direct coordination with property owners for fair pricing.",
      icon: "💰",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-4">
          Why Book With Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          We curate the finest homestays in Munsiyari to ensure your mountain
          escape is peaceful, authentic and memorable.
        </p>

        {/* Feature Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-sm hover:shadow-md transition bg-[var(--color-soft)]"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}