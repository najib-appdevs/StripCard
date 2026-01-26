"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getStrowalletCards } from "../../utils/api";

export default function Strowallet() {
  const router = useRouter();
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
        console.error("Strowallet fetch error:", err);
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
  } = cardsData || {};

  const formatCardNumber = (num) => {
    if (!num) return "•••• •••• •••• ••••";
    const cleaned = num.replace(/\D/g, "");
    return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleViewDetails = (cardId, cardNumber) => {
    // Pass both card_id and card_number (formatted or raw) via query params
    const formattedNumber = formatCardNumber(cardNumber); // or use raw cardNumber if you prefer
    router.push(`/dashboard/Virtual-Card/CardDetails?card_id=${cardId}`);
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            My Virtual Cards
          </h1>
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
            <Link href="/dashboard/Virtual-Card/CreateVirtualCard">
              <button className="px-8 py-3 btn-primary text-white font-medium rounded-lg cursor-pointer">
                Create First Card
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {myCards.map((card) => (
            <div
              key={card.id || card.card_id}
              onClick={() => handleViewDetails(card.card_id, card.card_number)}
              className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden h-72 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-3xl cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

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

                <div className="text-xl tracking-[0.6em] font-mono font-semibold">
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
                        `${cardsData?.user?.firstname || ""} ${cardsData?.user?.lastname || ""}`.trim() ||
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
    </>
  );
}
