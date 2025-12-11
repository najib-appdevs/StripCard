import RightSideContent from "../components/RightSideContent";
import WalletContentArea from "../components/wallet/WalletContentArea";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row  lg:p-4 min-h-screen bg-gray-50">
      {/* Left: Wallet - Give it more space */}
      <div className="lg:basis-[60%] min-w-0">
        <WalletContentArea />
      </div>

      {/* Right Sidebar */}
      <div className="lg:basis-[40%] min-w-0">
        <RightSideContent />
      </div>
    </div>
  );
}
