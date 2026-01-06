"use client";

import { useEffect, useState } from "react";
import { getTransferMoneyInfo } from "../../utils/api";

const TransferMoneyPreview = () => {
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const response = await getTransferMoneyInfo();

      if (response?.data) {
        setPreviewData(response.data);
      }
    };

    fetchInfo();
  }, []);

  const latestTransaction =
    previewData?.transactions?.length > 0 ? previewData.transactions[0] : null;

  const data = [
    {
      label: "Enter Amount",
      value: latestTransaction
        ? latestTransaction.request_amount
        : `0.0000 ${previewData?.base_curr || "USD"}`,
    },
    {
      label: "Transfer Fee",
      value: latestTransaction ? latestTransaction.total_charge : "0.0000 USD",
    },
    {
      label: "Recipient Received",
      value: latestTransaction
        ? latestTransaction.recipient_received
        : "0.0000 USD",
    },
    {
      label: "Total Payable Amount",
      value: latestTransaction ? latestTransaction.payable : "0.0000 USD",
    },
  ];

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="rounded-t-2xl bg-gray-900 px-6 py-4">
        <h2 className="text-base text-center font-semibold text-white">
          Transfer Money Preview
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 ">
        <div className="space-y-7">
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
        </div>
      </div>
    </div>
  );
};

export default TransferMoneyPreview;
