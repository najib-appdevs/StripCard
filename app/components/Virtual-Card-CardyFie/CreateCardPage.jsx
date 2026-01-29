import { useState } from "react";
import Select from "react-select";

function CreateCardPage() {
  const cardTierOptions = [
    { value: "universal", label: "Universal" },
    { value: "platinum", label: "Platinum" },
  ];

  const cardTypeOptions = [
    { value: "visa", label: "Visa" },
    { value: "mastercard", label: "Mastercard" },
  ];

  const cardCurrencyOptions = [
    { value: "usd", label: "USD" },
    { value: "eur", label: "EUR" },
    { value: "gbp", label: "GBP" },
  ];

  const fromWalletOptions = [
    { value: "usd", label: "United States Dollar (0.0000 USD)" },
    { value: "eur", label: "Euro (0.0000 EUR)" },
    { value: "gbp", label: "British Pound (0.0000 GBP)" },
  ];

  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardTier: cardTierOptions[0],
    cardType: cardTypeOptions[0],
    cardCurrency: cardCurrencyOptions[0],
    fromWallet: fromWalletOptions[0],
  });

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: "#ffffff",
      borderColor: state.isFocused ? "#34d399" : "#e5e7eb",
      borderWidth: "1.5px",
      borderRadius: "10px",
      padding: "6px 4px",
      cursor: "pointer",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(37, 99, 235, 0.1)" : "none",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#34d399",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#34d399"
        : state.isFocused
          ? "#ecfdf5"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#1f2937",
      padding: "12px 16px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      "&:active": {
        backgroundColor: "#059669",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      border: "1.5px solid #e5e7eb",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "15px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1f2937",
      fontSize: "15px",
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const cardTypeLabel = formData.cardType?.label || "—";

  return (
    <div className=" flex items-center justify-center">
      {/* Main Layout */}
      <div className="form-container w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 p-10 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800 label-text mb-2">
              Create Virtual Card
            </h1>
            <p className="text-slate-500 text-sm">
              Fill in the details to generate your card
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Holder */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 label-text">
                Card Holder&apos;s Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.cardHolderName}
                onChange={(e) =>
                  setFormData({ ...formData, cardHolderName: e.target.value })
                }
                placeholder="Enter Card Holder's Name"
                required
                className="w-full px-4 py-3.5 border-[1.5px] text-gray-700 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-3 focus:ring-emerald-100"
              />
            </div>

            {/* Card Tier */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 label-text">
                Card Tier <span className="text-red-500">*</span>
              </label>
              <Select
                options={cardTierOptions}
                value={formData.cardTier}
                onChange={(option) =>
                  setFormData({ ...formData, cardTier: option })
                }
                styles={customSelectStyles}
                placeholder="Select card tier"
              />
            </div>

            {/* Card Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 label-text">
                Card Type <span className="text-red-500">*</span>
              </label>
              <Select
                options={cardTypeOptions}
                value={formData.cardType}
                onChange={(option) =>
                  setFormData({ ...formData, cardType: option })
                }
                styles={customSelectStyles}
                placeholder="Select card type"
              />
            </div>

            {/* Card Currency */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 label-text">
                Card Currency <span className="text-red-500">*</span>
              </label>
              <Select
                options={cardCurrencyOptions}
                value={formData.cardCurrency}
                onChange={(option) =>
                  setFormData({ ...formData, cardCurrency: option })
                }
                styles={customSelectStyles}
                placeholder="Select currency"
              />
            </div>

            {/* From Wallet */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 label-text">
                From Wallet <span className="text-red-500">*</span>
              </label>
              <Select
                options={fromWalletOptions}
                value={formData.fromWallet}
                onChange={(option) =>
                  setFormData({ ...formData, fromWallet: option })
                }
                styles={customSelectStyles}
                placeholder="Select wallet"
              />
            </div>

            {/* Balance */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-slate-600">
                Available Balance
              </p>
              <p className="text-sm font-bold text-slate-800 label-text">
                0.0000 USD
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full btn-primary text-white font-semibold py-4 rounded-xl shadow-lg text-lg cursor-pointer"
            >
              Confirm
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 p-10 border border-slate-100 h-fit">
          <h2 className="text-2xl font-bold text-slate-800 label-text mb-6 text-center">
            Preview
          </h2>

          <div className="space-y-5">
            {/* Item */}
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-slate-600 font-medium">Card Type</span>
              <span className="font-semibold text-slate-800">
                {cardTypeLabel}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-slate-600 font-medium">Exchange Rate</span>
              <span className="font-semibold text-slate-800">
                1 USD = 1.0000 USD
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-slate-600 font-medium">
                Total Charge <span className="text-blue-500">(Universal)</span>
              </span>
              <span className="font-semibold text-slate-800">3.0000 USD</span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-lg font-semibold text-slate-700">
                Total Payable Amount
              </span>
              <span className="text-xl font-bold text-emerald-600">
                3.0000 USD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCardPage;
