"use client";

const LimitInformation = ({
  selectedGateway = null,
  walletCurrency = "USD",
}) => {
  // 🔹 Detect loading state
  const isLoading = !selectedGateway || !selectedGateway.rate;

  // Default values
  let minLimit = "--";
  let maxLimit = "--";
  let dailyLimit = "--";
  let remainingDaily = "--";
  let monthlyLimit = "--";
  let remainingMonthly = "--";

  if (!isLoading) {
    const rate = Number(selectedGateway.rate) || 1;

    const min = Number(selectedGateway.min_limit) || 0;
    const max = Number(selectedGateway.max_limit) || 0;
    const daily = Number(selectedGateway.daily_limit) || 0;
    const monthly = Number(selectedGateway.monthly_limit) || 0;

    minLimit = (min / rate).toFixed(4);
    maxLimit = (max / rate).toFixed(4);
    dailyLimit = (daily / rate).toFixed(4);
    monthlyLimit = (monthly / rate).toFixed(4);

    remainingDaily = dailyLimit;
    remainingMonthly = monthlyLimit;
  }

  // 🔹 Helper for display
  const show = (value) =>
    isLoading ? (
      <span className="animate-pulse text-gray-400 dark:text-gray-500">--</span>
    ) : (
      `${value} ${walletCurrency}`
    );

  const limits = [
    {
      label: "Transaction Limit",
      value: isLoading
        ? show()
        : `${minLimit} ${walletCurrency} – ${maxLimit} ${walletCurrency}`,
    },
    {
      label: "Daily Limit",
      value: show(dailyLimit),
    },
    {
      label: "Remaining Daily Limit",
      value: show(remainingDaily),
      highlight: "info",
    },
    {
      label: "Monthly Limit",
      value: show(monthlyLimit),
    },
    {
      label: "Remaining Monthly Limit",
      value: show(remainingMonthly),
      highlight: "success",
    },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 dark:bg-gray-950 px-6 py-4">
          <h2 className="text-base text-center font-semibold text-white">
            Limit Information
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {limits.map((item, index) => (
            <div key={index} className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-300">{item.label}</span>

              <span
                className={`text-sm font-medium text-right ${
                  item.highlight === "success"
                    ? "text-green-600 dark:text-green-400"
                    : item.highlight === "info"
                    ? "text-blue-600 dark:text-blue-400"
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