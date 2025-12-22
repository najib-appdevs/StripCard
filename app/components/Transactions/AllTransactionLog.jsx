"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const AllTransactionLog = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const logs = [
    {
      gateway: "Stripe USD",
      status: "Success",
      trxId: "AM17433454",
      exchangeRate: "1 USD = 1.0000 USD",
      fees: "2.0000 USD",
      currentBalance: "857.0000 USD",
      date: "17-12-25 11:21:43 AM",
    },
    {
      gateway: "Paypal USD",
      status: "Success",
      trxId: "AM17433454",
      exchangeRate: "1 USD = 1.0000 USD",
      fees: "1.5000 USD",
      currentBalance: "657.0000 USD",
      date: "17-12-25 11:21:43 AM",
    },
    {
      gateway: "AdPay (Manual) USD",
      status: "Pending",
      trxId: "AM17433454",
      exchangeRate: "1 USD = 1.0000 USD",
      fees: "0.5000 USD",
      currentBalance: "500.0000 USD",
      date: "17-12-25 11:21:43 AM",
    },
  ];

  const totalPages = 5; // We can calculate this based on real APIs data

  return (
    <>
      {/* Caption and Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Transaction Log</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex: TRX ID, Add Money"
          className="w-64 rounded-lg bg-white px-4 py-2 text-sm text-gray-900
                     placeholder-gray-400 border border-gray-300
                     focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">
            Add Balance via Stripe USD
          </h2>

          {/* <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: TRX ID, Add Money"
              className="w-44 rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white
                         placeholder-gray-400 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div> */}
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="hidden md:grid min-w-[900px] grid-cols-7 gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-600 ">
            <span>Add Balance via</span>
            <span>Status</span>
            <span>Transaction ID</span>
            <span>Exchange Rate</span>
            <span>Fees & Charges</span>
            <span>Current Balance</span>
            <span>Time & Date</span>
          </div>

          {/* Rows */}
          <div className="divide-y min-w-[900px]">
            {logs.map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-7 gap-3 px-6 py-4 text-sm"
              >
                <span className="font-medium text-gray-900">
                  Add Balance via {log.gateway}
                </span>

                <span className="inline-flex items-center gap-2 text-xs font-medium">
                  <span
                    className={`h-2 w-2 rounded-full
      ${
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

                <span className="text-gray-600">{log.trxId}</span>
                <span className="text-gray-600">{log.exchangeRate}</span>
                <span className="text-gray-600">{log.fees}</span>
                <span className="text-gray-600">{log.currentBalance}</span>
                <span className="text-gray-600">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors
              ${
                currentPage === i + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default AllTransactionLog;
