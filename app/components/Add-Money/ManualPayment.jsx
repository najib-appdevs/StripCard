"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { submitManualPaymentProof } from "../../utils/api";
import PaymentInformation from "./PaymentInformation";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ManualPaymentPage() {
  const router = useRouter();

  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------
  const [manualData, setManualData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------------------------------
  // Load Payment Data from Storage
  // --------------------------------------------------------------------------
  useEffect(() => {
    const stored = sessionStorage.getItem("pendingManualPayment");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setManualData(parsed);
      } catch (e) {
        toast.error("Invalid payment data");
        router.push("/dashboard");
      }
    } else {
      toast.error("No pending manual payment found");
      router.push("/dashboard");
    }
  }, [router]);

  // --------------------------------------------------------------------------
  // Form Input Handlers
  // --------------------------------------------------------------------------
  const handleInputChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // --------------------------------------------------------------------------
  // Form Submit Handler
  // --------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Required field
      formData.append("track", trx);

      // Add all dynamic fields
      input_fields.forEach((field) => {
        const value = formValues[field.name];
        if (field.type === "file" && file) {
          formData.append(field.name, file);
        } else if (value !== undefined && value !== "") {
          formData.append(field.name, value);
        }
      });

      // Call the API function
      const result = await submitManualPaymentProof({ track: trx, formData });

      // Handle success response
      if (result?.message?.success) {
        toast.success(
          result.message.success[0] || "Payment proof submitted successfully!",
        );
        sessionStorage.removeItem("pendingManualPayment");
        router.push("/dashboard");
        return;
      }

      // Handle error response
      if (result?.message?.error) {
        const errorMsg =
          result.message.error[0] || "Failed to submit payment details";
        toast.error(errorMsg);
        return;
      }

      // Fallback
      toast.error("Unexpected response from server");
    } catch (err) {
      toast.error(
        err.message || "Submission failed. Please re-upload the payment proof",
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------------
  if (!manualData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg animate-pulse">
          Loading payment details...
        </p>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Extract Payment Data
  // --------------------------------------------------------------------------
  const {
    trx,
    details,
    input_fields = [],
    submit_url,
    gateway_currency_name,
    payment_informations = {},
  } = manualData;

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT – Manual Payment Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-950/40 p-8 md:p-10">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Manual Payment Via {gateway_currency_name || "Manual Gateway"}
          </h1>

          {details && (
            <div
              className="text-gray-600 dark:text-gray-300 text-base prose max-w-none leading-relaxed dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          )}
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Dynamic Form Fields */}
          {input_fields.length > 0 ? (
            input_fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-gray-700 dark:text-gray-200 font-medium">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {/* File Input */}
                {field.type === "file" ? (
                  <input
                    type="file"
                    accept={
                      field.validation?.mimes?.map((m) => `.${m}`).join(",") ||
                      "image/*"
                    }
                    onChange={handleFileChange}
                    required={field.required}
                    className="cursor-pointer block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 dark:file:bg-emerald-900/40 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/60 transition file:cursor-pointer"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    maxLength={field.validation?.max}
                    required={field.required}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-emerald-600 focus:border-emerald-500 dark:focus:border-emerald-600 transition text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-6">
              No additional information required for this gateway
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || input_fields.length === 0}
            className={`cursor-pointer w-full mt-10 py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)] dark:bg-[linear-gradient(76.84deg,#0D9A7E_-2.66%,#3E9F28_105.87%)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
              loading || input_fields.length === 0
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Confirm Payment"
            )}
          </button>
        </form>
      </div>

      {/* RIGHT – Payment Information */}
      <div>
        <PaymentInformation
          paymentInformations={payment_informations}
          gatewayCurrencyName={gateway_currency_name}
          trx={trx}
        />
      </div>
    </div>
  );
}