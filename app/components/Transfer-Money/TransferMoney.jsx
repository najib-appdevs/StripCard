"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  checkTransferReceiverExist,
  getTransferMoneyInfo,
  transferMoneyConfirmed,
} from "../../utils/api";

export default function TransferMoney({
  onAmountChange,
  onChargesChange,
  onCurrencyChange,
}) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);

  // Email validation states
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");

  // Dynamic info states
  const [availableBalance, setAvailableBalance] = useState("0.00");
  const [balanceCurrency, setBalanceCurrency] = useState("");
  const [fixedCharge, setFixedCharge] = useState(0);
  const [percentCharge, setPercentCharge] = useState(0);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  // ============================================================================
  // DATA FETCHING - Transfer Info
  // ============================================================================
  useEffect(() => {
    const fetchInfo = async () => {
      setInfoLoading(true);
      try {
        const response = await getTransferMoneyInfo();

        if (response?.data) {
          // Balance & currency
          if (response.data.userWallet) {
            setAvailableBalance(
              Number(response.data.userWallet.balance).toFixed(4)
            );
            setBalanceCurrency(response.data.userWallet.currency);
          }

          // Transfer charges
          if (response.data.transferMoneyCharge) {
            const fixed = response.data.transferMoneyCharge.fixed_charge;
            const percent = response.data.transferMoneyCharge.percent_charge;
            setFixedCharge(fixed);
            setPercentCharge(percent);

            // Pass charges to parent
            if (onChargesChange) {
              onChargesChange(fixed, percent);
            }
          }

          // Currency - using base_curr as single currency for now
          if (response.data.base_curr) {
            const base = response.data.base_curr;
            setCurrency(base);
            setAvailableCurrencies([
              {
                code: base,
                name: base,
              },
            ]);

            // Pass currency to parent
            if (onCurrencyChange) {
              onCurrencyChange(base);
            }
          }
        }
      } catch (error) {
        // console.error("Failed to load transfer info:", error);
        toast.error("Failed to load transfer information");
      } finally {
        setInfoLoading(false);
      }
    };

    fetchInfo();
  }, [onChargesChange, onCurrencyChange]);

  // ============================================================================
  // EMAIL VALIDATION - Check Receiver Exists (Debounced)
  // ============================================================================
  useEffect(() => {
    if (!receiverEmail.trim()) {
      setEmailStatus(null);
      setEmailMessage("");
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setCheckingEmail(true);

      try {
        const response = await checkTransferReceiverExist(receiverEmail);

        if (response?.message?.success?.length) {
          setEmailStatus("success");
          setEmailMessage(response.message.success[0]);
        } else if (response?.message?.error?.length) {
          setEmailStatus("error");
          setEmailMessage(response.message.error[0]);
        } else {
          setEmailStatus("error");
          setEmailMessage("Unexpected response from server");
        }
      } catch (error) {
        setEmailStatus("error");
        setEmailMessage("Failed to check receiver");
      } finally {
        setCheckingEmail(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [receiverEmail]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);

    if (onAmountChange) {
      onAmountChange(newAmount);
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);

    if (onCurrencyChange) {
      onCurrencyChange(newCurrency);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!receiverEmail) {
      return toast.error("Receiver email is required");
    }

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }

    if (Number(amount) > Number(availableBalance)) {
      return toast.error("Insufficient balance");
    }

    if (!currency) {
      return toast.error("Select currency");
    }
    if (emailStatus !== "success") return;

    setLoading(true);

    try {
      const response = await transferMoneyConfirmed({
        email: receiverEmail,
        amount: Number(amount),
      });

      if (response?.message?.success?.length) {
        response.message.success.forEach((msg) => toast.success(msg));

        // Reset form
        setReceiverEmail("");
        setAmount("");
        setEmailStatus(null);
        setEmailMessage("");

        // Reset parent amount
        if (onAmountChange) {
          onAmountChange("");
        }
      }

      if (response?.message?.error?.length) {
        response.message.error.forEach((msg) => toast.error(msg));
      }
    } catch (error) {
      toast.error("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Transfer Money
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-7 flex flex-col min-h-[400px]">
        {/* Receiver Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Receiver Email <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            placeholder="Receiver Email"
            required
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-emerald-500 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-emerald-200 dark:focus:ring-emerald-500/30"
          />

          {emailMessage && (
            <span
              className={`mt-2 block text-sm ${
                emailStatus === "success"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {checkingEmail ? "" : emailMessage}
            </span>
          )}
        </div>

        {/* Amount & Currency */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
            Enter Amount <span className="text-red-500">*</span>
          </label>

          <div className="relative rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:ring-emerald-200 dark:focus-within:ring-emerald-500/30">
            <div className="flex overflow-visible">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter Amount"
                min="0"
                step="0.01"
                required
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none no-spinner"
              />

              <Listbox value={currency} onChange={handleCurrencyChange}>
                {({ open }) => (
                  <div className="relative min-w-24">
                    <Listbox.Button className="flex h-full w-full items-center justify-center px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer">
                      <span className="mr-2 font-medium">
                        {currency || balanceCurrency}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Listbox.Button>

                    <Listbox.Options className="absolute right-0 top-full z-30 mt-1 w-32 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-lg">
                      {availableCurrencies.map((curr) => (
                        <Listbox.Option
                          key={curr.code}
                          value={curr.code}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 text-sm ${
                              active
                                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                : "text-gray-900 dark:text-gray-100"
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
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3 text-sm space-y-2">
          <p className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Available Balance</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {infoLoading ? "--" : `${availableBalance} ${balanceCurrency}`}
            </span>
          </p>
          <p className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Transfer Fee</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {infoLoading
                ? "--"
                : `${fixedCharge.toFixed(
                    4
                  )} ${balanceCurrency} + ${percentCharge.toFixed(4)}%`}
            </span>
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 dark:border-gray-700" />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          // disabled={loading || emailStatus !== "success" || infoLoading}
          className="cursor-pointer w-full rounded-xl px-4 py-4 text-base font-bold text-white transition bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)] dark:bg-[linear-gradient(76.84deg,#0D9A7E_-2.66%,#3E9F28_105.87%)] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}