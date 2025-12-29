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
import { useEffect, useRef, useState } from "react";
import { useLogout } from "../(auth)/useLogout.js";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef(null);
  const { handleLogout } = useLogout();

  // Close dropdown when clicking outside
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

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2 transition-colors"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            TW
          </div>

          {/* Mobile 3 dots */}
          <MoreVertical size={20} className="sm:hidden text-gray-600" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div
              className="fixed inset-0 z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
              {/* Header */}
              <div className="px-4 py-4 bg-white text-gray-800 border-b-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
                    TW
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Tomas William</p>
                    <p className="text-sm text-gray-500">william@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <MenuItem icon={<Send size={18} />} label="Send Money" />
                <MenuItem icon={<DollarSign size={18} />} label="Add Funds" />
                <MenuItem icon={<CreditCard size={18} />} label="Withdraw" />

                <hr className="my-2 border-gray-200" />

                <MenuItem
                  icon={<UserCheck size={18} />}
                  label="KYC Verification"
                />
                <MenuItem
                  icon={<Shield size={18} />}
                  label="2FA Verification"
                />

                <hr className="my-2 border-gray-200" />

                <MenuItem
                  icon={<LogOut size={18} />}
                  label="Logout"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setShowLogoutModal(true);
                    setIsOpen(false); // Close menu when opening modal
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-none ">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 relative border border-gray-200">
            {/* Close button */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <LogOut size={48} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isLoggingOut ? "Logging Out..." : "Are you sure?"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isLoggingOut
                  ? "Please wait while we securely log you out."
                  : "You will be logged out of your account."}
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-medium cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  disabled={isLoggingOut}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium cursor-pointer disabled:opacity-50"
                >
                  {isLoggingOut ? "Logging Out..." : "Yes, Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable menu item
function MenuItem({ icon, label, className = "", onClick }) {
  const isDanger = className.includes("text-red-600");

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 transition-colors ${className}`}
    >
      <span className={isDanger ? "text-red-600" : "text-gray-600"}>
        {icon}
      </span>
      <span
        className={
          isDanger
            ? "text-red-600 font-semibold"
            : "text-gray-800 font-semibold"
        }
      >
        {label}
      </span>
    </button>
  );
}
