/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Globe, HelpCircle, Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Get current route

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }

    // Add scroll listener for navbar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(path);
  };

  // Get link classes based on active state
  const getLinkClasses = (path) => {
    const baseClasses =
      "relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium transition-all duration-200 rounded-lg group";
    const activeClasses = isActive(path)
      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800/50"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50";

    return `${baseClasses} ${activeClasses}`;
  };

  // Get mobile link classes based on active state
  const getMobileLinkClasses = (path) => {
    const baseClasses =
      "block px-4 py-3 rounded-lg font-medium transition-all duration-200";
    const activeClasses = isActive(path)
      ? "bg-blue-50 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400"
      : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400";

    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/logo-dark.png"
                  alt="Logo"
                  width={170}
                  height={170}
                  className="object-contain transition-transform duration-300 group-hover:scale-105 w-32 sm:w-40 md:w-[170px] h-auto"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links (Hidden on mobile and tablet) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link href="/" className={getLinkClasses("/")}>
              <span className="relative z-10">Home</span>
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transition-transform duration-300 origin-left ${
                  isActive("/")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
            <Link href="/about" className={getLinkClasses("/about")}>
              <span className="relative z-10">About</span>
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transition-transform duration-300 origin-left ${
                  isActive("/about")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
            <Link href="/services" className={getLinkClasses("/services")}>
              <span className="relative z-10">Services</span>
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transition-transform duration-300 origin-left ${
                  isActive("/services")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
            <Link
              href="/announcement"
              className={getLinkClasses("/announcement")}
            >
              <span className="relative z-10">Announcement</span>
              <span
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transition-transform duration-300 origin-left ${
                  isActive("/announcement")
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          </div>

          {/* Right: Utilities + Auth (Hidden on mobile and tablet except hamburger) */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Help Link - Hidden on mobile and tablet */}
            <Link
              href="/contact"
              className="hidden lg:flex relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 group"
            >
              <span className="relative z-10">Help</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            {/* Globe Icon - Hidden on mobile and tablet */}
            <button className="hidden lg:flex items-center justify-center w-9 xl:w-10 h-9 xl:h-10 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105">
              <Globe className="cursor-pointer w-4 xl:w-5 h-4 xl:h-5" />
            </button>

            {/* Dark Mode Toggle - Hidden on mobile and tablet */}
            <button
              onClick={toggleDarkMode}
              className="hidden lg:flex items-center justify-center w-9 xl:w-10 h-9 xl:h-10 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105"
            >
              {isDarkMode ? (
                <Sun className="cursor-pointer w-4 xl:w-5 h-4 xl:h-5 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Moon className="cursor-pointer w-4 xl:w-5 h-4 xl:h-5 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Auth Buttons - Hidden on mobile and tablet */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 ml-2">
              <Link
                href="/login"
                className="px-4 xl:px-5 py-2 xl:py-2.5 text-sm xl:text-base font-semibold text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:shadow-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 xl:px-5 py-2 xl:py-2.5 text-sm xl:text-base font-semibold text-white bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button - Show on mobile and tablet */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Show on mobile and tablet */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* Mobile Navigation Links */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={getMobileLinkClasses("/")}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={getMobileLinkClasses("/about")}
            >
              About
            </Link>
            <Link
              href="/services"
              onClick={closeMobileMenu}
              className={getMobileLinkClasses("/services")}
            >
              Services
            </Link>
            <Link
              href="/announcement"
              onClick={closeMobileMenu}
              className={getMobileLinkClasses("/announcement")}
            >
              Announcement
            </Link>

            {/* Mobile Utilities */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 space-y-2">
              <button className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all duration-200">
                <Globe className="cursor-pointer w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                Language
              </button>

              <button
                onClick={toggleDarkMode}
                className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all duration-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="cursor-pointer w-5 h-5 mr-3 text-yellow-500" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="cursor-pointer w-5 h-5 mr-3 text-indigo-600" />
                    Dark Mode
                  </>
                )}
              </button>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all duration-200"
              >
                <HelpCircle className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                Help
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 space-y-2">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center text-gray-700 dark:text-gray-200 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-center font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
