const AddMoneyPreview = () => {
  const data = [
    { label: "Entered Amount", value: "0.0000 USD" },
    { label: "Exchange Rate", value: "1 USD = 1.0000 USD" },
    { label: "Fees & Charges", value: "2.0000 USD" },
    { label: "Conversion Amount", value: "0.0000 USD" },
  ];

  return (
    <>
      <div className=" w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
          <h2 className="text-base text-center font-semibold text-white">
            Add Money Preview
          </h2>
        </div>

        {/* Body - Fixed height to match form */}
        <div className="p-6 space-y-4 min-h-[400px] flex flex-col">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
            >
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.value}
              </span>
            </div>
          ))}

          {/* Spacer to push bottom sections down */}
          <div className="flex-1" />

          {/* Divider */}
          <div className="border-t border-dashed pt-4" />

          {/* Will Get */}
          <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
            <span className="text-sm font-medium text-green-700">
              You Will Get
            </span>
            <span className="text-sm font-semibold text-green-700">
              0.0000 USD
            </span>
          </div>

          {/* Total Payable */}
          <div
            className="flex items-center justify-between rounded-xl px-4 py-4
                bg-[linear-gradient(76.84deg,#0EBE98_-2.66%,#50C631_105.87%)]"
          >
            <span className="text-base font-medium text-white">
              Total Payable
            </span>
            <span className="text-base font-bold text-white">2.0000 USD</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMoneyPreview;
