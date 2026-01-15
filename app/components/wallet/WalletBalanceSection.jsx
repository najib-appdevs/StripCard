"use client";

import {
  ArrowUpRight,
  CreditCard,
  Eye,
  EyeOff,
  Gift,
  Plus,
  Send,
  Ticket,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserDashboard } from "../../utils/api";
import WalletBalanceSkeleton from "./WalletBalanceSkeleton";

// ============================================================================
// COLOR CONFIGURATION
// ============================================================================
const COLOR_MAP = {
  "bg-blue-500": {
    base: "rgba(59, 130, 246, 0.15)",
    hover: "rgba(59, 130, 246, 0.30)",
    shadow: "rgba(59, 130, 246, 0.5)",
  },
  "bg-purple-500": {
    base: "rgba(168, 85, 247, 0.15)",
    hover: "rgba(168, 85, 247, 0.30)",
    shadow: "rgba(168, 85, 247, 0.5)",
  },
  "bg-cyan-500": {
    base: "rgba(6, 182, 212, 0.15)",
    hover: "rgba(6, 182, 212, 0.30)",
    shadow: "rgba(6, 182, 212, 0.5)",
  },
  "bg-green-500": {
    base: "rgba(34, 197, 94, 0.15)",
    hover: "rgba(34, 197, 94, 0.30)",
    shadow: "rgba(34, 197, 94, 0.5)",
  },
  "bg-pink-500": {
    base: "rgba(236, 72, 153, 0.15)",
    hover: "rgba(236, 72, 153, 0.30)",
    shadow: "rgba(236, 72, 153, 0.5)",
  },
  "bg-indigo-500": {
    base: "rgba(99, 102, 241, 0.15)",
    hover: "rgba(99, 102, 241, 0.30)",
    shadow: "rgba(99, 102, 241, 0.5)",
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function WalletBalanceSection() {
  const router = useRouter();

  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------
  const [showBalance, setShowBalance] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------------
  // Fetch Dashboard Data
  // --------------------------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getUserDashboard();
        if (res?.data) {
          setData(res.data);
        }
      } catch (err) {
        // Error handled by API utility
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // --------------------------------------------------------------------------
  // Helper Functions
  // --------------------------------------------------------------------------
  const extractNumber = (str) => {
    if (!str) return 0;
    const match = str.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // --------------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------------
  if (loading) {
    return <WalletBalanceSkeleton />;
  }

  // --------------------------------------------------------------------------
  // Extract & Calculate Values
  // --------------------------------------------------------------------------
  const wallet = data?.userWallet?.[0] || {};
  const currencySymbol = wallet?.currency?.symbol || "$";
  const currentBalance = Number(wallet?.balance || 0).toFixed(4);

  const totalAddMoneyNum = extractNumber(data?.totalAddMoney);
  const totalTransactionsNum = extractNumber(data?.totalTransactions);
  const activeCardsCount = Number(data?.active_cards || 0);
  const activeTicketsCount = activeCardsCount;

  const giftCardTxs = (data?.transactions || []).filter(
    (tx) =>
      tx?.transaction_type?.includes("GIFT-CARD") ||
      tx?.remark?.toUpperCase().includes("GIFT-CARD")
  );
  const giftCardCount = giftCardTxs.length;

  // --------------------------------------------------------------------------
  // Cards Configuration
  // --------------------------------------------------------------------------
  const cards = [
    // Monetary values
    {
      icon: null,
      symbol: currencySymbol,
      name: "Current Balance",
      amount: `${currencySymbol}${currentBalance}`,
      color: "bg-blue-500",
    },
    {
      icon: null,
      symbol: currencySymbol,
      name: "Total Add Money",
      amount: `${currencySymbol}${totalAddMoneyNum.toFixed(0)}`,
      color: "bg-purple-500",
    },
    {
      icon: null,
      symbol: currencySymbol,
      name: "Total Transactions",
      amount: `${currencySymbol}${totalTransactionsNum.toFixed(4)}`,
      color: "bg-cyan-500",
    },
    // Count values with icons
    {
      icon: Ticket,
      name: "Active Tickets",
      amount: activeTicketsCount,
      color: "bg-pink-500",
    },
    {
      icon: CreditCard,
      name: "Active Card",
      amount: activeCardsCount,
      color: "bg-green-500",
    },
    {
      icon: Gift,
      name: "Total Gift Cards",
      amount: giftCardCount,
      color: "bg-indigo-500",
    },
  ];

  // --------------------------------------------------------------------------
  // Navigation Handlers
  // --------------------------------------------------------------------------
  const handleAddMoney = () => {
    if (data?.module_access?.add_money) {
      router.push("/dashboard/add-money");
    }
  };

  const handleSendMoney = () => {
    if (data?.module_access?.transfer_money) {
      router.push("/dashboard/transfer-money");
    }
  };

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <>
      {/* Header Section: Total Balance + Action Buttons */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-6">
        {/* Total Wallet Balance */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-700 text-sm font-medium">
              Total Wallet Balance
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              aria-label={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-black">
            {showBalance ? `${currencySymbol}${currentBalance}` : "••••••••"}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleAddMoney}
            className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#012C20" }}
            disabled={!data?.module_access?.add_money}
          >
            <Plus size={20} />
            Add Money
          </button>

          <button
            onClick={handleSendMoney}
            className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
            }}
            disabled={!data?.module_access?.transfer_money}
          >
            <Send size={20} />
            Send Money
          </button>
        </div>
      </div>

      {/* Cards Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {cards.map((card, index) => {
          const colors = COLOR_MAP[card.color];

          return (
            <div
              key={index}
              className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              {/* Card Header: Icon + Arrow Button */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg`}
                  style={{ boxShadow: `0 0 20px ${colors.shadow}` }}
                >
                  {card.icon ? (
                    <card.icon size={24} />
                  ) : (
                    <span className="text-xl font-bold">{card.symbol}</span>
                  )}
                </div>

                <button
                  className="w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-200"
                  style={{ background: colors.base }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = colors.hover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = colors.base)
                  }
                >
                  <ArrowUpRight size={14} className="text-gray-700" />
                </button>
              </div>

              {/* Card Content */}
              <p className="text-xs text-gray-600 mb-0.5">{card.name}</p>
              <p className="text-base font-bold text-black">{card.amount}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
