// import VirtualCardContent from "../components/VirtualCardSection/VirtualCardContent";
// import TransactionHistory from "../components/wallet/TransactionHistory";

// import WalletContentArea from "../components/wallet/WalletContentArea";

// export default function Home() {
//   return (
//     <>
//       <div className="flex flex-col lg:flex-row  lg:p-5  bg-gray-50 ">
//         {/* Left: Wallet - Give it more space */}
//         <div className="lg:basis-[60%] min-w-0">
//           <WalletContentArea />
//         </div>

//         {/* Right Sidebar */}
//         <div className="lg:basis-[40%] min-w-0">
//           <VirtualCardContent />
//         </div>
//       </div>

//         <TransactionHistory />

//     </>
//   );
// }

import VirtualCardContent from "../components/VirtualCardSection/VirtualCardContent";
import TransactionHistory from "../components/wallet/TransactionHistory";
import WalletContentArea from "../components/wallet/WalletContentArea";

export default function Home() {
  return (
    <div>
      {/* Top Section - Left and Right Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Left Side */}
        <div>
          <WalletContentArea />
        </div>

        {/* Right Side */}
        <div>
          <VirtualCardContent />
        </div>
      </div>

      {/* Bottom Section - Full Width Transaction History */}

      <TransactionHistory />
    </div>
  );
}
