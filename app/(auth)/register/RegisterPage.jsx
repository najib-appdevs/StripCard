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
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { registerUser } from "../../utils/api";

export default function RegisterPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
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
    setLoading(true);

    try {
      const userData = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password,
        agree: termsChecked ? 1 : 0,
      };

      const response = await registerUser(userData);

      const isSuccess = response?.message?.success?.some((msg) =>
        msg.toLowerCase().includes("registration successful"),
      );

      if (!isSuccess) {
        toast.error("Registration was not successful");
        console.log("Registration was not successful");
      }

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token) {
        console.log("No authentication token received from server");
        return;
      }

      sessionStorage.setItem("auth_token", token);
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      sessionStorage.setItem("email_verified", user?.email_verified);
      toast.success("Registration successful! Redirecting...");

      if (user?.email_verified === 1) {
        router.push("/dashboard");
      } else {
        router.push("/email-verify");
      }
    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.data) {
        const backendData = error.response.data;

        if (
          backendData.message?.error &&
          Array.isArray(backendData.message.error)
        ) {
          errorMessage = backendData.message.error.join(" • ");
        } else if (backendData.message) {
          errorMessage =
            typeof backendData.message === "string"
              ? backendData.message
              : Object.values(backendData.message).flat().join(" • ");
        }
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
          Create Your Account
        </h2>
        <p className="text-center text-slate-600 text-sm mb-8">
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
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter First Name"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 text-slate-900 border-slate-200 rounded-lg focus:outline-none focus:ring-none focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter Last Name"
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 text-slate-900 border-slate-200 rounded-lg focus:outline-none focus:ring-none focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
                />
              </div>
            </div>
          </div>

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
                placeholder="Enter Email Address"
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
                placeholder="Create a strong password"
                required
                className="w-full pl-12 pr-12 py-3 border-2 text-slate-900 border-slate-200 rounded-lg focus:outline-none focus:ring-none focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-slate-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-700 transition-colors"
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
              className="mt-0.5 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-slate-700 cursor-pointer"
            >
              I have agreed with{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Terms of Use
              </a>{" "}
              &{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Privacy Policy
              </a>
            </label>
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
              This helps us keep bots away and protect your account
            </p>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading || !termsChecked}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02]"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Bottom Links */}
        <div className="mt-8 text-center text-sm text-slate-600 space-y-3">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Log In
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
