"use client";

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

  // Auto-rotate every 3sec
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
      <div className="relative flex justify-center items-center mb-10 min-h-[260px]">
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
                className={`bg-gradient-to-br ${card.gradient} text-white p-6 rounded-2xl shadow-xl w-72 sm:w-80`}
              >
                <div className="flex justify-between mb-6">
                  <h3 className="text-lg font-bold tracking-wide">
                    {card.name}
                  </h3>
                  <div className="flex gap-2 items-center">
                    {card.showPlaceholder && (
                      <div className="w-7 h-7 bg-gray-200 border-2 border-dashed rounded" />
                    )}
                    <span className="text-2xl font-bold">VISA</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`${
                      card.showPlaceholder
                        ? "bg-gray-200 border-2 border-dashed"
                        : "bg-gray-300/40"
                    } w-10 h-7 rounded`}
                  />
                </div>

                <div className="text-xl tracking-widest font-mono mb-4">
                  {card.number}
                </div>

                <div>
                  <p className="text-gray-300 text-xs">Valid Thru</p>
                  <p className="font-semibold">{card.validThru}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mb-6">
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
