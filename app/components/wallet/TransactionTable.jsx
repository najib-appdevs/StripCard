import TransactionRow from "./TransactionRow";

const transactions = [
  {
    id: 1,
    txId: "#MY548G214",
    fees: "$5.00",
    cardAmount: "+$2,500",
    cardMasked: "**** **** **** 1234",
    currentBalance: "$15,250",
    dateTime: "07 Jun 2025, 10:30 AM",
    virtualCard: "CARD-WITHDRAW",
    status: "Success",
    type: "in",
  },
  {
    id: 2,
    txId: "#MY548G215",
    fees: "$12.00",
    cardAmount: "-$8,600",
    cardMasked: "**** **** **** 5678",
    currentBalance: "$12,750",
    dateTime: "07 Jun 2025, 02:15 PM",
    virtualCard: "CARD-WITHDRAW",
    status: "Success",
    type: "out",
  },
  {
    id: 3,
    txId: "#MY548G216",
    fees: "$8.50",
    cardAmount: "-$1,400",
    cardMasked: "**** **** **** 9012",
    currentBalance: "$6,638.50",
    dateTime: "08 Jun 2025, 09:45 AM",
    virtualCard: "CARD-WITHDRAW",
    status: "Pending",
    type: "out",
  },
  {
    id: 4,
    txId: "#MY548G217",
    fees: "$5.00",
    cardAmount: "+$3,200",
    cardMasked: "**** **** **** 3456",
    currentBalance: "$9,833.50",
    dateTime: "08 Jun 2025, 04:20 PM",
    virtualCard: "CARD-WITHDRAW",
    status: "Success",
    type: "in",
  },
];

export default function TransactionTable() {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Fees & Charges
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Card Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Card Masked
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Current Balance
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Time & Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Virtual Card
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {transactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
