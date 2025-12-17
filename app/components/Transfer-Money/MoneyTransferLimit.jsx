const MoneyTransferLimit = () => {
  const data = [
    { label: "Transaction Limit", value: "1.0000 USD - 1000.0000 USD" },
    { label: "Daily Limit", value: "10000.0000 USD" },
    { label: "Remaining Daily Limit", value: "10000.0000 USD" },
    { label: "Monthly Limit", value: "50000.0000 USD" },
    { label: "Remaining Monthly Limit", value: "50000.0000 USD" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Limit Information
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className="text-sm font-medium text-right text-gray-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoneyTransferLimit;