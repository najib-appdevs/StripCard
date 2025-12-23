/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      const dark = saved === "dark";
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const activeColor = "#012C20";
  const inactiveColor = "#C7C7C7";

  return (
    <button
      onClick={toggle}
      className="relative w-16 h-8 flex items-center rounded-full bg-white border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#012C20] "
      aria-label="Toggle dark mode"
    >
      <div
        className="absolute left-1.5 z-10 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300"
        style={{ background: isDark ? "transparent" : "#012C20" }}
      >
        <Moon
          size={14}
          style={{ color: isDark ? inactiveColor : "#FFFFFF" }}
          className="transition-colors duration-300"
        />
      </div>

      <div
        className="absolute right-1.5 z-10 flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300"
        style={{ background: isDark ? "#012C20" : "transparent" }}
      >
        <Sun
          size={14}
          style={{ color: isDark ? "#FFFFFF" : inactiveColor }}
          className="transition-colors duration-300"
        />
      </div>
    </button>
  );
}
