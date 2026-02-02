"use client";

import { useState } from "react";
import Select from "react-select";

export default function CreateVirtualCard() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState({ value: "USD", label: "USD" });
  const [wallet, setWallet] = useState({
    value: "usd_wallet",
    label: "United States Dollar (27.2084 USD)",
  });

  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "GBP", label: "GBP" },
  ];

  const walletOptions = [
    {
      value: "usd_wallet",
      label: "United States Dollar (27.2084 USD)",
    },
    {
      value: "usd_wallet",
      label: "United States Dollar (27.2084 USD)",
    },
  ];

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      background: "#ffffff",
      borderColor: state.isFocused ? "#34d399" : "#e5e7eb",
      borderWidth: "1.5px",
      borderRadius: "10px",
      padding: "6px 4px",
      cursor: "pointer",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.1)" : "none",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#34d399",
      },
    }),
    option: (base, state) => ({
      ...base,

      backgroundColor: state.isFocused
        ? "#ecfdf5" // only on hover
        : "#ffffff", // normal & selected both white

      color: "#1f2937",

      padding: "12px 16px",
      cursor: "pointer",
      transition: "all 0.15s ease",

      "&:active": {
        backgroundColor: "#ecfdf5",
      },
    }),

    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1.5px solid #e5e7eb",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "15px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1f2937",
      fontSize: "15px",
    }),
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section – made wider – now 6/12 instead of original 4/12 equivalent */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl text-gray-700 font-semibold text-center mb-6">
            Create Virtual Card
          </h2>

          {/* Card Amount */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Amount <span className="text-red-500">*</span>
            </label>

            <div className="flex rounded-lg border border-gray-300 focus-within:border-emerald-400 transition-colors">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="text-gray-700 w-full px-4 py-2.5 focus:outline-none text-sm no-spinner"
              />

              <div className="min-w-[100px] flex-1 border-gray-300">
                <Select
                  value={currency}
                  onChange={setCurrency}
                  options={currencyOptions}
                  styles={selectStyles}
                  isSearchable={false}
                />
              </div>
            </div>
          </div>

          {/* From Wallet */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Wallet <span className="text-red-500">*</span>
            </label>

            <Select
              value={wallet}
              onChange={setWallet}
              options={walletOptions}
              styles={selectStyles}
            />
          </div>

          {/* Info Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-gray-700 mb-6">
            <p>Fees: 2.0000 USD + 1.0000% = 2.0000 USD</p>
            <p className="mt-1">Available Balance: 27.2084 USD</p>
          </div>

          {/* Confirm Button */}
          <button className="mt-24 w-full btn-primary text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition">
            Confirm
          </button>
        </div>

        {/* Right Section – now also 6/12 – visually more equal */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl text-center text-gray-700 font-semibold mb-5">
              Preview
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Card Amount</span>
                <span className="font-medium text-gray-700">
                  {amount || "0.0000"} {currency?.label || "USD"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Exchange Rate</span>
                <span className="text-gray-700">1 USD = 1.00000000 USD</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Total Charge</span>
                <span className="text-gray-700">0.0000 USD</span>
              </div>

              <div className="flex justify-between pt-4 border-t font-semibold text-base">
                <span className="text-gray-700">Total Payable Amount</span>
                <span className="text-emerald-600">7.0500 USD</span>
              </div>
            </div>
          </div>

          {/* Limit Information */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl text-center text-gray-700  font-semibold mb-5">
              Limit Information
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Limit</span>
                <span className="text-gray-700">
                  1.0000 USD - 1000.0000 USD
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Daily Limit</span>
                <span className="text-gray-700">10000.0000 USD</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Remaining Daily Limit</span>
                <span className="text-green-600">10000.0000 USD</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Limit</span>
                <span className="text-gray-700">50000.0000 USD</span>
              </div>

              <div className="flex justify-between pt-3 border-t font-medium text-base">
                <span className="text-gray-700">Remaining Monthly Limit</span>
                <span className="text-green-600">50000.0000 USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
