"use client";

import { CheckCircle2, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { loginUser } from "../../utils/api.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getMessageString = (message) => {
    if (!message) return "";

    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(" • ");

    if (message.success && Array.isArray(message.success)) {
      return message.success.join(" • ");
    }
    if (message.error && Array.isArray(message.error)) {
      return message.error.join(" • ");
    }

    return "Response received";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setCaptchaError(true);
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    setCaptchaError(false);
    setLoading(true);

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      });

      // Show server success message if available
      if (response?.message) {
        const successMsg = getMessageString(response.message);
        if (successMsg) {
          toast.success(successMsg);
        }
      }

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        toast.error("Invalid response from server");
        setLoading(false);
        return;
      }

      // Clear previous auth data
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("user");

      // Store auth data
      if (rememberMe) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("email_verified", user?.email_verified);
        localStorage.setItem("two_factor_verified", user?.two_factor_verified);
      } else {
        sessionStorage.setItem("auth_token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("email_verified", user?.email_verified);
        sessionStorage.setItem(
          "two_factor_verified",
          user?.two_factor_verified,
        );
      }

      // ====== 2FA Priority Check ======
      if (user.two_factor_status === 1 && user.two_factor_verified === 0) {
        // 2FA is enabled but not yet verified in this session
        setTimeout(() => {
          router.push("/GoogleTwoFactorAuth");
        }, 600);
        return; // Stop further redirection
      }

      // ====== Normal flow (no pending 2FA) ======
      if (user.email_verified === 1) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 600);
      } else {
        setTimeout(() => {
          router.push("/email-verify");
        }, 600);
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again later.";

      if (error.response?.data?.message) {
        errorMessage = getMessageString(error.response.data.message);
      } else if (error.response?.data?.error) {
        errorMessage = getMessageString(error.response.data.error);
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-8 md:p-10 border border-blue-100/50">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Image
            src="/logo-dark.png"
            alt="StripCard Logo"
            width={150}
            height={32}
            className="mx-auto mb-4"
          />
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-slate-600 text-sm mb-8">
          Log in to access your account securely
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username OR Email Address"
                required
                className="w-full pl-12 pr-4 py-3 border-2 text-slate-900 border-slate-200 rounded-lg focus:outline-none focus:ring-none focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-12 pr-12 text-slate-900 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-none focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-slate-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* reCAPTCHA Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Security Verification</span>
            </div>

            <div className="flex justify-start">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onCaptchaChange}
                onExpired={onCaptchaExpired}
                theme="light"
                size="normal"
              />
            </div>

            {captchaValue && (
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Verification successful</span>
              </div>
            )}

            {captchaError && !captchaValue && (
              <div className="flex items-center justify-center gap-2 text-red-600 text-sm font-semibold">
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

            <p className="text-xs text-slate-500 text-center">
              This helps us protect your account from unauthorized access
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:scale-[1.02]"
            }`}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-slate-600 space-y-3">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Sign Up
            </Link>
          </p>

          <p>
            Go back to{" "}
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
