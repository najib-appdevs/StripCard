"use client";
import { useState } from "react";

export default function WithdrawMoney() {
  const [paymentGateway, setPaymentGateway] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Withdraw Money
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-7 flex flex-col min-h-[400px]">
        {/* Payment Gateway */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Payment Gateway <span className="text-red-500">*</span>
          </label>
          <select
            value={paymentGateway}
            onChange={(e) => setPaymentGateway(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5
                       text-sm text-gray-900
                       focus:border-emerald-500 focus:bg-white
                       focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="">Select Gateway</option>
            <option value="stripe_manual">Stripe Card (Manual) - USD</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Enter Amount <span className="text-red-500">*</span>
          </label>
          <div
            className="flex overflow-hidden rounded-xl border border-gray-300 bg-gray-50
                       focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200"
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900
                         focus:outline-none"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border-l border-gray-300 bg-white px-3 text-sm text-gray-900
                         focus:outline-none"
            >
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm space-y-2">
          <p className="flex justify-between text-gray-600">
            <span>Available Balance</span>
            <span className="font-medium text-gray-800">855.9000 USD</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Transfer Charge</span>
            <span className="font-medium text-gray-800">
              1.0000 USD + 1.0000%
            </span>
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Button */}
        <button
          className="w-full rounded-xl px-4 py-4 text-base font-bold text-white transition
           bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)]
           hover:opacity-90
           focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
