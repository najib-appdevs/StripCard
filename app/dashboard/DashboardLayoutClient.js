"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { DashboardProvider } from "../context/DashboardContext";
import { getUserDashboard } from "../utils/api";
import { checkAuthentication } from "../utils/auth";

export default function DashboardLayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      /* =====================
         Auth Token Check
      ===================== */
      if (!checkAuthentication()) {
        router.replace("/login");
        return;
      }

      /* =====================
         Get Stored User
      ===================== */
      const storedUser =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));

      if (!storedUser) {
        router.replace("/login");
        return;
      }

      /* =====================
         Get Stored Flags
      ===================== */
      const emailVerified =
        localStorage.getItem("email_verified") ||
        sessionStorage.getItem("email_verified");

      const twoFactorVerified =
        localStorage.getItem("two_factor_verified") ||
        sessionStorage.getItem("two_factor_verified");

      /* =====================
         Get 2FA Status (from user)
      ===================== */
      const twoFactorStatus = Number(storedUser.two_factor_status);

      /* =====================
         Email Check
      ===================== */
      if (emailVerified === "0") {
        router.replace("/email-verify");
        return;
      }

      /* =====================
         2FA Check (MAIN FIX)
      ===================== */
      if (twoFactorStatus === 1 && twoFactorVerified === "0") {
        router.replace("/GoogleTwoFactorAuth");
        return;
      }

      /* =====================
         Fetch Dashboard
      ===================== */
      try {
        setIsLoading(true);

        const res = await getUserDashboard();

        setDashboardData(res.data);
      } catch (err) {
        /* =====================
           Cleanup
        ===================== */
        localStorage.clear();
        sessionStorage.clear();

        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  /* =====================
     Loader
  ===================== */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader />
      </div>
    );
  }

  /* =====================
     Context
  ===================== */
  const contextValue = {
    activeVirtualSystem: dashboardData?.active_virtual_system,
    user: dashboardData?.user,
    userWallet: dashboardData?.userWallet,
    moduleAccess: dashboardData?.module_access,
    transactions: dashboardData?.transactions,
    baseCurr: dashboardData?.base_curr,
  };

  return (
    <DashboardProvider value={contextValue}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900/60 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-10">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
