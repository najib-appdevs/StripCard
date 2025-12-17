/* eslint-disable @next/next/no-img-element */
"use client";

import {
  ArrowDownCircle,
  FileText,
  Gift,
  LayoutDashboard,
  Lock,
  LogOut,
  PlusCircle,
  Send,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationGroups = [
  {
    title: "Main",
    items: [{ icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" }],
  },
  {
    title: "Money Management",
    items: [
      { icon: PlusCircle, label: "Add Money", href: "/dashboard/add-money" },
      {
        icon: Send,
        label: "Transfer Money",
        href: "/dashboard/transfer-money",
      },
      {
        icon: ArrowDownCircle,
        label: "Withdraw Money",
        href: "/dashboard/withdraw-money",
      },
    ],
  },
  {
    title: "Services",
    items: [
      { icon: Gift, label: "Gift Card", href: "/dashboard/gift-card" },
      {
        icon: FileText,
        label: "Transactions",
        href: "/dashboard/transactions",
      },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: User, label: "My Profile", href: "/dashboard/profile" },
      { icon: ShieldCheck, label: "KYC Verification", href: "/dashboard/kyc" },
      { icon: Lock, label: "2FA Security", href: "/dashboard/2fa" },
      { icon: LogOut, label: "Logout", href: "/logout" },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Add custom styles for gradient */}
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(
            76.84deg,
            #0ebe98 -2.66%,
            #50c631 105.87%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-icon :global(svg) {
          stroke: url(#gradient);
        }
      `}</style>

      {/* SVG gradient definition */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="-2.66%" stopColor="#0EBE98" />
            <stop offset="105.87%" stopColor="#50C631" />
          </linearGradient>
        </defs>
      </svg>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-dark.png"
              alt="StripCard Logo"
              className="w-40 h-10 rounded-lg object-contain"
            />
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navigationGroups.map((group, groupIndex) => (
            <div
              key={group.title}
              className={groupIndex < navigationGroups.length - 1 ? "mb-6" : ""}
            >
              {group.title !== "Main" && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        active ? "bg-blue-50" : "text-black hover:bg-gray-100"
                      }`}
                    >
                      <span className={active ? "gradient-icon" : ""}>
                        <Icon
                          size={20}
                          style={active ? { stroke: "url(#gradient)" } : {}}
                        />
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          active ? "gradient-text" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
