"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import BuyGiftCardModal from "./BuyGiftCardModal";

const GiftCardForm = ({ card }) => {
  const [amount, setAmount] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [fromName, setFromName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wallet, setWallet] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const walletOptions = ["United States dollar (USD)"];

  const countryOptions = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "France",
    "Nigeria",
    "Ghana",
    "South Africa",
    "Kenya",
    "Australia",
  ];

  const handleSubmit = () => {
    if (!amount || !receiverEmail || !country || !wallet) {
      alert("Please fill Amount, Receiver Email, Country and Payment Method");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Purchase confirmed:", {
      productName: card.name,
      amount: Number(amount),
      receiverEmail,
      country,
      phone,
      fromName,
      quantity,
      wallet,
      cardId: card.id,
    });
    // → Here you would call my real payment API
    setIsModalOpen(false);
  };

  const purchaseDetails = {
    productName: card.name,
    amount: Number(amount) || 0,
    quantity,
    receiverEmail: receiverEmail || "N/A",
    country: country || "N/A",
    phone: phone || "N/A",
    fromName: fromName || "N/A",
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Left: Card Image & Info */}
          <div className="md:col-span-2 bg-gray-100 p-8 flex flex-col justify-center items-center">
            <div className="w-full max-w-xs">
              <img
                src={card.image}
                alt={card.name}
                className="w-full aspect-square object-cover rounded-xl shadow-md mb-6"
              />
              <h1 className="text-2xl font-bold mb-2 text-gray-900">
                {card.name}
              </h1>
              {card.country && (
                <p className="text-gray-600 text-sm mb-4">
                  {card.country} Gift Card
                </p>
              )}
              <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {card.availableBalance.toFixed(2)} EUR
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Purchase Details
            </h2>

            <div className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Select an amount between {card.minAmount.toFixed(2)} -{" "}
                  {card.maxAmount.toFixed(2)} EUR
                </p>
                <input
                  type="number"
                  min={card.minAmount}
                  max={card.maxAmount}
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner"
                />
              </div>

              {/* Receiver Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Email
                </label>
                <input
                  type="email"
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                  placeholder="Enter Receiver Email Address"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {/* Country & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg text-gray-800 bg-white focus:border-emerald-500 focus:outline-none appearance-none transition-all"
                    >
                      <option value="">Select country</option>
                      {countryOptions.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* From Name & Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner"
                  />
                </div>
              </div>

              {/* Wallet */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wallet
                </label>
                <div className="relative">
                  <select
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg text-gray-800 bg-white focus:border-emerald-500 focus:outline-none appearance-none transition-all"
                  >
                    <option value="">Select wallet</option>
                    {walletOptions.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleSubmit}
                className="cursor-pointer w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-6 hover:from-emerald-600 hover:to-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The modal – now shows everything you asked for */}
      <BuyGiftCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        purchaseDetails={purchaseDetails}
      />
    </>
  );
};

export default GiftCardForm;
