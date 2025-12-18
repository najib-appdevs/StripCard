"use client";

import Link from "next/link";

const GiftCardTable = () => {
  const giftCards = [
    {
      trxId: "TRX123456789",
      cardName: "Amazon Gift Card",
      cardImage:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=100&h=100&fit=crop",
      receiverEmail: "john@example.com",
      receiverPhone: "+1-555-0123",
      cardUnitPrice: "50.00 USD",
      cardQuantity: 2,
      cardTotalPrice: "100.00 USD",
      exchangeRate: "1.00 USD = 1.00 USD",
      payableUnitPrice: "51.00 USD",
      totalCharge: "2.00 USD",
      payableAmount: "102.00 USD",
      status: "Success",
    },
    {
      trxId: "TRX987654321",
      cardName: "iTunes Gift Card",
      cardImage:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop",
      receiverEmail: "sarah@example.com",
      receiverPhone: "+1-555-0456",
      cardUnitPrice: "25.00 USD",
      cardQuantity: 4,
      cardTotalPrice: "100.00 USD",
      exchangeRate: "1.00 USD = 1.00 USD",
      payableUnitPrice: "25.50 USD",
      totalCharge: "2.00 USD",
      payableAmount: "102.00 USD",
      status: "Pending",
    },
    {
      trxId: "TRX456789123",
      cardName: "Google Play Card",
      cardImage:
        "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=100&h=100&fit=crop",
      receiverEmail: "mike@example.com",
      receiverPhone: "+1-555-0789",
      cardUnitPrice: "100.00 USD",
      cardQuantity: 1,
      cardTotalPrice: "100.00 USD",
      exchangeRate: "1.00 USD = 1.00 USD",
      payableUnitPrice: "102.00 USD",
      totalCharge: "2.00 USD",
      payableAmount: "102.00 USD",
      status: "Failed",
    },
  ];

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="rounded-t-2xl bg-gray-900 px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base font-semibold text-white">My Gift Card</h2>

          <Link
            href="/dashboard/gift-card/list"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Gift Cards
          </Link>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto">
          {/* Table Header with Groups */}
          <div className="hidden md:block min-w-[1600px]">
            {/* Group Headers */}
            <div className="grid grid-cols-[100px_repeat(4,1fr)_repeat(3,1fr)_repeat(4,1fr)_100px] gap-4 px-6 py-2 bg-gray-100 text-xs font-bold text-gray-700 border-b border-gray-200">
              <span></span>
              <span className="col-span-4 text-center">Card Details</span>
              <span className="col-span-3 text-center">Pricing</span>
              <span className="col-span-4 text-center">Payment Details</span>
              <span></span>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-[100px_repeat(4,1fr)_repeat(3,1fr)_repeat(4,1fr)_100px] gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-600">
              <span>TRX ID</span>
              <span>Card Name</span>
              <span>Card Image</span>
              <span>Receiver Email</span>
              <span>Receiver Phone</span>
              <span>Card Unit Price</span>
              <span>Card Quantity</span>
              <span>Total Price</span>
              <span>Exchange Rate</span>
              <span>Payable Unit Price</span>
              <span>Total Charge</span>
              <span>Payable Amount</span>
              <span>Status</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y min-w-[1600px]">
            {giftCards.map((card, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[100px_repeat(4,1fr)_repeat(3,1fr)_repeat(4,1fr)_100px] gap-4 px-6 py-4 text-sm items-center"
              >
                {/* TRX ID */}
                <span className="text-gray-600 font-medium">{card.trxId}</span>

                {/* Card Details Group */}
                <span className="text-gray-600 font-medium">
                  {card.cardName}
                </span>
                <div className="flex items-center">
                  <img
                    src={card.cardImage}
                    alt={card.cardName}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                  />
                </div>
                <span className="text-gray-600">{card.receiverEmail}</span>
                <span className="text-gray-600">{card.receiverPhone}</span>

                {/* Pricing Group */}
                <span className="text-gray-600">{card.cardUnitPrice}</span>
                <span className="text-gray-600 font-medium">
                  {card.cardQuantity}
                </span>
                <span className="text-gray-600 font-medium">
                  {card.cardTotalPrice}
                </span>

                {/* Payment Details Group */}
                <span className="text-gray-600 text-xs">
                  {card.exchangeRate}
                </span>
                <span className="text-gray-600">{card.payableUnitPrice}</span>
                <span className="text-gray-600">{card.totalCharge}</span>
                <span className="text-gray-600 font-semibold">
                  {card.payableAmount}
                </span>

                {/* Status */}
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium
                    ${
                      card.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : card.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {card.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y">
          {giftCards.map((card, index) => (
            <div key={index} className="px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">
                  TRX ID
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {card.trxId}
                </span>
              </div>

              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <img
                  src={card.cardImage}
                  alt={card.cardName}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {card.cardName}
                  </div>
                  <div className="text-xs text-gray-500">
                    Qty: {card.cardQuantity}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Receiver</div>
                  <div className="text-gray-900">{card.receiverEmail}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-gray-900">{card.receiverPhone}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Card Total</div>
                  <div className="text-gray-900 font-medium">
                    {card.cardTotalPrice}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Payable Amount</div>
                  <div className="text-gray-900 font-semibold">
                    {card.payableAmount}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                    ${
                      card.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : card.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {card.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Gift Cards Link */}
        <div className="md:hidden px-6 py-4 border-t">
          <Link
            href="/dashboard/gift-card/list"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 text-white py-2 text-sm font-bold hover:bg-emerald-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Gift Cards
          </Link>
        </div>
      </div>
    </>
  );
};

export default GiftCardTable;
