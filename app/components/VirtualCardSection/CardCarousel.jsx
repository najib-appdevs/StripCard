/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CardCarousel() {
  const [activeCard, setActiveCard] = useState(1);

  const cards = [
    {
      id: 0,
      gradient: "from-blue-600 to-blue-700",
      name: "TOMSON MARTON",
      number: "1247 **** 0000 8471",
      validThru: "12/36",
    },
    {
      id: 1,
      gradient: "from-blue-900 to-blue-800",
      name: "TOMSON MARTON",
      number: "1247 **** 0000 8471",
      validThru: "12/36",
      showPlaceholder: true,
    },
    {
      id: 2,
      gradient: "from-purple-600 to-purple-800",
      name: "TOMSON MARTON",
      number: "1247 **** 0000 8471",
      validThru: "12/36",
    },
  ];

  // Auto-rotate every 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Correct Card Position Logic
  const getCardPosition = (index) => {
    if (index === activeCard) return "center";

    if (
      index === activeCard + 1 ||
      (activeCard === cards.length - 1 && index === 0)
    )
      return "right";

    return "left";
  };

  const positionStyles = {
    center: "z-20 scale-100 opacity-100 left-1/2 -translate-x-1/2",
    left: "z-10 scale-90 opacity-60 -translate-x-[45%]",
    right: "z-10 scale-90 opacity-60 translate-x-[45%]",
  };

  return (
    <>
      <div className="relative flex justify-center items-center mb-3 min-h-[200px]">
        {cards.map((card, i) => {
          const pos = getCardPosition(i);

          return (
            <div
              key={card.id}
              className={`
                absolute transition-all duration-700 ease-out
                ${positionStyles[pos]}
              `}
            >
              <div
                className={`bg-linear-to-br ${card.gradient} text-white p-4 rounded-2xl shadow-xl w-72 sm:w-80`}
              >
                {/* Top Row */}
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg tracking-wide">{card.name}</h3>
                </div>

                {/* Chip + signal waves */}
                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src="/Chip.png"
                    alt="chip"
                    width={40}
                    height={28}
                    className="object-contain"
                  />

                  <Image
                    src="/waves.png"
                    alt="nfc"
                    width={20}
                    height={20}
                    className="object-contain opacity-80"
                  />
                </div>

                {/* Card Number */}
                <div className="text-xl tracking-widest font-mono mb-2">
                  {card.number}
                </div>

                {/* Valid thru + Visa logo */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-300 text-xs">Valid Thru</p>
                    <p>{card.validThru}</p>
                  </div>

                  <Image
                    src="/Visa-Logo.png"
                    alt="visa"
                    width={48}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mb-2">
        {cards.map((c, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCard(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeCard === idx ? "bg-green-500 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}
