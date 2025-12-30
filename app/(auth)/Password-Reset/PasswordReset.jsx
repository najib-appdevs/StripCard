"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import { resetPassword } from "../../utils/api";

export default function PasswordReset() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [otp, setOtp] = useState(null);

  // Only run on client after mount
  useEffect(() => {
    setIsMounted(true);

    // Safe access to sessionStorage
    if (typeof window !== "undefined") {
      const storedOtp = sessionStorage.getItem("reset_otp");
      setOtp(storedOtp);
    }
  }, []);

  // Protection: only after checked the storage
  useEffect(() => {
    // Wait until component is mounted (client-side)
    if (!isMounted) return;

    // If no OTP and we're not in the middle of reset → redirect
    if (!otp && !isResetting) {
      toast.error("Invalid Request");
      router.replace("/forgot-password");
    }
  }, [isMounted, otp, isResetting, router]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!otp) {
      toast.error("Reset code is missing.");
      router.replace("/forgot-password");
      return;
    }

    setLoading(true);
    setIsResetting(true);

    try {
      const data = await resetPassword({
        code: otp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      if (data.message?.success) {
        toast.success(data.message.success[0] || "Password reset successful!");
        sessionStorage.removeItem("reset_otp");
        router.push("/login");
      } else {
        toast.error(data.message?.error?.[0] || "Failed to reset password.");
        setIsResetting(false);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      setIsResetting(false);
    } finally {
      setLoading(false);
    }
  };

  // Show loader until we know if we have OTP or not
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // If no OTP after mount → show fallback (but useEffect will redirect soon)
  if (!otp && !isResetting) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6">
        <Loader />
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  // Normal form rendering
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Reset Your Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || !otp}
            className="w-full btn-primary text-white py-3 rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all disabled:opacity-60 shadow-sm"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            — Back To Home —
          </Link>
        </div>
      </div>
    </div>
  );
}
