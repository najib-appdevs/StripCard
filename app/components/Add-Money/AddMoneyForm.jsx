/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAddMoneyInformation } from "../../utils/api";
import AddMoneyFormSkeleton from "./AddMoneyFormSkeleton";

export default function AddMoneyForm({ onFormUpdate }) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [loading, setLoading] = useState(true);
  const [gatewayOptions, setGatewayOptions] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [amount, setAmount] = useState("");
  const [walletCurrency, setWalletCurrency] = useState("");
  const [balance, setBalance] = useState(0);

  // Charge values
  const [fixedCharge, setFixedCharge] = useState(0);
  const [percentCharge, setPercentCharge] = useState(0);
  const [chargeCurrency, setChargeCurrency] = useState("");

  // ============================================================================
  // NOTIFY PARENT (PREVIEW) WHEN DATA CHANGES
  // ============================================================================
  const notifyParent = () => {
    if (onFormUpdate) {
      onFormUpdate({
        amount,
        walletCurrency,
        selectedGateway,
        fixedCharge,
        percentCharge,
        chargeCurrency,
        rate: selectedGateway?.rate || 1,
      });
    }
  };

  // Call whenever relevant state changes
  useEffect(() => {
    notifyParent();
  }, [
    amount,
    selectedGateway,
    walletCurrency,
    fixedCharge,
    percentCharge,
    chargeCurrency,
  ]);

  // Call once after initial data is loaded
  useEffect(() => {
    if (!loading && selectedGateway) {
      notifyParent();
    }
  }, [loading, selectedGateway]);

  // ============================================================================
  // DATA FETCHING - Payment Gateway Info
  // ============================================================================
  useEffect(() => {
    async function loadAddMoneyInfo() {
      try {
        setLoading(true);
        const response = await getAddMoneyInformation();

        if (response?.message?.error) {
          const errorMsg =
            response.message.error[0] || "Failed to load payment gateways";
          toast.error(errorMsg);
          setLoading(false);
          return;
        }

        const data = response.data || response;

        // Flatten gateways → options
        const options = [];
        (data.gateways || []).forEach((gw) => {
          (gw.currencies || []).forEach((curr) => {
            options.push({
              id: curr.alias,
              name: curr.name,
              fixed_charge: Number(curr.fixed_charge) || 0,
              percent_charge: Number(curr.percent_charge) || 0,
              min_limit: Number(curr.min_limit) || 0,
              max_limit: Number(curr.max_limit) || 0,
              daily_limit: Number(curr.daily_limit) || 0,
              monthly_limit: Number(curr.monthly_limit) || 0,
              currency_code: curr.currency_code || "N/A",
              currency_symbol: curr.currency_symbol || "N/A",
              rate: Number(curr.rate) || 1,
            });
          });
        });

        setGatewayOptions(options);

        // Set default gateway (prefer matching wallet currency)
        if (options.length > 0) {
          const defaultGateway =
            options.find(
              (opt) => opt.currency_code === data.userWallet?.currency
            ) || options[0];

          setSelectedGateway(defaultGateway);
          setFixedCharge(defaultGateway.fixed_charge);
          setPercentCharge(defaultGateway.percent_charge);
          setChargeCurrency(defaultGateway.currency_code);
        }

        // Set wallet currency & balance
        setWalletCurrency(data.userWallet?.currency || "N/A");
        setBalance(data.userWallet?.balance || 0);

        setLoading(false);
      } catch (err) {
        const errorMsg =
          err.message || "Something went wrong while loading data";
        toast.error(errorMsg);
        setLoading(false);
      }
    }

    loadAddMoneyInfo();
  }, []);

  // ============================================================================
  // UPDATE CHARGES - When Gateway Changes
  // ============================================================================
  useEffect(() => {
    if (selectedGateway) {
      setFixedCharge(selectedGateway.fixed_charge);
      setPercentCharge(selectedGateway.percent_charge);
      setChargeCurrency(selectedGateway.currency_code || "N/A");
    }
  }, [selectedGateway]);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  const formatCharge = () => {
    if (!selectedGateway) return "—";
    const fixed = fixedCharge.toFixed(4);
    const percent = percentCharge.toFixed(4);
    return `${fixed} ${chargeCurrency} + ${percent}%`;
  };

  // ============================================================================
  // LOADING STATE
  // ============================================================================
  if (loading) {
    return <AddMoneyFormSkeleton />;
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div>
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
          <h2 className="text-base text-center font-semibold text-white">
            Add Money
          </h2>
        </div>

        {/* Body */}
        <div className="flex flex-col space-y-7 p-6">
          {/* Payment Gateway */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Payment Gateway <span className="text-red-500">*</span>
            </label>

            <Listbox value={selectedGateway} onChange={setSelectedGateway}>
              {({ open }) => (
                <div className="relative">
                  <Listbox.Button className="cursor-pointer relative w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-white focus:border-emerald-500 focus:outline-none focus:ring-emerald-200">
                    <span className="block truncate">
                      {selectedGateway
                        ? selectedGateway.name
                        : "Select Gateway"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto">
                    {gatewayOptions.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        value={item}
                        className={({ active, selected }) =>
                          `cursor-pointer px-4 py-2.5 text-sm ${
                            active
                              ? "bg-emerald-50 text-emerald-600"
                              : selected
                              ? "bg-gray-100 font-medium text-gray-900"
                              : "text-gray-700"
                          }`
                        }
                      >
                        {item.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </div>

          {/* Amount & Currency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
              Enter Amount <span className="text-red-500">*</span>
            </label>

            <div className="relative rounded-xl border border-gray-300 bg-gray-50 focus-within:border-emerald-500 focus-within:ring-emerald-200">
              <div className="flex overflow-visible">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 focus:outline-none no-spinner"
                />

                <Listbox value={walletCurrency} onChange={() => {}}>
                  {({ open }) => (
                    <div className="relative min-w-24">
                      <Listbox.Button className="cursor-pointer flex h-full w-full items-center justify-center px-4 py-2.5 text-sm text-gray-900 focus:outline-none">
                        <span className="mr-2 font-medium">
                          {walletCurrency || "N/A"}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-gray-400 transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Listbox.Button>

                      <Listbox.Options className="absolute right-0 top-full z-30 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                        <Listbox.Option
                          value={walletCurrency}
                          className={({ active }) =>
                            `relative cursor-pointer select-none px-4 py-2 text-sm ${
                              active
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-gray-900"
                            }`
                          }
                        >
                          <span className="block font-medium">
                            {walletCurrency || "N/A"}
                          </span>
                        </Listbox.Option>
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="space-y-2 rounded-xl bg-gray-50 px-4 py-3 text-sm">
            <p className="flex justify-between text-gray-600">
              <span>Available Balance</span>
              <span className="font-medium text-gray-800">
                {Number(balance).toFixed(4)} {walletCurrency || "N/A"}
              </span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>Charge</span>
              <span className="font-medium text-gray-800">
                {formatCharge()}
              </span>
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Submit Button */}
          <button className="cursor-pointer w-full rounded-xl px-4 py-4 text-base font-bold text-white transition bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
