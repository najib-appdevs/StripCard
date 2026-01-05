/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import BuyGiftCardModal from "./BuyGiftCardModal";
import { getGiftCardDetails, getAllGiftCards } from "../../utils/api"; // adjust path if needed

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

  // Dynamic countries (already fetched in previous version)
  const [countryOptions, setCountryOptions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  // Dynamic wallets from API
  const [walletOptions, setWalletOptions] = useState([]);
  const [loadingWallets, setLoadingWallets] = useState(true);

  const countryDropdownRef = useRef(null);
  const walletDropdownRef = useRef(null);

  // Fetch countries (you already have this)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const response = await getAllGiftCards(1); // We just need countries list

        if (response?.message?.error) throw new Error("Failed to load countries");

        const apiCountries = response?.data?.countries || [];

        const formatted = apiCountries.map((c) => ({
          name: c.name,
          code: c.iso2,
          callingCode: `+${c.mobile_code}`,
        }));

        formatted.sort((a, b) => a.name.localeCompare(b.name));
        setCountryOptions(formatted);
      } catch (err) {
        console.error("Error loading countries:", err);
        toast.error("Failed to load country list");
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // NEW: Fetch wallet options from gift card details API
  useEffect(() => {
    const fetchWallets = async () => {
      if (!card?.id) return;

      try {
        setLoadingWallets(true);

        const response = await getGiftCardDetails(card.id);

        if (response?.message?.error) {
          throw new Error(response.message.error[0] || "Failed to load wallet options");
        }

        const userWallets = response?.data?.userWallet || [];

        // Transform to clean dropdown options
        const formattedWallets = userWallets.map((w) => ({
          name: `${w.name} (${w.currency_code})`,
          currency: w.currency_code,
          balance: w.balance,
          symbol: w.currency_symbol || "",
        }));

        setWalletOptions(formattedWallets);
      } catch (err) {
        console.error("Error loading wallets:", err);
        toast.error("Failed to load available wallets");
      } finally {
        setLoadingWallets(false);
      }
    };

    fetchWallets();
  }, [card?.id]);

  const handleSubmit = () => {
    if (!amount || !receiverEmail || !country || !wallet) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Amount validation
    const min = card.denominationType === "FIXED"
      ? Math.min(...(card.fixedRecipientDenominations || [0]))
      : card.minAmount;
    const max = card.denominationType === "FIXED"
      ? Math.max(...(card.fixedRecipientDenominations || [Infinity]))
      : card.maxAmount;

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < min || numAmount > max) {
      toast.error(`Amount must be between ${min} and ${max} ${card.currency || "currency"}`);
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log("Purchase confirmed:", {
      productId: card.id,
      productName: card.name,
      amount: Number(amount),
      receiverEmail,
      country,
      phone: phone.startsWith("+") ? phone : `${countryCode}${phone}`.trim(),
      fromName,
      quantity,
      wallet,
    });

    setIsModalOpen(false);
    toast.success("Purchase request sent!");
  };

  const purchaseDetails = {
  productId: card.id,           // ← Very important!
  productName: card.name,
  amount: Number(amount) || 0,
  quantity,
  receiverEmail: receiverEmail || "N/A",
  country: country || "N/A",
  phone: phone || "N/A",
  fromName: fromName || "N/A",
  wallet,                       
};
  useEffect(() => {
    if (countryCode) {
      setPhone(countryCode + " ");
    }
  }, [countryCode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setCountryDropdownOpen(false);
      }
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target)) {
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
          {/* Left side - unchanged */}
          <div className="md:col-span-2 bg-gray-100 p-8 flex flex-col justify-center items-center">
            <div className="w-full max-w-xs">
              <img
                src={card.image}
                alt={card.name}
                className="w-full aspect-square object-cover rounded-xl shadow-md mb-6"
              />
              <h1 className="text-2xl font-bold mb-2 text-gray-900">{card.name}</h1>
              {card.country && (
                <p className="text-gray-600 text-sm mb-4">{card.country} Gift Card</p>
              )}
              <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {card.denominationType === "FIXED"
                    ? card.fixedRecipientDenominations?.join(" | ") + " " + (card.currency || "")
                    : `${card.minAmount?.toFixed(2)} - ${card.maxAmount?.toFixed(2)} ${card.currency || ""}`}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase Details</h2>

            <div className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <p className="text-xs text-gray-500 mb-2">
                  {card.denominationType === "FIXED"
                    ? `Available options: ${card.fixedRecipientDenominations?.join(", ")} ${card.currency || ""}`
                    : `Select between ${card.minAmount?.toFixed(2)} - ${card.maxAmount?.toFixed(2)} ${card.currency || ""}`}
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Receiver Email</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <div className="relative" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                      disabled={loadingCountries}
                      className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg text-gray-800 bg-white focus:border-emerald-500 focus:outline-none transition-all text-left disabled:opacity-50"
                    >
                      <span className={country ? "text-gray-800" : "text-gray-400"}>
                        {loadingCountries ? "Loading countries..." : country || "Select country"}
                      </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {countryDropdownOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
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
                            {c.name} ({c.callingCode})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner"
                  />
                </div>
              </div>

              {/* From Name & Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Name</label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^[1-9]\d*$/.test(val)) {
                        setQuantity(val === "" ? "" : Number(val));
                      }
                    }}
                    onBlur={() => {
                      const num = Number(quantity);
                      if (isNaN(num) || num < 1) setQuantity(1);
                      if (num > 100) setQuantity(100);
                    }}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner"
                  />
                </div>
              </div>

              {/* Wallet - NOW DYNAMIC */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet</label>
                <div className="relative" ref={walletDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                    disabled={loadingWallets}
                    className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg text-gray-800 bg-white focus:border-emerald-500 focus:outline-none transition-all text-left disabled:opacity-50"
                  >
                    <span className={wallet ? "text-gray-800" : "text-gray-400"}>
                      {loadingWallets
                        ? "Loading wallets..."
                        : wallet || "Select wallet"}
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
                      {walletOptions.length === 0 ? (
                        <div className="px-4 py-3 text-gray-500">No wallets available</div>
                      ) : (
                        walletOptions.map((w) => (
                          <div
                            key={w.currency}
                            onClick={() => {
                              setWallet(w.name);
                              setWalletDropdownOpen(false);
                            }}
                            className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors text-gray-800 border-b border-neutral-100 last:border-b-0 flex justify-between"
                          >
                            <span>{w.name}</span>
                            <span className="text-gray-600">
                              Balance: {w.symbol}{w.balance?.toFixed(2)}
                            </span>
                          </div>
                        ))
                      )}
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