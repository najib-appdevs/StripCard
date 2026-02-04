"use client";

const AddMoneyPreview = ({
  amount = "",
  walletCurrency = "",
  selectedGateway = null,
  fixedCharge = 0,
  percentCharge = 0,
  chargeCurrency = "",
  rate = 1,
}) => {
  const enteredAmount = Number(amount) || 0;

  // Exchange rate
  const exchangeRate = Number(rate) || 0;

  // 🔹 Detect loading state
  const isLoading =
    !walletCurrency ||
    !chargeCurrency ||
    !selectedGateway ||
    !exchangeRate;

  // Step 1: Convert entered amount to gateway currency
  const convertedAmount = enteredAmount * exchangeRate;

  // Step 2: Fees
  const percentFee = convertedAmount * (percentCharge / 100);
  const totalFee = fixedCharge + percentFee;

  // Step 3: Total payable
  const totalPayable = convertedAmount + totalFee;

  // Will get
  const willGet = enteredAmount;

  // 🔹 Helper for display
  const show = (value, currency) =>
    isLoading ? (
      <span className="animate-pulse text-gray-400 dark:text-gray-500">--</span>
    ) : (
      `${value.toFixed(4)} ${currency}`
    );

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Add Money Preview
        </h2>
      </div>

      <div className="p-6 space-y-4 min-h-[400px] flex flex-col">
        {/* Enter Amount */}
        <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">Enter Amount</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isLoading ? (
              <span className="animate-pulse text-gray-400 dark:text-gray-500">--</span>
            ) : (
              `${enteredAmount.toFixed(4)} ${walletCurrency}`
            )}
          </span>
        </div>

        {/* Exchange Rate */}
        <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">Exchange Rate</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {isLoading ? (
              <span className="animate-pulse text-gray-400 dark:text-gray-500">--</span>
            ) : (
              `1 ${walletCurrency} = ${exchangeRate.toFixed(4)} ${chargeCurrency}`
            )}
          </span>
        </div>

        {/* Fees */}
        <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">Fees & Charges</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {show(totalFee, chargeCurrency)}
          </span>
        </div>

        {/* Conversion Amount */}
        <div className="flex justify-between rounded-xl bg-gray-50 dark:bg-gray-800/60 px-4 py-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">Conversion Amount</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {show(convertedAmount, chargeCurrency)}
          </span>
        </div>

        <div className="flex-1" />
        <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-4" />

        {/* Will Get */}
        <div className="flex justify-between rounded-xl bg-green-50 dark:bg-green-950/40 px-4 py-3">
          <span className="text-sm font-medium text-green-700 dark:text-green-400">Will Get</span>
          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
            {isLoading ? (
              <span className="animate-pulse">--</span>
            ) : (
              `${willGet.toFixed(4)} ${walletCurrency}`
            )}
          </span>
        </div>

        {/* Total Payable */}
        <div className="flex justify-between rounded-xl px-4 py-4 bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)] dark:bg-[linear-gradient(76.84deg,#0D9A7E_-2.66%,#3E9F28_105.87%)]">
          <span className="text-base font-medium text-white">
            Total Payable Amount
          </span>
          <span className="text-base font-bold text-white">
            {show(totalPayable, chargeCurrency)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyPreview;