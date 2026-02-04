"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getKycInputFields, submitKyc } from "../../utils/api";
import KycSkeleton from "./KycSkeleton";

const KYC_STATUS_MAP = {
  0: { label: "Unverified", color: "text-red-600 dark:text-red-400" },
  1: { label: "Verified", color: "text-green-600 dark:text-green-400" },
  2: { label: "Pending", color: "text-yellow-600 dark:text-yellow-400" },
  3: { label: "Rejected", color: "text-red-700 dark:text-red-300" },
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
        toast.error("Server Error", { duration: 5000 });
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
      <p className="text-red-600 dark:text-red-400 text-center font-medium">
        Failed to load KYC data.
      </p>
    );
  }

  const status = KYC_STATUS_MAP[kycData.kyc_status];

  return (
    <div
      className="
      max-w-2xl mx-auto 
      p-6 
      bg-white dark:bg-gray-800 
      rounded-xl 
      shadow-md dark:shadow-gray-900/40 
      border border-gray-200 dark:border-gray-700
      transition-colors
    "
    >
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          KYC Verification
        </h2>
        <p className={`mt-2 text-sm font-semibold ${status.color}`}>
          Status: {status.label}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div
          className="
          mb-4 p-4 
          bg-green-50 dark:bg-green-900/30 
          border border-green-200 dark:border-green-800/60 
          text-green-700 dark:text-green-300 
          rounded-lg
        "
        >
          {success}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div
          className="
          mb-4 p-4 
          bg-red-50 dark:bg-red-900/30 
          border border-red-200 dark:border-red-800/60 
          text-red-700 dark:text-red-300 
          rounded-lg
        "
        >
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
              <label
                className="
                block mb-1 
                text-sm font-medium 
                text-gray-700 dark:text-gray-300
              "
              >
                {field.label}
                {field.required && (
                  <span className="text-red-500 dark:text-red-400"> *</span>
                )}
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
                  className="
                    w-full rounded-lg 
                    border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 
                    p-2.5 text-sm 
                    text-gray-700 dark:text-gray-200 
                    file:mr-4 file:py-2 file:px-4 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-green-50 dark:file:bg-green-900/40 
                    file:text-green-700 dark:file:text-green-300 
                    hover:file:bg-green-100 dark:hover:file:bg-green-900/60
                    focus:ring-1 focus:ring-green-400 dark:focus:ring-green-500 
                    focus:outline-none cursor-pointer
                    transition-colors
                  "
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
                        rounded-lg border border-gray-300 dark:border-gray-600
                        bg-white dark:bg-gray-700
                        py-2.5 pl-3 pr-10 
                        text-left text-sm 
                        text-gray-700 dark:text-gray-200
                        focus:outline-none focus:ring-1 
                        focus:ring-green-400 dark:focus:ring-green-500 
                        focus:border-green-400 dark:focus:border-green-500
                        transition-colors
                      `}
                    >
                      <span className="block truncate">
                        {formValues[field.name]
                          ? formValues[field.name]
                          : `Select ${field.label}`}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDown
                          className="h-5 w-5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Listbox.Options
                      className={`
                        absolute z-10 mt-1 max-h-60 w-full 
                        overflow-auto rounded-lg 
                        bg-white dark:bg-gray-800 
                        py-1 text-base 
                        shadow-lg ring-1 ring-black/5 dark:ring-white/10
                        focus:outline-none sm:text-sm
                        border border-gray-200 dark:border-gray-700
                      `}
                    >
                      {field.validation.options.map((option, i) => (
                        <Listbox.Option
                          key={i}
                          value={option.trim()}
                          className={({ active, selected }) =>
                            classNames(
                              active
                                ? "bg-green-50 dark:bg-green-900/40 text-green-900 dark:text-green-100"
                                : "text-gray-900 dark:text-gray-200",
                              selected
                                ? "font-semibold bg-green-100 dark:bg-green-800/50"
                                : "",
                              "relative cursor-pointer select-none py-2 pl-10 pr-4",
                            )
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate",
                                )}
                              >
                                {option.trim()}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600 dark:text-green-400">
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
            className={`
              w-full py-2.5 rounded-lg 
              text-white font-semibold 
              transition-all cursor-pointer 
              flex items-center justify-center gap-2
              ${
                submitting
                  ? "opacity-90 cursor-wait bg-green-600"
                  : "bg-green-600 hover:bg-green-700 active:bg-green-800 dark:bg-green-700 dark:hover:bg-green-600 dark:active:bg-green-800"
              }
            `}
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
        <p className="text-yellow-600 dark:text-yellow-400 font-medium mt-4">
          Your KYC is under review. Please wait for approval.
        </p>
      )}

      {kycData.kyc_status === 1 && (
        <p className="text-green-600 dark:text-green-400 font-medium mt-4">
          Your KYC is verified successfully.
        </p>
      )}
    </div>
  );
}
