"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PaymentInformation() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = sessionStorage.getItem("pendingWithdrawData");

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Extract only the payment_informations part
        if (parsed?.request_amount) {
          setSummary({
            request_amount: parsed.request_amount || "—",
            exchange_rate: parsed.exchange_rate || "—",
            total_charge: parsed.total_charge || "—",
            conversion_amount: parsed.conversion_amount || "—",
            will_get: parsed.will_get || "—",
            payable: parsed.payable || "—",
          });
        } else {
          throw new Error("Incomplete data");
        }
      } catch (err) {
        toast.error("Failed to load payment summary. Please try again.");
        router.push("/dashboard/withdraw-money");
      }
    } else {
      toast.error(
        "No pending withdrawal found. Please start a new withdrawal."
      );
      router.push("/dashboard/withdraw-money");
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading payment information...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            Unable to load payment details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center  bg-gray-50 ">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Information
          </h1>
          <p className="text-gray-600">
            Please review the details of your withdrawal request below.
          </p>
        </div>

        <div className="space-y-6 bg-gray-50 p-6 rounded-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Enter Amount
              </label>
              <p className="text-xl font-semibold text-gray-900">
                {summary.request_amount}
              </p>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Exchange Rate
              </label>
              <p className="text-xl font-semibold text-gray-900">
                {summary.exchange_rate}
              </p>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Fees & Charges
              </label>
              <p className="text-xl font-semibold text-red-600">
                {summary.total_charge}
              </p>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Conversion Amount
              </label>
              <p className="text-xl font-semibold text-gray-900">
                {summary.conversion_amount}
              </p>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Will Get
              </label>
              <p className="text-xl font-semibold text-emerald-600">
                {summary.will_get}
              </p>
            </div>

            <div className="md:col-span-2 border-t border-gray-200 pt-4">
              <label className="block text-gray-600 font-medium mb-1 text-lg">
                Total Payable Amount
              </label>
              <p className="text-2xl font-bold text-gray-900">
                {summary.payable}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
