import VirtualCardContent from "./components/VirtualCardSection/VirtualCardContent";
import TransactionHistory from "./components/wallet/TransactionHistory";
import WalletContentArea from "./components/wallet/WalletContentArea";

export default function Home() {
  return (
    <div>
      {/* Top Section - Left and Right Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-6">
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
