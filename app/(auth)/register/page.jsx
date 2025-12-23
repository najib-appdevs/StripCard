"use client";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      toast.error("Please agree to the Terms of Use & Privacy Policy");
      return;
    }

    if (!captchaValue) {
      setCaptchaError(true);
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    setCaptchaError(false);
    console.log("Registration submitted");
    console.log("reCAPTCHA token:", captchaValue);
    // Send form data + captchaValue to backend
  };

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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-gray-100">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <Image
            src="/logo-dark.png"
            alt="StripCard Logo"
            width={150}
            height={32}
            className="mx-auto mb-2"
          />
          <div className="h-1 w-20 bg-linear-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Sign up to get started with StripCard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name & Last Name - Side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                  className="w-full pl-12 pr-4 py-3 border text-gray-900 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required
                  className="w-full pl-12 pr-4 py-3 border text-gray-900 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

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
                required
                className="w-full pl-12 pr-4 py-3 border text-gray-900 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a strong password"
                required
                className="w-full pl-12 pr-12 py-3 border text-gray-900 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              className="mt-0.5 h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 cursor-pointer"
            >
              I have agreed with{" "}
              <a href="#" className="text-emerald-600 hover:text-emerald-700">
                Terms of Use
              </a>{" "}
              &{" "}
              <a href="#" className="text-emerald-600 hover:text-emerald-700">
                Privacy Policy
              </a>{" "}
            </label>
          </div>

          {/* Enhanced reCAPTCHA Section */}
          <div className="space-y-3">
            {/* Security Header */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Security Verification</span>
            </div>

            {/* reCAPTCHA Widget - Centered */}
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with real site key in production
              onChange={onCaptchaChange}
              onExpired={onCaptchaExpired}
              theme="light"
              size="normal"
            />

            {/* Success Indicator */}
            {captchaValue && (
              <div className="mt-3 flex items-center justify-center gap-2 text-emerald-600 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Verification successful</span>
              </div>
            )}

            {/* Error Message */}
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

            {/* Helper Text */}
            <p className="text-xs text-gray-500 text-center">
              This helps us keep bots away and protect your account
            </p>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            // disabled={!termsChecked}
          >
            Sign Up
          </button>
        </form>

        {/* Bottom Links */}
        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
            >
              Log In
            </Link>
          </p>

          <p>
            Go back to{" "}
            <Link
              href="/"
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
