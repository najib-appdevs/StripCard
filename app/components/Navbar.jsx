/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/api";
import UserMenu from "./UserMenu";
import GlobeIcon from "./icons/Globe";
import NotificationBell from "./icons/NotificationBell";

export default function Navbar({ onMenuClick }) {
  const [userName, setUserName] = useState("User");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Menu Button (Mobile) + Welcome Message */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-black dark:text-white" />
          </button>

          {/* Welcome Message */}
          <div className="pl-4">
            <h1 className="text-base sm:text-lg font-semibold text-gray-950 dark:text-gray-200">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
              {userName}
            </p>
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-2 sm:gap-3 px-8">
          <div className="hidden sm:block">
            <GlobeIcon />
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
