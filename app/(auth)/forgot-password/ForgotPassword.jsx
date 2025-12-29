"use client";

import { CheckCircle2, Mail, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { forgotPassword, verifyOtp } from "../../utils/api";

import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [stage, setStage] = useState("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      setCaptchaError(true);
      toast.error("Please complete the CAPTCHA verification");
      return;
    }
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      if (data.message.success) {
        toast.success(data.message.success[0]);
        setStage("otp");
        setCountdown(60);
        setCanResend(false);
      } else {
        toast.error(data.message.error[0]);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const data = await verifyOtp(enteredOtp);
      if (data.message.success) {
        toast.success(data.message.success[0]);
        router.push(`/Password-Reset?otp=${enteredOtp}`);
      } else {
        toast.error(data.message.error[0]);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during OTP verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);

    try {
      const data = await forgotPassword(email);
      if (data.message.success) {
        toast.success(data.message.success[0]);
        setCountdown(60);
        setCanResend(false);
      } else {
        toast.error(data.message.error[0]);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage === "otp") {
      setCanResend(true);
    }
  }, [countdown, stage]);

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError(false);
  };

  const onCaptchaExpired = () => {
    setCaptchaValue(null);
    setCaptchaError(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo-dark.png"
            alt="StripCard Logo"
            width={128}
            height={32}
            className="mx-auto mb-2"
          />
          <div className="h-1 w-20 bg-linear-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Stage: Email Input */}
        {stage === "email" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Forgot Password?
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              Enter your email address and we&apos;ll send you a One-Time
              Password (OTP) to reset it.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border text-gray-900 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span>Security Verification</span>
                </div>

                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onCaptchaChange}
                  onExpired={onCaptchaExpired}
                  theme="light"
                  size="normal"
                />

                {captchaValue && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Verification successful</span>
                  </div>
                )}

                {captchaError && !captchaValue && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-red-600 text-sm font-semibold">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Please complete the verification</span>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center">
                  This helps prevent automated requests
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* Stage: OTP Verification */}
        {stage === "otp" && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Please Enter the Code
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              We&apos;ve sent a 6-digit code to{" "}
              <span className="font-bold text-gray-700">{email}</span>
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-8">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-semibold text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    required
                  />
                ))}
              </div>

              {/* Countdown & Resend */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-600">
                    You can resend the code after{" "}
                    <span className="font-bold text-emerald-600">
                      {countdown}s
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Didn&apos;t get the code?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!canResend || loading}
                      className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors disabled:opacity-50"
                    >
                      {loading ? "Resending..." : "Resend Code"}
                    </button>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}

        {/* Bottom Links */}
        <div className="mt-8 text-center text-sm text-gray-600 space-y-2">
          <p>
            {stage === "email"
              ? "Remember your password?"
              : "Already have an account?"}{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
            >
              {stage === "email" ? "Log In" : "Login Now"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
