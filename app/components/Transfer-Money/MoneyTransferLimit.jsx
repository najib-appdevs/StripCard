"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRemainingLimits, getTransferMoneyInfo } from "../../utils/api";

const MoneyTransferLimit = () => {
  const [limitInfo, setLimitInfo] = useState(null);
  const [currency, setCurrency] = useState("");
  const [remainingDaily, setRemainingDaily] = useState(null);
  const [remainingMonthly, setRemainingMonthly] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        // 1. Fetch base transfer money info
        const response = await getTransferMoneyInfo();

        if (!response?.data?.transferMoneyCharge) {
          toast.error("No transfer Money Charge found");
          return;
        }

        const charge = response.data.transferMoneyCharge;
        setLimitInfo(charge);
        setCurrency(response.data.base_curr || "USD");

        // 2. Fetch current remaining limits (sender_amount = 0)
        const fields = response.data.get_remaining_fields || {};

        const params = {
          transaction_type: fields.transaction_type || "TRANSFER-MONEY",
          attribute: fields.attribute || "SEND",
          currency_code: response.data.base_curr || "USD",
          charge_id: String(charge.id || ""), // ← important: use transferMoneyCharge.id
          sender_amount: "0",
        };

        const remainingRes = await getRemainingLimits(params);

        if (remainingRes?.data?.status === true) {
          setRemainingDaily(remainingRes.data.remainingDaily ?? null);
          setRemainingMonthly(remainingRes.data.remainingMonthly ?? null);
        } else {
          toast.error("Update didn’t succeed. Please refresh or try again");
        }
      } catch (err) {
        // console.error("Error loading transfer limits / remaining:", err);
        toast.error("Error loading transfer limits / remaining");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []); 

  const data = [
    {
      label: "Transaction Limit",
      value: limitInfo
        ? `${Number(limitInfo.min_limit || 0).toFixed(4)} ${currency} – ${Number(
            limitInfo.max_limit || 0,
          ).toFixed(4)} ${currency}`
        : "--",
    },
    {
      label: "Daily Limit",
      value: limitInfo
        ? `${Number(limitInfo.daily_limit || 0).toFixed(4)} ${currency}`
        : "--",
    },
    {
      label: "Remaining Daily",
      value: loading
        ? "--"
        : remainingDaily !== null
          ? `${Number(remainingDaily).toFixed(4)} ${currency}`
          : "--",
    },
    {
      label: "Monthly Limit",
      value: limitInfo
        ? `${Number(limitInfo.monthly_limit || 0).toFixed(4)} ${currency}`
        : "--",
    },
    {
      label: "Remaining Monthly",
      value: loading
        ? "--"
        : remainingMonthly !== null
          ? `${Number(remainingMonthly).toFixed(4)} ${currency}`
          : "--",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Limit Information
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-200">
              {item.label}
            </span>
            <span className="text-sm font-medium text-right text-gray-800 dark:text-gray-200">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoneyTransferLimit;
