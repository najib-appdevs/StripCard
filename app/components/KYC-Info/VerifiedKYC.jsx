"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getKycInputFields, submitKyc } from "../../utils/api";
import KycSkeleton from "./KycSkeleton";

const KYC_STATUS_MAP = {
  0: { label: "Unverified", color: "text-red-600" },
  1: { label: "Verified", color: "text-green-600" },
  2: { label: "Pending", color: "text-yellow-600" },
  3: { label: "Rejected", color: "text-red-700" },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

    try {
      const res = await submitKyc(formValues);

      if (res?.message?.success) {
        const msg = res.message.success[0] || "KYC submitted successfully";
        setSuccess(msg);
        toast.success(msg);
      } else if (res?.message?.error) {
        const errorMsg = res.message.error[0] || "Submission failed";
        setErrors(res.message.error);
        toast.error(errorMsg);
      } else {
        // This is your "Server Error" case
        toast.error("Server Error", {
          duration: 5000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please check your connection", {
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <KycSkeleton />;
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
                  onChange={(e) =>
                    handleChange(field.name, e.target.files?.[0] ?? null)
                  }
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-700 focus:ring-1 focus:ring-green-400 focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              )}

              {field.type === "select" && (
                <Listbox
                  value={formValues[field.name] ?? ""}
                  onChange={(value) => handleChange(field.name, value)}
                >
                  <div className="relative mt-1">
                    <Listbox.Button
                      className={`
                        relative w-full cursor-pointer 
                        rounded-lg border border-gray-300 
                        bg-white py-2.5 pl-3 pr-10 
                        text-left text-sm text-gray-700
                        focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400
                      `}
                    >
                      <span className="block truncate">
                        {formValues[field.name]
                          ? formValues[field.name]
                          : `Select ${field.label}`}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDown
                          className="h-5 w-5 text-gray-500"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Listbox.Options
                      className={`
                        absolute z-10 mt-1 max-h-60 w-full 
                        overflow-auto rounded-lg bg-white py-1 
                        text-base shadow-lg ring-1 ring-black/5 
                        focus:outline-none sm:text-sm
                      `}
                    >
                      {field.validation.options.map((option, i) => (
                        <Listbox.Option
                          key={i}
                          value={option.trim()}
                          className={({ active, selected }) =>
                            classNames(
                              active
                                ? "bg-green-50 text-green-900"
                                : "text-gray-900",
                              selected ? "font-semibold bg-green-100" : "",
                              "relative cursor-pointer select-none py-2 pl-10 pr-4"
                            )
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {option.trim()}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                  <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 btn-primary
              ${
                submitting
                  ? "opacity-90 cursor-wait"
                  : "hover:opacity-90 active:opacity-80"
              }`}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "Submit KYC"
            )}
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
