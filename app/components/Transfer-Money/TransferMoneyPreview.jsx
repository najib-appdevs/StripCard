"use client";

const TransferMoneyPreview = ({
  amount,
  fixedCharge,
  percentCharge,
  currency,
}) => {
  // =======================
  // SAFE NUMBERS
  // =======================
  const numericAmount = Number(amount);
  const safeAmount = Number.isFinite(numericAmount) ? numericAmount : 0;

  const safeFixed = Number(fixedCharge) || 0;
  const safePercent = Number(percentCharge) || 0;

  // =======================
  // READY STATE
  // =======================
  const isReady =
    typeof currency === "string" && currency.trim() !== "" && currency !== "--";

  // =======================
  // CALCULATIONS
  // =======================
  const hasAmount = safeAmount > 0;

  const fee = hasAmount ? safeAmount * (safePercent / 100) + safeFixed : 0;

  const payable = hasAmount ? safeAmount + fee : 0;

  // =======================
  // FORMATTER
  // =======================
  const format = (value) =>
    isReady ? `${value.toFixed(4)} ${currency}` : "--";

  // =======================
  // ROWS
  // =======================
  const rows = [
    {
      label: "Enter Amount",
      value: format(safeAmount),
    },
    {
      label: "Transfer Fee",
      value: format(fee),
    },
    {
      label: "Recipient Received",
      value: format(safeAmount),
    },
    {
      label: "Total Payable Amount",
      value: format(payable),
    },
  ];

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 rounded-t-2xl">
        <h2 className="text-base text-center font-semibold text-white">
          Transfer Money Preview
        </h2>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="space-y-7">
          {rows.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
            >
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferMoneyPreview;
