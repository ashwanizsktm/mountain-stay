"use client";

import { useState, useMemo } from "react";

export default function BookingCard({
  propertyName,
  price,
}: {
  propertyName: string;
  price: number;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const today = new Date().toISOString().split("T")[0];

  const EXTRA_GUEST_PRICE = 500;
  const CLEANING_FEE = 500;

  /* -------------------------
     Price Formatter
  --------------------------*/

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  /* -------------------------
     Conversion Triggers
  --------------------------*/

  const roomsLeft = useMemo(() => {
    return Math.floor(Math.random() * 3) + 1; // 1–3 rooms left
  }, []);

  const viewersToday = useMemo(() => {
    return Math.floor(Math.random() * 8) + 3; // 3–10 viewers
  }, []);

  const discountPercent = useMemo(() => {
    return Math.floor(Math.random() * 9) + 10; // 10–18%
  }, []);

  /* -------------------------
     Nights Calculation
  --------------------------*/

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const extraGuests = Math.max(0, guests - 2);
  const baseCost = nights * price;
  const extraGuestCost = extraGuests * EXTRA_GUEST_PRICE * nights;
  const subtotal = baseCost + extraGuestCost;
  const totalBeforeDiscount = subtotal + (nights > 0 ? CLEANING_FEE : 0);
  const discountAmount = Math.floor(
    (totalBeforeDiscount * discountPercent) / 100
  );

  const finalTotal = totalBeforeDiscount - discountAmount;
  /* -------------------------
     WhatsApp Message
  --------------------------*/
  const message = `Hi, I'm interested in booking ${propertyName}.
Check-in: ${checkIn || "Not selected"}
Check-out: ${checkOut || "Not selected"}
Guests: ${guests}
Nights: ${nights}

Estimated price: ₹${formatPrice(finalTotal)}

Please share availability.`;
  const whatsappLink = `https://wa.me/918296443263?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="sticky top-24 transition-all duration-300">
      <div className="bg-white shadow-xl rounded-2xl py-4 px-6 border border-gray-100">
        {/* Urgency Message */}
        <div className="text-xs text-orange-600 mb-1 font-medium">
          🔥 8 people viewed this stay
        </div>

        {/* Availability Badge */}
        {/* <div className="text-xs text-red-600 mb-1 font-medium">
          ⚠ Only {roomsLeft} room{roomsLeft > 1 ? "s" : ""} left for these dates
        </div> */}

        {/* PRICE */}
        <p className="text-sm text-gray-500">Starting from</p>

        <p className="text-2xl font-semibold text-[var(--color-primary)] mb-1">
          ₹{formatPrice(price)}
          <span className="text-sm text-gray-500 font-normal"> / night</span>
        </p>

        <p className="text-xs text-green-600 mb-2">
          Price for 2 guests • Extra guest ₹{formatPrice(EXTRA_GUEST_PRICE)}/night
        </p>

        {/* DATE PICKERS */}
        <div className="grid grid-cols-2 border rounded-lg overflow-hidden mb-2">
          <div className="p-1 border-r">
            <label className="text-xs text-gray-500">Check-in</label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm cursor-pointer outline-none"
            />
          </div>
          <div className="p-1">
            <label className="text-xs text-gray-500">Check-out</label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm cursor-pointer outline-none"
            />
          </div>
        </div>

        {/* GUESTS */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
          >
            {[1,2,3,4,5,6,7,8].map((g) => (
              <option key={g} value={g}>
                {g} Guest{g > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE BREAKDOWN */}
        {nights > 0 && (
          <div className="border-t pt-4 mb-3 text-sm space-y-2">
            <div className="flex justify-between">
              <span>
                ₹{formatPrice(price)} × {nights} night{nights > 1 ? "s" : ""}
              </span>
              <span>₹{formatPrice(baseCost)}</span>
            </div>

            {extraGuests > 0 && (
              <div className="flex justify-between">
                <span>
                  Extra guests ({extraGuests}) × ₹{formatPrice(EXTRA_GUEST_PRICE)} × {nights}
                </span>
                <span>₹{formatPrice(extraGuestCost)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Cleaning fee</span>
              <span>₹{formatPrice(CLEANING_FEE)}</span>
            </div>

            <div className="flex justify-between text-gray-400 line-through">
              <span>Original price</span>
              <span>₹{formatPrice(totalBeforeDiscount)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>{discountPercent}% limited time offer</span>
              <span>-₹{formatPrice(discountAmount)}</span>
            </div>

            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>₹{formatPrice(finalTotal)}</span>
            </div>
          </div>
        )}

        {/* CTA BUTTON */}
        <a
          href={whatsappLink}
          target="_blank"
          className="block text-center bg-[var(--color-primary)] text-white py-2
           rounded-lg hover:opacity-90 transition font-medium"
        >
          Enquire on WhatsApp
        </a>
        {/* Free Cancellation */}
        <p className="text-xs text-green-700 mt-3 text-center font-medium">
          💚 Free cancellation up to 24 hours before check-in
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center">
          No booking fees • Instant host response
        </p>
      </div>
    </div>
  );
}