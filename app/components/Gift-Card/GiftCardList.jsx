"use client";

import { useState } from "react";

const GiftCardList = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    { value: "all", label: "All Countries" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
  ];

  const giftCards = [
    {
      id: 1,
      name: "Amazon Gift Card",
      image:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 2,
      name: "iTunes Gift Card",
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 3,
      name: "Google Play Card",
      image:
        "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400&h=300&fit=crop",
      country: "uk",
    },
    {
      id: 4,
      name: "Steam Gift Card",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 5,
      name: "Netflix Gift Card",
      image:
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
      country: "ca",
    },
    {
      id: 6,
      name: "Spotify Gift Card",
      image:
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop",
      country: "uk",
    },
    {
      id: 7,
      name: "PlayStation Card",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 8,
      name: "Xbox Gift Card",
      image:
        "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 9,
      name: "Uber Gift Card",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
      country: "au",
    },
    {
      id: 10,
      name: "Starbucks Card",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 11,
      name: "eBay Gift Card",
      image:
        "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&h=300&fit=crop",
      country: "uk",
    },
    {
      id: 12,
      name: "Target Gift Card",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 13,
      name: "Walmart Gift Card",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 14,
      name: "Best Buy Card",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      country: "ca",
    },
    {
      id: 15,
      name: "Sephora Gift Card",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 16,
      name: "Nike Gift Card",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      country: "uk",
    },
    {
      id: 17,
      name: "Apple Store Card",
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      country: "us",
    },
    {
      id: 18,
      name: "Disney+ Gift Card",
      image:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=300&fit=crop",
      country: "au",
    },
  ];

  const selectedLabel =
    countries.find((c) => c.value === selectedCountry)?.label ||
    "All Countries";

  return (
    <>
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gift Cards</h1>

      {/* Filter and Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
        {/* Custom Dropdown with Search Icon */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[200px]"
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-left">{selectedLabel}</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown Content */}
              <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                {countries.map((country) => (
                  <button
                    key={country.value}
                    onClick={() => {
                      setSelectedCountry(country.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      selectedCountry === country.value
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-lg bg-emerald-500 text-white text-sm font-medium">
              1
            </button>
            <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50">
              2
            </button>
            <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50">
              3
            </button>
          </div>
          <button className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {giftCards.map((card) => (
          <div
            key={card.id}
            className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-emerald-400"
          >
            {/* Card Image */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Card Name */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 text-center truncate">
                {card.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GiftCardList;
