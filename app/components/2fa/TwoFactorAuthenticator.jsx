"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const TwoFactorAuthenticator = () => {
  const [copied, setCopied] = useState(false);
  const dummyCode = "JBSWY3DPEHPK3PXP"; // Dummy Code, will replace it later with real-time APIs

  const handleCopy = () => {
    navigator.clipboard.writeText(dummyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col">
        {/* Title */}
        <h2 className="text-lg text-gray-700 text-center mb-6">
          Two Factor Authenticator
        </h2>

        {/* Code Field with Copy Button */}
        <div className="mb-8">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
            <input
              type="text"
              value={dummyCode}
              readOnly
              className="flex-1 bg-transparent text-gray-800 font-mono text-sm outline-none"
            />
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* QR Code Image, Dummy Code, will replace it later with real-time APIs */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simple QR code pattern */}
              <rect width="160" height="160" fill="white" />
              <rect x="10" y="10" width="50" height="50" fill="black" />
              <rect x="20" y="20" width="30" height="30" fill="white" />
              <rect x="25" y="25" width="20" height="20" fill="black" />

              <rect x="100" y="10" width="50" height="50" fill="black" />
              <rect x="110" y="20" width="30" height="30" fill="white" />
              <rect x="115" y="25" width="20" height="20" fill="black" />

              <rect x="10" y="100" width="50" height="50" fill="black" />
              <rect x="20" y="110" width="30" height="30" fill="white" />
              <rect x="25" y="115" width="20" height="20" fill="black" />

              <rect x="70" y="10" width="10" height="10" fill="black" />
              <rect x="70" y="30" width="10" height="10" fill="black" />
              <rect x="70" y="50" width="10" height="10" fill="black" />

              <rect x="10" y="70" width="10" height="10" fill="black" />
              <rect x="30" y="70" width="10" height="10" fill="black" />
              <rect x="50" y="70" width="10" height="10" fill="black" />

              <rect x="70" y="70" width="20" height="20" fill="black" />
              <rect x="100" y="70" width="10" height="10" fill="black" />
              <rect x="120" y="70" width="10" height="10" fill="black" />
              <rect x="140" y="70" width="10" height="10" fill="black" />

              <rect x="70" y="100" width="10" height="10" fill="black" />
              <rect x="70" y="120" width="10" height="10" fill="black" />
              <rect x="70" y="140" width="10" height="10" fill="black" />

              <rect x="100" y="100" width="10" height="10" fill="black" />
              <rect x="120" y="100" width="10" height="10" fill="black" />
              <rect x="140" y="100" width="10" height="10" fill="black" />

              <rect x="100" y="120" width="10" height="10" fill="black" />
              <rect x="100" y="140" width="10" height="10" fill="black" />
              <rect x="120" y="140" width="10" height="10" fill="black" />
              <rect x="140" y="120" width="10" height="10" fill="black" />
            </svg>
          </div>
        </div>

        {/* Enable Button */}
        <button
          className="cursor-pointer w-full mt-auto py-3 rounded-lg text-white font-semibold text-base transition-opacity hover:opacity-90"
          style={{
            background:
              "linear-gradient(76.84deg, #0EBE98 -2.66%, #50C631 105.87%)",
          }}
        >
          Enable
        </button>
      </div>
    </>
  );
};

export default TwoFactorAuthenticator;
