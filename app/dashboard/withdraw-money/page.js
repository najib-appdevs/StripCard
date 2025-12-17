import MoneyWithdrawalLimit from "../../components/Withdraw-Money/MoneyWithdrawalLimit";
import WithdrawMoney from "../../components/Withdraw-Money/WithdrawMoney";
import WithdrawMoneyLog from "../../components/Withdraw-Money/WithdrawMoneyLog";
import WithdrawMoneyPreview from "../../components/Withdraw-Money/WithdrawMoneyPreview";

function WithdrawMoneyPage() {
  return (
    <>
      {/* Withdraw form and preview section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-7">
        <WithdrawMoney />
        <WithdrawMoneyPreview />
      </div>

      {/* Shows withdrawal limits */}
      <MoneyWithdrawalLimit />

      {/* Shows withdrawal history/log */}
      <WithdrawMoneyLog />
    </>
  );
}

export default WithdrawMoneyPage;
