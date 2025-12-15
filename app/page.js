import VirtualCardContent from "./components/VirtualCardSection/VirtualCardContent";
import TransactionHistory from "./components/wallet/TransactionHistory";

import WalletContentArea from "./components/wallet/WalletContentArea";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row  lg:p-4  bg-gray-50">
        {/* Left: Wallet - Give it more space */}
        <div className="lg:basis-[60%] min-w-0">
          <WalletContentArea />
        </div>

        {/* Right Sidebar */}
        <div className="lg:basis-[40%] min-w-0">
          <VirtualCardContent />
        </div>
      </div>
      <TransactionHistory />
    </div>
  );
}
