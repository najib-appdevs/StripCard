"use client";

import { useEffect, useState } from "react";
import { getKycInputFields, submitKyc } from "../../utils/api";

const KYC_STATUS_MAP = {
  0: { label: "Unverified", color: "text-red-600" },
  1: { label: "Verified", color: "text-green-600" },
  2: { label: "Pending", color: "text-yellow-600" },
  3: { label: "Rejected", color: "text-red-700" },
};

export default function VerifiedKYC() {
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchKyc = async () => {
      setLoading(true);
      const res = await getKycInputFields();
      if (res?.data) {
        setKycData(res.data);
      }
      setLoading(false);
    };
    fetchKyc();
  }, []);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    setSuccess("");

    const res = await submitKyc(formValues);

    if (res?.message?.success) {
      setSuccess(res.message.success[0] || "KYC submitted successfully");
    } else if (res?.message?.error) {
      setErrors(res.message.error);
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 font-medium">Loading KYC information...</p>
      </div>
    );
  }

  if (!kycData) {
    return (
      <p className="text-red-600 text-center font-medium">
        Failed to load KYC data.
      </p>
    );
  }

  const status = KYC_STATUS_MAP[kycData.kyc_status];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          KYC Verification
        </h2>
        <p className={`mt-2 text-sm font-semibold ${status.color}`}>
          Status: {status.label}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <ul className="list-disc pl-5 space-y-1">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* KYC Form */}
      {(kycData.kyc_status === 0 || kycData.kyc_status === 3) && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {kycData.input_fields.map((field, index) => (
            <div key={index}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "file" && (
                <input
                  type="file"
                  accept={field.validation.mimes
                    .map((m) => `.${m.trim()}`)
                    .join(",")}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.files[0])}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
              )}

              {field.type === "select" && (
                <div className="relative">
                  <select
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="
      w-full appearance-none
      rounded-lg border border-gray-300
      bg-white px-3 py-2.5 pr-10
      text-sm text-gray-700
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
    "
                  >
                    <option value="">Select {field.label}</option>
                    {field.validation.options.map((option, i) => (
                      <option key={i} value={option.trim()}>
                        {option.trim()}
                      </option>
                    ))}
                  </select>

                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all
              ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "btn-primary hover:opacity-90"
              }`}
          >
            {submitting ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
      )}

      {kycData.kyc_status === 2 && (
        <p className="text-yellow-600 font-medium mt-4">
          Your KYC is under review. Please wait for approval.
        </p>
      )}

      {kycData.kyc_status === 1 && (
        <p className="text-green-600 font-medium mt-4">
          Your KYC is verified successfully.
        </p>
      )}
    </div>
  );
}
