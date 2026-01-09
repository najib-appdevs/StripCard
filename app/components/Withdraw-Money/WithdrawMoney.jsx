"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWithdrawInfo, submitWithdrawInsert } from "../../utils/api";

export default function WithdrawMoney() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Main data from API
  const [withdrawData, setWithdrawData] = useState(null);

  // Form values
  const [selectedGatewayCurrency, setSelectedGatewayCurrency] = useState(null);
  const [amount, setAmount] = useState("");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");

  const gateways = withdrawData?.gateways || [];
  const currencies =
    withdrawData?.gateways?.flatMap((g) => g.currencies || []) || [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getWithdrawInfo();

        if (response?.data) {
          setWithdrawData(response.data);

          // Auto-select first available currency
          if (response.data.gateways?.[0]?.currencies?.[0]) {
            const first = response.data.gateways[0].currencies[0];
            setSelectedGatewayCurrency(first);
            setSelectedCurrencyCode(first.currency_code);
          }
        } else if (response?.message?.error) {
          const msg = response.message.error[0] || "Failed to load data";
          toast.error(msg);
        }
      } catch (err) {
        toast.error("Failed to load withdrawal information");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleConfirm = async () => {
    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter a valid amount");
    }

    if (!selectedGatewayCurrency) {
      return toast.error("Select payment gateway");
    }

    setSubmitLoading(true);

    const payload = {
      gateway: selectedGatewayCurrency.alias,
      amount: amount.trim(),
    };

    try {
      const response = await submitWithdrawInsert(payload);

      if (response?.message?.success) {
        // Show exact success message from server before redirect
        const successMsg =
          response.message.success[0] || "Withdrawal initiated successfully";
        toast.success(successMsg);

        // Store data
        sessionStorage.setItem(
          "pendingWithdrawData",
          JSON.stringify({
            trx: response.data.payment_informations?.trx,
            gateway_currency_name: response.data.gateway_currency_name,
            request_amount: response.data.payment_informations?.request_amount,
            exchange_rate: response.data.payment_informations?.exchange_rate,
            conversion_amount:
              response.data.payment_informations?.conversion_amount,
            total_charge: response.data.payment_informations?.total_charge,
            payable: response.data.payment_informations?.payable,
            will_get: response.data.payment_informations?.will_get,
            input_fields: response.data.input_fields || [],
            confirmation_url: response.data.url,
            method: response.data.method,
            details: response.data.details || "",
            currency_alias: selectedGatewayCurrency.alias,
          })
        );

        router.push("/dashboard/ManualConfirm");
      } else {
        // Show exact error from server
        const errorMsg = response?.message?.error?.[0] || "Withdraw failed";
        toast.error(errorMsg);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Withdraw insert error:", err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const userBalance = withdrawData?.userWallet?.balance?.toFixed(4) || "0.0000";
  const baseCurrency = withdrawData?.base_curr || "USD";

  const currentGatewayCurrency = currencies.find(
    (c) => c.currency_code === selectedCurrencyCode
  );

  const chargeText = currentGatewayCurrency
    ? `${
        currentGatewayCurrency.fixed_charge?.toFixed(4) || "0.0000"
      } ${baseCurrency} + ${
        currentGatewayCurrency.percent_charge?.toFixed(4) || "0.00"
      }%`
    : "—";

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Withdraw Money
        </h2>
      </div>

      <div className="p-6 space-y-7 flex flex-col min-h-[400px]">
        {/* Payment Gateway */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Payment Gateway <span className="text-red-500">*</span>
          </label>

          <Listbox
            value={selectedGatewayCurrency}
            onChange={(value) => {
              setSelectedGatewayCurrency(value);
              setSelectedCurrencyCode(value?.currency_code || baseCurrency);
            }}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="relative w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-white focus:border-emerald-500 focus:outline-none focus:ring-emerald-200">
                  <span className="block truncate">
                    {selectedGatewayCurrency?.name || "Select Gateway"}
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
                  {currencies.map((currency) => (
                    <Listbox.Option
                      key={currency.id}
                      value={currency}
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
                      {currency.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>

        {/* Amount */}
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

              <Listbox
                value={selectedCurrencyCode}
                onChange={setSelectedCurrencyCode}
              >
                {({ open }) => (
                  <div className="relative min-w-24">
                    <Listbox.Button className="flex h-full w-full items-center justify-center px-4 py-2.5 text-sm text-gray-900 focus:outline-none">
                      <span className="mr-2 font-medium">
                        {selectedCurrencyCode || baseCurrency}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </Listbox.Button>

                    <Listbox.Options className="absolute right-0 top-full z-30 mt-1 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                      {currencies.map((curr) => (
                        <Listbox.Option
                          key={curr.id}
                          value={curr.currency_code}
                          className={({ active }) =>
                            `relative cursor-pointer select-none px-4 py-2 text-sm ${
                              active
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-gray-900"
                            }`
                          }
                        >
                          <span className="block font-medium">
                            {curr.currency_code}
                          </span>
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
            <span className="font-medium text-gray-800">
              {userBalance} {baseCurrency}
            </span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Charge</span>
            <span className="font-medium text-gray-800">{chargeText}</span>
          </p>
        </div>

        <div className="flex-1" />

        <div className="border-t border-dashed border-gray-200" />

        {/* Action */}
        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            // disabled={submitLoading || loading || !amount || !selectedGatewayCurrency}
            className={`cursor-pointer w-full rounded-xl px-4 py-4 text-base font-bold text-white transition
              bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)]
              hover:opacity-90
              ${submitLoading ? "opacity-70 cursor-wait" : ""}
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2`}
          >
            {submitLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
