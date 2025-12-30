// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { resendEmailVerifyCode, verifyEmail } from "../../utils/api";

// export default function EmailVerify() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [countdown, setCountdown] = useState(0);
//   const [canResend, setCanResend] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const inputRefs = useRef([]);
//   const router = useRouter();

//   // Countdown timer
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (countdown === 0 && !canResend) {
//       setCanResend(true);
//     }
//   }, [countdown, canResend]);

//   // Handle input change
//   const handleChange = (index, value) => {
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value !== "" && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   // Handle key down (backspace)
//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   // Handle paste
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData("text").slice(0, 6);

//     if (!/^\d+$/.test(pastedData)) return;

//     const newOtp = [...otp];
//     pastedData.split("").forEach((char, index) => {
//       if (index < 6) {
//         newOtp[index] = char;
//       }
//     });
//     setOtp(newOtp);

//     // Focus last filled input or next empty
//     const nextIndex = Math.min(pastedData.length, 5);
//     inputRefs.current[nextIndex].focus();
//   };

//   // Resend code
//   const handleResend = async () => {
//     if (!canResend || loading) return;
//     setLoading(true);

//     try {
//       const response = await resendEmailVerifyCode();
//       if (response.message && response.message.success) {
//         toast.success(response.message.success[0]);
//         setCountdown(60);
//         setCanResend(false);
//         setOtp(["", "", "", "", "", ""]);
//         inputRefs.current[0].focus();
//       } else if (response.message && response.message.error) {
//         toast.error(response.message.error[0]);
//       } else {
//         toast.error("An unexpected error occurred while resending code.");
//       }
//     } catch (error) {
//       toast.error("Failed to resend code. Please try again.");
//       console.error("Resend error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify code
//   const handleVerify = async () => {
//     const code = otp.join("");
//     if (code.length === 6) {
//       setLoading(true);
//       try {
//         const response = await verifyEmail(code);
//         if (response.message && response.message.success) {
//           toast.success(response.message.success[0]);
//           router.push("/dashboard");
//         } else if (response.message && response.message.error) {
//           toast.error(response.message.error[0]);
//         } else {
//           toast.error("An unexpected error occurred during verification.");
//         }
//       } catch (error) {
//         toast.error("Failed to verify email. Please try again.");
//         console.error("Verification error:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       toast.error("Please enter the complete 6-digit OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 border border-gray-100">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <Image
//             src="/logo-dark.png"
//             alt="Logo"
//             width={128}
//             height={32}
//             className="mx-auto mb-2"
//           />
//           <div className="h-1 w-20 bg-linear-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//           Verify Your Email
//         </h2>
//         <p className="text-center text-gray-500 text-sm mb-8">
//           We&apos;ve sent a 6-digit verification code to your email address
//         </p>

//         {/* OTP Inputs */}
//         <div className="flex justify-center gap-3 mb-6">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <input
//               key={index}
//               ref={(el) => (inputRefs.current[index] = el)}
//               type="text"
//               maxLength={1}
//               value={otp[index]}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={handlePaste}
//               className="w-12 h-12 text-center text-2xl font-semibold text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
//             />
//           ))}
//         </div>

//         {/* Verify Button */}
//         <button
//           type="button"
//           onClick={handleVerify}
//           disabled={otp.join("").length !== 6 || loading}
//           className="w-full btn-primary text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//         >
//           {loading ? "Verifying..." : "Verify Email"}
//         </button>

//         {/* Countdown & Resend */}
//         <div className="mt-6 text-center text-sm text-gray-600">
//           <p>
//             Didn&apos;t get the code?{" "}
//             {canResend ? (
//               <button
//                 type="button"
//                 onClick={handleResend}
//                 disabled={loading}
//                 className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors"
//               >
//                 Resend Code
//               </button>
//             ) : (
//               <span className="text-gray-500 font-semibold">
//                 Resend in {countdown}s
//               </span>
//             )}
//           </p>
//         </div>

//         {/* Bottom link */}
//         <div className="mt-8 text-center text-sm text-gray-600">
//           Already verified?{" "}
//           <Link
//             href="/login"
//             className=" hover:text-emerald-700 font-semibold hover:underline transition-colors"
//           >
//             Login Now
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
//----------------------------------------------------------------------------

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/Loader"; // Adjust path as needed
import { resendEmailVerifyCode, verifyEmail } from "../../utils/api";

export default function EmailVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const inputRefs = useRef([]);
  const router = useRouter();

  // Check authentication first
  useEffect(() => {
    const checkAuthentication = () => {
      const token = sessionStorage.getItem("auth_token");
      const user = sessionStorage.getItem("user");

      if (!token || !user) {
        toast.error("Sorry, You are unauthorized user");
        router.push("/login");
        return;
      }

      // Parse user data to check email verification status
      try {
        const userData = JSON.parse(user);

        // If email is already verified, redirect to dashboard
        if (userData.email_verified === 1) {
          toast.success("Email already verified!");
          router.push("/dashboard");
          return;
        }

        // User is authenticated and email not verified
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        toast.error("Sorry, You are unauthorized user");
        router.push("/login");
        return;
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [router]);

  // Send verification code on initial page load (only after auth check passes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const sendInitialVerificationCode = async () => {
      const codeSent = sessionStorage.getItem("verification_code_sent");

      if (!codeSent) {
        setSendingCode(true);
        try {
          const response = await resendEmailVerifyCode();
          if (response.message && response.message.success) {
            toast.success(response.message.success[0]);
            sessionStorage.setItem("verification_code_sent", "true");
            setCountdown(60);
            setCanResend(false);
          } else if (response.message && response.message.error) {
            toast.error(response.message.error[0]);
          } else {
            toast.error("Failed to send verification code.");
          }
        } catch (error) {
          console.error("Failed to send initial verification code:", error);
          toast.error("Failed to send verification code. Please click resend.");
        } finally {
          setSendingCode(false);
        }
      }
    };

    sendInitialVerificationCode();
  }, [isAuthenticated]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  // Handle input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key down (backspace)
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex].focus();
  };

  // Resend code
  const handleResend = async () => {
    if (!canResend || loading) return;
    setLoading(true);

    try {
      const response = await resendEmailVerifyCode();
      if (response.message && response.message.success) {
        toast.success(response.message.success[0]);
        setCountdown(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0].focus();
        sessionStorage.setItem("verification_code_sent", "true");
      } else if (response.message && response.message.error) {
        toast.error(response.message.error[0]);
      } else {
        toast.error("An unexpected error occurred while resending code.");
      }
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
      console.error("Resend error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verify code
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length === 6) {
      setLoading(true);
      try {
        const response = await verifyEmail(code);
        if (response.message && response.message.success) {
          toast.success(response.message.success[0]);
          sessionStorage.removeItem("verification_code_sent");
          const userData = sessionStorage.getItem("user");
          if (userData) {
            const user = JSON.parse(userData);
            user.email_verified = 1;
            sessionStorage.setItem("user", JSON.stringify(user));
          }
          router.push("/dashboard");
        } else if (response.message && response.message.error) {
          toast.error(response.message.error[0]);
        } else {
          toast.error("An unexpected error occurred during verification.");
        }
      } catch (error) {
        toast.error("Failed to verify email. Please try again.");
        console.error("Verification error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter the complete 6-digit OTP");
    }
  };

  // Show loader while checking authentication
  if (checkingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 border border-gray-100">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo-dark.png"
            alt="Logo"
            width={128}
            height={32}
            className="mx-auto mb-2"
          />
          <div className="h-1 w-20 bg-linear-to-r from-emerald-400 to-green-400 mx-auto rounded-full"></div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          We&apos;ve sent a 6-digit verification code to your email address
        </p>

        {/* Loading indicator for initial code sending */}
        {sendingCode && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-emerald-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600"></div>
              <span className="text-sm">Sending verification code...</span>
            </div>
          </div>
        )}

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={sendingCode}
              className="w-12 h-12 text-center text-2xl font-semibold text-gray-900 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          type="button"
          onClick={handleVerify}
          disabled={otp.join("").length !== 6 || loading || sendingCode}
          className="w-full bg-linear-to-r from-emerald-500 to-green-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* Countdown & Resend */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Didn&apos;t get the code?{" "}
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={loading || sendingCode}
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors disabled:opacity-50"
              >
                Resend Code
              </button>
            ) : (
              <span className="text-gray-500 font-semibold">
                Resend in {countdown}s
              </span>
            )}
          </p>
        </div>

        {/* Bottom link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Already verified?{" "}
          <Link
            href="/login"
            className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
}
