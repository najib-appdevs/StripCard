"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getStrowalletCards } from "../../utils/api";

export default function Strowallet() {
  const [cardsData, setCardsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getStrowalletCards();

        if (res?.message?.error) {
          setError(res.message.error[0] || "Failed to load virtual cards");
          return;
        }

        if (res?.data) {
          setCardsData(res.data);
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        console.log("Strowallet fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const {
    myCards = [],
    card_create_action = false,
    cardCharge,
    card_basic_info = {},
    transactions = [],
  } = cardsData || {};

  // ────────────────────────────────────────────────
  // Helper functions
  // ────────────────────────────────────────────────
  const formatCardNumber = (num) => {
    if (!num) return "•••• •••• •••• ••••";
    const cleaned = num.replace(/\D/g, "");
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const getExpiry = (card) => {
    // Adjust field names once you see real API response
    if (card.expiry_month && card.expiry_year) {
      return `${card.expiry_month.toString().padStart(2, "0")}/${card.expiry_year.toString().slice(2)}`;
    }
    return "12/28"; // fallback
  };

  const formatAmount = (amountStr) => {
    if (!amountStr) return "$0.00";
    const [value, currency = "USD"] = amountStr.trim().split(" ");
    const num = parseFloat(value) || 0;
    const sign = num < 0 ? "-" : "";
    return `${sign}$${Math.abs(num).toFixed(2)}`;
  };

  const getTransactionColor = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    return new Date(isoString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────
  return (
    <>
      {/* Header + Create button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Virtual Cards</h1>
          <p className="text-gray-600 mt-1">
            Manage your secure virtual payment cards
          </p>
        </div>

        {card_create_action && (
          <Link
            href="/dashboard/Virtual-Card/CreateVirtualCard"
            className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white font-medium rounded-xl shadow-md transition-all duration-200 cursor-pointer"
          >
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
            Create New Card
          </Link>
        )}
      </div>

      {/* Cards Section */}
      {myCards.length === 0 ? (
        <div className="bg-gray-50 border-2 border-solid border-gray-300 rounded-2xl p-12 text-center mt-5">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            No virtual cards yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Create your first virtual card to start making secure online
            payments.
          </p>
          {card_create_action && (
            <Link href="/dashboard/Virtual-Card/CreateVirtualCard">
              <button className="px-8 py-3 btn-primary text-white font-medium rounded-lg cursor-pointer">
                Create First Card
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCards.map((card) => (
            <div
              key={card.id || card.card_number}
              className="relative bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden h-64 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-3xl cursor-pointer"
            >
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

              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                {/* Top */}
                <div className="flex justify-between items-start">
                  <div className="text-xl font-bold tracking-wide">
                    {card_basic_info?.site_title || "StripCard"}
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
                    <Image
                      src={
                        card_basic_info?.site_logo || "/placeholder-logo.png"
                      }
                      alt="Card Issuer"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Chip area */}
                <div className="flex items-center gap-4 mt-2">
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

                {/* Number */}
                <div className="text-2xl tracking-[0.25em] font-mono font-semibold mt-4">
                  {formatCardNumber(card.card_number || card.masked_number)}
                </div>

                {/* Bottom */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                      Cardholder
                    </p>
                    <p className="text-base font-medium">
                      {card.card_holder_name ||
                        `${cardsData?.user?.firstname || ""} ${cardsData?.user?.lastname || ""}`.trim() ||
                        "USER NAME"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                      Expires
                    </p>
                    <p className="text-base font-medium">{getExpiry(card)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden mt-12">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All activity related to your virtual cards (Strowallet)
          </p>
        </div>

        {transactions.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No transactions found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trx
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Type
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Amount
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payable
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Charge
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Card Amount
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(tx.date_time)}
                    </td>

                    {/* Trx */}
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {tx.trx || "—"}
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {tx.transaction_type
                        ?.replace(/Virtual Card\(/g, "")
                        .replace(/\)/g, "") || "—"}
                    </td>

                    {/* Request Amount */}
                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span
                        className={
                          tx.request_amount?.includes("-")
                            ? "text-red-600"
                            : "text-emerald-600"
                        }
                      >
                        {formatAmount(tx.request_amount)}
                      </span>
                    </td>

                    {/* Payable */}
                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatAmount(tx.payable)}
                    </td>

                    {/* Total Charge */}
                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium text-amber-700">
                      {formatAmount(tx.total_charge)}
                    </td>

                    {/* Card Amount */}
                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatAmount(tx.card_amount)}
                    </td>

                    {/* Current Balance */}
                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatAmount(tx.current_balance)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getTransactionColor(
                          tx.status,
                        )}`}
                      >
                        {tx.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
