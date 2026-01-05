"use client";

import { useEffect, useState } from "react";
import { getKycInputFields, submitKyc } from "../../utils/api";

const KYC_STATUS_MAP = {
  0: { label: "Unverified", color: "text-red-500" },
  1: { label: "Verified", color: "text-green-600" },
  2: { label: "Pending", color: "text-yellow-500" },
  3: { label: "Rejected", color: "text-red-600" },
};

export default function VerifiedKYC() {
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  // Fetch KYC input fields
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

  // Handle input change
  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit KYC
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

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading KYC information...</p>
      </div>
    );
  }

  // Error fallback
  if (!kycData) {
    return <p className="text-red-500 text-center">Failed to load KYC data.</p>;
  }

  const status = KYC_STATUS_MAP[kycData.kyc_status];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">KYC Verification</h2>
        <p className={`mt-2 font-medium ${status.color}`}>
          Status: {status.label}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          <ul className="list-disc pl-5">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* KYC Form (Only for Unverified / Rejected) */}
      {(kycData.kyc_status === 0 || kycData.kyc_status === 3) && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {kycData.input_fields.map((field, index) => (
            <div key={index}>
              <label className="block mb-1 font-medium">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {/* File Input */}
              {field.type === "file" && (
                <input
                  type="file"
                  accept={field.validation.mimes
                    .map((m) => `.${m.trim()}`)
                    .join(",")}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.files[0])}
                  className="w-full border rounded p-2"
                />
              )}

              {/* Select Input */}
              {field.type === "select" && (
                <select
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select {field.label}</option>
                  {field.validation.options.map((option, i) => (
                    <option key={i} value={option.trim()}>
                      {option.trim()}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 rounded text-white ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit KYC"}
          </button>
        </form>
      )}

      {/* Pending Message */}
      {kycData.kyc_status === 2 && (
        <p className="text-yellow-600 font-medium">
          Your KYC is under review. Please wait for approval.
        </p>
      )}

      {/* Verified Message */}
      {kycData.kyc_status === 1 && (
        <p className="text-green-600 font-medium">
          Your KYC is verified successfully.
        </p>
      )}
    </div>
  );
}
