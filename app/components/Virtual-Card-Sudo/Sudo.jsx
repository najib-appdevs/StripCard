"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getSudoCards } from "../../utils/api";
import toast from "react-hot-toast";

export default function Sudo() {
  const router = useRouter();
  const [cardsData, setCardsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getSudoCards();

        if (res?.message?.error) {
          setError(res.message.error[0] || "Failed to load virtual cards");
          return;
        }

        if (res?.data) {
          setCardsData(res.data);
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        // console.error("Sudo fetch error:", err);
        toast.error("Something went wrong. Please try again later");
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
    card_basic_info = {},
    transactions = [],
    user,
  } = cardsData || {};

  // ────────────────────────────────────────────────
  // Formatting Helpers
  // ────────────────────────────────────────────────
  const formatCardNumber = (num) => {
    if (!num) return "•••• •••• •••• ••••";
    const cleaned = num.replace(/\D/g, "");
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (str) => {
    if (!str) return "—";

    return str;
  };

  const getTransactionColor = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleViewDetails = (cardId, cardNumber) => {
    router.push(`/dashboard/Virtual-Card/CardDetails?card_id=${cardId}`);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Virtual Cards</h1>
        </div>

        {card_create_action && (
          <Link
            href="/dashboard/Virtual-Card/CreateVirtualCard"
            className="inline-flex items-center gap-2 px-6 py-3 btn-primary text-white font-medium rounded-xl shadow-md transition-all duration-200"
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

      {/* Cards grid */}
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
            <Link href="/dashboard/Virtual-Card-Sudo/CreateVirtualCard">
              <button className="cursor-pointer px-8 py-3 btn-primary  text-white font-medium rounded-lg transition-colors">
                Create First Card
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCards.map((card) => (
            <div
              key={card.id || card.card_id}
              onClick={() => handleViewDetails(card.card_id, card.card_number)}
              className="relative bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden h-72 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-3xl cursor-pointer group"
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

              {/* Status Indicator */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      card.card_status?.toLowerCase() === "active"
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                        : card.card_status?.toLowerCase() === "pending"
                          ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                          : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                    }`}
                  />
                  <span className="text-[10px] font-medium uppercase tracking-wide text-white/90">
                    {card.card_status || "Unknown"}
                  </span>
                </div>
              </div>

              <div className="relative h-full p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="text-xl font-bold tracking-wide">
                    {card.site_title ||
                      card_basic_info?.site_title ||
                      "StripCard"}
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={
                        card.site_logo ||
                        card_basic_info?.site_logo ||
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

                <div className="text-xl tracking-[0.25em] font-mono font-semibold">
                  {formatCardNumber(card.card_number)}
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
                  <div>
                    <p className="text-base font-medium uppercase">
                      {card.name ||
                        `${user?.firstname || ""} ${user?.lastname || ""}`.trim() ||
                        "USER NAME"}
                    </p>
                  </div>
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
          ))}
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden mt-12">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All activity related to your virtual cards (Sudo)
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Type
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Amount
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payable
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Charge
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    card Amount
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Balance
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(tx.date_time)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {tx.trx || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {tx.transaction_type
                        ?.replace(/Virtual Card\(/g, "")
                        .replace(/\)/g, "") || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatAmount(tx.payable)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-amber-700">
                      {formatAmount(tx.total_charge)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatAmount(tx.card_amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {formatAmount(tx.current_balance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
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
