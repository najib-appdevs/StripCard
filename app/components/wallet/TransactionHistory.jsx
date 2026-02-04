"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserDashboard } from "../../utils/api";
import TransactionHistorySkeleton from "./TransactionHistorySkeleton";

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function formatDateTime(dateString) {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateString;
  }
}

// ============================================================================
// TRANSACTION ROW COMPONENT
// ============================================================================
function TransactionRow({ transaction }) {
  const {
    trx,
    payable,
    request_amount,
    type,
    remark,
    transaction_type,
    status,
    date_time,
  } = transaction;

  const isReceived = (type || "").toUpperCase().includes("RECEIVED");
  const displayDirection = isReceived ? "in" : "out";

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-white dark:bg-gray-800">
      {/* Transaction ID with Icon */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              displayDirection === "in"
                ? "bg-green-100/40 dark:bg-green-900/30"
                : "bg-red-100/40 dark:bg-red-900/30"
            }`}
          >
            {displayDirection === "in" ? (
              <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDownLeft className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {trx || "—"}
            </p>
          </div>
        </div>
      </td>

      {/* Payable Amount */}
      <td className="px-6 py-4 text-right">
        <span
          className={`font-semibold text-lg ${
            displayDirection === "in"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {payable || "—"}
        </span>
      </td>

      {/* Request Amount */}
      <td className="px-6 py-4 text-right text-gray-900 dark:text-gray-100">
        {request_amount || "—"}
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {type || "—"}
        </span>
      </td>

      {/* Remark */}
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">
        {remark || "—"}
      </td>

      {/* Transaction Type Badge */}
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
          {transaction_type || "—"}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            status === "Success"
              ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
              : status === "Pending"
              ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
              : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
          }`}
        >
          {status || "—"}
        </span>
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {formatDateTime(date_time)}
        </p>
      </td>
    </tr>
  );
}

// ============================================================================
// TRANSACTION TABLE COMPONENT
// ============================================================================
function TransactionTable({ transactions = [], loading }) {
  if (loading) {
    return <TransactionHistorySkeleton rows={6} />;
  }

  if (transactions.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-300">
        No transactions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/40">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Payable
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Request Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Remark
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Transaction Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Date & Time
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {transactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await getUserDashboard();
        const data = res?.data || res || {};

        if (mounted && Array.isArray(data.transactions)) {
          const sorted = [...data.transactions].sort(
            (a, b) => new Date(b.date_time) - new Date(a.date_time)
          );
          setTransactions(sorted);
        }
      } catch (err) {
        // Error handled by API utility
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between animate-pulse">
            <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="flex flex-col gap-2 sm:flex-row md:gap-2">
              <div className="h-10 w-full sm:w-48 md:w-60 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-10 w-full sm:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center gap-2 h-full">
                  <div className="w-4.5 h-4.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Latest Transactions
            </h2>

            <div className="flex flex-col gap-2 sm:flex-row md:gap-2">
              <Link
                href="/dashboard/transactions"
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors w-full sm:w-auto font-medium"
              >
                View More
              </Link>
            </div>
          </div>
        )}
      </div>

      <TransactionTable transactions={transactions} loading={loading} />
    </div>
  );
}