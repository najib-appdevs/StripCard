"use client";

import {
  CreditCard,
  DollarSign,
  LogOut,
  MoreVertical,
  Send,
  Shield,
  UserCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLogout } from "../(auth)/useLogout.js";
import { getUserProfile } from "../utils/api";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function UserMenu() {
  const router = useRouter();
  const { handleLogout } = useLogout();
  const menuRef = useRef(null);

  // --------------------------------------------------------------------------
  // State Management
  // --------------------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------------------------------
  // Fetch User Profile
  // --------------------------------------------------------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();

        // Check different possible response structures
        if (response?.data?.user) {
          setUser(response.data.user);
        } else if (response?.user) {
          setUser(response.user);
        }
      } catch (error) {
        // Error handled by API utility
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --------------------------------------------------------------------------
  // Close Dropdown When Clicking Outside
  // --------------------------------------------------------------------------
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --------------------------------------------------------------------------
  // Helper Functions
  // --------------------------------------------------------------------------
  const getInitials = () => {
    if (!user) return "User";
    const first = user.firstname?.charAt(0) || "";
    const last = user.lastname?.charAt(0) || "";
    return (
      (first + last).toUpperCase() ||
      user.username?.slice(0, 2).toUpperCase() ||
      "User"
    );
  };

  // --------------------------------------------------------------------------
  // Logout Handler
  // --------------------------------------------------------------------------
  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await handleLogout();
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      setIsOpen(false);
    }
  };

  // --------------------------------------------------------------------------
  // User Data
  // --------------------------------------------------------------------------
  const fullName = user
    ? user.fullname || `${user.firstname || ""} ${user.lastname || ""}`.trim()
    : "User";
  const email = user?.email || "";
  const avatarUrl = user?.userImage || "/IMG.webp";

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2 transition-colors cursor-pointer"
          disabled={loading}
        >
          {/* Avatar */}
          {loading || !avatarUrl ? (
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm animate-pulse">
              {getInitials()}
            </div>
          ) : (
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
              onError={(e) => {
                e.target.src = "/IMG.webp";
                e.target.onerror = null;
              }}
            />
          )}

          {/* Mobile 3 dots */}
          <MoreVertical size={20} className="sm:hidden text-gray-600" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div
              className="fixed inset-0 z-40 sm:hidden bg-black/20 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
              {/* Header Section */}
              <div className="px-5 py-5 bg-linear-to-r from-gray-50 to-white">
                <div className="flex items-center gap-4">
                  {loading ? (
                    <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
                  ) : (
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img
                        src={avatarUrl}
                        alt={fullName}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/IMG.webp")}
                      />
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {loading ? "Loading..." : fullName}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items Section */}
              <div className="py-2">
                {/* Transaction Actions */}
                <MenuItem
                  icon={<Send size={18} />}
                  label="Send Money"
                  onClick={() => router.push("/dashboard/transfer-money")}
                />

                <MenuItem
                  icon={<DollarSign size={18} />}
                  label="Add Funds"
                  onClick={() => router.push("/dashboard/add-money")}
                />

                <MenuItem
                  icon={<CreditCard size={18} />}
                  label="Withdraw"
                  onClick={() => router.push("/dashboard/withdraw-money")}
                />

                <hr className="my-2 border-gray-200 mx-2" />

                {/* Security Actions */}
                <MenuItem
                  icon={<UserCheck size={18} />}
                  label="KYC Verification"
                  onClick={() => router.push("/dashboard/kyc")}
                />

                <MenuItem
                  icon={<Shield size={18} />}
                  label="2FA Verification"
                  onClick={() => router.push("/dashboard/2fa")}
                />

                <hr className="my-2 border-gray-200 mx-2" />

                {/* Logout Action */}
                <MenuItem
                  icon={<LogOut size={18} />}
                  label="Logout"
                  className="text-red-600 hover:bg-red-50 active:bg-red-100"
                  onClick={() => {
                    setShowLogoutModal(true);
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-none">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-5 p-7 relative border border-gray-100">
            {/* Close Button */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              disabled={isLoggingOut}
            >
              <X size={22} />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut size={40} className="text-red-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {isLoggingOut ? "Logging Out..." : "Are you sure?"}
              </h3>
              <p className="text-gray-600 mb-8">
                {isLoggingOut
                  ? "Please wait while we securely log you out."
                  : "You will be logged out of your account."}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="cursor-pointer px-8 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  disabled={isLoggingOut}
                  className="cursor-pointer px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLoggingOut ? "Logging out..." : "Yes, Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function MenuItem({ icon, label, className = "", onClick }) {
  const isDanger = className.includes("text-red-600");

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-3.5 text-base cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
    >
      <span className={isDanger ? "text-red-600" : "text-gray-600"}>
        {icon}
      </span>
      <span
        className={
          isDanger ? "text-red-600 font-semibold" : "text-gray-900 font-medium"
        }
      >
        {label}
      </span>
    </button>
  );
}
