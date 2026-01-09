"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { submitGiftCardOrder } from "../../utils/api";

const BuyGiftCardModal = ({ isOpen, onClose, purchaseDetails, card }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  // ==========================================
  // EXTRACT DYNAMIC DATA FROM CARD
  // ==========================================
  const recipientCurrency = card?.currency || "N/A";

  const userWallet = card?.userWallet || {};
  const walletCurrency = userWallet.currency || "USD";
  const walletSymbol = userWallet.symbol || "$";
  const walletBalance = Number(userWallet.balance) || 0;

  const exchangeRate = card?.exchangeRate || 1;

  const platformCharges = card?.platformCharges || {};
  const fixedFee = Number(platformCharges.fixed) || 0;
  const percentFee = Number(platformCharges.percentage) || 0;
  const dailyLimit = Number(platformCharges.dailyLimit) || 0;
  const monthlyLimit = Number(platformCharges.monthlyLimit) || 0;

  const remainingDaily = dailyLimit;
  const remainingMonthly = monthlyLimit;

  // ==========================================
  // CALCULATIONS (ALL IN WALLET CURRENCY)
  // ==========================================
  const totalRecipientAmount =
    purchaseDetails.amount * purchaseDetails.quantity;

  const convertedAmount = (totalRecipientAmount * exchangeRate).toFixed(4);

  const percentFeeAmount = (convertedAmount * (percentFee / 100)).toFixed(4);
  const totalFees = (
    parseFloat(fixedFee) + parseFloat(percentFeeAmount)
  ).toFixed(4);

  const totalPayable = (
    parseFloat(convertedAmount) + parseFloat(totalFees)
  ).toFixed(4);

  const hasSufficientBalance = parseFloat(totalPayable) <= walletBalance;

  // ==========================================
  // ORDER SUBMISSION HANDLER
  // ==========================================
  const handleConfirmOrder = async () => {
    setLoading(true);

    const selectedWalletCurrency =
      purchaseDetails.wallet?.split("(")?.[1]?.replace(")", "")?.trim() ||
      walletCurrency;

    const payload = {
      product_id: purchaseDetails.productId,
      amount: purchaseDetails.amount,
      quantity: purchaseDetails.quantity,
      receiver_email: purchaseDetails.receiverEmail,
      receiver_country: purchaseDetails.countryIso || "",
      // receiver_country: purchaseDetails.country,
      receiver_phone_code:
        purchaseDetails.phone?.split(" ")?.[0]?.replace("+", "") || "",
      receiver_phone: purchaseDetails.phone?.replace(/^\+\d+\s*/, "") || "",
      from_name: purchaseDetails.fromName || "",
      wallet_currency: selectedWalletCurrency,
    };

    try {
      const response = await submitGiftCardOrder(payload);

      if (response?.message?.success) {
        toast.success(
          response.message.success[0] || "Gift card order placed successfully!"
        );
        onClose();
        router.push("/dashboard/gift-card"); // Redirect after success
      } else {
        const errorMsg = response?.message?.error?.[0] || "Order failed";
        toast.error(errorMsg);
        router.push("/dashboard/gift-card"); // Redirect after success
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message?.error?.[0] ||
        error.message ||
        "Failed to place order. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RENDER MODAL
  // ==========================================
  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-none flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-screen overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
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

        {/* MODAL TITLE */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Buy Gift Card</h3>

        {/* PURCHASE SUMMARY SECTION */}
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
              {purchaseDetails.amount.toFixed(4)} {recipientCurrency}
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
              {totalRecipientAmount.toFixed(4)} {recipientCurrency}
            </span>
          </div>
        </div>

        {/* CONVERSION & FEES SECTION */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Exchange Rate:</span>
            <span className="font-medium text-gray-900">
              1 {recipientCurrency} = {exchangeRate.toFixed(4)} {walletCurrency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Conversion Amount:</span>
            <span className="font-semibold text-gray-900">
              {walletSymbol}
              {convertedAmount} {walletCurrency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Fees & Charges:</span>
            <span className="font-semibold text-gray-900">
              {walletSymbol}
              {fixedFee.toFixed(4)} + {percentFee.toFixed(4)}% = {walletSymbol}
              {totalFees} {walletCurrency}
            </span>
          </div>

          {/* LIMITS SUBSECTION */}
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Limit:</span>
              <span className="font-medium text-gray-900">
                {walletSymbol}
                {dailyLimit.toFixed(4)} {walletCurrency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining Daily Limit:</span>
              <span className="font-medium text-gray-900">
                {walletSymbol}
                {remainingDaily.toFixed(4)} {walletCurrency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Limit:</span>
              <span className="font-medium text-gray-900">
                {walletSymbol}
                {monthlyLimit.toFixed(4)} {walletCurrency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining Monthly Limit:</span>
              <span className="font-medium text-gray-900">
                {walletSymbol}
                {remainingMonthly.toFixed(4)} {walletCurrency}
              </span>
            </div>
          </div>

          {/* TOTAL PAYABLE */}
          <div className="flex justify-between text-lg font-bold pt-3 border-t">
            <span className="text-gray-800">Total Payable Amount:</span>
            <span className="text-emerald-600">
              {walletSymbol}
              {totalPayable} {walletCurrency}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS SECTION */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmOrder}
            disabled={loading || !hasSufficientBalance}
            className={`flex-1 px-4 py-3 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg ${
              loading || !hasSufficientBalance
                ? "btn-primary cursor-not-allowed"
                : "btn-primary cursor-pointer"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Processing...
              </span>
            ) : !hasSufficientBalance ? (
              "Insufficient Balance"
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyGiftCardModal;
