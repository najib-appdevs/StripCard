/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { countryOptions } from "../../utils/countries";
import BuyGiftCardModal from "./BuyGiftCardModal";

const GiftCardForm = ({ card }) => {
  const [amount, setAmount] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fromName, setFromName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wallet, setWallet] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);

  const countryDropdownRef = useRef(null);
  const walletDropdownRef = useRef(null);

  const walletOptions = ["United States dollar (USD)"]; // Will Come real data from APIs Later

  const handleSubmit = () => {
    if (!amount || !receiverEmail || !country || !wallet) {
      toast.error("Please fill in all fields");
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
      phone: phone.startsWith("+") ? phone : `${countryCode}${phone}`,
      fromName,
      quantity,
      wallet,
      cardId: card.id,
    });

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

  useEffect(() => {
    if (countryCode) {
      setPhone(countryCode + " ");
    }
  }, [countryCode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryDropdownOpen(false);
      }
      if (
        walletDropdownRef.current &&
        !walletDropdownRef.current.contains(event.target)
      ) {
        setWalletDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                  <div className="relative" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setCountryDropdownOpen(!countryDropdownOpen)
                      }
                      className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg text-gray-800 bg-white focus:border-emerald-500 focus:outline-none transition-all text-left"
                    >
                      <span
                        className={country ? "text-gray-800" : "text-gray-400"}
                      >
                        {country || "Select country"}
                      </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {countryDropdownOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>

                    {countryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {countryOptions.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setCountry(c.name);
                              setCountryCode(c.callingCode);
                              setCountryDropdownOpen(false);
                            }}
                            className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors text-gray-800 border-b border-neutral-100 last:border-b-0"
                          >
                            {c.name}
                          </div>
                        ))}
                      </div>
                    )}
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
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner"
                  />
                </div>
              </div>

              {/* From & Quantity */}
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
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) => {
                      const val = e.target.value;

                      // Allow empty string (user deleting) or valid positive integers
                      if (val === "" || /^[1-9]\d*$/.test(val)) {
                        setQuantity(val === "" ? "" : Number(val));
                      }
                      // if user types 0 or 00 or 001 etc → we just ignore it
                    }}
                    onBlur={(e) => {
                      // When user leaves the field → force valid value
                      const num = Number(e.target.value);
                      if (isNaN(num) || num < 1) {
                        setQuantity(1);
                      } else if (num > 10) {
                        setQuantity(10);
                      }
                    }}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner"
                  />
                </div>
              </div>

              {/* Wallet */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wallet
                </label>
                <div className="relative" ref={walletDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                    className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg text-gray-800 bg-white focus:border-emerald-500 focus:outline-none transition-all text-left"
                  >
                    <span
                      className={wallet ? "text-gray-800" : "text-gray-400"}
                    >
                      {wallet || "Select wallet"}
                    </span>
                  </button>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {walletDropdownOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>

                  {walletDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {walletOptions.map((w) => (
                        <div
                          key={w}
                          onClick={() => {
                            setWallet(w);
                            setWalletDropdownOpen(false);
                          }}
                          className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors text-gray-800 border-b border-neutral-100 last:border-b-0"
                        >
                          {w}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleSubmit}
                className="cursor-pointer w-full btn-primary text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-6 hover:from-emerald-600 hover:to-green-700"
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
