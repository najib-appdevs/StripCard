"use client";

import { useState } from "react";

const WithdrawMoneyLog = () => {
  const [search, setSearch] = useState("");

  const logs = [
    {
      trxId: "TRX123456789",
      withdrawBy: "StripCard(Manual)",
      exchangeRate: "1.00 USD = 1.00 USD",
      fees: "2.0000 USD",
      willGet: "98.0000 USD",
      currentBalance: "857.0000 USD",
      date: "2024-01-10 14:23",
      status: "Success",
    },
    {
      trxId: "TRX987654321",
      withdrawBy: "StripCard(Manual)",
      exchangeRate: "1.00 USD = 1.00 USD",
      fees: "1.5000 USD",
      willGet: "148.5000 USD",
      currentBalance: "657.0000 USD",
      date: "2024-01-08 09:15",
      status: "Success",
    },
    {
      trxId: "TRX456789123",
      withdrawBy: "StripCard(Manual)",
      exchangeRate: "1.00 USD = 1.00 USD",
      fees: "0.5000 USD",
      willGet: "49.5000 USD",
      currentBalance: "500.0000 USD",
      date: "2024-01-05 18:40",
      status: "Pending",
    },
  ];

  return (
    <div className="mt-6">
      <div className=" rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">
            Withdraw Money Log
          </h2>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: TRX ID, Amount"
              className="w-44 rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white
                         placeholder-gray-400 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
              View More
            </button>
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="hidden md:grid min-w-[1000px] grid-cols-8 gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-600 ">
            <span>Transaction ID</span>
            <span>Withdraw Money by</span>
            <span>Exchange Rate</span>
            <span>Fees & Charges</span>
            <span>Will Get</span>
            <span>Current Balance</span>
            <span>Time & Date</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          <div className="divide-y min-w-[1000px]">
            {logs.map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-8 gap-4 px-6 py-4 text-sm"
              >
                <span className="text-gray-600">{log.trxId}</span>
                <span className="text-gray-600">{log.withdrawBy}</span>
                <span className="text-gray-600">{log.exchangeRate}</span>
                <span className="text-gray-600">{log.fees}</span>
                <span className="text-gray-600">{log.willGet}</span>
                <span className="text-gray-600">{log.currentBalance}</span>
                <span className="text-gray-600">{log.date}</span>

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium
                    ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : log.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View More */}
        <div className="md:hidden px-6 py-4">
          <button className="w-full rounded-xl border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoneyLog;
