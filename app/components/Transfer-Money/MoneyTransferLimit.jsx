"use client";

import { useEffect, useState } from "react";
import { getTransferMoneyInfo } from "../../utils/api";

const MoneyTransferLimit = () => {
  const [limitInfo, setLimitInfo] = useState(null);

  const [currency, setCurrency] = useState("");

  useEffect(() => {
    const fetchLimits = async () => {
      const response = await getTransferMoneyInfo();

      if (response?.data?.transferMoneyCharge) {
        setLimitInfo(response.data.transferMoneyCharge);
        // Set currency dynamically from API response
        setCurrency(response.data.base_curr || "USD");
      }
    };

    fetchLimits();
  }, []);

  const data = [
    {
      label: "Transaction Limit",
      value: limitInfo
        ? `${Number(limitInfo.min_limit).toFixed(4)} ${currency} - ${Number(
            limitInfo.max_limit
          ).toFixed(4)} ${currency}`
        : `0.0000 ${currency} - 0.0000 ${currency}`,
    },
    {
      label: "Daily Limit",
      value: limitInfo
        ? `${Number(limitInfo.daily_limit).toFixed(4)} ${currency}`
        : `0.0000 ${currency}`,
    },
    {
      label: "Monthly Limit",
      value: limitInfo
        ? `${Number(limitInfo.monthly_limit).toFixed(4)} ${currency}`
        : `0.0000 ${currency}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Limit Information
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className="text-sm font-medium text-right text-gray-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoneyTransferLimit;
