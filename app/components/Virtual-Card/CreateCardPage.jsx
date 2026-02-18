"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createStrowalletCard,
  getStrowalletCharges,
  getStrowalletCreateInfo,
  getUserDashboard,
} from "../../utils/api";

export default function CreateCardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Form & API data states ────────────────────────────────
  const [cardCreateFields, setCardCreateFields] = useState([]);

  const [baseCurrency, setBaseCurrency] = useState("");
  const [fixedCharge, setFixedCharge] = useState(2);
  const [percentCharge, setPercentCharge] = useState(1);
  const [minLimit, setMinLimit] = useState(1);
  const [maxLimit, setMaxLimit] = useState(1000);
  const [dailyLimit, setDailyLimit] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState(0);

  const [walletOptions, setWalletOptions] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const [formValues, setFormValues] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const router = useRouter();

  const cardAmount = Number(formValues.card_amount || 0);

  // Fees display logic (form)
  const feeDisplayedInForm =
    cardAmount === 0
      ? fixedCharge
      : fixedCharge + (cardAmount * percentCharge) / 100;

  const feeText = `${fixedCharge.toFixed(4)} ${baseCurrency} + ${percentCharge.toFixed(4)}% = ${feeDisplayedInForm.toFixed(4)} ${baseCurrency}`;

  // Preview logic
  const previewTotalCharge =
    cardAmount > 0 ? fixedCharge + (cardAmount * percentCharge) / 100 : 0;

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Card creation fields
        const createRes = await getStrowalletCreateInfo();
        if (createRes?.data?.card_create_fields) {
          const fields = createRes.data.card_create_fields;
          setCardCreateFields(fields);

          const initialValues = {};
          fields.forEach((f) => {
            if (f.field_name !== "currency") {
              initialValues[f.field_name] = "";
            }
          });
          setFormValues(initialValues);
        }

        // 2. Charges (fees + limits + currency)
        const chargesRes = await getStrowalletCharges();
        if (chargesRes?.data) {
          const { base_curr, cardCharge } = chargesRes.data;

          if (base_curr) {
            setBaseCurrency(base_curr);
            setSelectedCurrency(base_curr);
          }

          if (cardCharge) {
            setFixedCharge(Number(cardCharge.fixed_charge) || 0);
            setPercentCharge(Number(cardCharge.percent_charge) || 0);
            setMinLimit(Number(cardCharge.min_limit) || 1);
            setMaxLimit(Number(cardCharge.max_limit) || 1000);
            setDailyLimit(Number(cardCharge.daily_limit) || 0);
            setMonthlyLimit(Number(cardCharge.monthly_limit) || 0);
          }
        }

        // 3. User dashboard (wallets + real balance)
        const dashboardRes = await getUserDashboard();
        if (dashboardRes?.data?.userWallet?.length > 0) {
          const wallets = dashboardRes.data.userWallet.map((w) => ({
            value: w.currency.code.toLowerCase(),
            label: `${w.currency.name} (${Number(w.balance).toFixed(4)} ${w.currency.code})`,
            balance: Number(w.balance),
            currencyCode: w.currency.code,
          }));

          setWalletOptions(wallets);
          setSelectedWallet(wallets[0]); // auto-select first/default
        }
      } catch (err) {
        // console.error(err);
        toast.error("Something went wrong");
        setError("Failed to load required data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleConfirm = async () => {
    if (submitting) return;

    // Basic validation
    if (!formValues.name_on_card?.trim()) {
      toast.error("Please enter Card Holder's Name");
      return;
    }
    if (!cardAmount || cardAmount <= 0) {
      toast.error("Please enter a valid Card Amount");
      return;
    }
    if (cardAmount < minLimit || cardAmount > maxLimit) {
      toast.error(
        `Amount must be between ${minLimit} and ${maxLimit} ${baseCurrency}`,
      );
      return;
    }
    if (!selectedWallet) {
      toast.error("Please select a wallet");
      return;
    }
    if (cardAmount > selectedWallet.balance) {
      toast.error("Insufficient balance in selected wallet");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name_on_card: formValues.name_on_card.trim(),
        card_amount: cardAmount,
        currency: baseCurrency || "USD",
        from_currency: selectedWallet?.currencyCode || "USD",
      };

      const response = await createStrowalletCard(payload);

      // Show ONLY real server message via toast
      if (response?.message?.success?.length > 0) {
        toast.success(response.message.success[0]);

        router.push("/dashboard/Virtual-Card");
      } else if (response?.message?.error?.length > 0) {
        toast.error(response.message.error[0]);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      // console.error("Card creation error:", err);
      toast.error("Failed to create virtual card");
      const errMsg =
        err?.response?.data?.message?.error?.[0] ||
        err?.message ||
        "Failed to create virtual card";
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    if (field.field_name === "currency") {
      const amountField = cardCreateFields.find(
        (f) => f.field_name === "card_amount",
      );
      const amountLabel = amountField ? amountField.label_name : "Amount";

      return (
        <div key="amount-currency-group">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {amountLabel} <span className="text-red-500">*</span>
          </label>
          <div className="relative flex rounded-lg border border-gray-300 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-200 focus-within:ring-opacity-50">
            <input
              type="number"
              id="amount"
              placeholder={`Enter ${amountLabel.toLowerCase()}`}
              min={minLimit}
              max={maxLimit}
              step="0.01"
              value={formValues.card_amount ?? ""}
              onChange={(e) => handleInputChange("card_amount", e.target.value)}
              className="block w-full flex-1 border-none bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
              {({ open }) => (
                <div className="relative min-w-20">
                  <Listbox.Button className="flex h-full w-full items-center justify-center px-3 text-gray-700 focus:outline-none cursor-pointer">
                    <span className="font-medium">{selectedCurrency}</span>
                    <ChevronDown
                      className={`ml-1.5 h-5 w-5 text-gray-500 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Listbox.Button>

                  <Listbox.Options className="absolute right-0 top-full z-30 mt-1 w-28 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    <Listbox.Option
                      value={baseCurrency}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2.5 text-sm ${
                          active
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-900"
                        }`
                      }
                    >
                      <span className="block font-medium">{baseCurrency}</span>
                    </Listbox.Option>
                  </Listbox.Options>
                </div>
              )}
            </Listbox>
          </div>
        </div>
      );
    }

    if (field.field_name === "card_amount") return null;

    return (
      <div key={field.id}>
        <label
          htmlFor={field.field_name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {field.label_name} <span className="text-red-500">*</span>
        </label>
        <input
          type={field.type}
          id={field.field_name}
          placeholder={`Enter ${field.label_name}`}
          value={formValues[field.field_name] || ""}
          onChange={(e) => handleInputChange(field.field_name, e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none transition"
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading card form...</div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left: Create Virtual Card */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="p-6 sm:p-8 lg:p-10">
            <h1 className="text-center mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
              Create Virtual Card
            </h1>

            <form className="space-y-7">
              {cardCreateFields.map(renderField)}

              <div>
                <label
                  htmlFor="wallet"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  From Wallet <span className="text-red-500">*</span>
                </label>

                <Listbox value={selectedWallet} onChange={setSelectedWallet}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none text-left">
                        <span className="block truncate">
                          {selectedWallet?.label || "Select wallet"}
                        </span>
                        <ChevronDown
                          className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Listbox.Button>

                      <Listbox.Options className="absolute z-30 mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg max-h-60 overflow-auto">
                        {walletOptions.map((wallet) => (
                          <Listbox.Option
                            key={wallet.value}
                            value={wallet}
                            className={({ active }) =>
                              `cursor-pointer px-4 py-2.5 text-sm ${
                                active
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "text-gray-900"
                              }`
                            }
                          >
                            <span className="block font-medium">
                              {wallet.label}
                            </span>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>
              </div>

              <div className="rounded-lg bg-gray-50 p-5 text-sm">
                <p className="text-gray-700">
                  Fees:{" "}
                  <span className="font-medium text-gray-900">{feeText}</span>
                </p>
                <p className="mt-1.5 text-gray-700">
                  Available Balance:{" "}
                  <span className="font-medium text-gray-900">
                    {selectedWallet
                      ? `${selectedWallet.balance.toFixed(4)} ${baseCurrency || "USD"}`
                      : "0.0000 USD"}
                  </span>
                </p>
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={handleConfirm}
                className={`cursor-pointer mt-4 w-full rounded-lg btn-primary px-6 py-3.5 font-medium text-white ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Processing..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl h-fit">
          <div className="p-6 sm:p-8 lg:p-10">
            <h2 className="text-center mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
              Preview
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Card Amount</span>
                <span className="font-medium text-gray-900">
                  {cardAmount.toFixed(4)} {baseCurrency || "USD"}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Exchange Rate</span>
                <span className="font-medium text-gray-900">
                  1 USD = 1.00000000 USD
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Charge</span>
                <span className="font-medium text-gray-900">
                  {previewTotalCharge.toFixed(4)} {baseCurrency || "USD"}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600 font-medium">
                  Total Payable Amount
                </span>
                <span className="text-lg font-semibold text-emerald-500">
                  {(cardAmount + previewTotalCharge).toFixed(4)}{" "}
                  {baseCurrency || "USD"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Limit Information */}
      <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="p-6 sm:p-8 lg:p-10">
          <h2 className="text-center mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
            Limit Information
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Transaction Limit</span>
              <span className="font-medium text-gray-900">
                {minLimit.toFixed(4)} {baseCurrency || "USD"} -{" "}
                {maxLimit.toFixed(4)} {baseCurrency || "USD"}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Daily Limit</span>
              <span className="font-medium text-gray-900">
                {dailyLimit.toFixed(4)} {baseCurrency || "USD"}
              </span>
            </div>

            {/* <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Remaining Daily Limit</span>
              <span className="font-medium text-gray-900">20,000.00 USD</span>
            </div> */}

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Monthly Limit</span>
              <span className="font-medium text-green-600">
                {monthlyLimit.toFixed(4)} {baseCurrency || "USD"}
              </span>
            </div>

            {/* <div className="flex items-center justify-between py-2">
              <span className="text-gray-600 font-medium">
                Remaining Monthly Limit
              </span>
              <span className="font-medium text-gray-900">50,000.00 USD</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
