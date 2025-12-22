"use client";

const BuyGiftCardModal = ({ isOpen, onClose, onConfirm, purchaseDetails }) => {
  if (!isOpen) return null;

  // Hard-coded values as requested (later make these dynamic)
  const exchangeRate = 1.1661; // 1 EUR = 1.1661 USD
  const totalInEUR = purchaseDetails.amount * purchaseDetails.quantity;
  const conversionAmount = (totalInEUR * exchangeRate).toFixed(4); // 11460.6899 USD example

  const feesFixed = 1.0; // 1.0000 USD
  const feesPercentage = 1.0; // 1.0000%
  const feesPercentAmount = (conversionAmount * (feesPercentage / 100)).toFixed(
    4
  );
  const totalFees = (
    parseFloat(feesFixed) + parseFloat(feesPercentAmount)
  ).toFixed(4);

  const totalPayableUSD = (
    parseFloat(conversionAmount) + parseFloat(totalFees)
  ).toFixed(4);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Buy Gift Card</h3>

        {/* Purchase Summary */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Product Name:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.productName}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Receiver Email:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.receiverEmail || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Receiver Country:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.country || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Receiver Phone:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.phone || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">From Name:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.fromName || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Unit Price:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.amount.toFixed(2)} EUR
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-semibold text-gray-900">
              {purchaseDetails.quantity}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span className="text-gray-800">Total Price:</span>
            <span className="text-emerald-600">
              {totalInEUR.toFixed(4)} EUR
            </span>
          </div>
        </div>

        {/* Conversion & Fees */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Exchange Rate:</span>
            <span className="font-medium text-gray-900">
              1 EUR = {exchangeRate} USD
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Conversion Amount:</span>
            <span className="font-semibold text-gray-900">
              {conversionAmount} USD
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Fees & Charges:</span>
            <span className="font-semibold text-gray-900">
              {feesFixed.toFixed(4)} USD + {feesPercentage.toFixed(1)}% ={" "}
              {totalFees} USD
            </span>
          </div>

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Limit:</span>
              <span className="font-medium text-gray-900">10000.0000 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining Daily Limit:</span>
              <span className="font-medium text-gray-900">10000.0000 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Limit:</span>
              <span className="font-medium text-gray-900">50000.0000 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining Monthly Limit:</span>
              <span className="font-medium text-gray-900">49916.0389 USD</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold pt-3 border-t">
            <span className="text-gray-800">Total Payable Amount:</span>
            <span className="text-emerald-600">{totalPayableUSD} USD</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyGiftCardModal;
