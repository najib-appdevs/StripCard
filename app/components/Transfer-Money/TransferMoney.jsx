"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function TransferMoney() {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const currencies = [{ code: "USD", name: "USD" }];

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Transfer Money
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-7 flex flex-col min-h-[400px]">
        {/* Receiver Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Receiver Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            placeholder="receiver@example.com"
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5
                       text-sm text-gray-900
                       focus:border-emerald-500 focus:bg-white
                       focus:outline-none  focus:ring-emerald-200"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Enter Amount <span className="text-red-500">*</span>
          </label>

          <div className="relative rounded-xl border border-gray-300 bg-gray-50 focus-within:border-emerald-500  focus-within:ring-emerald-200">
            {/* This inner div allows overflow-visible for the dropdown */}
            <div className="flex overflow-visible">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 focus:outline-none no-spinner"
              />

              {/* Currency Dropdown */}
              <Listbox value={currency} onChange={setCurrency}>
                {({ open }) => (
                  <div className="relative min-w-24">
                    <Listbox.Button className="flex h-full w-full items-center justify-center px-4 py-2.5 text-sm text-gray-900  focus:outline-none">
                      <span className="mr-2 font-medium">
                        {currency?.code || "USD"}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Listbox.Button>

                    <Listbox.Options className="absolute right-0 top-full z-30 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg  ">
                      {currencies.map((curr) => (
                        <Listbox.Option
                          key={curr.code}
                          value={curr}
                          className={({ active }) =>
                            `relative cursor-pointer select-none px-4 py-2 text-sm ${
                              active
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-gray-900"
                            }`
                          }
                        >
                          <span className="block font-medium">{curr.name}</span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                )}
              </Listbox>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm space-y-2">
          <p className="flex justify-between text-gray-600">
            <span>Available Balance</span>
            <span className="font-medium text-gray-800">857.0000 USD</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Transfer Fee</span>
            <span className="font-medium text-gray-800">
              1.0000 USD + 1.0000%
            </span>
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200" />

        {/* Button */}
        <button
          className="cursor-pointer w-full rounded-xl px-4 py-4 text-base font-bold text-white transition
           bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)]
           hover:opacity-90
           focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
