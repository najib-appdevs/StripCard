import TransactionHistory from "./TransactionHistory";
import WalletBalanceSection from "./WalletBalanceSection";

export default function WalletContentArea() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <WalletBalanceSection />
      <TransactionHistory />
    </div>
  );
}
