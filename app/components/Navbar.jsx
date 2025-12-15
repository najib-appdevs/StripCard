"use client";
import { Menu } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import UserMenu from "./UserMenu";
import GlobeIcon from "./icons/Globe";
import NotificationBell from "./icons/NotificationBell";

export default function Navbar({ onMenuClick }) {
  return (
    <nav className=" px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Menu Button (Mobile) + Welcome Message */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-black" />
          </button>

          {/* Welcome Message */}
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-black">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Tomas William
            </p>
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <DarkModeToggle />
          <div className="hidden sm:block">
            <GlobeIcon />
          </div>
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
