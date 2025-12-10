import RightSideContent from "./components/RightSideContent";
import WalletContentArea from "./components/wallet/WalletContentArea";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 h-full">
      <div className="basis-[55%] min-w-0">
        <WalletContentArea />
      </div>
      <div className="basis-[45%] min-w-0">
        <RightSideContent />
      </div>
    </div>
  );
}
