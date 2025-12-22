"use client";

import { useState } from "react";

const AddMoneyLog = () => {
  const [search, setSearch] = useState("");

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

  return (
    <div className="mt-6">
      <div className=" rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">Add Money Log</h2>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: TRX ID, Add Money"
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

export default AddMoneyLog;
