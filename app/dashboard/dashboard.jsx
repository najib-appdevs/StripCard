// "use client";

// import VirtualCardContent from "../components/VirtualCardSection/VirtualCardContent";
// import TransactionHistory from "../components/wallet/TransactionHistory";
// import WalletBalanceSection from "../components/wallet/WalletBalanceSection";

// export default function Dashboard() {
//   return (
//     <div>
//       {/* Top Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-6">
//         <div>
//           <WalletBalanceSection />
//         </div>

//         <div>
//           <VirtualCardContent />
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <TransactionHistory />
//     </div>
//   );
// }
// ------------------------------------------------------------------------------------

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import TransactionHistory from "../components/wallet/TransactionHistory";
import WalletBalanceSection from "../components/wallet/WalletBalanceSection";
import { getUserDashboard } from "../utils/api";

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await getUserDashboard();

        if (!res?.data?.user) {
          router.replace("/login");
          return;
        }

        const { email_verified = 0, kyc_verified = 0 } = res.data.user;

        if (cancelled) return;

        if (email_verified === 0) {
          router.replace("/email-verify");
          return;
        }

        if (kyc_verified === 0) {
          router.replace("/GoogleTwoFactorAuth");
          return;
        }

        setReady(true);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <WalletBalanceSection />
      </div>

      <TransactionHistory />
    </div>
  );
}
