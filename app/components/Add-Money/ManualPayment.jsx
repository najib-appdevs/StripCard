"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

      const res = await fetch(submit_url, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      // Handle success response
      if (result?.message?.success) {
        toast.success(
          result.message.success[0] || "Payment proof submitted successfully!"
        );
        localStorage.removeItem("pendingManualPayment");
        router.push("/dashboard");
      } else {
        // Handle error response
        toast.error(
          result?.message?.error?.[0] || "Failed to submit payment details"
        );
      }
    } catch (err) {
      const errorMsg = err.message || "Network error or server is unreachable";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------------
  if (!manualData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Manual Payment Via {gateway_currency_name || "Manual Gateway"}
          </h1>

          {details && (
            <div
              className="text-gray-600 text-base prose max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: details }}
            />
          )}
        </div>

        {/* Payment Information Component */}
        <PaymentInformation
          paymentInformations={payment_informations}
          gatewayCurrencyName={gateway_currency_name}
          trx={trx}
          className="mb-10"
        />

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Dynamic Form Fields */}
          {input_fields.length > 0 ? (
            input_fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-gray-700 font-medium">
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
                    className="cursor-pointer block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-emerald-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition file:cursor-pointer"
                  />
                ) : (
                  /* Text/Number Input */
                  <input
                    type={field.type}
                    name={field.name}
                    maxLength={field.validation?.max}
                    required={field.required}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition text-gray-800"
                  />
                )}
              </div>
            ))
          ) : (
            /* No Fields Message */
            <p className="text-center text-gray-500 py-6">
              No additional information required for this gateway
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || input_fields.length === 0}
            className={`
              cursor-pointer w-full mt-10 py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all
              ${
                loading || input_fields.length === 0
                  ? "btn-primary cursor-not-allowed"
                  : "btn-primary"
              }
            `}
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
    </div>
  );
}
