"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { verifyGoogle2FA } from "../../utils/api";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
function GoogleTwoFactorAuth() {
  const router = useRouter();
  const inputRefs = useRef([]);

  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // --------------------------------------------------------------------------
  // Check Authentication Token
  // --------------------------------------------------------------------------
  useEffect(() => {
    const token =
      sessionStorage.getItem("auth_token") ||
      localStorage.getItem("auth_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setIsCheckingAuth(false);
  }, [router]);

  // --------------------------------------------------------------------------
  // OTP Input Handlers
  // --------------------------------------------------------------------------
  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];

    pasted.forEach((char, i) => {
      if (/^\d$/.test(char) && i < 6) newOtp[i] = char;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pasted.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  // --------------------------------------------------------------------------
  // Submit Handler
  // --------------------------------------------------------------------------
  const handleAuthorize = async () => {
    const code = otp.join("");

    // Validate OTP length
    if (code.length !== 6) {
      toast.error("Please enter a complete 6-digit code");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await verifyGoogle2FA(code);

      // Handle success response
      if (response?.message?.success?.length) {
        toast.success(response.message.success[0]);
        router.push("/dashboard");
        return;
      }

      // Handle error response
      if (response?.message?.error?.length) {
        toast.error(response.message.error[0]);
        return;
      }

      // Fallback for unexpected response
      toast.error("Unexpected response from server");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message?.error?.[0] ||
        err?.response?.data?.message?.[0] ||
        err?.message ||
        "Verification failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------------------------------
  // Loading State
  // --------------------------------------------------------------------------
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-teal-50 to-green-50">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/logo-dark.png"
              alt="StripCard Logo"
              width={150}
              height={32}
              className="mx-auto mb-2"
            />
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Authorize Google Two Factor
          </h2>
          <p className="text-gray-600 text-sm">
            Please enter your authorization code to access dashboard
          </p>
        </div>

        {/* OTP Input Section */}
        <div className="mb-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isSubmitting}
                className="w-12 h-14 text-center text-2xl font-semibold text-gray-900 border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-60"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAuthorize}
          disabled={isSubmitting || otp.join("").length !== 6}
          className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background:
              "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            "Authorize"
          )}
        </button>
      </div>
    </div>
  );
}

export default GoogleTwoFactorAuth;
