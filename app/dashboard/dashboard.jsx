"use client";

import VirtualCardContent from "../components/VirtualCardSection/VirtualCardContent";
import TransactionHistory from "../components/wallet/TransactionHistory";
import WalletContentArea from "../components/wallet/WalletContentArea";

export default function Dashboard() {
  return (
    <div>
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-6">
        <div>
          <WalletContentArea />
        </div>

        <div>
          <VirtualCardContent />
        </div>
      </div>

      {/* Bottom Section */}
      <TransactionHistory />
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { getDashboardData } from "../utils/api";

// import VirtualCardContent from "../components/VirtualCardSection/VirtualCardContent";
// import TransactionHistory from "../components/wallet/TransactionHistory";
// import WalletContentArea from "../components/wallet/WalletContentArea";

// export default function Dashboard() {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const response = await getDashboardData();
//       setDashboardData(response);
//       setLoading(false);
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return <div>Loading dashboard...</div>;
//   }

//   return (
//     <div>
//       {/* Top Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-6">
//         <div>
//           <WalletContentArea />
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
