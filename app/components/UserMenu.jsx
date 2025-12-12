"use client";

import {
  CreditCard,
  DollarSign,
  LogOut,
  MoreVertical,
  Send,
  Shield,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2 transition-colors"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          TW
        </div>

        {/* Desktop chevron */}
        {/* <ChevronDown
          size={16}
          className={`hidden sm:block text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        /> */}

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
            {/* Header with gradient */}
            {/* Header (no gradient, simple white, dark text, bottom border) */}
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
              <MenuItem icon={<Shield size={18} />} label="2FA Verification" />

              <hr className="my-2 border-gray-200" />

              <MenuItem
                icon={<LogOut size={18} />}
                label="Logout"
                className="text-red-600 hover:bg-red-50"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Reusable menu item
function MenuItem({ icon, label, className = "" }) {
  const isDanger = className.includes("text-red-600");

  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${className}`}
    >
      {/* Icon */}
      <span className={isDanger ? "text-red-600" : "text-gray-600"}>
        {icon}
      </span>

      {/* Label */}
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
