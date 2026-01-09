/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getGoogle2FASetup, google2FAUpdateStatus } from "../../utils/api";
import TwoFactorSkeleton from "./TwoFactorSkeleton";

const TwoFactorAuthenticator = () => {
  const [secret, setSecret] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [status, setStatus] = useState(0); // 0 = disabled, 1 = enabled
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "enable" or "disable"

  useEffect(() => {
    const fetch2FASetup = async () => {
      try {
        setLoading(true);
        const response = await getGoogle2FASetup();

        if (response?.data) {
          setSecret(response.data.qr_secrete || "");
          setQrCodeUrl(response.data.qr_code || "");
          setStatus(response.data.qr_status ?? 0);
          setAlertMessage(response.data.alert || "");
        } else if (response?.message?.error) {
          setError(response.message.error[0] || "Failed to load 2FA data");
        }
      } catch (err) {
        setError("An error occurred while loading 2FA setup");
      } finally {
        setLoading(false);
      }
    };

    fetch2FASetup();
  }, []);

  const handleCopy = () => {
    if (!secret) return;
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openConfirmModal = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    setShowConfirmModal(false);
    setIsProcessing(true);

    try {
      const response = await google2FAUpdateStatus();

      if (response?.message?.success) {
        const msg =
          response.message.success[0] ||
          (actionType === "enable"
            ? "2FA Enabled Successfully!"
            : "2FA Disabled Successfully!");

        toast.success(msg);
        // Toggle the status after successful API call
        setStatus(actionType === "enable" ? 1 : 0);
      } else if (response?.message?.error) {
        const errMsg = response.message.error[0] || "Operation failed";
        toast.error(errMsg);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isEnabled = status === 1;

  const buttonText = isProcessing
    ? "Processing..."
    : isEnabled
    ? "Disable"
    : "Enable";

  const buttonAction = isEnabled
    ? () => openConfirmModal("disable")
    : () => openConfirmModal("enable");

  if (loading) {
    return <TwoFactorSkeleton />;
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col">
        {/* Title */}
        <h2 className="text-lg text-gray-700 text-center mb-6">
          Two Factor Authenticator
        </h2>

        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          {isEnabled ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
              <CheckCircle2 size={16} className="text-green-600" />
              <span>Enabled</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-700 text-sm font-medium rounded-full border border-amber-200">
              <XCircle size={16} className="text-amber-600" />
              <span>Not Enabled</span>
            </div>
          )}
        </div>

        {/* Secret Code + Copy */}
        <div className="mb-8">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
            <input
              type="text"
              value={secret}
              readOnly
              className="flex-1 bg-transparent text-gray-800 font-mono text-sm outline-none"
              placeholder="No secret available"
            />
            <button
              onClick={handleCopy}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-md transition-colors"
              aria-label="Copy code"
              disabled={!secret}
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="2FA QR Code"
                className="w-[92%] h-[92%] object-contain"
                onError={(e) => {
                  e.target.src = "";
                  e.target.alt = "QR not available";
                }}
              />
            ) : (
              <span className="text-gray-400 text-xs">No QR Code</span>
            )}
          </div>
        </div>

        {/* Alert message - shown when enabled */}
        {isEnabled && alertMessage && (
          <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-6 text-center border border-amber-100">
            {alertMessage}
          </p>
        )}

        {/* Toggle Button */}
        <div className="mt-auto">
          <button
            onClick={buttonAction}
            disabled={isProcessing}
            className={`cursor-pointer w-full py-3 rounded-lg text-white font-semibold text-base transition-all flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
              ${isEnabled ? "btn-primary" : ""}
            `}
            style={{
              background: isEnabled
                ? undefined
                : "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Modal (same for Enable & Disable) */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-none flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {actionType === "enable" ? "Enable" : "Disable"} Two-Factor
                Authentication
              </h3>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {actionType === "enable"
                ? "Are you sure to Enable 2 factor authentication (Powered by google)?"
                : "Are you sure you want to disable 2FA? You will lose an extra layer of security."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="cursor-pointer flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="cursor-pointer flex-1 py-2.5 px-4 text-white rounded-lg font-medium hover:opacity-90 transition-all"
                style={{
                  background:
                    "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
                }}
              >
                {actionType === "enable" ? "Enable" : "Disable"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TwoFactorAuthenticator;
