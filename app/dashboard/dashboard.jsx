"use client";

import VirtualCardContent from "../components/VirtualCardSection/VirtualCardContent";
import TransactionHistory from "../components/wallet/TransactionHistory";
import WalletBalanceSection from "../components/wallet/WalletBalanceSection";

export default function Dashboard() {
  return (
    <div>
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-6">
        <div>
          <WalletBalanceSection />
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
