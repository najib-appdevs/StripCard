"use client";

import {
  ArrowLeftRight,
  CreditCard,
  Download,
  FileText,
  Gift,
  LayoutDashboard,
  RefreshCw,
  Send,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Send, label: "Money Transfer", href: "/dashboard/transfer" },
];

const transactionItems = [
  { icon: Send, label: "Send Money", href: "/dashboard/send" },
  { icon: Download, label: "Receive Money", href: "/dashboard/receive" },
  { icon: RefreshCw, label: "Request Money", href: "/dashboard/request" },
  { icon: Wallet, label: "Make Payment", href: "/dashboard/payment" },
];

const walletItems = [
  { icon: Users, label: "Add Funds", href: "/dashboard/add-funds" },
  { icon: ArrowLeftRight, label: "Withdraw", href: "/dashboard/withdraw" },
  { icon: ArrowLeftRight, label: "Exchange", href: "/dashboard/exchange" },
  { icon: FileText, label: "Bill Pay", href: "/dashboard/bill-pay" },
  { icon: TrendingUp, label: "Top Up", href: "/dashboard/top-up" },
];

const cardItems = [
  { icon: CreditCard, label: "Virtual Card", href: "/dashboard/virtual-card" },
  { icon: Gift, label: "Gift Card", href: "/dashboard/gift-card" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-black">AppDevs</span>
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
          {/* Main Menu */}
          <div className="space-y-1 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-600"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Transaction Section */}
          <div className="mb-6">
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
              Transaction
            </h3>
            <div className="space-y-1">
              {transactionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Wallet Action Section */}
          <div className="mb-6">
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
              Wallet Action
            </h3>
            <div className="space-y-1">
              {walletItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Cards Section */}
          <div>
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
              Cards
            </h3>
            <div className="space-y-1">
              {cardItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-600"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
