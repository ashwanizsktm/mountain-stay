import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-br from-[var(--color-primary)] to-[#1f2937] text-white">

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        <div>
          <h2 className="text-2xl font-semibold mb-4 tracking-wide">
            Mountain Stays
          </h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Curated homestays in Munsiyari offering breathtaking Panchachuli views and peaceful Himalayan experiences.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4 uppercase tracking-wide text-sm text-white/80">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="hover:text-white transition cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link href="/stays">Stays</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 uppercase tracking-wide text-sm text-white/80">
            Contact
          </h3>
          <p className="text-sm text-white/70 mb-2">Munsiyari, Uttarakhand</p>
          <p className="text-sm text-white/70">WhatsApp: +91 XXXXXXXX</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Mountain Stays. Crafted with care in the Himalayas.
      </div>
    </footer>
  );
}