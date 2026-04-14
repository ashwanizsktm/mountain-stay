"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
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
  const [includeVeg, setIncludeVeg] = useState(false);
  const [includeNonVeg, setIncludeNonVeg] = useState(false);
  const [foodGuests, setFoodGuests] = useState(2);
  const [error, setError] = useState("");
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().split("T")[0];

  /* -------------------------
     Auto Sync Food Guests
  --------------------------*/
  useEffect(() => {
    setFoodGuests(guests);
  }, [guests]);

  /* -------------------------
     Price Formatter
  --------------------------*/
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  /* Remove shake after animation */
  // useEffect(() => {
  //   if (shake) {
  //     const t = setTimeout(() => setShake(false), 400);
  //     return () => clearTimeout(t);
  //   }
  // }, [shake]);
  /* -------------------------
     Conversion Triggers
  --------------------------*/
  const viewersToday = useMemo(() => {
    return Math.floor(Math.random() * 8) + 3;
  }, []);

  const discountPercent = useMemo(() => {
    return 10;
  }, []);

  /* -------------------------
     Nights
  --------------------------*/
  const nights =
    checkIn && checkOut
      ? Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
      )
      : 0;

  /* -------------------------
     Multi-room Logic
  --------------------------*/
  const ROOMS_CAPACITY = 3;
  const rooms = Math.ceil(guests / ROOMS_CAPACITY);

  /* -------------------------
     Pricing
  --------------------------*/
  const baseCost = nights * price * rooms;

  const extraGuests = Math.max(0, guests - rooms * 2);
  const extraGuestPricePerNight = price / 4;
  const extraGuestCost = extraGuests * extraGuestPricePerNight * nights;

  // Ensure foodGuests never exceeds guests
  const safeFoodGuests = Math.min(foodGuests, guests);
  const vegCost = includeVeg ? 500 * safeFoodGuests * nights : 0;
  const nonVegCost = includeNonVeg ? 800 * safeFoodGuests * nights : 0;
  const subtotal = baseCost + extraGuestCost + vegCost + nonVegCost;
  const originalPrice = Math.floor(subtotal * 1.25);

  const discountAmount = Math.floor(
    (subtotal * discountPercent) / 100
  );

  const finalTotal = subtotal - discountAmount;

  /* -------------------------
     WhatsApp Message
  --------------------------*/
  const message = `Hi, I'm interested in booking ${propertyName}.
Check-in: ${checkIn || "Not selected"}
Check-out: ${checkOut || "Not selected"}
Guests: ${guests}
Rooms: ${rooms}
Nights: ${nights}
Estimated price: ₹${formatPrice(finalTotal)}
Please share availability.`;
  const whatsappLink = `https://wa.me/918296443263?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="sticky top-24 transition-all duration-300">
      <div className="bg-white shadow-xl rounded-2xl py-4 px-6 border border-gray-100">

        {/* Urgency */}
        <div className="text-xs text-orange-600 mb-1 font-medium">
          🔥 {viewersToday} people viewed this stay
        </div>

        {/* PRICE */}
        <p className="text-sm text-gray-500">Starting from</p>

        <p className="text-2xl font-semibold text-[var(--color-primary)] mb-1">
          ₹{formatPrice(price)}
          <span className="text-sm text-gray-500"> / room / night</span>
        </p>

        <p className="text-xs text-green-600 mb-2">
          1 room = 2 guests • Max 3 guests per room
        </p>

        {/* DATE PICKERS */}
        <div className="grid grid-cols-2 border rounded-lg overflow-hidden mb-2">
          <label className={`p-1 border-r cursor-pointer ${error && !checkIn ? "bg-red-50 border-red-400" : ""
            }`}>
            <span className="text-xs text-gray-500">Check-in</span>
            <input
              ref={checkInRef}
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setError("");
              }}
              className="w-full bg-transparent outline-none cursor-pointer"
            />
          </label>
          {/* Check-out */}
          <label className={`p-1 cursor-pointer ${error && !checkOut ? "bg-red-50 border-red-400" : ""
            }`}>
            <span className="text-xs text-gray-500">Check-out</span>
            <input
              ref={checkOutRef}
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setError("");
              }}
              className="w-full bg-transparent outline-none cursor-pointer"
            />
          </label>
        </div>
        {/* ERROR */}
        {error && (
          <p className="text-xs text-red-600 flex text-start mb-2 font-medium">
           <span><AlertCircle className="w-4 h-4" /></span>
            <span className="ml-1">{error}</span>
          </p>
        )}
        {/* GUESTS */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => (
              <option key={g} value={g}>
                {g} Guest{g > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Rooms Info */}
        <div className="text-xs text-blue-600 mb-3">
          🏨 {rooms} room{rooms > 1 ? "s" : ""} will be booked
        </div>

        {/* FOOD */}
        <div className="mb-3 space-y-2">
          <label className="text-xs text-gray-500 block">Add-ons</label>

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeVeg}
              onChange={() => {
                setIncludeVeg(!includeVeg);
                if (!includeVeg) setIncludeNonVeg(false);
              }}
            />
            Include food (veg) ₹500/person/night
          </label>

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeNonVeg}
              onChange={() => {
                setIncludeNonVeg(!includeNonVeg);
                if (!includeNonVeg) setIncludeVeg(false);
              }}
            />
            Include food (non-veg) ₹800/person/night
          </label>

          {(includeVeg || includeNonVeg) && (
            <select
              value={safeFoodGuests}
              onChange={(e) =>
                setFoodGuests(
                  Math.min(Number(e.target.value), guests)
                )
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              {[...Array(guests)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} person{i > 0 ? "s" : ""} for food
                </option>
              ))}
            </select>
          )}
        </div>

        {/* BREAKDOWN */}
        {nights > 0 && (
          <div className="border-t pt-4 mb-3 text-sm space-y-2">

            <div className="flex justify-between">
              <span>
                ₹{formatPrice(price)} × {rooms} room × {nights}
              </span>
              <span>₹{formatPrice(baseCost)}</span>
            </div>

            {extraGuests > 0 && (
              <div className="flex justify-between">
                <span>
                  Extra guests ({extraGuests}) × ₹{formatPrice(extraGuestPricePerNight)} × {nights}
                </span>
                <span>₹{formatPrice(extraGuestCost)}</span>
              </div>
            )}

            {vegCost > 0 && (
              <div className="flex justify-between">
                <span>Veg × {safeFoodGuests} × {nights}</span>
                <span>₹{formatPrice(vegCost)}</span>
              </div>
            )}

            {nonVegCost > 0 && (
              <div className="flex justify-between">
                <span>Non-veg × {safeFoodGuests} × {nights}</span>
                <span>₹{formatPrice(nonVegCost)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-400 line-through">
              <span>Original price</span>
              <span>₹{formatPrice(originalPrice)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>{discountPercent}% offer</span>
              <span>-₹{formatPrice(discountAmount)}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>₹{formatPrice(finalTotal)}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          onClick={(e) => {
            if (!checkIn) {
              e.preventDefault();
              setError("Please select check-in date");
              checkInRef.current?.focus();
              return;
            }

            if (!checkOut) {
              e.preventDefault();
              setError("Please select check-out date");
              checkOutRef.current?.focus();
              return;
            }

            setError("");
          }}
          className="block text-center bg-[var(--color-primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Enquire on WhatsApp
        </a>
        <p className="text-xs text-yellow-600 mt-3 text-center font-medium">
          ⚠️ Booking changes are not refundable
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center">
          30% booking fees • Instant host response
        </p>
      </div>
    </div>
  );
}