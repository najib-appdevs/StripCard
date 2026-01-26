"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStrowalletCardDetails } from "../../utils/api";
import Loader from "../Loader";

export default function VirtualCardDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cardId = searchParams.get("card_id");
  const passedCardNumber =
    searchParams.get("card_number") || "•••• •••• •••• ••••";

  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleBack = () => {
    router.push("/dashboard/Virtual-Card");
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Card Details
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <div className="border border-red-300 rounded p-4 text-red-700">
            {error}
          </div>
        ) : !card.card_id ? (
          <div className="border border-yellow-300 rounded p-4 text-yellow-800">
            No card found. Please select a card from the list.
          </div>
        ) : (
          <div className="border rounded">
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600 w-1/3">
                    Card Name
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.name || "Virtual Card"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    Card Brand
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.card_brand?.toUpperCase() || "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    Available Amount
                  </td>
                  <td className="py-3 px-4 text-base font-semibold text-gray-900">
                    ${Number(card.amount || 0).toFixed(2)} USD
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">Card Type</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.card_type || "Virtual"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">Card ID</td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-900">
                    {card.card_id}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    Card User ID
                  </td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-900">
                    {card.card_user_id || "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    Card Number
                  </td>
                  <td className="py-3 px-4 text-base font-mono text-gray-900">
                    {passedCardNumber}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">CVV</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.cvv || "•••"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    Expiry Date
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.expiry || "••/••"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">City</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.city || "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">State</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.state || "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">Zip Code</td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {card.zip_code || "—"}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">Status</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm font-medium ${card.status ? "text-green-700" : "text-red-700"}`}
                    >
                      {card.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
