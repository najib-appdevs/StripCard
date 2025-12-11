import TransactionHistory from "./TransactionHistory";
import WalletBalanceSection from "./WalletBalanceSection";

export default function WalletContentArea() {
  return (
    <div className="p-8 min-h-screen">
      <WalletBalanceSection />
      <TransactionHistory />
    </div>
  );
}
