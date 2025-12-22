"use client";

import { useParams } from "next/navigation";
import { giftCards } from "../../../components/Gift-Card/giftCardData"; // Mock Data
import GiftCardForm from "../../../components/Gift-Card/GiftCardForm";

export default function Page() {
  const params = useParams();

  const cardId = Number(params.id);

  const card = giftCards.find((c) => c.id === cardId);

  if (!card) {
    return <p>Gift Card not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <GiftCardForm card={card} />
    </div>
  );
}
