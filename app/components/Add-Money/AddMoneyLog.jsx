"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAddMoneyInformation } from "../../utils/api";
import AddMoneyLogSkeleton from "./AddMoneyLogSkeleton";

const AddMoneyLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from the API
  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        const response = await getAddMoneyInformation();

        if (response?.message?.error) {
          toast.error(response.message.error[0] || "Failed to load logs");
          return;
        }

        const data = response.data || response;

        // Use real transactions array
        const transactions = data.transactions || [];

        // Map to match existing UI structure
        const formattedLogs = transactions.map((tx) => ({
          gateway: tx.gateway_name || "Unknown Gateway",
          status: tx.status || "Unknown",
          trxId: tx.trx || "N/A",
          exchangeRate: tx.exchange_rate || "N/A",
          fees: tx.total_charge || "0.0000 USD",
          currentBalance: tx.current_balance || "0.0000 USD",
          date: new Date(tx.date_time)
            .toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })
            .replace(",", ""), // Format like "17-12-25 11:21:43 AM"
        }));

        setLogs(formattedLogs);
      } catch (err) {
        toast.error("Failed to load add money logs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  if (loading) {
    return <AddMoneyLogSkeleton />;
  }

  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">Add Money Log</h2>

          {/* View More Button - Desktop */}
          <div className="hidden md:flex flex-col gap-2 sm:flex-row md:gap-2">
            <Link
              href="/dashboard/transactions"
              className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-white dark:text-gray-100 rounded-lg hover:text-gray-300 dark:hover:text-gray-300 transition-colors w-full sm:w-auto"
            >
              <span className="font-medium">View More</span>
            </Link>
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="hidden md:grid min-w-[900px] grid-cols-7 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900 text-sm font-semibold text-gray-600 dark:text-gray-300">
            <span>Add Balance via</span>
            <span>Status</span>
            <span>Transaction ID</span>
            <span>Exchange Rate</span>
            <span>Fees & Charges</span>
            <span>Current Balance</span>
            <span>Time & Date</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700 min-w-[900px]">
            {logs.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                No transactions found
              </div>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4 text-sm"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    Add Balance via {log.gateway}
                  </span>

                  <span className="inline-flex items-center gap-2 text-xs font-medium">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        log.status === "Success"
                          ? "bg-green-500"
                          : log.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <span
                      className={
                        log.status === "Success"
                          ? "text-green-600 dark:text-green-400"
                          : log.status === "Pending"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }
                    >
                      {log.status}
                    </span>
                  </span>

                  <span className="text-gray-600 dark:text-gray-200">{log.trxId}</span>
                  <span className="text-gray-600 dark:text-gray-200">{log.exchangeRate}</span>
                  <span className="text-gray-600 dark:text-gray-200">{log.fees}</span>
                  <span className="text-gray-600 dark:text-gray-200">{log.currentBalance}</span>
                  <span className="text-gray-600 dark:text-gray-200">{log.date}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile View More */}
        <div className="md:hidden px-6 py-4">
          <Link
            href="/dashboard/transactions"
            className="cursor-pointer flex items-center justify-center gap-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="font-medium">View More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyLog;