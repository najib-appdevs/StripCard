"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateUserPassword } from "../../utils/api";
import { getToastMessage } from "../../utils/toastHelper";
import ChangePasswordSkeleton from "./ChangePasswordSkeleton";

function ChangePasswordCard() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await updateUserPassword({
      current_password: passwordData.currentPassword,
      password: passwordData.newPassword,
      password_confirmation: passwordData.confirmPassword,
    });

    const { type, text } = getToastMessage(response);
    toast[type](text);

    // Reset form only on success
    if (type === "success") {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswords({ current: false, new: false, confirm: false });
    }

    setIsSubmitting(false);
  };

  // Reusable input class
  const inputClass =
    "w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 dark:bg-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/30 outline-none transition-all";

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  if (loading) {
    return <ChangePasswordSkeleton />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-950/50 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        Change Password
      </h2>

      <form onSubmit={handlePasswordChangeSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label className={labelClass}>
            Current Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className={inputClass}
              placeholder="Enter Current Password"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition cursor-pointer"
              disabled={isSubmitting}
            >
              {showPasswords.current ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className={labelClass}>
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className={inputClass}
              placeholder="Enter New Password"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition cursor-pointer"
              disabled={isSubmitting}
            >
              {showPasswords.new ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className={labelClass}>
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className={inputClass}
              placeholder="Enter Confirmed Password"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition cursor-pointer"
              disabled={isSubmitting}
            >
              {showPasswords.confirm ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-10">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`cursor-pointer px-10 py-3 w-full text-white rounded-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all
              ${isSubmitting ? "opacity-90 cursor-wait" : ""}`}
            style={{
              background:
                "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "Change"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordCard;
