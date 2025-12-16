import AddMoneyForm from "../../components/Add-Money/AddMoneyForm";
import AddMoneyLog from "../../components/Add-Money/AddMoneyLog";
import AddMoneyPreview from "../../components/Add-Money/AddMoneyPreview";
import LimitInformation from "../../components/Add-Money/LimitInformation";

function AddMoney() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-7">
        {/* Left Column: Add Money Form */}
        <AddMoneyForm />

        {/* Right Column: Money Preview Form */}
        {/* Preview Card */}
        <AddMoneyPreview />
      </div>
      {/* Limit Information Card */}
      <LimitInformation />

      {/* Add Money Log */}
      <AddMoneyLog />
    </>
  );
}

export default AddMoney;
