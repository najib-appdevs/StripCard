export default function PaymentInformation({
  paymentInformations,
  gatewayCurrencyName = "Manual Gateway",
  trx = "—",
  className = "",
}) {
  if (!paymentInformations || Object.keys(paymentInformations).length === 0) {
    return (
      <div
        className={`bg-gray-50 p-5 rounded-xl border border-gray-200 ${className}`}
      >
        <p className="text-gray-500 text-center">
          No payment information available
        </p>
      </div>
    );
  }

  const {
    request_amount = "—",
    exchange_rate = "—",
    total_charge = "—",
    payable_amount = "—",
    will_get = "—",
  } = paymentInformations;

  // ────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────
  const formatAmount = (value, decimals = 4) => {
    if (!value) return "—";
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return "—";
    return num.toFixed(decimals);
  };

  const extractCurrency = (value) => {
    const match = String(value).match(/[A-Z]{3}/);
    return match ? match[0] : "";
  };

  // ────────────────────────────────────────────────
  // Conversion calculation
  // ────────────────────────────────────────────────
  let conversionAmount = "—";
  let conversionCurrency = "—";

  try {
    const requestValue = parseFloat(
      String(request_amount).replace(/[^0-9.]/g, "")
    );

    let rate = 1;

    if (exchange_rate && exchange_rate.includes("=")) {
      const rightSide = exchange_rate.split("=")[1]?.trim();
      if (rightSide) {
        const rateValue = parseFloat(rightSide);
        if (!isNaN(rateValue)) rate = rateValue;

        const currencyMatch = rightSide.match(/[A-Z]{3}/);
        if (currencyMatch) conversionCurrency = currencyMatch[0];
      }
    }

    if (!isNaN(requestValue)) {
      conversionAmount = (requestValue * rate).toFixed(4);
    }
  } catch (error) {
    console.warn("Conversion calculation failed", error);
  }

  // ────────────────────────────────────────────────
  // UI
  // ────────────────────────────────────────────────
  return (
    <div
      className={`bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm ${className}`}
    >
      <h3 className="text-lg font-semibold text-center text-gray-800 mb-5 border-b border-gray-200 pb-3">
        Payment Information
      </h3>

      <div className="space-y-4 text-sm">
        {/* <div className="flex justify-between">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-medium text-gray-900">{trx}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Gateway</span>
          <span className="font-medium text-gray-900">
            {gatewayCurrencyName}
          </span>
        </div> */}

        <div className="flex justify-between">
          <span className="text-gray-600">Entered Amount</span>
          <span className="font-medium text-gray-900">
            {formatAmount(request_amount)} {extractCurrency(request_amount)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Exchange Rate</span>
          <span className="font-medium text-gray-900">{exchange_rate}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Fees & Charges</span>
          <span className="font-medium text-red-600">
            {formatAmount(total_charge)} {extractCurrency(total_charge)}
          </span>
        </div>

        <div className="flex justify-between pt-2">
          <span className="text-gray-700 font-medium">Conversion Amount</span>
          <span className="font-bold text-emerald-700 text-base">
            {conversionAmount} {conversionCurrency}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">You Will Get</span>
          <span className="font-bold text-emerald-600 text-lg">
            {formatAmount(will_get)} {extractCurrency(will_get)}
          </span>
        </div>

        <div className="flex justify-between pt-3 border-t border-gray-200">
          <span className="text-gray-700 font-medium">
            Total Payable Amount
          </span>
          <span className="font-bold text-emerald-600 text-lg">
            {formatAmount(payable_amount)} {extractCurrency(payable_amount)}
          </span>
        </div>
      </div>
    </div>
  );
}
