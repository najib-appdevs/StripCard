"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getAddMoneyInformation, getRemainingLimits } from "../../utils/api";

const LimitInformation = ({ selectedGateway = null, walletCurrency }) => {
  const [remainingDaily, setRemainingDaily] = useState(null);
  const [remainingMonthly, setRemainingMonthly] = useState(null);
  const [loadingRemaining, setLoadingRemaining] = useState(false);
  const [error, setError] = useState(null);

  // Cache get_remaining_fields so we don't fetch info every time
  const [remainingFields, setRemainingFields] = useState(null);

  useEffect(() => {
    // Load once
    const loadFields = async () => {
      try {
        const res = await getAddMoneyInformation();
        const fields = res?.data?.get_remaining_fields;
        if (fields?.transaction_type && fields?.attribute) {
          setRemainingFields(fields);
        }
      } catch (e) {
        console.warn("Could not load remaining fields", e);
      }
    };
    loadFields();
  }, []);

  // Base limits (adjusted by rate → shown in wallet currency)
  const isLoadingBase = !selectedGateway || !selectedGateway.rate;

  const { minLimit, maxLimit, dailyLimit, monthlyLimit } = useMemo(() => {
    if (isLoadingBase) {
      return {
        minLimit: "--",
        maxLimit: "--",
        dailyLimit: "--",
        monthlyLimit: "--",
      };
    }
    const rate = Number(selectedGateway.rate) || 1;
    return {
      minLimit: (Number(selectedGateway.min_limit || 0) / rate).toFixed(4),
      maxLimit: (Number(selectedGateway.max_limit || 0) / rate).toFixed(4),
      dailyLimit: (Number(selectedGateway.daily_limit || 0) / rate).toFixed(4),
      monthlyLimit: (Number(selectedGateway.monthly_limit || 0) / rate).toFixed(
        4,
      ),
    };
  }, [selectedGateway, isLoadingBase]);

  // Fetch remaining
  useEffect(() => {
    if (!selectedGateway?.id) {
      setRemainingDaily(null);
      setRemainingMonthly(null);
      setError(null);
      return;
    }

    const fetchRemaining = async () => {
      setLoadingRemaining(true);
      setError(null);

      try {
        const fields = remainingFields || {
          transaction_type: "ADD-MONEY",
          attribute: "SEND",
        };

        const params = {
          transaction_type: fields.transaction_type,
          attribute: fields.attribute,
          currency_code: walletCurrency || selectedGateway.currency_code,
          charge_id: String(selectedGateway.id),
          sender_amount: "0",
        };

        const res = await getRemainingLimits(params);

        if (res?.data?.status === true) {
          setRemainingDaily(res.data.remainingDaily ?? null);
          setRemainingMonthly(res.data.remainingMonthly ?? null);
        } else {
          toast.error(
            res?.message?.error?.[0] || "Failed to load remaining limits",
          );
        }
      } catch (err) {
        // console.error("[AddMoney Limits] Error:", err);
        setError(err.message || "Failed to load remaining limits");
        setRemainingDaily(null);
        setRemainingMonthly(null);
      } finally {
        setLoadingRemaining(false);
      }
    };

    fetchRemaining();
  }, [selectedGateway?.id, walletCurrency, remainingFields]);

  const formatValue = (val) =>
    val !== null && !isNaN(val)
      ? Number(val).toFixed(4) + " " + walletCurrency
      : "--";

  const show = (value, fallback = "--") =>
    loadingRemaining
      ? "--"
      : error
        ? "Error"
        : value !== null
          ? formatValue(value)
          : fallback;

  const limits = [
    {
      label: "Transaction Limit",
      value: isLoadingBase
        ? "--"
        : `${minLimit} ${walletCurrency} – ${maxLimit} ${walletCurrency}`,
    },
    {
      label: "Daily Limit",
      value: show(dailyLimit),
    },
    {
      label: "Remaining Daily",
      value: show(remainingDaily, "--"),
      highlight: "info",
    },
    {
      label: "Monthly Limit",
      value: show(monthlyLimit),
    },
    {
      label: "Remaining Monthly",
      value: show(remainingMonthly, "--"),
      highlight: "success",
    },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
          <h2 className="text-base text-center font-semibold text-white">
            Limit Information
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {limits.map((item, index) => (
            <div key={index} className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {item.label}
              </span>
              <span
                className={`text-sm font-medium text-right ${
                  item.highlight === "success"
                    ? "text-green-600 dark:text-green-400"
                    : item.highlight === "info"
                      ? "text-blue-600 dark:text-blue-400"
                      : error
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LimitInformation;
