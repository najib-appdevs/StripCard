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

  // Determine transaction direction
  const isReceived = (type || "").toUpperCase().includes("RECEIVED");
  const displayDirection = isReceived ? "in" : "out";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
      {/* Transaction ID with Icon */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              displayDirection === "in" ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {displayDirection === "in" ? (
              <ArrowUpRight className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowDownLeft className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div>
            <p className="font-medium text-black">{trx || "—"}</p>
          </div>
        </div>
      </td>

      {/* Payable Amount */}
      <td className="px-6 py-4 text-right">
        <span
          className={`font-semibold text-lg ${
            displayDirection === "in" ? "text-green-600" : "text-red-600"
          }`}
        >
          {payable || "—"}
        </span>
      </td>

      {/* Request Amount */}
      <td className="px-6 py-4 text-right text-black">
        {request_amount || "—"}
      </td>

      {/* Type */}
      <td className="px-6 py-4">
        <span className="font-medium text-gray-900">{type || "—"}</span>
      </td>

      {/* Remark */}
      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
        {remark || "—"}
      </td>

      {/* Transaction Type Badge */}
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {transaction_type || "—"}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            status === "Success"
              ? "bg-green-100 text-green-700"
              : status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status || "—"}
        </span>
      </td>

      {/* Date & Time */}
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600">{formatDateTime(date_time)}</p>
      </td>
    </tr>
  );
}

// ============================================================================
// TRANSACTION TABLE COMPONENT
// ============================================================================
function TransactionTable({ transactions = [], loading }) {
  // Loading state
  if (loading) {
    return <TransactionHistorySkeleton rows={6} />;
  }

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No transactions found
      </div>
    );
  }

  // Table render
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Payable
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Request Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Remark
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Transaction Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date & Time
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 bg-white">
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
  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------------
  // Fetch Transaction Data
  // --------------------------------------------------------------------------
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await getUserDashboard();
        const data = res?.data || res || {};

        if (mounted && Array.isArray(data.transactions)) {
          // Sort by date (newest first)
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

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <div className="rounded-xl border">
      {/* Header Section: Title + Search + Filter */}
      <div className="p-4 border-b border-gray-200">
        {loading ? (
          // Loading skeleton
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between animate-pulse">
            {/* Title skeleton */}
            <div className="h-7 w-48 bg-gray-200 rounded" />

            {/* Search + Filter skeleton */}
            <div className="flex flex-col gap-2 sm:flex-row md:gap-2">
              {/* Search input skeleton */}
              <div className="h-10 w-full sm:w-48 md:w-60 bg-gray-200 rounded-lg" />

              {/* Filter button skeleton */}
              <div className="h-10 w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 h-full">
                  <div className="w-4.5 h-4.5 bg-gray-300 rounded-full" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Actual header content
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-black">
              Latest Transactions
            </h2>

            {/* View More */}
            <div className="flex flex-col gap-2 sm:flex-row md:gap-2">
              <Link
                href="/dashboard/transactions"
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors w-full sm:w-auto"
              >
                <span className="font-medium">View More</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Table */}
      <TransactionTable transactions={transactions} loading={loading} />
    </div>
  );
}
