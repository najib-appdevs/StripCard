"use client";

import { useRouter } from "next/navigation";

export default function BuyNowModal({ data, onClose }) {
  const router = useRouter();

  const handleConfirm = () => {
    onClose(); // close modal if needed
    router.push("/dashboard/gift-card");
  };

  return (
    <div style={{ border: "1px solid black", padding: 20 }}>
      <h3>Confirm Purchase</h3>
      <p>Email: {data.email}</p>
      <p>Quantity: {data.qty}</p>
      <p>Total: ${data.qty * 20}</p>

      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}
