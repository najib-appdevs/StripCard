"use client";
import { useState } from "react";
import BuyNowModal from "./BuyNowModal";

export default function GiftCardForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", qty: 1 });

  return (
    <div>
      <input
        placeholder="Receiver Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="number"
        value={form.qty}
        onChange={(e) => setForm({ ...form, qty: e.target.value })}
      />

      <button onClick={() => setOpen(true)}>Buy Now</button>

      {open && <BuyNowModal data={form} onClose={() => setOpen(false)} />}
    </div>
  );
}
