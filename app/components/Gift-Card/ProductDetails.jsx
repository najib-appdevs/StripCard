/* eslint-disable @next/next/no-img-element */

"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getAllGiftCards, getGiftCardDetails } from "../../utils/api";
import BuyGiftCardModal from "./BuyGiftCardModal";
import GiftCardFormSkeleton from "./GiftCardFormSkeleton";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  // ==================== State Management ====================
  const [card, setCard] = useState(null);
  const [loadingCard, setLoadingCard] = useState(true);
  const [error, setError] = useState(null);

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
  const [countryIso, setCountryIso] = useState("");

  // Dynamic countries
  const [countryOptions, setCountryOptions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  // Dynamic wallets
  const [walletOptions, setWalletOptions] = useState([]);
  const [loadingWallets, setLoadingWallets] = useState(true);

  const countryDropdownRef = useRef(null);
  const walletDropdownRef = useRef(null);

  // ==================== Fetch Gift Card Details ====================
  useEffect(() => {
    if (!productId) {
      setError("No product ID provided in URL");
      setLoadingCard(false);
      return;
    }

    const fetchCardDetails = async () => {
      try {
        setLoadingCard(true);
        setError(null);

        const response = await getGiftCardDetails(productId);

        if (response?.message?.error) {
          toast.error(
            response.message.error[0] || "Failed to load gift card details",
          );
        }

        const apiProduct = response?.data?.product;

        if (!apiProduct || !apiProduct.productId) {
          toast.error("Gift card product data not found in response");
        }

        const normalizedCard = {
          id: apiProduct.productId,
          name: apiProduct.productName,
          image: apiProduct.logoUrls?.[0] || null,
          currency: apiProduct.recipientCurrencyCode || "USD",
          denominationType: apiProduct.denominationType || "RANGE",
          minAmount: Number(apiProduct.minRecipientDenomination || 1),
          maxAmount: Number(apiProduct.maxRecipientDenomination || 10000),
          fixedRecipientDenominations:
            apiProduct.fixedRecipientDenominations || [],
          raw: apiProduct,
        };

        setCard(normalizedCard);
      } catch (err) {
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Failed to load gift card");
      } finally {
        setLoadingCard(false);
      }
    };

    fetchCardDetails();
  }, [productId]);

  // ==================== Fetch Countries ====================
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const response = await getAllGiftCards(1);

        if (response?.message?.error) {
          toast.error(response.message.error[0] || "Failed to load countries");
          return;
        }

        const apiCountries = response?.data?.countries || [];

        const formatted = apiCountries.map((c) => ({
          name: c.name,
          code: c.iso2,
          callingCode: `+${c.mobile_code}`,
        }));

        formatted.sort((a, b) => a.name.localeCompare(b.name));
        setCountryOptions(formatted);
      } catch (err) {
        toast.error("Failed to load country list");
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // ==================== Fetch Wallet Options ====================
  useEffect(() => {
    if (!card?.id) return;

    const fetchWallets = async () => {
      try {
        setLoadingWallets(true);

        const response = await getGiftCardDetails(card.id);

        if (response?.message?.error) {
          toast.error(
            response.message.error[0] || "Failed to load wallet options",
          );
          return;
        }

        const userWallets = response?.data?.userWallet || [];

        const formattedWallets = userWallets.map((w) => ({
          name: `${w.name} (${w.currency_code})`,
          currency: w.currency_code,
          balance: w.balance,
          symbol: w.currency_symbol || "",
        }));

        setWalletOptions(formattedWallets);
      } catch (err) {
        toast.error("Failed to load available wallets");
      } finally {
        setLoadingWallets(false);
      }
    };

    fetchWallets();
  }, [card?.id]);

  // ==================== Auto-fill Phone Country Code ====================
  useEffect(() => {
    if (countryCode) {
      setPhone(countryCode + " ");
    }
  }, [countryCode]);

  // ==================== Close Dropdowns on Outside Click ====================
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

  // ==================== Form Submission Handler ====================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !receiverEmail || !country || !wallet) {
      toast.error("Please complete all required fields");
      return;
    }

    const min =
      card.denominationType === "FIXED"
        ? Math.min(...(card.fixedRecipientDenominations || [0]))
        : card.minAmount;
    const max =
      card.denominationType === "FIXED"
        ? Math.max(...(card.fixedRecipientDenominations || [Infinity]))
        : card.maxAmount;

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < min || numAmount > max) {
      toast.error(
        `Amount must be between ${min.toFixed(2)} and ${max.toFixed(2)} ${
          card.currency || "currency"
        }`,
      );
      return;
    }

    setIsModalOpen(true);
  };

  // ==================== Confirm Purchase Handler ====================
  const handleConfirm = () => {
    setIsModalOpen(false);
    toast.success("Purchase request sent!");
  };

  // ==================== Purchase Details Object ====================
  const purchaseDetails = {
    productId: card?.id,
    productName: card?.name,
    amount: Number(amount) || 0,
    quantity,
    receiverEmail: receiverEmail || "N/A",
    country: country || "N/A",
    countryIso: countryIso || "",
    phone: phone || "N/A",
    fromName: fromName || "N/A",
    wallet,
  };

  // ==================== LOADING / ERROR STATES ====================
  if (loadingCard) {
    return <GiftCardFormSkeleton />;
  }

  if (error || !card) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-600 dark:text-red-400 text-lg mb-4">
          {error || "Gift card not found"}
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-neutral-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left - Card Display */}
            <div className="md:col-span-2 bg-gray-100 dark:bg-gray-800 p-8 flex flex-col justify-center items-center">
              <div className="w-full max-w-xs">
                <img
                  src={card.image || "/images/placeholder-giftcard.png"}
                  alt={card.name}
                  className="w-full aspect-square object-cover rounded-xl shadow-md mb-6"
                />
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {card.name}
                </h1>

                {/* Wallet Balance Display */}
                {walletOptions.length > 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-neutral-200 dark:border-gray-700 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                      Available balance
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {walletOptions.map((w, idx) => (
                        <span key={w.currency}>
                          {w.symbol}
                          {w.balance?.toFixed(4)}
                          {idx < walletOptions.length - 1 && " | "}
                        </span>
                      ))}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-neutral-200 dark:border-gray-700 shadow-sm animate-pulse">
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-7 w-48 bg-gray-300 dark:bg-gray-600 rounded" />
                  </div>
                )}
              </div>
            </div>

            {/* Right - Form Fields */}
            <div className="md:col-span-3 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Purchase Details
              </h2>

              <div className="space-y-4">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-2">
                    {card.denominationType === "FIXED"
                      ? `Available options: ${card.fixedRecipientDenominations?.join(
                          ", ",
                        )} ${card.currency || ""}`
                      : `Select an amount between ${card.minAmount?.toFixed(
                          2,
                        )} - ${card.maxAmount?.toFixed(
                          2,
                        )} ${card.currency || ""}`}
                  </p>
                  <input
                    type="number"
                    min={card.minAmount}
                    max={card.maxAmount}
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner bg-white dark:bg-gray-800"
                  />
                </div>

                {/* Receiver Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Receiver Email
                  </label>
                  <input
                    type="email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                    placeholder="Enter Receiver Email Address"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all bg-white dark:bg-gray-800"
                  />
                </div>

                {/* Country & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Country
                    </label>
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() =>
                          setCountryDropdownOpen(!countryDropdownOpen)
                        }
                        disabled={loadingCountries}
                        className="cursor-pointer w-full px-4 py-3 pr-10 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:border-emerald-500 focus:outline-none transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span
                          className={
                            country
                              ? "text-gray-800 dark:text-gray-200"
                              : "text-gray-400 dark:text-gray-500"
                          }
                        >
                          {loadingCountries
                            ? "Select country"
                            : country || "Select country"}
                        </span>
                      </button>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {countryDropdownOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        )}
                      </div>

                      {countryDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-neutral-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                          {countryOptions.map((c) => (
                            <div
                              key={c.code}
                              onClick={() => {
                                setCountry(c.name);
                                setCountryIso(c.code);
                                setCountryCode(c.callingCode);
                                setCountryDropdownOpen(false);
                              }}
                              className="cursor-pointer px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors text-gray-800 dark:text-gray-200 border-b border-neutral-100 dark:border-gray-700 last:border-b-0"
                            >
                              {c.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>

                {/* From Name & Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all bg-white dark:bg-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Quantity
                    </label>
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
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400 focus:border-emerald-500 focus:outline-none transition-all no-spinner bg-white dark:bg-gray-800"
                    />
                  </div>
                </div>

                {/* Wallet */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Wallet
                  </label>
                  <div className="relative" ref={walletDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                      disabled={loadingWallets}
                      className="cursor-pointer w-full px-4 py-3 pr-10 border border-neutral-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:border-emerald-500 focus:outline-none transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span
                        className={
                          wallet
                            ? "text-gray-800 dark:text-gray-200"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      >
                        {loadingWallets
                          ? "Select wallet"
                          : wallet || "Select wallet"}
                      </span>
                    </button>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {walletDropdownOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                      )}
                    </div>

                    {walletDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-neutral-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {walletOptions.length === 0 ? (
                          <div className="px-4 py-3 text-gray-500 dark:text-gray-300">
                            No wallets available
                          </div>
                        ) : (
                          walletOptions.map((w) => (
                            <div
                              key={w.currency}
                              onClick={() => {
                                setWallet(w.name);
                                setWalletDropdownOpen(false);
                              }}
                              className="cursor-pointer px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors text-gray-800 dark:text-gray-200 border-b border-neutral-100 dark:border-gray-700 last:border-b-0"
                            >
                              <span>{w.name}</span>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-linear-to-r from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-6 hover:from-emerald-600 hover:to-green-700 dark:hover:from-emerald-700 dark:hover:to-green-800"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <BuyGiftCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        purchaseDetails={purchaseDetails}
        card={card}
      />
    </>
  );
};

export default ProductDetails;
