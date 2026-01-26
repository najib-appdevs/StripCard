"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getStrowalletCardDetails,
  getStrowalletCardTransactions,
} from "../../utils/api";
import Loader from "../Loader";

import {
  BanknotesIcon,
  ReceiptPercentIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function VirtualCardDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cardId = searchParams.get("card_id");

  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transactions modal states
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [transactionsError, setTransactionsError] = useState(null);

  useEffect(() => {
    if (!cardId) {
      setError("No card selected. Please go back and choose a card.");
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await getStrowalletCardDetails(cardId);

        if (res?.message?.error) {
          throw new Error(
            res.message.error[0] || "Failed to load card details",
          );
        }

        setCardDetails(res);
      } catch (err) {
        setError(err.message || "Failed to load card details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [cardId]);

  const card = cardDetails?.data?.myCards || {};

  const formatCardNumber = (num) => {
    if (!num) return "•••• •••• •••• ••••";
    const cleaned = num.replace(/\D/g, "");
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleBack = () => {
    router.push("/dashboard/Virtual-Card");
  };

  const handleFund = () => {
    if (!cardId) {
      return;
    }

    router.push(`/dashboard/Virtual-Card/FundVirtualCard?card_id=${cardId}`);
  };
  const handleMakeDefault = () => alert("Make default – coming soon");

  const handleTransactions = async () => {
    setShowTransactionsModal(true);
    setLoadingTransactions(true);
    setTransactionsError(null);
    setTransactions([]);

    try {
      const res = await getStrowalletCardTransactions(cardId);

      if (res?.message?.error) {
        throw new Error(res.message.error[0] || "Failed to load transactions");
      }

      setTransactions(res?.data?.card_transactions || []);
    } catch (err) {
      setTransactionsError(err.message || "Failed to load transactions");
      console.error(err);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const closeModal = () => {
    setShowTransactionsModal(false);
  };

  return (
    <>
      {/* Back button & Title */}

      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Virtual Card Details
      </h1>

      {loading ? (
        <div className="flex justify-center py-32">
          <Loader />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-red-700 text-center shadow-sm">
          {error}
        </div>
      ) : !card.card_id ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center text-yellow-800 shadow-sm">
          No card found. Please select a card from the list.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-8">
            {/* Card Visual */}
            <div className="relative bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden h-72 md:h-80 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl mx-auto max-w-md lg:max-w-full">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      card.status
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                        : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                    }`}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-wide text-white/90">
                    {card.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="text-xl font-bold tracking-wide">
                    {card.site_title || "StripCard"}
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={
                        card.site_logo ||
                        "https://mehedi.appdevs.team/stripcard/public/public/backend/images/web-settings/image-assets/seeder/logo-white.png" ||
                        "/card-user.webp"
                      }
                      alt="Card Issuer"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-10 relative">
                    <Image
                      src="/chip.png"
                      alt="EMV Chip"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-9 h-9 relative">
                    <Image
                      src="/waves.png"
                      alt="Contactless"
                      fill
                      className="object-contain opacity-90"
                    />
                  </div>
                </div>

                <div className="text-xl tracking-[0.6em] font-mono font-semibold">
                  {card.card_number
                    ? formatCardNumber(card.card_number)
                    : "•••• •••• •••• ••••"}
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs text-white/70 uppercase tracking-wider">
                    Expires
                  </p>
                  <p className="text-base font-medium">
                    {card.expiry || "••/••"}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-base font-medium uppercase">
                    {card.name || "USER NAME"}
                  </p>
                  <div className="w-16 h-10 relative">
                    <Image
                      src="/Visa-Logo.png"
                      alt="Visa"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <button
                onClick={handleFund}
                className="group flex-1 min-w-[130px] flex items-center justify-center gap-2.5 py-3.5 px-5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50/60 transition-all duration-200"
              >
                <BanknotesIcon className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
                <span className="font-medium text-gray-800 group-hover:text-indigo-700">
                  Fund
                </span>
              </button>

              <button
                onClick={handleMakeDefault}
                className="group flex-1 min-w-[130px] flex items-center justify-center gap-2.5 py-3.5 px-5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:border-amber-300 hover:bg-amber-50/60 transition-all"
              >
                <StarIcon className="w-5 h-5 text-amber-500 group-hover:text-amber-600" />
                <span className="font-medium text-gray-800 group-hover:text-amber-700">
                  Make Default
                </span>
              </button>

              <button
                onClick={handleTransactions}
                className="group flex-1 min-w-[130px] flex items-center justify-center gap-2.5 py-3.5 px-5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50/60 transition-all"
              >
                <ReceiptPercentIcon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700" />
                <span className="font-medium text-gray-800 group-hover:text-emerald-700">
                  Transactions
                </span>
              </button>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Billing Address
                </h3>
              </div>
              <div className="p-6 space-y-6 text-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Billing Country
                    </p>
                    <p className="text-base">United States</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Billing City
                    </p>
                    <p className="text-base">Miami</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Billing State / Address Line
                    </p>
                    <p className="text-base">3401 N. Miami Ave. Ste 230</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      Billing Zip Code
                    </p>
                    <p className="text-base">33127</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-linear-to-r from-slate-50 to-gray-50 px-6 py-5 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Additional Information
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 w-2/5 bg-gray-50/50">
                        Card Amount
                      </td>
                      <td className="py-4 px-6 text-gray-900 font-medium">
                        {card.amount
                          ? `${card.amount} ${cardDetails?.data?.base_curr || "USD"}`
                          : "—"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Card Type
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {card.card_type || "Virtual"}
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Card Id
                      </td>
                      <td className="py-4 px-6 font-mono text-sm text-gray-800 bg-gray-50/30 rounded">
                        {card.card_id || "—"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Customer Id
                      </td>
                      <td className="py-4 px-6 font-mono text-sm text-gray-800 bg-gray-50/30 rounded">
                        {card.card_user_id || "—"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Card Number
                      </td>
                      <td className="py-4 px-6 font-mono text-base text-gray-900 tracking-wider">
                        {card.card_number
                          ? formatCardNumber(card.card_number)
                          : "•••• •••• •••• ••••"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        CVV
                      </td>
                      <td className="py-4 px-6 font-mono text-lg text-gray-900 font-semibold">
                        {card.cvv || "•••"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Expiration
                      </td>
                      <td className="py-4 px-6 font-mono text-base text-gray-900">
                        {card.expiry || "••/••"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        City
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {card.city || "—"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        State
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {card.state || "—"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Zip Code
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {card.zip_code || "—"}
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-700 bg-gray-50/50">
                        Status
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            card.status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {card.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {card.card_back_details && (
              <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Card Back Details
                </h3>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: card.card_back_details }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transactions Modal */}
      {showTransactionsModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Virtual Card Transactions
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              >
                <XMarkIcon className="w-7 h-7 cursor-pointer" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {loadingTransactions ? (
                <div className="flex justify-center items-center py-16">
                  <Loader />
                </div>
              ) : transactionsError ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-center">
                  {transactionsError}
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-lg font-medium">No transactions found</p>
                  <p className="mt-2">
                    This card has no transaction history yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            {tx.created_at || tx.date || "—"}
                          </p>
                          <p className="font-medium text-gray-900 mt-0.5">
                            {tx.description || tx.type || "Transaction"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold text-lg ${
                              tx.amount > 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {tx.amount
                              ? `${tx.amount > 0 ? "+" : ""}${tx.amount} ${
                                  tx.currency || "USD"
                                }`
                              : "—"}
                          </p>
                        </div>
                      </div>
                      {tx.reference && (
                        <p className="text-xs text-gray-500 mt-1">
                          Ref: {tx.reference}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 btn-primary text-white font-medium rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
