"use client";

import { useEffect, useState } from "react";
import { getWithdrawInfo } from "../../utils/api";

const MoneyWithdrawalLimit = () => {
  const [limitInfo, setLimitInfo] = useState(null);
  const [currency, setCurrency] = useState("");
  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const response = await getWithdrawInfo();

        if (response?.data?.gateways?.[0]?.currencies?.[0]) {
          const currencyData = response.data.gateways[0].currencies[0];
          setLimitInfo(currencyData);
          setCurrency(response.data.base_curr || "");
        }
      } catch (error) {
        console.log("Error fetching withdrawal limits:", error);
        // Keep fallback values when error occurs
      }
    };

    fetchLimits();
  }, []);

  // Prepare display data - use fallback if still loading or no data
  const data = [
    {
      label: "Transaction Limit",
      value: limitInfo
        ? `${Number(limitInfo.min_limit || 0).toFixed(
            4
          )} ${currency} – ${Number(limitInfo.max_limit || 0).toFixed(
            4
          )} ${currency}`
        : `--`,
    },
    {
      label: "Daily Limit",
      value: limitInfo
        ? `${Number(limitInfo.daily_limit || 0).toFixed(4)} ${currency}`
        : `--`,
    },
    {
      label: "Monthly Limit",
      value: limitInfo
        ? `${Number(limitInfo.monthly_limit || 0).toFixed(4)} ${currency}`
        : `--`,
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
            <span className="text-sm text-gray-500 dark:text-gray-200">{item.label}</span>
            <span className="text-sm font-medium text-right text-gray-800 dark:text-gray-200">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoneyWithdrawalLimit;