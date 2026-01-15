"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/api";
import DarkModeToggle from "./DarkModeToggle";
import UserMenu from "./UserMenu";
import GlobeIcon from "./icons/Globe";
import NotificationBell from "./icons/NotificationBell";

export default function Navbar({ onMenuClick }) {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile();

        const user = response?.data?.user || response?.user;

        if (user) {
          const name =
            user.fullname ||
            `${user.firstname || ""} ${user.lastname || ""}`.trim() ||
            user.username ||
            "User";

          setUserName(name);
        }
      } catch (error) {
        console.error("Failed to load user name:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Menu Button (Mobile) + Welcome Message */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-black" />
          </button>

          {/* Welcome Message */}
          <div className="pl-4">
            <h1 className="text-base sm:text-lg font-semibold text-black">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              {userName}
            </p>
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-2 sm:gap-3 px-8">
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
