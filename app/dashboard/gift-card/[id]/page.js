// "use client";

// import { useParams } from "next/navigation";
// import { giftCards } from "../../../components/Gift-Card/giftCardData"; // Mock Data
// import GiftCardForm from "../../../components/Gift-Card/GiftCardForm";

// export default function Page() {
//   const params = useParams();

//   const cardId = Number(params.id);

//   const card = giftCards.find((c) => c.id === cardId);

//   if (!card) {
//     return <p>Gift Card not found</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto">
//       <GiftCardForm card={card} />
//     </div>
//   );
// }
// ----------------------------------------------------------
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GiftCardForm from "../../../components/Gift-Card/GiftCardForm"; // adjust path if needed
import { getGiftCardDetails } from "../../../utils/api"; // ← we'll add this API function

export default function GiftCardDetailPage() {
  const { id } = useParams();
  const productId = Number(id);

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!productId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getGiftCardDetails(productId);

        if (response?.message?.error) {
          throw new Error(
            response.message.error[0] || "Failed to load gift card details"
          );
        }

        const product = response?.data?.product || null;
        if (!product) {
          throw new Error("Gift card not found");
        }

        // Map API response to the shape your GiftCardForm expects
        const mappedCard = {
          id: product.productId,
          name: product.productName,
          image: product.logoUrls?.[0] || "/images/placeholder-giftcard.png",
          country: product.country?.name || "",
          minAmount: product.minRecipientDenomination || 0,
          maxAmount: product.maxRecipientDenomination || 0,
          denominationType: product.denominationType, // "RANGE" or "FIXED"
          fixedRecipientDenominations:
            product.fixedRecipientDenominations || [],
          fixedSenderDenominations: product.fixedSenderDenominations || [],
          // Add more fields if your form needs them later
          currency: product.recipientCurrencyCode,
          brand: product.brand?.brandName,
          redeemInstruction: product.redeemInstruction?.concise,
        };

        setCard(mappedCard);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <p className="text-xl font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center py-16 text-gray-600">Gift Card not found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <GiftCardForm card={card} />
    </div>
  );
}
