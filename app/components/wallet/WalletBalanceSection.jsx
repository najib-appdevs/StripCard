"use client";
import { ExternalLink, Eye, EyeOff, Plus, Send } from "lucide-react";
import { useState } from "react";

const currencies = [
  {
    symbol: "$",
    name: "United States Dollar",
    amount: "$910,000.00",
    color: "bg-blue-500",
  },
  {
    symbol: "৳",
    name: "Bangladeshi Taka",
    amount: "৳188,000.00",
    color: "bg-purple-500",
  },
  {
    symbol: "₹",
    name: "Indian Rupee",
    amount: "₹50,000.00",
    color: "bg-cyan-500",
  },
  {
    symbol: "₨",
    name: "Pakistani Rupee",
    amount: "₨70,000.00",
    color: "bg-green-500",
  },
  {
    symbol: "£",
    name: "British Pound",
    amount: "£10,000.00",
    color: "bg-pink-500",
  },
];

export default function WalletBalanceSection() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="mb-8">
      {/* Header + Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-700 text-sm font-medium">
              Total Wallet Balance
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <h1 className="text-4xl font-bold text-black">
            {showBalance ? "$98,000.00" : "••••••••"}
          </h1>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
            <Plus size={20} />
            Add Money
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
            <Send size={20} />
            Send Money
          </button>
        </div>
      </div>

      {/* Currency Cards */}
      <div className="grid grid-cols-5 gap-4">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`${currency.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold`}
              >
                {currency.symbol}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <ExternalLink size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-1">{currency.name}</p>
            <p className="text-lg font-bold text-black">{currency.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
