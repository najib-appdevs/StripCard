"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PaymentInformation() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------- Formatting Helpers -------------------- */

  const formatMoney = (rawValue) => {
    if (!rawValue || rawValue === "—" || rawValue === "-") return "—";

    const match = String(rawValue)
      .trim()
      .match(/^([\d.,]+(?:\.\d+)?)\s*([A-Z]{3}|[A-Za-z$€£¥₹฿]+)?$/i);

    if (!match) return rawValue;

    const [, numStr, currency = ""] = match;
    const num = Number(numStr.replace(/,/g, ""));

    if (isNaN(num)) return rawValue;

    return num.toFixed(4) + (currency ? ` ${currency}` : "");
  };

  const formatExchangeRate = (rawRate) => {
    if (!rawRate || rawRate === "—" || rawRate === "-") return "—";

    const parts = String(rawRate).split("=");
    if (parts.length !== 2) return rawRate;

    const leftRaw = parts[0].trim();
    const rightRaw = parts[1].trim();

    return `${leftRaw} = ${formatMoney(rightRaw)}`;
  };

  /* -------------------- Load Session Data -------------------- */

  useEffect(() => {
    const savedData = sessionStorage.getItem("pendingWithdrawData");

    if (!savedData) {
      toast.error(
        "No pending withdrawal found. Please start a new withdrawal.",
      );
      router.push("/dashboard/withdraw-money");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(savedData);

      if (!parsed?.request_amount) {
        toast.error("Failed to load payment summary. Please try again.");
        router.push("/dashboard/withdraw-money");
        setLoading(false);
        return;
      }

      setSummary({
        request_amount: parsed.request_amount || "—",
        exchange_rate: parsed.exchange_rate || "—",
        total_charge: parsed.total_charge || "—",
        conversion_amount: parsed.conversion_amount || "—",
        will_get: parsed.will_get || "—",
        payable: parsed.payable || "—",
      });
    } catch {
      toast.error("Failed to load payment summary. Please try again.");
      router.push("/dashboard/withdraw-money");
    }

    setLoading(false);
  }, [router]);

  /* -------------------- Loading & Error States -------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Loading payment information...
        </p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-600 dark:text-red-400 text-lg">
          Unable to load payment details
        </p>
      </div>
    );
  }

  /* -------------------- UI -------------------- */

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-950/40 p-8 w-full max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Payment Information
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Please review the details of your withdrawal request below.
        </p>
      </div>

      <div className="space-y-6 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Enter Amount
            </label>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {formatMoney(summary.request_amount)}
            </p>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Exchange Rate
            </label>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {formatExchangeRate(summary.exchange_rate)}
            </p>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Fees & Charges
            </label>
            <p className="text-xl font-semibold text-red-600 dark:text-red-400">
              {formatMoney(summary.total_charge)}
            </p>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Conversion Amount
            </label>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {formatMoney(summary.conversion_amount)}
            </p>
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">
              Will Get
            </label>
            <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {formatMoney(summary.will_get)}
            </p>
          </div>

          <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1 text-lg">
              Total Payable Amount
            </label>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatMoney(summary.payable)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
