"use client";
import { ArrowUpRight, Eye, EyeOff, Plus, Send } from "lucide-react";
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
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-6">
        {/* Balance Section */}
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

          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            {showBalance ? "$98,000.00" : "••••••••"}
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Add Money Button */}
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 
            text-white rounded-lg transition-colors font-medium"
            style={{ background: "#012C20" }}
          >
            <Plus size={20} />
            Add Money
          </button>

          {/* Send Money Button */}
          <button
            className="flex items-center justify-center gap-2 px-6 py-3
            text-white rounded-lg transition-colors font-medium"
            style={{
              background:
                "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
            }}
          >
            <Send size={20} />
            Send Money
          </button>
        </div>
      </div>

      {/* Currency Cards */}
      <div
        className="
    grid grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-2 
    xl:grid-cols-3 
    2xl:grid-cols-5 
    gap-4
  "
      >
        {currencies.map((currency, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`${currency.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-lg`}
                style={{
                  boxShadow: `0 0 20px ${
                    currency.color === "bg-blue-500"
                      ? "rgba(59, 130, 246, 0.5)"
                      : currency.color === "bg-purple-500"
                      ? "rgba(168, 85, 247, 0.5)"
                      : currency.color === "bg-cyan-500"
                      ? "rgba(6, 182, 212, 0.5)"
                      : currency.color === "bg-green-500"
                      ? "rgba(34, 197, 94, 0.5)"
                      : "rgba(236, 72, 153, 0.5)"
                  }`,
                }}
              >
                {currency.symbol}
              </div>

              <button
                className="w-7 h-7 flex items-center justify-center rounded-full transition"
                style={{
                  background:
                    currency.color === "bg-blue-500"
                      ? "rgba(59, 130, 246, 0.15)"
                      : currency.color === "bg-purple-500"
                      ? "rgba(168, 85, 247, 0.15)"
                      : currency.color === "bg-cyan-500"
                      ? "rgba(6, 182, 212, 0.15)"
                      : currency.color === "bg-green-500"
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(236, 72, 153, 0.15)",
                  hoverBackground:
                    currency.color === "bg-blue-500"
                      ? "rgba(59, 130, 246, 0.30)"
                      : currency.color === "bg-purple-500"
                      ? "rgba(168, 85, 247, 0.30)"
                      : currency.color === "bg-cyan-500"
                      ? "rgba(6, 182, 212, 0.30)"
                      : currency.color === "bg-green-500"
                      ? "rgba(34, 197, 94, 0.30)"
                      : "rgba(236, 72, 153, 0.30)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    e.currentTarget.style.hoverBackground)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = e.currentTarget
                    .getAttribute("style")
                    .split(";")[0]
                    .split(":")[1])
                }
              >
                <ArrowUpRight size={14} className="text-gray-700" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-0.5">{currency.name}</p>
            <p className="text-base font-bold text-black">{currency.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}