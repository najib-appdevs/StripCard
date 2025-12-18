"use client";

import GiftCardForm from "../../../components/Gift-Card/GiftCardForm";

export default function Page({ params }) {
  return (
    <div>
      <h2>Gift Card Details (ID: {params.id})</h2>
      <GiftCardForm />
    </div>
  );
}
