"use client";

import { CheckCircle2, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const localToken = localStorage.getItem("auth_token");
    const localUser = localStorage.getItem("user");
    const sessionToken = sessionStorage.getItem("auth_token");
    const sessionUser = sessionStorage.getItem("user");

    if ((localToken && localUser) || (sessionToken && sessionUser)) {
      router.push("/dashboard");
    }
  }, [router]);

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
      } else {
        sessionStorage.setItem("auth_token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
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
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-gray-100">
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

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Log in to access your account securely
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username OR Email Address"
                required
                className="w-full pl-12 pr-4 py-3 border text-gray-900 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-12 pr-12 text-gray-900 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

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
              This helps us protect your account from unauthorized access
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center btn-primary text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }`}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
            >
              Sign Up
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
