import MoneyTransferLimit from "../../components/Transfer-Money/MoneyTransferLimit";
import TransferMoney from "../../components/Transfer-Money/TransferMoney";
import TransferMoneyLog from "../../components/Transfer-Money/TransferMoneyLog";
import TransferMoneyPreview from "../../components/Transfer-Money/TransferMoneyPreview";

export const metadata = {
  title: "Transfer Money",
};

function TransferMoneyPage() {
  return (
    <>
      {/* Section showing transfer form and preview side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-7">
        {/* Component to enter transfer details */}
        <TransferMoney />

        {/* Component to preview transfer information */}
        <TransferMoneyPreview />
      </div>

      {/* Component displaying transfer limits */}
      <MoneyTransferLimit />

      {/* Component showing transfer history/logs */}
      <TransferMoneyLog />
    </>
  );
}

export default TransferMoneyPage;
