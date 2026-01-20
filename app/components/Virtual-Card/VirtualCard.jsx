"use client";
import Image from "next/image";

export default function VirtualCard() {
  const cards = [
    {
      id: 0,
      gradient: "from-slate-800 via-slate-700 to-slate-600",
      name: "TOMSON MARTON",
      number: "4532 7891 2345 6789",
      validThru: "12/28",
      type: "VISA",
      bgPattern: "dots",
    },
    {
      id: 1,
      gradient: "from-indigo-900 via-blue-800 to-indigo-700",
      name: "TOMSON MARTON",
      number: "5412 7534 8691 2347",
      validThru: "09/27",
      type: "MASTERCARD",
      bgPattern: "lines",
    },
    {
      id: 2,
      gradient: "from-purple-900 via-purple-800 to-pink-800",
      name: "TOMSON MARTON",
      number: "4532 7891 2345 6789",
      validThru: "06/29",
      type: "AMEX",
      bgPattern: "gradient",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Button */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Cards</h1>
            <p className="text-gray-600">Manage your virtual payment cards</p>
          </div>
          <button className="btn-primary text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Card
          </button>
        </div>

        {/* All Cards Display - Side by Side */}
        <div className="flex justify-center items-center gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative bg-linear-to-br ${card.gradient} text-white rounded-3xl shadow-2xl w-[380px] h-60 overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              {/* Decorative background patterns */}
              <div className="absolute inset-0 opacity-10">
                {card.bgPattern === "dots" && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                )}
                {card.bgPattern === "lines" && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)",
                    }}
                  />
                )}
                {card.bgPattern === "gradient" && (
                  <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent" />
                )}
              </div>

              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />

              {/* Card content */}
              <div className="relative h-full p-6 flex flex-col justify-between">
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <div className="text-lg font-semibold tracking-wider opacity-90">
                    StripCard
                  </div>
                  <div className="relative w-9 h-9 rounded overflow-hidden  backdrop-blur-sm">
                    <Image
                      src="/card-user.webp"
                      alt="Card User"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Middle section - Chip and contactless */}
                <div className="flex items-center gap-3">
                  {/* EMV Chip */}
                  <div className="w-12 h-9 relative">
                    <Image
                      src="/chip.png"
                      alt="EMV Chip"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Contactless symbol */}
                  <div className="w-8 h-8 relative">
                    <Image
                      src="/waves.png"
                      alt="Contactless"
                      fill
                      className="object-contain opacity-80"
                    />
                  </div>
                </div>

                {/* Card number */}
                <div className="text-xl tracking-[0.2em] font-mono font-semibold">
                  {card.number}
                </div>

                {/* Bottom section */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] text-white/60 uppercase tracking-wider mb-0.5">
                      Card Holder
                    </p>
                    <p className="text-sm font-semibold tracking-wider">
                      {card.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] text-white/60 uppercase tracking-wider mb-0.5">
                      Expires
                    </p>
                    <p className="text-sm font-semibold tracking-wider">
                      {card.validThru}
                    </p>
                  </div>

                  {/* Card network logo */}
                  <div className="text-right">
                    {card.type === "VISA" && (
                      <div className="text-2xl font-bold italic tracking-wider">
                        VISA
                      </div>
                    )}
                    {card.type === "MASTERCARD" && (
                      <div className="flex gap-[-4px]">
                        <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
                        <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-90 -ml-3" />
                      </div>
                    )}
                    {card.type === "AMEX" && (
                      <div className="text-xs font-bold tracking-wider bg-white text-blue-600 px-2 py-1 rounded">
                        AMEX
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hologram effect */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-linear-to-br from-white/30 to-transparent opacity-50 blur-sm" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
