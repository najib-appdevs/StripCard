"use client";

import { useEffect, useState } from "react";

export default function PromoCarousel() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  // Promotional offers data
  const promoCards = [
    {
      id: 1,
      title: "Get 10% Cash Back",
      subtitle: "on Your next transaction",
      buttonText: "Transfer Money",
      gradient: "from-teal-800 to-teal-900",
    },
    {
      id: 2,
      title: "Earn 5% Rewards",
      subtitle: "on all online purchases",
      buttonText: "Shop Now",
      gradient: "from-purple-800 to-purple-900",
    },
    {
      id: 3,
      title: "Free International Transfer",
      subtitle: "for this month only",
      buttonText: "Send Money",
      gradient: "from-blue-800 to-blue-900",
    },
    {
      id: 4,
      title: "20% Off Premium",
      subtitle: "upgrade your account today",
      buttonText: "Upgrade Now",
      gradient: "from-orange-800 to-orange-900",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promoCards.length]);

  const goToPromo = (index) => {
    setCurrentPromoIndex(index);
  };

  const nextPromo = () => {
    setCurrentPromoIndex((prev) => (prev + 1) % promoCards.length);
  };

  const prevPromo = () => {
    setCurrentPromoIndex(
      (prev) => (prev - 1 + promoCards.length) % promoCards.length
    );
  };

  return (
    <div className="relative mb-4 sm:mb-6">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
        >
          {promoCards.map((promo) => (
            <div key={promo.id} className="w-full flex-shrink-0">
              <div
                className={`bg-gradient-to-br ${promo.gradient} text-white p-4 sm:p-6 rounded-xl`}
              >
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold mb-1">
                    {promo.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-90">
                    {promo.subtitle}
                  </p>
                </div>
                <button className="bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg border border-white/30 hover:bg-white/30 transition">
                  {promo.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-items-start gap-2 mt-4">
        {promoCards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPromo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentPromoIndex
                ? "bg-green-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to promotion ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
