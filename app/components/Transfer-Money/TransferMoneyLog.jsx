"use client";

import { useEffect, useState } from "react";
import { getTransferMoneyInfo } from "../../utils/api";

const TransferMoneyLog = () => {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true); // ← Added loading state

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
        setLoading(false); // ← Always stop loading
      }
    };

    fetchLogs();
  }, []);

  /* ----------------------------
     SEARCH FILTER - Only by Transaction ID (trx)
  -----------------------------*/
  const filteredLogs = logs.filter((log) =>
    log.trx.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">
            Transfer Money Log
          </h2>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: TRX ID, Amount"
              className="w-44 rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button className="cursor-pointer text-sm font-medium text-emerald-400 hover:text-emerald-300">
              View More
            </button>
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="hidden md:grid min-w-[900px] grid-cols-7 gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-600">
            <span>Transfer Money to</span>
            <span>Status</span>
            <span>Transaction ID</span>
            <span>Fees & Charges</span>
            <span>Recipient Received</span>
            <span>Current Balance</span>
            <span>Time & Date</span>
          </div>

          {/* Loading / Content / No Data */}
          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <div className="flex justify-center items-center gap-3">
                <div className="w-5 h-5 border-3 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-lg font-medium">Loading transactions...</p>
              </div>
            </div>
          ) : filteredLogs.length > 0 ? (
            <div className="divide-y min-w-[900px]">
              {filteredLogs.map((log, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4 text-sm"
                >
                  <span className="font-medium text-gray-900">
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
                          ? "text-green-600"
                          : log.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }
                    >
                      {log.status}
                    </span>
                  </span>

                  <span className="text-gray-600">{log.trx}</span>
                  <span className="text-gray-600">{log.total_charge}</span>
                  <span className="text-gray-600">
                    {log.recipient_received}
                  </span>
                  <span className="text-gray-600">{log.current_balance}</span>
                  <span className="text-gray-600">
                    {formatDate(log.date_time)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-gray-500">
              <p className="text-lg font-medium">No data found</p>
              <p className="mt-1 text-sm">
                {search.trim()
                  ? "Try a different Transaction ID"
                  : "No transfer records available yet"}
              </p>
            </div>
          )}
        </div>

        {/* Mobile View More */}
        <div className="md:hidden px-6 py-4">
          <button className="cursor-pointer w-full rounded-xl border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferMoneyLog;
