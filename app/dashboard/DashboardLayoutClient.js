// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { checkAuthentication } from "../utils/auth";

// export default function DashboardLayoutClient({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = () => {
//       const isAuth = checkAuthentication();

//       if (!isAuth) {
//         router.push("/login");
//         setIsAuthenticated(false);
//       } else {
//         setIsAuthenticated(true);
//       }

//       setIsLoading(false);
//     };

//     checkAuth();
//   }, [router]);

//   // Show loader while checking authentication
//   if (isLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Loader />
//         </div>
//       </div>
//     );
//   }

//   // If not authenticated, show nothing (will redirect)
//   if (!isAuthenticated) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Loader />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar */}
//         <Navbar onMenuClick={() => setSidebarOpen(true)} />

//         {/* Page content */}
//         <main className="flex-1 overflow-y-auto p-10">{children}</main>
//       </div>
//     </div>
//   );
// }
// ---------------------------------------------------------------------------------------------------

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const isAuth = checkAuthentication();

      if (!isAuth) {
        router.push("/login");
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Now fetch dashboard data after auth
      try {
        const res = await getUserDashboard();

        if (!res?.data?.user) {
          router.push("/login");
          return;
        }

        const { email_verified = 0, kyc_verified = 0 } = res.data.user;

        if (email_verified === 0) {
          router.push("/email-verify");
          return;
        }

        if (kyc_verified === 0) {
          router.push("/GoogleTwoFactorAuth");
          return;
        }

        // If all checks pass, store the data
        setDashboardData(res.data);
      } catch (err) {
        console.log("Dashboard fetch error in layout:", err);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  // Show loader while checking auth/fetching
  if (isLoading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // If not authenticated, show nothing (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Extract key fields for context
  const contextValue = {
    activeVirtualSystem: dashboardData.active_virtual_system,
    user: dashboardData.user,
    userWallet: dashboardData.userWallet,
    moduleAccess: dashboardData.module_access,
    transactions: dashboardData.transactions,
    baseCurr: dashboardData.base_curr,
    // Add more if needed, e.g., pusher_credentials: dashboardData.pusher_credentials,
    // But avoid providing the FULL res.data to prevent huge context
  };

  return (
    <DashboardProvider value={contextValue}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900/60 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-10">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
