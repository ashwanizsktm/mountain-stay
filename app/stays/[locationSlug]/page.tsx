import { notFound } from "next/navigation";
import { locations } from "@/data/locations";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link"
import { Home, MapPin, BedDouble, ChevronRight } from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
	params,
}: {
	params: { locationSlug: string };
}) {
	const resolvedParams = await Promise.resolve(params);
	const { locationSlug } = resolvedParams;

	const location = locations.find(
		(loc) => loc.slug === locationSlug
	);

	if (!location) {
		return {
			title: "Location Not Found",
		};
	}

	return {
		title: location.seo.title,
		description: location.seo.description,
		keywords: location.seo.keywords,

		openGraph: {
			title: location.seo.title,
			description: location.seo.description,
			images: [
				{
					url:
						location.properties?.[0]?.images?.[0]?.src ||
						"",
				},
			],
		},
	};
}
export default async function LocationPage({
	params,
}: {
	params: { locationSlug: string };
}) {
	const resolvedParams = await Promise.resolve(params);
	const { locationSlug } = resolvedParams;

	const location = locations.find(
		(loc) => loc.slug === locationSlug
	);
	if (!location) notFound();

	return (<section className="bg-[var(--color-soft)] min-h-screen mt-12 pb-16">
		{/* HERO SECTION */}
		<div className="relative h-[340px] md:h-[430px]">
			{/* HERO IMAGE */}
			<Image
				src="/images/locations/munsiyari.webp"
				alt={location.name}
				fill
				priority
				sizes="90vw"
				quality={90}
				className="sm:object-cover md:object-cover"
			/>
			{/* GRADIENT OVERLAY */}
			{/* bg-gradient-to-t from-black/80 via-black/30 to-transparent */}
			<div className="absolute inset-0" />
			{/* HERO CONTENT */}
			<div className="relative z-10 flex flex-col justify-end h-full max-w-6xl mx-auto px-6 pb-16 text-white">
				{/* LOCATION BADGE */}
				<div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full w-fit mb-4 text-sm">
					<span>📍</span>
					{location.name}
				</div>
				{/* TITLE */}
				<h1 className="text-3xl md:text-4xl font-semibold mb-3">
					Stays in {location.name}
				</h1>
				{/* DESCRIPTION */}
				<p className="text-sm md:text-base text-gray-200 max-w-xl mb-3">
					Discover peaceful homestays, Himalayan views, and authentic village
					experiences in {location.name} & its surroundings.
				</p>
				{/* STAY COUNT */}
				<p className="text-sm text-gray-300">
					{location.properties.length} unique stays available
				</p>
			</div>
		</div>
		{/* BREADCRUMB */}
		<div className="max-w-6xl mx-auto px-6 -mt-6 relative z-20">
			<div className="bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 w-fit">
				<Link
					href="/"
					className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition"
				>
					<Home size={16} />
					Home
				</Link>
				<ChevronRight size={14} className="text-dark-400" />
				<Link
					href="/stays"
					className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition"
				>
					<BedDouble size={16} />
					Stays
				</Link>
				<ChevronRight size={14} className="text-dark-400" />
				<span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
					<MapPin size={16} />
					{location.name}
				</span>
			</div>
		</div>
		{/* DESTINATION STATS */}
		<div className="max-w-6xl mx-auto px-6 mt-6 mb-6">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				<div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition">
					<p className="text-2xl font-semibold text-[var(--color-primary)]">
						7,540 Feet
					</p>
					<p className="text-sm text-gray-500 mt-1">
						Altitude
					</p>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition">
					<p className="text-2xl font-semibold text-[var(--color-primary)]">
						Aug-Feb, Mar-Jun
					</p>
					<p className="text-sm text-gray-500 mt-1">
						Best Season
					</p>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition">
					<p className="text-2xl font-semibold text-[var(--color-primary)]">
						{location.properties.length}
					</p>
					<p className="text-sm text-gray-500 mt-1">
						Homestays
					</p>
				</div>
				<div className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition">
					<p className="text-2xl font-semibold text-[var(--color-primary)]">
						★ 4.8
					</p>
					<p className="text-sm text-gray-500 mt-1">
						Avg Rating
					</p>
				</div>
			</div>
		</div>
		<div className="max-w-6xl mx-auto px-6 mt-8">
			{/* THINGS TO EXPLORE */}
			<h2 className="text-2xl font-semibold mb-6"> Things to explore in {location.name} </h2>
			<div className="grid md:grid-cols-3 gap-6 mb-8">
				{location?.thingsToExplore?.map((things, index) => (
					<div
						key={index}
						className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
					>
						{/* IMAGE WRAPPER */}
						<div className="relative h-48 w-full overflow-hidden">
							{/* IMAGE */}
							<Image
								src={things.image}
								alt={things.title}
								width={800}
								height={500}
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							{/* GRADIENT OVERLAY */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
							{/* TITLE ON IMAGE */}
							<div className="absolute bottom-3 left-3 right-3 text-white">
								<h3 className="text-sm font-semibold leading-tight">
									{things.title}
								</h3>
							</div>
						</div>
						{/* CONTENT BELOW */}
						<div className="p-4">
							<p className="text-sm text-gray-600">
								{things.details}{" "}
								{things.title === 'Khaliya Top Trek' && <a
									href="https://uttarahikes.com/munsiyari-khaliya-top/"
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold underline text-blue-600"
								>
									ENQUIRE TO TREK
								</a>
								}
							</p>
						</div>
					</div>
				))}
			</div>
			{/* HOW TO REACH */}
			<h2 className="text-2xl font-semibold mb-6"> How to reach {location.name} </h2>
			<div className="grid md:grid-cols-1 gap-6 mb-12">
				<div className="bg-white p-5 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col">
					{location.howToReach?.map((howtoReach, index) => (
						<div className="mt-2" key={index}>
							<h2 className="text-large font-semibold">{howtoReach.title}</h2>
							<p>{howtoReach.details}
								{" "}
								{howtoReach.title === '3. Helicopter (Fastest & Most Scenic)' &&
									<a href="https://airheritage.in/" target="_blank"
										rel="noopener noreferrer"
										className="font-semibold underline text-blue-600">
										ENQUIRE TO BOOK</a>
								}
							</p>
						</div>
					))}
				</div>
			</div>
			{/* 🚕 TAXI / TRAVEL SECTION */}
			<h2 className="text-2xl font-semibold mb-6">
				Book (private or shared) taxi to {location.name}
			</h2>
			<div className="grid md:grid-cols-2 gap-6 mb-12">
				{location.taxis?.map((taxi, index) => (
					<div
						key={index}
						className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col md:flex-row"
					>
						{/* LEFT: IMAGE */}
						<div className="relative md:w-1/2 h-48 md:h-auto">
							<img
								src={taxi.image}
								alt={taxi.name}
								className="w-full h-full md:mt-16 object-cover md:object-contain"
							/>
							{/* VERIFIED BADGE */}
							<span className="absolute top-3 left-3 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium shadow">
								✔ Verified Driver
							</span>
							{/* TITLE + CAPACITY */}
							<div className="absolute top-12 left-3">
								<h3 className="text-lg font-semibold">
									{taxi.name}
								</h3>
								<span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
									{taxi.capacity}
								</span>
							</div>
						</div>
						{/* RIGHT: CONTENT */}
						<div className="md:w-1/2 p-5 flex flex-col justify-between">
							{/* TOP CONTENT */}
							<div>
								{/* TAG */}
								<p className="text-sm text-gray-500 mb-3">
									{taxi.tag}
								</p>
								{/* DRIVER INFO */}
								<div className="text-sm text-gray-700 mb-4">
									<p>
										<span className="font-medium">Driver:</span> {taxi.driverName}
									</p>
									<p className="text-gray-500 font-bold text-xs">
										📞 {taxi.phone}
									</p>
								</div>
								{/* ROUTES + PRICING */}
								<div className="space-y-2">
									{taxi.routes.map((route, idx) => (
										<div
											key={idx}
											className="bg-gray-50 rounded-lg px-3 py-2"
										>
											{/* ROW WRAPPER */}
											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
												{/* LEFT: ROUTE */}
												<div> <p className="text-xs text-gray-500"> 📍 {route.from} → {location.name}
												</p>
													<p className="text-sm font-semibold text-[var(--color-primary)]"> ₹{route.price} </p>
												</div>
												{/* RIGHT: PRICE */}
												<div className="flex items-center justify-between sm:justify-end gap-4">
													<p className="text-xs font-semibold text-gray-500">
														₹{route.perPerson}/person
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							{/* CTA */}
							<div className="mt-4">
								<a
									href={`https://wa.me/${taxi.phone}`}
									target="_blank"
									className="block text-center bg-[var(--color-primary)] text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
								>
									Book on WhatsApp
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* PROPERTY LISTINGS */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold"> Available stays in {location.name} </h2>
				<p className="text-gray-500 text-sm"> Handpicked homestays with beautiful mountain views. </p>
			</div>
			<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
				{location.properties.map((property) => (
					<PropertyCard key={property.slug} property={property} />
				))}
			</div>
		</div>
	</section>
	);
}