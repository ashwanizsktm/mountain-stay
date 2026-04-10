import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about Mountain Stays and our mission to connect travelers with authentic homestays in the Himalayas.",
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero with Background Image */}
			<section className="relative h-[60vh] md:h-[72vh] flex items-center justify-center text-center text-white">
				{/* Background Image */}
				<div className="absolute inset-0 h-[440px] md:h-[420px]">
					<Image
						fill
						priority
						sizes="100vw"
						quality={90}
						src="/images/Hero/about-1.webp"
						alt="Mountain view stays"
						className="absolute object-cover"
					/>
				</div>
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/50" />
				{/* Content */}
				<div className="relative z-10 px-6 max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
						Our Story in the Mountains
					</h1>
					<p className="text-lg md:text-xl opacity-90">
						Creating peaceful Himalayan stays where comfort,
						nature, and authentic experiences come together.
					</p>
				</div>
			</section>

			{/* Content Section */}
			<section className="max-w-5xl mx-auto px-6 py-16">
				<div className="grid md:grid-cols-2 gap-12 items-center">

					{/* Text */}
					<div>
						<h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">
							Our Story
						</h2>
						<p className="text-gray-600 mb-4">
							We started with a simple vision — to connect travelers with
							serene Himalayan homestays that offer warmth, comfort, and
							authentic local experiences.
						</p>
						<p className="text-gray-600">
							Whether you're seeking a romantic escape, a peaceful retreat,
							or breathtaking mountain views, we bring you handpicked stays
							that feel like home.
						</p>
					</div>

					{/* Image */}
					<div
						className="h-80 rounded-xl bg-cover bg-center shadow-md"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
						}}
					/>
				</div>
				{/* Testimonials Section */}
				<section className="bg-white py-20 px-6">
					<div className="max-w-6xl mx-auto text-center">

						<h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
							What Our Guests Say
						</h2>
						<p className="text-gray-600 mb-12 max-w-2xl mx-auto">
							Real experiences from travelers who stayed with us in the Himalayas.
						</p>

						<div className="grid md:grid-cols-3 gap-8">

							{/* Testimonial 1 */}
							<div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
								<div className="text-yellow-400 text-lg mb-3">★★★★★</div>
								<p className="text-gray-600 mb-4">
									“The mountain views were absolutely breathtaking.
									It felt like a peaceful escape from city life.”
								</p>
								<h4 className="font-semibold text-[var(--color-primary)]">
									Ananya Sharma
								</h4>
								<p className="text-sm text-gray-500">Delhi, India</p>
							</div>

							{/* Testimonial 2 */}
							<div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
								<div className="text-yellow-400 text-lg mb-3">★★★★★</div>
								<p className="text-gray-600 mb-4">
									“Clean rooms, warm hosts, and the best sunrise view
									I’ve ever seen. Highly recommended!”
								</p>
								<h4 className="font-semibold text-[var(--color-primary)]">
									Rohan Mehta
								</h4>
								<p className="text-sm text-gray-500">Mumbai, India</p>
							</div>

							{/* Testimonial 3 */}
							<div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
								<div className="text-yellow-400 text-lg mb-3">★★★★★</div>
								<p className="text-gray-600 mb-4">
									“Perfect for couples looking for a quiet getaway.
									Cozy stay with stunning Himalayan scenery.”
								</p>
								<h4 className="font-semibold text-[var(--color-primary)]">
									Priya & Arjun
								</h4>
								<p className="text-sm text-gray-500">Bangalore, India</p>
							</div>

						</div>
					</div>
				</section>
			</section>
		</div>
	);
}