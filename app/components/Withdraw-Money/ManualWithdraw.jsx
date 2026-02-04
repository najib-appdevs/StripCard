"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { submitFinalWithdraw } from "../../utils/api";

export default function ManualWithdraw() {
  const router = useRouter();

  const [withdrawData, setWithdrawData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState(null);

  // Load pending withdrawal data from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem("pendingWithdrawData");

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setWithdrawData(parsed);

        // Initialize form values
        const initial = {};
        parsed.input_fields?.forEach((field) => {
          initial[field.name] = ""; // empty string for all fields
        });
        setFormValues(initial);
      } catch (err) {
        setPageError("Failed to load withdrawal details. Please try again.");
        toast.error("Failed to load withdrawal details");
      }
    } else {
      setPageError("No pending withdrawal found.");

      router.replace("/dashboard/withdraw-money"); // redirect back to withdraw page
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Client-side required fields check
    const requiredFields =
      withdrawData?.input_fields?.filter((f) => f.required) || [];
    const missing = requiredFields.find((f) => !formValues[f.name]?.trim());

    if (missing) {
      return toast.error(`Please fill ${missing.label}`);
    }

    setSubmitting(true);
    setPageError(null);

    try {
      const payload = {
        trx: withdrawData.trx,
        ...formValues,
      };

      const response = await submitFinalWithdraw(payload);

      if (response?.message?.success) {
        // Show success message exactly from server
        const successMsg =
          response.message.success[0] ||
          "Withdrawal request sent successfully!";
        toast.success(successMsg);

        // Clean up
        sessionStorage.removeItem("pendingWithdrawData");

        // Redirect to dashboard or success page
        router.push("/dashboard");
      } else {
        // Show server error message exactly as received
        const errorMsg =
          response?.message?.error?.[0] ||
          "Failed to complete withdrawal request";
        toast.error(errorMsg);
        setPageError(errorMsg);
      }
    } catch (err) {
      const fallback = "An unexpected error occurred. Please try again later.";
      toast.error(fallback);
      setPageError(fallback);
      console.error("Final withdrawal submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!withdrawData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Loading withdrawal details...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-950/40 p-8 w-full max-w-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Withdraw Via{" "}
          {withdrawData.gateway_currency_name.split(" ").slice(0, -1).join(" ")}
        </h1>

        <div
          className="text-gray-600 dark:text-gray-300 text-base prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: withdrawData.details || "" }}
        />
      </div>

      {/* Dynamic Form */}
      <div className="space-y-6">
        {withdrawData.input_fields?.map((field) => (
          <div key={field.name}>
            <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              placeholder={field.label}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`cursor-pointer w-full mt-8 py-3 px-6 rounded-lg font-semibold text-white transition-colors
            bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)]
            dark:bg-[linear-gradient(76.84deg,#0D9A7E_-2.66%,#3E9F28_105.87%)]
            hover:opacity-90
            ${submitting ? "opacity-70 cursor-wait" : ""}
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:focus:ring-emerald-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
      >
        {submitting ? "Submitting..." : "Confirm"}
      </button>
    </div>
  );
}
