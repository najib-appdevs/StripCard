"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTransferMoneyInfo } from "../../utils/api";
import TransferLogSkeleton from "./TransferLogSkeleton";

const TransferMoneyLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await getTransferMoneyInfo();

        if (response?.data?.transactions) {
          setLogs(response.data.transactions);
        }
      } catch (error) {
        console.error("Failed to fetch transfer logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Helper function for desired date format: 05-01-26 12:37:13 PM
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0");

    return `${day}-${month}-${year} ${displayHours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">
            Transfer Money Log
          </h2>

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
          {loading ? (
            <TransferLogSkeleton />
          ) : logs.length > 0 ? (
            <>
              {/* Table Header */}
              <div className="hidden md:grid min-w-[900px] grid-cols-7 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-900 text-sm font-semibold text-gray-600 dark:text-gray-200">
                <span>Transfer Money to</span>
                <span>Status</span>
                <span>Transaction ID</span>
                <span>Fees & Charges</span>
                <span>Recipient Received</span>
                <span>Current Balance</span>
                <span>Time & Date</span>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700 min-w-[900px]">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4 text-sm"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {log.transaction_heading}
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
                    <span className="text-gray-600 dark:text-gray-200">
                      {log.trx}
                    </span>
                    <span className="text-gray-600 dark:text-gray-200">
                      {log.total_charge}
                    </span>
                    <span className="text-gray-600 dark:text-gray-200">
                      {log.recipient_received}
                    </span>
                    <span className="text-gray-600 dark:text-gray-200">
                      {log.current_balance}
                    </span>
                    <span className="text-gray-600 dark:text-gray-200">
                      {formatDate(log.date_time)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-200 min-h-[200px] flex flex-col items-center justify-center">
              <p className="text-lg font-medium">No data found</p>
              <p className="mt-1 text-sm">No transfer records available yet</p>
            </div>
          )}
        </div>

        {/* Mobile View More */}
        <div className="md:hidden px-6 py-4">
          <Link
            href="/dashboard/transactions"
            className="cursor-pointer flex items-center justify-center gap-2 w-full rounded-xl border border-gray-300 dark:border-gray-600 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="font-medium">View More</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransferMoneyLog;
