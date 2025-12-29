"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../../utils/api";

export default function PasswordReset() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useRouter();
  const code = state?.otp || searchParams.get("otp");
  const email = state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!code) {
      toast.error(
        "No reset code found. Please try the forgot password process again."
      );
      return;
    }

    setLoading(true);
    try {
      const data = await resetPassword({
        code,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      if (data.message.success) {
        toast.success(data.message.success[0]);
        router.push("/login");
      } else {
        toast.error(data.message.error[0] || "Failed to reset password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 
                         text-gray-800 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 
                         text-gray-800 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full btn-primary hover:bg-emerald-700 
                       text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            — Back To Home —
          </Link>
        </div>
      </div>
    </div>
  );
}
