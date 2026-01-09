/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUserGiftCards } from "../../utils/api";
import GiftCardTableSkeleton from "./GiftCardTableSkeleton";

const GiftCardTable = () => {
  // ============================================
  // State Management
  // ============================================
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // Data Fetching
  // ============================================
  useEffect(() => {
    const fetchGiftCards = async () => {
      setLoading(true);
      try {
        const response = await getUserGiftCards();

        if (response?.message?.success) {
          setGiftCards(response.data?.gift_cards || []);
        } else {
          const errorMsg =
            response?.message?.error?.[0] ||
            response?.message?.error ||
            "Failed to load gift card history";
          toast.error(errorMsg);
        }
      } catch (err) {
        const serverError =
          err?.response?.data?.message?.error?.[0] ||
          err?.response?.data?.message ||
          "Something went wrong while loading gift cards";
        toast.error(serverError);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCards();
  }, []);

  // ============================================
  // Loading State
  // ============================================
  if (loading) {
    return <GiftCardTableSkeleton />;
  }

  // ============================================
  // Empty State
  // ============================================
  if (giftCards.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8 text-center">
        <p className="text-gray-600 mb-4">
          No gift card transactions found yet
        </p>
        <Link
          href="/dashboard/gift-card/list"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors cursor-pointer"
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
          Buy Gift Cards
        </Link>
      </div>
    );
  }

  // ============================================
  // Main Render
  // ============================================
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* ============================================ */}
      {/* Header Section */}
      {/* ============================================ */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-base font-semibold text-white">My Gift Card</h2>

        <Link
          href="/dashboard/gift-card/list"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
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
          Gift Cards
        </Link>
      </div>

      {/* ============================================ */}
      {/* Desktop Table View */}
      {/* ============================================ */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Card Details
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Receiver Info
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Card Pricing
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Payment Details
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {giftCards.map((card, index) => (
              <tr
                key={card.trx_id || index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {/* Card Details Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={card.card_image}
                      alt={card.card_name}
                      className="w-16 h-10 object-cover rounded border border-gray-200"
                      onError={(e) =>
                        (e.target.src = "/images/placeholder-giftcard.png")
                      }
                    />
                    <div>
                      <div className="text-sm">
                        <span className="text-gray-600">TRX ID:</span>{" "}
                        <span className="text-gray-900">{card.trx_id}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Card Name:</span>{" "}
                        <span className="font-medium text-gray-900">
                          {card.card_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Receiver Info Column */}
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="text-gray-600">Receiver Email:</span>{" "}
                      <span className="text-gray-900 break-all">
                        {card.receiver_email}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Receiver Phone:</span>{" "}
                      <span className="text-gray-900">
                        {card.receiver_phone}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Card Pricing Column */}
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="text-gray-600">Unit Price:</span>{" "}
                      <span className="text-gray-900">
                        {card.card_init_price} {card.card_currency}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="text-gray-600">Quantity:</span>{" "}
                      <span className="text-gray-900">{card.quantity}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Price:</span>{" "}
                      <span className="text-gray-900 font-medium">
                        {card.card_total_price} {card.card_currency}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Payment Details Column */}
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="text-gray-600">Exchange Rate:</span>{" "}
                      <span className="text-gray-900">
                        1 {card.card_currency} = {card.wallet_currency_rate}{" "}
                        {card.wallet_currency}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="text-gray-600">Payable Unit:</span>{" "}
                      <span className="text-gray-900">
                        {card.payable_unit_price} {card.wallet_currency}
                      </span>
                    </div>
                    <div className="mb-1">
                      <span className="text-gray-600">Charge:</span>{" "}
                      <span className="text-gray-900">
                        {card.payable_charge} {card.wallet_currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Payable:</span>{" "}
                      <span className="text-gray-900 font-semibold">
                        {card.total_payable} {card.wallet_currency}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      card.status === "1"
                        ? "bg-green-100 text-green-800"
                        : card.status === "0"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {card.status === "1"
                      ? "Success"
                      : card.status === "0"
                      ? "Pending"
                      : "Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ============================================ */}
      {/* Mobile View */}
      {/* ============================================ */}
      <div className="md:hidden divide-y">
        {giftCards.map((card, index) => (
          <div key={card.trx_id || index} className="px-6 py-4 space-y-3">
            {/* Transaction ID */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">
                TRX ID
              </span>
              <span className="text-sm font-medium text-gray-900">
                {card.trx_id}
              </span>
            </div>

            {/* Card Image and Name */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <img
                src={card.card_image}
                alt={card.card_name}
                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                onError={(e) =>
                  (e.target.src = "/images/placeholder-giftcard.png")
                }
              />
              <div>
                <div className="font-medium text-gray-900">
                  {card.card_name}
                </div>
                <div className="text-xs text-gray-600">
                  Qty: {card.quantity}
                </div>
              </div>
            </div>

            {/* Card Information Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-xs text-gray-600">Receiver Email</div>
                <div className="text-gray-900 text-xs break-all">
                  {card.receiver_email}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Phone</div>
                <div className="text-gray-900 text-xs">
                  {card.receiver_phone}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Total Price</div>
                <div className="text-gray-900 font-medium">
                  {card.card_total_price} {card.card_currency}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Total Payable</div>
                <div className="text-gray-900 font-semibold">
                  {card.total_payable} {card.wallet_currency}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Rate</div>
                <div className="text-gray-900 text-xs">
                  1 {card.card_currency} ≈ {card.wallet_currency_rate}{" "}
                  {card.wallet_currency}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Charge</div>
                <div className="text-gray-900">
                  {card.payable_charge} {card.wallet_currency}
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="pt-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  card.status === "1"
                    ? "bg-green-100 text-green-800"
                    : card.status === "0"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {card.status === "1"
                  ? "Success"
                  : card.status === "0"
                  ? "Pending"
                  : "Failed"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================ */}
      {/* Mobile Bottom Link */}
      {/* ============================================ */}
      <div className="md:hidden px-6 py-4 border-t">
        <Link
          href="/dashboard/gift-card/list"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 text-white py-2 text-sm font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
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
          Gift Cards
        </Link>
      </div>
    </div>
  );
};

export default GiftCardTable;
