"use client";

import { useState } from "react";

const WithdrawMoneyLog = () => {
  const [search, setSearch] = useState("");

  const logs = [
    {
      trxId: "WD123456789",
      withdrawBy: "StripCard(Manual)",
      exchangeRate: "1 USD = 1.0000 USD",
      fees: "1.2500 USD",
      willGet: "98.0000 USD",
      currentBalance: "757.9000 USD",
      date: "16-12-25 05:44:14 PM",
      status: "Success",
    },
    {
      trxId: "WD987654321",
      withdrawBy: "StripCard(Manual)",
      exchangeRate: "1 USD = 1.0000 USD",
      fees: "1.2500 USD",
      willGet: "247.5000 USD",
      currentBalance: "510.4000 USD",
      date: "16-12-25 05:44:14 PM",
      status: "Success",
    },
    {
      trxId: "WD456789123",
      withdrawBy: "StripCard(Manual)",
      exchangeRate: "1 USD = 1.0000 USD",
      fees: "1.2500 USD",
      willGet: "99.0000 USD",
      currentBalance: "411.4000 USD",
      date: "16-12-25 05:44:14 PM",
      status: "Pending",
    },
  ];

  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
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
            <button className="cursor-pointer text-sm font-medium text-emerald-400 hover:text-emerald-300">
              View More
            </button>
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header - Desktop */}
          <div className="hidden md:grid min-w-[1000px] grid-cols-8 gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-600">
            <span>Withdraw Money by</span>
            <span>Status</span>
            <span>Transaction ID</span>
            <span>Exchange Rate</span>
            <span>Fees & Charges</span>
            <span>Will Get</span>
            <span>Current Balance</span>
            <span>Time & Date</span>
          </div>

          {/* Rows */}
          <div className="divide-y min-w-[1000px]">
            {logs.map((log, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-8 gap-3 px-6 py-4 text-sm"
              >
                {/* 1. Withdraw Money by */}
                <span className="font-medium text-gray-900">
                  {log.withdrawBy}
                </span>

                {/* 2. Status */}
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

                {/* 3. Transaction ID */}
                <span className="text-gray-600">{log.trxId}</span>

                {/* 4. Exchange Rate */}
                <span className="text-gray-600">{log.exchangeRate}</span>

                {/* 5. Fees & Charges */}
                <span className="text-gray-600">{log.fees}</span>

                {/* 6. Will Get */}
                <span className="text-gray-600">{log.willGet}</span>

                {/* 7. Current Balance */}
                <span className="text-gray-600">{log.currentBalance}</span>

                {/* 8. Time & Date */}
                <span className="text-gray-600">{log.date}</span>
              </div>
            ))}
          </div>
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

export default WithdrawMoneyLog;
