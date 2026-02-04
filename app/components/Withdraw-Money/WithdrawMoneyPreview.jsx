"use client";

import { useEffect, useState } from "react";
import { getWithdrawInfo } from "../../utils/api";

const WithdrawMoneyPreview = ({ amount = 0 }) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [withdrawData, setWithdrawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getWithdrawInfo();

        if (response?.data) {
          setWithdrawData(response.data);
        } else if (response?.message?.error) {
          setError(response.message.error[0] || "Failed to load data");
        }
      } catch (err) {
        setError("Something went wrong while loading withdrawal info");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ============================================================================
  // ERROR HANDLING
  // ============================================================================
  if (error) {
    return (
      <div className="w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-6 min-h-[400px] flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  // ============================================================================
  // DATA EXTRACTION
  // ============================================================================
  const inputAmount = Number(amount) || 0;
  const gatewayCurrency = withdrawData?.gateways?.[0]?.currencies?.[0];
  const baseCurr = withdrawData?.base_curr || "USD";
  const rate = gatewayCurrency?.rate || 1;
  const fixedCharge = gatewayCurrency?.fixed_charge || 0;
  const percentCharge = gatewayCurrency?.percent_charge || 0;

  // ============================================================================
  // CALCULATIONS
  // ============================================================================
  const chargePercentage = (inputAmount * percentCharge) / 100;
  const totalFees = fixedCharge + chargePercentage;
  const payableAmount = inputAmount + totalFees;
  const willGetAmount = inputAmount;
  const exchangeRateText = `1 ${baseCurr} = ${rate.toFixed(4)} ${baseCurr}`;

  // ============================================================================
  // LOADING STATE CHECK
  // ============================================================================
  const isLoading = loading || !withdrawData;

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Withdraw Money Preview
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4 min-h-[400px] flex flex-col">
        {/* Enter Amount */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-200">Enter Amount</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isLoading ? "--" : `${inputAmount.toFixed(4)} ${baseCurr}`}
          </span>
        </div>

        {/* Exchange Rate */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-200">Exchange Rate</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isLoading ? "--" : exchangeRateText}
          </span>
        </div>

        {/* Fees & Charges */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-200">Fees & Charges</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isLoading ? "--" : `${totalFees.toFixed(4)} ${baseCurr}`}
          </span>
        </div>

        {/* Conversion Amount */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-200">Conversion Amount</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isLoading ? "--" : `${willGetAmount.toFixed(4)} ${baseCurr}`}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Divider */}
        <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-4" />

        {/* Will Get */}
        <div className="flex items-center justify-between rounded-xl bg-green-50 dark:bg-green-950/40 px-4 py-3">
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Will Get</span>
          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
            {isLoading ? "--" : `${willGetAmount.toFixed(4)} ${baseCurr}`}
          </span>
        </div>

        {/* Total Payable */}
        <div className="flex items-center justify-between rounded-xl px-4 py-4 bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)] dark:bg-[linear-gradient(76.84deg,#0D9A7E_-2.66%,#3E9F28_105.87%)]">
          <span className="text-base font-medium text-white">
            Total Payable Amount
          </span>
          <span className="text-base font-bold text-white">
            {isLoading ? "--" : `${payableAmount.toFixed(4)} ${baseCurr}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoneyPreview;