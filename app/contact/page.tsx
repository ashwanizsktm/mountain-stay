import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Get in touch with Mountain Stays for bookings, queries, or partnership opportunities.",
};

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero */}
			{/* Hero with Background Image */}
			<section className="relative h-[70vh] md:h-[75vh] flex items-center justify-center text-center text-white">
				{/* Background Image */}
				<div className="absolute inset-0">
					<Image
						fill
						priority
						sizes="100vw"
						quality={90}
						src="/images/Hero/stays.webp"
						alt="Mountain view stays"
						className="absolute object-cover"
					/>
				</div>
				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-black/30" />
				{/* Content */}
				<div className="relative z-10 px-6 max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
						Let’s Plan Your Mountain Escape
					</h1>
					<p className="text-lg md:text-xl opacity-90">
						Have questions about a stay or need help booking?
						We're here to help you every step of the way.
					</p>
				</div>
			</section>
			{/* Main Contact Section */}
			<section className="max-w-6xl mx-auto px-6 py-20">
				<div className="grid md:grid-cols-2 gap-16 items-start">
					{/* Left Side - Contact Info */}
					<div>
						<h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
							Get in Touch
						</h2>
						<div className="space-y-6 text-gray-600">
							<div>
								<h4 className="font-semibold text-gray-800 mb-1">
									📍 Location
								</h4>
								<p>Pithoragarh, Uttarakhand, India</p>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800 mb-1">
									📞 Phone
								</h4>
								<p>+91 98765 43210</p>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800 mb-1">
									✉️ Email
								</h4>
								<p>hello@himalayanstays.com</p>
							</div>
							<div>
								<h4 className="font-semibold text-gray-800 mb-1">
									🕒 Response Time
								</h4>
								<p>We usually respond within 24 hours.</p>
							</div>
						</div>
					</div>

					{/* Right Side - Form */}
					<div className="bg-white p-10 rounded-2xl shadow-lg">
						<form className="space-y-6">
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Full Name
								</label>
								<input
									type="text"
									placeholder="Your full name"
									className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Email Address
								</label>
								<input
									type="email"
									placeholder="your@email.com"
									className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Your Message
								</label>
								<textarea
									rows={5}
									placeholder="Tell us about your stay plans..."
									className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
								/>
							</div>
							<button
								type="submit"
								className="w-full bg-[var(--color-primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
							>
								Send Message
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}